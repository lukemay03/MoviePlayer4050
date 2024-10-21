import React from 'react';
import { useNavigate, useParams,useLocation } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';

function EditPaymentCard() {
    const location = useLocation();
    const {state} = location || {};
    const { cardnumber, expiration_date, name, cvv, user_id, payment_card_id } = state;
  const [inputs, setInputs] = useState({
    name: name,
    cardnumber: cardnumber,
    expiration_date: expiration_date,
    cvv: cvv,
    user_id: user_id,
    payment_card_id: payment_card_id 
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    setInputs(prev => ({...prev, [event.target.name]: event.target.value}))
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    //post to database
    const result = await fetch('http://localhost:3001/paymentcard/edit', {
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
    alert("edited payment card");
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

export default EditPaymentCard;