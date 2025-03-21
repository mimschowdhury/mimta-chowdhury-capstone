import React, { useRef, useState } from "react";
import PhotoCard from "../PhotoCard/PhotoCard";
import "./PhotoCardList.scss";

function PhotoCardList({ photos, tags, isGridView, onFilterChange }) {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Start dragging (only for scroll mode)
  const handleMouseDown = (event) => {
    if (!isGridView) {
      setIsDragging(true);
      setStartX(event.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  // Handle dragging movement (only for scroll mode)
  const handleMouseMove = (event) => {
    if (!isDragging || isGridView) return;
    event.preventDefault();
    const x = event.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch events for mobile (only for scroll mode)
  const handleTouchStart = (event) => {
    if (!isGridView) {
      setIsDragging(true);
      setStartX(event.touches[0].pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleTouchMove = (event) => {
    if (!isDragging || isGridView) return;
    const x = event.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Handle search input change and reset filter
  const handleSearchChange = (event) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
    if (newQuery.trim() !== "") {
      onFilterChange(null); // Reset filter to "all" when search is used
    }
  };

  // Filter photos based on search query
  const filteredPhotos = searchQuery.trim()
    ? photos.filter((photo) => {
        const query = searchQuery.toLowerCase().trim();
        const photographerMatch = photo.photographer
          .toLowerCase()
          .includes(query);
        const photoTags = Array.isArray(photo.tags)
          ? photo.tags
          : photo.tags.split(",");
        const tagMatch = photoTags.some((tag) =>
          (typeof tag === "object" ? tag.name : tag)
            .toLowerCase()
            .trim()
            .includes(query)
        );
        return photographerMatch || tagMatch;
      })
    : photos; // Use the filtered photos from HomePage when no search query

  return (
    <div className="photocard-list-container">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search all cafes or tags..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar__input"
        />
      </div>

      <section
        className={`photocard-list ${isGridView ? "grid-mode" : "scroll-mode"} ${
          isDragging && !isGridView ? "dragging" : ""
        }`}
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {filteredPhotos.length > 0 ? (
          filteredPhotos.map((photo) => {
            const photoTags = Array.isArray(photo.tags)
              ? photo.tags
              : photo.tags.split(",");

            return (
              <PhotoCard
                key={photo.id}
                url={photo.photo}
                alt={photo.photoDescription}
                photographer={photo.photographer}
                tags={photoTags.map(
                  (tagName) =>
                    tags.find((t) => t.name === (typeof tagName === "object" ? tagName.name : tagName.trim())) || {
                      name: typeof tagName === "object" ? tagName.name : tagName.trim(),
                    }
                )}
                id={photo.id}
              />
            );
          })
        ) : (
          <p className="no-results">No cafes or filters match your search.</p>
        )}
      </section>
    </div>
  );
}

export default PhotoCardList;