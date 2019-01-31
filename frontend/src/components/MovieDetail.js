import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import 'whatwg-fetch'

import {Card, CardBody, CardSubtitle, CardText, CardTitle, ListGroup, ListGroupItem, Badge} from "reactstrap";
import '../css/scroll.css';


export default class MoviesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.movieId,
            title: null,
            director: null,
            directorName: null,
            actors: null,
        }
    }

    fetchData() {
        fetch('http://api.localhost/movies/' + this.state.id)
            .then(res => res.json())
            .then((data) => {
                console.log('Request success', data);
                data.actors.sort((actor1, actor2) => {
                    return actor2.is_primary - actor1.is_primary
                });
                this.setState(data);
                fetch('http://api.localhost/directors/' + this.state.director)
                    .then(res => res.json())
                    .then((data) => {
                        console.log('Request success', data);
                        this.setState({directorName: data.name});
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currentPage !== this.state.currentPage) {
            console.log('Page updated');
            this.fetchData()
        }
    }

    render() {
        const {title, director, directorName, actors} = this.state
        return (
            <Card>
                <CardBody>
                    <CardTitle>Movie: {title}</CardTitle>
                    <CardSubtitle>Director:&ensp;
                        <Link to={/director/ + director}>{directorName}</Link>
                    </CardSubtitle>
                    <CardText>Actors:
                        <ListGroup className='col-md-4 scroller'>
                            {actors && actors.map(actor => {
                                return (
                                    <ListGroupItem key={actor.id}>
                                        <Link to={/actor/ + actor.id}>{actor.name}</Link>
                                        {actor.is_primary && <Badge color='secondary'>Primary role</Badge>}
                                        &ensp;as {actor.character_name}
                                    </ListGroupItem>
                                )
                            })}
                        </ListGroup>
                    </CardText>
                </CardBody>
            </Card>
        )
    }
}