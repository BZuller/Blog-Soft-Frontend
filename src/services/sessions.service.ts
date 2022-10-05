import { IUser } from '../interfaces';
import HttpClient from './httpClient';

interface ILoginResponse {
  user: IUser;
  token: string;
}

class SessionService {
  static async login(email: string, password: string): Promise<ILoginResponse> {
    const { data } = await HttpClient.api.post('/api/v1/session', { email, password });

    return data;
  }
}

export default SessionService;
