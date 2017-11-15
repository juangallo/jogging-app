import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isLoaded } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { filter } from 'lodash';
import { iterateRecords } from '../../utils';

import UsersTable from '../UsersTable';

class Management extends Component {
    renderTable() {
        let users = iterateRecords(this.props.users);
        if (this.props.profile.role === 'manager') {
            users = filter(users, o => o.role === 'manager' || o.role === 'user');
        }
        if (users && users.length > 0) {
            return <UsersTable users={users} />;
        } else if (isLoaded(this.props.users)) {
            return <div>No records yet!</div>;
        }
        return <div className="notification is-warning">Loading users...</div>;
    }

    render() {
        return (
            <div className="login hero is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div className="title is-1">Management</div>
                        <div>{this.renderTable()}</div>
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

Management.propTypes = {
    users: PropTypes.objectOf(PropTypes.object),
    profile: PropTypes.objectOf(PropTypes.string),
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
