import React from 'react';
import { shallow } from 'enzyme';

import { SignUp } from './';

describe('SignUp', () => {
    let props;
    let mountedSignUp;
    const signUp = () => {
        if (!mountedSignUp) {
            mountedSignUp = shallow(<SignUp {...props} />);
        }
        return mountedSignUp;
    };

    beforeEach(() => {
        props = {
            firebase: { test: jest.fn() },
        };
        mountedSignUp = undefined;
    });

    it('should always render a div', () => {
        expect(signUp()
            .find('div')
            .exists()).toBe(true);
    });

    it('should display errors if there are any', () => {
        signUp().setState({ errorMessage: 'Error message' });
        expect(signUp()
            .find('#error')
            .exists()).toBe(true);
    });

    it('should redirect the user when the account is succesfully created', () => {
        signUp().setState({ accountCreated: true });
        expect(signUp()
            .find('#redirect')
            .exists()).toBe(true);
    });
});
