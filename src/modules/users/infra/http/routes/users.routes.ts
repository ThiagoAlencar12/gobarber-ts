import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import verifyAuthenticated from '@modules/users/infra/http/middlewares/verifyAuthenticated';
import UserController from '../controllers/userController';
import UserAvatarController from '../controllers/userAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UserController();
const userAvatar = new UserAvatarController();

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  verifyAuthenticated,
  upload.single('avatar'),
  userAvatar.update,
);

export default usersRouter;
