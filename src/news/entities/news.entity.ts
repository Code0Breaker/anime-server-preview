import { Film } from 'src/films/entities/film.entity';
import { Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class News {
    @PrimaryColumn()
    id: string
    @Column()
    title: string
    @Column()
    title_orig: string;
    @Column()
    poster_url: string;
    @Column({ nullable: true })
    next_episode_at: string
    @Column({ nullable: true })
    episodes_aired: number;
    @Column({ nullable: true })
    last_season: number;
    @Column({ nullable: true })
    anime_kind: string;
    @Column({ nullable: true })
    year: number;
    @Column({ nullable: true })
    last_episode: number;
    @Column({ nullable: true })
    episodes_count: number;
    @Column({ nullable: true })
    episodes_total: number;
    @Column({ nullable: true })
    updated_at: string;
    @Column({ nullable: true })
    description: string;
    @Column({ nullable: true })
    premiere_world: string;
    @Column('jsonb', { nullable: true })
    translation: object;
}
