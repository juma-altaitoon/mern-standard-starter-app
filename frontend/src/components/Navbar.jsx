import { Link } from  'react-router-dom';
import propTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Button } from '@mui/material'

export default function Navbar({toggleTheme, theme}) {

    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <div>Logo</div>
                    <ul>
                        <li><Link to="/" >Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                </Typography>
                <Button color='inherit' onClick={toggleTheme}>
                    {theme === 'light' ? 'Dark-Mode': 'Light-Mode'}
                </Button>
            </Toolbar>
        </AppBar> 
    )
}

Navbar.propTypes = {
    toggleTheme: propTypes.func.isRequired,
    theme: propTypes.string.isRequired,
}