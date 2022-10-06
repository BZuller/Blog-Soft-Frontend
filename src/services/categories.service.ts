import ICategorie from '../interfaces/ICategorie';
import HttpClient from './httpClient';

export default class CategoriesService {
  static async getCategories(): Promise<ICategorie[]> {
    const { data } = await HttpClient.api.get<ICategorie[]>('/api/v1/categorie');
    return data;
  }
}
