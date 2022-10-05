import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from './routes';

// components;
import Loader from '../components/Loader';

const Routes: React.FunctionComponent = () => {
  const renderRoutes = (): React.ReactNode => routes.map((route) => <Route key={route.path} {...route} exact />);

  return (
    <main>
      <React.Suspense fallback={<Loader />}>
        <Switch>{renderRoutes()}</Switch>
      </React.Suspense>
    </main>
  );
};

Routes.defaultProps = { public: false };

export default Routes;
