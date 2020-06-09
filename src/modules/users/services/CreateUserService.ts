import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppErrors';

interface RequestUser {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestUser): Promise<User> {
    const userRepository = getRepository(User);

    const checkEmail = await userRepository.findOne({ where: { email } });

    if (checkEmail) {
      throw new AppError('Email already used');
    }

    const hashPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
