import React, {Component} from 'react';
import 'whatwg-fetch'

import {Card, CardBody, CardSubtitle, CardText, CardTitle} from "reactstrap";

export default class ActorDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.actorId,
            name: null
        }
    }

    fetchData() {
        fetch('http://api.localhost/actors/' + this.state.id)
            .then(res => res.json())
            .then((data) => {
                console.log('Request success', data);
                this.setState(data);
            })
            .catch((error) => {
                console.log('Request failed', error);
            });

    };


    componentDidMount() {
        console.log('Page created');
        this.fetchData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currentPage !== this.state.currentPage) {
            console.log('Page updated');
            this.fetchData()
        }
    }

    render() {
        const {name} = this.state;
        return (
            <Card>
                <CardBody>
                    <CardTitle>Actor: {name}</CardTitle>
                    <CardSubtitle>Additional info:&ensp;
                        <p>to be realised</p>
                    </CardSubtitle>
                    <CardText>Actors:
                        <p>to be realised</p>
                    </CardText>
                </CardBody>
            </Card>
        )
    }
}