import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { deleteUser } from '../../actions/userActions';

const UsersTable = (props) => {
    const tableRows = props.users.map(user => (
        <tr key={user.id}>
            <th>{user.username}</th>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
                <button onClick={() => props.deleteUser(user.id)}>
                    {props.loadingDelete ? (
                        <i className="fa fa-spinner" />
                    ) : (
                        <i className="fa fa-trash" />
                    )}
                </button>
                <Link
                    to={{
                        pathname: `/create-user/${user.id}`,
                        username: user.username,
                        email: user.email,
                        role: user.role,
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

function mapStateToProps(state) {
    return {
        loadingDelete: state.user.loadingDelete,
        successDelete: state.user.successDelete,
        errorMessageDelete: state.user.errorMessageDelete,
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ deleteUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
