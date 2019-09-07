import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import JobSets from './components/JobSets';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/fetch-data' component={FetchData} />
          <Route path='/job-sets' component={JobSets} />
        </Switch>
      </Layout>
    );
  }
}
