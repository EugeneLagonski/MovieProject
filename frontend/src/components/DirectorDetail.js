import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {data} from '../actions'

import {Loading} from './Loading'

import {Card, CardBody, CardSubtitle, CardText, CardTitle} from "reactstrap";


class DirectorDetail extends Component {

    state = {
        isLoading: true
    };

    componentDidMount() {
        const {directors, match, fetchDetailDirector} = this.props;

        if (directors && directors[match.params.directorId] && !directors[match.params.directorId].directors)
            fetchDetailDirector(match.params.directorId)
                .then(() => this.setState({isLoading: false}));

        else {
            fetchDetailDirector(match.params.directorId)
                .then(() => this.setState({isLoading: false}))
        }
    }

    render() {
        const director = this.props.directors[this.props.match.params.directorId];
        const {name} = director || {};
        return (
            <Card>
                <CardBody>
                    <CardTitle>Director: {name}</CardTitle>
                    <CardSubtitle>Additional info:<br/>
                        to be realised
                    </CardSubtitle>
                    <CardText>Director main info:<br/>
                        to be realised
                    </CardText>
                </CardBody>
                {this.state.isLoading && <Loading/>}
            </Card>
        )
    }
}

DirectorDetail.propTypes = {
    fetchDetailDirector: PropTypes.func.isRequired,
    directors: PropTypes.object,
};

const mapStateToProps = state => {
    return {
        directors: state.data.directors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDetailDirector: (id) => {
            return dispatch(data.fetchDetailDirector(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectorDetail);
