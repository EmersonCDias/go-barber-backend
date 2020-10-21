import { injectable, inject } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/mocks/MailProviderMOCK';
import AppError from '@shared/errors/AppErrors';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) { }

  public async run({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError('User not found');
    }

    await this.userTokensRepository.generate(user.id);

    await this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebido',
    );
  }
}
