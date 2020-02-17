import React from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
import Navigation from './navigation/Navigation';
import NavigationOptions from '../constants/NavigationOptions';
import Home from './home/Home';
import NotFound from './not-found/NotFound';
import PerformanceDashboard from './performance-dashboard/PerformanceDashboard';


// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    return (
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

    );
  }
}

export default App;
