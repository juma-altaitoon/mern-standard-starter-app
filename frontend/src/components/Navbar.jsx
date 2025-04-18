import { useState, useContext } from 'react';
import { Link } from  'react-router-dom';
import propTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, Box, Menu, MenuItem, Avatar } from '@mui/material'
import DiamondIcon from '@mui/icons-material/Diamond';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import AuthContext  from '../context/AuthContext';


const pages = ['About', 'Profile', 'Private'];

export default function Navbar({toggleTheme, theme}) {
    const [ anchorElNav, setAnchorElNav ] = useState(null);
    // Get authentication state and user information
    const { isAuthenticated, user } = useContext(AuthContext); 

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    }
    
    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    return (
        <AppBar component="header" position='sticky' elevation={10} sx={{maxWidth:'100%', maxHeight: '10vh', justifyContent: 'center', alignItems: 'center'}}>
            <Container maxWidth="xl"> 
                <Toolbar disableGutters >
                    <DiamondIcon sx={{ display: {xs: 'none', md: 'flex'}, color:'ActiveBorder', fontSize:'3rem' }} />
                    <Typography 
                        variant="h3" 
                        noWrap
                        component={Link}
                        to='/'
                        sx={{ 
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 'bold',
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size='large' aria-label='menu' aria-controls='menu-appbar' aria-haspopup='true' color='inherit' onClick={handleOpenNavMenu}>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} divider component={Link} to={`/${page.toLowerCase()}`} onClick={handleCloseNavMenu} >
                                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <DiamondIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 , }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component={Link}
                        to='/'
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box justifyContent='space-evenly' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2, m: 2 }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, display: 'block', fontSize: '1rem'}}
                                component={Link}
                                to={`/${page.toLowerCase()}`}
                                color='inherit'
                                size='large'
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    { isAuthenticated ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar src={user.avatarUrl} alt={user.username}>{user.username}</Avatar>
                            <Typography variant='body1' >{user.username}</Typography>
                        </Box>
                    ) : (
                        <>
                            <Button variant='outlined' size='large' color='inherit' component={Link} to='/login' sx={{ fontSize: '1rem', borderRadius: 50 }} >Login</Button>
                            <Button variant='outlined' size='large' color='inherit' component={Link} to='/register' sx={{ fontSize: '1rem', borderRadius: 50, m:1 }} >Register</Button>
                        </>
                    )}
                    <Button variant='outlined' color='inherit' onClick={toggleTheme} size='small' sx={{  borderRadius: 100 }}>
                        {theme === 'light' ? <DarkModeIcon/>: <LightModeIcon/>}
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

Navbar.propTypes = {
    toggleTheme: propTypes.func.isRequired,
    theme: propTypes.string.isRequired,
}