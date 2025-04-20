import Hero from "../components/views/Hero";
import ContactUs from "../components/views/ContactUs"
import { Divider } from "@mui/material";
import Features from "../components/views/Features";

export default function Home() {

    return (
        <section >
            <Hero/>
            <Divider sx={{ my: 8 }}/>
            <Features/>
            <Divider sx={{ my: 8 }}/>
            <ContactUs/>
        </section>
    )
}