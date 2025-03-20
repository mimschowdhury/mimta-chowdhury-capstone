import React, { useEffect, useRef } from "react";
import "./BlurbSection.scss";
import coffeeicon from "../../assets/images/coffeeicon.svg";
import locationicon from "../../assets/images/locationicon.svg";
import torontoicon from "../../assets/images/torontoicon.svg";

function BlurbSection() {
  const blurbRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.17,
        // rootMargin: '0px 0px -10% 0px',
      }
    );

    const elements = blurbRef.current.querySelectorAll('.scroll-element');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="blurb" ref={blurbRef}>
      <h2 className="blurb__heading scroll-element">
        How to use 6ixCafes
      </h2>
      <div className="blurb__container">
        <div className="blurb__box scroll-element">
          <div className="blurb__icons">
            <img src={torontoicon} alt="Toronto Icon" className="blurb__image" />
          </div>
          <h3 className="blurb__subtitle">Discover Cafes in Toronto</h3>
          <p className="blurb__description">
            Explore an ever-growing list of Toronto's best cafes. 
            Feel free to favourite the cafe's you love and refer back to them in the Favourites List!
          </p>
        </div>
        <div className="blurb__box scroll-element">
          <div className="blurb__icons">
            <img src={locationicon} alt="Location Icon" className="blurb__image" />
          </div>
          <h3 className="blurb__subtitle">Google Maps Integration</h3>
          <p className="blurb__description">
            Use the Google Maps feature to search cafés by specific neighborhoods 
            or areas around you. Instantly find hidden gems close to home or map out 
            your next coffee adventure anywhere in the city.
          </p>
        </div>
        <div className="blurb__box scroll-element">
          <div className="blurb__icons">
            <img src={coffeeicon} alt="Coffee Icon" className="blurb__image" />
          </div>
          <h3 className="blurb__subtitle">Browse Cafe Profiles</h3>
          <p className="blurb__description">
            Get to know each café before you visit! 
            Every listing includes essential info like location, Google Maps rating, our recommendations and the café’s vibe —
            whether it’s perfect for studying, relaxing, or grabbing a quick espresso. 
            Feel free to submit comments/reviews helping users!
          </p>
        </div>
      </div>

      <h2 className="story__heading scroll-element">
        The story behind 6ixCafes
      </h2>
      <p className="story__description scroll-element">
        Tired of endlessly searching for the perfect café? 6ixcafes makes it simple to discover the best coffee spots in Toronto, whether you’re looking for a cozy study nook, the perfect ambiance, or the ultimate brew. We’ve done the searching so you don’t have to.
        <br />
        <br />
        Curated with intention, 6ixcafes helps you filter and explore cafés based on what matters most to you — no clutter, no reviews, just the essentials.
      </p>
    </section>
  );
}

export default BlurbSection;