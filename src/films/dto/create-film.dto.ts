import { ApiProperty } from '@nestjs/swagger';

class Episode {
  @ApiProperty()
  link: string;
  @ApiProperty()
  screenshots: string[];
}

class Season {
  [episodeNumber: string]: Episode;
}

class Seasons {
  [seasonNumber: string]: {
    link: string;
    episodes: Season;
  };
}

export class CreateFilmDto {
  id: string;
  type: string;
  link: string;
  title: string;
  title_orig: string;
  translation: {
    id: number;
    title: string;
    type: string;
  };
  year: number;
  last_season: number;
  last_episode: number;
  episodes_count: number;
  worldart_link: string;
  kinopoisk_id: string;
  imdb_id: string;
  shikimori_id: string;
  quality: string;
  blocked_countries: string[];
  blocked_seasons: Record<string, string | string[]>;
  created_at: string;
  updated_at: string;
  seasons: Seasons;
  material_data: {
    title: string;
    title_en: string;
    year: number;
    tagline: string;
    description: string;
    poster_url: string;
    duration: number;
    countries: string[];
    all_genres: string[];
    genres: string[];
    anime_genres: string[];
    kinopoisk_rating: number;
    kinopoisk_votes: number;
    imdb_rating: number;
    imdb_votes: number;
    premiere_ru: string;
    premiere_world: string;
    actors: string[];
    directors: string[];
    producers: string[];
    writers: string[];
    composers: string[];
    editors: string[];
    designers: string[];
    operators: string[];
    anime_studios: string[];
    anime_kind: string;
    rating_mpaa: string;
    minimal_age: number;
    next_episode_at: string;
    episodes_total: number;
    episodes_aired: number;
  };
  screenshots: string[];
}

export class CreatedFilmDto {
  @ApiProperty()
  kodik_id: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  player_link: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  title_orig: string;
  @ApiProperty()
  year: number;
  @ApiProperty()
  last_season: number;
  @ApiProperty()
  last_episode: number;
  @ApiProperty()
  episodes_count: number;
  @ApiProperty()
  kinopoisk_id: string;
  @ApiProperty()
  imdb_id: string;
  @ApiProperty()
  quality: string;
  @ApiProperty()
  created_at: string;
  @ApiProperty()
  updated_at: string;
  @ApiProperty({ nullable: true })
  tagline: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  poster_url: string;
  @ApiProperty()
  duration: number;
  @ApiProperty()
  countries: string[];
  @ApiProperty()
  genres: number[];
  @ApiProperty()
  kinopoisk_rating: number;
  @ApiProperty()
  kinopoisk_votes: number;
  @ApiProperty()
  imdb_rating: number;
  @ApiProperty()
  imdb_votes: number;
  @ApiProperty()
  premiere_ru: string;
  @ApiProperty()
  premiere_world: string;
  @ApiProperty()
  actors: string[];
  @ApiProperty()
  directors: string[];
  @ApiProperty()
  producers: string[];
  @ApiProperty()
  writers: string[];
  @ApiProperty()
  composers: string[];
  @ApiProperty()
  editors: string[];
  @ApiProperty()
  designers: string[];
  @ApiProperty()
  operators: string[];
  @ApiProperty()
  screenshots: string[];
  @ApiProperty()
  seasons: Seasons;
}

export class GetOneFilmDto{
    data: CreatedFilmDto
    watchOrder: CreatedFilmDto[]
}

export class CountDto {
  @ApiProperty()
  count: number;
}
