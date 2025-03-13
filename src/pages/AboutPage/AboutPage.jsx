import React from 'react';
import './AboutPage.scss';
import PhotoPageHeader from '../../components/PhotoPageHeader/PhotoPageHeader';
import Footer from '../../components/Footer/Footer';
import BlurbSection from '../../components/Blurb/BlurbSection';
import CafeGenerator from '../../components/CafeGenerator/CafeGenerator';
import profileImage from '../../assets/images/mimtainsevilla.jpg';

export default function AboutPage() {
  return (
    <>
      <PhotoPageHeader />
      <div className="about-page">
        <header className="about-header">
          <h1>About the Website Developer 👩🏻‍💻</h1>
          <p>Welcome to my world of coffee.</p>
        </header>
        <section className="about-content">
          <div className="about-image">
            <img src={profileImage} alt="About Me" />
          </div>
          <div className="about-text">
            <p>
            Hey there! I’m Mimta – your friendly, coffee-obsessed explorer in Toronto. As a self-proclaimed coffee connoisseur, I’ve spent countless hours researching the best cafes in this vibrant city. And let’s be honest, it’s a journey in itself to find the perfect cup of joe!
            </p>
            <p> 
            After a lot of Googling, hopping from one café to the next, and a fair amount of trial and error, I decided to create <strong>6ixcafes</strong>.
            This platform is my love letter to coffee lovers, tourists, locals, and especially students who just want to find a cozy spot to sip, study, or simply escape the hustle of Toronto.
            </p>
            <p>
            When I’m not curating the best cafés, you can find me trying out new cuisines (because why not add food to the mix?), traveling to new places, or creating stunning wedding content. I hope 6ixcafes can bring a little joy and a lot of caffeine to your day!
            </p>
          </div>
        </section>
      </div>
      <BlurbSection />
      <CafeGenerator />
      <Footer />
    </>
  );
}