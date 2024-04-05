import { Injectable } from '@nestjs/common';
import { CreateNewsDto, CreatedNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { News } from './entities/news.entity';
import { Genre } from 'src/genres/entities/genre.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepo: Repository<News>,
    @InjectRepository(Genre)
    private genreRepo: Repository<Genre>,
  ) {}
  async create(news) {
    try {
      for (const item of news) {
        await this.newsRepo.save(item);
        console.log('Record saved successfully');
      }
    } catch (error) {
      if (error.code === '23505') {
        // PostgreSQL error code for unique violation
        console.log(
          error,
          'Record with this title already exists. Skipping...',
        );
      } else {
        // Log any other errors
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

  async findAll(take: number, page: number) {
    const [data, count] = await this.newsRepo.findAndCount({
      take,
      skip: (page - 1) * take,
      order: { updated_at: 'DESC' },
    });
    return { data, count };
  }

  async findOne(id: string) {
    return id
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    return `This action updates a #${id} news`;
  }

  remove(id: number) {
    return `This action removes a #${id} news`;
  }
}
