import React, { useState, useEffect } from 'react'
import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import UserProfile from './pages/UserProfile';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PrivatePage from './pages/PrivatePage';

export default function App() {
  const [ theme, setTheme ] = useState(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme( theme === 'light' ? 'dark' : 'light')
  };

  return (
    <React.Fragment>
      <CssBaseline enableColorScheme/>
      <Router>
        <AuthProvider>
          <div className='app'>
            <Navbar toggleTheme={toggleTheme} theme={theme}/>
            <div>
              <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/about' element={<About/>} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login/>} />
                <Route path='/forgot-password' element={<ForgotPassword/>} />
                <Route path='/profile' element={<ProtectedRoute element={UserProfile} />} />
                <Route path='/private' element={<ProtectedRoute element={PrivatePage} />} />
                <Route path='/404' element={<NotFound/>} />
                {/* Redirect unknown routes to "/404" */}
                <Route path='/*' element={<Navigate to="/404" />} />
              </Routes>
            </div>
            <Footer/>
          </div>
        </AuthProvider>
      </Router>
    </React.Fragment>
  )
};
