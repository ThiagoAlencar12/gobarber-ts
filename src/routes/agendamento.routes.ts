import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AgendamentoRepository from '../repositories/AgendamentoRepository';
import CreateAgendamentoService from '../services/CreateAgendamentoService';

const agendamentoRouter = Router();

agendamentoRouter.get('/', async (request, response) => {
  const agendamentoRepository = getCustomRepository(AgendamentoRepository);
  const listAgendamento = await agendamentoRepository.find();

  return response.json(listAgendamento);
});

agendamentoRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const dataParsed = parseISO(date);

    const createAgendamento = new CreateAgendamentoService();

    const agendamento = await createAgendamento.execute({
      date: dataParsed,
      provider_id,
    });

    return response.json(agendamento);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default agendamentoRouter;
