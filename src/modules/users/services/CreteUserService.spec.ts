import AppError from '@shared/errors/AppErrors';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashRepository from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('Deve permitir a criação de um novo usuário', async () => {
    const fakeUsers = new FakeUsersRepository();
    const fakeHash = new FakeHashRepository();
    const creteUsers = new CreateUserService(fakeUsers, fakeHash);

    const users = await creteUsers.execute({
      name: 'Thiago Alencar',
      email: 'thiagof@gmail.com',
      password: '123123123',
    });
    expect(users).toHaveProperty('id');
  });
  it('Não deve permitir a criação de um usuário com o mesmo e-mail', async () => {
    const fakeUsers = new FakeUsersRepository();
    const fakeHash = new FakeHashRepository();

    const creteUsers = new CreateUserService(fakeUsers, fakeHash);

    await creteUsers.execute({
      name: 'Thiago Alencar',
      email: 'thiagof@gmail.com',
      password: '123123123',
    });
    expect(
      creteUsers.execute({
        name: 'Thiago Alencar',
        email: 'thiagof@gmail.com',
        password: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
