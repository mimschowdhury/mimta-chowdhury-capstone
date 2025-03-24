# Project Title
6ixcafes - your guide to the best cafes in Toronto!

## Overview ☕️

6ixCafes is a platform designed for coffee lovers in Toronto to easily find and keep track of the best cafes in the city. It addresses the pain point of having to look up multiple resources (Google Maps, blogTO, Instagram, etc.) to find a good cafe. 

This website simplifies cafe hunting by consolidating information from Google Maps, blogTO, and Instagram into one cozy place—helping you save time and focus on what really matters: enjoying your coffee.

### Problem Space

Finding a good cafe can be a tedious process involving multiple websites and reviews. People often search through Google Maps, blogs, and social media to find cafes, but there isn’t a single platform that consolidates this information and lets users filter cafes by study-friendly spaces, great ambiance, and quality coffee.


6ixCafes solves this problem by:
<br>✅ Consolidating reliable cafe data into one easy-to-use platform.
<br>✅ Letting users filter based on study spots, ambiance, and coffee quality.
<br>✅ Helping users keep track of cafes they’ve visited and want to visit.
<br>✅ Offering simple, visual ratings for quick decision-making.

### User Profile

🎯 Target Audience
- Coffee drinkers who:
	- Are looking for a cafe close to their current or future location
    - Want to find the best places for studying or relaxing
	- Want to track cafes they have visited and rate them
	- Tourists & locals exploring Toronto's cafe scene.

💡 How They’ll Use It:
   - Search & filter cafes based on study spots, ambiance, and coffee quality.
   - Track cafes they’ve visited and rate them.
   - Plan coffee dates or study sessions based on cafe attributes.
   - Explore nearby cafes based on their current location.

🌿 Special Considerations
   - The platform should be simple and intuitive, without overwhelming the user.
   - The aesthetic should reflect cozy cafe vibes—neutral colors, soft design, and smooth UX.
   - Provide consistent and accurate data—no fake ratings or reviews.

### Features

	- Find nearby cafes based on the user’s current or provided location
	- Filter cafes based on criteria such as study spots, ambiance, and coffee quality
	- Favourites cafes to create a user-based favourite list
	- View and filter visited cafes by rating, location, etc.

## Implementation

### Tech Stack

### Frontend
<p>
  <img src="https://skillicons.dev/icons?i=react&theme=dark" width="50" height="50"/>
  <img src="https://skillicons.dev/icons?i=javascript&theme=dark" width="50" height="50"/>
  <img src="https://skillicons.dev/icons?i=sass&theme=dark" width="50" height="50"/>
</p>

### Backend
<p>
  <img src="https://skillicons.dev/icons?i=express&theme=dark" width="50" height="50"/>
  <img src="https://skillicons.dev/icons?i=mysql&theme=dark" width="50" height="50"/>
</p>

### Client Libraries
    - react
    - react-router
    - axios
    
### Server libraries:
    - knex
    - express
    - bcrypt for password hashing

### APIs & Integrations 🔗

- No external APIs will be used in the first sprint.
- Future sprints may include Google Maps API for geolcation enhancements

### Sitemap 🗺️

<br>1️⃣ Home Page – Browse cafes and explore filters.
<br>2️⃣ Cafe Details Page – View detailed information about a cafe.
<br>3️⃣ Favourite Cafes Page – Your personalized cafe list and favourites.
<br>4️⃣ About Page – Info about 6ixCafes and how it works.
<br>5️⃣ Locations Page – Discover cafes near you/in your neighbourhood.
<br>6️⃣ Cafe of the Week Page – Read more on the Cafe of the Week.
<br>7️⃣ Cafe Roulette – Generate a random cafe & coffee-related quotes!.

### Mockups
Original Mockups
Home Page: Displays nearby cafes and offers quick filtering
![Sitemap](./src/assets/mockups/Beige%20Minimalist%20Creative%20Agency%20Website%20Desktop%20Prototype.png)

About Page: Learn about the platform's mission.
![Sitemap](./src/assets/mockups/about.png)

Theme Colours: Define variables and colours used througout site
![Sitemap](./src/assets/mockups/pastel%20palette.png)
![Sitemap](./src/assets/mockups/coffee%20palette.png)

**Final Site Pages**
Landing Page: Welcome User Page
![Sitemap](./src/assets/mockups/Landing%20Page.png)

Home Page: Displays nearby cafes and offers quick filtering
![Sitemap](./src/assets/mockups/HomePage.png)

About Page: Learn about the platform's mission.
![Sitemap](./src/assets/mockups/AboutPage.png)

Locations Page: Discover cafes near you/in your neighbourhood.
![Sitemap](./src/assets/mockups/Locations.png)

