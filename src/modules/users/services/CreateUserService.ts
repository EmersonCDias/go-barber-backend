import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async run({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findUserByEmail(email);

    if (checkUserExists) {
      throw new AppError('E-mail address already exists');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.createAndSaveUser({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
