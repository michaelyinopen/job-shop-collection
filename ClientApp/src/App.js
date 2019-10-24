import React, { Component } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import * as fromRoutePaths from './routePaths';
import About from './components/About';
import JobShopCollection from './components/JobShopCollection';
import JobSets from './components/JobSets';
import JobSet from './components/JobSet';
import PageNotFound from './components/PageNotFound';
import AppSnackbar from './components/AppSnackbar';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <Layout>
          <JobShopCollection>
            <Switch>
              <Route exact path={fromRoutePaths.home} component={Home} />
              <Route exact path={fromRoutePaths.about} component={About} />
              <Route exact path={fromRoutePaths.jobSets} component={JobSets} />
              <Route exact path={fromRoutePaths.newJobSet} component={JobSet} />
              <Route exact path={fromRoutePaths.jobSet} render={({ match }) => (
                <JobSet
                  id={+match.params.id}
                  edit={Boolean(match.params.edit)}
                />
              )} />
              <Route component={PageNotFound} />
            </Switch>
            <AppSnackbar />
          </JobShopCollection>
        </Layout>
      </DndProvider>
    );
  }
}
