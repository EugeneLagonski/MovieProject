import React, {Component} from 'react'
import {Alert, Button} from "reactstrap";
import {Link} from "react-router-dom";

export default class Error500Component extends Component {
    render() {
        return (
            <div className="col-sm-6 col-md-4 offset-md-4 sm-offset-3">
                <Alert color='danger'>
                    HTTP 500 Internal Server Error
                </Alert>
                <Button tag={Link} color='secondary' to='/'>Return to index page</Button>
            </div>
        );
    }
}