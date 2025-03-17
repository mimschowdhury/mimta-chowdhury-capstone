import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LocationIcon from "../../assets/images/Location.svg";
import axios from 'axios';
import './CafeOfTheWeek.scss';

function CafeOfTheWeek() {
    const [cafe, setCafe] = useState(null);
    const [weekNumber, setWeekNumber] = useState(null);

    const getWeekNumber = () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        const diff = now - start;
        const oneWeek = 1000 * 60 * 60 * 24 * 7;
        return Math.floor(diff / oneWeek) + 1;
    };

    useEffect(() => {
        setWeekNumber(getWeekNumber());

        async function fetchCafe() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/photos`);
                const cafeIndex = (getWeekNumber() - 1) % response.data.length;
                setCafe(response.data[cafeIndex]);
            } catch (error) {
                console.error('Error fetching cafe:', error);
            }
        }

        fetchCafe();
    }, []);

    if (!cafe) return <div>Loading Cafe of the Week...</div>;

    return (
        <div className="cafe-page-wrapper">
            <div className="cafe-content">
                <div className="cafeweekly__container">
                    <h2 className="cafeweekly__container-heading">
                        Cafe of the Week ☕️
                    </h2>
                    <div className="cafe__weekly">
                        <div className="cafe__weekly__content">
                            <Link to={`/photos/${cafe.id}`} className="cafe-link">
                                <img src={cafe.photo} alt={cafe.name} className="cafe-weekly-image" />
                            </Link>
                            <div className="cafe__weekly__tags">
                                {cafe.tags.map((tag, index) => (
                                    <span key={index} className="cafe__weekly__tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                        </div>
                        <div className="cafe__weekly__details">
                            <div className="cafe__weekly__info">
                                <p className="cafe__weekly__likes">
                                    <img src={LocationIcon} alt="Location" className="cafe__weekly__like-icon" />
                                    {cafe.likes}
                                </p>
                                <p className="cafe__weekly__name">{cafe.photographer}</p>
                                <p className="cafe__weekly__rating">⭐️ {cafe.googleRating} / 5</p>
                            </div>
                            <p className="cafe__weekly__description">{cafe.photoDescription}</p>
                            <p className="cafe__weekly__location">{cafe.cafeFavourites}</p>
                        </div>
                    </div>
                    <div className="cafe__weekly-footer">
                        <p>Check back next week for a new featured cafe!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CafeOfTheWeek;