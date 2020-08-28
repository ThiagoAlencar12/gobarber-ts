import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import IAgendamentosRepository from '@modules/agendamentos/repositories/InterfaceAgendamentos';
import ICreateAgendamentoDTO from '@modules/agendamentos/dtos/ICreateAgendamentoDTO';

import Agendamento from '@modules/agendamentos/infra/typeorm/entities/Agendamento';

class AgendamentoRepository implements IAgendamentosRepository {
  private agendamento: Agendamento[] = [];

  public async findByDate(date: Date): Promise<Agendamento | undefined> {
    const findAgendamento = this.agendamento.find(agendamento =>
      isEqual(agendamento.date, date),
    );

    return findAgendamento;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAgendamentoDTO): Promise<Agendamento> {
    const agendamento = new Agendamento();

    Object.assign(agendamento, { id: uuid(), date, provider_id });

    this.agendamento.push(agendamento);

    return agendamento;
  }
}

export default AgendamentoRepository;
