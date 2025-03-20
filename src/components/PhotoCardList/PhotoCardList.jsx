import React, { useRef, useState } from "react";
import PhotoCard from "../PhotoCard/PhotoCard";
import "./PhotoCardList.scss";

function PhotoCardList({ photos, tags, isGridView }) {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

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

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter photos based on search query (matches photographer or tags)
  const filteredPhotos = photos.filter((photo) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true; // If no query, show all photos

    // Check if the photographer (cafe name) matches the query
    const photographerMatch = photo.photographer
      .toLowerCase()
      .includes(query);

    // Check if any tag matches the query
    const photoTags = Array.isArray(photo.tags)
      ? photo.tags
      : photo.tags.split(",");
    const tagMatch = photoTags.some((tag) =>
      tag.toLowerCase().trim().includes(query)
    );

    // Return true if either the photographer or any tag matches
    return photographerMatch || tagMatch;
  });

  return (
    <div className="photocard-list-container">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search cafes or tags..."
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
                    tags.find((t) => t.name === tagName.trim()) || {
                      name: tagName.trim(),
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
