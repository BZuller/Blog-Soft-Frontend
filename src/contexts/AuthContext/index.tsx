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

    if (userToken) {
      setToken(userToken);
      httpClient.api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, [token]);

  const signOut = (): void => {
    setToken('');
    setUser({});

    localStorage.removeItem('userToken');
  };

  const signIn = async (email: string, password: string): Promise<string | undefined> => {
    try {
      const data = await SessionService.login(email, password);

      const { token: userToken, user: userData } = data;

      setToken(userToken);
      setUser({ id: userData.id, name: userData.email });

      localStorage.setItem('userToken', userToken);
      return userToken;
    } catch (error) {
      if (error) {
        toast.error((error as AxiosError).response?.data.message);
      }
      return undefined;
    }
  };

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