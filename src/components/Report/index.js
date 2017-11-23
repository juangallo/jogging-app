import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { getWeeklyAvgArr, getWeekDates } from '../../utils';

const Report = (props) => {
    const data = {
        labels: getWeekDates(props.weeks, props.endDate),
        datasets: [
            {
                label: 'Distance (km)',
                data: getWeeklyAvgArr(props.records, 'distances', props.weeks, props.endDate),
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 3,
            },
            {
                label: 'Avg. Speed (km/h)',
                data: getWeeklyAvgArr(props.records, 'speeds', props.weeks, props.endDate),
                borderColor: 'rgba(2, 200, 2,1)',
                borderWidth: 3,
            },
        ],
    };

    return <Line data={data} redraw />;
};

const { arrayOf, object, number } = PropTypes;
Report.propTypes = {
    records: arrayOf(object).isRequired,
    weeks: number.isRequired,
    endDate: object,
};

export default Report;
