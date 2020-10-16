import { injectable, inject } from 'tsyringe';

import IMailProvider from '@shared/providers/MailProvider/mocks/MailProviderMOCK';
import AppError from '@shared/errors/AppErrors';

// import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

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

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) { }

  public async run({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError('User not found');
    }

    await this.userTokenRepository.generate(user.id);

    this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebido',
    );
  }
}
