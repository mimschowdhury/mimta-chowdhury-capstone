import React, { useRef, useState } from "react";
import PhotoCard from "../PhotoCard/PhotoCard";
import "./PhotoCardList.scss";

function PhotoCardList({ photos, tags, isGridView }) {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

  return (
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
      {photos.map((photo) => {
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
      })}
    </section>
  );
}

export default PhotoCardList;