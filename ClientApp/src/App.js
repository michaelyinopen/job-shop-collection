import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import * as fromRoutePaths from './routePaths';
import JobShopCollection from './components/JobShopCollection';
import JobSets from './components/JobSets';
import ComingSoon from './components/ComingSoon';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <JobShopCollection>
          <Switch>
            <Route exact path={fromRoutePaths.home} component={Home} />
            <Route exact path={fromRoutePaths.about} component={About} />
            <Route exact path={fromRoutePaths.jobSets} component={JobSets} />
            <Route exact path={fromRoutePaths.jobSet} component={ComingSoon} />
          </Switch>
        </JobShopCollection>
      </Layout>
    );
  }
}
