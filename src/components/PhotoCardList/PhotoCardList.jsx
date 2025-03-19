// //photocards list
// import PhotoCard from "../PhotoCard/PhotoCard";
// import "./PhotoCardList.scss";

// function PhotoCardList({ photos, tags }) {
//   return (
//     <section className="photocard-list">
//       {photos.map((photo) => {
//         // Handle both array and string formats
//         const photoTags = Array.isArray(photo.tags)
//           ? photo.tags
//           : photo.tags.split(",");

//         return (
//           <PhotoCard
//             key={photo.id}
//             url={photo.photo}
//             alt={photo.photoDescription}
//             photographer={photo.photographer}
//             tags={photoTags.map(
//               (tagName) =>
//                 tags.find((t) => t.name === tagName.trim()) || {
//                   name: tagName.trim(),
//                 }
//             )}
//             id={photo.id}
//           />
//         );
//       })}
//     </section>
//   );
// }

// export default PhotoCardList;

import React, { useRef, useState } from "react";
import PhotoCard from "../PhotoCard/PhotoCard";
import "./PhotoCardList.scss";

function PhotoCardList({ photos, tags }) {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartX(event.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section
      className="photocard-list"
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
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
