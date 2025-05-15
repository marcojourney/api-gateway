import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Config {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  microservice: string;

  @Column()
  key: string;

  @Column()
  value: string;
}
