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

    useEffect(() => {
        fetchPhoto();
        fetchComments();
    }, [id]);

    async function fetchPhoto() {
        try {
            const { data } = await axios.get(`http://localhost:8080/photos/${id}`);
            setPhoto(data);
        } catch (error) {
            console.error("Error fetching photo:", error);
            alert("Failed to fetch photo. Please try again later.");
        }
    }

    async function fetchComments() {
        try {
            const { data } = await axios.get(`http://localhost:8080/photos/${id}/comments`);
            setComments(data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
        } catch (error) {
            console.error("Error fetching comments:", error);
            alert("Failed to fetch comments. Please try again later.");
        }
    }

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
                <PhotoDetails photo={photo} />
                <Form id={id} setComments={setComments} handlePostComment={handlePostComment} />
                <CommentList comments={comments} />
            </div>
            <Footer />
        </div>
    );
}