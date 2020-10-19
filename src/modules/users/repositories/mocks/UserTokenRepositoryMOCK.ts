import { uuid } from 'uuidv4';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

import UserToken from '../../infra/typeorm/entities/UserToken';

export default class UserTokenRepositoryMOCK implements IUserTokenRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findUserByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(item => item.token === token);

    return userToken;
  }
}
