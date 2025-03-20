// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./Collage.scss";
// import cuteCoffee from "../../assets/images/cutecoffee.svg";
// import cloud from "../../assets/images/cloud.svg";
// import sign from "../../assets/images/sign.svg";
// import words from "../../assets/images/words.svg";

// const Collage = () => {
//   const [cafes, setCafes] = useState([]);
//   const [quotes, setQuotes] = useState({
//     item2: ["☕ SAVOR THE STILLNESS", "🤎 BREW THE LOVE", "♾️ SIP, SMILE, REPEAT"],
//     item5: "Livin' la vida mocha",
//     item7: "But first, coffee!",
//     item9: "You can't buy happiness, but you can buy coffee, and that's pretty close.",
//     item10: "COFFEE DREAMS",
//   });

//   // Overlay images with fixed positions in gaps
//   const overlayImages = [
//     { src: cuteCoffee, position: { gridColumn: "1 / 3", gridRow: "4 / 2" } }, // Bottom of column 2
//     { src: cloud, position: { gridColumn: "2 / 4", gridRow: "1 / 4" } }, // Top-right corner
//     { src: sign, position: { gridColumn: "4 / 2", gridRow: "4 / 5" } }, // Bottom-left corner (using the 0px row)
//     { src: words, position: { gridColumn: "3 / 5", gridRow: "2 / 4" } },
//   ];

//   const coffeeQuotes = {
//     threeLine: [
//       ["☕ SAVOR THE STILLNESS", "🤎 BREW THE LOVE", "♾️ SIP, SMILE, REPEAT"],
//       ["☕ WAKE UP", "🤎 SIP SLOW", "✨ FEEL THE GLOW"],
//       ["☕ COFFEE CALLS", "🤎 BREW JOY", "🌼 START FRESH"],
//     ],
//     oneLineShort: [
//       "Livin' la vida mocha",
//       "CAFFEINE KICK!",
//       "But first, coffee!",
//       "WARM HUGS",
//       "Espresso Yourself!",
//     ],
//     oneLineLong: [
//       "You can't buy happiness, but you can buy coffee, and that's pretty close.",
//       "Coffee: A hug in a mug.",
//       "Life happens, coffee helps.",
//       "Today's good mood is sponsored by coffee ☀️",
//     ],
//     oneLineWithSmiley: [
//       "COFFEE DREAMS 💤",
//       "SMILE & SIP 😊",
//       "BREW HAPPINESS",
//     ],
//   };

//   useEffect(() => {
//     async function fetchCafesAndQuotes() {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/photos`);
//         const shuffledCafes = response.data.sort(() => 0.5 - Math.random()).slice(0, 5);
//         setCafes(shuffledCafes);

//         setQuotes({
//           item2: coffeeQuotes.threeLine[Math.floor(Math.random() * coffeeQuotes.threeLine.length)],
//           item5: coffeeQuotes.oneLineShort[Math.floor(Math.random() * coffeeQuotes.oneLineShort.length)],
//           item7: coffeeQuotes.oneLineShort[Math.floor(Math.random() * coffeeQuotes.oneLineShort.length)],
//           item9: coffeeQuotes.oneLineLong[Math.floor(Math.random() * coffeeQuotes.oneLineLong.length)],
//           item10: coffeeQuotes.oneLineWithSmiley[Math.floor(Math.random() * coffeeQuotes.oneLineWithSmiley.length)],
//         });
//       } catch (error) {
//         console.error("Error fetching cafes:", error);
//         setCafes([]);
//       }
//     }

//     fetchCafesAndQuotes();
//   }, []);

//   if (cafes.length === 0) return <div>Loading...</div>;

//   return (
//     <div className="collage-page">
//       <div className="collage-container">
//         {/* Row 1 */}
//         <div className="collage-item item-1">
//           <div className="cafe-placeholder">
//             <Link to={`/photos/${cafes[0]?.id}`} className="cafe-link">
//               <img src={cafes[0]?.photo} alt={cafes[0]?.name} />
//             </Link>
//             <p>{cafes[0]?.name}</p>
//           </div>
//         </div>
//         <div className="collage-item item-2">
//           <div className="text-box">
//             <p>{quotes.item2[0]}</p>
//             <p>{quotes.item2[1]}</p>
//             <p>{quotes.item2[2]}</p>
//           </div>
//         </div>
//         <div className="collage-item item-3">
//           <div className="cafe-placeholder">
//             <Link to={`/photos/${cafes[1]?.id}`} className="cafe-link">
//               <img src={cafes[1]?.photo} alt={cafes[1]?.name} />
//             </Link>
//             <p>{cafes[1]?.name}</p>
//           </div>
//         </div>

