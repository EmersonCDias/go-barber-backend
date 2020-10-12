import AppError from '@shared/errors/AppErrors';

import UsersRepositoryMOCK from '../repositories/mocks/UsersRepositoryMOCK';
import HashProviderMOCK from '../providers/HashProvider/mocks/HashProviderMOCK';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUserService', () => {
  it('should be able to authenticate', async () => {
    const usersRepositoryMOCK = new UsersRepositoryMOCK();
    const hashProviderMOCK = new HashProviderMOCK();

    const createUserService = new CreateUserService(
      usersRepositoryMOCK,
      hashProviderMOCK,
    );
    const authenticateUserService = new AuthenticateUserService(
      usersRepositoryMOCK,
      hashProviderMOCK,
    );

    const user = await createUserService.run({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123mudar',
    });

    const response = await authenticateUserService.run({
      email: 'johndoe@email.com',
      password: '123mudar',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate if user does not exists', async () => {
    const usersRepositoryMOCK = new UsersRepositoryMOCK();
    const hashProviderMOCK = new HashProviderMOCK();

    const authenticateUserService = new AuthenticateUserService(
      usersRepositoryMOCK,
      hashProviderMOCK,
    );

    expect(
      authenticateUserService.run({
        email: 'johndoe1@email.com',
        password: '123mudar',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate if password is incorrect', async () => {
    const usersRepositoryMOCK = new UsersRepositoryMOCK();
    const hashProviderMOCK = new HashProviderMOCK();

    const createUserService = new CreateUserService(
      usersRepositoryMOCK,
      hashProviderMOCK,
    );
    const authenticateUserService = new AuthenticateUserService(
      usersRepositoryMOCK,
      hashProviderMOCK,
    );

    await createUserService.run({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123mudar',
    });

    expect(
      authenticateUserService.run({
        email: 'johndoe@email.com',
        password: '123muda',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
