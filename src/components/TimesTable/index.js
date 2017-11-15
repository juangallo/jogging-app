import React from 'react';
import PropTypes from 'prop-types';

import RecordsTableRow from '../../containers/RecordsTableRow';

const TimesTable = (props) => {
    const { records } = props;
    if (records && records.length > 0) {
        const tableRows = records.map(record => (
            <RecordsTableRow
                key={record.id}
                id={record.id}
                date={record.date}
                distance={record.distance}
                time={record.time}
                speed={record.distance / record.time}
            />
        ));
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <abbr title="Date">Date</abbr>
                        </th>
                        <th>Distance</th>
                        <th>Time</th>
                        <th>Avg. Speed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{tableRows}</tbody>
            </table>
        );
    } else if (props.recordsLoaded) {
        return <div>No records yet!</div>;
    }
    return <div className="notification is-warning">Loading records...</div>;
};

TimesTable.defaultProps = {
    records: [],
    recordsLoaded: false,
};

TimesTable.propTypes = {
    records: PropTypes.arrayOf(PropTypes.object),
    recordsLoaded: PropTypes.bool,
};

export default TimesTable;
