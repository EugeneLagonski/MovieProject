import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from "react-router";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import * as auth from "../actions/auth";


class MyNavbar extends React.Component {

    logoutClick = () => {
        this.props.logout(this.props.token);
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.isAuthenticated !== nextProps.isAuthenticated
    }

    render() {
        return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={Link} to="/">Index Page</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/movies/">Movies</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="https://github.com/EugeneLagonski/MovieProject">GitHub</NavLink>
                    </NavItem>
                    {this.props.isAuthenticated &&
                    <NavItem><NavbarBrand className='text-info'>{this.props.user.username}</NavbarBrand></NavItem>}
                    {this.props.isAuthenticated ?
                        < NavItem> < NavLink href='#' onClick={this.logoutClick}>Log
                            out</NavLink> </NavItem> :
                        <NavItem><NavLink tag={Link} to="/login/">Sign in</NavLink> </NavItem>}
                </Nav>
            </Navbar>
        );
    }
}

MyNavbar.propTypes = {
    logout: PropTypes.func.isRequired,
    errors: PropTypes.array,
    isAuthenticated: PropTypes.bool,
    username: PropTypes.string,
    token: PropTypes.string
};


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        token: state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logout: (token) => {
            return dispatch(auth.logout(token));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyNavbar))
