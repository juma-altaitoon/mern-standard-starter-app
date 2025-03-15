import { Box, Container, TextField, Button, Avatar, Grid2 } from "@mui/material";
import { useState } from "react";

export default function UserProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        username: "Username",
        email: "user@example.com",
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: "1990-01-01",
        phoneNumber: "123-456-7890",
        address: {
            street: "123 Main St",
            city: "City",
            postalCode: "12345",
            country: "Country"
        },
        bio: "This is a short bio about the user.",
        avatarUrl: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleEditToggle = () => {
        setIsEditing((prevIsEditing) => !prevIsEditing);
    };

    const handleSave = () => {
        

        setIsEditing(false);
    };

    return (
        <Container  maxWidth='md' sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m:2 ,mb: 3, boxShadow: 3, bgcolor: 'whitesmoke', borderRadius: 1}}>
                <Avatar src={user.avatarUrl} sx={{ width: 100, height: 100, m: 2, boxShadow: 2 }} />
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
    );
}