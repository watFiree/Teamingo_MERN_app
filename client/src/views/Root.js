import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import {Context} from '../context/index';
import store from '../redux/store/index';
import SignUpView from './SignUpView';
import SignInView from './SignInView';
import MainView from './MainView';
import TeamsView from './TeamsView';
import NoteDetailsView from './NoteDetailsView';
import TeamDetailsView from './TeamDetailsView';
import ManageTeamsView from './ManageTeamsView';

function Root() {
  return (
    <Provider store={store}>
      <Context.Provider value={{}}>
        <Router>
          <Switch>
            <Route exact path="/" component={MainView}/>
            <Route exact path="/teams" component={TeamsView}/>
            <Route exact path="/team/:id" component={TeamDetailsView}/>
            <Route exact path="/profile/teams" component={ManageTeamsView}/>
            <Route exact path="/note/:id" component={NoteDetailsView}/>
            <Route exact path="/signin" component={SignInView}/>
            <Route exact path="/signup" component={SignUpView}/>
          </Switch>
        </Router>
      </Context.Provider>
    </Provider>
  );
}

export default Root;
