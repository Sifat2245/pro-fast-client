// components/Coverage.jsx

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import { useRef, useState } from "react";

// Custom icon
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Helper component to fly to coords
const FlyToDistrict = ({ coords }) => {
  const map = useMap();
  if (coords) {
    map.flyTo(coords, 13, { duration: 1.5 });
  }
  return null;
};

const Coverage = () => {
  const mapRef = useRef();
  const wareHouses = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCoords, setActiveCoords] = useState(null);
  const [activeDistrict, setActiveDistrict] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const district = wareHouses.find((d) =>
      d.district.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (district) {
      setActiveCoords([district.latitude, district.longitude]);
      setActiveDistrict(district.district);
    }
  };

  return (
    <div className="px-4 md:px-16 py-10 my-24 space-y-8">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
        We are available in <span className="text-[#113b2f]">64 districts</span>
      </h2>

      {/* Search bar */}
      <div className="flex justify-center">
        <form
          onSubmit={handleSearch}
          className="flex items-center w-full max-w-xl bg-white rounded-full border border-gray-300 px-4 py-2 shadow-sm"
        >
          <input
            type="text"
            placeholder="Search here"
            className="flex-grow focus:outline-none text-base px-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#C8E344] hover:bg-[#b0cc2f] text-black px-6 py-2 rounded-full font-semibold"
          >
            Search
          </button>
        </form>
      </div>

      {/* Subheading */}
      <h3 className="text-xl md:text-2xl font-semibold text-center text-gray-700">
        We deliver almost all over Bangladesh
      </h3>

      {/* Map */}
      <div className="w-full h-[600px] rounded-lg overflow-hidden">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={8}
          scrollWheelZoom={false}
          whenCreated={(mapInstance) => {
            mapRef.current = mapInstance;
          }}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Smooth fly to matched district */}
          <FlyToDistrict coords={activeCoords} />

          {/* Markers */}
          {wareHouses?.map((wareHouse, index) => (
            <Marker
              key={index}
              position={[wareHouse.latitude, wareHouse.longitude]}
              icon={customIcon}
            >
              <Popup
                eventHandlers={{
                  add: (e) => {
                    if (wareHouse.district === activeDistrict) {
                      e.target.openPopup();
                    }
                  },
                }}
              >
                <strong>{wareHouse.district}</strong>
                <br />
                {wareHouse.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
