import { Container, Typography, Link, Box, Grid2 } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import PinterestIcon from '@mui/icons-material/Pinterest';


export default function Footer(){

    return(
        <Box component='footer' sx={{ position: 'fixed', py: 3, bgcolor: 'grey', bottom:0, left:0, maxHeight: '10%', width: '100%' }} >
            <Container maxWidth='lg'>
                <Grid2 container spacing={2} justifyContent='space-between'>
                    <Grid2  xs={12} md={4}>
                        <Typography variant="body2" align="left">
                            @ {new Date().getFullYear()}. All rights reserved.
                        </Typography>
                    </Grid2>
                    <Grid2 xs={12} md={4}>
                        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                            <Link to='/about' color="inherit" sx={{ mx: 1 }} >About</Link>
                            <Link to='#' color="inherit" sx={{ mx: 1 }} >Contact</Link>
                            <Link to='#' color="inherit" sx={{ mx: 1 }} >Privacy</Link>
                        </Box>
                    </Grid2>
                    <Grid2 xs={12} md={4}>
                        <Typography variant="body2" align="right">
                            Follow :
                            <Link to='#' color="inherit" sx={{ ml: 1 }}><FacebookIcon/></Link>
                            <Link to='#' color="inherit" sx={{ ml: 1 }}><InstagramIcon/></Link>
                            <Link to='#' color="inherit" sx={{ ml: 1 }}>< LinkedInIcon /></Link>
                            <Link to='#' color="inherit" sx={{ ml: 1 }}><XIcon/></Link>
                            <Link to='#' color="inherit" sx={{ ml: 1 }}><PinterestIcon /></Link>

                        </Typography>
                    </Grid2>
                </Grid2>
            </Container>
        </Box>
    )
}