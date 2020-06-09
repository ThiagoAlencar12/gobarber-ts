import Agendamentos from '@modules/agendamentos/infra/typeorm/entities/Agendamento';
import ICreateAgendamentoDTO from '@modules/agendamentos/dtos/ICreateAgendamentoDTO';

export default interface IAgendamentosRepository {
  create(data: ICreateAgendamentoDTO): Promise<Agendamentos>;
  findByDate(date: Date): Promise<Agendamentos | undefined>;
}
