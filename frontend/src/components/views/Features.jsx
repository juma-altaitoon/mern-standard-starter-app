import { Box, Grid2, Typography } from '@mui/material';

export default function Features(){

    return(
        <>
            <Box sx={{ py: 8, px: 4, textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>
                    Why Choose Us?
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
                Discover the features that make our platform stand out.
                </Typography>
                <Grid2 container spacing={4} justifyContent="center">
                    <Grid2 item xs={12} sm={6} md={4}>
                        <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
                            <Typography variant="h6" gutterBottom>
                                Feature 1
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                A brief description of the feature that highlights its benefits.
                            </Typography>
                        </Box>
                    </Grid2>
                    <Grid2 item xs={12} sm={6} md={4}>
                        <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
                            <Typography variant="h6" gutterBottom>
                                Feature 2
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                A brief description of the feature that highlights its benefits.
                            </Typography>
                        </Box>
                    </Grid2>
                    <Grid2 item xs={12} sm={6} md={4}>
                        <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
                            <Typography variant="h6" gutterBottom>
                                Feature 3
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                A brief description of the feature that highlights its benefits.
                            </Typography>
                        </Box>
                    </Grid2>
                </Grid2>
            </Box>
        </>
    )
}