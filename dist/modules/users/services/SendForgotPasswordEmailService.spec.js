"use strict";

var _AppErrors = _interopRequireDefault(require("../../../shared/errors/AppErrors"));

var _MailProviderMOCK = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/mocks/MailProviderMOCK"));

var _UsersRepositoryMOCK = _interopRequireDefault(require("../repositories/mocks/UsersRepositoryMOCK"));

var _SendForgotPasswordEmailService = _interopRequireDefault(require("./SendForgotPasswordEmailService"));

var _UserTokensRepositoryMOCK = _interopRequireDefault(require("../repositories/mocks/UserTokensRepositoryMOCK"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let usersRepositoryMOCK;
let mailProviderMOCK;
let userTokensRepositoryMOCK;
let sendForgotPasswordEmailService;
describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    usersRepositoryMOCK = new _UsersRepositoryMOCK.default();
    mailProviderMOCK = new _MailProviderMOCK.default();
    userTokensRepositoryMOCK = new _UserTokensRepositoryMOCK.default();
    sendForgotPasswordEmailService = new _SendForgotPasswordEmailService.default(usersRepositoryMOCK, mailProviderMOCK, userTokensRepositoryMOCK);
  });
  it('should be able to recover the password by sending e-mail', async () => {
    const sendMail = jest.spyOn(mailProviderMOCK, 'sendMail');
    await usersRepositoryMOCK.createAndSaveUser({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123mudar'
    });
    await sendForgotPasswordEmailService.run({
      email: 'johndoe@gmail.com'
    });
    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to recover the password if there is no user', async () => {
    await expect(sendForgotPasswordEmailService.run({
      email: 'johndoe@email.com'
    })).rejects.toBeInstanceOf(_AppErrors.default);
  });
  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(userTokensRepositoryMOCK, 'generate');
    const user = await usersRepositoryMOCK.createAndSaveUser({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123mudar'
    });
    await sendForgotPasswordEmailService.run({
      email: 'johndoe@gmail.com'
    });
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});