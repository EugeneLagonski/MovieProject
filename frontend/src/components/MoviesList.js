import React, {Component} from 'react';
import 'whatwg-fetch'
import {API_URL, LOADING} from "../constants";

import MyPagination from "./MyPagination";
import MoviesContainer from "./MoviesContainer";


export default class MoviesList extends Component {

    state = {
        currentMovies: [],
        totalMovies: null,
        pageSize: 10,
        isLoading: true
    };

    fetchData = () => {
        fetch(`${API_URL}/movies/?page=${parseInt(this.props.match.params.page || 1)}`)
            .then(res => res.json())
            .then((data) => {
                console.log('Request success');
                this.setState({
                    currentMovies: data.results,
                    totalMovies: data.count,
                    totalPages: Math.ceil(data.count / this.state.pageSize),
                    isLoading: false
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
        const {totalPages, currentMovies} = this.state;
        const currentPage = parseInt(this.props.match.params.page || 1);
        if (this.state.isLoading) return LOADING;
        else return (
            <div className="MoviesList">
                <MoviesContainer movies={currentMovies}/>
                <MyPagination currentPage={currentPage} totalPages={totalPages} path={"/movies/"}/>
            </div>
        );
    }
}
