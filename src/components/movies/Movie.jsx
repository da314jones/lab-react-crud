import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./Movie.css";

// import "./Show.css";

import ErrorMessage from "../errors/ErrorMessage";
import { getOneMovie, destroyMovie } from "../../api/fetch";

function Movie() { 
  // state to hold Show initialized to an empty object - data of a show
  const [movie, setMovie] = useState({});
  //state to hold error state - intialized to a false
  const [loadingError, setLoadingError] = useState(false);
  // example route: http://localhost:5173/shows/SLHUwyN
  const { id } = useParams();
  const navigate = useNavigate();
  // in this case id = "SLHUwyN"

  useEffect(() => {
    console.log(movie)
    getOneMovie(id)
      .then((movieData) => {
        // updates our state variable with data
        setMovie(movieData);
        // because state in an obj we need to check Object.keys()
        if (Object.keys(movieData).length === 0) {
          setLoadingError(true)
        } else {
          setLoadingError(false)
        }
      })
      .catch((err) => {
        console.error(err)
        setLoadingError(true)
      })
  },[id])

  function handleDelete(id) {
    destroyMovie(id)
      .then(() => {
        alert("movie destroyed - rerouting to index");
        navigate("/movie")
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <section className="movies-movie-wrapper">
      <h2>{movie.title}</h2>
      <section className="movies-movie">
        {loadingError ? (
          <ErrorMessage />
        ) : (
          <>
            <aside>
              <p>
                <span>Duration:</span> {movie.duration}
              </p>
              <p>
                <span>Listed Categories:</span> {movie.listedIn}
              </p>
              <p>
                <span>Country:</span> {movie.country}
              </p>
              <p>
                <span>Rating:</span> {movie.rating}
              </p>
              <p>
                <span>Date Added:</span> {movie.dateAdded}
              </p>
            </aside>
            <article>
              <p>{movie.description}</p>
            </article>
            <aside>
              <button className="delete" onClick={() => handleDelete(movie.id)}>
                Remove movie
              </button>
              <Link to={`/movies/${id}/edit`}>
                <button>Edit</button>
              </Link>
            </aside>
          </>
        )}
      </section>
    </section>
  );
}

export default Movie;
