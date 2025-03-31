import React from 'react';
import { Routes, Route } from 'react-router-dom'; // ❌ Remove BrowserRouter
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home.js';
import Login from './pages/Login';
import Register from './pages/Register';
import Conferences from './pages/Conferences';
import ConferenceDetails from './pages/ConferenceDetails';
import Payment from './pages/Payment';
import Notification from './pages/Notification';
import './styles/main.css';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/conferences" element={<Conferences />} />
          <Route path="/conferences/:id" element={<ConferenceDetails />} />
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/notifications" element={<Notification />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
