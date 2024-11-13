import React from 'react';
import { useNavigate, useParams,useLocation } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';

function EditPromo() {
  const role = localStorage.getItem('role');
  const location = useLocation();
  const { movie_title, movie_id, description, date, Promo_id, code, mailed } = location.state || {};
  const [inputs, setInputs] = useState({
    description: description,
    date: date,
    movie_id: Number(movie_id),
    Promo_id: Promo_id,
    code: code,
    mailed: mailed

  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    setInputs(prev => ({...prev, [event.target.name]: event.target.value}))
  }
  const handleSubmit = async (event) => {
    if(mailed === 'True') {
      alert('promo has already been sent out.');
    }
    event.preventDefault()
    //post to database
    console.log('inputs are');
    console.log(inputs);
    const result = await fetch('http://localhost:3001/promo/edit', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,  
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    });
    //console.log(inputs.trailerpicture)
    //console.log(status)
    //console.log(inputs)
    alert("edited promo card");
    navigate(`/manage-promotions`, {
        state: {
          movie_title: location.state?.movie_title,
          movie_id: location.state?.movie_id,
        },
      });
  }
    return (
      <div>
        <Header></Header>
    <form onSubmit={handleSubmit}>
      <label>Enter Date:
      <input 
        type="text" 
        name="date" 
        value={inputs.date || ""} 
        onChange={handleChange}
      />
      </label>
      <label>Enter Description:
        <input 
          type="text" 
          name="description" 
          value={inputs.description || ""} 
          onChange={handleChange}
        />
      </label>
      <label>Enter Code:
        <input 
          type="text" 
          name="code" 
          value={inputs.code || ""} 
          onChange={handleChange}
        />
      </label>
      <button className = "addmoviebutton" type="submit">Submit</button>
    </form>
    </div>
    );
}

export default EditPromo;