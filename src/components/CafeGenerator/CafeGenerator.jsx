import React, { useEffect, useState } from "react";
import LocationIcon from "../../assets/images/Location.svg";
import axios from "axios";
import "./CafeGenerator.scss";
import { Link, useNavigate } from "react-router-dom";

function CafeGenerator() {
  const [cafe, setCafe] = useState(null);
  const navigate = useNavigate(); // Add navigation hook

  useEffect(() => {
    async function fetchCafe() {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/photos`
      );
      const randomCafe =
        response.data[Math.floor(Math.random() * response.data.length)];
      setCafe(randomCafe);
    }

    fetchCafe();
  }, []);

  // Function to handle location click and navigate to LocationsPage
  const handleLocationClick = (cafeId) => {
    navigate(`/locations?cafeId=${cafeId}`); // Navigate with cafeId as query param
  };

  if (!cafe) return <div>Loading...</div>;

  return (
    <div className="cafe__container">
      <h2 className="cafe__container-heading">
        Mimta's Recommended Cafe of the Day ☕️!
      </h2>
      <div className="random-cafe">
        <div className="random-cafe__content">
          <Link to={`/photos/${cafe.id}`} className="cafe-link">
            <img
              src={cafe.photo}
              alt={cafe.name}
              className="random-cafe-image"
            />
          </Link>
          <div className="random-cafe__tags">
            {cafe.tags.map((tag, index) => (
              <span key={index} className="random-cafe__tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="random-cafe__details">
          <div className="random-cafe__info">
            <p
              className="random-cafe__likes"
              onClick={() => handleLocationClick(cafe.id)} // Add click handler
              style={{ cursor: "pointer" }} // Add pointer cursor for better UX
            >
              <img
                src={LocationIcon}
                alt="Location"
                className="random-cafe__like-icon"
              />
              {cafe.likes}
            </p>
            <p className="random-cafe__name">{cafe.photographer}</p>
            <p className="random-cafe__rating">⭐️ {cafe.googleRating} / 5</p>
          </div>
          <p className="random-cafe__description">{cafe.photoDescription}</p>
          <p className="random-cafe__location">{cafe.cafeFavourites}</p>
        </div>
      </div>
    </div>
  );
}

export default CafeGenerator;