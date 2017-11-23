import React from 'react';
import { shallow } from 'enzyme';

import { UsersTable } from './';

describe('UsersTable', () => {
    let props;
    let mountedUsersTable;
    const usersTable = () => {
        if (!mountedUsersTable) {
            mountedUsersTable = shallow(<UsersTable {...props} />);
        }
        return mountedUsersTable;
    };

    beforeEach(() => {
        props = {
            cleanState: jest.fn(),
            deleteUser: jest.fn(),
            errorMessageDelete: '',
            loadingDelete: false,
            role: 'admin',
            successDelete: false,
            users: [
                {
                    email: 'juan@mail.com',
                    id: 'X5abDHJBaiMPN29k6uN3Bn8YfMe2',
                    role: 'admin',
                    username: 'juan',
                },

                {
                    email: 'gogogo@gogogo.gog',
                    id: 'umwSN0tQdNaE1DAsQrC2Dwp5rzf1',
                    role: 'manager',
                    username: 'GOGOGOGO',
                },
                {
                    email: 'zzz@sss.www',
                    id: 'zxcaaasdqwef1231243',
                    role: 'user',
                    username: 'GOzxcOGO',
                },
            ],
        };
        mountedUsersTable = undefined;
    });

    it('should always renders a table', () => {
        expect(usersTable()
            .find('table')
            .exists()).toBe(true);
    });
});
