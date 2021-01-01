import UsersRepositoryMOCK from '@modules/users/repositories/mocks/UsersRepositoryMOCK';
import ListProviderService from './ListProviderService';

let usersRepositoryMOCK: UsersRepositoryMOCK;
let listProviderService: ListProviderService;

describe('ListProviderService', () => {
  beforeEach(() => {
    usersRepositoryMOCK = new UsersRepositoryMOCK();
    listProviderService = new ListProviderService(usersRepositoryMOCK);
  });

  it('should be able to list the providers', async () => {
    const user1 = await usersRepositoryMOCK.createAndSaveUser({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123mudar',
    });

    const user2 = await usersRepositoryMOCK.createAndSaveUser({
      name: 'John Tre',
      email: 'johntre@email.com',
      password: '123mudar',
    });

    const loggedUser = await usersRepositoryMOCK.createAndSaveUser({
      name: 'John Qua',
      email: 'johnqua@email.com',
      password: '123mudar',
    });

    const providers = await listProviderService.run({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
