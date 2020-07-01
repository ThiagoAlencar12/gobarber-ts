import { Router } from 'express';

import verifyAuthenticated from '@modules/users/infra/http/middlewares/verifyAuthenticated';
import AgendamentoController from '@modules/agendamentos/infra/http/controllers/AgendamentoController';

const agendamentoRouter = Router();
const agendamentoController = new AgendamentoController();

agendamentoRouter.use(verifyAuthenticated);

agendamentoRouter.post('/', agendamentoController.create);

export default agendamentoRouter;
