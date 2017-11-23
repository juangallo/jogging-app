import { filter } from 'lodash';
import moment from 'moment';

export function iterateRecords(records) {
    const res = [];
    for (const uniqueId in records) {
        const item = records[uniqueId];
        item.id = uniqueId;
        res.push(item);
    }
    return res;
}

export function convertToKmH(speed) {
    const inKmh = speed * 3.6;
    return inKmh.toFixed(2);
}

export function getWeekAvg(records, date, resultsType) {
    const endDate = date.endOf('isoweek').unix();
    const startDate = date.startOf('isoweek').unix();

    // filter records for desired week
    const weekRecords = filter(
        records,
        record => record.date >= startDate && endDate > record.date,
    );

    // return 0 if filtered records are empty
    if (weekRecords.length <= 0) {
        return 0;
    }

    if (resultsType === 'speeds') {
        // push records speeds into an array
        let weekSpeeds = [];
        weekRecords.forEach((record) => {
            weekSpeeds = [record.distance / record.time, ...weekSpeeds];
        });

        // sum all records speeds
        let weekTotalSpeed = 0;
        weekSpeeds.forEach((speed) => {
            weekTotalSpeed += speed;
        });

        // return average speed in kmh
        return convertToKmH(weekTotalSpeed / weekSpeeds.length);
    }

    if (resultsType === 'distances') {
        // push records distances into an array
        let weekDistances = [];
        weekRecords.forEach((record) => {
            weekDistances = [record.distance, ...weekDistances];
        });

        // sum all records distances
        let weekTotalDistance = 0;
        weekDistances.forEach((distance) => {
            weekTotalDistance += distance;
        });

        // return average distance in km
        return (weekTotalDistance / 1000).toFixed(2) / weekDistances.length;
    }
}

export function getWeeklyAvgArr(records, resultsType, amount, endDate) {
    let results = [];
    for (let i = 0; i < amount; i += 1) {
        let auxDate = moment().subtract(i, 'week');
        if (endDate) {
            const endDateClone = endDate.clone();
            auxDate = endDateClone.subtract(i, 'week');
        }
        results = [getWeekAvg(records, auxDate, resultsType), ...results];
    }

    return results;
}

export function getWeekDates(amount, endDate) {
    let labels = [];
    for (let i = 0; i < amount; i += 1) {
        let auxDate = moment().subtract(i, 'week');
        if (endDate) {
            const endDateClone = endDate.clone();
            auxDate = endDateClone.subtract(i, 'week');
        }
        const str = `${auxDate.startOf('isoweek').format('MM/DD')} - ${auxDate
            .endOf('week')
            .format('MM/DD')}`;
        labels = [str, ...labels];
    }
    return labels;
}
