import { Genre } from 'src/genres/entities/genre.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  PrimaryColumn,
  Index,
} from 'typeorm';

@Entity()
export abstract class Film {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  kodik_id: string;

  @Column({ nullable: true })
  type: string;

  @Column({ type: 'simple-array', nullable: true })
  studio: string[];

  @Column({ nullable: true })
  anime_kind: string;

  @Column({ nullable: true })
  rating_mpaa: string;

  @Column({ nullable: true })
  minimal_age: number;

  @Column({ nullable: true })
  next_episode_at: string;

  @Column({ nullable: true })
  episodes_total: number;

  @Column({ nullable: true })
  episodes_aired: number;

  @Column({ nullable: true })
  player_link: string;

  @Index()
  @Column({ nullable: false, unique: true })
  title: string;

  @Index()
  @Column({ nullable: true })
  title_orig: string;

  @Index()
  @Column({ nullable: true })
  year: number;

  @Column({ nullable: true })
  last_season: number;

  @Column({ nullable: true })
  last_episode: number;

  @Column({ nullable: true })
  episodes_count: number;

  @Column({ nullable: true })
  kinopoisk_id: string;

  @Column({ nullable: true })
  imdb_id: string;

  @Column({ nullable: true })
  worldart_link: string;

  @Column({ nullable: true })
  shikimori_id: string;

  @Column({ nullable: true })
  quality: string;

  @Column({ nullable: true })
  created_at: string;

  @Column({ nullable: true })
  updated_at: string;

  @Column({ nullable: true })
  tagline: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  poster_url: string;

  @Column({ nullable: true })
  duration: number;

  @Column('simple-array', { nullable: true })
  countries: string[];

  @ManyToMany(() => Genre, { cascade: true })
  @JoinTable()
  genres: Genre[];

  @Index()
  @Column({ nullable: true })
  kinopoisk_rating: string;

  @Column({ nullable: true })
  kinopoisk_votes: string;

  @Index()
  @Column({ nullable: true })
  imdb_rating: string;

  @Column({ nullable: true })
  imdb_votes: string;

  @Column({ nullable: true })
  premiere_ru: string;

  @Column({ nullable: true })
  premiere_world: string;

  @Column('simple-array', { nullable: true })
  actors: string[];

  @Column('simple-array', { nullable: true })
  directors: string[];

  @Column('simple-array', { nullable: true })
  producers: string[];

  @Column('simple-array', { nullable: true })
  writers: string[];

  @Column('simple-array', { nullable: true })
  composers: string[];

  @Column('simple-array', { nullable: true })
  editors: string[];

  @Column('simple-array', { nullable: true })
  designers: string[];

  @Column('simple-array', { nullable: true })
  operators: string[];

  @Column('simple-array', { nullable: true })
  screenshots: string[];

  @Column('jsonb', { nullable: true })
  translation: object;

  @Column('jsonb', { nullable: true })
  seasons: object;
}

//   type OFilm = Omit(Film,'id')
