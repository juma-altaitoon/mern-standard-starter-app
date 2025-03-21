import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Grid2 from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import AuthContext from '../context/AuthContext';

export default function Login() {
    const [ userLogin, setUserLogin ] = useState({})
    const [ emailError, setEmailError ] = useState(false);
    const [ emailErrorMessage, setEmailErrorMessage ] = useState('');
    const [ passwordError, setPasswordError ] = useState(false);
    const [ passwordErrorMessage, setPasswordErrorMessage ] = useState('');
    const [ showPassword, setShowPassword ] = useState(false);
    const { login } = useContext(AuthContext);
    

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }
    const handleMouseUpPassword = (event) => {
        event.preventDefault()
    }

    const validateInputs = () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        let isValid = true;
        
        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage("Please enter a valid email address.");
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || (password.value.length < 12)) {
            setPasswordError(true);
            setPasswordErrorMessage("Password must contain at least 12 characters.");
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }
        return isValid;
    }

    const handleChange = (event) => {
        const user = {...userLogin};
        user[event.target.name] = event.target.value; 
        setUserLogin(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (emailError || passwordError) {
            return;
        }
        login(userLogin)
    }

    return(
        <Container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: "space-evenly" }} >
            <Card variant='outlined' elevation={1} sx={{ m: 2, boxShadow: 3, borderColor: 'primary'}}>
                <Typography
                    component="h1"
                    sx={{fontSize: '2rem', textAlign: 'center', mt: 1 }}
                >
                    Login
                </Typography>
                <Grid2
                    container spacing={1}
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: '100%', flexDirection: 'column', gap: 1, boxShadow: 2 }}
                >
                    <Grid2 size={10} sx={{ m: 2 }}>
                        <TextField
                            label='Email'
                            type='email'
                            autoComplete='email'
                            name='email'
                            required
                            fullWidth
                            id='email'
                            placeholder="your@email.com"
                            variant='outlined'
                            error={emailError}
                            helpertext={emailErrorMessage}
                            color={emailError ? 'error' : 'primary'}
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={10} sx={{display: 'flex', flexDirection: 'row', gap: 2, m: 2}}>
                        <FormControl variant="outlined" required>
                            <InputLabel htmlFor="password">Password</InputLabel>    
                            <OutlinedInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                                name='password'
                                required
                                fullWidth
                                variant='outlined'
                                placeholder="••••••"
                                error={passwordError}
                                helpertext={passwordErrorMessage}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid2>
                    <Button
                        type='submit'
                        variant='contained'
                        onClick={validateInputs}
                    >
                        Login
                    </Button>
                </Grid2>
                <Divider />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, m:1 }}>
                    <Button 
                        to="/forgot-password"
                        variant="body2"
                        sx={{ alignSelf: 'center' }}
                    >
                        Forgot password?
                    </Button>
                </Box>
            </Card>
        </Container>
    );
}