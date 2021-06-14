import React from 'react';
import Favorites from './components/Favorites/Favorites';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Favorites} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
