import React, { useState } from "react";
import CafeQuiz from "../../components/CafeQuiz/CafeQuiz";
import PhotoCard from "../../components/PhotoCard/PhotoCard";
import PhotoPageHeader from "../../components/PhotoPageHeader/PhotoPageHeader";
import Footer from "../../components/Footer/Footer";
import "./CafeQuizPage.scss"; // Import the SCSS file

const CafeQuizPage = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [recommendedCafes, setRecommendedCafes] = useState([]);
  const [cafePersona, setCafePersona] = useState(""); // New state for persona

  const handleQuizComplete = ({ cafes = [], persona = "" }) => {
    console.log("Received recommended cafes:", cafes);
    console.log("Received cafe persona:", persona);
    setRecommendedCafes(cafes);
    setCafePersona(persona); // Store the persona
    setQuizCompleted(true);
  };

  const handleRestart = () => {
    setRecommendedCafes([]);
    setCafePersona(""); // Reset persona
    setQuizCompleted(false);
  };

  return (
    <div className="cafe-quiz-page">
      <PhotoPageHeader />
      <div className="cafequiz__page">
        <header className="cafequiz__header">
          <p>Discover Your Next Cafe 🤎</p>
        </header>
        <div className="cafequiz__text">
          <p>Take our quick quiz and let us brew up the perfect cafe match for you!</p>
          <p>Your next favorite spot in 6ixCafes is just a few clicks away.</p>
        </div>
        <main className={`cafequiz__main ${quizCompleted ? "hidden" : ""}`}>
          {!quizCompleted && <CafeQuiz onQuizComplete={handleQuizComplete} />}
        </main>
        {quizCompleted && (
          <div className="quiz-complete">
            <h2 className="quiz-complete__heading">Explore Your Matches!</h2>
            {/* Display the cafe persona */}
            {cafePersona && (
              <p className="quiz-complete__persona">
                <p className="quiz__persona">Your Cafe Persona:</p> 
                <p>{cafePersona}</p>
              </p>
            )}
            <div className="quiz-results">
              {recommendedCafes.length > 0 ? (
                recommendedCafes.map((cafe) => (
                  <PhotoCard
                    key={cafe.id}
                    url={cafe.photo}
                    alt={cafe.photoDescription}
                    photographer={cafe.photographer}
                    tags={cafe.tags.map((tag, index) => ({
                      id: index,
                      name: tag,
                    }))} // Fixing tag structure
                    id={cafe.id}
                  />
                ))
              ) : (
                <p>No exact matches found. Try different answers!</p>
              )}
            </div>
            <div className="button-container">
              <button onClick={handleRestart}>Restart Quiz</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CafeQuizPage;