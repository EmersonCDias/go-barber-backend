import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async run(user_id: string): Promise<User> {
    const user = await this.usersRepository.findUserById(user_id);

    if (!user) throw new AppError('User not found');

    return user;
  }
}
