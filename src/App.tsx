import React from 'react';
import Favorites from './components/Favorites';
import Login from './components/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthRoute from './lib/util/AuthRoute';

import Sidebar from './components/Sidebar';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Sidebar />
      <div className="App_inner">
        <div className="App_inner--router">
          <Switch>
            <AuthRoute exact path="/" component={Favorites} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
