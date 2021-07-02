import React from 'react';
import Favorites from './components/Favorites';
import Login from './components/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthRoute from './lib/util/AuthRoute';

import Sidebar from './components/Sidebar';
import Modal from './components/Modal';
import Background from './components/Background';
import Bookmarks from './components/Bookmarks';
import Scrollbar from './components/Scrollbar';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Background />
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="App_inner">
        <Scrollbar
          autoHeight
          autoHeightMin={window.innerHeight}
          height={window.innerHeight}
        >
          <div className="App_inner--router">
            <Switch>
              <AuthRoute exact path="/" component={Favorites} />
              <AuthRoute exact path="/bookmarks" component={Bookmarks} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </Scrollbar>
      </div>
      <Modal />
    </BrowserRouter>
  );
};

export default App;
