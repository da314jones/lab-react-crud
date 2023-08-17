import "./MoviesForm.css";
import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {createMovie} from "../../api/fetch";

const MovieNewForm = () => {
    const [movie, setMovie] = useState({
        type: "",
        title: "",
        country: "",
        dateAdded: "",
        description: "",
        duration: "",
        listedIn: "",
        rating: "",
        releaseYear: "",
    });
const navigate = useNavigate();

function handleSubmit(event){
    event.preventDefault();
    createMovie(movie)
    .then((createdMovie) => {
        console.log(createdMovie)
        alert(`movie created: ${createdMovie.title} id: ${createdMovie.id}`)
        navigate(`/movies/${createdMovie.id}`)
    })
    .catch((err) => {
        console.log(err)
    })
}


    function handleTextChange(e){
        setMovie({
            ...movie, [e.target.id]: e.target.value}
        );
    }


    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='title'> Title:  </label>
                <input 
                type="text"
                id="title"
                value={movie.title}
                onChange={handleTextChange}
                 />
           
            <label htmlFor="description"> Description:  </label>
                <input 
                type="text"
                id="description"
                value={movie.description}
                onChange={handleTextChange}
                />
           
            <label htmlFor="type"> Type:  </label>
                <input 
                type="text"
                id="type"
                value={movie.type}
                onChange={handleTextChange}
                />
           
            <label htmlFor="rating" > Rating:  </label>
                <input
                type="text"
                id="rating"
                value={movie.rating}
                onChange={handleTextChange} 
                />
           
            <label htmlFor='listedIn'> Listed in:   </label>
                <input
                type="text"
                id="listedIn"
                value={movie.listedIn}
                onChange={handleTextChange} 
                />
           
            <label htmlFor='duration'> Duration:   </label>
                <input
                type="text"
                id="duration"
                value={movie.duration}
                onChange={handleTextChange} 
                />
            
            <label htmlFor="releaseYear" > Release Year:  </label>
                <input
                type="text"
                id="releaseYear"
                value={movie.releaseYear} 
                onChange={handleTextChange} 
                />
            
            <label htmlFor='country'> Country:  </label>
                <input 
                type="text"
                id="country"
                value={movie.country}
                onChange={handleTextChange} 
                />
           
            <label htmlFor='dateAdded'> Date added: </label>
                <input 
                type="text"
                id="dateAdded"
                value={movie.dateAdded}
                onChange={handleTextChange} 
                 />

                 <br />

                 <input type="submit"/>

                
         

        </form>
    );
}

export default MovieNewForm;
