//API KEY: AIzaSyAD6rYOh-u5BF7QXauP1FdKpuEW9WXqHw8

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
    const [heatmapData, setHeatmapData] = useState([]);
    const mapRef = useRef();
    const autocompleteRef = useRef(null);

    // NEW: State for the search result
    const [searchResult, setSearchResult] = useState(null);

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

    const updateHeatmapData = (map) => {
        if (!map || !window.google.maps) return;
        const data = filteredCafes
            .filter((cafe) => cafe.lat && cafe.lng)
            .map((cafe) => ({
                location: new window.google.maps.LatLng(cafe.lat, cafe.lng),
                weight: Number(cafe.likes) || 1,
            }));
        setHeatmapData(data);
    };

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

    const mapContainerStyle = { height: '600px', width: '100%' };
    const initialCenter = { lat: 43.651070, lng: -79.347015 };

    const onMapLoad = (map) => {
        mapRef.current = map;
        updateHeatmapData(map);

        const input = document.getElementById('search-input');

        const autocomplete = new window.google.maps.places.Autocomplete(input, {
            fields: ['geometry', 'name', 'formatted_address', 'place_id'], // ADDED 'name', 'formatted_address', and 'place_id'
            types: ['establishment'],
        });

        autocompleteRef.current = autocomplete;

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (!place.geometry) {
                console.log("No details available for input: '" + place.name + "'");
                return;
            }

            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            map.panTo({ lat, lng });
            map.setZoom(15);

            // Store the search result, including the place_id
            setSearchResult({
                lat: lat,
                lng: lng,
                name: place.name,
                address: place.formatted_address,
                placeId: place.place_id, // Store the place ID
            });
        });
    };

    useEffect(() => {
        if (mapRef.current) updateHeatmapData(mapRef.current);
    }, [filteredCafes]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <PhotoPageHeader />
            <div className="locationspage">
                <h1 className="locationspage__header">Toronto Cafes</h1>

                <div className="controls__row">
                    <div className="dropdown__filter">
                        <label htmlFor="dropdown__filter-tag">Filter Cafes: </label>
                        <select id="tag" value={selectedTag} onChange={handleTagChange} className="dropdown__filter-menu">
                            <option value="all">All</option>
                            <option value="Ambience">Best Ambiance</option>
                            <option value="Best Baked Goods">Best Baked Goods</option>
                            <option value="Best Coffee">Best Coffee</option>
                            <option value="Brunch">Brunch</option>
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
                            <p className="sidebar__no-results">No cafes found.</p>
                        )}
                    </div>
                    <div className="google__map">
                        <LoadScript
                            googleMapsApiKey="AIzaSyAD6rYOh-u5BF7QXauP1FdKpuEW9WXqHw8"
                            libraries={['visualization', 'places']}
                        >
                            <div className="map-search-container">
                                <input
                                    id="search-input"
                                    type="text"
                                    placeholder="Search for a cafe or location"
                                    className="map-search-input"
                                />
                                <GoogleMap
                                    mapContainerStyle={mapContainerStyle}
                                    center={initialCenter}
                                    zoom={12}
                                    onLoad={onMapLoad}
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

                                    {/* Marker for the search result */}
                                    {searchResult && (
                                        <Marker position={{ lat: searchResult.lat, lng: searchResult.lng }} />
                                    )}

                                    {/* InfoWindow for the search result */}
                                    {searchResult && (
                                        <InfoWindow
                                            position={{ lat: searchResult.lat, lng: searchResult.lng }}
                                            onCloseClick={() => setSearchResult(null)}
                                        >
                                            <div>
                                                <h3>{searchResult.name}</h3>
                                                <p>{searchResult.address}</p>
                                                {/* Add the "View on Google Maps" link */}
                                                {searchResult.placeId && (
                                                    <a
                                                        href={`https://www.google.com/maps/place/?q=place_id:${searchResult.placeId}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        View on Google Maps
                                                    </a>
                                                )}
                                            </div>
                                        </InfoWindow>
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
                            </div>
                        </LoadScript>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LocationsPage;