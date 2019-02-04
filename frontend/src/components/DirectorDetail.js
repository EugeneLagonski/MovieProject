import React, {Component} from 'react';
import 'whatwg-fetch'
import {API_URL, LOADING} from '../constants'

import {Card, CardBody, CardSubtitle, CardText, CardTitle} from "reactstrap";


export default class ActorDetail extends Component {

    state = {
        name: null,
        isLoading: true
    };

    fetchData = () => {
        fetch(`${API_URL}/directors/${this.props.match.params.directorId}`)
            .then(res => res.json())
            .then((data) => {
                console.log('Request success', data);
                data.isLoading = false;
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

    render() {
        const {name} = this.state;
        if (this.state.isLoading) return LOADING;
        else return (
            <Card>
                <CardBody>
                    <CardTitle>Director: {name}</CardTitle>
                    <CardSubtitle>Additional info:<br/>
                        to be realised
                    </CardSubtitle>
                    <CardText>Director main info:<br/>
                        to be realised
                    </CardText>
                </CardBody>
            </Card>
        )
    }
}