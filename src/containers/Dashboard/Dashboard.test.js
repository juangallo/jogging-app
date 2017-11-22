import React from 'react';
import { shallow } from 'enzyme';

import { Dashboard } from './';

describe('Dashboard', () => {
    let props;
    let mountedDashboard;
    const dashboard = () => {
        if (!mountedDashboard) {
            mountedDashboard = shallow(<Dashboard {...props} />);
        }
        return mountedDashboard;
    };

    beforeEach(() => {
        props = {
            location: {
                hash: '',
                key: '',
                pathname: '/dashboard',
                search: '',
            },
            records: undefined,
        };
        mountedDashboard = undefined;
    });

    it('should always renders a div', () => {
        expect(dashboard()
            .find('div')
            .exists()).toBe(true);
    });

    it('should always render a TimesTable', () => {
        expect(dashboard()
            .find('TimesTable')
            .exists()).toBe(true);
    });

    it('should link to add a record to the current dashboard owner if looking at a different user‘s dashboard', () => {
        props.location.uid = 'uid';
        expect(dashboard()
            .find('#edit-record-uid')
            .exists()).toBe(true);
    });

    it('should link to add a record to the current user if looking at own dashboard', () => {
        props.location.uid = undefined;
        expect(dashboard()
            .find('#edit-record')
            .exists()).toBe(true);
    });

    it('should render a Report if records are loaded', () => {
        dashboard().setState({ recordsLoaded: true });
        expect(dashboard()
            .find('Report')
            .exists()).toBe(true);
    });

    it('should render a loading-report div if records are not loaded', () => {
        dashboard().setState({ recordsLoaded: false });
        expect(dashboard()
            .find('#loading-report')
            .exists()).toBe(true);
    });
});
