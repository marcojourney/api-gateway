import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  PrimaryColumn
} from 'typeorm';

@Entity()
export class Session {

  @PrimaryColumn({ type: 'binary', length: 16 })
  id: Buffer;

  @Column()
  userId: number;

  @Column()
  accessToken: string;

  @Column()
  scope: string;

  @Column()
  ip: string;

  @Column()
  userAgent: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
