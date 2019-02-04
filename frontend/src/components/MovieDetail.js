import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import 'whatwg-fetch'
import {API_URL, LOADING} from "../constants";

import ActorsContainer from "./ActorsContainer";

import {Card, CardBody, CardSubtitle, CardTitle} from "reactstrap";
import '../css/scroll.css';


export default class MoviesList extends Component {

    state = {
        title: null,
        director: null,
        directorName: null,
        actors: null,
        isLoading: true
    };

    fetchData = () => {
        fetch(`${API_URL}/movies/${this.props.match.params.movieId}`)
            .then(res => res.json())
            .then((data) => {
                console.log('Request success', data);
                data.actors.sort((actor1, actor2) => {
                    return actor2.is_primary - actor1.is_primary
                });
                this.setState(data);
                fetch(`${API_URL}/directors/${this.state.director}`)
                    .then(res => res.json())
                    .then((data) => {
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
                    <ActorsContainer actors={actors}/>
                </CardBody>
            </Card>
        )
    }
}