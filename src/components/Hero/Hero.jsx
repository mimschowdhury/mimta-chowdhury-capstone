import "./Hero.scss";
import heroImage from "../../assets/images/cafe2.jpg"; // Adjust the path to your image

function Hero({ isIntroActive }) {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        zIndex: isIntroActive ? 0 : "auto",
      }}
    >
      <div className="hero__overlay"></div>
      <div className="hero__text">
        <h4
          className={`hero__title ${
            !isIntroActive ? "slide-in-from-left" : ""
          }`}
        >
          Our mission:
        </h4>
        <p
          className={`hero__content ${
            !isIntroActive ? "slide-in-from-right" : ""
          }`}
        >
          Find Toronto’s Best Cafes —{" "}
          <span className="hero__content-italics">all in one place</span>.
        </p>
      </div>
    </section>
  );
}

export default Hero;
