import { Router } from 'express';
import { parseISO } from 'date-fns';

import AgendamentoRepository from '@modules/agendamentos/infra/typeorm/repositories/AgendamentoRepository';
import CreateAgendamentoService from '@modules/agendamentos/services/CreateAgendamentoService';

import verifyAuthenticated from '@modules/users/infra/http/middlewares/verifyAuthenticated';

const agendamentoRouter = Router();
const agendamentoRepository = new AgendamentoRepository();

agendamentoRouter.use(verifyAuthenticated);

// agendamentoRouter.get('/', async (request, response) => {
//   const listAgendamento = await agendamentoRepository.find();

//   return response.json(listAgendamento);
// });

agendamentoRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const dataParsed = parseISO(date);

  const createAgendamento = new CreateAgendamentoService(agendamentoRepository);

  const agendamento = await createAgendamento.execute({
    date: dataParsed,
    provider_id,
  });

  return response.json(agendamento);
});

export default agendamentoRouter;
