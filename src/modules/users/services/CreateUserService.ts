import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppErrors';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestUser {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepositoru')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: IRequestUser): Promise<User> {
    const checkEmail = await this.userRepository.findByEmail(email);

    if (checkEmail) {
      throw new AppError('Email already used');
    }

    const hashPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashPassword,
    });

    return user;
  }
}

export default CreateUserService;
