import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';

function AddPaymentCard() {
    const  {userId }  = useParams();
  const [inputs, setInputs] = useState({
    name: '',
    cardnumber: '',
    expiration_date: '',
    cvv: '',
    user_id: Number(userId) 
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    setInputs(prev => ({...prev, [event.target.name]: event.target.value}))
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    //post to database
    const result = await fetch('http://localhost:3001/paymentcard/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    });
    //console.log(inputs.trailerpicture)
    //console.log(status)
    //console.log(inputs)
    alert("added new payment card");
    navigate('/edit-payments');
  }
    return (
      <div>
        <Header></Header>
    <form onSubmit={handleSubmit}>
      <label>Enter Name on the card:
      <input 
        type="text" 
        name="name" 
        value={inputs.name || ""} 
        onChange={handleChange}
      />
      </label>
      <label>Enter Card Number:
        <input 
          type="text" 
          name="cardnumber" 
          value={inputs.cardnumber || ""} 
          onChange={handleChange}
        />
      </label>
      <label>Enter expiration date:
        <input 
            type="text" 
            name="expiration_date" 
            value={inputs.expiration_date || ""} 
            onChange={handleChange}
          />
      </label>
      <label>Enter cvv:
        <input 
              type="text" 
              name="cvv" 
              value={inputs.cvv || ""} 
              onChange={handleChange}
            />
      </label>
      <button className = "addmoviebutton" type="submit">Submit</button>
    </form>
    </div>
    );
}

export default AddPaymentCard;