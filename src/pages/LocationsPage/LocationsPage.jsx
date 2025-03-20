import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, InfoWindow, HeatmapLayer } from '@react-google-maps/api';
import PhotoPageHeader from '../../components/PhotoPageHeader/PhotoPageHeader';
import Footer from '../../components/Footer/Footer';
import './LocationsPage.scss';

const LocationsPage = () => {
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [cafes, setCafes] = useState([]);
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const mapRef = useRef();

  useEffect(() => {
    async function fetchCafes() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/photos`);
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

  useEffect(() => {
    const filtered = selectedTag === 'all'
      ? cafes
      : cafes.filter((cafe) =>
          Array.isArray(cafe.tags) && cafe.tags.some((tag) => {
            const tagName = typeof tag === 'object' && tag.name ? tag.name : tag;
            return tagName === selectedTag;
          })
        );
    setFilteredCafes(filtered);
  }, [selectedTag, cafes]);

  const handleTagChange = (event) => setSelectedTag(event.target.value);

  const handleCafeClick = (cafe) => {
    window.open(`https://www.google.com/maps/place/?q=place_id:${cafe.placeId}`, '_blank');
    setSelectedCafe(cafe);
  };

  const handleMarkerClick = (cafe) => setSelectedCafe(cafe);

  const toggleHeatmap = () => {
    setShowHeatmap((prev) => !prev);
    setSelectedCafe(null);
  };

  const heatmapData = filteredCafes
    .filter((cafe) => cafe.lat && cafe.lng)
    .map((cafe) => ({
      location: new window.google.maps.LatLng(cafe.lat, cafe.lng),
      weight: Number(cafe.likes) || 1,
    }));

  const mapContainerStyle = { height: '600px', width: '100%' }; // Full width within container
  const initialCenter = { lat: 43.651070, lng: -79.347015 };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <PhotoPageHeader />
      <div className="locationspage">
        <h1 className="locationspage__header">Toronto Cafes</h1>

        {/* Filter and Toggle Row */}
        <div className="controls__row">
          <div className="dropdown__filter">
            <label htmlFor="dropdown__filter-tag">Filter Cafes: </label>
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
              <option value="West End Toronto">West End Toronto</option>
            </select>
          </div>

          <div className="heatmap__toggle">
            <label className="toggle__label">
              <input
                type="checkbox"
                checked={showHeatmap}
                onChange={toggleHeatmap}
                className="toggle__input"
              />
              <span className="toggle__slider"></span>
              Show Heatmap
            </label>
          </div>
        </div>

        {/* Sidebar and Map Container */}
        <div className="locationspage__content">
          <div className="sidebar">
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
              <p className="sidebar__no-results">No cafés found.</p>
            )}
          </div>

          <div className="google__map">
            <LoadScript
              googleMapsApiKey="AIzaSyDXFf7ZDhWCXFriQ_OcNYIp50fhvYXOtbo"
              libraries={['visualization']}
            >
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={initialCenter}
                zoom={12}
                onLoad={(map) => (mapRef.current = map)}
              >
                {showHeatmap && heatmapData.length > 0 ? (
                  <HeatmapLayer
                    data={heatmapData}
                    options={{ radius: 20, opacity: 0.6 }}
                  />
                ) : (
                  filteredCafes.map((cafe) =>
                    cafe.lat && cafe.lng ? (
                      <Marker
                        key={cafe.id}
                        position={{ lat: cafe.lat, lng: cafe.lng }}
                        onClick={() => handleMarkerClick(cafe)}
                      />
                    ) : null
                  )
                )}
                {selectedCafe && !showHeatmap && selectedCafe.lat && selectedCafe.lng && (
                  <InfoWindow
                    position={{ lat: selectedCafe.lat, lng: selectedCafe.lng }}
                    onCloseClick={() => setSelectedCafe(null)}
                  >
                    <div className="map__popup">
                      <h3 className="map__popup-cafe">{selectedCafe.photographer}</h3>
                      <p>{selectedCafe.photoDescription}</p>
                      <p>Rating: {selectedCafe.googleRating} ⭐️/5</p>
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