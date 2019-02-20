import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {dataActions} from '../actions'

import MyPagination from "./MyPagination";
import MoviesPageItems from "./MoviesPageItems";

import {Loading} from "./Loading";


class MoviesPaginated extends Component {

    state = {
        isLoading: true
    };

    componentDidMount() {
        this.props.fetchMoviePage(this.props.match.params.page)
            .then(() => this.setState({isLoading: false}))
    }

    render() {
        const {items} = this.props.pagination;
        return (
            <div className="MoviesList">
                <MoviesPageItems items={items}/>
                <MyPagination path={"/movies/"}/>
                {this.state.isLoading && <Loading/>}
            </div>
        );
    }
}

MoviesPaginated.propTypes = {
    fetchMoviePage: PropTypes.func.isRequired,
    movies: PropTypes.object,
    page: PropTypes.string,
    pagination: PropTypes.object
};

const mapStateToProps = state => {
    return {
        movies: state.data.movies,
        pagination: state.data.pagination
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMoviePage: (page => {
            return dispatch(dataActions.fetchMoviePage(page));
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesPaginated);
