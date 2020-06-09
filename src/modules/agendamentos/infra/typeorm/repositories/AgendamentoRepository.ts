import { getRepository, Repository } from 'typeorm';
import IAgendamentosRepository from '@modules/agendamentos/repositories/InterfaceAgendamentos';
import ICreateAgendamentoDTO from '@modules/agendamentos/dtos/ICreateAgendamentoDTO';
import Agendamento from '@modules/agendamentos/infra/typeorm/entities/Agendamento';

class AgendamentoRepository implements IAgendamentosRepository {
  private ormRepository: Repository<Agendamento>;

  constructor() {
    this.ormRepository = getRepository(Agendamento);
  }

  public async findByDate(date: Date): Promise<Agendamento | undefined> {
    const sameDate = await this.ormRepository.findOne({
      where: { date },
    });

    return sameDate;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAgendamentoDTO): Promise<Agendamento> {
    const agendamento = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(agendamento);

    return agendamento;
  }
}

export default AgendamentoRepository;
