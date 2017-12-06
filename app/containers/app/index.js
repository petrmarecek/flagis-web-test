import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import HomePage from 'containers/HomePage/Loadable';
import LandingPage from 'containers/landing-page/loadable'
import SignIn from 'containers/sign-in'
import SignUp from 'containers/sign-up'
import EmailResetPassword from 'containers/email-reset-password'
import ResetPassword from 'containers/reset-password'
import UserContainer from 'containers/user-container'
import TaskPage from 'containers/task-page'
import TagPage from 'containers/tag-page'

// import ArchivePage from './components/pages/archive-page'
// import AccountPage from './components/pages/account-page'
import NotFoundPage from 'containers/not-found-page/loadable';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/email-reset-password" component={EmailResetPassword} />
        <Route path="/reset-password/*" component={ResetPassword} />
        <Route path="/user" component={UserContainer} >
          <Route path="/tasks" component={TaskPage} />
          <Route path="tags" component={TagPage} />
          {/*<Route path="archive" component={ArchivePage} />
          <Route path="account" component={AccountPage} />*/}
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
