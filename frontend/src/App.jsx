import './styles/middlebar.css';
import Login from './components/login-signup/login';
import React from 'react';
import Home from './components/homepage/ListScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/login-signup/signup';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
