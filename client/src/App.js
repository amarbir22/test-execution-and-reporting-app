import React from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import './App.css';
import Navigation from './components/navigation/Navigation';
import NavigationOptions from './constants/NavigationOptions';

import ShowReports from './components/show-report/ShowReports';
import PerfReport from './components/perf-report/PerfReport';
import Home from './components/home/Home';
import NotFound from './components/not-found/NotFound';
import PerformanceDashboard from './components/performance-dashboard/PerformanceDashboard';
import Notification from './components/notfication/Notification';
import AddReport from './components/add-report/AddReport';
import AddTeamForm from './components/add-team/AddTeamForm';
import ShowReport from './components/show-report/ShowReport';


// eslint-disable-next-line react/prefer-stateless-function
const App = () => (
  <Provider store={store}>
    <Router>
      <div id="app-container">
        <div id="navbar">
          <Navigation navOptions={NavigationOptions} />
          <Notification />
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/performance" component={PerformanceDashboard} />
          <Route exact path="/reporting/performance-dashboard" component={PerfReport} />
          <Route exact path="/reporting/all" component={ShowReports} />
          <Route exact path="/report/:id" component={ShowReport} />
          <Route exact path="/reporting/add-report" component={AddReport} />
          <Route exact path="/team/add-team" component={AddTeamForm} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default App;
