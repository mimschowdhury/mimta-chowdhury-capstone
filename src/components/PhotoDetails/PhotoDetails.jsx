import React from "react";
import LikeIcon from "../../assets/images/Like_Outline.svg";
import "./PhotoDetails.scss";

function PhotoDetails({ photo }) {
    return (
        <div className="photo-details">
            <div className="photo-details__content">
                <img src={photo.photo} alt={photo.photoDescription} />
            </div>
            <div className="photo-details__details">
                <div className="photo-details__tags">
                    {photo.tags.map((tag, index) => (
                        <span key={index} className="photo-details__tag">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="photo-details__info">
                    <p className="photo-details__likes">
                        <img src={LikeIcon} alt="Like" className="photo-details__like-icon" />
                        {photo.likes} Likes
                    </p>
                    <p className="photo-details__photographer">{photo.photographer}</p>
                    <p className="photo-details__rating">⭐️ {photo.googleRating} / 5</p>
                </div>
                    <p className="photo-details__description">{photo.photoDescription}</p>
                    <p className="photo-details__favourites">{photo.cafeFavourites}</p>
            </div>
        </div>
    );
}

export default PhotoDetails;