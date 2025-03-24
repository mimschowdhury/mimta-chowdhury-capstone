import "./Comment.scss";

function Comment({ comment }) {
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    };
    const formattedDate = new Date(comment.timestamp).toLocaleDateString("en-US", options);

    return (
        <div className="comment">
            <div className="comment__header">
                <p className="comment__name">{comment.name}</p>
                <p className="comment__date">{formattedDate}</p>
            </div>
            <p className="comment__comment">
                {comment.comment}
            </p>
        </div>
    );
}

export default Comment;