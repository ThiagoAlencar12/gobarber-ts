import { Router } from 'express';
import agendamentoRouter from './agendamento.routes';

const routes = Router();

routes.use('/agendamento', agendamentoRouter);

export default routes;
