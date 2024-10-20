import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

function PaymentCard({card, handleDelete }) {
    const { cardnumber, expiration_date, name, cvv, user_id, payment_card_id } = card;
    const navigate = useNavigate();
    const onEdit = () => {
        navigate('/edit', { state: { card } });
      };
      const onDelete = async () => {
        console.log('Delete clicked');
        const response = await fetch(`http://localhost:3001/paymentcard/delete/${card.payment_card_id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
        
          const data = await response.json();
          if (response.ok) {
            alert(data.message);
            handleDelete(payment_card_id);
          } else {
            alert(data.message);
          }
      };
    return (
      <div  className="payment-card">
        <h3> Name on Card: {name}</h3>
      <p>
        Card Number: {cardnumber}
      </p>
      <p> Expiration Date: {expiration_date}</p>
      <p> CVV: {cvv}</p>
      <div>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
      </div>
    );
  }
  
  export default PaymentCard;
  