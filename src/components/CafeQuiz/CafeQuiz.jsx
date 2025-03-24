import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CafeQuiz.scss";

const CafeQuiz = ({ onQuizComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    reason: "", // Renamed from vibe for clarity
    seating: "",
    vibe: "",
    need: "",
    craving: "",
    personality: "", // New: How would you describe yourself?
    brunch: "", // New: Are you feeling brunch?
  });
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCafes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/photos`);
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
        { label: "Treat myself to something delicious 😋", value: "Best Baked Goods" },
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
      question: "How would you describe yourself?",
      options: [
        { label: "A Nerd 🤓 (I love a good study spot)", value: "Study Spot" },
        { label: "A Coffee Connoisseur ☕️ (Only the best brew)", value: "Best Coffee" },
        { label: "A Foodie 🍰 (Baked goods are my jam)", value: "Best Baked Goods" },
        { label: "A Vibe Chaser 🌸 (Ambiance is everything)", value: "Ambience" },
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
    {
      question: "Are you feeling brunch today? 🍳",
      options: [
        { label: "Yes, bring on the brunch vibes!", value: "Brunch" },
        { label: "Nah, just coffee or a snack", value: "None" }, // Neutral option
      ],
    },
  ];

  const handleAnswer = (value) => {
    const answerKeys = Object.keys(answers);
    const newAnswers = { ...answers, [answerKeys[step]]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      recommendCafes(newAnswers);
    }
  };

  const generatePersona = (answers) => {
    const { reason, vibe, need, craving, personality, brunch } = answers;

    if (personality === "Study Spot" || (vibe === "Study Spot" && need !== "Best Baked Goods")) {
      return "The Focused Scholar: You’re a productivity powerhouse, sipping strong coffee in a quiet, work-friendly nook.";
    } else if (personality === "Best Coffee" || (reason === "Best Coffee" && craving === "Best Coffee")) {
      return "The Coffee Connoisseur: You’re on a quest for the perfect brew, savoring every sip in a cozy setting.";
    } else if (personality === "Best Baked Goods" || need === "Best Baked Goods" || craving === "Best Baked Goods") {
      return "The Treat Seeker: Pastries or savory bites are your mission, paired with a laid-back cafe vibe.";
    } else if (brunch === "Brunch") {
      return "The Brunch Buff: You’re all about that brunch life—think mimosas, eggs benny, and sunny vibes.";
    } else if (personality === "Ambience" || vibe === "Ambience") {
      return "The Vibe Chaser: You’re here for the ambiance, soaking in the cafe’s charm with a drink in hand.";
    } else if (need === "Both") {
      return "The Cafe All-Rounder: You want it all—top-notch coffee, tasty treats, and a vibe that fits your mood.";
    } else {
      return "The Chill Wanderer: No rush, no fuss—just enjoying the cafe’s charm with whatever’s on the menu.";
    }
  };

  const recommendCafes = (finalAnswers) => {
    console.log("User answers:", finalAnswers);
    console.log("Available cafes:", cafes);

    const matchedCafes = cafes.filter((cafe) => {
      const tags = cafe.tags || [];
      const reasonMatch = tags.includes(finalAnswers.reason);
      const seatingMatch = tags.includes(finalAnswers.seating);
      const vibeMatch = tags.includes(finalAnswers.vibe);
      const needMatch =
        finalAnswers.need === "Both"
          ? tags.includes("Best Coffee") || tags.includes("Best Baked Goods")
          : tags.includes(finalAnswers.need);
      const cravingMatch = tags.includes(finalAnswers.craving);
      const personalityMatch = tags.includes(finalAnswers.personality);
      const brunchMatch = finalAnswers.brunch === "Brunch" ? tags.includes("Brunch") : true; // Ignore if "None"

      console.log(
        `Cafe: ${cafe.photographer}, Tags: ${tags}, Matches: ${
          reasonMatch && seatingMatch && vibeMatch && needMatch && cravingMatch && personalityMatch && brunchMatch
        }`
      );
      return reasonMatch && seatingMatch && vibeMatch && needMatch && cravingMatch && personalityMatch && brunchMatch;
    });

    console.log("Matched cafes:", matchedCafes);

    let recommendedCafes;
    if (matchedCafes.length === 0) {
      const partialMatches = cafes.filter((cafe) =>
        cafe.tags.some((tag) => Object.values(finalAnswers).includes(tag))
      );
      console.log("Partial matches:", partialMatches);
      recommendedCafes = partialMatches.slice(0, 3);
    } else {
      recommendedCafes = matchedCafes.slice(0, 3);
    }

    const persona = generatePersona(finalAnswers);
    onQuizComplete({ cafes: recommendedCafes, persona });
  };

  if (loading) return <div className="cafe-quiz__loading">Loading cafes...</div>;
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