import React from 'react';
import { shallow } from 'enzyme';

import { Management } from './';

describe('Management', () => {
    let props;
    let mountedManagement;
    const management = () => {
        if (!mountedManagement) {
            mountedManagement = shallow(<Management {...props} />);
        }
        return mountedManagement;
    };

    beforeEach(() => {
        props = {
            users: {
                zxc: {
                    email: 'a@a.a',
                    id: '123',
                    role: 'user',
                    username: 'asd',
                },
            },
            profile: { role: 'manager' },
        };
        mountedManagement = undefined;
    });

    it('should always renders a div', () => {
        expect(management()
            .find('div')
            .exists()).toBe(true);
    });

    it('should render a table if role is correct and there are users', () => {
        expect(management()
            .find('#UsersTable')
            .exists()).toBe(true);
    });

    it('should redirect the user if role isn‘t admin or manager', () => {
        props.profile.role = undefined;
        expect(management()
            .find('#redirect-bad-role')
            .exists()).toBe(true);
    });

    it('should render a no-users div if there are no users', () => {
        props.users = {};
        props.profile.role = 'manager';
        expect(management()
            .find('#no-users')
            .exists()).toBe(true);
    });

    it('should render a loading-users div if records are not loaded', () => {
        props.users = undefined;
        props.profile.role = 'manager';
        expect(management()
            .find('#loading-users')
            .exists()).toBe(true);
    });
});
