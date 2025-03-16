import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CafeQuiz.scss"; // Import the SCSS file

const CafeQuiz = ({ onQuizComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    vibe: "",
    need: "",
    craving: "",
  });
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCafes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/photos`
        );
        console.log("Fetched cafes:", response.data);
        setCafes(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load cafes. Please try again.");
        setLoading(false);
      }
    };
    fetchCafes();
  }, []);

  const questions = [
    {
      question: "What’s the main reason for your cafe visit?",
      options: [
        { label: "Grab the best coffee in town ☕️", value: "Best Coffee" },
        {
          label: "Treat myself to something delicious 😋",
          value: "Best Baked Goods",
        },
        { label: "Find a peaceful spot to work/study 👩🏻‍💻", value: "Study Spot" },
        { label: "Just chill and enjoy the ambiance 🌿", value: "Ambience" },
      ],
    },
    {
      question: "What kind of seating do you prefer?",
      options: [
        { label: "Cozy couches & warm lighting", value: "Ambience" },
        { label: "Large tables & outlets for work", value: "Study Spot" },
        { label: "Outdoor patio with a view", value: "Ambience" },
      ],
    },
    {
      question: "What vibe are you feeling today?",
      options: [
        { label: "Cozy & Chill", value: "Ambience" },
        { label: "Focused & Productive", value: "Study Spot" },
        { label: "Lively & Social", value: "Ambience" },
      ],
    },
    {
      question: "What do you need right now?",
      options: [
        { label: "Great Coffee", value: "Best Coffee" },
        { label: "Tasty Treats", value: "Best Baked Goods" },
        { label: "Both!", value: "Both" },
      ],
    },
    {
      question: "What's your craving?",
      options: [
        { label: "Something Sweet", value: "Best Baked Goods" },
        { label: "Something Savory", value: "Best Baked Goods" },
        { label: "Just Coffee", value: "Best Coffee" },
      ],
    },
  ];

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [Object.keys(answers)[step]]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      recommendCafes(newAnswers);
    }
  };

  const recommendCafes = (finalAnswers) => {
    console.log("User answers:", finalAnswers);
    console.log("Available cafes:", cafes);

    const matchedCafes = cafes.filter((cafe) => {
      const tags = cafe.tags || [];
      const vibeMatch = tags.includes(finalAnswers.vibe);
      const needMatch =
        finalAnswers.need === "Both"
          ? tags.includes("Best Coffee") || tags.includes("Best Baked Goods")
          : tags.includes(finalAnswers.need);
      const cravingMatch = tags.includes(finalAnswers.craving);

      console.log(
        `Cafe: ${cafe.photographer}, Tags: ${tags}, Matches: ${
          vibeMatch && needMatch && cravingMatch
        }`
      );
      return vibeMatch && needMatch && cravingMatch;
    });

    console.log("Matched cafes:", matchedCafes);

    if (matchedCafes.length === 0) {
      const partialMatches = cafes.filter((cafe) =>
        cafe.tags.some((tag) => Object.values(finalAnswers).includes(tag))
      );
      console.log("Partial matches:", partialMatches);
      onQuizComplete(partialMatches.slice(0, 3));
    } else {
      onQuizComplete(matchedCafes.slice(0, 3));
    }
  };

  if (loading)
    return <div className="cafe-quiz__loading">Loading cafes...</div>;
  if (error) return <div className="cafe-quiz__error">{error}</div>;

  return (
    <div className="cafe-quiz">
      {step < questions.length && (
        <>
          <h2 className="cafe-quiz__question">{questions[step].question}</h2>
          <div className="cafe-quiz__options">
            {questions[step].options.map((option) => (
              <button
                key={option.label}
                onClick={() => handleAnswer(option.value)}
                className="cafe-quiz__option"
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CafeQuiz;
