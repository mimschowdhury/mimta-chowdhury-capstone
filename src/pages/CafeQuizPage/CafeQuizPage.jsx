import React, { useState } from "react";
import CafeQuiz from "../../components/CafeQuiz/CafeQuiz";
import PhotoCard from "../../components/PhotoCard/PhotoCard";
import PhotoPageHeader from "../../components/PhotoPageHeader/PhotoPageHeader";
import Footer from "../../components/Footer/Footer";
import "./CafeQuizPage.scss"; // Import the SCSS file

const CafeQuizPage = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [recommendedCafes, setRecommendedCafes] = useState([]);

  const handleQuizComplete = (cafes = []) => {
    console.log("Received recommended cafes:", cafes);
    setRecommendedCafes(cafes);
    setQuizCompleted(true);
  };

  const handleRestart = () => {
    setRecommendedCafes([]);
    setQuizCompleted(false);
  };

  return (
    <div className="cafe-quiz-page">
      <PhotoPageHeader />
      <div className="cafequiz__page">
        <header className="cafequiz__header">
          <p>Discover Your Cafe 🤎</p>
        </header>
        <p className="cafequiz__text">
          Take our quick quiz and let us brew up the perfect cafe match for you!
          Your next favorite spot in 6ixCafes is just a few clicks away.
        </p>
        <main className={`cafequiz__main ${quizCompleted ? "hidden" : ""}`}>
          {!quizCompleted && <CafeQuiz onQuizComplete={handleQuizComplete} />}
        </main>
        {quizCompleted && (
          <div className="quiz-complete">
            <h2 className="quiz-complete__heading">Explore Your Matches!</h2>
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
                    }))} // ✅ Fixing tag structure
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
