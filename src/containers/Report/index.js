import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { getWeeklyAvgArr, getWeekDates } from '../../utils';

const Report = (props) => {
    const data = {
        labels: getWeekDates(props.weeks),
        datasets: [
            {
                label: 'Distance (km)',
                data: getWeeklyAvgArr(props.records, 'distances', props.weeks),
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 3,
            },
            {
                label: 'Avg. Speed (km/h)',
                data: getWeeklyAvgArr(props.records, 'speeds', props.weeks),
                borderColor: 'rgba(2, 200, 2)',
                borderWidth: 3,
            },
        ],
    };

    return <Line data={data} redraw />;
};

Report.propTypes = {
    records: PropTypes.arrayOf(PropTypes.object).isRequired,
    weeks: PropTypes.number.isRequired,
};

export default Report;
