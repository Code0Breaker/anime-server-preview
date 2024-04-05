import { Injectable } from '@nestjs/common';
import { CreateFilmDto, CreatedFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import {
  Between,
  EntityManager,
  FindOptionsSelect,
  FindOptionsSelectByString,
  In,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { Genre } from 'src/genres/entities/genre.entity';
import {
  concat,
  isNull,
  isNumber,
  isPlainObject,
  isUndefined,
  merge,
  mergeWith,
  unionBy,
} from 'lodash';
import { selectedColumns } from './constants';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private filmRepo: Repository<Film>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    @InjectRepository(Genre)
    private genreRepo: Repository<Genre>,
  ) { }

  async create(film: Film[]) {
    try {
      await this.entityManager.transaction(async (transEntityManager) => {
        function customizer(objValue, srcValue, key) {
          // console.log(objValue, srcValue,key);

          if (isNull(objValue)) {
            return srcValue;
          }
          if (isNull(srcValue)) {
            return objValue;
          }

          if (isUndefined(srcValue)) {
            return null
          }

          if (isUndefined(objValue)) {
            return null
          }

          if (isPlainObject(objValue)) {
            return merge(objValue, srcValue);
          }

          if (Array.isArray(objValue) && Array.isArray(srcValue)) {
            return unionBy(objValue, srcValue, 'id');
          }

          if (isNumber(objValue) && isNumber(srcValue)) {
            return Math.max(objValue, srcValue);
          }

          if (
            [
              'episodes_count',
              'last_episode',
              'last_season',
              'minimal_age',
              'episodes_total',
              'episodes_aired',
            ].includes(key)
          ) {
            return Math.max(+objValue, +srcValue);
          }

          if (['next_episode_at', 'updated_at', 'created_at'].includes(key)) {
            const val1 = isNaN(new Date(objValue).getTime()) ? 0 : new Date(objValue).getTime()
            const val2 = isNaN(new Date(srcValue).getTime()) ? 0 : new Date(srcValue).getTime()
            return new Date(
              Math.max(val1, val2)
            );
          }

          return srcValue;
        }

        for (const item of film) {
          const foundData = await transEntityManager.findOne(Film, {
            where: { title: item.title },
            lock: { mode: 'pessimistic_read' },
          });
          if (!foundData) {
            await transEntityManager.save(Film, item);
          } else {
            const mergedData = mergeWith(foundData, item, customizer);
            delete mergedData.genres;
            await transEntityManager.update(
              Film,
              { title: mergedData.title },
              mergedData
            );
          }
        }
      });
    } catch (error) {
      if (error.code === '23505') {
        console.log('Record with this title already exists. Skipping...');
      } else {
        console.error('Error occurred:', error);
      }
    }
  }

  async genreIds(genres: string[]): Promise<Genre[]> {
    try {
      const gotGenreIds = await this.genreRepo.find({
        where: { title: In(genres) },
      });
      return gotGenreIds;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(
    take: number,
    page?: number,
    rating?: string,
    updated_at?: 'ASC' | 'DESC',
    composers?: string,
    genres?: string,
    actors?: string,
    countries?: string,
    directors?: string,
    producers?: string,
    writers?: string,
    editors?: string,
    designers?: string,
    operators?: string,
    yearStart?: number,
    yearEnd?: number,
    keyword?: string,
  ): Promise<{ data: Film[]; count: number }> {
    const whereConditions = {
      imdb_rating: rating ? MoreThanOrEqual(rating.toString()) : undefined,
      kinopoisk_rating: rating ? MoreThanOrEqual(rating.toString()) : undefined,
      genres: genres ? { title: In(genres.split(',')) } : undefined,
      composers: composers ? In([composers]) : undefined,
      actors: actors ? In([actors]) : undefined,
      countries: countries ? In([countries]) : undefined,
      directors: directors ? In([directors]) : undefined,
      producers: producers ? In([producers]) : undefined,
      writers: writers ? In([writers]) : undefined,
      editors: editors ? In([editors]) : undefined,
      designers: designers ? In([designers]) : undefined,
      operators: operators ? In([operators]) : undefined,
    };

    const skip = (page - 1) * take;

    const query = {
      where: [
        {
          title: keyword ? Like(`${keyword}%`) : undefined,
          year: yearStart ? Between(yearStart, yearEnd || 9999) : undefined,
          ...whereConditions,
        },
        {
          title_orig: keyword ? Like(`${keyword}%`) : undefined,
          year: yearStart ? Between(yearStart, yearEnd || 9999) : undefined,
          ...whereConditions,
        },
      ],
      order: {
        updated_at: updated_at || 'DESC',
      },
      take,
      skip,
    };

    const [data, count] = await this.filmRepo.findAndCount({
      ...query,
      relations: ['genres'],
    }); //select:['id','title_orig','updated_at']
    return { data, count };
  }

  async findOne(title_orig: string) {

    const data = await this.filmRepo.findOne({
      where: { title_orig: decodeURIComponent(title_orig) },
      relations: ['genres'],
      select: selectedColumns as FindOptionsSelect<Film>,
    });

    const watchOrder = await this.filmRepo.find({
      where: [
        { worldart_link: data?.worldart_link === null ? undefined : data.worldart_link },
        { shikimori_id: data?.shikimori_id === null ? undefined : data.shikimori_id },
        { kinopoisk_id: data?.kinopoisk_id === null ? undefined : data.kinopoisk_id },
        { imdb_id: data?.imdb_id === null ? undefined : data.imdb_id },
      ], select: ['id', 'title', 'title_orig', 'year', 'poster_url'], order: { title: 'DESC' }
    })
    return { data, watchOrder }
  }

  update(id: number, updateFilmDto: UpdateFilmDto) {
    return `This action updates a #${id} film`;
  }

  remove(id: number) {
    return `This action removes a #${id} film`;
  }
}
