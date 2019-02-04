import React from 'react'
import {Link} from "react-router-dom";

import {Badge, ListGroupItem} from "reactstrap";


export const ActorListItem = (actor) =>
    <ListGroupItem key={actor.actor_id}>
        <Link to={/actor/ + actor.actor_id}>{actor.name}</Link>
        {actor.is_primary && <Badge color='secondary'>Primary role</Badge>}
        &ensp;as {actor.character_name}
    </ListGroupItem>