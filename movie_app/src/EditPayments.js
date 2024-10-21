import { useEffect, useState } from 'react';
import Header from './components/Header'
import PaymentCard from './components/PaymentCard';
import { Link} from 'react-router-dom';
function EditPayments() {

  const [cards, setCards] = useState([]);
  const [userId, setUserId] = useState(null); // State to store userId
  useEffect(() => {
    const fetchCards = async () => {
      try {
        setUserId(localStorage.getItem('id'));
        const response = await fetch('http://localhost:3001/paymentcard/get', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch cards');
        }
        const data = await response.json();
        setCards(data);
        //console.log('id is ' + localStorage.getItem('id'));
      } catch (err) {
        console.log(err);
      }
    };

    fetchCards();
}, []);
const handleDelete = (cardId) => {
  setCards(prevCards => prevCards.filter(card => card.payment_card_id !== cardId));
};
console.log(cards);
  return (
    <div>
      <Header></Header>
      <h1>Your Payment Cards</h1>
        <div className="edit-payments-container">
          {cards.map(card => (
            <PaymentCard 
              key={card.payment_card_id} // Assuming each card has a unique id
              card={card} 
              handleDelete={handleDelete}
            />
          ))}
        </div>
        <Link to={`/addpaymentcard/${userId}`}>
        <button>Add New Payment Card</button>
      </Link>
    </div>
  );
}

export default EditPayments;
