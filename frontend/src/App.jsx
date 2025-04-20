import { useState, useEffect, Suspense, lazy } from 'react'
import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(()=> import('./pages/About'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const NotFound = lazy(() => import('./pages/NotFound'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const PrivatePage = lazy(() => import('./pages/PrivatePage'));
const Register2 = lazy(() => import('./pages/Register2'));

export default function App() {
  const [ theme, setTheme ] = useState(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme( theme === 'light' ? 'dark' : 'light')
  };

  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <ThemeProvider theme = {muiTheme}>
      <CssBaseline enableColorScheme/>
      <Router>
        <AuthProvider>
          <div className='app'>
            <Navbar toggleTheme={toggleTheme} theme={theme}/>
            <Suspense 
              fallback={
                <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: '100vh'}}>
                  <CircularProgress />
                </Box>
              }
            >
              <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/about' element={<About/>} />
                <Route path='/register' element={<Register />} />
                <Route path='/register2' element={<Register2 />} />
                <Route path='/login' element={<Login/>} />
                <Route path='/forgot-password' element={<ForgotPassword/>} />
                <Route path='/profile' element={<ProtectedRoute element={UserProfile} />} />
                <Route path='/private' element={<ProtectedRoute element={PrivatePage} />} />
                <Route path='/404' element={<NotFound/>} />
                {/* Redirect unknown routes to "/404" */}
                <Route path='/*' element={<Navigate to="/404" />} />
              </Routes>
            </Suspense>
            <Footer/>
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  )
};
