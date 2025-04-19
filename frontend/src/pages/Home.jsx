import Hero from "../components/views/Hero";
import ContactUs from "../components/views/ContactUs"
import { Divider, Box } from "@mui/material";
import Features from "../components/views/Features";

export default function Home() {

    return (
        <section className='hero'>
            <Box sx={{ bgcolor: "background.default", color: "text.primary", minHeight: "100vh" }}>
                <Hero/>
                <Divider sx={{ my: 8 }}/>
                <Features/>
                <Divider sx={{ my: 8 }}/>
                <ContactUs/>
            </Box>
        </section>
    )
}