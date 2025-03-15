import { Container, Typography, Box, Grid2, Card, CardMedia } from '@mui/material';

export default function Hero () {
  return (
    <section className="hero">
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Grid2 container spacing={2}>
          <Grid2 xs={12} md={6}>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                height: '100%' 
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: 'whitesmoke', position: 'absolute', top:'20px', left:'40px', boxShadow: 3 }} >
                Welcome to the Starter App
              </Typography>
              {/* Add a call to action button here (e.g., "Get Started", "Learn More") */}
            </Box>
          </Grid2>
          <Grid2 xs={12} md={6}>
            <Card sx={{ display: 'flex', boxShadow: 3, maxHeight: '80vh' }} elevation={3} > 
              <CardMedia
                component="img"
                sx={{ width: '100%', objectFit: 'cover' }}
                image='/Hero_Image.jpg'
                alt="Web App Solutions"
              />
            </Card>
          </Grid2>
        </Grid2>
      </Container>
    </section>
  );
};
