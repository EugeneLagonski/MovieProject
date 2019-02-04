import React from 'react'
import {Link} from "react-router-dom";

import {ListGroupItem} from "reactstrap";


export const MovieListItem = (movie) =>
    <ListGroupItem key={movie.id}>
        <Link className='text-dark' to={"/movie/" + movie.id}>
            {movie.title}
        </Link>
    </ListGroupItem>;