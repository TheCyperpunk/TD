import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom icon for the user's live location (Blue)
const userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Blue location icon
    iconSize: [35, 35],
});

// Custom icon for image locations (Red)
const imageIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684913.png", // Red location icon
    iconSize: [35, 35],
});

// Component to update the map's center & zoom dynamically
const MapUpdater = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
};

const MapWithImages = () => {
    const [images, setImages] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [mapCenter, setMapCenter] = useState([20, 78]); // Default to India (or adjust)
    const [zoom, setZoom] = useState(5); // Default zoom

    useEffect(() => {
        // Fetch images from the backend
        fetch("http://localhost:5000/images")
            .then((res) => res.json())
            .then((data) => setImages(data))
            .catch((err) => console.error("Error fetching images:", err));

        // Get user's live location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                    setMapCenter([latitude, longitude]); // Move map to user
                    setZoom(15); // Zoom in on user
                },
                (error) => console.error("Error getting location:", error)
            );
        }
    }, []);

    return (
        <MapContainer center={mapCenter} zoom={zoom} style={{ height: "500px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapUpdater center={mapCenter} zoom={zoom} />

            {/* User's live location marker (Blue) */}
            {userLocation && (
                <Marker position={[userLocation.latitude, userLocation.longitude]} icon={userIcon}>
                    <Popup>You are here</Popup>
                </Marker>
            )}

            {/* Image locations (Red markers) */}
            {images.map((img, index) => (
                <Marker key={index} position={[img.latitude, img.longitude]} icon={imageIcon}>
                    <Popup>
                        <img src={`http://localhost:5000/uploads/${img.imageUrl}`} alt="Uploaded" width="150px" />
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapWithImages;
