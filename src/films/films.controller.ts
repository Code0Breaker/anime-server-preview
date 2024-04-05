import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Type,
  UseInterceptors,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { CountDto, CreateFilmDto, CreatedFilmDto, GetOneFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import axios from 'axios';
import { Film } from './entities/film.entity';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ESort } from './enums/enums';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Cron('0 */2 * * *')
  // @Post()
  //remember to make exeption handlings
  async create() {
    try {
      console.time(new Date().toLocaleDateString());
      let page = 0;
      let nextPage = '';

      async function fetchDataFromApi(
        nextPage?: string,
      ): Promise<{ next_page: string; results: CreateFilmDto[] }> {
        const url = nextPage
          ? nextPage
          : `https://kodikapi.com/list?token=${process.env.KODIK_TOKEN}&sort=updated_at&order=desc&types=anime-serial%2Canime&limit=100&with_material_data=true&camrip=false&lgbt=false&with_episodes_data=true&with_seasons=true`;

        const response = await axios.get(url);

        return response.data;
      }

      async function transformApiDataToFilm(
        data: CreateFilmDto[],
        filmMethods: FilmsService,
      ): Promise<Film[]> {
        const convertedData: Film[] = [];
        for (const item of data) {
          const itemGenreIds = await filmMethods.genreIds(
            !item.material_data?.all_genres
              ? []
              : item.material_data?.all_genres?.map((item) =>
                  item.toLowerCase(),
                ),
          );

          convertedData.push({
            id: item.id,
            kodik_id: item.id,
            type: item.type,
            player_link: item.link,
            title: item.title.toLowerCase().trim(),
            title_orig: item.title_orig.toLowerCase(),
            year: item.year,
            last_season: item.last_season,
            last_episode: item.last_episode,
            episodes_count: item.episodes_count,
            worldart_link: item.worldart_link,
            kinopoisk_id: item.kinopoisk_id?.toString(),
            imdb_id: item.imdb_id?.toString(),
            shikimori_id: item.shikimori_id?.toString(),
            quality: item.quality,
            created_at: item.created_at,
            updated_at: item.updated_at,
            tagline: item?.material_data?.tagline || '',
            description: item.material_data?.description || '',
            poster_url: item.material_data?.poster_url || '',
            duration: item.material_data?.duration,
            countries: item.material_data?.countries,
            genres: itemGenreIds,
            kinopoisk_rating: item.material_data?.kinopoisk_rating?.toString(),
            kinopoisk_votes: item.material_data?.kinopoisk_votes?.toString(),
            imdb_rating: item.material_data?.imdb_rating?.toString(),
            imdb_votes: item.material_data?.imdb_votes?.toString(),
            premiere_ru: item.material_data?.premiere_ru,
            premiere_world: item.material_data?.premiere_world,
            actors: item.material_data?.actors,
            directors: item.material_data?.directors,
            producers: item.material_data?.producers,
            writers: item.material_data?.writers,
            composers: item.material_data?.composers,
            editors: item.material_data?.editors,
            designers: item.material_data?.designers,
            operators: item.material_data?.operators,
            screenshots: item.screenshots,
            translation: [item.translation],
            seasons: item.seasons,
            studio: item.material_data?.anime_studios || [],
            anime_kind: item?.material_data?.anime_kind,
            rating_mpaa: item?.material_data?.rating_mpaa,
            minimal_age: item?.material_data?.minimal_age,
            next_episode_at: item?.material_data?.next_episode_at,
            episodes_total: item?.material_data?.episodes_total,
            episodes_aired: item?.material_data?.episodes_aired,
          });
        }
        return convertedData;
      }

      do {
        const { results, next_page } = await fetchDataFromApi(nextPage);
        nextPage = next_page;
        console.log('next_page', next_page);

        const createdFilms = await transformApiDataToFilm(
          results,
          this.filmsService,
        );
        await this.filmsService.create(createdFilms);
        page += 1;
        console.log(page);
        if (page === 10) {
          page = 0;
          break;
        }
      } while (nextPage);

      console.timeLog('time start');
      console.timeEnd('time start');
    } catch (error) {
      console.log(error);
    }
  }

  @ApiTags('anime')
  @ApiQuery({ name: 'limit', example: 20, type: 'number' })
  @ApiQuery({ name: 'page', example: 1, type: 'number', required: false })
  @ApiQuery({ name: 'rating', required: false, example: '8.5' })
  @ApiQuery({ name: 'updated_at', required: false, enum: ESort })
  @ApiQuery({
    name: 'composers',
    required: false,
    example: 'Канэсака Юки,Тацуя Като,Хироаки Цуцуми',
  })
  @ApiQuery({ name: 'genres', required: false, example: 'сёнен,драма' })
  @ApiQuery({
    name: 'actors',
    required: false,
    example:
      'Ацуми Танэдзаки,Рёта Такэути,Ая Эндо,Дзюнъити Сувабэ,Ёсиаки Хасэгава,Ая Хисакава,Макото Ясумура,Ами Наито,Нацуми Фудзивара,Хана Сато',
  })
  @ApiQuery({
    name: 'countries',
    required: false,
    example: 'Япония,Корея Южная',
  })
  @ApiQuery({
    name: 'directors',
    required: false,
    example:
      'Норихиро Наганума,Ёко Канамори,Рюта Кавахара,Ёсики Китаи,Содзи Ниномия,Томоко Хирамуки,Митиру Итабисаси,Ёдзи Сато,Юми Каваи,Томоя Кунисаки',
  })
  @ApiQuery({
    name: 'producers',
    required: false,
    example: 'Хироаки Мацутани,Сато Сота,Иппэи Такэмура,Кунихито Такадзава',
  })
  @ApiQuery({
    name: 'writers',
    required: false,
    example: 'Боити,Риитиро Инагаки,Юитиро Кидо',
  })
  @ApiQuery({ name: 'editors', required: false, example: 'Кумико Сакамото' })
  @ApiQuery({
    name: 'designers',
    required: false,
    example: 'Сюнъитиро Ёсихара,Юко Иваса,Томоюки Аоки,Такаси Муратани',
  })
  @ApiQuery({ name: 'operators', required: false, example: 'Такэси Кацураяма' })
  @ApiQuery({ name: 'yearStart', required: false, example: 2023 })
  @ApiQuery({ name: 'yearEnd', required: false, example: 2024 })
  @ApiQuery({ name: 'keyword', required: false, example: 'атака тита' })
  @ApiExtraModels(CreatedFilmDto)
  @ApiExtraModels(CountDto)
  @ApiResponse({
    status: 200,
    description: 'Returns the list of films with count',
    schema: {
      allOf: [
        { $ref: getSchemaPath(CountDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(CreatedFilmDto) },
            },
          },
        },
      ],
    },
  })
  @Get()
  findAll(
    @Query('limit') limit,
    @Query('page') page,
    @Query('rating') rating,
    @Query('updated_at') updated_at,
    @Query('composers') composers,
    @Query('genres') genres,
    @Query('actors') actors,
    @Query('countries') countries,
    @Query('directors') directors,
    @Query('producers') producers,
    @Query('writers') writers,
    @Query('editors') editors,
    @Query('designers') designers,
    @Query('operators') operators,
    @Query('yearStart') yearStart,
    @Query('yearEnd') yearEnd,
    @Query('keyword') keyword,
  ) {
    //remember to make exeption handlings
    return this.filmsService.findAll(
      +limit,
      +page || 1,
      rating,
      updated_at,
      composers,
      genres,
      actors,
      countries,
      directors,
      producers,
      writers,
      editors,
      designers,
      operators,
      +yearStart,
      +yearEnd,
      keyword,
    );
  }

  @ApiTags('anime')
  @Get(':title_orig')
  @ApiParam({
    name: 'title_orig',
    type: 'string',
    description: 'title_orig of anime',
  })
  @ApiOkResponse({ type: GetOneFilmDto })
  async findOne(@Param('title_orig') title_orig: string) {
    //remember to make exeption handlings
    return await this.filmsService.findOne(title_orig);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    //remember to make exeption handlings
    return this.filmsService.update(+id, updateFilmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filmsService.remove(+id);
  }
}
