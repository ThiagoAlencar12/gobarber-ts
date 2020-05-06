import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';
import User from '../models/User';

interface Session {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: Session): Promise<Response> {
    const useRepository = getRepository(User);

    const user = await useRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password');
    }

    const passwordExist = await compare(password, user.password);

    if (!passwordExist) {
      throw new Error('Incorrect email/password');
    }

    const { expiresIn, secret } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
