import {React, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

function PromotionCard({ card, handleDelete }) {
    const { movie_id, description, date, Promo_id, movie_title, code, mailed } = card;
    const [inputs, setInputs] = useState({
      description: description,
      date: date,
      movie_id: Number(movie_id),
      Promo_id: Promo_id,
      code: code,
      mailed: mailed
    });
    const navigate = useNavigate();
    const sendPromoEmail = async () => {
        try {
            const result = await fetch('http://localhost:3001/users/promo');
            if (!result.ok) {
                throw new Error('Failed to fetch promo emails');
            }
        
            const emails = await result.json();
            const htmlMessage = `
                <h2>Hello Customers!</h2>
                <p>You have registered for promotions so here is a nice promotion</p>
                <p> The movie ${movie_title} is ${description} off on ${date}. The code is ${code}.</p>
                <p>Best regards,</p>
                <p>Movie Player Co.</p>`;
            const subject = `Promotion email for ${movie_title}`;
            for (const { email } of emails) {
              const emailResponse = await fetch('http://localhost:3001/trigger-order-confirm', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ email, htmlMessage, subject }),
              });
  
              const emailData = await emailResponse.json();
              if (!emailResponse.ok) {
                  console.error(`Failed to send email to ${email}:`, emailData.message);
                  alert(`Failed to send email to ${email}.`);
              } else {
                  console.log(`Promotion email sent to ${email}`);
              }
          }
          inputs.mailed = 'True';
          const editresult = await fetch('http://localhost:3001/promo/edit', {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,  
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs),
          });
          alert("All promotion emails processed.");
  
      } catch (error) {
          console.error("Error sending promotion emails:", error);
          alert("An error occurred while sending the emails.");
      }
  };

    const onDelete = async () => {
        console.log('Delete clicked');
        try {
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
        } catch (error) {
            console.error("Error deleting promo:", error);
            alert("An error occurred while deleting the promo.");
        }
    };
    if(mailed === 'False') {
    return (
        <div className="payment-card">
            <h3>Movie title: {movie_title}</h3>
            <p>Date: {date}</p>
            <p>Description: {description}</p>
            <p>Code: {code}</p>
            <div>
                <Link to={{ pathname: '/editpromo' }} state={card} className="button-link">Edit Promo</Link>
                <button onClick={onDelete}>Delete</button>
                <button onClick={sendPromoEmail}>Send Promotion Email</button>
            </div>
        </div>
    );
  } else {
    return(
      <div className="payment-card">
            <h3>Movie title: {movie_title}</h3>
            <p>Date: {date}</p>
            <p>Description: {description}</p>
            <p>Code: {code}</p>
            <p> has been mailed</p>
        </div>
    );
  }

}

export default PromotionCard;
