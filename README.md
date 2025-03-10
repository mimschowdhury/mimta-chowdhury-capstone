# Project Title
The Toronto Brew? 6ixcafes?

## Overview ☕️

6ixCafes is a platform designed for coffee lovers in Toronto to easily find and keep track of the best cafés in the city. It addresses the pain point of having to look up multiple resources (Google Maps, blogTO, Instagram, etc.) to find a good café. This website will filter cafés based on the best study spots, ambiance, and coffee quality.

### Problem Space

Finding a good café can be a tedious process involving multiple websites and reviews. People often search through Google Maps, blogs, and social media to find cafes, but there isn’t a single platform that consolidates this information and lets users filter cafés by study-friendly spaces, great ambiance, and quality coffee.

### User Profile

- Coffee drinkers who:
	- Are looking for a café close to their current or future location
    - Want to find the best places for studying or relaxing
	- Want to track cafés they have visited and rate them

### Features

	- Find nearby cafés based on the user’s current or provided location
	- Filter cafés based on criteria such as study spots, ambiance, and coffee quality
	- Rate cafés out of 5 coffee cups for ambiance, study-friendliness, and coffee
	- Update ratings for cafes based on future visits
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

### APIs

- No external APIs will be used in the first sprint.

### Sitemap

List the pages of my app with brief descriptions. Create mockups using Canva.

### Mockups

	• Home Page: Displays a list of nearby cafés with filtering options.
	• About Page: Detailed information about the website.
	• Café Page: Detailed information and ratings for individual cafés.

![Sitemap](./src/assets/mockups/Beige%20Minimalist%20Creative%20Agency%20Website%20Desktop%20Prototype.png)

About Page
![Sitemap](./src/assets/mockups/about.png)

### Endpoints

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
5.	Create Seeds with Sample Data
	- Insert café data into the database
	- Test database seeding works in dev and production environments
6.	Deploy Projects
	- Deploy React client
	- Deploy Express server.
	- Connect deployed front-end with back-end
7.	Feature: List Cafés from a Given Location
	- Implement List Cafés page in React
	- Add location form to enter/select user location
	- Integrate Google Maps API to display café pins
	- Create and connect to GET /cafes endpoint
	- Filter cafés based on proximity to the given location

⸻

Week 3: Viewing Café Details + Polish

Goal: Implement café details page, fine-tune the user experience, and QA before wrap-up.
8.	Feature: View Café
	- Implement View Café page in React
	- Create and connect to GET /cafes/:id endpoint
	- Display all café details (ambience, study spot availability, coffee rating, location on map)
9.	Polish & Testing
	- Test all features on mobile & desktop
	- Ensure map interactions are smooth
	- Add basic styling for a clean, intuitive UI
	- QA: Catch any bugs before final presentation/demo

---

## Future Implementations
	•	Google Places API integration for better location searches.
	•	Add new cafés by users or café owners.
	•	User achievements: Badges for café visits and ratings.
	•	Expanded rating system: Include coffee, ambiance, and staff ratings.
	•	Unit and integration tests to ensure stability.