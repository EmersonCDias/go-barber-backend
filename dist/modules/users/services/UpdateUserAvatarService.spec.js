"use strict";

var _AppErrors = _interopRequireDefault(require("../../../shared/errors/AppErrors"));

var _StorageProviderMOCK = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/mocks/StorageProviderMOCK"));

var _UsersRepositoryMOCK = _interopRequireDefault(require("../repositories/mocks/UsersRepositoryMOCK"));

var _UpdateUserAvatarService = _interopRequireDefault(require("./UpdateUserAvatarService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let usersRepositoryMOCK;
let storageProviderMOCK;
let updateUserAvatar;
describe('UpdateUserAvatarService', () => {
  beforeEach(() => {
    usersRepositoryMOCK = new _UsersRepositoryMOCK.default();
    storageProviderMOCK = new _StorageProviderMOCK.default();
    updateUserAvatar = new _UpdateUserAvatarService.default(usersRepositoryMOCK, storageProviderMOCK);
  });
  it('should be able to upload an image', async () => {
    const user = await usersRepositoryMOCK.createAndSaveUser({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123mudar'
    });
    await updateUserAvatar.run({
      user_id: user.id,
      avatarFileName: 'avatar.jpg'
    });
    expect(user.avatar).toBe('avatar.jpg');
  });
  it('should not be able to update avatar if there is no user', async () => {
    await expect(updateUserAvatar.run({
      user_id: 'non-existing-user',
      avatarFileName: 'avatar.jpg'
    })).rejects.toBeInstanceOf(_AppErrors.default);
  });
  it('should be able to delete an image if user already has one', async () => {
    const deleteFile = jest.spyOn(storageProviderMOCK, 'deleteFile');
    const user = await usersRepositoryMOCK.createAndSaveUser({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123mudar'
    });
    await updateUserAvatar.run({
      user_id: user.id,
      avatarFileName: 'avatar1.jpg'
    });
    await updateUserAvatar.run({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg'
    });
    expect(deleteFile).toHaveBeenCalledWith('avatar1.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});