Cafe of the Week Page: Read more on the Cafe of the Week.
![Sitemap](./src/assets/mockups/CafeOfTheWeek.png)

Cafe Roulette: Generate a random cafe & coffee-related quotes!.
![Sitemap](./src/assets/mockups/Cafe%20Roulette.png)

Cafe Details: When a cafe is clicked, a Cafe Details Page is shown with the ability to favourite, rate, and review.
![Sitemap](./src/assets/mockups/PhotoDetails.png)

### API Endpoints

**GET /cafes**

- Get cafes, with an optional "visited" if the user is logged in or not
- Filter: Filter by ambience, study_spots, or best_coffee (comma-separated if multiple)

Response:
```
[
    {
        "id": 1,
        "name": "Out of Office",
        "distance": 0.25,
        "ambience": "Modern, Minimal",
        "study_spots": true,
        "best_coffee": true,
        "visited": true
    },
    ...
]
```

**GET /cafes/:id**
- Get detailed information about a single cafe.

Parameters:
- id: Cafe id as number

Response:
```
[
{
    "id": 1,
    "name": "Quantum Coffee",
    "description": "Bright, airy space perfect for working.",
    "address": "460 King St W, Toronto, ON",
    "longitude": -79.394,
    "latitude": 43.644,
    "distance": 0.25,
    "ambience": "Modern, Minimal",
    "study_spots": true,
    "best_coffee": true,
    "visited": true
    },
    ...
]
```

## Database & Relationships 🗄️
The app’s database consists of:
	•	Users → who can track and rate cafes.
	•	Cafes → each with multiple attributes (ambience, location, study-friendliness).
	•	Favourites → users’ favourite ratings of cafes.

🔗 Relationships
	•	Users ↔ Favourites ↔ Cafes – Users favourite cafes they’ve visited.
	•	Users ↔ Visited Cafes – Track where they’ve been.

## Roadmap
Week 1: Project Setup + Core Infrastructure

Goal: Set up the foundational client and server, and gather data to seed the app.
1.	Create Client
	- Initialize React project
	- Set up basic routing
	- Create boilerplate pages (Home, Cafe List, Cafe Details)
2.	Create Server
	- Set up Express project
	- Add routing structure with placeholder 200 responses
3.	Create Migrations
	- Design database schema
	- Set up migrations for cafes table and any additional fields (ambience, study spots, geolocation, etc.)
4.	Gather Sample Data
	- Research and gather data for 20+ cafes
	- Include geolocations, ambience descriptions, study spot status, and coffee ratings

⸻

Week 2: Data + Basic API Integration

Goal: Seed the database, deploy the project, and create endpoints for listing and viewing cafes.
1.	Create Seeds with Sample Data
	- Insert cafe data into the database
	- Test database seeding works in dev and production environments
2.	Deploy Projects
	- Deploy React client
	- Deploy Express server.
	- Connect deployed front-end with back-end
3.	Feature: List Cafes from a Given Location
	- Implement List Cafes page in React
	- Add location form to enter/select user location
	- Integrate Google Maps API to display cafe pins
	- Create and connect to GET /cafes endpoint
	- Filter cafes based on proximity to the given location

⸻

Week 3: Viewing Cafe Details + Polish

Goal: Implement cafe details page, fine-tune the user experience, and QA before wrap-up.
1.	Feature: View Cafe
	- Implement View Cafe page in React
	- Create and connect to GET /cafes/:id endpoint
	- Display all cafe details (ambience, study spot availability, coffee rating, location on map)
2.	Polish & Testing
	- Test all features on mobile & desktop
	- Ensure map interactions are smooth
	- Add basic styling for a clean, intuitive UI
	- QA: Catch any bugs before final presentation/demo

---

## Installation 🖱️

1. Clone the repository:
git clone https://github.com/mimschowdhury/mimta-chowdhury-capstone.git
cd mimta-chowdhury capstone

2. Install dependencies
npm install

3. Create a .env file in the root directory with the provided Google Maps API Key and other variables:
VITE_GOOGLE_MAPS_API_KEY=AIzaSyAD6rYOh-u5BF7QXauP1FdKpuEW9WXqHw8

4. Install required packages if not already included in package.json.
npm install react react-dom axios @react-google-maps/api react-router-dom

5. Start the development server:
npm run dev

6. Open your browser and navigate to:
http://localhost:5183

---

## Future Implementations 🌱

<br>🔸 Google Maps API – Enhanced location-based search.
<br>🔸 User Profiles – Custom avatars & personalized themes.
<br>🔸 Friend Lists – Share cafe lists with friends.
<br>🔸 Cafe Submission – Users can recommend new cafes.
<br>🔸 Mobile App – Bring 6ixCafes to iOS & Android.
<br>🔸 Advanced Filters – Filter by Wi-Fi quality, plug availability, etc.
