import { Container, Typography, Box, Grid2, Card, CardMedia, Button } from '@mui/material';

export default function Hero () {
  return (
    <section className="hero" style={{ background: 'linear-gradient(to bottom, #1e3c72, #2a5298)', color: 'white' }}>
      <Container maxWidth="lg" sx={{ display: 'flex', flexWrap: 'nowrap', minHeight: '100vh', justifyContent: 'center', alignItems:'center'}}>
        <Grid2 container spacing={4} alignItems='center' display='flex' flexWrap='nowrap' >
          <Grid2 item xs={12} md={6} >
          <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'space-between',
                alignItems: { xs: 'center', md: 'center' },
                textAlign: { xs: 'center', md: 'left' },
                gap: 4,
              }}
            >
              <Typography 
                variant="h3" 
                gutterBottom 
                sx={{ 
                  color: 'whitesmoke', 
                  boxShadow: 3, 
                  fontWeight: 'bold', 
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5' 
                }} 
              >
                Welcome to the Starter App
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: 'whitesmoke',
                  fontSize: '1.2rem',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                }}
              >
                Build modern web applications with ease. Start your journey today and explore the
                endless possibilities.
              </Typography>
              <Button
                aria-label="Get Started"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  mt: 2,
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: '50px',
                  textTransform: 'none',
                }}
              >
                Get Started
              </Button>
            </Box>
          </Grid2>
          <Grid2 item xs={12} md={6}>
            <Card sx={{ display: 'flex', boxShadow: 4, borderRadius: '16px', overflow: 'hidden' }} elevation={3} > 
              <CardMedia
                component="img"
                sx={{ height: { xs: '50vh', md:'100%' }, width: '100%', objectFit: 'cover' }}
                image='/Hero_Image.jpg'
                alt="Hero section showcasing Web App Solutions"
                loading="lazy"
              />
            </Card>
          </Grid2>  
        </Grid2>
      </Container>
    </section>
  );
};
