import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

export default function Map() {
    useEffect(() => {
        const map = L.map("map").setView([30.4662, 31.1845], 9);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            noWrap: true
        }).addTo(map);
        
        const customIcon = L.icon({
            iconUrl: markerIcon ,
            shadowUrl: markerShadow ,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        

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

        const cityReportCount = {};
        markers.forEach(({ place }) => {
            cityReportCount[place] = (cityReportCount[place] || 0) + 1;
        });

        markers.forEach(({ lat, lng, place }) => {
            L.marker([lat, lng], { icon: customIcon })
                .addTo(map)
                .bindPopup(`<b>Report</b><br>Location: ${place}`);
        });

        const handleOverlayColor = (reportCount) => {
            if (reportCount > 5) return { color: "red", fillColor: "red" };
            if (reportCount <= 2) return { color: "green", fillColor: "green" };
            if (reportCount <= 5 && reportCount > 2) return { color: "#ff9800", fillColor: "#ffc107" };
            return { color: "blue", fillColor: "lightblue" };
        };

        fetch("/qalyubia.json")
        .then(response => response.json())
        .then(geojsonData => {
            if (!geojsonData || !geojsonData.features) {
                throw new Error("Invalid GeoJSON data for Qalyubia.");
            }

            const qalyubiaReportCount = (cityReportCount["Benha"] || 0) + (cityReportCount["Obour"] || 0);
            const overlayStyle = handleOverlayColor(qalyubiaReportCount);

            L.geoJSON(geojsonData, {
                style: (feature) => ({
                    color: overlayStyle.color,
                    weight: 2,
                    opacity: 0.6,
                    fillColor: overlayStyle.fillColor,
                    fillOpacity: 0.3
                }),
                filter: (feature) => feature.geometry && feature.geometry.type !== "Point"
            }).addTo(map).bindPopup("<b>Qalyubia Governorate</b>");
        })
        .catch(error => console.error("Error loading Qalyubia GeoJSON:", error));

        fetch("/cairo.json")
        .then(response => response.json())
        .then(geojsonData => {
            if (!geojsonData || !geojsonData.features) {
                throw new Error("Invalid GeoJSON data for Cairo.");
            }

            const cairoReportCount = cityReportCount["Nasr City"] || 0;
            const overlayStyle = handleOverlayColor(cairoReportCount);

            L.geoJSON(geojsonData, {
                style: (feature) => ({
                    color: overlayStyle.color,
                    weight: 2,
                    opacity: 0.6,
                    fillColor: overlayStyle.fillColor,
                    fillOpacity: 0.3
                }),
                filter: (feature) => feature.geometry && feature.geometry.type !== "Point"
            }).addTo(map).bindPopup("<b>Cairo Governorate</b>");
        })
        .catch(error => console.error("Error loading Cairo GeoJSON:", error));

        return () => {
            map.remove();
        };
    }, []);

    return (
        <div>
            <div id="map" className="w-full h-[calc(100vh-74px-40px)] relative z-10"></div>
        </div>
    );
}
