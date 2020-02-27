import React from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Navigation from './components/navigation/Navigation';
import NavigationOptions from './constants/NavigationOptions';
import Home from './components/home/Home';
import NotFound from './components/not-found/NotFound';
import PerformanceDashboard from './components/performance-dashboard/PerformanceDashboard';

import store from './store';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div id="app-container">
            <div id="navbar">
              <Navigation navOptions={NavigationOptions} />
            </div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/performance" component={PerformanceDashboard} />
              <Route exact path="*" component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>

    );
  }
}

export default App;