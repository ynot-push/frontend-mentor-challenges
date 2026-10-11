import React, { useEffect, useState } from 'react';
import './LocationInfo.css';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from './assets/icon-location.svg';  

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [28, 40],  
  iconAnchor: [16, 32], 
  popupAnchor: [0, -32],
  shadowUrl: null,  
});

function Location({ ipAddress }) {
  const [ipData, setIpData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (ipAddress) {
      axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_hQkdyD1oIQRXCMTUCDVyhaLGMNNWS&ipAddress=${ipAddress}`)
        .then(response => {
          setIpData(response.data);
          setError(null);
        })
        .catch(error => {
          setError('Error fetching IP data. Please check your API key and usage limits.');
          console.error('Error fetching IP data:', error);
        });
    }
  }, [ipAddress]);

  return (
    <>
      <div className="Location">
        {error && <div className="error">{error}</div>}
        <div className="info">
          <p>IP Address</p>
          <h1 id="ipAddress">{ipData ? ipData.ip : '-'}</h1>
        </div>
        <div className="line"></div>
        <div className="info">
          <p>Location</p>
          <h1 id="location">{ipData ? `${ipData.location.city}, ${ipData.location.country}` : '-'}</h1>
        </div>
        <div className="line"></div>
        <div className="info">
          <p>Timezone</p>
          <h1 id="timezone">{ipData ? ipData.location.timezone : '-'}</h1>
        </div>
        <div className="line"></div>
        <div className="info">
          <p>ISP</p>
          <h1 id="isp">{ipData ? ipData.isp : '-'}</h1>
        </div>
      </div>
      {ipData && (
        <div className="map" id="map">
          <MapContainer 
            center={[ipData.location.lat, ipData.location.lng]} 
            zoom={13} 
            style={{ height: "400px", width: "100%" ,zIndex:"0"}}
            key={ipData.ip}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker 
              position={[ipData.location.lat, ipData.location.lng]} 
              icon={customIcon}  // Use the custom SVG icon
            >
              <Popup>
                {ipData.location.city}, {ipData.location.country}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </>
  );
}

export default Location;
