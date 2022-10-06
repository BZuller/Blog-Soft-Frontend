export default interface IPost {
  id: string;
  title: string;
  author: { name: string };
  content: string;
  categorie: { id: string; name: string };
  created_at: string;
}
