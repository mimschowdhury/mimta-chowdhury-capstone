import { useState, useEffect } from "react";
import axios from "axios";
import PhotoPageHeader from '../../components/PhotoPageHeader/PhotoPageHeader';
import Footer from "../../components/Footer/Footer";
import PhotoCardList from "../../components/PhotoCardList/PhotoCardList";
import "./FavouritesPage.scss";

export default function FavouritesPage() {
    const [photos, setPhotos] = useState([]);
    const [favoritePhotos, setFavoritePhotos] = useState([]);

    // Fetch all photos
    useEffect(() => {
        async function fetchPhotos() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/photos`);
                console.log("Fetched photos:", response.data);
                setPhotos(response.data);
            } catch (error) {
                console.error("Error fetching photos:", error);
            }
        }

        fetchPhotos();
    }, []);

    // After photos are fetched, filter the favorites
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const filteredFavorites = photos.filter(photo => favorites.includes(photo.id));
        setFavoritePhotos(filteredFavorites);
    }, [photos]); // This runs AFTER photos are fetched

    return (
        <>
            <PhotoPageHeader />
            <div className="favourites__page">
                <h1 className="favourites__header">My Favourite Cafes ☕️</h1>
                {favoritePhotos.length > 0 ? (
                    <PhotoCardList photos={favoritePhotos} />
                ) : (
                    <p className="favourites__text">You haven't favourited any cafes yet!</p>
                )}
            </div>
            <Footer />
        </>
    );
}