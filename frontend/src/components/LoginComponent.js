import React, {Component} from 'react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {authActions} from '../actions';
import PropTypes from 'prop-types';


class LoginComponent extends Component {
    state = {
        username: '',
        password: '',
        submitted: false
    };

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('handling submit');
        this.setState({submitted: true});
        const {username, password} = this.state;
        this.props.login(username, password);

    };

    render() {
        const {username, password, submitted} = this.state;
        if (this.props.isAuthenticated) this.props.history.goBack();
        return (
            <div className="col-sm-6 col-md-4 offset-md-4 sm-offset-3">
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username}
                               onChange={this.handleChange}/>
                        {submitted && !username &&
                        <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password}
                               onChange={this.handleChange}/>
                        {submitted && !password &&
                        <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Login</button>
                        <Link to="/register" className="btn btn-link">Register</Link>
                    </div>
                </form>
            </div>
        )
    }
}

LoginComponent.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.array,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
        errors = Object.keys(state.auth.errors).map(field => {
            return {field, message: state.auth.errors[field]};
        });
    }
    return {
        errors,
        isAuthenticated: state.auth.isAuthenticated
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => {
            return dispatch(authActions.login(username, password));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
