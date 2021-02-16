"use strict";

var _AppErrors = _interopRequireDefault(require("../../../shared/errors/AppErrors"));

var _UsersRepositoryMOCK = _interopRequireDefault(require("../repositories/mocks/UsersRepositoryMOCK"));

var _ShowProfileService = _interopRequireDefault(require("./ShowProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let usersRepositoryMOCK;
let showProfileService;
describe('ShowProfileService', () => {
  beforeEach(() => {
    usersRepositoryMOCK = new _UsersRepositoryMOCK.default();
    showProfileService = new _ShowProfileService.default(usersRepositoryMOCK);
  });
  it('should be able to return the user info', async () => {
    const {
      id
    } = await usersRepositoryMOCK.createAndSaveUser({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123mudar'
    });
    const profile = await showProfileService.run(id);
    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@email.com');
  });
  it('should not be able to return the user info if it does not exist', () => {
    expect(showProfileService.run('nonexistent-user-id')).rejects.toBeInstanceOf(_AppErrors.default);
  });
});