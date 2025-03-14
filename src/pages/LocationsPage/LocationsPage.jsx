import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import PhotoPageHeader from '../../components/PhotoPageHeader/PhotoPageHeader';
import Footer from '../../components/Footer/Footer';
import "./LocationsPage.scss";

const LocationsPage = () => {
  const [category, setCategory] = useState("all");
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [cafes, setCafes] = useState([]);
  const [filteredCafes, setFilteredCafes] = useState([]);
  const mapRef = useRef();

  // Fetch cafe data from API
  useEffect(() => {
    async function fetchCafes() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/photos`);
        console.log("Fetched cafes:", response.data);
        setCafes(response.data);
        setFilteredCafes(response.data); // Initial filter (show all cafes)
      } catch (error) {
        console.error("Error fetching cafes:", error);
      }
    }
    fetchCafes();
  }, []);

  // Filter cafes based on category
  useEffect(() => {
    const filtered = cafes.filter(cafe => category === "all" || cafe.category === category);
    setFilteredCafes(filtered);
  }, [category, cafes]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const mapContainerStyle = {
    height: "500px",
    width: "100%"
  };

  const initialCenter = {
    lat: 43.651070, // Default center (Toronto's coordinates)
    lng: -79.347015
  };

  // Function to handle marker click, just show the custom InfoWindow (popup)
  const handleMarkerClick = (cafe) => {
    // Show the InfoWindow with details for the clicked marker
    setSelectedCafe(cafe);
  };

  return (
    <div>
      <PhotoPageHeader />
      <div className="locationspage">
        <h1 className="locationspage__header">Locations of our Cafes 📍</h1>

        {/* Filter dropdown */}
        <div className="filter">
          <label htmlFor="filter__category">Choose a category: </label>
          <select id="category" value={category} onChange={handleCategoryChange}>
            <option value="all">All</option>
            <option value="study">Best Study Spots</option>
            <option value="ambiance">Best Ambiance</option>
            <option value="coffee">Best Coffee</option>
          </select>
        </div>

        {/* Google Map */}
        <div className="google__map">
        <LoadScript googleMapsApiKey="AIzaSyDXFf7ZDhWCXFriQ_OcNYIp50fhvYXOtbo">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={initialCenter}
            zoom={12}
            onLoad={(map) => (mapRef.current = map)}
          >
            {filteredCafes.map(cafe => (
              <Marker
                key={cafe.id}
                position={{ lat: cafe.lat, lng: cafe.lng }}
                onClick={() => handleMarkerClick(cafe)}  // Show InfoWindow when clicking the marker
              />
            ))}

            {selectedCafe && (
              <InfoWindow
                position={{ lat: selectedCafe.lat, lng: selectedCafe.lng }}
                onCloseClick={() => setSelectedCafe(null)}
              >
                <div>
                  <h3>{selectedCafe.photographer}</h3>
                  <p>{selectedCafe.photoDescription}</p>
                  <p>{selectedCafe.googleRating}</p>
                  {/* Link to view on Google Maps */}
                  <a
                    href={`https://www.google.com/maps/place/?q=place_id:${selectedCafe.placeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Google Maps
                  </a>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LocationsPage;