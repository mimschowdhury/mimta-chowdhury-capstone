import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import PhotoPageHeader from "../../components/PhotoPageHeader/PhotoPageHeader";
import CommentList from "../../components/CommentList/CommentList";
import PhotoDetails from "../../components/PhotoDetails/PhotoDetails";
import Form from "../../components/Form/Form";
import "./PhotoPage.scss";

export default function PhotoPage() {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    const [comments, setComments] = useState(null);

    // fetch photo and comments data when component mounts
    useEffect(() => {
        fetchPhoto();
        fetchComments();
    }, []);

    // fetch photo details from API
    async function fetchPhoto() {
        try {
            const { data } = await axios.get(`http://localhost:8080/photos/${id}`);
            setPhoto(data);
        } catch (error) {
            console.error("Error fetching photo:", error);
            alert("Failed to fetch photo. Please try again later.");
        }
    }

    // fetch and sort comments from API
    async function fetchComments() {
        try {
            const { data } = await axios.get(`http://localhost:8080/photos/${id}/comments`);
            setComments(data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
        } catch (error) {
            console.error("Error fetching comments:", error);
            alert("Failed to fetch comments. Please try again later.");
        }
    }

    // post comments (when submitting) and fetch comments after posting
    const handlePostComment = (comment) => {
        async function postComment(comment) {
            try {
                await axios.post(`http://localhost:8080/photos/${id}/comments`, comment);
                fetchComments();
            } catch (error) {
                console.error("Error posting comment:", error);
                alert("Failed to post comment. Please try again.");
            }
        }
        postComment(comment);
    };

    if (!photo || !comments) {
        return <div>Loading...</div>;
    }

    return (
        <div className="photo-page">
            <PhotoPageHeader />
            <div className="photo-page__content">
                <PhotoDetails photo={photo} comments={comments} />
                <Form id={id} setComments={setComments} handlePostComment={handlePostComment}/> {/* Pass setComments to Form */}
                <CommentList comments={comments} />
            </div>    
            <Footer />
        </div>
    );
}