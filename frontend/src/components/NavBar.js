import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from "react-router";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {auth} from "../actions/";

import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';


class NavBar extends React.Component {

    logoutClick = () => {
        this.props.logout();
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

NavBar.propTypes = {
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
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            return dispatch(auth.logout());
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))
