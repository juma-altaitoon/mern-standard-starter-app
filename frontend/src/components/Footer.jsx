import { Container, Typography, Box, Grid2 } from "@mui/material";
import { Link } from "react-router-dom";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import PinterestIcon from '@mui/icons-material/Pinterest';


export default function Footer(){

    return(
        <Box component='footer' sx={{ py: 3, bgcolor: 'grey.800', color:'white', width: '100%' }} >
            <Container maxWidth='lg' sx={{ py: 2 }}>
                <Grid2 container spacing={2} justifyContent='space-between'>
                    <Grid2  xs={12} md={4}>
                        <Typography variant="body1" align="left">
                            @ {new Date().getFullYear()}. All rights reserved.
                        </Typography>
                    </Grid2>
                    <Grid2 xs={12} md={4}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2}}>
                            <Link to='/about' color="inherit" sx={{ mx: 1 }} >About</Link>
                            <Link to='#' color="inherit" sx={{ mx: 1 }} >Contact</Link>
                            <Link to='#' color="inherit" sx={{ mx: 1 }} >Privacy</Link>
                        </Box>
                    </Grid2>
                    <Grid2 xs={12} md={4}>
                        <Typography variant="body1" align="right">
                            Follow :
                            <Link href='#' color="inherit" sx={{ ml: 1 }} aria-label="Facebook" ><FacebookIcon /></Link>
                            <Link href='#' color="inherit" sx={{ ml: 1 }} aria-label="Instagram" ><InstagramIcon /></Link>
                            <Link href='#' color="inherit" sx={{ ml: 1 }} aria-label="LinkedIn" ><LinkedInIcon /></Link>
                            <Link href='#' color="inherit" sx={{ ml: 1 }} aria-label="X (formerly Twitter)" ><XIcon /></Link>
                            <Link href='#' color="inherit" sx={{ ml: 1 }} aria-label="Pinterest" ><PinterestIcon /></Link>
                        </Typography>
                    </Grid2>
                </Grid2>
            </Container>
        </Box>
    )
}