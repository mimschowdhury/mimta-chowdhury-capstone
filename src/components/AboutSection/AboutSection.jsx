import React from "react";
import "./AboutSection.scss";

function AboutSection() {
  return (
    <section className="about-section">
      <div className="features-container">
        <div className="feature-box">
          <div className="icon-container purple">
            <i className="fas fa-check"></i>
          </div>
          <h3 className="feature-title">Filter Cafes in Toronto</h3>
          <p className="feature-description">
            Users can filter cafes by different categories like ambiance, study
            spots, yummy baked goods and coffee quality.
          </p>
        </div>
        <div className="feature-box">
          <div className="icon-container blue">
            <i className="fas fa-map-marker-alt"></i>
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
          <div className="icon-container green">
            <i className="fas fa-star"></i>
          </div>
          <h3 className="feature-title">Cafe Profiles</h3>
          <p className="feature-description">
            Each cafe has a dedicated profile page with essential details like
            its address, hours of operation and a short description of its vibe
            or theme. This would give users the info they need to decide which
            cafe best fits their needs without relying on reviews or ratings.
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

      <div className="illustration-container">
        <div className="blue-shape" />
        <div className="blue-shape" />
      </div>
    </section>
  );
};

export default AboutSection;
