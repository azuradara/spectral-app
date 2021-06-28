import React from 'react';
import Favorites from './components/Favorites';
import Login from './components/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthRoute from './lib/util/AuthRoute';

import Sidebar from './components/Sidebar';

import ModalSrc from './lib/modal/ModalCtx';

const App = (): JSX.Element => {
  return (
    <ModalSrc>
      <BrowserRouter>
        <div className="App">
          <Sidebar />
          <div className="App_inner">
            <div className="App_inner--router">
              <Switch>
                <AuthRoute exact path="/" component={Favorites} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </ModalSrc>
  );
};

export default App;
