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
    const [ name, setName ] = useState();
    const [ message, setMessage ] = useState();


    const handleSubmit = (event) => {
        event.preventDefault()

    }

    return(
        <section className='contact-us'>
            <Container spacing={0} sx={{ display: '100%', flexWrap: 'wrap', justifyContent: "space-evenly" }} >
                <Card variant='outlined' elevation={0} sx={{ m: 3, boxShadow: 3, borderColor: 'blue', maxWidth: '80vw' }}>
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: '2rem', m:2 }}
                    >
                        Contact Us
                    </Typography>
                    <Typography component='p' variant='body1' sx={{ m:2 }} >
                        Feel free to get in touch with us.
                    </Typography>
                    <Grid2
                        container spacing={2}
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ display: '100%', flexDirection: 'column', gap: 1, boxShadow: 2 }}
                    >
                        <Grid2 size={11} sx={{display: 'flex', flexDirection: 'row', gap: 1, m: 2}}>    
                            <TextField
                                label='Name'
                                name='name'
                                required
                                fullWidth
                                id='name'
                                placeholder="John Doe"
                                onChange={(event) => setName(event.target.value)}
                                value={name}
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
                                onChange= { (event) => setEmail(event.target.value)}
                                value={email}
                            />
                        </Grid2>
                        <Grid2 size={11} sx={{ m: 2 }}>
                            <TextField
                                label='Message'
                                name='message'
                                type='text'
                                required
                                
                                fullWidth
                                multiline
                                rows={4}
                                placeholder="Write your message here..."
                                onChange={(event) => setMessage(event.target.value)}
                                value={message}
                            />
                        </Grid2>
                        <Divider />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                        >
                            Send Message
                        </Button>
                    </Grid2>
                </Card>
            </Container>
        </section>
    );
}