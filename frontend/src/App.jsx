
import './styles/middlebar.css';
import Login from './components/login-signup/login.js'
import React from 'react';

import Home from'./components/homepage/ListScreen.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/login-signup/signup.js'
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
