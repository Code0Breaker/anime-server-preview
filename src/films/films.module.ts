import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from 'src/genres/entities/genre.entity';
import { Film } from './entities/film.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Genre, Film])],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
