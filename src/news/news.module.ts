import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { Genre } from 'src/genres/entities/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([News, Genre])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
