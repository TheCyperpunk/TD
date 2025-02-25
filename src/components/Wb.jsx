import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import './Wastebin.css';

const WastebinLocator = () => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const userMarkerRef = useRef(null);
    const wastebinMarkers = useRef(new Map());
    const routingControlRef = useRef(null);
    const selectedWastebinRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [firstLocationSet, setFirstLocationSet] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [mapMoved, setMapMoved] = useState(false);
    const [wastebinsGenerated, setWastebinsGenerated] = useState(false); // Prevent multiple generations

    useEffect(() => {
        if (!mapInstance.current && mapRef.current) {
            mapInstance.current = L.map(mapRef.current, {
                center: [20, 77],
                zoom: 15,
                minZoom: 15,
                maxZoom: 25,
            });

            const standardView = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap contributors" });
            const satelliteView = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", { attribution: "© Esri" });
            const road3DView = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", { attribution: "© OpenTopoMap" });

            standardView.addTo(mapInstance.current);
            L.control.layers({ "Standard View": standardView, "Satellite View": satelliteView, "3D Road View": road3DView }).addTo(mapInstance.current);

            mapInstance.current.on("dragend", () => setMapMoved(true));

            updateLocation();
        }
    }, []);

    const userIcon = L.icon({ iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", iconSize: [30, 30] });
    const wastebinIcon = L.icon({ iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", iconSize: [30, 30] });

    const updateLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });

                    if (userMarkerRef.current) {
                        userMarkerRef.current.setLatLng([latitude, longitude]);
                    } else {
                        userMarkerRef.current = L.marker([latitude, longitude], { icon: userIcon }).addTo(mapInstance.current);
                    }

                    if (!firstLocationSet) {
                        mapInstance.current.setView([latitude, longitude], 15);
                        setFirstLocationSet(true);
                    }

                    showWastebins(latitude, longitude);
                },
                (error) => console.error("Error getting location:", error),
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const generateRandomWastebins = (centerLat, centerLng, numBins) => {
        let wastebins = new Set();
        let attempts = 0;

        while (wastebins.size < numBins && attempts < 100) {
            let latOffset = (Math.random() - 0.5) * 0.06;
            let lngOffset = (Math.random() - 0.5) * 0.06;
            let newLat = centerLat + latOffset;
            let newLng = centerLng + lngOffset;
            let key = `${newLat.toFixed(5)},${newLng.toFixed(5)}`;

            let distance = calculateDistance(centerLat, centerLng, newLat, newLng);
            if (distance >= 1 && !wastebinMarkers.current.has(key)) {
                wastebins.add({ lat: newLat, lng: newLng, key });
            }
            attempts++;
        }

        return Array.from(wastebins);
    };

    const showWastebins = (lat, lng) => {
        if (wastebinsGenerated) return; // Prevent generating multiple times

        let newWastebins = generateRandomWastebins(lat, lng, 3);

        newWastebins.forEach(({ lat, lng, key }) => {
            if (!wastebinMarkers.current.has(key)) {
                let binMarker = L.marker([lat, lng], { icon: wastebinIcon }).addTo(mapInstance.current);
                binMarker.on("click", () => selectWastebin(lat, lng, binMarker));
                wastebinMarkers.current.set(key, binMarker);
            }
        });

        setWastebinsGenerated(true); // Mark bins as generated
    };

    const selectWastebin = (destLat, destLng, binMarker) => {
        if (selectedWastebinRef.current === binMarker) {
            deselectWastebin();
        } else {
            selectedWastebinRef.current = binMarker;
            updateDirections(destLat, destLng);
        }
    };

    const updateDirections = (destLat, destLng) => {
        if (!userMarkerRef.current) {
            alert("User location not found.");
            return;
        }

        let userLatLng = userMarkerRef.current.getLatLng();

        if (routingControlRef.current) {
            mapInstance.current.removeControl(routingControlRef.current);
        }

        routingControlRef.current = L.Routing.control({
            waypoints: [L.latLng(userLatLng.lat, userLatLng.lng), L.latLng(destLat, destLng)],
            routeWhileDragging: true
        }).addTo(mapInstance.current);
    };

    const deselectWastebin = () => {
        if (routingControlRef.current) {
            mapInstance.current.removeControl(routingControlRef.current);
            routingControlRef.current = null;
        }
        selectedWastebinRef.current = null;
    };

    const moveToUserLocation = () => {
        if (userLocation) {
            mapInstance.current.setView([userLocation.lat, userLocation.lng], 15);
            setMapMoved(false);
        }
    };

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            alert("Please enter a location.");
            return;
        }

        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    let { lat, lon } = data[0];
                    mapInstance.current.setView([lat, lon], 15);
                    showWastebins(lat, lon);
                } else {
                    alert("Location not found.");
                }
            })
            .catch(error => console.error("Error searching location:", error));
    };

    return (
        <div>
            <div className="search-container">
                <input type="text" className="search-input" placeholder="Search for a location..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>
            {mapMoved && <button className="move-button" onClick={moveToUserLocation}>Move to My Location</button>}
            <div ref={mapRef} style={{ height: "500px", width: "100%" }}></div>
        </div>
    );
};

export default WastebinLocator;
