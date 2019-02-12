import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import {API_URL, LOADING} from "../constants";

import ActorComponent from "./ActorComponent";

import {Card, CardBody, CardSubtitle, CardTitle} from "reactstrap";
import '../css/scroll.css';



export default class MoviesContainer extends Component {

    state = {
        title: null,
        director: null,
        directorName: null,
        actors: null,
        isLoading: true
    };

    fetchData = () => {
        axios.get(`${API_URL}/movies/${this.props.match.params.movieId}`)
            .then(({data}) => {
                console.log('Request success', data);
                data.actors.sort((actor1, actor2) => {
                    return actor2.is_primary - actor1.is_primary
                });
                this.setState(data);
                axios.get(`${API_URL}/directors/${this.state.director}`)
                    .then(({data}) => {
                        console.log('Request success', data);
                        this.setState({directorName: data.name, isLoading: false});
                    })
                    .catch((error) => {
                        console.log('Request failed', error);
                    });
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
        const {title, director, directorName, actors} = this.state;
        if (this.state.isLoading) return LOADING;
        else return (
            <Card>
                <CardBody>
                    <CardTitle>Movie: {title}</CardTitle>
                    <CardSubtitle>Director:&ensp;
                        <Link to={/director/ + director}>{directorName}</Link>
                    </CardSubtitle>
                    Actors:
                    <ActorComponent actors={actors}/>
                </CardBody>
            </Card>
        )
    }
}