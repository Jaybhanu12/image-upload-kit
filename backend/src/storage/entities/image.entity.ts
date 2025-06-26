import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' }) 
  name: string;

  @Column({ type: 'varchar' })
  url: string;
}
