import {
  CreateDateColumn,
<<<<<<< HEAD
  DeleteDateColumn,
=======
>>>>>>> parent of b0d161d (feat: refatoracao total do projeto)
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
<<<<<<< HEAD

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
=======
>>>>>>> parent of b0d161d (feat: refatoracao total do projeto)
}
