import React from 'react';
import { shallow } from 'enzyme';

import TimesTable from './';

describe('TimesTable', () => {
    let props;
    let mountedTimesTable;
    const timesTable = () => {
        if (!mountedTimesTable) {
            mountedTimesTable = shallow(<TimesTable {...props} />);
        }
        return mountedTimesTable;
    };

    beforeEach(() => {
        props = {
            records: undefined,
            recordsLoaded: undefined,
        };
        mountedTimesTable = undefined;
    });

    it('should render a loading div when recordsLoaded are false', () => {
        props.recordsLoaded = false;
        expect(timesTable()
            .find('#loading')
            .exists()).toBe(true);
    });
    it('should render a no-records div when recordsLoaded are true and records are empty', () => {
        props.recordsLoaded = true;
        props.records = [];
        expect(timesTable()
            .find('#no-records')
            .exists()).toBe(true);
    });
    it('should render a table when recordsLoaded are true and records are NOT empty', () => {
        props.recordsLoaded = true;
        props.records = [
            {
                date: 1511371297,
                distance: 333,
                id: '-KzZjyS0f_W_sim1MnqS',
                time: 180,
                user: 'nKpRdOmNaxajXWiQA9OgmeIIKzv1',
            },
            {
                date: 1511371291,
                distance: 111,
                id: '-KzZjwpFfKWy4xTZnyu-',
                time: 120,
                user: 'nKpRdOmNaxajXWiQA9OgmeIIKzv1',
            },
        ];
        expect(timesTable()
            .find('table')
            .exists()).toBe(true);
    });
});
