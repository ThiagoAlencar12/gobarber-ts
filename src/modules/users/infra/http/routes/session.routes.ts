import { Router } from 'express';
import SessionController from '../controllers/sessionController';

const sessionsRouter = Router();
const sessionController = new SessionController();

sessionsRouter.post('/', sessionController.create);

export default sessionsRouter;
