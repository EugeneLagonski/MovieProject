import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {data} from '../actions'
import PropTypes from "prop-types";

import {LOADING} from "../constants";

import {Badge, Card, CardBody, CardSubtitle, CardTitle, ListGroup, ListGroupItem} from "reactstrap";
import '../css/scroll.css';


class MoviesContainer extends Component {

    state = {
        isLoading: true,
    };


    componentDidMount() {
        const {movies, match, fetchDetailMovie} = this.props;

        if (movies && movies[match.params.movieId] && !movies[match.params.movieId].actors)
            fetchDetailMovie(match.params.movieId)
                .then(() => this.setState({isLoading: false}))

        else {
            fetchDetailMovie(match.params.movieId)
                .then(() => this.setState({isLoading: false}))
        }
    }

    render() {
        const {directors, movies} = this.props;
        const id = this.props.match.params.movieId;
        const movie = movies && movies[id];
        const {title, director, actors} = movie || {};

        return (
            <Card>
                <CardBody>
                    <CardTitle>Movie: {title}</CardTitle>
                    <CardSubtitle>Director:&ensp;
                        {directors && directors[director] &&
                        <Link to={/director/ + director}>{directors[director].name}</Link>}
                    </CardSubtitle>

                    Actors:
                    <ListGroup className='col-md-4 scroller'>
                        {actors && Object.entries(actors).map(([id, actor]) =>
                            <ListGroupItem key={id}>
                                <Link to={/actor/ + id}>{this.props.actors[id].name}</Link>
                                {actor.is_primary && <Badge color='secondary'>Primary role</Badge>}
                                &ensp;as {actor.character_name}
                            </ListGroupItem>
                        )}
                    </ListGroup>
                </CardBody>
                {this.state.isLoading && LOADING}
            </Card>
        )
    }
}


MoviesContainer
    .propTypes = {
    fetchDetailMovie: PropTypes.func.isRequired,
    movies: PropTypes.object,
    actors: PropTypes.object,
    directors: PropTypes.object,
};

const
    mapStateToProps = state => {
        return {
            movies: state.data.movies,
            actors: state.data.actors,
            directors: state.data.directors,
        };
    };

const
    mapDispatchToProps = dispatch => {
        return {
            fetchDetailMovie: (id) => {
                return dispatch(data.fetchDetailMovie(id));
            }
        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(MoviesContainer);