//         {/* Row 2 */}
//         <div className="collage-item item-4">
//           <div className="cafe-placeholder">
//             <Link to={`/photos/${cafes[2]?.id}`} className="cafe-link">
//               <img src={cafes[2]?.photo} alt={cafes[2]?.name} />
//             </Link>
//             <p>{cafes[2]?.name}</p>
//           </div>
//         </div>
//         <div className="collage-item item-5">
//           <div className="text-box">
//             <p>{quotes.item5}</p>
//           </div>
//         </div>
//         <div className="collage-item item-6">
//           <div className="cafe-placeholder">
//             <Link to={`/photos/${cafes[3]?.id}`} className="cafe-link">
//               <img src={cafes[3]?.photo} alt={cafes[3]?.name} />
//             </Link>
//             <p>{cafes[3]?.name}</p>
//           </div>
//         </div>
//         <div className="collage-item item-7">
//           <div className="text-box">
//             <p>{quotes.item7}</p>
//           </div>
//         </div>

//         {/* Row 3 */}
//         <div className="collage-item item-9">
//           <div className="text-box">
//             <p>{quotes.item9}</p>
//           </div>
//         </div>
//         <div className="collage-item item-10">
//           <div className="text-box">
//             <p>{quotes.item10}</p>
//             <div className="smiley"></div>
//           </div>
//         </div>
//         <div className="collage-item item-11">
//           <div className="cafe-placeholder">
//             <Link to={`/photos/${cafes[4]?.id}`} className="cafe-link">
//               <img src={cafes[4]?.photo} alt={cafes[4]?.name} />
//             </Link>
//             <p>{cafes[4]?.name}</p>
//           </div>
//         </div>

//         {/* Overlay Images in Fixed Positions */}
//         {overlayImages.map((overlay, index) => (
//           <img
//             key={index}
//             src={overlay.src}
//             alt="Decorative overlay"
//             className="overlay-image"
//             style={{
//               gridColumn: overlay.position.gridColumn,
//               gridRow: overlay.position.gridRow,
//               pointerEvents: "none", // Ensures clicks pass through
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Collage;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Collage.scss";
import cuteCoffee from "../../assets/images/cutecoffee.svg";
import cloud from "../../assets/images/cloud.svg";
import sign from "../../assets/images/sign.svg";
import words from "../../assets/images/words.svg";

