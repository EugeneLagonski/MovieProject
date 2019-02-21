export const detailMovieResponseToState = (movie) => {
    const actors = {};
    const directors = {[movie.director]: {name: movie.director_name}};
    const movieActors = movie.actors.reduce((obj, actor) => {
        actors[actor.actor_id] = {name: actor.name};
        obj[actor.actor_id] = {
            character_name: actor.character_name,
            is_primary: actor.is_primary
        };
        return obj;
    }, {});

    const movies = {
        [movie.id]: {
            title: movie.title,
            director: movie.director,
            actors: movieActors
        }
    };
    return {
        movies: movies,
        actors: actors,
        directors: directors
    }
};

export const formValuesToRequest = (id, {actors, director, title}) => {
    return {
        id: id,
        title: title,
        director: director.value,
        director_name: director.label,
        actors: actors.map(actor => {
            return {
                character_name: actor.character_name,
                is_primary: actor.is_primary,
                actor_id: actor.value,
                name: actor.label
            }
        })
    }
};