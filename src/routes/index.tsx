import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from './routes';

// components;
import Loader from '../components/Loader';

const Routes: React.FunctionComponent = () => {
  const renderRoutes = (): React.ReactNode => routes.map((route) => <Route key={route.path} {...route} exact />);

  return (
    <div className="d-flex">
      <div className="d-flex flex-column p-0 w-100">
        <main>
          <React.Suspense fallback={<Loader />}>
            <Switch>{renderRoutes()}</Switch>
          </React.Suspense>
        </main>
      </div>
    </div>
  );
};

Routes.defaultProps = { public: false };

export default Routes;
