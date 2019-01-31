import React from 'react';
import {Link} from 'react-router-dom';

import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

export default class MyNavbar extends React.Component {

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand tag={Link} to="/">Index Page</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/movies/">Movies</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/EugeneLagonski/MovieProject">GitHub</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}