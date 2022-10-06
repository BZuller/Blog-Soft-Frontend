import HttpClient from './httpClient';
import ICreateUser from '../interfaces/ICreateUser';

export default class UsersService {
  static async createUser(user: ICreateUser): Promise<ICreateUser> {
    const { name, email, username, password } = user;
    const { data } = await HttpClient.api.post('/api/v1/user', { name, email, username, password });
    return data;
  }
}
