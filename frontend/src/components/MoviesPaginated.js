import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {data} from '../actions'

import MyPagination from "./MyPagination";
import MoviesPageItems from "./MoviesPageItems";

import {LOADING} from "../constants";


class MoviesPaginated extends Component {

    state = {
        isLoading: true
    };

    componentDidMount() {
        this.props.fetchMoviePage(this.props.match.params.page)
            .then(() => this.setState({isLoading: false}))

    }

    render() {
        const {currentPage, items, totalItems} = this.props.pagination;
        return (
            <div className="MoviesList">
                <MoviesPageItems items={items}/>
                <MyPagination currentPage={currentPage} totalPages={Math.ceil(totalItems / 10)} path={"/movies/"}/>
                {this.state.isLoading && LOADING}
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
            return dispatch(data.fetchMoviePage(page));
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesPaginated);
