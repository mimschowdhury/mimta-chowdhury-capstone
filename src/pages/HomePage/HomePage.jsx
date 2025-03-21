import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import PhotoCardList from "../../components/PhotoCardList/PhotoCardList";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import AboutSection from "../../components/AboutSection/AboutSection";
import "./HomePage.scss"; // Import the CSS file for styling
import homeImage from "../../assets/images/landingpagebackground.png";

export default function HomePage() {
    const [selectedTag, setSelectedTag] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [tags, setTags] = useState([]);
    const [isGridView, setIsGridView] = useState(false);
    const [isIntroActive, setIsIntroActive] = useState(() => {
        return sessionStorage.getItem("hasSeenIntro") !== "true";
    });
    const [isOverlayVisible, setIsOverlayVisible] = useState(() => {
        return sessionStorage.getItem("hasSeenIntro") !== "true";
    });

    // Fetch photos
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

    // Fetch tags
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

    const handleEnterClick = () => {
        setIsIntroActive(false);
        setTimeout(() => {
            setIsOverlayVisible(false);
            sessionStorage.setItem("hasSeenIntro", "true"); // Mark intro as seen
        }, 1500); // Matches the 1.5s transition
    };

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
            {isOverlayVisible && (
                <div
                    className={`intro-overlay ${isIntroActive ? "active" : "inactive"}`}
                    style={{
                        backgroundImage: `url(${homeImage})`,
                        backgroundSize: "cover",
                    }}
                >
                    {isIntroActive && (
                        <button className="enter-button" onClick={handleEnterClick}>
                            Find Your Next Cup!
                        </button>
                    )}
                </div>
            )}
            <Header
                isGridView={isGridView}
                toggleView={toggleView}
                tags={tags}
                selectedTag={selectedTag}
                onFilterChange={handleFilterChange}
            />
            <div className="app__content">
                <div className="app__main-content">
                    <Hero isIntroActive={isIntroActive} />
                    <AboutSection />
                    <PhotoCardList photos={filteredPhotos} tags={tags} isGridView={isGridView} />
                </div>
                <Footer />
            </div>
        </>
    );
}