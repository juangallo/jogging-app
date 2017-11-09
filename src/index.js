import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import configureStore from './store';

import Header from './components/Header';
import Home from './components/Home';
import CreateUser from './components/CreateUser';

import './styles/styles.css';

const store = configureStore({});

render(
    <BrowserRouter>
        <Provider store={store}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/create-user" component={CreateUser} />
            </Switch>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'),
);
