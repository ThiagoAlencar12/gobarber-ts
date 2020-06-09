import { EntityRepository, Repository } from 'typeorm';

import Agendamento from '@modules/agendamentos/infra/typeorm/entities/Agendamento';

@EntityRepository(Agendamento)
class AgendamentoRepository extends Repository<Agendamento> {
  public async findByDate(date: Date): Promise<Agendamento | null> {
    const sameDate = await this.findOne({
      where: { date },
    });

    return sameDate || null;
  }
}

export default AgendamentoRepository;
