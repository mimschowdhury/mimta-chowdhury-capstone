import React, { useState, useEffect } from "react";
import "./RatingSlider.scss";

function RatingSlider({ photoId }) {
    const [userRating, setUserRating] = useState(null);

    // Load rating from localStorage on mount
    useEffect(() => {
        const ratings = JSON.parse(localStorage.getItem("userRatings")) || {};
        setUserRating(ratings[photoId] || null);
    }, [photoId]);

    // Map rating to emoji
    const getEmoji = (rating) => {
        if (rating <= 1) return "😞";
        if (rating <= 2) return "😐";
        if (rating <= 3) return "🙂";
        if (rating <= 4) return "😊";
        return "😍";
    };

    // Handle slider change
    const handleRatingChange = (e) => {
        const rating = parseInt(e.target.value, 10);
        setUserRating(rating);
        const ratings = JSON.parse(localStorage.getItem("userRatings")) || {};
        ratings[photoId] = rating;
        localStorage.setItem("userRatings", JSON.stringify(ratings));
    };

    // Calculate emoji position
    const emojiPosition = userRating ? ((userRating - 1) / 4) * 100 : 50;

    return (
        <div className="rating-slider-container">
            <div className="slider-wrapper">
                <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={userRating || 3} // Default to 3 if no rating
                    onChange={handleRatingChange}
                    className="rating-slider"
                />
                {userRating && (
                    <span
                        className="emoji"
                        style={{
                            left: `${emojiPosition}%`,
                            transform: "translateX(-50%)",
                        }}
                    >
                        {getEmoji(userRating)}
                    </span>
                )}
            </div>
            <p className="rating-slider-text">
                {userRating ? `Your rating: ${userRating} / 5` : "Slide to rate"}
            </p>
        </div>
    );
}

export default RatingSlider;