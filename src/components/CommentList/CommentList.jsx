import Comment from "../Comment/Comment";
import "./CommentList.scss";

function CommentList({ comments }) {
    return (
        <div className="comment-list">
            <h3 className="comment-list__count">{comments.length} Comments</h3> 
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
    );
}

export default CommentList;