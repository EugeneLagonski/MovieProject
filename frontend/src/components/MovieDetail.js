import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {dataActions} from '../actions'
import PropTypes from "prop-types";

import {Loading} from "./Loading";
import EditMovieForm from "./EditMovieForm";

import {Badge, Button, Card, CardBody, CardSubtitle, CardTitle, ListGroup, ListGroupItem, Row} from "reactstrap";
import '../css/scroll.css';
import '../css/MovieDetail.css'


class MoviesDetail extends Component {

    state = {
        isLoading: true,
        isEditing: false,
        movie: {
            title: '',
            actors: {},
            director: null
        }
    };


    componentDidMount() {
        const {movies, fetchDetailMovie} = this.props;
        const id = this.props.match.params.movieId;

        if (movies && movies[id] && movies[id].actors)
            this.setState({isLoading: false, movie: movies[id]});
        else {
            fetchDetailMovie(id)
                .then(() => {
                    const movie = this.props.movies[id];
                    this.setState({isLoading: false, movie: movie})
                })
        }
    }

    startEdit = () => {
        this.props.startEdit()
    };


    actorsToForm = (movieActors) => {
        const {actors} = this.props;
        return Object.entries(movieActors).map(([id, actor]) => {
            return {
                value: id,
                label: actors[id].name,
                is_primary: actor.is_primary,
                character_name: actor.character_name
            }
        })
    };

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({movie: {...this.state.movie, [name]: value}});
    };

    render() {
        const {directors, movies} = this.props;
        const id = this.props.match.params.movieId;
        const movie = movies && movies[id];
        const {title, director, actors} = movie || {};
        const {isEditing} = this.props;
        return (
            <div>
                {isEditing ? <EditMovieForm initialValues={{
                        title: title,
                        director: {
                            value: director,
                            label: directors[director].name
                        },
                        actors: this.actorsToForm(movie.actors),
                    }}/> :
                    (<Card className="col-sm-10 col-md-8 offset-md-2 sm-offset-2">
                        <CardBody>
                            <form>
                                <Row>
                                    <CardTitle className='col-md-8'>Movie:{title}
                                    </CardTitle>
                                    <div className='col-md-4'>{isEditing ?
                                        <span>
                                <Button size='sm' color='success' onClick={this.submitEdit}>Submit</Button>
                                <Button size='sm' color='danger' onClick={this.cancelEdit}>Cancel</Button>
                            </span> :
                                        <Button size='sm' color='info' onClick={this.startEdit}>Edit</Button>}</div>
                                </Row>
                                <CardSubtitle>Director:&ensp;
                                    {directors && directors[director] &&
                                    <Link to={/director/ + director}>{directors[director].name}</Link>}
                                </CardSubtitle>

                                Actors:
                                <ListGroup className='scroller'>
                                    {actors && Object.entries(actors).map(([id, actor]) =>
                                        <ListGroupItem key={id}>
                                            <Link to={/actor/ + id}>{this.props.actors[id].name}</Link>
                                            {actor.is_primary && <Badge color='secondary'>Primary role</Badge>}
                                            &ensp;as {actor.character_name}
                                        </ListGroupItem>
                                    )}
                                </ListGroup>
                            </form>
                        </CardBody>
                        {this.state.isLoading && <Loading/>}
                    </Card>)

                }</div>)
    }
}


MoviesDetail.propTypes = {
    fetchDetailMovie: PropTypes.func.isRequired,
    startEdit: PropTypes.func.isRequired,
    movies: PropTypes.object,
    actors: PropTypes.object,
    directors: PropTypes.object,
};

const mapStateToProps = state => {
    return {
        isEditing: state.data.isEditing,
        movies: state.data.movies,
        actors: state.data.actors,
        directors: state.data.directors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDetailMovie: (id) => {
            return dispatch(dataActions.fetchDetailMovie(id));
        },
        startEdit: () => {
            return dispatch(dataActions.startEdit())
        },
    };
};

MoviesDetail = connect(mapStateToProps, mapDispatchToProps)(MoviesDetail);

export default MoviesDetail
