import { Router } from 'express';
import agendamentoRouter from './agendamento.routes';
import usersRouter from './users.routes';
import sessionsRouter from './session.routes';

const routes = Router();

routes.use('/agendamentos', agendamentoRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
