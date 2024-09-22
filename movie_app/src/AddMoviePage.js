import React from 'react';
import Header from './components/Header';
import { Link } from 'react-router-dom';
import { useState } from 'react';
function AddMovie() {
  const [inputs, setInputs] = useState({
    current_running: 'True'
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.type === 'file' ? event.target.files[0] : event.target.value;
    setInputs(values => ({...values, [name]: value}))
    console.log(name)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs)
  }
    return (
    <form onSubmit={handleSubmit}>
      <label>Enter Movie Name:
      <input 
        type="text" 
        name="moviename" 
        value={inputs.moviename || ""} 
        onChange={handleChange}
      />
      </label>
      <label>Enter Cast:
        <input 
          type="text" 
          name="cast" 
          value={inputs.cast || ""} 
          onChange={handleChange}
        />
      </label>
      <label>Enter Category:
        <input 
            type="text" 
            name="category" 
            value={inputs.category || ""} 
            onChange={handleChange}
          />
      </label>
      <label>Enter director:
        <input 
              type="text" 
              name="director" 
              value={inputs.director || ""} 
              onChange={handleChange}
            />
      </label>
      <label>Enter Producer:
        <input 
              type="text" 
              name="producer" 
              value={inputs.producer || ""} 
              onChange={handleChange}
            />
      </label>
      <label>Enter synopsis:
        <textarea
          name= "synopsis" 
          rows="6"
          cols="54"
          style={{ resize: 'none' }}
          value={inputs.synopsis || ""} 
          onChange={handleChange}
          ></textarea>
      </label>
      <label>Enter trailer picture(optional):
        <input type="file" name="trailerpicture" onChange={handleChange} />
      </label>
      <label>Enter trailer link:
        <input 
          type="text" 
          name="trailerlink" 
          value={inputs.trailerlink || ""} 
          onChange={handleChange}
        />
      </label>
      <label>Enter movie rating:
      <input 
          type="text" 
          name="movierating" 
          value={inputs.movierating || ""} 
          onChange={handleChange}
        />
      </label>
      <label>Enter Current_running:
        <div className = "radio-item">
          <label htmlFor="radio1">True&nbsp;</label>
          <input type="radio" name="current_running" id="radio1" value="True" checked={inputs.current_running === 'True'} onChange={handleChange} />
        </div>
        <div className = "radio-item">
          <label htmlFor="radio2">False</label>
          <input type="radio" name="current_running" id="radio2" value="False" checked={inputs.current_running === 'False'} onChange={handleChange} />
          </div>
      </label>
      <button className = "addmoviebutton" type="submit">Submit</button>
    </form>
    );
}

export default AddMovie;