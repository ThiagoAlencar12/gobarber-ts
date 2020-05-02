import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Agendamento from '../models/Agendamento';
import AgendamentoRepository from '../repositories/AgendamentoRepository';

interface RequestDTO {
  date: Date;
  provider_id: string;
}

class CreateAgendamentoService {
  public async execute({
    provider_id,
    date,
  }: RequestDTO): Promise<Agendamento> {
    const agendamentoRepository = getCustomRepository(AgendamentoRepository);

    const dataAgendamento = startOfHour(date);

    const findDate = await agendamentoRepository.findByDate(dataAgendamento);

    if (findDate) {
      throw Error('Este agendamento já esta sendo utilizado');
    }

    const agendamento = agendamentoRepository.create({
      provider_id,
      date: dataAgendamento,
    });

    await agendamentoRepository.save(agendamento);

    return agendamento;
  }
}

export default CreateAgendamentoService;
