import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './bulma.css';

import configureStore from './store';

import CreateUser from './containers/CreateUser';
import Login from './containers/Login';

const store = configureStore({});

render(
    <BrowserRouter>
        <Provider store={store}>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" component={CreateUser} />
            </Switch>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'),
);
