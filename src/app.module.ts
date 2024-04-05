import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UpdatesModule } from './updates/updates.module';
import { FilmsModule } from './films/films.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresModule } from './genres/genres.module';
import { Genre } from './genres/entities/genre.entity';
import { CountryModule } from './country/country.module';
import { Country } from './country/entities/country.entity';
import { MaterialDataModule } from './material-data/material-data.module';
import { Film } from './films/entities/film.entity';
import { NewsModule } from './news/news.module';
import { News } from './news/entities/news.entity';
import { UpdatesCronModule } from './updates-cron/updates-cron.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
      entities: [Genre, Country, Film, News],
      synchronize: true,
      // dropSchema:true
    }),
    ScheduleModule.forRoot(),
    UpdatesModule,
    FilmsModule,
    GenresModule,
    CountryModule,
    MaterialDataModule,
    NewsModule,
    UpdatesCronModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
