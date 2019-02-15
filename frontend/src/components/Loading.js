import React from 'react'

import {Spinner} from "reactstrap";


export const Loading = () => (
    <div className="col-sm-6 col-md-4 offset-md-4 sm-offset-3 text-center"
         style={{marginTop: '10%'}}>
        <div>Loading...</div>
        <Spinner style={{width: '3rem', height: '3rem'}}/>
    </div>);