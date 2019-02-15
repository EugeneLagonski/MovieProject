import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import * as data from "../actions/dataActions";

import {Pagination, PaginationItem, PaginationLink} from "reactstrap";


class MyPagination extends Component {

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

    changePage = (e, page) => {
        this.props.fetchMoviePage(page);
    };


    render() {

        const {currentPage, totalItems} = this.props.pagination;
        const totalPages = Math.ceil(totalItems / 10);
        const {path} = this.props;
        return (
            <Pagination className='d-flex justify-content-center'>
                <PaginationItem disabled={currentPage === 1}>
                    <PaginationLink previous tag={Link} to={path + (currentPage - 1)}
                                    onClick={e => this.changePage(e, currentPage - 1)}/>
                </PaginationItem>
                {this.generatePages(currentPage, totalPages).map(page => {
                    return (
                        <PaginationItem active={currentPage === page} key={page}>

                            <PaginationLink tag={Link} to={path + page}
                                            onClick={e => this.changePage(e, page)}>{page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })}
                <PaginationItem disabled={currentPage === totalPages}>
                    <PaginationLink next tag={Link} to={path + (currentPage + 1)}
                                    onClick={e => this.changePage(e, currentPage + 1)}/>
                </PaginationItem>
            </Pagination>
        )
    }
}

MyPagination.propTypes = {
    fetchMoviePage: PropTypes.func.isRequired,
    pagination: PropTypes.object
};

const mapStateToProps = state => {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(MyPagination);