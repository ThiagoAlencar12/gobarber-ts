import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AgendamentoRepository from '../repositories/AgendamentoRepository';
import CreateAgendamentoService from '../services/CreateAgendamentoService';

import verifyAuthenticated from '../middlewares/verifyAuthenticated';

const agendamentoRouter = Router();

agendamentoRouter.use(verifyAuthenticated);

agendamentoRouter.get('/', async (request, response) => {
  const agendamentoRepository = getCustomRepository(AgendamentoRepository);
  const listAgendamento = await agendamentoRepository.find();

  return response.json(listAgendamento);
});

agendamentoRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const dataParsed = parseISO(date);

  const createAgendamento = new CreateAgendamentoService();

  const agendamento = await createAgendamento.execute({
    date: dataParsed,
    provider_id,
  });

  return response.json(agendamento);
});

export default agendamentoRouter;
