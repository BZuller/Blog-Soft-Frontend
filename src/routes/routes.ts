import { lazy } from 'react';
import { IRoute } from './types';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Actions = lazy(() => import('../pages/Users/Actions'));
const Error = lazy(() => import('../pages/Error'));

export const routes: IRoute[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/Login',
    component: Login,
  },
  {
    path: '/funcionarios/acao/:id?',
    component: Actions,
  },
  {
    path: '*',
    component: Error,
    public: true,
  },
];