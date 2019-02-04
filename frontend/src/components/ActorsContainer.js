import React, {Component} from 'react'

import {ActorListItem} from "./ActorListItem"

import {ListGroup} from "reactstrap";


export default class ActorsContainer extends Component {
    render() {
        return (
            <ListGroup className='col-md-4 scroller'>
                {this.props.actors && this.props.actors.map(ActorListItem)}
            </ListGroup>
        )
    }
}