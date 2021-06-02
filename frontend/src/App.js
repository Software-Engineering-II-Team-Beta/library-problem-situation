import React from 'react';
import {
  BrowserRouter, Switch, Route,
  // NavLink
} from 'react-router-dom';

// import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import Home from './screens/Home';
import RecentsBooks from './screens/RecentsBooks';

import {Provider} from 'react-redux';
import store from './store';
import Books from './screens/Dashboard/books';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <div>
            {/* <div className="header">
              <NavLink exact activeClassName="active" to="/">Home</NavLink>
              <NavLink activeClassName="active" to="/login">Login</NavLink>
              <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink>
            </div> */}
            <div className="content">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/dashboard/books" component={Books} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/recents" component={RecentsBooks} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
