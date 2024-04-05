import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  async create(@Body() createGenreDto: CreateGenreDto) {
    const genres = [
      {
        title: 'аниме',
        count: 212,
      },
      {
        title: 'боевик',
        count: 99,
      },
      {
        title: 'военный',
        count: 4,
      },
      {
        title: 'драма',
        count: 39,
      },
      {
        title: 'история',
        count: 4,
      },
      {
        title: 'комедия',
        count: 85,
      },
      {
        title: 'криминал',
        count: 8,
      },
      {
        title: 'мелодрама',
        count: 24,
      },
      {
        title: 'мультфильм',
        count: 228,
      },
      {
        title: 'приключения',
        count: 10,
      },
      {
        title: 'триллер',
        count: 23,
      },
      {
        title: 'ужасы',
        count: 5,
      },
      {
        title: 'фантастика',
        count: 18,
      },
      {
        title: 'фэнтези',
        count: 129,
      },
      {
        title: 'романтика',
        count: 45,
      },
      {
        title: 'научная фантастика',
        count: 33,
      },
      {
        title: 'магия',
        count: 14,
      },
      {
        title: 'спорт',
        count: 7,
      },
      {
        title: 'меха',
        count: 11,
      },
      {
        title: 'сёнен',
        count: 62,
      },
      {
        title: 'сёдзе',
        count: 56,
      },
      {
        title: 'сейнен',
        count: 28,
      },
      {
        title: 'детектив',
        count: 9,
      },
      {
        title: 'фэнтези мира',
        count: 22,
      },
      {
        title: 'психология',
        count: 17,
      },
      {
        title: 'самурайский боевик',
        count: 6,
      },
    ];

    return await this.genresService.create(
      genres.map((item) => ({ title: item.title })),
    );
  }

  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genresService.update(+id, updateGenreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genresService.remove(+id);
  }
}
