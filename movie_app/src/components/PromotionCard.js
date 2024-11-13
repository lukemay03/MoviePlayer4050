import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

function PromotionCard({card, handleDelete }) {
    const {movie_id, description, date, Promo_id, movie_title } = card;
    const navigate = useNavigate();
    const onEdit = () => {
        navigate('/edit', { state: { card } });
      };
      const onDelete = async () => {
        console.log('Delete clicked');
        const response = await fetch(`http://localhost:3001/promo/delete/${Promo_id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
        
          const data = await response.json();
          if (response.ok) {
            alert(data.message);
            handleDelete(Promo_id);
          } else {
            alert(data.message);
          }
      };
    return (
      <div  className="payment-card">
        <h3> Movie title: {movie_title}</h3>
      <p>
        Date: {date}
      </p>
      <p> description: {description}</p>
      <div>
      <Link to={{ pathname: '/editpromo' }} state={card} className="button-link">Edit Promo</Link>
        <button onClick={onDelete}>Delete</button>
      </div>
      </div>
    );
  }
  
  export default PromotionCard;
  