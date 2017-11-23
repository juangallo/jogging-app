import React from 'react';
import { shallow } from 'enzyme';
import { createUser, cleanState } from '../../actions/userActions';

import { CreateUser } from './';

describe('CreateUser', () => {
    let props;
    let mountedCreateUser;
    const createUserWrapper = () => {
        if (!mountedCreateUser) {
            mountedCreateUser = shallow(<CreateUser {...props} />);
        }
        return mountedCreateUser;
    };

    beforeEach(() => {
        props = {
            createUser,
            loadingCreateEdit: false,
            successCreateEdit: false,
            errorMessageCreateEdit: '',
            cleanState,
            match: {
                params: {
                    uid: '',
                },
            },
            history: {
                push: jest.fn(),
            },
            profile: {},
            editUser: jest.fn(),
            role: '',
        };
        mountedCreateUser = undefined;
    });

    it('should always render a div', () => {
        expect(createUserWrapper()
            .find('div')
            .exists()).toBe(true);
    });

    it('should display errors if there are any', () => {
        props.errorMessageCreateEdit = 'Error message';
        expect(createUserWrapper()
            .find('#error')
            .exists()).toBe(true);
    });

    it('should redirect the user when the account is succesfully created', () => {
        props.successCreateEdit = true;
        expect(createUserWrapper()
            .find('#redirect')
            .exists()).toBe(true);
    });
});
