import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import PhotoCardList from "../../components/PhotoCardList/PhotoCardList";
import FilterDrawer from '../../components/FilterDrawer/FilterDrawer';
import Hero from '../../components/Hero/Hero';
import Header from '../../components/Header/Header';
import AboutSection from "../../components/AboutSection/AboutSection";

export default function HomePage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [tags, setTags] = useState([]);

    // fetch photos
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

    // fetch tags
    useEffect(() => {
        async function fetchTags() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/tags`);
                console.log("Fetched tags:", response.data);
                setTags(response.data);
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        }
        fetchTags();
    }, []);

    // Handle filter selection
    const openDrawer = () => setIsOpen(!isOpen);
    const handleFilterChange = (tag) => {
        setSelectedTag((prevTag) => (prevTag === tag ? null : tag));
    };

    // filter photos by selected tag
    const filteredPhotos = selectedTag
        ? photos.filter((photo) => photo.tags.includes(selectedTag))
        : photos;

    return (
        <>
            <Header openDrawer={openDrawer} isDrawerOpen={isOpen} />
            <div className="app__content">
                <div className={`app__filter-drawer ${isOpen ? "app__filter-drawer--open" : ""}`}>
                    {isOpen && (
                        <FilterDrawer
                            tags={tags}
                            selectedTag={selectedTag}
                            onFilterChange={handleFilterChange}
                        />
                    )}
                </div>
                <div className={`app__main-content ${isOpen ? "app__main-content--drawer-open" : ""}`}>
                    <Hero />
                    <AboutSection />
                    <PhotoCardList photos={filteredPhotos} />
                </div>
            <Footer />
            </div>
        </>
    );
}