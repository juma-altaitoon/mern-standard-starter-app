import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  Card,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  IconButton,
  Grid2,
  Container,
  Avatar,
  MenuItem,
  Select,
  Alert,
  Snackbar,
  LinearProgress,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Axios from 'axios';

export default function Register2() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({});
  const [socialMedia, setSocialMedia] = useState([]);
  const [avatar, setAvatar] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [message, setMessage] = useState(null);
  const [openSB, setOpenSB] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (event) => {
    const user = { ...newUser };
    user[event.target.name] = event.target.value;
    setNewUser(user);

    // Password strength checker
    if (event.target.name === 'password') {
      const strength = calculatePasswordStrength(event.target.value);
      setPasswordStrength(strength);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 12) strength += 1; // Minimum length
    if (/[A-Z]/.test(password)) strength += 1; // Uppercase letter
    if (/[0-9]/.test(password)) strength += 1; // Number
    if (/[@$!%*?&#]/.test(password)) strength += 1; // Special character
    return strength;
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setMessage('Only image files are allowed.');
        setOpenSB(true);
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setMessage('File size must be less than 2MB.');
        setOpenSB(true);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarUrl(reader.result);
        setAvatar(file);
        setNewUser({ ...newUser, avatar: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSocialMediaChange = (index, event) => {
    const updatedSocialMedia = [...socialMedia];
    updatedSocialMedia[index][event.target.name] = event.target.value;
    setSocialMedia(updatedSocialMedia);
    setNewUser({ ...newUser, socialMedia: updatedSocialMedia });
  };

  const addSocialMedia = () => {
    setSocialMedia([...socialMedia, { platform: '', handle: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    Object.keys(newUser).forEach((key) => {
      if (newUser[key]) {
        if (key === 'socialMedia') {
          formData.append(key, JSON.stringify(newUser[key]));
        } else if (key.startsWith('address.')) {
          const addressKey = key.split('.')[1];
          formData.append(`address[${addressKey}]`, newUser[key]);
        } else {
          formData.append(key, newUser[key]);
        }
      }
    });
    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      const res = await Axios.post('http://localhost:5000/users/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Registration response: ', res.data);
      setMessage('Registration Successful');
      setOpenSB(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Registration error: ', error);
      setMessage('Registration Failed!');
      setOpenSB(true);
    }
  };

  const socialMap = socialMedia.map((social, index) => (
    <Grid2 container spacing={2} key={index}>
      <Grid2 item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Platform</InputLabel>
          <Select
            name="platform"
            value={social.platform}
            onChange={(event) => handleSocialMediaChange(index, event)}
          >
            <MenuItem value="Facebook">Facebook</MenuItem>
            <MenuItem value="Twitter">Twitter</MenuItem>
            <MenuItem value="Instagram">Instagram</MenuItem>
            <MenuItem value="LinkedIn">LinkedIn</MenuItem>
          </Select>
        </FormControl>
      </Grid2>
      <Grid2 item xs={6}>
        <TextField
          label="Handle"
          name="handle"
          value={social.handle}
          onChange={(event) => handleSocialMediaChange(index, event)}
          fullWidth
        />
      </Grid2>
    </Grid2>
  ));

  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        {message && (
          <Snackbar open={openSB} autoHideDuration={6000} onClose={() => setOpenSB(false)}>
            <Alert severity={message === 'Registration Successful' ? 'success' : 'error'}>
              {message}
            </Alert>
          </Snackbar>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            fullWidth
            required
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              name="password"
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <LinearProgress
            variant="determinate"
            value={(passwordStrength / 4) * 100}
            sx={{ mb: 2 }}
          />
          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            required
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            required
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            fullWidth
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            fullWidth
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Street Address"
            name="address.street"
            fullWidth
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="City"
            name="address.city"
            fullWidth
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Postal Code"
            name="address.postalCode"
            fullWidth
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Country"
            name="address.country"
            fullWidth
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          {socialMap}
          <Button variant="outlined" onClick={addSocialMedia} fullWidth sx={{ mb: 2 }}>
            Add Social Media
          </Button>
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
              <Avatar src={avatarUrl} sx={{ width: 100, height: 100 }} />
            </Box>
          )}
          <TextField
            label="Bio"
            name="bio"
            fullWidth
            multiline
            rows={4}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth>
            Register
          </Button>
        </form>
      </Card>
    </Container>
  );
}