import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import PhotoPageHeader from '../../components/PhotoPageHeader/PhotoPageHeader';
import Footer from '../../components/Footer/Footer';
import './LocationsPage.scss';

const LocationsPage = () => {
  const [selectedTag, setSelectedTag] = useState('all');
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
        console.log('Fetched cafes:', response.data);
        setCafes(response.data);
        setFilteredCafes(response.data);
      } catch (error) {
        console.error('Error fetching cafes:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCafes();
  }, []);

  // Filter cafes based on selected tag
  useEffect(() => {
    const filtered = selectedTag === 'all'
      ? cafes
      : cafes.filter((cafe) => {
          if (!Array.isArray(cafe.tags)) {
            console.warn(`Cafe ID ${cafe.id} has invalid tags:`, cafe.tags);
            return false;
          }
          return cafe.tags.some((tag) => {
            const tagName = typeof tag === 'object' && tag.name ? tag.name : tag;
            return tagName === selectedTag;
          });
        });
    console.log('Filtered cafes:', filtered);
    setFilteredCafes(filtered);
  }, [selectedTag, cafes]);

  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };

  const handleCafeClick = (cafe) => {
    window.open(`https://www.google.com/maps/place/?q=place_id:${cafe.placeId}`, '_blank');
    setSelectedCafe(cafe);
  };

  const mapContainerStyle = { height: '500px', width: '70%' };
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
            <option value="Ambience">Best Ambiance</option>
            <option value="Best Baked Goods">Best Baked Goods</option>
            <option value="Best Coffee">Best Coffee</option>
            <option value="Study Spot">Best Study Spots</option>
            <option value="Downtown Toronto">Downtown Toronto</option>
            <option value="East York">East York</option>
            <option value="North York">North York</option>
            <option value="Scarborough">Scarborough</option>
          </select>
        </div>

        {/* Main content with sidebar and map */}
        <div className="locationspage__content">
          {/* Sidebar */}
          <div className="sidebar">
            <h2 className="sidebar__heading">Filtered Cafes</h2>
            {filteredCafes.length > 0 ? (
              <div className="sidebar__cafes">
                {filteredCafes.map((cafe) => (
                  <div
                    key={cafe.id}
                    className="sidebar__cafe-card"
                    onClick={() => handleCafeClick(cafe)}
                  >
                    <div className="sidebar__cafe-text">
                      <h3 className="sidebar__cafe-name">{cafe.photographer}</h3>
                      <p className="sidebar__cafe-rating">⭐️ {cafe.googleRating} / 5</p>
                      <p className="sidebar__cafe-description">{cafe.likes}</p>
                    </div>
                    <img
                      src={cafe.photo}
                      alt={`${cafe.photographer}'s cafe`}
                      className="sidebar__cafe-photo"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="sidebar__no-results">No cafes found for this filter.</p>
            )}
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
                    <div className="map__popup">
                      <h3>{selectedCafe.photographer}</h3>
                      <p>{selectedCafe.photoDescription}</p>
                      <p>{selectedCafe.googleRating} ⭐️/5</p>
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
      </div>
      <Footer />
    </div>
  );
};

export default LocationsPage;