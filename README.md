# Project Title
The Toronto Brew? 6ixcafes?

## Overview

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

- Frontend: React, JavaScript
- Backend: Express, MySQL
- Client libraries: 
    - react
    - react-router
    - axios
- Server libraries:
    - knex
    - express
    - bcrypt for password hashing

### APIs

- No external APIs will be used in the first sprint.

### Sitemap

List the pages of your app with brief descriptions. You can show this visually, or write it out.

### Mockups

	• Home Page: Displays a list of nearby cafés with filtering options.
	• Café Page: Detailed information and ratings for individual cafés.

![Sitemap](./src/assets/mockups/Beige%20Minimalist%20Creative%20Agency%20Website%20Desktop%20Prototype.png)

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
	1. Create client
	•	React project with routes and boilerplate pages
	2. Create server
	•	Express project with routing and placeholder 200 responses
	3. Create migrations
	4. Gather 20+ sample cafés
	5. Include geolocations, ambience descriptions, study spot status, coffee rating (editor-curated)
	6. Create seeds with sample data
	7. Deploy client and server projects
	8. Feature: List cafés from a given location
	•	Implement list cafés page with a location form
	•	Use Google Maps API to display café pins
	•	Create GET /cafes endpoint
	9. Feature: View café
	•	Implement view café page
	•	Create GET /cafes/:id endpoint

---

## Future Implementations
	•	Google Places API integration for better location searches.
	•	Add new cafés by users or café owners.
	•	User achievements: Badges for café visits and ratings.
	•	Expanded rating system: Include coffee, ambiance, and staff ratings.
	•	Unit and integration tests to ensure stability.

