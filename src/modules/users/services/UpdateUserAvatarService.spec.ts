import AppError from '@shared/errors/AppErrors';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('Deve permitir a atualização de um usuário avatar', async () => {
    const fakeUsers = new FakeUsersRepository();
    const fakeProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsers,
      fakeProvider,
    );

    const user = await fakeUsers.create({
      name: 'Thiago Alencar',
      email: 'thiago12@gmail.com',
      password: '123123123',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('Não deve permitir a alteração de um avatar para um usuário inexistente', async () => {
    const fakeUsers = new FakeUsersRepository();
    const fakeProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsers,
      fakeProvider,
    );

    expect(
      updateUserAvatar.execute({
        user_id: 'nao-existe',
        avatarFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Deve deve deletar o avatar antigo do usuário quando for atualizar', async () => {
    const fakeUsers = new FakeUsersRepository();
    const fakeProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsers,
      fakeProvider,
    );

    const user = await fakeUsers.create({
      name: 'Thiago Alencar',
      email: 'thiago12@gmail.com',
      password: '123123123',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

    expect(user.avatar).toBe('avatar2.jpg');
  });
});
