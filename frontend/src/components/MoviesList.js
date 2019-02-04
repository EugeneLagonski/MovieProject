import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import 'whatwg-fetch'

import {ListGroup, ListGroupItem, Pagination, PaginationItem, PaginationLink} from 'reactstrap';


export default class MoviesList extends Component {
    state = {
        currentMovies: [],
        currentPage: parseInt(props.match.params.page || 1),
        totalMovies: null,
        pageSize: 10,
    };

    fetchData = () => {
        fetch('http://api.localhost/movies/?page=' + this.state.currentPage)
            .then(res => res.json())
            .then((data) => {
                console.log('Request success');
                this.setState({
                    currentMovies: data.results,
                    totalMovies: data.count,
                    totalPages: Math.ceil(data.count / this.state.pageSize)
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


    generatePages = (currentPage, totalPages, indent = 2) => { // 2*indent + 1 >= totalPages
        let center = currentPage;
        //start
        let offset = center - 1 - indent;
        if (offset < 0) {
            center -= offset;
        }
        //end
        offset = center + indent - totalPages;
        if (offset > 0) {
            center -= offset;
        }
        const length = 2 * indent + 1;
        return Array.from({length}, (_, i) => center - indent + i);
    };


    render() {
        const {currentPage, totalPages, currentMovies} = this.state;
        return (
            <div className="MoviesList">
                <ListGroup className="col-sm-6 col-md-4 offset-md-4 sm-offset-3">
                    {currentMovies.map(movie => {
                        return (
                            <ListGroupItem key={movie.id}>
                                <Link className='text-dark' to={"/movie/" + movie.id}>
                                    {movie.title}
                                </Link>
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>

                <Pagination className='d-flex justify-content-center'>
                    <PaginationItem disabled={currentPage === 1}>
                        <PaginationLink previous tag={Link} to={"/movies/" + (currentPage - 1)}
                                        onClick={() => this.setState({currentPage: currentPage - 1})}/>

                    </PaginationItem>
                    {this.generatePages(currentPage, totalPages).map(page => {
                        return (
                            <PaginationItem active={currentPage === page} key={page}>
                                <PaginationLink tag={Link} to={"/movies/" + page}
                                                onClick={() => this.setState({currentPage: page})}>
                                    {page}</PaginationLink>
                            </PaginationItem>
                        )
                    })}
                    <PaginationItem disabled={currentPage === totalPages}>
                        <PaginationLink next tag={Link} to={"/movies/" + (currentPage + 1)}
                                        onClick={() => this.setState({currentPage: currentPage + 1})}/>
                    </PaginationItem>
                </Pagination>
            </div>
        );
    }
}
