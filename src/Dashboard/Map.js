import { useEffect } from "react";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css"; // Import Leaflet styles
import markerIcon from "leaflet/dist/images/marker-icon.png"; // Import marker icon
import markerShadow from "leaflet/dist/images/marker-shadow.png"; // Import marker shadow

export default function Map() {
    useEffect(() => {
        // Initialize map
        const map = L.map("map").setView([30.4662, 31.1845], 9); // Centered on Banha/Qalyubia with zoom 9

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            noWrap: true // Prevents map from repeating when zooming out
        }).addTo(map);
        
        // Custom marker icon
        const customIcon = L.icon({
            iconUrl: markerIcon ,
            shadowUrl: markerShadow ,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        

        // Markers data for reports
        const markers = [
            { lat: 30.4674, lng: 31.1848, place: "Benha" },
            { lat: 30.4674, lng: 31.1848, place: "Benha" },
            { lat: 30.0561, lng: 31.3302, place: "Nasr City" },
            { lat: 30.2234, lng: 31.4712, place: "Obour" },
            { lat: 30.3104, lng: 31.2189, place: "Shibin El Kom" },
            { lat: 30.2456, lng: 31.4675, place: "Kafr Shokr" },
            { lat: 30.3445, lng: 31.1604, place: "Tukh" },
            { lat: 30.2421, lng: 31.3045, place: "Qalyub" },
            { lat: 30.3247, lng: 31.2352, place: "Banha" },
            { lat: 30.0674, lng: 31.3200, place: "Helwan" },
            { lat: 30.0444, lng: 31.2357, place: "Downtown Cairo" }
        ];

        // Count reports per city
        const cityReportCount = {};
        markers.forEach(({ place }) => {
            cityReportCount[place] = (cityReportCount[place] || 0) + 1;
        });

        // Add markers to the map for reports
        markers.forEach(({ lat, lng, place }) => {
            L.marker([lat, lng], { icon: customIcon })
                .addTo(map)
                .bindPopup(`<b>Report</b><br>Location: ${place}`);
        });

        // Function to handle overlay colors based on reports
        const handleOverlayColor = (reportCount) => {
            if (reportCount > 5) return { color: "red", fillColor: "red" };
            if (reportCount <= 2) return { color: "green", fillColor: "green" };
            if (reportCount <= 5 && reportCount > 2) return { color: "#ff9800", fillColor: "#ffc107" };
            return { color: "blue", fillColor: "lightblue" }; // Default case
        };

        // Load and display Qalyubia GeoJSON boundary (no markers for governorate)
        fetch("/qalyubia.json") // Load from public folder
        .then(response => response.json())
        .then(geojsonData => {
            const qalyubiaReportCount = cityReportCount["Benha"] + cityReportCount["Obour"] || 0; // Get report count for Qalyubia
            const overlayStyle = handleOverlayColor(qalyubiaReportCount);

            // Only add polygons and prevent adding unwanted markers
            L.geoJSON(geojsonData, {
                style: {
                    color: overlayStyle.color,
                    weight: 2,
                    opacity: 0.6,
                    fillColor: overlayStyle.fillColor,
                    fillOpacity: 0.3
                },
                // Filter out unwanted marker features from GeoJSON (e.g., if there's a point geometry)
                filter: (feature) => feature.geometry.type !== 'Point' // Only allow features that are not points
            }).addTo(map).bindPopup("<b>Qalyubia Governorate</b>");
        })
        .catch(error => console.error("Error loading Qalyubia GeoJSON:", error));

        // Load and display Cairo GeoJSON boundary (no markers for governorate)
        fetch("/cairo.json") // Load from public folder
        .then(response => response.json())
        .then(geojsonData => {
            const cairoReportCount = cityReportCount["Nasr City"] || 0; // Get report count for Cairo
            const overlayStyle = handleOverlayColor(cairoReportCount);

            // Only add polygons and prevent adding unwanted markers
            L.geoJSON(geojsonData, {
                style: {
                    color: overlayStyle.color,
                    weight: 2,
                    opacity: 0.6,
                    fillColor: overlayStyle.fillColor,
                    fillOpacity: 0.3
                },
                // Filter out unwanted marker features from GeoJSON (e.g., if there's a point geometry)
                filter: (feature) => feature.geometry.type !== 'Point' // Only allow features that are not points
            }).addTo(map).bindPopup("<b>Cairo Governorate</b>");
        })
        .catch(error => console.error("Error loading Cairo GeoJSON:", error));

        return () => {
            map.remove(); // Cleanup map on unmount
        };
    }, []);

    return (
        <div>
            <div id="map" className="w-full h-[calc(100vh-74px-40px)]"></div>
        </div>
    );
}
