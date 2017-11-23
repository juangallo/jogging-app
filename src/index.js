import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './bulma.css';

import configureStore from './store';

import { MANAGE_USER, MANAGE_RECORD, MANAGEMENT, DASHBOARD, LOGIN, HOME } from './consts/routes';

import ManageUser from './containers/ManageUser';
import ManageRecord from './containers/ManageRecord';
import Manager from './containers/Management';
import Dashboard from './containers/Dashboard';
import SignUp from './containers/SignUp';
import Login from './containers/Login';

const store = configureStore({});

render(
    <BrowserRouter>
        <Provider store={store}>
            <Switch>
                <Route path={`${MANAGE_USER}/:uid`} component={ManageUser} />
                <Route path={MANAGE_USER} component={ManageUser} />
                <Route path={`${MANAGE_RECORD}/:recordId`} component={ManageRecord} />
                <Route path={MANAGE_RECORD} component={ManageRecord} />
                <Route path={MANAGEMENT} component={Manager} />
                <Route path={`${DASHBOARD}/:uid`} component={Dashboard} />
                <Route path={DASHBOARD} component={Dashboard} />
                <Route path={LOGIN} component={Login} />
                <Route path={HOME} component={SignUp} />
            </Switch>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'),
);
