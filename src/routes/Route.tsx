import React, { FC, ComponentType } from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/AuthConfig';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  isAdmin?: boolean;
  component: ComponentType;
}

const Route: FC<RouteProps> = ({
  isPrivate = false,
  isAdmin = false,
  component: Component,
  ...rest
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === isAuthenticated ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/login' : '/ocurrences',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
