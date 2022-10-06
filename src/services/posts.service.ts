import ICreatePost from '../interfaces/ICreatePost';
import IPost from '../interfaces/IPost';
import HttpClient from './httpClient';

export default class PostsService {
  static async getPosts(): Promise<IPost[]> {
    const { data } = await HttpClient.api.get<IPost[]>('/api/v1/post');
    return data;
  }

  static async createPost(post: ICreatePost): Promise<IPost> {
    const { title, content, categorieId, authorId } = post;
    const { data } = await HttpClient.api.post('/api/v1/post', {
      title,
      content,
      categorieId,
      authorId,
    });
    return data;
  }
}
