import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './bulma.css';

import configureStore from './store';

import { EDIT_RECORD, MANAGEMENT, DASHBOARD, LOGIN, HOME } from './consts/routes';

import EditRecord from './containers/EditRecord';
import Manager from './containers/Management';
import Dashboard from './containers/Dashboard';
import CreateUser from './containers/CreateUser';
import Login from './containers/Login';

const store = configureStore({});

render(
    <BrowserRouter>
        <Provider store={store}>
            <Switch>
                <Route path={`${EDIT_RECORD}/:recordId`} component={EditRecord} />
                <Route path={EDIT_RECORD} component={EditRecord} />
                <Route path={MANAGEMENT} component={Manager} />
                <Route path={DASHBOARD} component={Dashboard} />
                <Route path={LOGIN} component={Login} />
                <Route path={HOME} component={CreateUser} />
            </Switch>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'),
);
