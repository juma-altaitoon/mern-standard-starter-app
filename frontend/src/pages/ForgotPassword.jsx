import { useState } from 'react';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid2 from '@mui/material/Grid2';
import Container from '@mui/material/Container';

export default function ForgotPassword() {

    const [ email, setEmail ] = useState();
    const [ emailError, setEmailError ] = useState(false);
    const [ emailErrorMessage, setEmailErrorMessage ] = useState('');

    const validateInputs = () => {
        const email = document.getElementById('email');

        let isValid = true;
        
        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage("Please enter a valid email address.");
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        return isValid;
    }

    const handleSubmit = (event) => {
        if (emailError) {
            event.preventDefault();
            return;
        }   
    }

    return(
        <Container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: "space-evenly", m: 10 }} >
            <Card variant='outlined' elevation={0} sx={{ m: 2, boxShadow: 3, borderColor: 'primary.main' }}>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: '2rem', m:2 }}
                >
                    Forgot Password ?
                </Typography>
                <Typography component='p' variant='body1' sx={{ m:2 }} >
                    Enter your email address and we will send you a link to reset your password.
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
                            onChange= { (event) => setEmail(event.target.value)}
                            value={email}
                        />
                    </Grid2>
                    <Divider />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        onClick={validateInputs}
                    >
                        Reset Password
                    </Button>
                </Grid2>
            </Card>
        </Container>
    );
}