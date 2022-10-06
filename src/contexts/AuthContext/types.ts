export interface IAuthContext {
  token?: string | null;
  user: IContextUser;
  signIn: (email: string, password: string) => Promise<string | undefined>;
  signOut: () => void;
  signed: boolean;
}

export interface IContextUser {
  id?: string | null;
  name?: string | null;
}

export interface IAuthProvider {
  children: JSX.Element;
}
