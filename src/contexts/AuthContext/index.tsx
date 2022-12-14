import React, { createContext, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import SessionService from '../../services/sessions.service';
import httpClient from '../../services/httpClient';
import { IAuthContext, IAuthProvider, IContextUser } from './types';

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthProvider): React.ReactElement => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('userToken'));
  const [user, setUser] = useState<IContextUser>({} as IContextUser);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const userId = localStorage.getItem('user');

    if (userToken) {
      if (userId) {
        setUser({ id: userId });
      }
      setToken(userToken);
      httpClient.api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, [token]);

  const signOut = (): void => {
    setToken('');
    setUser({});

    localStorage.removeItem('userToken');
  };

  async function signIn(email: string, password: string): Promise<string | undefined> {
    try {
      const data = await SessionService.login(email, password);

      const { token: userToken, user: userData } = data;

      setToken(userToken);
      setUser(userData);

      localStorage.setItem('userToken', userToken);
      localStorage.setItem('userId', userData.id);
      localStorage.setItem('userName', userData.username);
      return userToken;
    } catch (error) {
      if (error) {
        toast.error((error as AxiosError).response?.data.message);
      }
      return undefined;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        signIn,
        signOut,
        signed: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
