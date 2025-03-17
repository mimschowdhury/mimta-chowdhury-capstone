import React from "react";
import "./AboutSection.scss";
import coffeeicon from "../../assets/images/coffeeicon.svg";
import locationicon from "../../assets/images/locationicon.svg";
import torontoicon from "../../assets/images/torontoicon.svg"

function AboutSection() {
  return (
    <section className="about-section">
      <div className="features-container">
        <div className="feature-box">
          <div className="icon-container">
            <img src ={torontoicon} alt="Toronto Icon" className="icon-image" />
          </div>
          <h3 className="feature-title">Filter Cafes in Toronto</h3>
          <p className="feature-description">
            Users can filter cafes by different categories like ambiance, study
            spots, yummy baked goods and coffee quality.
          </p>
        </div>
        <div className="feature-box">
          <div className="icon-container">
          <img src ={locationicon} alt="Location Icon" className="icon-image" />
          </div>
          <h3 className="feature-title">Google Maps Integration</h3>
          <p className="feature-description">
            With Google Maps integration, users can search for cafes within a
            specific area or near their current location. You could highlight
            each cafe on the map, showing basic details like the cafe's name,
            location, and the filters that match.
          </p>
        </div>
        <div className="feature-box">
          <div className="icon-container">
            <img src ={coffeeicon} alt="Coffee Icon" className="icon-image" />
          </div>
          <h3 className="feature-title">Cafe Profiles</h3>
          <p className="feature-description">
            Each cafe has a dedicated profile page with essential details like
            its address, popular menu items and a short description of its vibe
            or theme. We also encourage users to leave their own reviews as well!
          </p>
        </div>
      </div>

      <h2 className="main-heading">
        The story behind 6ixCafes
      </h2>
      <p className="main-description">
      Tired of endlessly searching for the perfect café? 6ixcafes makes it simple to discover the best coffee spots in Toronto, whether you’re looking for a cozy study nook, the perfect ambiance, or the ultimate brew. We’ve done the searching so you don’t have to.
        <br />
        <br />
        Curated with intention, 6ixcafes helps you filter and explore cafés based on what matters most to you — no clutter, no reviews, just the essentials.
      </p>
    </section>
  );
};

export default AboutSection;
