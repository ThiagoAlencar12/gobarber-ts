import { Router } from 'express';
import agendamentoRouter from './agendamento.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/agendamentos', agendamentoRouter);
routes.use('/users', usersRouter);

export default routes;
