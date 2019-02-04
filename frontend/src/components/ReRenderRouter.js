import React, {Component} from 'react';
import {Route} from 'react-router-dom';


export default class ReRenderRouter extends Component {
    render() {
        const {component: Component, RouteKey, location, ...rest} = this.props;
        const Key = RouteKey ? location.pathname + location.search : null;

        return <Route {...rest} render={props => (<Component {...props} key={Key}/>)}/>;
    }
}
