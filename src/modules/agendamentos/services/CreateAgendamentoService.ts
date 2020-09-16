import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import Agendamento from '@modules/agendamentos/infra/typeorm/entities/Agendamento';

import AppError from '@shared/errors/AppErrors';
import IAgendamentoRepository from '@modules/agendamentos/repositories/InterfaceAgendamentos';

interface IRequestDTO {
  date: Date;
  provider_id: string;
}

@injectable()
class CreateAgendamentoService {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
  ) {}

  public async execute({
    provider_id,
    date,
  }: IRequestDTO): Promise<Agendamento> {
    const dataAgendamento = startOfHour(date);

    const findDate = await this.agendamentoRepository.findByDate(
      dataAgendamento,
    );

    if (findDate) {
      throw new AppError('Este agendamento já esta sendo utilizado');
    }

    const agendamento = await this.agendamentoRepository.create({
      provider_id,
      date: dataAgendamento,
    });

    return agendamento;
  }
}

export default CreateAgendamentoService;
