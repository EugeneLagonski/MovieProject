import React from 'react'
import {Field, FieldArray, Form, reduxForm} from "redux-form";
import {Button, Card, CardBody, CardSubtitle, CardTitle, Col, Row} from "reactstrap";
import AsyncPaginate from "react-select-async-paginate";
import {api} from "../api";

const loadDirectorsOptions = async (search, loadedOptions, {page}) => {
    const result = {};
    await api(`/directors/?page=${page}`)
        .then(res => {
            console.log('Request success', res);
            let _result = {
                options: res.data.results.map(director => {
                    return {
                        value: director.id,
                        label: director.name,
                    }
                }),
                hasMore: res.data.next != null,
                additional: {
                    page: page + 1
                }
            };
            Object.assign(result, _result);
        });
    return result;
};

const loadActorsOptions = async (search, loadedOptions, {page}) => {
    const result = {};
    await api(`/directors/?page=${page}`)
        .then(res => {
            console.log('Request success', res);
            let _result = {
                options: res.data.results.map(actor => {
                    return {
                        value: actor.id,
                        label: actor.name,
                    }
                }),
                hasMore: res.data.next != null,
                additional: {
                    page: page + 1
                }
            };
            Object.assign(result, _result);
        });
    return result;
};

const renderActors = ({fields}) => (
    <div>
        Actors:
        <Row>
            <Col md={6}>Choose actor</Col>
            <Col md={3}>Actor character name</Col>
            <Col md={1}>Is role primary?</Col>
            <Col>Delete actor</Col>

        </Row>
        {fields.map((actor, index) =>
            <Row key={index} className='mt-3'>
                <Field component={props =>
                    <AsyncPaginate
                        className='col-md-6'
                        value={props.input.value}
                        onChange={props.input.onChange}
                        onBlur={() => props.input.onBlur(props.input.value)}
                        loadOptions={loadActorsOptions}
                        additional={{page: 1,}}
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
        )}
        <Button onClick={() => fields.push()}>
        Add Actor
      </Button>
    </div>
);


const EditMovie = (props) => {
    const {handleSubmit,onCancel} = props;
    return (
        <Card>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <CardTitle className='col-xl-10'>Movie:<Field className='col-xl-10' name="title"
                                                                      component='input' type='text'/>
                        </CardTitle>
                        <div className='col-xl-2'>
                            <Button size='sm' type='submit' color='success'>Submit</Button>
                            <Button size='sm' color='danger' onClick={onCancel}>Cancel</Button>
                        </div>
                    </Row>
                    <CardSubtitle>Director:&ensp;
                        <Field component={props =>
                            <AsyncPaginate
                                value={props.input.value}
                                onChange={props.input.onChange}
                                onBlur={() => props.input.onBlur(props.input.value)}
                                loadOptions={loadDirectorsOptions}
                                additional={{page: 1,}}
                            />} name='director'/>
                    </CardSubtitle>
                    <FieldArray name='actors' component={renderActors}/>
                </Form>
            </CardBody>
        </Card>
    )
};


export default reduxForm({form: 'editMovie'})(EditMovie);
