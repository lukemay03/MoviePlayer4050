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
<<<<<<< HEAD
import ManageMovies from './ManageMovies';
import ManageUsers from './ManageUsers';
import ManagePromotions from './ManagePromotions';
=======
import TicketSelect from './TicketSelect';

>>>>>>> 299c562364eeef1d35dfd7057169f1c604e9684b

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
<<<<<<< HEAD
          <Route path="/manage-movies" element={<ManageMovies/>} />
          <Route path="/manage-users" element={<ManageUsers/>} />
          <Route path="/manage-promotions" element={<ManagePromotions/>} />
=======
          <Route path="/ticket-select" element={<TicketSelect/>} />

>>>>>>> 299c562364eeef1d35dfd7057169f1c604e9684b
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
