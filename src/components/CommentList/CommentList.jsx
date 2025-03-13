import Comment from "../Comment/Comment";
import "./CommentList.scss";

function CommentList({ comments }) {
    const commentCount = comments.length;
    
    return (
        <div className="comment-list">
            <h3 className="comment-list__count">
                {commentCount === 0 
                    ? "No Comments" 
                    : `${commentCount} ${commentCount === 1 ? 'Comment' : 'Comments'}`}
            </h3>
            {commentCount > 0 && comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
    );
}

export default CommentList;