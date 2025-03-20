// HomePage.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import PhotoCardList from "../../components/PhotoCardList/PhotoCardList";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import AboutSection from "../../components/AboutSection/AboutSection";

export default function HomePage() {
    const [selectedTag, setSelectedTag] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [tags, setTags] = useState([]);
    const [isGridView, setIsGridView] = useState(false);

    useEffect(() => {
        async function fetchPhotos() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/photos`);
                console.log("✅ Fetched photos:", response.data);
                setPhotos(response.data);
            } catch (error) {
                console.error("❌ Error fetching photos:", error);
            }
        }
        fetchPhotos();
    }, []);

    useEffect(() => {
        async function fetchTags() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/tags`);
                console.log("✅ Fetched tags:", response.data);
                setTags(response.data);
            } catch (error) {
                console.error("❌ Error fetching tags:", error);
            }
        }
        fetchTags();
    }, []);

    const handleFilterChange = (tag) => {
        console.log("🔵 Selected tag:", tag);
        setSelectedTag(tag);
    };

    const toggleView = () => {
        setIsGridView((prev) => !prev);
    };

    const filteredPhotos = selectedTag
        ? photos.filter((photo) => {
            console.log(`📸 Checking Photo ID: ${photo.id}, Tags:`, photo.tags);
            if (!Array.isArray(photo.tags)) {
                console.warn(`Photo ID ${photo.id} has invalid tags:`, photo.tags);
                return false;
            }
            return photo.tags.some((tag) => {
                console.log(`🔍 Comparing:`, { tag, selectedTag });
                if (typeof tag === "object" && tag.name) {
                    return tag.name === selectedTag;
                }
                return tag === selectedTag;
            });
        })
        : photos;

    return (
        <>
            <Header
                isGridView={isGridView}
                toggleView={toggleView}
                tags={tags}
                selectedTag={selectedTag}
                onFilterChange={handleFilterChange}
            />
            <div className="app__content">
                <div className="app__main-content">
                    <Hero />
                    <AboutSection />
                    <PhotoCardList photos={filteredPhotos} tags={tags} isGridView={isGridView} />
                </div>
                <Footer />
            </div>
        </>
    );
}