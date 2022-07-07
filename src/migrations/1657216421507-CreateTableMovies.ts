import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableMovies1657216421507 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movies',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'genre',
            type: 'enum',
          },
          {
            name: 'recommendation',
            type: 'int',
          },
          {
            name: 'classification',
            type: 'enum',
          },
          {
            name: 'duration',
            type: 'int',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movies');
  }
}
