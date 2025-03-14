import React, { useEffect, useState } from 'react';
import LocationIcon from "../../assets/images/Location.svg";
import axios from 'axios';
import './CafeGenerator.scss';

function CafeGenerator() {
    const [cafe, setCafe] = useState(null);

    useEffect(() => {
        async function fetchCafe() {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/photos`);
            const randomCafe = response.data[Math.floor(Math.random() * response.data.length)];
            setCafe(randomCafe);
        }

        fetchCafe();
    }, []);

    if (!cafe) return <div>Loading...</div>;

    return (
        <div className="cafe__container">
            <h2 className="cafe__container-heading">Mimta's Recommended Cafe of the Day ☕️!</h2>
        <div className="random-cafe">
            <div className="random-cafe__content">
                <img src={cafe.photo} alt={cafe.name} />
            </div>
            <div className="random-cafe__details">
                <div className="random-cafe__tags">
                    {cafe.tags.map((tag, index) => (
                        <span key={index} className="random-cafe__tag">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="random-cafe__info">
                    <p className="random-cafe__likes">
                        <img src={LocationIcon} alt="Location" className="random-cafe__like-icon" />
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