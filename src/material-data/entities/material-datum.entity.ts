import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MaterialData {
  @PrimaryGeneratedColumn()
  id: number;
}
