import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Demande {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  isCompleted: boolean;
}
