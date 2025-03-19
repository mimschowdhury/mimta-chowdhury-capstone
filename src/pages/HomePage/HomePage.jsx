import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import PhotoCardList from "../../components/PhotoCardList/PhotoCardList";
import FilterDrawer from "../../components/FilterDrawer/FilterDrawer";
import Hero from "../../components/Hero/Hero";
import Header from "../../components/Header/Header";
import AboutSection from "../../components/AboutSection/AboutSection";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [tags, setTags] = useState([]);
  const [isGridView, setIsGridView] = useState(false); // Lifted state for view mode

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

  // Handle filter selection
  const openDrawer = () => {
    console.log("🟡 Toggling drawer. Current state:", isOpen);
    setIsOpen(!isOpen);
  };

  const handleFilterChange = (tag) => {
    console.log("🔵 Selected tag:", tag);
    setSelectedTag((prevTag) => (prevTag === tag ? null : tag));
  };

  // Toggle view mode
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
        openDrawer={openDrawer}
        isDrawerOpen={isOpen}
        isGridView={isGridView}
        toggleView={toggleView}
      />
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
          <PhotoCardList photos={filteredPhotos} tags={tags} isGridView={isGridView} />
        </div>
        <Footer />
      </div>
    </>
  );
}