import "./PhotoQuiz.scss";
import { Link } from "react-router-dom";

function PhotoQuiz({ url, alt, photographer, tags = [], id }) {
  return (
    <div className="photoquiz">
      <div className="photoquiz__content">
        <Link to={`/photos/${id}`} className="photoquiz__link">
          <img src={url} alt={alt} />
        </Link>
        <p className="photoquiz__photographer">{photographer}</p>
      </div>
      <ul className="photoquiz__tags">
        {Array.isArray(tags) && tags.length > 0 ? (
          tags.map((tag) => (
            <li key={tag?.id || tag.name} className="photoquiz_tag">
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

export default PhotoQuiz;