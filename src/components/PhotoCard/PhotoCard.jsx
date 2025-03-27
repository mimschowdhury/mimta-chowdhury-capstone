import "./PhotoCard.scss";
import { Link } from "react-router-dom";

function PhotoCard({ url, alt, photographer, tags = [], id }) {
  return (
    <div className="photocard">
      <div className="photocard__content">
        <Link to={`/photos/${id}`} className="photocard__link">
          <img src={url} alt={alt} />
        <p className="photocard__photographer">{photographer}</p>
        </Link>
      </div>
      <ul className="photocard__tags">
        {Array.isArray(tags) && tags.length > 0 ? (
          tags.map((tag) => (
            <li key={tag?.id || tag.name} className="photocard_tag">
              {tag?.name || "No Name"}
            </li>
          ))
        ) : (
          <li>No tags available</li>
        )}
      </ul>
    </div>
  );
}

export default PhotoCard;