import React, { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function UpdateMovie (props) {
    const { id } = useParams();
    const { push } = useHistory();

    const initialMovieData = {
        id: id,
        title: '',
        director: '',
        metascore: '',
        stars: []
    }

    const [movieData, setMovieData] = useState(initialMovieData);
    const [starField, setStarField] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(response => {
                setMovieData(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    function handleStarRemove (event, name) {
        event.preventDefault();
        
        const updatedStars = movieData.stars.filter(item => {
            return item !== name;
        });

        setMovieData({
            ...movieData,
            stars: updatedStars
        });
    }

    function handleStarAdd (event) {
        event.preventDefault();

        if (starField) {
            setMovieData({
                ...movieData,
                stars: [
                    ...movieData.stars,
                    starField
                ]
            });
    
            setStarField('');
        }
    }

    function handleFieldChange (event) {
        setMovieData({
            ...movieData,
            [event.target.name]: event.target.value
        });
    }

    function handleStarFieldChange (event) {
        setStarField(event.target.value);
    }

    function handleFormSubmit (event) {
        event.preventDefault();

        axios.put(`http://localhost:5000/api/movies/${id}`, movieData)
            .then(response => {
                setMovieData(initialMovieData);
                push(`/movies/${id}`);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="container">
            <h2>Edit Movie</h2>
            <form onSubmit={handleFormSubmit}>
                <fieldset>
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" id="title" value={movieData.title} onChange={handleFieldChange} />
                </fieldset>
                <fieldset>
                    <label htmlFor="director">Director:</label>
                    <input type="text" name="director" id="director" value={movieData.director} onChange={handleFieldChange} />
                    </fieldset>
                <fieldset>
                    <label htmlFor="metascore">Metascore:</label>
                    <input type="number" name="metascore" id="metascore" value={movieData.metascore} min="0" onChange={handleFieldChange} />
                    </fieldset>
                <fieldset>
                    <label htmlFor="star">Stars:</label>
                    <ul>
                        {
                            movieData.stars && movieData.stars.map((star, index) => {
                                return (
                                    <li key={index}>
                                        {star}{' '}
                                        <a href="/#" onClick={event => handleStarRemove(event, star)}>Remove</a>
                                    </li>
                                );
                            })
                        }
                    </ul>
                    <div>
                        <input type="text" name="star" id="star" value={starField} onChange={handleStarFieldChange} placeholder="New star..." />
                        <button onClick={handleStarAdd}>+</button>
                    </div>
                </fieldset>
                <fieldset>
                    <button>Save</button>
                </fieldset>
            </form>
        </div>
    );
}