import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './route';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Meetup from '../pages/Meetup/Details';
import New_Edit from '~/pages/Meetup/New_Edit';
import Profile from '~/pages/Profile';
import SignUp from '~/pages/SignUp';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/meetup" component={Meetup} isPrivate />
      <Route path="/new" component={New_Edit} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
}
