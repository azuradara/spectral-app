import React from 'react';
import Favorites from './components/Favorites';
import Login from './components/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthRoute from './lib/util/AuthRoute';

import Sidebar from './components/Sidebar';
import Modal from './components/Modal';
import Background from './components/Background';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Background />
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="App_inner">
        <div className="App_inner--router">
          <Switch>
            <AuthRoute exact path="/" component={Favorites} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </div>
      <Modal />
    </BrowserRouter>
  );
};

export default App;
