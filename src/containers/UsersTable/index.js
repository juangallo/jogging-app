import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { deleteUser, cleanState } from '../../actions/userActions';

import { DASHBOARD } from '../../consts/routes';

class UsersTable extends Component {
    componentWillUnmount() {
        this.props.cleanState();
    }

    render() {
        const tableRows = this.props.users.map(user => (
            <tr key={user.id}>
                <th>
                    {this.props.role === 'admin' ? (
                        <Link
                            push
                            to={{
                                pathname: `${DASHBOARD}/${user.id}`,
                                uid: user.id,
                                username: user.username,
                            }}
                        >
                            {user.username}
                        </Link>
                    ) : (
                        user.username
                    )}
                </th>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                    <button onClick={() => this.props.deleteUser(user.id)}>
                        {this.props.loadingDelete ? (
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
    }
}

function mapStateToProps(state) {
    return {
        loadingDelete: state.user.loadingDelete,
        successDelete: state.user.successDelete,
        errorMessageDelete: state.user.errorMessageDelete,
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ deleteUser, cleanState }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
