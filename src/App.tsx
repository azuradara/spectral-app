import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthRoute from './lib/util/AuthRoute';

import Sidebar from './components/Sidebar';
import Modal from './components/Modal';
import Background from './components/Background';
import Bookmarks from './components/Bookmarks';
import Scrollbar from './components/Scrollbar';
import NotificationDispatcher from './components/helpers/NotificationDispatcher';

const App = (): JSX.Element => {
  return (
    <>
      <BrowserRouter>
        <Background />
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="App_inner">
          <Scrollbar
            autoHeight
            autoHeightMin={window.innerHeight}
            height="100vw"
          >
            <div className="App_inner--router">
              <Switch>
                <AuthRoute exact path="/" component={Home} />
                <AuthRoute exact path="/bookmarks" component={Bookmarks} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </Scrollbar>
        </div>
        <Modal />
      </BrowserRouter>
      <NotificationDispatcher />
    </>
  );
};

export default App;
