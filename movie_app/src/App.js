import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import RegisterPage from './RegisterPage'; 
import Home from './Home'; 
import LoginPage from './LoginPage';
import EditProfile from './EditProfile';
import RegistrationConfirm from './RegistrationConfirm';
import AdminMain from './AdminMain';
import ManageMovies from './ManageMovies';
import ManageUsers from './ManageUsers'
import ManagePromotions from './ManagePromotions'
import TicketSelect from './TicketSelect'
import SeatSelector from './components/SeatSelector'
import EditMovie from './EditMovie'
import Checkout from './Checkout'
import OrderConfirm from './OrderConfirmPage'
import AddMovie from './AddMoviePage'
function App() {
  return (


    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/edit-profile" element={<EditProfile/>} />
          <Route path="/reg-confirm" element={<RegistrationConfirm/>} />
          <Route path="/admin-main" element={<AdminMain/>} />
          <Route path="/manage-movies" element={<ManageMovies/>} />
          <Route path="/manage-users" element={<ManageUsers/>} />
          <Route path="/manage-promotions" element={<ManagePromotions/>} />
          <Route path="/ticket-select" element={<TicketSelect/>} />
          <Route path="/seat-selector" element={<SeatSelector/>} />
          <Route path="manage-movies/edit-movie" element={<EditMovie/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/OrderConfirm" element={<OrderConfirm/>} />
          <Route path="/AddMoviePage" element={<AddMovie/>} />

        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
