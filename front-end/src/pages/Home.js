import React from 'react';
import '../App.css';
import Cards from '../components/Cards';
import Cards2 from '../components/Cards2';
import HeroSection from '../components/HeroSection';
import HeroSection2 from '../components/HeroSection2';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <HeroSection />
      <Cards />

      <HeroSection2 />
      <Cards2 />

      <HeroSection2 />
      <Footer />
    </>
  );
}

export default Home;
