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
      <Switch>
        <AuthRoute exact path="/" component={Favorites} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
