import React from 'react';
import { shallow } from 'enzyme';
import { createUser, cleanState } from '../../actions/userActions';

import { ManageUser } from './';

describe('ManageUser', () => {
    let props;
    let mountedManageUser;
    const manageUserWrapper = () => {
        if (!mountedManageUser) {
            mountedManageUser = shallow(<ManageUser {...props} />);
        }
        return mountedManageUser;
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
        mountedManageUser = undefined;
    });

    it('should always render a div', () => {
        expect(manageUserWrapper()
            .find('div')
            .exists()).toBe(true);
    });

    it('should display errors if there are any', () => {
        props.errorMessageCreateEdit = 'Error message';
        expect(manageUserWrapper()
            .find('#error')
            .exists()).toBe(true);
    });

    it('should redirect the user when the account is succesfully created', () => {
        props.successCreateEdit = true;
        expect(manageUserWrapper()
            .find('#redirect')
            .exists()).toBe(true);
    });
});
