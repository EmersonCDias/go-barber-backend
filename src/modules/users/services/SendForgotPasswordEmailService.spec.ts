import AppError from '@shared/errors/AppErrors';

import MailProviderMOCK from '@shared/providers/MailProvider/mocks/MailProviderMOCK';

import UsersRepositoryMOCK from '../repositories/mocks/UsersRepositoryMOCK';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import UserTokenRepositoryMOCK from '../repositories/mocks/UserTokenRepositoryMOCK';

let usersRepositoryMOCK: UsersRepositoryMOCK;
let mailProviderMOCK: MailProviderMOCK;
let userTokenRepositoryMOCK: UserTokenRepositoryMOCK;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    usersRepositoryMOCK = new UsersRepositoryMOCK();
    mailProviderMOCK = new MailProviderMOCK();
    userTokenRepositoryMOCK = new UserTokenRepositoryMOCK();
    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      usersRepositoryMOCK,
      mailProviderMOCK,
      userTokenRepositoryMOCK,
    );
  });

  it('should be able to recover the password by sending e-mail', async () => {
    const sendMail = jest.spyOn(mailProviderMOCK, 'sendMail');

    await usersRepositoryMOCK.createAndSaveUser({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123mudar',
    });

    await sendForgotPasswordEmailService.run({
      email: 'johndoe@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover the password if there is no user', async () => {
    await expect(
      sendForgotPasswordEmailService.run({
        email: 'johndoe@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(userTokenRepositoryMOCK, 'generate');

    const user = await usersRepositoryMOCK.createAndSaveUser({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123mudar',
    });

    await sendForgotPasswordEmailService.run({
      email: 'johndoe@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
