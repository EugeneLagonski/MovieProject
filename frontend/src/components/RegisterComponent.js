import React, {Component} from 'react'
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {auth} from '../actions';


class RegisterComponent extends Component {

    state = {
        username: '',
        password: '',
        submitted: false
    };

    handleChange = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    handleSubmit = e => {
        e.preventDefault();

        this.setState({submitted: true});

        const {username, password} = this.state;
        this.props.auth.register(username, password);
    };

    render() {
        const {username, password, submitted} = this.state;
        if (this.props.isAuthenticated) window.history.back();
        return (
            <div className="col-sm-6 col-md-4 offset-md-4 sm-offset-3">
                <h2>Register</h2>
                <form name=" form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor=" username">Username</label>
                        <input type=" text" className=" form-control" name=" username" value={username}
                               onChange={this.handleChange}/>
                        {submitted && !username &&
                        <div className=" help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor=" password">Password</label>
                        <input type=" password" className=" form-control" name=" password" value={password}
                               onChange={this.handleChange}/>
                        {submitted && !password &&
                        <div className=" help-block">Password is required</div>
                        }
                    </div>
                    <div className=" form-group">
                        <button className=" btn btn-primary">Register</button>
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        )
    }
}

RegisterComponent.propTypes = {
    register: PropTypes.func.isRequired,
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
        register: (username, password) => {
            return dispatch(auth.register(username, password));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);
