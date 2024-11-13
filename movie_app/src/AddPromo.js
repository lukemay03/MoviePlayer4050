import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import AdminErrorPage from './components/AdminErrorPage';
function AddPromo() {
  const role = localStorage.getItem('role');
  const location = useLocation();
  const { movie_title, movie_id } = location.state || {};
  const [inputs, setInputs] = useState({
    description: '',
    date: '',
    movie_id: Number(movie_id),
    code: '' 
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    setInputs(prev => ({...prev, [event.target.name]: event.target.value}))
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    //post to database
    const result = await fetch('http://localhost:3001/promo/insert', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,  
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    });
    if (!result.ok) {
      const errorData = await result.json();
      alert(errorData.message || 'Failed to add promo card.');
      return;
    }
    //console.log(inputs.trailerpicture)
    //console.log(status)
    //console.log(inputs)
    alert("added new promo");
    navigate(`/manage-promotions`, {
        state: {
          movie_title: location.state?.movie_title,
          movie_id: location.state?.movie_id,
        },
      });
  }
  if(role && role === 'admin') {
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
      <label>Enter description:
        <input 
          type="text" 
          name="description" 
          value={inputs.description || ""} 
          onChange={handleChange}
        />
      </label>
      <label>Enter code:
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
} else {
    return (
    <AdminErrorPage></AdminErrorPage>
    );
  }
}

export default AddPromo;