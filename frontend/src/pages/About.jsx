import { Container, Typography, Box, Grid2 as Grid, Divider, Skeleton} from '@mui/material';


export default function About() {
    const appName = "Starter App"
    return (
        <section className="hero">
            <Container maxWidth="md" rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mt: 4 }}>
                <Grid container>
                    <Grid item size={6}>
                        {/* <imgsrc='' alt='About Us' width='100&' /> */}
                        <Skeleton animation='wave' variant='rectangular' width='90%' height='100%'></Skeleton>
                    </Grid>
                    <Grid item size={6}>
                        <Box>
                            <Typography variant="h4" component="h1" gutterBottom>
                            About Us
                            </Typography>
                            <Typography variant="body1" sx={{ textAlign: 'justify'}}>
                            Welcome to <em>{appName}</em>! We are a team of passionate developers dedicated to creating innovative solutions that empower users and streamline processes. Our mission is to provide a seamless and intuitive experience that enhances productivity and fosters collaboration.
                            </Typography>
                        </Box>
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h5" gutterBottom>
                            Our Values
                            </Typography>
                            <Typography variant="body2" sx={{ textAlign: 'justify'}}>
                            We are guided by the principles of innovation, integrity, and user-centricity. We believe in building strong relationships with our users by providing exceptional support and fostering a culture of transparency and open communication.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container  spacing={3} sx={{ mt: 4 }}>
                    <Grid item size={6} xs={12} md={6}>
                        <Box>
                            <Typography variant="h5" gutterBottom>
                            Our Team
                            </Typography>
                            <Typography variant="body1" sx={{ textAlign: 'justify'}}>
                            Our team is composed of talented individuals with diverse backgrounds and expertise. We are united by a shared passion for technology and a commitment to delivering high-quality solutions. Our collaborative approach and dedication to excellence drive us to continually improve and innovate.
                            </Typography>
                            {/* Team member profiles here */}
                        </Box>
                    </Grid>
                    <Grid item size={6} xs={12} md={6}>
                        <Box>
                            <Typography variant="h5" gutterBottom>
                            Technology Stack
                            </Typography>
                            <Typography variant="body1" sx={{ textAlign: 'justify'}}>
                            We utilize the MERN stack (MongoDB, Express.js, React.js, Node.js) to build robust and scalable web applications. This technology stack allows us to create dynamic and responsive user interfaces while ensuring efficient data management and seamless backend integration.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Divider/>
                <Grid container spacing={3} sx={{ justifyContent:'center', my: 10 }}>
                    <Grid item size={6} xs={12}>
                        <Box>
                            <Typography variant="h5" gutterBottom>
                            Contact Us
                            </Typography>
                            <Typography variant="body1" sx={{ textAlign: 'justify'}}>
                            We welcome your feedback and inquiries. Please feel free to contact us at [email address] or through our contact form.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </section>
    )
}