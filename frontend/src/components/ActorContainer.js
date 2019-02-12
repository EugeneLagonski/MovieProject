import React, {Component} from 'react';
import axios from "axios";
import {API_URL, LOADING} from '../constants'

import {Card, CardBody, CardSubtitle, CardText, CardTitle} from "reactstrap";



export default class ActorContainer extends Component {

    state = {
        name: null,
        isLoading: true
    };

    fetchData = () => {
        axios.get(`${API_URL}/actors/${this.props.match.params.actorId}`)
            .then(({data}) => {
                console.log('Request success', data);
                this.setState({name: data.name, isLoading: false});
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
                    <CardTitle>Actor: {name}</CardTitle>
                    <CardSubtitle>Additional info:<br/>
                        to be realised
                    </CardSubtitle>
                    <CardText>Actor main info:<br/>
                        to be realised
                    </CardText>
                </CardBody>
            </Card>
        )
    }
}