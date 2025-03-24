import React, { useState, useEffect } from "react";
import LikeOutlineIcon from "../../assets/images/Like_Outline.svg";
import LikeFilledIcon from "../../assets/images/Like_Filled.svg";
import RatingSlider from "../RatingSlider/RatingSlider";
import "./PhotoDetails.scss";
import { useNavigate } from "react-router-dom"; // Add this import

function PhotoDetails({ photo }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate(); // Add navigation hook

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(photo.id));
  }, [photo.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav !== photo.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      favorites.push(photo.id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  // Function to handle location click and navigate to LocationsPage
  const handleLocationClick = (photoId) => {
    navigate(`/locations?cafeId=${photoId}`);
  };

  return (
    <div className="photo-details">
      <div className="photo-details__content">
        <img
          src={photo.photo}
          alt={photo.photoDescription}
          className="photo-details__image"
        />
        <div className="photo-details__tags">
          {photo.tags.map((tag, index) => (
            <span key={index} className="photo-details__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="photo-details__details">
        <div className="photo-details__info">
          <p
            className="photo-details__likes"
            onClick={toggleFavorite} // Move click handler to p
            style={{ cursor: "pointer" }} // Apply cursor to whole element
          >
            <img
              src={isFavorite ? LikeFilledIcon : LikeOutlineIcon}
              alt={isFavorite ? "Remove from favorites" : "Add to favorites"}
              className={`photo-details__favorite-icon ${
                isFavorite ? "favorited" : ""
              }`}
            />
            <span className="photo-details__favorite-text">
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </span>
          </p>
          <div className="photo-details__context">
          <p className="photo-details__photographer">{photo.photographer}</p>
          <p
            className="photo-details__location" // Changed class name to avoid confusion with likes
            onClick={() => handleLocationClick(photo.id)}
            style={{ cursor: "pointer" }}
          >
            {photo.likes}
          </p>
          <p className="photo-details__rating">⭐️ {photo.googleRating} / 5</p>
          </div>
        </div>
        <p className="photo-details__description">{photo.photoDescription}</p>
        <div className="photo-details__footer">
          <p className="photo-details__favourites">{photo.cafeFavourites}</p>
          <RatingSlider photoId={photo.id} />
        </div>
      </div>
    </div>
  );
}

export default PhotoDetails;
