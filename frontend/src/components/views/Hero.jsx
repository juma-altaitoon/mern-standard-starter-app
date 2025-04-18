import { Container, Typography, Box, Grid2, Card, CardMedia, Button } from '@mui/material';

export default function Hero () {
  return (
    <section className="hero" style={{ backgroundColor: 'linear-gradient(to bottom, #1e3c72, #2a5298)', color: 'white' }}>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Grid2 container spacing={2}>
          <Grid2 xs={12} md={6}>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                height: { xs: 'auto', md: '100%'},
                textAlign: { xs: 'center', md: 'left'} 
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: 'whitesmoke', position: { xs: 'static', md : 'absolute' }, top:'20px', left:'40px', boxShadow: 3 }} >
                Welcome to the Starter App
              </Typography>
              <Button 
                aria-label="Get Started"
                variant="contained" 
                color="primary" 
                sx={{ mt: 2, alignSelf: { xs: 'center', md: 'flex-start' } }}
              >
                Get Started
              </Button>
            </Box>
          </Grid2>
          <Grid2 xs={12} md={6}>
            <Card sx={{ display: 'flex', boxShadow: 3, maxHeight: '80vh' }} elevation={3} > 
              <CardMedia
                component="img"
                sx={{ height: { xs: '50vh', md:'100%' }, width: '100%', objectFit: 'cover', borderRadius: '8px' }}
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
