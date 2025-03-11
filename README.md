# Project Title
6ixcafes - your guide to the best cafés in Toronto!

## Overview ☕️

6ixCafes is a platform designed for coffee lovers in Toronto to easily find and keep track of the best cafés in the city. It addresses the pain point of having to look up multiple resources (Google Maps, blogTO, Instagram, etc.) to find a good café. 

This website simplifies café hunting by consolidating information from Google Maps, blogTO, and Instagram into one cozy place—helping you save time and focus on what really matters: enjoying your coffee.

### Problem Space

Finding a good café can be a tedious process involving multiple websites and reviews. People often search through Google Maps, blogs, and social media to find cafes, but there isn’t a single platform that consolidates this information and lets users filter cafés by study-friendly spaces, great ambiance, and quality coffee.


6ixCafes solves this problem by:
<br>✅ Consolidating reliable café data into one easy-to-use platform.
<br>✅ Letting users filter based on study spots, ambiance, and coffee quality.
<br>✅ Helping users keep track of cafés they’ve visited and want to visit.
<br>✅ Offering simple, visual ratings for quick decision-making.

### User Profile

🎯 Target Audience
- Coffee drinkers who:
	- Are looking for a café close to their current or future location
    - Want to find the best places for studying or relaxing
	- Want to track cafés they have visited and rate them
	- Tourists & locals exploring Toronto's cafe scene.

💡 How They’ll Use It:
   - Search & filter cafés based on study spots, ambiance, and coffee quality.
   - Track cafés they’ve visited and rate them.
   - Plan coffee dates or study sessions based on café attributes.
   - Explore nearby cafés based on their current location.

🌿 Special Considerations
   - The platform should be simple and intuitive, without overwhelming the user.
   - The aesthetic should reflect cozy café vibes—neutral colors, soft design, and smooth UX.
   - Provide consistent and accurate data—no fake ratings or reviews.

### Features

	- Find nearby cafés based on the user’s current or provided location
	- Filter cafés based on criteria such as study spots, ambiance, and coffee quality
	- Favourites cafés to create a user-based favourite list
	- View and filter visited cafés by rating, location, etc.

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

<br>1️⃣ Home Page – Browse cafés and explore filters.
<br>2️⃣ Café Details Page – View detailed information about a café.
<br>3️⃣ Visited Cafés Page – Your personalized café list and favourites.
<br>4️⃣ About Page – Info about 6ixCafes and how it works.

### Mockups

	• Home Page: Displays a list of nearby cafés with filtering options.
	• About Page: Detailed information about the website.
	• Café Page: Detailed information and ratings for individual cafés.

Home Page: Displays nearby cafes and offers quick filtering
![Sitemap](./src/assets/mockups/Beige%20Minimalist%20Creative%20Agency%20Website%20Desktop%20Prototype.png)

About Page: Learn about the platform's mission.
![Sitemap](./src/assets/mockups/about.png)

### API Endpoints

**GET /cafes**

- Get cafés, with an optional "visited" if the user is logged in or not
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
- Get detailed information about a single café.

Parameters:
- id: Café id as number

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
	<br>•	Users → who can track and rate cafés.
	<br>•	Cafés → each with multiple attributes (ambience, location, study-friendliness).
	<br>•	Favourites → users’ favourite ratings of cafés.

🔗 Relationships
	<br>•	Users ↔ Favourites ↔ Cafés – Users favourite cafés they’ve visited.
	<br>•	Users ↔ Visited Cafés – Track where they’ve been.

## Roadmap
Week 1: Project Setup + Core Infrastructure

Goal: Set up the foundational client and server, and gather data to seed the app.
1.	Create Client
	- Initialize React project
	- Set up basic routing
	- Create boilerplate pages (Home, Café List, Café Details)
2.	Create Server
	- Set up Express project
	- Add routing structure with placeholder 200 responses
3.	Create Migrations
	- Design database schema
	- Set up migrations for cafés table and any additional fields (ambience, study spots, geolocation, etc.)
4.	Gather Sample Data
	- Research and gather data for 20+ cafés
	- Include geolocations, ambience descriptions, study spot status, and coffee ratings

⸻

Week 2: Data + Basic API Integration

Goal: Seed the database, deploy the project, and create endpoints for listing and viewing cafés.
1.	Create Seeds with Sample Data
	- Insert café data into the database
	- Test database seeding works in dev and production environments
2.	Deploy Projects
	- Deploy React client
	- Deploy Express server.
	- Connect deployed front-end with back-end
3.	Feature: List Cafés from a Given Location
	- Implement List Cafés page in React
	- Add location form to enter/select user location
	- Integrate Google Maps API to display café pins
	- Create and connect to GET /cafes endpoint
	- Filter cafés based on proximity to the given location

⸻

Week 3: Viewing Café Details + Polish

Goal: Implement café details page, fine-tune the user experience, and QA before wrap-up.
1.	Feature: View Café
	- Implement View Café page in React
	- Create and connect to GET /cafes/:id endpoint
	- Display all café details (ambience, study spot availability, coffee rating, location on map)
2.	Polish & Testing
   	- Test all features on mobile & desktop
	- Ensure map interactions are smooth
	- Add basic styling for a clean, intuitive UI
	- QA: Catch any bugs before final presentation/demo

---

## Future Implementations 🌱

<br>🔸 Google Maps API – Enhanced location-based search.
<br>🔸 User Profiles – Custom avatars & personalized themes.
<br>🔸 Friend Lists – Share café lists with friends.
<br>🔸 Café Submission – Users can recommend new cafés.
<br>🔸 Mobile App – Bring 6ixCafes to iOS & Android.
<br>🔸 Advanced Filters – Filter by Wi-Fi quality, plug availability, etc.
