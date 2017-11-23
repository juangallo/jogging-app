import React from 'react';
import { shallow } from 'enzyme';

import { DASHBOARD, MANAGEMENT } from '../../consts/routes';

import { Header } from './';

describe('Header', () => {
    let props;
    let mountedHeader;
    const header = () => {
        if (!mountedHeader) {
            mountedHeader = shallow(<Header {...props} />);
        }
        return mountedHeader;
    };

    beforeEach(() => {
        props = {
            firebase: {
                testFunction: jest.fn(),
            },
            navigation: [],
            current: '',
        };
        mountedHeader = undefined;
    });

    it('should always renders a div', () => {
        expect(header()
            .find('div')
            .exists()).toBe(true);
    });

    it('should always render props.navigation.length nav-items', () => {
        props.navigation = [DASHBOARD, MANAGEMENT];
        const navItems = header().find('.nav-item');
        expect(navItems.length).toBe(props.navigation.length);
    });

    it('should redirect the user when logged out', () => {
        header().setState({ loggedOut: true });
        expect(header()
            .find('#redirectOnLogout')
            .exists()).toBe(true);
    });
});
