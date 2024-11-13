import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react';
import AdminHeader from './components/AdminHeader';
import AdminErrorPage from './components/AdminErrorPage';
import PromotionCard from './components/PromotionCard';

function ManagePromotions() {
  const location = useLocation();
  const {state} = location || {};
  const {movie_title, movie_id} = state || {};
  console.log(movie_title);
  const role = localStorage.getItem('role');
  const [cards, setCards] = useState([]);
  const [userId, setUserId] = useState(null); // State to store userId
  useEffect(() => {
    const fetchCards = async () => {
      try {
        setUserId(localStorage.getItem('id'));
        const response = await fetch(`http://localhost:3001/promotion/get/${movie_id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'  
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch cards');
        }
        const data = await response.json();
        console.log(data);
        setCards(data);
        //console.log('id is ' + localStorage.getItem('id'));
      } catch (err) {
        console.log(err);
      }
    };

    fetchCards();
}, []);
const handleDelete = (cardId) => {
  setCards(prevCards => prevCards.filter(card => card.Promo_id !== cardId));
};
  if(role && role === 'admin') {
    return (
        <body>
        <AdminHeader></AdminHeader>
        <div>
          <Link to="/manage-movies"><button>Manage Movies and Promotions</button></Link>
          <Link to="/manage-users"><button>Manage Users</button></Link>
        </div>
         <div className="regConfirm">
         <div>
      <h1>Promos for this movie</h1>
        <div className="edit-payments-container">
          {cards.map(card => (
            <PromotionCard 
              key={card.Promo_id} // Assuming each card has a unique id
              card={card} 
              handleDelete={handleDelete}
            />
          ))}
        </div>
        <Link to={`/addpromo/${movie_id}`} state={{ movie_title, movie_id }}>
        <button>Add New Promo Card</button>
      </Link>
    </div>

          </div>

        </body>
    );
  } else {
    <AdminErrorPage></AdminErrorPage>
  }
}

export default ManagePromotions;
