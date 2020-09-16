import AppError from '@shared/errors/AppErrors';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateSessionService from './CreateSessionService';
import CreateUserService from './CreateUserService';

describe('CreateSession', () => {
  it('Deve permitir a autenticação do usuário', async () => {
    const fakeUsers = new FakeUsersRepository();
    const fakeHash = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsers, fakeHash);
    const authUser = new CreateSessionService(fakeUsers, fakeHash);

    const user = await createUser.execute({
      name: 'Thiago Alencar',
      email: 'thiagof@gmail.com',
      password: '123123123',
    });

    const response = await authUser.execute({
      email: 'thiagof@gmail.com',
      password: '123123123',
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('Não deve permitir a autenticação com um e-mail inexistente', async () => {
    const fakeUsers = new FakeUsersRepository();
    const fakeHash = new FakeHashProvider();

    const authUser = new CreateSessionService(fakeUsers, fakeHash);

    expect(
      authUser.execute({
        email: 'thiagof@gmail.com',
        password: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Deve permitir a autenticação do usuário com a senha errada', async () => {
    const fakeUsers = new FakeUsersRepository();
    const fakeHash = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsers, fakeHash);
    const authUser = new CreateSessionService(fakeUsers, fakeHash);

    await createUser.execute({
      name: 'Thiago Alencar',
      email: 'thiagof@gmail.com',
      password: '123123123',
    });

    expect(
      authUser.execute({
        email: 'thiagof@gmail.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
