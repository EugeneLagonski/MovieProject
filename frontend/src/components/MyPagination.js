import React, {Component} from 'react';
import {Link} from "react-router-dom";

import {Pagination, PaginationItem, PaginationLink} from "reactstrap";


export default class MyPagination extends Component {

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
        const {currentPage, totalPages, path} = this.props;
        return (
            <Pagination className='d-flex justify-content-center'>
                <PaginationItem disabled={currentPage === 1}>
                    <PaginationLink previous tag={Link} to={path + (currentPage - 1)}/>
                </PaginationItem>
                {this.generatePages(currentPage, totalPages).map(page => {
                    return (
                        <PaginationItem active={currentPage === page} key={page}>
                            <PaginationLink tag={Link} to={path + page}>{page}</PaginationLink>
                        </PaginationItem>
                    )
                })}
                <PaginationItem disabled={currentPage === totalPages}>
                    <PaginationLink next tag={Link} to={path + (currentPage + 1)}/>
                </PaginationItem>
            </Pagination>
        )
    }
}
