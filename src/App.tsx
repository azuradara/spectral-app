import React from 'react';

import { Suspense } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Home from '#components/Home';
import Login from '#components/Login';
import Modal from '#components/shared/Modal';
import Tasks from '#components/Tasks';
import AuthRoute from '#hooks/AuthRoute';
import Sidebar from '#components/shared/Sidebar';
import Bookmarks from '#components/Bookmarks';
import Scrollbar from '#components/shared/Scrollbar';
import Background from '#components/shared/Background';
import NotificationDispatcher from '#components/shared/NotificationDispatcher';

const Root = (): JSX.Element => {
  return (
    <>
      <HashRouter>
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
              <Suspense fallback={null}>
                <Switch>
                  <AuthRoute exact path="/" component={Home} />
                  <AuthRoute exact path="/bookmarks" component={Bookmarks} />
                  <AuthRoute exact path="/tasks" component={Tasks} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </Suspense>
            </div>
          </Scrollbar>
        </div>
        <Modal />
      </HashRouter>
      <NotificationDispatcher />
    </>
  );
};

export default Root;
