import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Loadable from 'react-loadable';
import Header from '@components/common/header';
import PageLoader from '@components/common/PageLoader';
import { APP_CONFIG } from '@constants';

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (typeof window.localStorage.getItem('userData') !== 'undefined'
        && window.localStorage.getItem('userData') !== null
        && window.localStorage.getItem('userData') !== '' ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        ))
      }
    />
  );
};

const LoadingComponent = ({ isLoading, isError }) => {
  if (isLoading) {
    return <PageLoader />;
  }
  if (isError) {
    return (
      <div>
        Sorry, unable to load the page
      </div>
    );
  }
  return null;
};

const Login = Loadable({
  loader: () => import('@containers/Login'),
  loading: LoadingComponent,
});

const Welcome = Loadable({
  loader: () => import('@components/Welcome'),
  loading: LoadingComponent,
});

const Users = Loadable({
  loader: () => import('@containers/Users'),
  loading: LoadingComponent,
});

const ActiveUser = Loadable({
  loader: () => import('@containers/activeUser'),
  loading: LoadingComponent,
});

const DashBoard = Loadable({
  loader: () => import('@containers/DashBoard'),
  loading: LoadingComponent,
});

const ForgotPassword = Loadable({
  loader: () => import('@components/ForgotPassword'),
  loading: LoadingComponent,
});

const notFound = Loadable({
  loader: () => import('@components/404NotFound'),
  loading: LoadingComponent,
});

export default (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path={`${APP_CONFIG.BASE_URL}/`} component={Welcome} />
        <Route exact path={`${APP_CONFIG.BASE_URL}/login`} component={Login} />
        <Route exact path={`${APP_CONFIG.BASE_URL}/forgotpassword`} component={ForgotPassword} />
        <PrivateRoute exact path={`${APP_CONFIG.BASE_URL}/dashboard`} component={DashBoard} />
        <Route exact path={`${APP_CONFIG.BASE_URL}/users`} component={Users} />
        <Route exact path={`${APP_CONFIG.BASE_URL}/users/:id`} component={ActiveUser} />
        <Route path="*" component={notFound} />
      </Switch>
    </div>
  </Router>
);
