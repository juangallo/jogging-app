import React from 'react';
import { shallow } from 'enzyme';

import { Login } from './';

describe('Login', () => {
    let props;
    let mountedLogin;
    const login = () => {
        if (!mountedLogin) {
            mountedLogin = shallow(<Login {...props} />);
        }
        return mountedLogin;
    };

    beforeEach(() => {
        props = {
            firebase: { a: jest.fn() },
            profile: { a: '' },
        };
        mountedLogin = undefined;
    });

    it('should always renders a div', () => {
        expect(login()
            .find('div')
            .exists()).toBe(true);
    });

    it('should display error messages if there are any', () => {
        login().setState({ errorMessage: 'error' });
        expect(login()
            .find('#error')
            .exists()).toBe(true);
    });

    it('should redirect the user to management if successfully logged in and role is manager or admin', () => {
        props.profile = { role: 'manager' };
        login().setState({ successfulLogin: true });
        expect(login()
            .find('#redirect-management')
            .exists()).toBe(true);
    });

    it('should redirect the user to dashboard if successfully logged in and role is user', () => {
        props.profile = { role: 'user' };
        login().setState({ successfulLogin: true });
        expect(login()
            .find('#redirect-dashboard')
            .exists()).toBe(true);
    });
});
