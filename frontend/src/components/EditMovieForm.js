import React, {Component} from 'react';
import {connect} from "react-redux";
import {dataActions} from '../actions'
import PropTypes from "prop-types";
import {Field, FieldArray, reduxForm} from "redux-form";
import {Button, Card, CardBody, CardSubtitle, CardTitle, Col, Row} from "reactstrap";
import Select from "react-select";
import _ from 'lodash';

class EditMovieForm extends Component {

    state = {
        directorsOptions: [{value: 0, label: 'is loading...'}],
        actorsOptions: [{value: 0, label: 'is loading...'}]
    };

    renderActors = ({fields, meta: {touched, error, submitFailed}}) => (
        <div>
            Actors:
            <Row>
                <Col md={6}>Choose actor</Col>
                <Col md={3}>Actor character name</Col>
                <Col md={1}>Is role primary?</Col>

                <Col >Delete actor</Col>

            </Row>
            {fields.map((actor, index) =>
                <div>
                    <Row key={index} className='mt-3'>
                        <Field component={props =>
                            <Select
                                className='col-md-6'
                                value={props.input.value}
                                onChange={props.input.onChange}
                                onBlur={() => props.input.onBlur(props.input.value)}
                                options={this.state.actorsOptions}
                                isSearchable={true}
                            />} name={`${actor}`}/>
                        <Field className='col-md-3' component='input' name={`${actor}.character_name`} type='text'
                               label='Character name'/>
                        <Field className='col-md-1' component='input' name={`${actor}.is_primary`} type='checkbox'
                               label='Primary role?'/>

                        <Button
                            color='danger'
                            size='sm'
                            onClick={() => fields.remove(index)}>Remove Actor</Button>
                    </Row>
                </div>
            )}
        </div>
    );

    loadDirectorsOptions = async (search, prevOptions) => {
        
    };

    loadDirectorOptions = async () => {
        const {fetchDirectorsPage} = this.props;
        let hasNext = false, page = 1;
        do {
            await fetchDirectorsPage(page)
                .then(res => {
                    hasNext = res.data.next != null
                });
            page++;
        } while (hasNext);

        const {directors} = this.props;
        const directorsOptions = _.toPairs(directors).map(([id, director]) => {
            return {value: id, label: director.name}
        });
        console.log('Directors options', directorsOptions);
        this.setState({...this.state, directorsOptions: directorsOptions});
    };

    loadActorsOptions = async () => {
        const {fetchActorsPage} = this.props;
        let hasNext = false, page = 1;
        do {
            await fetchActorsPage(page)
                .then(res => {
                    console.log(res.data.next);
                    hasNext = res.data.next != null
                });
            console.log('loaded actors page', page);
            page++;
        } while (hasNext);

        const {actors} = this.props;
        const actorsOptions = _.toPairs(actors).map(([id, actor]) => {
            return {value: id, label: actor.name}
        });
        console.log('Actors options', actorsOptions);
        this.setState({...this.state, actorsOptions: actorsOptions});
    };

    componentDidMount() {
        this.loadDirectorOptions();
        this.loadActorsOptions();
    }

    handleSubmit = values => {
        console.log(values);
        this.props.finishEdit();
    };

    cancelEdit = () => {
        this.props.finishEdit();
    };

    submitEdit = () => {
        this.props.finishEdit();
    };

    render() {
        const {directorsOptions} = this.state;
        console.log('render');
        return (
            <Card>
                <CardBody>
                    <form onSubmit={this.handleSubmit}>
                        <Row>
                            <CardTitle className='col-md-8'>Movie:<Field name="title" component='input' type='text'/>
                            </CardTitle>
                            <div className='col-md-4'>
                                <Button size='sm' type='submit' color='success' >Submit</Button>
                                <Button size='sm' color='danger' onClick={this.cancelEdit}>Cancel</Button>
                            </div>
                        </Row>
                        <CardSubtitle>Director:&ensp;
                            <Field component={props =>
                                <Select
                                    value={props.input.value}
                                    onChange={props.input.onChange}
                                    onBlur={() => props.input.onBlur(props.input.value)}
                                    options={directorsOptions}
                                    isSearchable={true}
                                />} name='director'/>
                        </CardSubtitle>
                        <FieldArray name='actors' component={this.renderActors}/>
                    </form>
                </CardBody>
            </Card>
        )
    }

}

EditMovieForm.propTypes = {
    finishEdit: PropTypes.func,
    fetchDirectorsPage: PropTypes.func,
    fetchActorsPage: PropTypes.func,
    movies: PropTypes.object,
    actors: PropTypes.object,
    directors: PropTypes.object,
    initialValues: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        movies: state.data.movies,
        actors: state.data.actors,
        directors: state.data.directors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        finishEdit: () => {
            return dispatch(dataActions.finishEdit())
        },
        fetchActorsPage: (page) => {
            return dispatch(dataActions.fetchActorsPage(page))
        },
        fetchDirectorsPage: (page) => {
            return dispatch(dataActions.fetchDirectorsPage(page))
        },
    };
};

EditMovieForm = connect(mapStateToProps, mapDispatchToProps)(EditMovieForm);
EditMovieForm = reduxForm({form: 'editMovie'})(EditMovieForm);

export default EditMovieForm

