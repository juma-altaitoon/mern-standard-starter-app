import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Grid2 from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Alert, Snackbar } from '@mui/material';
import Axios from 'axios'

export default function Register() {
    const navigate = useNavigate();
    const [ newUser, setNewUser ] = useState({});
    const [ emailError, setEmailError ] = useState(false);
    const [ emailErrorMessage, setEmailErrorMessage ] = useState('');
    const [ passwordError, setPasswordError ] = useState(false);
    const [ passwordErrorMessage, setPasswordErrorMessage ] = useState('');
    const [ nameError, setNameError ] = useState(false);
    const [ nameErrorMessage, setNameErrorMessage ] = useState('');
    const [ showPassword, setShowPassword ] = useState(false);
    const [ socialMedia, setSocialMedia ] = useState([]);
    const [ avatar, setAvatar] = useState('');
    const [ avatarUrl, setAvatarUrl ] = useState('');
    const [ message, setMessage ] = useState(null);
    const [ openSB, setOpenSB ] = useState(false);

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
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');

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
        if (!firstName.value || (firstName.value.length < 3) || !lastName.value || (lastName.value.length < 3)) {
            setNameError(true);
            setNameErrorMessage("Name is required");
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }

        return isValid;
    }

    const handleChange = (event) => {
        const user = {...newUser};
        user[event.target.name] = event.target.value;
        setNewUser(user);
        console.log(newUser);
    }

    const handleSocialMediaChange = (index, event) => {
        const newSocialMedia = [...socialMedia];
        newSocialMedia[index][event.target.name] = event.target.value;
        setSocialMedia(newSocialMedia)
        setNewUser({ ...newUser, socialMedia: newSocialMedia });
    }
 
    const addSocialMedia = () => {
        setSocialMedia([ ...socialMedia, { platform: '', handle: ''} ]);
    }

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarUrl(reader.result);
                setAvatar(file);
                setNewUser({ ...newUser, avatar: file });
            }
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (nameError || emailError || passwordError) {
            return;
        }
        console.log(newUser)

        const formData = new FormData();
        Object.keys(newUser).forEach(key => {
            if (key === 'socialMedia') {
                formData.append(key, JSON.stringify(newUser[key]));
            } else {
                formData.append(key, newUser[key]);
            }
        });
        if (avatar) {
            formData.append('avatar', avatar);
        }

        await Axios.post("http://localhost:5000/users/register", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            console.log(res)
            setMessage("Registration Successful");
            setOpenSB(true);
            setTimeout(() => {
                navigate('/login')
            }, 2000);
        }).catch((error) => {
            console.error("Registration Error: ", error);
            setMessage("Registration Failed!")
            setOpenSB(true);
        })

    }

    const handleSBClose = (event, reason) => {
        if (reason === 'clickaway'){
            return; 
        }
        setOpenSB(false)
    }

    const socialMap = socialMedia.map((social, index) => (
        <Grid2 key={index} size={10} sx={{ display: 'flex', flexDirection: 'row', gap: 2, m: 2 }}>
            <FormControl fullWidth>
                <InputLabel id={`social-platform-label-${index}`}>Platform</InputLabel>
                <Select
                    labelId={`social-platform-label-${index}`}
                    id={`social-platform-label-${index}`}
                    name="platform"
                    value={social.platform}
                    onChange={(event) => handleSocialMediaChange(index, event)}
                    label="Platform"
                >
                    <MenuItem value="Facebook">Facebook</MenuItem>
                    <MenuItem value="Twitter">Twitter</MenuItem>
                    <MenuItem value="Instagram">Instagram</MenuItem>
                    <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Handle"
                name="handle"
                fullWidth
                placeholder="Username"
                value={social.handle}
                onChange={(event) => handleSocialMediaChange(index, event)}
            />
        </Grid2>
    ));

    return(
        <Container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: "center", }} >
            <Card variant='outlined' elevation={0} sx={{ m:2, boxShadow: 3, borderColor: 'primary.main' }}>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', m:2, textAlign: 'center' }}
                >
                    Register User
                </Typography>
                { message && (
                    <Snackbar open={openSB} autoHideDuration={6000} onClose={handleSBClose}>
                        <Alert
                            onClose={handleSBClose}
                            severity={message === "Registration Successful" ? 'success' : 'error'}
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {message}
                        </Alert>
                    </Snackbar>
            
                )}
                <Grid2
                    container spacing={1}
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: '100%', flexDirection: 'column', gap: 1, boxShadow: 2 }}
                >
                    <Grid2 size={10} sx={{display: 'flex', flexDirection: 'row', gap: 2, m: 2}}>
                        <TextField
                            label="Username"
                            name="username"
                            onChange={handleChange}
                            fullWidth
                            required
                            variant='outlined'
                        />
                        <TextField
                            label='Email'
                            type='email'
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
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>    
                            <OutlinedInput
                                id="outlined-adornment-password"
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
                        <FormControl variant="outlined" required>
                            <InputLabel htmlFor="outlined-adornment-password1">Confirm Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password1"
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
                                label="Confirm Password"
                                name='passwordCheck'
                                required
                                fullWidth
                                variant='outlined'
                                error={passwordError}
                                helpertext={passwordErrorMessage}
                            />
                        </FormControl>
                    </Grid2>
                    <Grid2 size={10} sx={{display: 'flex', flexDirection: 'row', gap: 2, m: 2}}>    
                        <TextField
                            label='First Name'
                            name='firstName'
                            required
                            fullWidth
                            id='firstName'
                            placeholder="John"
                            error={nameError}
                            helpertext={nameErrorMessage}
                            color={nameError ? 'error' : 'primary'}
                            onChange={handleChange}
                        />
                        <TextField
                            label='Last Name'
                            name='lastName'
                            required
                            fullWidth
                            id='lastName'
                            placeholder="Doe"
                            error={nameError}
                            helpertext={nameErrorMessage}
                            color={nameError ? 'error' : 'primary'}
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={10} sx={{ m: 2 }}>
                        <TextField
                            label='Date of Birth'
                            type='date'
                            name='dateOfBirth'
                            fullWidth
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={10} sx={{ m: 2 }}>
                        <TextField
                            label='Phone Number'
                            type='tel'
                            name='phoneNumber'
                            fullWidth
                            placeholder="123-456-7890"
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={10} sx={{ m: 2 }}>
                        <TextField
                            label='Street Address'
                            name='address.street'
                            fullWidth
                            placeholder="123 Main St"
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={10} sx={{ display: 'flex', flexDirection: 'row', gap: 2, m: 2 }}>
                        <TextField
                            label='City'
                            name='address.city'
                            fullWidth
                            placeholder="City"
                            onChange={handleChange}
                        />
                        <TextField
                            label='Postal Code'
                            name='address.postalCode'
                            fullWidth
                            placeholder="12345"
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={10} sx={{ m: 2 }}>
                        <TextField
                            label='Country'
                            name='address.country'
                            fullWidth
                            placeholder="Country"
                            onChange={handleChange}
                        />
                    </Grid2>
                    {socialMap}
                    <Grid2 size={10} sx={{ m: 2 }}>
                        <Button
                            type='button'
                            fullWidth
                            variant='outlined'
                            onClick={addSocialMedia}
                        >
                            Add Social Media
                        </Button>
                    </Grid2>
                    <Grid2 size={10} sx={{ m: 2 }}>
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="avatar-upload"
                            type="file"
                            onChange={handleAvatarChange}
                        />
                        <label htmlFor="avatar-upload">
                            <Button variant="contained" component="span" fullWidth>
                                Upload Profile Picture
                            </Button>
                        </label>
                        {avatarUrl && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <Avatar Urlsrc={avatar} sx={{ width: 100, height: 100 }} />
                            </Box>
                        )}
                    </Grid2>
                    <Grid2 size={10} sx={{ m: 2 }}>
                        <TextField
                            label='Bio'
                            name='bio'
                            fullWidth
                            multiline
                            rows={4}
                            placeholder="Tell us about yourself"
                            onChange={handleChange}
                        />
                    </Grid2>                
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        onClick={validateInputs}
                    >
                        Register
                    </Button>
                </Grid2>
                <Divider>
                    <Typography sx={{ color: "text.secondary" }}>or</Typography>
                </Divider>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, m:2 }}>
                    <Button
                        fullWidth
                        variant='outlined'
                        onClick={() => alert('SignUp with Google')}
                    >
                        Register with Google
                    </Button>
                    <Button
                        fullWidth
                        variant='outlined'
                        onClick={() => alert('SignUp with Facebook')}
                    >
                        Register with Facebook
                    </Button>
                    <Typography sx={{ textAlign: 'center' }}>
                        Already have an account?{' '}
                        <Link 
                            to="/login"
                            variant="body2"
                            sx={{ alignSelf: 'center' }}
                        >
                            Sign in
                        </Link>
                    </Typography>
                </Box>
            </Card>
        </Container>
    );
}
