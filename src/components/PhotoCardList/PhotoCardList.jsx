//photocards list
import PhotoCard from "../PhotoCard/PhotoCard";
import "./PhotoCardList.scss";

function PhotoCardList({ photos, tags }) {
  return (
    <section className="photocard-list">
      {photos.map((photo) => {
        // Handle both array and string formats
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
