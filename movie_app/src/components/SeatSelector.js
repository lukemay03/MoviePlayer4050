import React from 'react';
import { Link } from 'react-router-dom';
import BuyTickets from '../BuyTickets';

function SeatSelector() {
    return (
      <div className="seats">
        <div class="SeatRow">
            <input type="checkbox" class="Seat"></input>
            <input type="checkbox" class="Seat"></input>
            <input type="checkbox" class="Seat"></input>
            <input type="checkbox" class="Seat"></input>
            <input type="checkbox" class="Seat"></input>
        </div>
        <div class="SeatRow">
            <div class="Seat"></div>
            <div class="Seat"></div>
            <div class="Seat"></div>
            <div class="Seat"></div>
            <div class="Seat"></div>
        </div>
        <div class="SeatRow">
            <div class="Seat"></div>
            <div class="Seat"></div>
            <div class="Seat"></div>
            <div class="Seat"></div>
            <div class="Seat"></div>
        </div>
      </div>
    );
  }
  
  export default SeatSelector;
  