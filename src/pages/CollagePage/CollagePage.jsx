import React from "react";
import Collage from "../../components/Collage/Collage"; // Import the Collage component
import "./CollagePage.scss"; // Optional: CSS for the page styling
import PhotoPageHeader from "../../components/PhotoPageHeader/PhotoPageHeader";
import Footer from "../../components/Footer/Footer";

const CollagePage = () => {
  return (
    <div className="collage-page">
      <PhotoPageHeader />
      {/* Header Section */}
      <div className="collage__page">
        <header className="collage__page-header">
          <p>Cafe Roulette 🎲</p>
          <div className="collage__page-text">
            <p>
              Feeling adventurous? Spin the wheel of coffee destiny with our
              Random Cafe Generator!
            </p>
            <p>
              Get ready to discover new spots around the city, each one serving
              up their own special brew.
            </p>
            <p>
              Click on any cafe image to be whisked away to find out more about what makes each cafe unique.
            </p>
            <p>
              While you’re here, enjoy some mood-boosting coffee quotes to fuel your day!
            </p>
            <p>
            Let the coffee magic begin! ✨ Keep refreshing for a fresh batch of cafe vibes and inspiration!
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="page-content">
          <Collage />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CollagePage;
