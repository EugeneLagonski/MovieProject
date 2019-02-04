import React, {Component} from 'react'

import {MovieListItem} from "./MovieListItem";

import {ListGroup} from "reactstrap";


export default class MoviesContainer extends Component {
    render() {
        return (
            <ListGroup className="col-sm-6 col-md-4 offset-md-4 sm-offset-3">
                {this.props.movies.map(MovieListItem)}
            </ListGroup>
        )
    }
}