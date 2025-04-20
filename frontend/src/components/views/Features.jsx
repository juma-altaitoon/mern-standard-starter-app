import { Box, Grid2 as Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';

export default function Features() {
  return (
    <Box sx={{ py: 8, px: 4, textAlign: 'center', minHeight: '80vh' }}>
      <Typography variant="h4" gutterBottom>
        Why Choose Us?
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        Discover the features that make our platform stand out.
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {/* Feature 1 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardMedia
              component="img"
              height="200"
              image="/feature 1.png" // Replace with your image path
              alt="Feature 1"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Feature 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A brief description of the feature that highlights its benefits.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Feature 2 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardMedia
              component="img"
              height="200"
              image="/feature 2.png" // Replace with your image path
              alt="Feature 2"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Feature 2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A brief description of the feature that highlights its benefits.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Feature 3 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardMedia
              component="img"
              height="200"
              image="/Feature 3.png" // Replace with your image path
              alt="Feature 3"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Feature 3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A brief description of the feature that highlights its benefits.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}