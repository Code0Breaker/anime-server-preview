import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto, CreatedNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import axios from 'axios';
import { News } from './entities/news.entity';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  CountDto,
  CreateFilmDto,
  CreatedFilmDto,
} from 'src/films/dto/create-film.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  // @Post()
  @Cron('0 1-23/2 * * *')
  async create() {
    try {
      const currentDate = new Date()
      const today = `${currentDate.getDate()}-${currentDate.getMonth()+1}-${currentDate.getFullYear()}`
      let currentFilmUpdatedDate = '';
      let nextPage = '';

      async function fetchDataFromApi(
        nextPage?: string,
      ): Promise<{ next_page: string; results: CreateNewsDto[] }> {
        const url = nextPage
          ? nextPage
          : 'https://kodikapi.com/list?token=47e2452dd8e8301b4a61df6994f14dad&sort=updated_at&order=desc&types=anime-serial,anime&limit=100&with_material_data=true&camrip=false&lgbt=false&sort=updated_at&order=desc&with_episodes_data=true';

        const response = await axios.get(url);

        return response.data;
      }

      async function transformApiDataToFilm(
        data: CreateNewsDto[],
        filmMethods: NewsService,
      ): Promise<News[]> {
        const convertedData: News[] = [];
        for (const item of data) {
          // const itemGenreIds = await filmMethods.genreIds(
          //   !item.material_data?.all_genres
          //     ? []
          //     : item.material_data?.all_genres?.map((item) =>
          //         item.toLowerCase(),
          //       ),
          // );
          currentFilmUpdatedDate = `${new Date(item.updated_at).getDate()+1}-${new Date(item.updated_at).getMonth()+1}-${new Date(item.updated_at).getFullYear()}`

          convertedData.push({
            id: item.id,
            title: item.title.toLowerCase().trim(),
            title_orig: item.title_orig.toLowerCase(),
            year: item.year,
            last_season: item.last_season,
            last_episode: item.last_episode,
            episodes_count: item.episodes_count,
            updated_at: item.updated_at,
            description: item.material_data?.description || '',
            poster_url: item.material_data?.poster_url || '',
            premiere_world: item.material_data?.premiere_world,
            translation: item.translation,
            anime_kind: item?.material_data?.anime_kind,
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
          this.newsService,
        );
        console.log(today, '<', currentFilmUpdatedDate, 'breaking');
        if (today !== currentFilmUpdatedDate) {

          nextPage = ''

          break
        }

        await this.newsService.create(createdFilms);


      } while (nextPage );
    } catch (error) {
      console.log(error);
    }
  }

  @ApiTags('anime')
  @ApiQuery({ name: 'limit', example: 20, type: 'number' })
  @ApiQuery({ name: 'page', example: 1, type: 'number' })
  @ApiExtraModels(CreatedNewsDto)
  @ApiExtraModels(CountDto)
  @ApiResponse({
    status: 200,
    description: 'Returns the list of news with count',
    schema: {
      allOf: [
        { $ref: getSchemaPath(CountDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(CreatedNewsDto) },
            },
          },
        },
      ],
    },
  })
  @Get()
  findAll(@Query('limit') limit, @Query('page') page) {
    //remember to make exeption handlings
    return this.newsService.findAll(+limit, +page);
  }

  // @ApiTags('anime')
  // @Get(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: 'string',
  //   description: 'id of anime',
  // })
  // @ApiOkResponse({type:CreatedNewsDto})
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.newsService.findOne(id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    //remember to make exeption handlings
    return this.newsService.update(+id, updateNewsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
