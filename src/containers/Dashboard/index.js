import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { DateRangePicker, isInclusivelyAfterDay } from 'react-dates';
import moment from 'moment';
import { filter } from 'lodash';
import { iterateRecords } from '../../utils';
import Header from '../Header';
import TimesTable from '../../components/TimesTable';
import Report from '../../components/Report';

import { EDIT_RECORD, DASHBOARD, MANAGEMENT } from '../../consts/routes';

import './style.css';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weeks: 4,
            records: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.records !== nextProps.records) {
            const { records } = nextProps;
            if (records) {
                const sortedRecords = iterateRecords(records).sort((a, b) => b.date - a.date);
                const a = moment.unix(sortedRecords[0].date);
                const b = moment.unix(sortedRecords[sortedRecords.length - 1].date);
                this.setState({
                    weeks: a.diff(b, 'weeks') + 2,
                    records: sortedRecords,
                    recordsLoaded: true,
                });
            } else {
                this.setState({
                    weeks: 1,
                    records: [],
                    recordsLoaded: true,
                });
            }
        }
    }

    onDatesChange(startDate, endDate) {
        this.setState({ startDate, endDate });
        if (startDate && endDate) {
            this.setState({ weeks: endDate.diff(startDate, 'weeks') + 1 });

            this.setState({
                records: filter(
                    this.props.records,
                    record => record.date >= startDate.unix() && endDate.unix() > record.date,
                ),
            });
        }
    }

    renderName() {
        const { location, profile } = this.props;
        if (location.username) {
            return location.username;
        } else if (profile && profile.username) {
            return profile.username;
        }
    }

    render() {
        const today = moment.locale('en');
        let navigation = [DASHBOARD, 'logout'];
        if (this.props.profile) {
            const { role } = this.props.profile;
            if (role === 'admin' || role === 'manager') {
                navigation = [DASHBOARD, MANAGEMENT, 'logout'];
            }
        }

        return (
            <div className="login hero is-fullheight">
                <Header navigation={navigation} current={DASHBOARD} />
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title is-1">{this.renderName()} Dashboard</h1>
                        <h3 className="title is-4">Filter</h3>
                        <DateRangePicker
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onDatesChange={({ startDate, endDate }) =>
                                this.onDatesChange(startDate, endDate)}
                            focusedInput={this.state.focusedInput}
                            onFocusChange={focusedInput => this.setState({ focusedInput })}
                            isOutsideRange={day => isInclusivelyAfterDay(today, day)}
                        />
                        <div className="columns">
                            <div className="column is-half">
                                <h2 className="title is-3">Records</h2>
                                {this.props.location.uid ? (
                                    <Link
                                        push
                                        to={{
                                            pathname: EDIT_RECORD,
                                            uid: this.props.location.uid,
                                        }}
                                        id="edit-record-uid"
                                    >
                                        <button className="add-record-button button is-primary is-medium">
                                            Add Record
                                        </button>
                                    </Link>
                                ) : (
                                    <Link to={EDIT_RECORD} id="edit-record">
                                        <button className="add-record-button button is-primary is-medium">
                                            Add Record
                                        </button>
                                    </Link>
                                )}

                                <TimesTable
                                    records={this.state.records}
                                    recordsLoaded={this.state.recordsLoaded}
                                    deleteRow={this.deleteRow}
                                />
                            </div>
                            <div className="column is-half">
                                <h2 className="title is-3">Weekly Report</h2>
                                {this.state.recordsLoaded ? (
                                    <Report
                                        records={this.state.records}
                                        weeks={this.state.weeks}
                                        endDate={this.state.endDate}
                                    />
                                ) : (
                                    <div id="loading-report">Loading...</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.defaultProps = {
    records: undefined,
};

const { objectOf, object } = PropTypes;
const { location } = ReactRouterPropTypes;
Dashboard.propTypes = {
    /* eslint-disable react/no-typos */
    records: objectOf(object),
    location: location.isRequired,
};

const authConnected = connect(({ firebase }, { match }) => ({
    auth: pathToJS(firebase, 'auth'),
    match: pathToJS(firebase, 'match'),
}))(Dashboard);

function query(auth, match) {
    if (match.params.uid) {
        return {
            path: 'records',
            queryParams: ['orderByChild=user', `equalTo=${match.params.uid}`],
        };
    }
    return {
        path: 'records',
        queryParams: ['orderByChild=user', `equalTo=${auth ? auth.uid : ''}`],
    };
}

const fbWrapped = firebaseConnect(({ auth, match }) => [query(auth, match)])(authConnected);

export default connect(({ firebase }, { auth }) => ({
    records: dataToJS(firebase, 'records'),
    profile: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth'),
}))(fbWrapped);
