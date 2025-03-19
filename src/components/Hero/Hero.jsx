import "./Hero.scss";
import heroImage from "../../assets/images/cafe2.jpg"; // Adjust the path to your image

function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover' }}
    >
      <div className="hero__overlay"></div>
      <div className="hero__text">
        <h4 className="hero__title slide-in-from-left">Our mission:</h4>
        <p className="hero__content slide-in-from-right">
          Find Toronto’s Best Cafes —{" "}
          <span className="hero__content-italics">all in one place</span>.
        </p>
        {/* Add subtitle if you want it animated too */}
        {/* <p className="hero__subtitle slide-in-from-left">Your subtitle here</p> */}
      </div>
    </section>
  );
}

export default Hero;
