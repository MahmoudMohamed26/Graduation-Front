import React, { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import { Axios } from '../../API/Axios';
import Skeleton from 'react-loading-skeleton';
import dateFormater from '../../helpers/DateFormater';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Context/AuthContext';

// Fix default marker icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});

const customMarker = new L.Icon({
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const governorates = {
  "Cairo": 4103336,
  "Giza": 3824206,
  "Alexandria": 3061846,
  "Qalyubia": 4103337,
  "Sharqia": 4103407,
  "Dakahlia": 4103403,
  "Beheira": 3824513,
  "Kafr El Sheikh": 4103405,
  "Gharbia": 3584607,
  "Monufia": 3824207,
  "Faiyum": 3726124,
  "Beni Suef": 3726170,
  "Minya": 3726175,
  "Assiut": 3726184,
  "Sohag": 3726186,
  "Qena": 3726189,
  "Luxor": 3726211,
  "Aswan": 3061757,
  "Red Sea": 3061758,
  "New Valley": 3061827,
  "Matrouh": 3061826,
  "North Sinai": 3060792,
  "South Sinai": 3060793,
  "Port Said": 4103406,
  "Suez": 3062185,
  "Ismailia": 3062184,
  "Damietta": 4103404
};

const governorateNameMap = {
  "القاهرة": "Cairo",
  "الجيزة": "Giza",
  "الإسكندرية": "Alexandria",
  "القليوبية": "Qalyubia",
  "الشرقية": "Sharqia",
  "الدقهلية": "Dakahlia",
  "البحيرة": "Beheira",
  "كفر الشيخ": "Kafr El Sheikh",
  "الغربية": "Gharbia",
  "المنوفية": "Monufia",
  "الفيوم": "Faiyum",
  "بني سويف": "Beni Suef",
  "المنيا": "Minya",
  "أسيوط": "Assiut",
  "سوهاج": "Sohag",
  "قنا": "Qena",
  "الأقصر": "Luxor",
  "أسوان": "Aswan",
  "البحر الأحمر": "Red Sea",
  "الوادي الجديد": "New Valley",
  "مطروح": "Matrouh",
  "شمال سيناء": "North Sinai",
  "جنوب سيناء": "South Sinai",
  "بورسعيد": "Port Said",
  "السويس": "Suez",
  "الإسماعيلية": "Ismailia",
  "دمياط": "Damietta"
};

const handleOverlayColor = (reportCount) => {
  if (reportCount > 16) return { color: "#D0302C", fillColor: "#990E03" };
  if (reportCount <= 5) return { color: "green", fillColor: "green" };
  if (reportCount <= 16 && reportCount > 5) return { color: "#ff9800", fillColor: "#ffc107" };
  return { color: "blue", fillColor: "lightblue" };
};

const Map = () => {
  const [features, setFeatures] = useState([]);
  const [boundriesLoad , setBoundriesLoad] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    document.title = "CivicEye | الخريطة";

    const fetchGeoData = async () => {
      // Determine which governorates to fetch based on user
      let governoratesToFetch = governorates;
      
      if (user?.governorateName) {
        // Convert Arabic governorate name to English if needed
        const englishGovName = governorateNameMap[user.governorateName] || user.governorateName;
        const governorateId = governorates[englishGovName];
        
        if (governorateId) {
          governoratesToFetch = { [englishGovName]: governorateId };
        } else {
          console.warn(`Governorate not found: ${user.governorateName} (${englishGovName})`);
          governoratesToFetch = governorates; // Fallback to all governorates
        }
      }

      // Create cache key based on user's governorate (use English name for consistency)
      const englishGovForCache = user?.governorateName 
        ? (governorateNameMap[user.governorateName] || user.governorateName)
        : null;
      
      const cacheKey = englishGovForCache 
        ? `geo-features-${englishGovForCache}`
        : "geo-features";
      const cacheTimeKey = englishGovForCache 
        ? `geo-features-time-${englishGovForCache}`
        : "geo-features-time";

      const cachedData = localStorage.getItem(cacheKey);
      const cacheTime = localStorage.getItem(cacheTimeKey);
      const cacheValid = cachedData && cacheTime && (Date.now() - Number(cacheTime) < 24 * 60 * 60 * 1000);

      let dynamicCounts = {};

      try {
        const response = await Axios.get("/reports/countbygovernorate");
        const data = response.data;
        data.forEach(item => {
          const engName = governorateNameMap[item.name];
          if (engName) {
            dynamicCounts[engName] = item.count;
          }
        });
      } catch (err) {
        console.error("Error fetching report counts:", err);
      }

      if (cacheValid) {
        const parsed = JSON.parse(cachedData);
        // Filter to only include polygon features (no points/markers)
        const filteredFeatures = parsed.filter(f => 
          f.geometry.type === 'Polygon' || 
          f.geometry.type === 'MultiPolygon'
        );
        
        filteredFeatures.forEach(f => {
          const name = f.properties.name;
          f.properties.reportCount = dynamicCounts[name] || 0;
        });
        
        setFeatures(filteredFeatures);
        return;
      }

      const fetchedFeatures = [];
      
      // Fetch only the required governorates
      for (const [name, id] of Object.entries(governoratesToFetch)) {
        const query = `
          [out:json];
          relation(${id});
          out body;
          >;
          out skel qt;
        `;

        try {
          setBoundriesLoad(true);
          const res = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: query,
          });

          const data = await res.json();
          const osmtogeojson = await import('osmtogeojson');
          const geojson = osmtogeojson.default(data);
          setBoundriesLoad(false);
          
          // Filter to only include polygon features
          const polygonFeatures = geojson.features.filter(f => 
            f.geometry.type === 'Polygon' || 
            f.geometry.type === 'MultiPolygon'
          );

          polygonFeatures.forEach((f) => {
            f.properties.name = name;
            f.properties.reportCount = dynamicCounts[name] || 0;
          });

          fetchedFeatures.push(...polygonFeatures);
        } catch (err) {
          console.error(`Error loading ${name}:`, err);
        }
      }

      setFeatures(fetchedFeatures);
      localStorage.setItem(cacheKey, JSON.stringify(fetchedFeatures));
      localStorage.setItem(cacheTimeKey, Date.now().toString());
    };

    fetchGeoData();
  }, [user?.governorateName]); // Re-run when user's governorate changes

  const fetchReports = async () => {
    const res = await Axios.get(`/reports/allReportsWithOutClosedAndCancelled`);
    return res.data;
  };
    
  const { data: allReports, isLoading: load } = useQuery({
    queryKey: ['allReports'],
    queryFn: fetchReports,
    staleTime: 1000 * 60
  });

  // Filter reports based on user's city and governorate
  const filteredReports = React.useMemo(() => {
    if (!allReports) return [];
    
    // If no user or no location restrictions, return all reports
    if (!user || (!user.cityName && !user.governorateName)) {
      return allReports;
    }

    return allReports.filter(report => {
      // If user has cityName, filter by city
      if (user.cityName) {
        return report.cityName === user.cityName;
      }
      
      // If user has governorateName but no cityName, filter by governorate
      if (user.governorateName) {
        return report.governorateName === user.governorateName;
      }
      
      return true;
    });
    // eslint-disable-next-line
  }, [allReports, user?.cityName, user?.governorateName]);

  const onEachFeature = (feature, layer) => {
    const { name, reportCount } = feature.properties;
    const content = `<strong>${name}</strong><br/>Reports: ${reportCount}`;
    layer.on({
      click: () => layer.bindPopup(content).openPopup()
    });
  };

  return (
    load || boundriesLoad ? <>
      <Skeleton count={1} className="dark:[--base-color:_#202020_!important] dark:[--highlight-color:_#444_!important]" height={850} width="100%"/>
    </> 
    : <div className='relative z-10'>
        <MapContainer className='outline-none' center={[29.8206, 30.8025]} zoom={8} style={{ height: 'calc(100vh - 114px)', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a> & OpenStreetMap contributors'
          url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
          noWrap={true}
        />

        {/* Dynamic Report Markers - Now filtered */}
        {filteredReports.map((report, index) => (
          report.latitude && report.longitude && (
            <Marker 
              key={`report-${report.reportId || index}`} 
              position={[report.latitude, report.longitude]}
              icon={customMarker}
            >
              <Popup>
                <p><strong>رقم الشكوى: </strong>{report.reportId}</p>
                <p><strong>تاريخ الإنشاء: </strong>{dateFormater(report.createdAt) || "No city name"}</p>
                <p><strong>موضوع الشكوى: </strong>{report.title || "No title"}</p>
                <Link to={`/dashboard/reports/${report.reportId}`} className='text-blue-500 block mt-3 hover:underline'>عرض التفاصيل</Link>
              </Popup>
            </Marker>
          )
        ))}

        {/* Governorate Overlays - Polygons Only */}
        {features.map((feature, idx) => (
          <GeoJSON
            key={`geo-${idx}`}
            data={feature}
            style={() => {
              const { color, fillColor } = handleOverlayColor(feature.properties.reportCount);
              return {
                color: color,
                weight: 2,
                opacity: 0.6,
                fillColor: fillColor,
                fillOpacity: 0.3
              };
            }}
            onEachFeature={onEachFeature}
            pointToLayer={null}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;