import { Box, Container, TextField, Button, Avatar, Grid2 } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import  AuthContext from '../context/AuthContext';
import Axios from 'axios';
import { Alert, Snackbar } from '@mui/material';

export default function UserProfile() {
    const [ isEditing, setIsEditing ] = useState(false);
    const { isAuthenticated, user, setUser } = useContext(AuthContext);
    const [ message, setMessage ] = useState(null);
    const [ openSB, setOpenSB ] = useState(false);
    const navigate = useNavigate();
    // const [user, setUser] = useState({
    //     username: "Username",
    //     email: "user@example.com",
    //     firstName: "John",
    //     lastName: "Doe",
    //     dateOfBirth: "1990-01-01",
    //     phoneNumber: "123-456-7890",
    //     address: {
    //         street: "123 Main St",
    //         city: "City",
    //         postalCode: "12345",
    //         country: "Country"
    //     },
    //     social: {
    //         "Platform" : "handle",
    //     },
    //     bio: "This is a short bio about the user.",
    //     avatarUrl: ""
    // });

    useEffect(() => {
        // Redirect if not authorized
        if (!isAuthenticated) {
            navigate('login');
        }
    }, [isAuthenticated, navigate])

    const handleChange = (event) => {
        const { name, value } = event.target;
        const nestedName = name.split('.');
        if (nestedName.length === 2) {
            setUser((prevUser) => ({
                ...prevUser,
                [nestedName[0]]: {
                    [nestedName[1]]: value,
                },
            }));
        } else {
            setUser((prevUser) => ({
                ...prevUser,
                [name]: value
            }));
        }
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUser((prevUser) => ({
                    ...prevUser,
                    avatarUrl: reader.result,
                    avatar: file,
                }));
            }
            reader.readAsDataURL(file);
        }
    }

    const handleEditToggle = () => {
        setIsEditing((prevIsEditing) => !prevIsEditing);
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            Object.keys(user).forEach(key => {
                if ( key === 'address' || key === 'social') {
                    formData.append(key, JSON.stringify(user[key]));
                } else {
                    formData.append(key, user[key]);
                }
            });
            if (user.avatar) {
                formData.append('avatar', user.avatar);
            }

            await Axios.put("http://localhost:5000/users/profile", formData, { withCredentials: true });
            setMessage("Profile successfully updated");
            setOpenSB(true);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to save user data: ", error);
            setMessage("Registration Failed!")
            setOpenSB(true);
        }
    };

    const handleSBClose = (event, reason) => {
        if (reason === 'clickaway'){
            return; 
        }
        setOpenSB(false)
    }

    return (
        <section>
            { message && (
                <Snackbar open={openSB} autoHideDuration={6000} onClose={handleSBClose}>
                    <Alert
                        onClose={handleSBClose}
                        severity={message === "Profile successfully updated" ? 'success' : 'error'}
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {message}
                    </Alert>
                </Snackbar>
            )}
            <Container  maxWidth='md' sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m:2 ,mb: 3, boxShadow: 3, bgcolor: 'whitesmoke', borderRadius: 1}}>
                    <Avatar src={user.avatarUrl || ""} sx={{ width: 100, height: 100, m: 2, boxShadow: 2 }} />
                    <input 
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="avatar-upload"
                        type="file"
                        onChange={handleAvatarChange}
                    />
                    <label htmlFor="avatar-upload">
                        <Button variant="contained" component="span" fullWidth>
                            Change Profile Picture
                        </Button>
                    </label>
                    <Grid2 container columnSpacing={{xs: 1, sm: 1, md: 3}} justifyContent={'space-evenly'} sx={{gap: 3}}>
                        <Grid2 size={5}>
                            <TextField
                                label="First Name"
                                name="firstName"
                                value={user.firstName}
                                onChange={handleChange}
                                fullWidth
                                disabled={!isEditing}
                            />
                        </Grid2>
                        <Grid2 size={5}>
                            <TextField
                                label="Last Name"
                                name="lastName"
                                value={user.lastName}
                                onChange={handleChange}
                                fullWidth
                                disabled={!isEditing}
                            />
                        </Grid2>
                        <Grid2 size={5}>
                            <TextField
                                label="Username"
                                name="username"
                                value={user.username}
                                onChange={handleChange}
                                fullWidth
                                disabled={!isEditing}
                            />
                        </Grid2>
                        <Grid2 size={5}>
                            <TextField
                                label="Email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                fullWidth
                                disabled={!isEditing}
                            />
                        </Grid2>
                        <Grid2 size={5}>
                            <TextField
                                label="Date of Birth"
                                name="dateOfBirth"
                                type="date"
                                value={user.dateOfBirth}
                                onChange={handleChange}
                                fullWidth
                                disabled={!isEditing}
                            />
                        </Grid2>
                        <Grid2 size={5}>
                            <TextField
                                label="Phone Number"
                                name="phoneNumber"
                                value={user.phoneNumber}
                                onChange={handleChange}
                                fullWidth
                                disabled={!isEditing}
                            />
                        </Grid2>
                        <Grid2 size={5}>
                            <TextField
                                label="Street Address"
                                name="address.street"
                                value={user.address.street}
                                onChange={handleChange}
                                fullWidth
                                disabled={!isEditing}
                            />
                        </Grid2>
                        <Grid2  size={5}>
                            <TextField
                                label="City"
                                name="address.city"
                                value={user.address.city}
                                onChange={handleChange}
                                fullWidth
                                disabled={!isEditing}
                            />
                        </Grid2>
                        <Grid2 size={5}>
                            <TextField
                                label="Postal Code"
                                name="address.postalCode"
                                value={user.address.postalCode}
                                onChange={handleChange}
                                fullWidth
                                disabled={!isEditing}
                            />
                        </Grid2>
                        <Grid2 size={5}>
                            <TextField
                                label="Country"
                                name="address.country"
                                value={user.address.country}
                                onChange={handleChange}
                                fullWidth
                                disabled={!isEditing}
                            />
                        </Grid2>
                        <Grid2 size={6}>
                            <TextField
                                label="Bio"
                                name="bio"
                                value={user.bio}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={5}
                                disabled={!isEditing}
                            />
                        </Grid2>
                        <Grid2 size={12} justifyContent='center'>
                            {/* Social Media fields  */}
                        </Grid2>
                    </Grid2>  
                    {isEditing? (
                        <Button variant="contained" onClick={handleSave} sx={{ my: 2 }}>
                            Save
                        </Button>
                    ):(
                        <Button variant="outlined" onClick={handleEditToggle} sx={{ my: 2 }}>
                            Edit Profile
                        </Button>
                    )}
                </Box>
            </Container>
        </section>
    );
}