import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUserRepository {
  findUserById(id: string): Promise<User | undefined>;
  findUserByEmail(email: string): Promise<User | undefined>;
  createAndSaveUser(data: ICreateUserDTO): Promise<User>;
  saveUser(user: User): Promise<User>;
}
