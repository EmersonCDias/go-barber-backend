"use strict";

var _AppErrors = _interopRequireDefault(require("../../../shared/errors/AppErrors"));

var _CacheProviderMOCK = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/mocks/CacheProviderMOCK"));

var _UsersRepositoryMOCK = _interopRequireDefault(require("../repositories/mocks/UsersRepositoryMOCK"));

var _HashProviderMOCK = _interopRequireDefault(require("../providers/HashProvider/mocks/HashProviderMOCK"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let cacheProviderMOCK;
let usersRepositoryMOCK;
let hashProviderMOCK;
let createUserService;
describe('CreateUserService', () => {
  beforeEach(() => {
    cacheProviderMOCK = new _CacheProviderMOCK.default();
    usersRepositoryMOCK = new _UsersRepositoryMOCK.default();
    hashProviderMOCK = new _HashProviderMOCK.default();
    createUserService = new _CreateUserService.default(usersRepositoryMOCK, hashProviderMOCK, cacheProviderMOCK);
  });
  it('should be able to create a new user', async () => {
    const user = await createUserService.run({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123mudar'
    });
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('johndoe@email.com');
    expect(user).toHaveProperty('password');
  });
  it('should not be able to create a new user if it already exists', async () => {
    await createUserService.run({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123mudar'
    });
    await expect(createUserService.run({
      name: 'John Doe 1',
      email: 'johndoe@email.com',
      password: '123mudar'
    })).rejects.toBeInstanceOf(_AppErrors.default);
  });
});