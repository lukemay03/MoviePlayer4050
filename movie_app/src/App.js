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
import TicketSelect from './TicketSelect';


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
          <Route path="/ticket-select" element={<TicketSelect/>} />

        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
