import Hero from "../components/views/Hero";
import ContactUs from "../components/views/ContactUs"
import { Divider } from "@mui/material";

export default function Home() {

    return (
        <section className='hero'>
            <Hero/>
            <Divider/>
            <ContactUs/>
        </section>
    )
}