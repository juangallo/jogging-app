import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';

const UsersTable = (props) => {
    const tableRows = props.users.map(user => (
        <tr key={user.id}>
            <th>{user.username}</th>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
                <button onClick={() => props.firebase.remove(`users/${user.id}`)}>
                    <i className="fa fa-trash" />
                </button>
                <Link
                    to={{
                        pathname: `/edit-user/${user.id}`,
                    }}
                >
                    <button>
                        <i className="fa fa-edit" />
                    </button>
                </Link>
            </td>
        </tr>
    ));
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>{tableRows}</tbody>
        </table>
    );
};

UsersTable.PropTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default firebaseConnect()(UsersTable);
