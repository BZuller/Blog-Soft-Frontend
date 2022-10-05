import IPost from '../interfaces/IPost';
import HttpClient from './httpClient';

export default class PostsService {
  static async getPosts(): Promise<IPost[]> {
    const { data } = await HttpClient.api.get<IPost[]>('/api/v1/post');
    return data;
  }
}
