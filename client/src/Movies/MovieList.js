import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList(props) {
    const { movies, getMovieList } = props;

    return (
        <div className="movie-list">
            {
                movies.map(movie => (
                    <Link key={movie.id} to={`/movies/${movie.id}`}>
                        <MovieCard movie={movie} getMovieList={getMovieList} />
                    </Link>
                ))
            }
        </div>
    );
}

export default MovieList;
