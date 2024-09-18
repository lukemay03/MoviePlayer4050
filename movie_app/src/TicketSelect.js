import React from 'react';
import Header from './Header';
import {Link} from 'react-router-dom';



function TicketSelect() {
  return (
    <div className="ticket-select">
      <Header></Header>
      <div class="regConfirm">
        <h3> Booking for Movie: _______</h3>
        <h3> Choose a Date: 
            <input type="date" id="date"></input>
        </h3>
        <h3> Choose a showtime on </h3>
      </div>
    </div>
  );
}

export default TicketSelect;