import React from 'react';
import { shallow } from 'enzyme';

import { EditRecord } from './';

describe('EditRecord', () => {
    let props;
    let mountedEditRecord;
    const editRecord = () => {
        if (!mountedEditRecord) {
            mountedEditRecord = shallow(<EditRecord {...props} />);
        }
        return mountedEditRecord;
    };

    beforeEach(() => {
        props = {
            location: {
                hash: '',
                key: '',
                pathname: '/dashboard',
                search: '',
                uid: '',
            },
            match: {
                isExact: undefined,
                params: {
                    recordId: '',
                },
                path: '/edit-record',
                url: '/edit-record',
            },
            firebase: {},
            auth: {},

            records: undefined,
        };
        mountedEditRecord = undefined;
    });

    it('should always renders a div', () => {
        expect(editRecord()
            .find('div')
            .exists()).toBe(true);
    });

    it('should render a new-record-title if user is creating a new record', () => {
        expect(editRecord()
            .find('#new-record-title')
            .exists()).toBe(true);
    });
    it('should render a edit-record-title if user is editing a record', () => {
        props.match.params.recordId = 'recordId';
        expect(editRecord()
            .find('#edit-record-title')
            .exists()).toBe(true);
    });

    it('should display error messages if there are any', () => {
        editRecord().setState({ errorMessage: 'error' });
        expect(editRecord()
            .find('#error')
            .exists()).toBe(true);
    });

    it('should redirect the user to own dashboard if editing own records when successfully created or edited record', () => {
        editRecord().setState({
            successfulEdit: true,
            successfulNewRecord: true,
        });
        expect(editRecord()
            .find('#redirectOwn')
            .exists()).toBe(true);
    });

    it('should redirect the user to the dashboard of the owner of the current record when successfully created or edited record', () => {
        props.location.uid = 'uid';
        editRecord().setState({
            successfulEdit: true,
            successfulNewRecord: true,
        });
        expect(editRecord()
            .find('#redirectOther')
            .exists()).toBe(true);
    });
});
