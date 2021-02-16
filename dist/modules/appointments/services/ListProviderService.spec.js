"use strict";

var _CacheProviderMOCK = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/mocks/CacheProviderMOCK"));

var _UsersRepositoryMOCK = _interopRequireDefault(require("../../users/repositories/mocks/UsersRepositoryMOCK"));

var _ListProvidersService = _interopRequireDefault(require("./ListProvidersService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let cacheProviderMOCK;
let usersRepositoryMOCK;
let listProviderService;
describe('ListProvidersService', () => {
  beforeEach(() => {
    cacheProviderMOCK = new _CacheProviderMOCK.default();
    usersRepositoryMOCK = new _UsersRepositoryMOCK.default();
    listProviderService = new _ListProvidersService.default(usersRepositoryMOCK, cacheProviderMOCK);
  });
  it('should be able to list the providers', async () => {
    const user1 = await usersRepositoryMOCK.createAndSaveUser({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123mudar'
    });
    const user2 = await usersRepositoryMOCK.createAndSaveUser({
      name: 'John Tre',
      email: 'johntre@email.com',
      password: '123mudar'
    });
    const loggedUser = await usersRepositoryMOCK.createAndSaveUser({
      name: 'John Qua',
      email: 'johnqua@email.com',
      password: '123mudar'
    });
    const providers = await listProviderService.run({
      user_id: loggedUser.id
    });
    expect(providers).toEqual([user1, user2]);
  });
});