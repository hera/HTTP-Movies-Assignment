import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const MovieCard = props => {
    const { title, director, metascore, stars, id } = props.movie;
    const getMovieList = props.getMovieList;

    const { push } = useHistory();

    function handleDelete (event) {
        event.preventDefault();

        axios.delete(`http://localhost:5000/api/movies/${id}`)
            .then(response => {
                getMovieList();
                push('/');
            })
            .catch(error => {
                console.log('Error. Could not delete movie.');
            });
    }

    return (
        <div className="movie-card">
            <h2>{title}</h2>

            <div className="movie-director">
                Director: <em>{director}</em>
            </div>

            <div className="movie-metascore">
                Metascore: <strong>{metascore}</strong>
            </div>

            <h3>Actors</h3>

            {stars.map(star => (
                <div key={star} className="movie-star">
                    {star}
                </div>
            ))}

            <br />
            <Link to={`/update-movie/${id}`}>Edit</Link>
            <br />
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default MovieCard;
