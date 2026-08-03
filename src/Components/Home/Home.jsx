import React from 'react';
import Banner from '../Banner/Banner';
import Menu from '../Menu/menu';
import SpecialOffers from '../SpecialOffers/SpecialOffers';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <SpecialOffers></SpecialOffers>
            <Menu></Menu>
        </div>
    );
};

export default Home;