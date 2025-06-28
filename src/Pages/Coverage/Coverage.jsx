// components/Coverage.jsx
import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", 
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  
const LocationMarker = () => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={customIcon}>
      <Popup>
        You marked this location! <br />
        Latitude: {position.lat.toFixed(4)} <br />
        Longitude: {position.lng.toFixed(4)}
      </Popup>
    </Marker>
  );
};

const Coverage = () => {
  
  return (
    <div className="px-4 md:px-16 py-10 my-24 space-y-8">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
        We are available in <span className="text-[#113b2f]">64 districts</span>
      </h2>

      {/* Search bar */}
      <div className="flex justify-center">
        <div className="flex items-center w-full max-w-xl bg-white rounded-full border border-gray-300 px-4 py-2 shadow-sm">
          <input
            type="text"
            placeholder="Search here"
            className="flex-grow focus:outline-none text-base px-2"
          />
          <button className="bg-[#C8E344] hover:bg-[#b0cc2f] text-black px-6 py-2 rounded-full font-semibold">
            Search
          </button>
        </div>
      </div>

      {/* Subheading */}
      <h3 className="text-xl md:text-2xl font-semibold text-center text-gray-700">
        We deliver almost all over Bangladesh
      </h3>

      {/* Map */}
      <div className="w-full h-[400px] rounded-lg overflow-hidden">
        <MapContainer
          center={[23.685, 90.3563]} // Approx center of Bangladesh
          zoom={10}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* You can add <Marker> or <Circle> components here later */}
          <LocationMarker></LocationMarker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
