import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isLoaded } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { iterateRecords } from '../../utils';
import TimesTable from '../../components/TimesTable';
import Report from '../../containers/Report';

import { EDIT_RECORD } from '../../consts/routes';

import './style.css';

class Dashboard extends React.Component {
    render() {
        const records = iterateRecords(this.props.records).sort((a, b) => b.date - a.date);

        return (
            <div className="login hero is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <Link to={EDIT_RECORD}>
                            <button className="add-record-button button is-primary is-medium">
                                Add Record
                            </button>
                        </Link>

                        <TimesTable
                            records={records}
                            recordsLoaded={isLoaded(this.props.records)}
                            deleteRow={this.deleteRow}
                        />

                        <h1>Weekly Report</h1>
                        {isLoaded(this.props.records) ? (
                            <Report records={records} />
                        ) : (
                            <div>Loading...</div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.defaultProps = {
    records: undefined,
};

Dashboard.propTypes = {
    records: PropTypes.objectOf(PropTypes.object),
};

const authConnected = connect(({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
}))(Dashboard);

const fbWrapped = firebaseConnect(({ auth }) => [
    {
        path: 'records',
        queryParams: ['orderByChild=user', `equalTo=${auth ? auth.uid : ''}`],
    },
])(authConnected);

export default connect(({ firebase }, { auth }) => ({
    records: dataToJS(firebase, 'records'),
    auth: pathToJS(firebase, 'auth'),
}))(fbWrapped);
