import "./Hero.scss";
import heroImage from "../../assets/images/cafe2.jpg"; // Adjust the path to your image

function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover' }}
    >
        <div className="hero__text">
          <h4 className="hero__title">Our mission:</h4>
          <p className="hero__content">
            Find Toronto’s Best Cafes — <span className="hero__content-italics">all in one place</span>.
          </p>
        </div>
      <div className="hero__overlay"></div>
    </section>
  );
}

export default Hero;