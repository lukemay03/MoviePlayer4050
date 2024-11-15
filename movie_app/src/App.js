import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
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
import EditUser from './EditUsers'
import LogoutPage from './LogoutPage'
import EditPayments from './EditPayments'
import ForgotPassword from './ForgotPassword'
import ForgotPasswordConfirm from './ForgotPasswordConfirm'
import ResetPassword from './ResetPassword'
import ResetPasswordConfirm from './ResetPasswordConfirm'
import AddPaymentCard from './AddPaymentCard';
import EditPaymentCard from './EditPaymentCard';
import AddPromo from './AddPromo';
import EditPromo from './EditPromo';
import ScheduleMovie from './ScheduleMovie';

function App() {
  return (


    <Router>
      <div>
      <ScrollToTop />
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
          <Route path="/edit-movie" element={<EditMovie/>} />
          <Route path="/checkout/:name" element={<Checkout />} />
          <Route path="/order-confirm" element={<OrderConfirm/>} />
          <Route path="/add-movie-page" element={<AddMovie/>} />
          <Route path="/edit-user" element={<EditUser/>} />
          <Route path="/logout" element={<LogoutPage/>} />
          <Route path="/edit-payments" element={<EditPayments/>} />
          <Route path="/forgot-pass" element={<ForgotPassword/>} />
          <Route path="/forgot-pass-confirm" element={<ForgotPasswordConfirm/>} />
          <Route path="/reset-pass" element={<ResetPassword/>} />
          <Route path="/reset-pass-confirm" element={<ResetPasswordConfirm/>} />
          <Route path="/addpaymentcard/:userId" element={<AddPaymentCard/>} />
          <Route path="/addpromo/:movie_id" element={<AddPromo/>} />
          <Route path="/editpaymentcard" element={<EditPaymentCard/>} />
          <Route path="/editpromo" element={<EditPromo/>} />
          <Route path="/schedule-movie" element={<ScheduleMovie/>} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
