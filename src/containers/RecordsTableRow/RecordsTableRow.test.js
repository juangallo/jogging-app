import React from 'react';
import { shallow } from 'enzyme';

import { RecordsTableRow } from './';

describe('RecordsTableRow', () => {
    let props;
    let mountedRecordsTableRow;
    const recordsTableRow = () => {
        if (!mountedRecordsTableRow) {
            mountedRecordsTableRow = shallow(<RecordsTableRow {...props} />);
        }
        return mountedRecordsTableRow;
    };

    beforeEach(() => {
        props = {
            firebase: {
                testFunction: jest.fn(),
            },
            date: 1511444588,
            distance: 22,
            id: '-Kzd6Z2WK0lFBQMyXlCE',
            speed: 0.016666666666666666,
            time: 1320,
            user: 'bH6cr0ESEYhZH1KgOdXeotILJk23',
        };
        mountedRecordsTableRow = undefined;
    });

    it('should always renders a tr', () => {
        expect(recordsTableRow()
            .find('tr')
            .exists()).toBe(true);
    });
});
