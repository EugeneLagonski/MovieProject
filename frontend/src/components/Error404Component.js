import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Alert, Button} from "reactstrap";

export default class Error404Component extends Component {
    render() {
        return (
            <div className="col-sm-6 col-md-4 offset-md-4 sm-offset-3">
                <Alert color='warning'>
                    HTTP 404 Page does not exists
                </Alert>
                <Button tag={Link} color='secondary' to='/'>Return to index page</Button>
            </div>
        );
    }
}