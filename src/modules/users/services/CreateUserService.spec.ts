import AppError from '@shared/errors/AppErrors';

import UsersRepositoryMOCK from '../repositories/mocks/UsersRepositoryMOCK';
import HashProviderMOCK from '../providers/HashProvider/mocks/HashProviderMOCK';
import CreateUserService from './CreateUserService';

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const usersRepositoryMOCK = new UsersRepositoryMOCK();
    const hashProviderMOCK = new HashProviderMOCK();

    const createUserService = new CreateUserService(
      usersRepositoryMOCK,
      hashProviderMOCK,
    );

    const user = await createUserService.run({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123mudar',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('johndoe@email.com');
    expect(user).toHaveProperty('password');
  });

  it('should not be able to create a new user if it already exists', async () => {
    const usersRepositoryMOCK = new UsersRepositoryMOCK();
    const hashProviderMOCK = new HashProviderMOCK();

    const createUserService = new CreateUserService(
      usersRepositoryMOCK,
      hashProviderMOCK,
    );

    await createUserService.run({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123mudar',
    });

    await expect(
      createUserService.run({
        name: 'John Doe 1',
        email: 'johndoe@email.com',
        password: '123mudar',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
