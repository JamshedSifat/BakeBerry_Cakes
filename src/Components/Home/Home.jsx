// src/components/Home/Home.jsx
import React from 'react';
import Banner from '../Banner/Banner';
import Menu from '../Menu/Menu';
import SpecialOffers from '../SpecialOffers/SpecialOffers';
import About from '../About/About';
import Contact from '../Contact/Contact';


const Home = () => {
    return (
        <div>
            <section id="home">
                <Banner />
            </section>
            
            <section id="products">
                <Menu />
            </section>
            
            <section id="offers">
                <SpecialOffers />
            </section>

            <section id="about">
                <About />
            </section> 
            
            <section id="contact">
                <Contact />
            </section> 
        </div>
    );
};

export default Home;