const Collage = () => {
  const [cafes, setCafes] = useState([]);
  const [quotes, setQuotes] = useState({
    item2: ["☕ SAVOR THE STILLNESS", "🤎 BREW THE LOVE", "♾️ SIP, SMILE, REPEAT"],
    item5: "Livin' la vida mocha",
    item7: "But first, coffee!",
    item9: "You can't buy happiness, but you can buy coffee, and that's pretty close.",
    item10: "COFFEE DREAMS",
  });

  // Overlay images with fixed positions in gaps
  const overlayImages = [
    { src: cuteCoffee, position: { gridColumn: "1 / 3", gridRow: "4 / 2" } }, // Bottom of column 2
    { src: cloud, position: { gridColumn: "2 / 4", gridRow: "1 / 4" } }, // Top-right corner
    { src: sign, position: { gridColumn: "4 / 2", gridRow: "4 / 5" } }, // Bottom-left corner (using the 0px row)
    { src: words, position: { gridColumn: "3 / 5", gridRow: "2 / 4" } },
  ];

  const coffeeQuotes = {
    threeLine: [
      ["☕ SAVOR THE STILLNESS", "🤎 BREW THE LOVE", "♾️ SIP, SMILE, REPEAT"],
      ["☕ WAKE UP", "🤎 SIP SLOW", "✨ FEEL THE GLOW"],
      ["☕ COFFEE CALLS", "🤎 BREW JOY", "🌼 START FRESH"],
    ],
    oneLineShort: [
      "Livin' la vida mocha",
      "CAFFEINE KICK!",
      "But first, coffee!",
      "WARM HUGS",
      "Espresso Yourself!",
    ],
    oneLineLong: [
      "You can't buy happiness, but you can buy coffee, and that's pretty close.",
      "Coffee: A hug in a mug.",
      "Life happens, coffee helps.",
      "Today's good mood is sponsored by coffee ☀️",
    ],
    oneLineWithSmiley: [
      "COFFEE DREAMS 💤",
      "SMILE & SIP 😊",
      "BREW HAPPINESS",
    ],
  };

  useEffect(() => {
    async function fetchCafesAndQuotes() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/photos`);
        const shuffledCafes = response.data.sort(() => 0.5 - Math.random()).slice(0, 5);
        setCafes(shuffledCafes);
        console.log("Fetched cafes:", shuffledCafes); // Debug the data

        setQuotes({
          item2: coffeeQuotes.threeLine[Math.floor(Math.random() * coffeeQuotes.threeLine.length)],
          item5: coffeeQuotes.oneLineShort[Math.floor(Math.random() * coffeeQuotes.oneLineShort.length)],
          item7: coffeeQuotes.oneLineShort[Math.floor(Math.random() * coffeeQuotes.oneLineShort.length)],
          item9: coffeeQuotes.oneLineLong[Math.floor(Math.random() * coffeeQuotes.oneLineLong.length)],
          item10: coffeeQuotes.oneLineWithSmiley[Math.floor(Math.random() * coffeeQuotes.oneLineWithSmiley.length)],
        });
      } catch (error) {
        console.error("Error fetching cafes:", error);
        setCafes([]);
      }
    }

    fetchCafesAndQuotes();
  }, []);

  if (cafes.length === 0) return <div>Loading...</div>;

  return (
    <div className="collage-page">
      <div className="collage-container">
        {/* Row 1 */}
        <div className="collage-item item-1">
          <div className="cafe-placeholder">
            <Link to={`/photos/${cafes[0]?.id}`} className="cafe-link">
              <img src={cafes[0]?.photo} alt={cafes[0]?.photographer} />
              <div className="cafe-overlay">
                <p className="cafe-overlay__name">{cafes[0]?.photographer}</p>
              </div>
            </Link>
            <p className="cafe-name">{cafes[0]?.photographer}</p>
          </div>
        </div>
        <div className="collage-item item-2">
          <div className="text-box">
            <p>{quotes.item2[0]}</p>
            <p>{quotes.item2[1]}</p>
            <p>{quotes.item2[2]}</p>
          </div>
        </div>
        <div className="collage-item item-3">
          <div className="cafe-placeholder">
            <Link to={`/photos/${cafes[1]?.id}`} className="cafe-link">
              <img src={cafes[1]?.photo} alt={cafes[1]?.photographer} />
              <div className="cafe-overlay">
                <p className="cafe-overlay__name">{cafes[1]?.photographer}</p>
              </div>
            </Link>
            <p className="cafe-name">{cafes[1]?.photographer}</p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="collage-item item-4">
          <div className="cafe-placeholder">
            <Link to={`/photos/${cafes[2]?.id}`} className="cafe-link">
              <img src={cafes[2]?.photo} alt={cafes[2]?.photographer} />
              <div className="cafe-overlay">
                <p className="cafe-overlay__name">{cafes[2]?.photographer}</p>
              </div>
            </Link>
            <p className="cafe-name">{cafes[2]?.photographer}</p>
          </div>
        </div>
        <div className="collage-item item-5">
          <div className="text-box">
            <p>{quotes.item5}</p>
          </div>
        </div>
        <div className="collage-item item-6">
          <div className="cafe-placeholder">
            <Link to={`/photos/${cafes[3]?.id}`} className="cafe-link">
              <img src={cafes[3]?.photo} alt={cafes[3]?.photographer} />
              <div className="cafe-overlay">
                <p className="cafe-overlay__name">{cafes[3]?.photographer}</p>
              </div>
            </Link>
            <p className="cafe-name">{cafes[3]?.photographer}</p>
          </div>
        </div>
        <div className="collage-item item-7">
          <div className="text-box">
            <p>{quotes.item7}</p>
          </div>
        </div>

        {/* Row 3 */}
        <div className="collage-item item-9">
          <div className="text-box">
            <p>{quotes.item9}</p>
          </div>
        </div>
        <div className="collage-item item-10">
          <div className="text-box">
            <p>{quotes.item10}</p>
            <div className="smiley"></div>
          </div>
        </div>
        <div className="collage-item item-11">
          <div className="cafe-placeholder">
            <Link to={`/photos/${cafes[4]?.id}`} className="cafe-link">
              <img src={cafes[4]?.photo} alt={cafes[4]?.photographer} />
              <div className="cafe-overlay">
                <p className="cafe-overlay__name">{cafes[4]?.photographer}</p>
              </div>
            </Link>
            <p className="cafe-name">{cafes[4]?.photographer}</p>
          </div>
        </div>

        {/* Overlay Images in Fixed Positions */}
        {overlayImages.map((overlay, index) => (
          <img
            key={index}
            src={overlay.src}
            alt="Decorative overlay"
            className="overlay-image"
            style={{
              gridColumn: overlay.position.gridColumn,
              gridRow: overlay.position.gridRow,
              pointerEvents: "none", // Ensures clicks pass through
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Collage;