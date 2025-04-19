import { useState } from 'react';
import Axios from 'axios'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid2 from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import { Stepper, Step, StepLabel, Collapse } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {

    const [ email, setEmail ] = useState();
    const [ emailError, setEmailError ] = useState(false);
    const [ emailErrorMessage, setEmailErrorMessage ] = useState('');
    
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter OTP and new password
    const [otpError, setOtpError] = useState(false);
    const [otpErrorMessage, setOtpErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const navigate = useNavigate();

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

    const handleRequestOtp = async () => {
        if (!validateInputs()){
            return;
        }
        try {
            const response = await Axios.post('/users/forgot-password', { email});
            console.log(response.data);
            setStep(1); // Move to OTP step
        } catch (error) {
            console.error("Error requesting OTP: ", error.response?.data || error.message);
        }
    }
    
    const handleResetPassword = async () => {
        if (!otp || otp.length !== 6) {
            setOtpError(true);
            setOtpErrorMessage('Please Enter a valid 6 digit OTP.');
            return;
        }
        if (!newPassword || newPassword.length < 12) {
            setPasswordError(true);
            setPasswordErrorMessage("Passwword must be at least 12 characters long.");
            return;
        }
        try {
            const response = await Axios.post('/users/reset-password', { email, otp, newPassword});
            console.log(response.data)
            setStep(0); // Reset to email step
            setTimeout(() => {
                navigate('/login')
            }, 2000);
        } catch (error) {
            console.error("Error resseting password: ", error.response?.data || error.message)
        }
    }

    return(
        <section>
            <Container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: "space-evenly", m: 10 }} >
                <Card variant='outlined' elevation={0} sx={{ m: 2, boxShadow: 3, borderColor: 'primary.main' }}>
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: '2rem', m:2 }}
                    >
                       Forgot Password
                    </Typography>
                    <Stepper activeStep={step} alternativeLabel>
                        {step.map((label, index) => (
                            <Step key={index}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Typography component='p' variant='body1' sx={{ m:2 }} >
                        {step === 0
                            ? "Enter your email address and we will send you a link to reset your password."
                            : "Enter the OTP sent to your email address."
                        }
                    </Typography>
                    <Grid2
                        container spacing={1}
                        component="form"
                        onSubmit={(e) => e.preventDefault()}
                        sx={{ display: '100%', flexDirection: 'column', gap: 1, boxShadow: 2 }}
                    >
                        <Collapse in={step === 0} timeout={500}>
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
                        </Collapse>
                        
                        <Collapse in={step === 1} timeout={500}>
                        
                            <Grid2 size={10} sx={{ m: 2 }}>
                                <TextField
                                    label='OTP'
                                    type='text'
                                    name='otp'
                                    required
                                    fullWidth
                                    id='otp'
                                    placeholder="Enter 6-digit OTP"
                                    variant='outlined'
                                    error={otpError}
                                    helperText={otpErrorMessage}
                                    color={otpError ? 'error' : 'primary'}
                                    onChange={(event) => setOtp(event.target.value)}
                                    value={otp}
                                />
                            </Grid2>
                            <Grid2 size={10} sx={{ m: 2 }}>
                                <TextField
                                    label='New Password'
                                    type='password'
                                    name='newPassword'
                                    required
                                    fullWidth
                                    id='newPassword'
                                    placeholder="Enter new password"
                                    variant='outlined'
                                    error={passwordError}
                                    helperText={passwordErrorMessage}
                                    color={passwordError ? 'error' : 'primary'}
                                    onChange={(event) => setNewPassword(event.target.value)}
                                    value={newPassword}
                                />
                            </Grid2>
                        </Collapse>
                        
                        <Divider />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            onClick={step === 0 ? handleRequestOtp : handleResetPassword}
                        >
                            {step === 0 ? "Request OTP" : "Reset Password"}
                        </Button>
                    </Grid2>
                </Card>
            </Container>
        </section>
    );
}