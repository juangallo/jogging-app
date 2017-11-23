import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isLoaded } from 'react-redux-firebase';
import { Link, Redirect } from 'react-router-dom';
import { filter } from 'lodash';
import { iterateRecords } from '../../utils';

import { HOME, MANAGE_USER, DASHBOARD, MANAGEMENT } from '../../consts/routes';

import Header from '../Header';
import UsersTable from '../UsersTable';

export class Management extends Component {
    renderTable() {
        let users = iterateRecords(this.props.users);
        const { profile } = this.props;
        if (profile.role === 'manager') {
            users = filter(users, o => o.role === 'manager' || o.role === 'user');
        } else if (profile.role !== 'admin') {
            return <Redirect to={HOME} id="redirect-bad-role" />;
        }
        if (users && users.length > 0) {
            return <UsersTable users={users} role={profile.role} id="UsersTable" />;
        } else if (isLoaded(this.props.users)) {
            return <div id="no-users">No users yet!</div>;
        }
        return (
            <div className="notification is-warning" id="loading-users">
                Loading users...
            </div>
        );
    }

    render() {
        const navigation = [DASHBOARD, MANAGEMENT, 'logout'];

        return (
            <div className="login hero is-fullheight">
                <Header navigation={navigation} current={MANAGEMENT} />
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div className="title is-1">Management</div>
                        <div>
                            <Link to={MANAGE_USER}>
                                <button className="add-record-button button is-primary is-medium">
                                    Add User
                                </button>
                            </Link>
                            {this.renderTable()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Management.defaultProps = {
    users: undefined,
    profile: {},
};

const { objectOf, object, string } = PropTypes;
Management.propTypes = {
    users: objectOf(object),
    profile: objectOf(string),
};

const authConnected = connect(({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
}))(Management);

const fbWrapped = firebaseConnect(({ auth }) => [
    {
        path: 'users',
        queryParams: ['orderByChild=user'],
    },
])(authConnected);

export default connect(({ firebase }, { auth }) => ({
    users: dataToJS(firebase, 'users'),
    auth: pathToJS(firebase, 'auth'),
    profile: pathToJS(firebase, 'profile'),
}))(fbWrapped);
