import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About'
import './index.css'

export default function App() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

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
        <div className='app'>
          <Navbar toggleTheme={toggleTheme} theme={theme}/>
          <div>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/about' element={<About/>} />
            </Routes>
          </div>
        </div>
      </Router>
    </React.Fragment>
  )
};
