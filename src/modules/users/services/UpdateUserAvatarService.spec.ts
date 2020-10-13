import AppError from '@shared/errors/AppErrors';

import StorageProviderMOCK from '@shared/providers/StorageProvider/mocks/StorageProviderMOCK';
import UsersRepositoryMOCK from '../repositories/mocks/UsersRepositoryMOCK';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatarService', () => {
  it('should be able to upload an image', async () => {
    const usersRepositoryMOCK = new UsersRepositoryMOCK();
    const storageProviderMOCK = new StorageProviderMOCK();

    const updateUserAvatar = new UpdateUserAvatarService(
      usersRepositoryMOCK,
      storageProviderMOCK,
    );

    const user = await usersRepositoryMOCK.createAndSaveUser({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123mudar',
    });

    await updateUserAvatar.run({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar if there is no user', async () => {
    const usersRepositoryMOCK = new UsersRepositoryMOCK();
    const storageProviderMOCK = new StorageProviderMOCK();

    const updateUserAvatar = new UpdateUserAvatarService(
      usersRepositoryMOCK,
      storageProviderMOCK,
    );

    expect(
      updateUserAvatar.run({
        user_id: 'non-existing-user',
        avatarFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete an image if user already has one', async () => {
    const usersRepositoryMOCK = new UsersRepositoryMOCK();
    const storageProviderMOCK = new StorageProviderMOCK();

    const deleteFile = jest.spyOn(storageProviderMOCK, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      usersRepositoryMOCK,
      storageProviderMOCK,
    );

    const user = await usersRepositoryMOCK.createAndSaveUser({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123mudar',
    });

    await updateUserAvatar.run({
      user_id: user.id,
      avatarFileName: 'avatar1.jpg',
    });

    await updateUserAvatar.run({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar1.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
