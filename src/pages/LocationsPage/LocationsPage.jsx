import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import PhotoPageHeader from '../../components/PhotoPageHeader/PhotoPageHeader';
import Footer from '../../components/Footer/Footer';
import "./LocationsPage.scss";

const LocationsPage = () => {
  const [selectedTag, setSelectedTag] = useState("all"); // Use "selectedTag" instead of "category"
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [cafes, setCafes] = useState([]);
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef();

  // Fetch cafe data from API
  useEffect(() => {
    async function fetchCafes() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/photos`);
        console.log("Fetched cafes:", response.data);
        setCafes(response.data);
        setFilteredCafes(response.data); // Initially show all cafes
      } catch (error) {
        console.error("Error fetching cafes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCafes();
  }, []);

  // Filter cafes based on selected tag
  useEffect(() => {
    const filtered = selectedTag === "all"
      ? cafes
      : cafes.filter((cafe) => {
          if (!Array.isArray(cafe.tags)) {
            console.warn(`Cafe ID ${cafe.id} has invalid tags:`, cafe.tags);
            return false;
          }
          return cafe.tags.some((tag) => {
            const tagName = typeof tag === "object" && tag.name ? tag.name : tag;
            return tagName === selectedTag; // Match tag name with selectedTag
          });
        });
    console.log("Filtered cafes:", filtered);
    setFilteredCafes(filtered);
  }, [selectedTag, cafes]);

  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };

  const mapContainerStyle = { height: "500px", width: "100%" };
  const initialCenter = { lat: 43.651070, lng: -79.347015 };

  const handleMarkerClick = (cafe) => {
    setSelectedCafe(cafe);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <PhotoPageHeader />
      <div className="locationspage">
        <h1 className="locationspage__header">Locations of our Cafes 📍</h1>

        {/* Filter dropdown */}
        <div className="dropdown__filter">
          <label htmlFor="dropdown__filter-tag">Choose a filter: </label>
          <select id="tag" value={selectedTag} onChange={handleTagChange} className="dropdown__filter-menu">
            <option value="all">All</option>
            <option value="Study Spot">Best Study Spots</option>
            <option value="Ambience">Best Ambiance</option>
            <option value="Best Coffee">Best Coffee</option>
            <option value="Downtown Toronto">Downtown Toronto</option>
            {/* Add more options based on your tags */}
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
              {filteredCafes.map((cafe) => (
                <Marker
                  key={cafe.id}
                  position={{ lat: cafe.lat, lng: cafe.lng }}
                  onClick={() => handleMarkerClick(cafe)}
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