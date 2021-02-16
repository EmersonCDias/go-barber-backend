"use strict";

var _AppErrors = _interopRequireDefault(require("../../../shared/errors/AppErrors"));

var _HashProviderMOCK = _interopRequireDefault(require("../providers/HashProvider/mocks/HashProviderMOCK"));

var _UsersRepositoryMOCK = _interopRequireDefault(require("../repositories/mocks/UsersRepositoryMOCK"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let usersRepositoryMOCK;
let hashProviderMOCK;
let updateProfileService;
describe('UpdateUserAvatarService', () => {
  beforeEach(() => {
    usersRepositoryMOCK = new _UsersRepositoryMOCK.default();
    hashProviderMOCK = new _HashProviderMOCK.default();
    updateProfileService = new _UpdateProfileService.default(usersRepositoryMOCK, hashProviderMOCK);
  });
  it('should be able to update profile', async () => {
    const user = await usersRepositoryMOCK.createAndSaveUser({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123mudar'
    });
    const updatedUser = await updateProfileService.run({
      user_id: user.id,
      name: 'John Test',
      email: 'johntest@gmail.com'
    });
    expect(updatedUser.name).toBe('John Test');
    expect(updatedUser.email).toBe('johntest@gmail.com');
  });
  it('should not be able to update e-mail if it already exists', async () => {
    await usersRepositoryMOCK.createAndSaveUser({
      name: 'John Doe 1',
      email: 'johndoe1@gmail.com',
      password: '123mudar'
    });
    const user = await usersRepositoryMOCK.createAndSaveUser({
      name: 'John Doe 2',
      email: 'johndoe2@gmail.com',
      password: '123mudar'
    });
    await expect(updateProfileService.run({
      user_id: user.id,
      name: 'John Test',
      email: 'johndoe1@gmail.com'
    })).rejects.toBeInstanceOf(_AppErrors.default);
  });
  it('should be able to update the password', async () => {
    const user = await usersRepositoryMOCK.createAndSaveUser({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123mudar'
    });
    const updatedPasswordUser = await updateProfileService.run({
      user_id: user.id,
      name: 'John Test',
      email: 'johndoe1@gmail.com',
      old_password: '123mudar',
      password: '1234mudar'
    });
    expect(updatedPasswordUser.password).toBe('1234mudar');
  });
  it('should not be able to update the password if the old one is not informed', async () => {
    const user = await usersRepositoryMOCK.createAndSaveUser({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123mudar'
    });
    await expect(updateProfileService.run({
      user_id: user.id,
      name: 'John Test',
      email: 'johndoe1@gmail.com',
      password: '1234mudar'
    })).rejects.toBeInstanceOf(_AppErrors.default);
  });
  it('should not be able to update the password if the old one is incorrect', async () => {
    const user = await usersRepositoryMOCK.createAndSaveUser({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123mudar'
    });
    await expect(updateProfileService.run({
      user_id: user.id,
      name: 'John Test',
      email: 'johndoe1@gmail.com',
      old_password: 'wrong-password',
      password: '1234mudar'
    })).rejects.toBeInstanceOf(_AppErrors.default);
  });
  it('should not be able to update the user if it does not exist', () => {
    expect(updateProfileService.run({
      user_id: 'nonexistent-user-id',
      name: 'Nonexistent user',
      email: 'nonexistent@email.com'
    })).rejects.toBeInstanceOf(_AppErrors.default);
  });
});