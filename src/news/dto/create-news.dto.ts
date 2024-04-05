import { CreateFilmDto, CreatedFilmDto } from 'src/films/dto/create-film.dto';

export class CreateNewsDto {
    id: string;
  
    title: string;
    title_orig: string;
    poster_url: string;
    next_episode_at: string;
    episodes_aired: number;
    last_season?: number;
    anime_kind?: string;
    year?: number;
    last_episode: number;
    episodes_count: number;
    episodes_total: number;
    updated_at?: string;
    description?: string;
    premiere_world?: string;
    translation?: object;
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
}
export class CreatedNewsDto extends CreatedFilmDto {}
