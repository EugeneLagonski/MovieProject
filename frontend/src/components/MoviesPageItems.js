import React, {Component} from 'react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {ListGroup, ListGroupItem} from "reactstrap";


class MoviesPageItems extends Component {
    render() {
        return (
            <ListGroup className="col-sm-6 col-md-4 offset-md-4 sm-offset-3">
                {this.props.items.map(item => (
                    <ListGroupItem key={item}>
                        <Link className='text-dark' to={"/movie/" + item}>
                            {this.props.movies[item].title}
                        </Link>
                    </ListGroupItem>
                ))}
            </ListGroup>
        )
    }
}

MoviesPageItems.propTypes = {
    movies: PropTypes.object,
    items: PropTypes.array
};

const mapStateToProps = state => {
    return {
        movies: state.data.movies,
    };
};

export default connect(mapStateToProps, null)(MoviesPageItems);
