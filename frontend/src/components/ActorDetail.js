import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {data} from '../actions'

import {Loading} from './Loading'

import {Card, CardBody, CardSubtitle, CardText, CardTitle} from "reactstrap";


class ActorDetail extends Component {

    state = {
        isLoading: true
    };

    componentDidMount() {
        const {actors, match, fetchDetailActor} = this.props;

        if (actors && actors[match.params.actorId] && !actors[match.params.actorId].actors)
            fetchDetailActor(match.params.actorId)
                .then(() => this.setState({isLoading: false}));

        else {
            fetchDetailActor(match.params.actorId)
                .then(() => this.setState({isLoading: false}))
        }
    }

    render() {
        const actor = this.props.actors[this.props.match.params.actorId];
        const {name} = actor || {};
        return (
            <Card>
                <CardBody>
                    <CardTitle>Actor: {name}</CardTitle>
                    <CardSubtitle>Additional info:<br/>
                        to be realised
                    </CardSubtitle>
                    <CardText>Actor main info:<br/>
                        to be realised
                    </CardText>
                </CardBody>
                {this.state.isLoading && <Loading/>}
            </Card>
        )
    }
}

ActorDetail.propTypes = {
    fetchDetailActor: PropTypes.func.isRequired,
    actors: PropTypes.object,
};

const mapStateToProps = state => {
    return {
        actors: state.data.actors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDetailActor: (id) => {
            return dispatch(data.fetchDetailActor(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActorDetail);
