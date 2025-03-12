import { useState } from "react";
import "./Form.scss";

function Form({ id, setComments, handlePostComment}) {
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(false); // Track form submission

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitted(true);

        if (!name || !comment) {
            alert("Both fields are required!");
            return;
        }

        try {
            const commentObj  = {name, comment}
            handlePostComment(commentObj);

            // Reset form fields
            setName("");
            setComment("");
            setSubmitted(false);
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    return (
        <form id="comments-form" className="form" onSubmit={handleSubmit}>
            <label className="form__input-label">Name</label>
            <input
                id="name-box"
                className={`form__input ${submitted && !name ? "form__input--error" : ""}`}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label className="form__input-label">Comment</label>
            <textarea
                id="comment-box"
                className={`form__input ${submitted && !comment ? "form__input--error" : ""}`}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button className="form__submit">Submit</button>
        </form>
    );
}

export default Form;