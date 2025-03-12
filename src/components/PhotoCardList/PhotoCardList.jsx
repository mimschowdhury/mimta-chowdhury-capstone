//photocards list
import PhotoCard from "../PhotoCard/PhotoCard";
import "./PhotoCardList.scss";

function PhotoCardList({ photos }) {
    return (
        <section className="photocard-list">
            {photos.map((photo) => (
                <PhotoCard
                    url={photo.photo}
                    alt={photo.photoDescription}
                    photographer={photo.photographer}
                    tags={photo.tags} 
                    id={photo.id}
                    key={photo.id}
                />
            ))} 
        </section>
    );
}

export default PhotoCardList;
