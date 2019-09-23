import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout';
import { Home } from './components/Home';
import JobShopCollection from './components/JobShopCollection';
import JobSets from './components/JobSets';
import * as fromRoutePaths from './routePaths';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <JobShopCollection>
          <Switch>
            <Route exact path={fromRoutePaths.home} component={Home} />
            <Route exact path={fromRoutePaths.jobSets} component={JobSets} />
            <Route path={fromRoutePaths.jobSet} component={JobSets} />
          </Switch>
        </JobShopCollection>
      </Layout>
    );
  }
}
