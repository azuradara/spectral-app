import React from 'react';
import Favorites from './components/Favorites';
import Login from './components/Login';
import { PersistGate } from 'redux-persist/integration/react';

import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AuthRoute from './lib/util/AuthRoute';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute exact path="/" component={Favorites} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
