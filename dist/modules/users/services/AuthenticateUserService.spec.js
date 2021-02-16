"use strict";

var _AppErrors = _interopRequireDefault(require("../../../shared/errors/AppErrors"));

var _UsersRepositoryMOCK = _interopRequireDefault(require("../repositories/mocks/UsersRepositoryMOCK"));

var _HashProviderMOCK = _interopRequireDefault(require("../providers/HashProvider/mocks/HashProviderMOCK"));

var _AuthenticateUserService = _interopRequireDefault(require("./AuthenticateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let usersRepositoryMOCK;
let hashProviderMOCK;
let authenticateUserService;
describe('AuthenticateUserService', () => {
  beforeEach(() => {
    usersRepositoryMOCK = new _UsersRepositoryMOCK.default();
    hashProviderMOCK = new _HashProviderMOCK.default();
    authenticateUserService = new _AuthenticateUserService.default(usersRepositoryMOCK, hashProviderMOCK);
  });
  it('should be able to authenticate', async () => {
    const user = await usersRepositoryMOCK.createAndSaveUser({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123mudar'
    });
    const response = await authenticateUserService.run({
      email: 'johndoe@email.com',
      password: '123mudar'
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should not be able to authenticate if user does not exists', async () => {
    await expect(authenticateUserService.run({
      email: 'johndoe1@email.com',
      password: '123mudar'
    })).rejects.toBeInstanceOf(_AppErrors.default);
  });
  it('should not be able to authenticate if password is incorrect', async () => {
    await usersRepositoryMOCK.createAndSaveUser({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123mudar'
    });
    await expect(authenticateUserService.run({
      email: 'johndoe@email.com',
      password: '123muda'
    })).rejects.toBeInstanceOf(_AppErrors.default);
  });
});