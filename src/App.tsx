import React from 'react';
import Favorites from './components/Favorites';
import Login from './components/Login';

import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import requireAuth from './lib/util/requireAuth';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
