import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderId1588425498178
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('agendamentos', 'provider');
    await queryRunner.addColumn(
      'agendamentos',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'agendamentos',
      new TableForeignKey({
        name: 'AgendamentoProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('agendamentos', 'AgendamentoProvider');

    await queryRunner.dropColumn('agendamentos', 'provider_id');

    await queryRunner.addColumn(
      'agendamentos',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
