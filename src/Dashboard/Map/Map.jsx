import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// import iconUrl from 'leaflet/dist/images/marker-icon.png';
// import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import { Axios } from '../../API/Axios';
import Skeleton from 'react-loading-skeleton';

// Fix default marker icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
  shadowUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC',
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
  const [reports, setReports] = useState([]);
  const [load , setLoad] = useState(true)
  const [boundriesLoad , setBoundriesLoad] = useState(false)

  useEffect(() => {


    const fetchGeoData = async () => {
      const cachedData = localStorage.getItem("geo-features");
      const cacheTime = localStorage.getItem("geo-features-time");
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
      // Promise.all
      for (const [name, id] of Object.entries(governorates)) {
        const query = `
          [out:json];
          relation(${id});
          out body;
          >;
          out skel qt;
        `;

        try {
          setBoundriesLoad(true)
          const res = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: query,
          });

          const data = await res.json();
          const osmtogeojson = await import('osmtogeojson');
          const geojson = osmtogeojson.default(data);
          setBoundriesLoad(false)
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
      localStorage.setItem("geo-features", JSON.stringify(fetchedFeatures));
      localStorage.setItem("geo-features-time", Date.now().toString());
    };

    const fetchReports = async () => {
      try {
        setLoad(true)
        const res = await Axios.get("/reports");
        setReports(res.data);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
      setLoad(false)
    }

    fetchGeoData();
    fetchReports();
  }, []);

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

        {/* Dynamic Report Markers */}
        {reports.map((report , index) => (
          report.latitude && report.longitude && (
            <Marker 
              key={`report-${report.reportId || index}`} 
              position={[report.latitude, report.longitude]}
              
            >
              <Popup>
                <strong>Report #{report.reportId}</strong><br />
                {report.cityName || "No city name"}<br />
                {report.title || "No title"}
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