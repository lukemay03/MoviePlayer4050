import React, { useState } from 'react';
import Header from './components/Header'

function EditPayments() {
  const [cards, setCards] = useState([
    { cardNumber: '', nameOnCard: '', expirationDate: '', cvv: '' },
  ]);

  const handleInputChange = (index, event) => {
    const updatedCards = [...cards];
    updatedCards[index][event.target.name] = event.target.value;
    setCards(updatedCards);
  };

  const handleAddCard = () => {
    if (cards.length < 3) {
      setCards([...cards, { cardNumber: '', nameOnCard: '', expirationDate: '', cvv: '' }]);
    }
  };

  const handleRemoveCard = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saved cards:', cards);
    //handle submitting the card information (e.g., send to backend)
  };

  return (
    <div className="edit-payments-container">
    <Header/>
      <form onSubmit={handleSubmit}>
        {cards.map((card, index) => (
          <div key={index} className="card-group">
            <h3>Card {index + 1}</h3>
            <div className="form-group">
              <label htmlFor={`cardNumber-${index}`}>Card Number:</label>
              <input
                type="text"
                id={`cardNumber-${index}`}
                name="cardNumber"
                value={card.cardNumber}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Enter card number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor={`nameOnCard-${index}`}>Name on Card:</label>
              <input
                type="text"
                id={`nameOnCard-${index}`}
                name="nameOnCard"
                value={card.nameOnCard}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Enter name on card"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor={`expirationDate-${index}`}>Expiration Date:</label>
              <input
                type="text"
                id={`expirationDate-${index}`}
                name="expirationDate"
                value={card.expirationDate}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="MM/YY"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor={`cvv-${index}`}>CVV:</label>
              <input
                type="text"
                id={`cvv-${index}`}
                name="cvv"
                value={card.cvv}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Enter CVV"
                required
              />
            </div>

            <button type="button" onClick={() => handleRemoveCard(index)} disabled={cards.length <= 1}>
              Remove Card
            </button>
            <hr />
          </div>
        ))}

        {cards.length < 3 && (
          <button type="button" onClick={handleAddCard}>
            Add Another Card
          </button>
        )}

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditPayments;
