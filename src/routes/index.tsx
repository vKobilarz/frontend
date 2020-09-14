import React, { FC } from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SetupUrl from '../pages/SetupUrl';
import SignUp from '../pages/SignUp';
import Ocurrences from '../pages/Ocurrences';
import Profile from '../pages/Profile';
import ForgotPassword from '../pages/ForgotPassword';
import NewOcurrence from '../pages/NewOcurrence';

import Route from './Route';

const Routes: FC = () => (
  <Switch>
    <Route path="/" exact component={SetupUrl} />
    <Route path="/login" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />

    <Route path="/ocurrences" component={Ocurrences} exact isPrivate />
    <Route path="/ocurrences/new" component={NewOcurrence} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />
  </Switch>
);

export default Routes;
