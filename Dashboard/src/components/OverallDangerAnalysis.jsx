import { useState } from "react";
import { MapPin, AlertTriangle, X } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Mock Data - Northeast India Tourist Danger Incidents
const allIncidents = [
  {
    id: 1,
    type: "SOS",
    touristId: "T-501",
    message: "Emergency at Cherrapunji waterfall - tourist injured in fall",
    priority: "Critical",
    timestamp: "2025-01-20 14:25",
    location: { lat: 25.3000, lng: 91.7000, name: "Cherrapunji, Meghalaya" },
  },
  {
    id: 2,
    type: "Voice",
    touristId: "T-302",
    message: "Distress call from Kaziranga - lost in forest area",
    priority: "High",
    timestamp: "2025-01-20 13:55",
    location: { lat: 26.5000, lng: 93.4000, name: "Kaziranga, Assam" },
  },
  {
    id: 3,
    type: "Text",
    touristId: "T-410",
    message: "Help! Being followed by suspicious person in Shillong",
    priority: "High",
    timestamp: "2025-01-20 13:40",
    location: { lat: 25.5788, lng: 91.8933, name: "Shillong, Meghalaya" },
  },
  {
    id: 4,
    type: "Voice",
    touristId: "T-215",
    message: "Medical emergency at Tawang monastery",
    priority: "Critical",
    timestamp: "2025-01-20 13:10",
    location: { lat: 27.5900, lng: 91.8700, name: "Tawang, Arunachal Pradesh" },
  },
  {
    id: 5,
    type: "SOS",
    touristId: "T-600",
    message: "Theft incident at Kohima market - tourist robbed",
    priority: "High",
    timestamp: "2025-01-20 12:55",
    location: { lat: 25.6700, lng: 94.1100, name: "Kohima, Nagaland" },
  },
  {
    id: 6,
    type: "Text",
    touristId: "T-720",
    message: "Lost in Manipur hills - need immediate rescue",
    priority: "High",
    timestamp: "2025-01-20 12:30",
    location: { lat: 24.8167, lng: 93.9500, name: "Imphal, Manipur" },
  },
  {
    id: 7,
    type: "Voice",
    touristId: "T-850",
    message: "Emergency at Majuli Island - boat accident",
    priority: "Critical",
    timestamp: "2025-01-20 12:15",
    location: { lat: 26.9500, lng: 94.2000, name: "Majuli, Assam" },
  },
  {
    id: 8,
    type: "Text",
    touristId: "T-920",
    message: "Minor injury at Mizoram trekking trail",
    priority: "Low",
    timestamp: "2025-01-20 11:45",
    location: { lat: 23.7300, lng: 92.7200, name: "Aizawl, Mizoram" },
  },
  {
    id: 9,
    type: "SOS",
    touristId: "T-150",
    message: "Emergency at Tripura palace - tourist collapsed",
    priority: "Critical",
    timestamp: "2025-01-20 11:20",
    location: { lat: 23.8300, lng: 91.2800, name: "Agartala, Tripura" },
  },
  {
    id: 10,
    type: "Voice",
    touristId: "T-340",
    message: "Distress call from Guwahati - harassment incident",
    priority: "High",
    timestamp: "2025-01-20 10:55",
    location: { lat: 26.1445, lng: 91.7362, name: "Guwahati, Assam" },
  },
];

// Priority color scheme
const priorityColors = {
  Critical: "bg-red-600 text-white",
  High: "bg-orange-500 text-white",
  Medium: "bg-yellow-400 text-black",
  Low: "bg-green-500 text-white",
};

// Marker icons for different priorities
const getMarkerIcon = (priority) => {
  const colorMap = {
    Critical: "red",
    High: "orange",
    Low: "green",
    Medium: "yellow",
  };
  return L.icon({
    iconUrl: `https://maps.google.com/mapfiles/ms/icons/${colorMap[priority]}-dot.png`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

const OverallDangerAnalysis = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Sort incidents by priority (Critical > High > Medium > Low)
  const sortedIncidents = [...allIncidents].sort((a, b) => {
    const order = { Critical: 1, High: 2, Medium: 3, Low: 4 };
    return order[a.priority] - order[b.priority];
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <AlertTriangle className="text-red-500" /> Overall Danger Analysis
      </h1>

      {/* Big Map with React-Leaflet */}
      <div className="w-full h-[600px] rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <MapContainer center={[25.5, 92.5]} zoom={6} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {allIncidents.map((incident) => (
            <Marker
              key={incident.id}
              position={[incident.location.lat, incident.location.lng]}
              icon={getMarkerIcon(incident.priority)}
              eventHandlers={{
                click: () => setSelectedLocation(incident.location),
              }}
            >
              <Popup>
                <strong>{incident.touristId}</strong>
                <br />
                {incident.message}
                <br />
                <em>{incident.location.name}</em>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Incidents List */}
      <div className="grid md:grid-cols-2 gap-6">
        {sortedIncidents.map((incident) => (
          <div
            key={incident.id}
            className="bg-white shadow-md rounded-xl p-5 space-y-3 border border-gray-200"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">
                Tourist ID: {incident.touristId}
              </span>
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  priorityColors[incident.priority]
                }`}
              >
                {incident.priority}
              </span>
            </div>

            {/* Details */}
            <p className="text-gray-700 text-sm">{incident.message}</p>
            <p className="text-xs text-gray-500">Sent: {incident.timestamp}</p>

            {/* Location */}
            <div className="flex items-center gap-1 text-gray-600 text-xs">
              <MapPin size={12} />
              <span>{incident.location.name}</span>
            </div>

            {/* Type & Action */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Source: {incident.type}
              </span>
              <button
                className="flex items-center gap-1 text-blue-600 hover:underline text-xs"
                onClick={() => setSelectedLocation(incident.location)}
              >
                <MapPin size={14} /> View on Map
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Location Popup */}
      {selectedLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl relative">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Incident Location
                </h2>
                <p className="text-sm text-gray-600">
                  {selectedLocation.name} • Northeast India
                </p>
              </div>
              <button
                className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                onClick={() => setSelectedLocation(null)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <div className="bg-gray-50 rounded p-3 mb-3">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-medium text-gray-600">Latitude:</span>
                    <span className="ml-2 text-gray-800">
                      {selectedLocation.lat.toFixed(4)}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Longitude:</span>
                    <span className="ml-2 text-gray-800">
                      {selectedLocation.lng.toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>
              <MapContainer
                center={[selectedLocation.lat, selectedLocation.lng]}
                zoom={12}
                className="h-[450px] w-full rounded border border-gray-200"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  position={[selectedLocation.lat, selectedLocation.lng]}
                  icon={getMarkerIcon("Critical")}
                />
              </MapContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverallDangerAnalysis;

// import { useState } from "react";
// import { MapPin, AlertTriangle, X } from "lucide-react";

// // Mock Data - Northeast India Tourist Danger Incidents
// const allIncidents = [
//   {
//     id: 1,
//     type: "SOS",
//     touristId: "T-501",
//     message: "Emergency at Cherrapunji waterfall - tourist injured in fall",
//     priority: "Critical",
//     timestamp: "2025-01-20 14:25",
//     location: { lat: 25.3000, lng: 91.7000, name: "Cherrapunji, Meghalaya" },
//   },
//   {
//     id: 2,
//     type: "Voice",
//     touristId: "T-302",
//     message: "Distress call from Kaziranga - lost in forest area",
//     priority: "High",
//     timestamp: "2025-01-20 13:55",
//     location: { lat: 26.5000, lng: 93.4000, name: "Kaziranga, Assam" },
//   },
//   {
//     id: 3,
//     type: "Text",
//     touristId: "T-410",
//     message: "Help! Being followed by suspicious person in Shillong",
//     priority: "High",
//     timestamp: "2025-01-20 13:40",
//     location: { lat: 25.5788, lng: 91.8933, name: "Shillong, Meghalaya" },
//   },
//   {
//     id: 4,
//     type: "Voice",
//     touristId: "T-215",
//     message: "Medical emergency at Tawang monastery",
//     priority: "Critical",
//     timestamp: "2025-01-20 13:10",
//     location: { lat: 27.5900, lng: 91.8700, name: "Tawang, Arunachal Pradesh" },
//   },
//   {
//     id: 5,
//     type: "SOS",
//     touristId: "T-600",
//     message: "Theft incident at Kohima market - tourist robbed",
//     priority: "High",
//     timestamp: "2025-01-20 12:55",
//     location: { lat: 25.6700, lng: 94.1100, name: "Kohima, Nagaland" },
//   },
//   {
//     id: 6,
//     type: "Text",
//     touristId: "T-720",
//     message: "Lost in Manipur hills - need immediate rescue",
//     priority: "High",
//     timestamp: "2025-01-20 12:30",
//     location: { lat: 24.8167, lng: 93.9500, name: "Imphal, Manipur" },
//   },
//   {
//     id: 7,
//     type: "Voice",
//     touristId: "T-850",
//     message: "Emergency at Majuli Island - boat accident",
//     priority: "Critical",
//     timestamp: "2025-01-20 12:15",
//     location: { lat: 26.9500, lng: 94.2000, name: "Majuli, Assam" },
//   },
//   {
//     id: 8,
//     type: "Text",
//     touristId: "T-920",
//     message: "Minor injury at Mizoram trekking trail",
//     priority: "Low",
//     timestamp: "2025-01-20 11:45",
//     location: { lat: 23.7300, lng: 92.7200, name: "Aizawl, Mizoram" },
//   },
//   {
//     id: 9,
//     type: "SOS",
//     touristId: "T-150",
//     message: "Emergency at Tripura palace - tourist collapsed",
//     priority: "Critical",
//     timestamp: "2025-01-20 11:20",
//     location: { lat: 23.8300, lng: 91.2800, name: "Agartala, Tripura" },
//   },
//   {
//     id: 10,
//     type: "Voice",
//     touristId: "T-340",
//     message: "Distress call from Guwahati - harassment incident",
//     priority: "High",
//     timestamp: "2025-01-20 10:55",
//     location: { lat: 26.1445, lng: 91.7362, name: "Guwahati, Assam" },
//   },
// ];

// // Priority color scheme
// const priorityColors = {
//   Critical: "bg-red-600 text-white",
//   High: "bg-orange-500 text-white",
//   Medium: "bg-yellow-400 text-black",
//   Low: "bg-green-500 text-white",
// };

// const OverallDangerAnalysis = () => {
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   // Sort incidents by priority (Critical > High > Medium > Low)
//   const sortedIncidents = [...allIncidents].sort((a, b) => {
//     const order = { Critical: 1, High: 2, Medium: 3, Low: 4 };
//     return order[a.priority] - order[b.priority];
//   });

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold flex items-center gap-2">
//         <AlertTriangle className="text-red-500" /> Overall Danger Analysis
//       </h1>

//       {/* Big Map - Northeast India Focus */}
//       <div className="w-full h-[600px] rounded-lg shadow-lg overflow-hidden border border-gray-200">
//         <iframe
//           src="https://www.openstreetmap.org/export/embed.html?bbox=89.0,22.0,97.0,30.0&layer=mapnik"
//           width="100%"
//           height="100%"
//           style={{ border: "0" }}
//           allowFullScreen=""
//           loading="lazy"
//         ></iframe>
//       </div>
      
//       {/* Map Legend */}
//       <div className="bg-white border border-gray-200 rounded-lg p-4">
//         <h3 className="text-lg font-semibold mb-3">Incident Locations on Map</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <h4 className="font-medium text-gray-800 mb-2">Critical Incidents (Red)</h4>
//             <div className="space-y-1">
//               {allIncidents.filter(incident => incident.priority === 'Critical').map(incident => (
//                 <div key={incident.id} className="flex items-center gap-2 text-sm">
//                   <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//                   <span className="text-gray-700">{incident.touristId} - {incident.location.name}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div>
//             <h4 className="font-medium text-gray-800 mb-2">High Priority Incidents (Orange)</h4>
//             <div className="space-y-1">
//               {allIncidents.filter(incident => incident.priority === 'High').map(incident => (
//                 <div key={incident.id} className="flex items-center gap-2 text-sm">
//                   <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
//                   <span className="text-gray-700">{incident.touristId} - {incident.location.name}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Incidents List */}
//       <div className="grid md:grid-cols-2 gap-6">
//         {sortedIncidents.map((incident) => (
//           <div
//             key={incident.id}
//             className="bg-white shadow-md rounded-xl p-5 space-y-3 border border-gray-200"
//           >
//             {/* Header */}
//             <div className="flex justify-between items-center">
//               <span className="font-semibold text-gray-800">
//                 Tourist ID: {incident.touristId}
//               </span>
//               <span
//                 className={`px-3 py-1 text-xs rounded-full ${
//                   priorityColors[incident.priority]
//                 }`}
//               >
//                 {incident.priority}
//               </span>
//             </div>

//             {/* Details */}
//             <p className="text-gray-700 text-sm">{incident.message}</p>
//             <p className="text-xs text-gray-500">Sent: {incident.timestamp}</p>
            
//             {/* Location */}
//             <div className="flex items-center gap-1 text-gray-600 text-xs">
//               <MapPin size={12} />
//               <span>{incident.location.name}</span>
//             </div>

//             {/* Type & Action */}
//             <div className="flex items-center justify-between">
//               <span className="text-xs text-gray-500">
//                 Source: {incident.type}
//               </span>
//               <button
//                 className="flex items-center gap-1 text-blue-600 hover:underline text-xs"
//                 onClick={() => setSelectedLocation(incident.location)}
//               >
//                 <MapPin size={14} /> View on Map
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Location Popup */}
//       {selectedLocation && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl relative">
//             <div className="flex items-center justify-between p-4 border-b border-gray-200">
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-800">Incident Location</h2>
//                 <p className="text-sm text-gray-600">{selectedLocation.name} • Northeast India</p>
//               </div>
//               <button
//                 className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
//                 onClick={() => setSelectedLocation(null)}
//               >
//                 <X size={20} />
//               </button>
//             </div>
//             <div className="p-4">
//               <div className="bg-gray-50 rounded p-3 mb-3">
//                 <div className="grid grid-cols-2 gap-4 text-xs">
//                   <div>
//                     <span className="font-medium text-gray-600">Latitude:</span>
//                     <span className="ml-2 text-gray-800">{selectedLocation.lat.toFixed(4)}</span>
//                   </div>
//                   <div>
//                     <span className="font-medium text-gray-600">Longitude:</span>
//                     <span className="ml-2 text-gray-800">{selectedLocation.lng.toFixed(4)}</span>
//                   </div>
//                 </div>
//               </div>
//               <iframe
//                 src={`https://www.openstreetmap.org/export/embed.html?bbox=${
//                   selectedLocation.lng - 0.05
//                 },${selectedLocation.lat - 0.05},${
//                   selectedLocation.lng + 0.05
//                 },${selectedLocation.lat + 0.05}&layer=mapnik&marker=${
//                   selectedLocation.lat
//                 },${selectedLocation.lng}`}
//                 width="100%"
//                 height="450"
//                 className="rounded border border-gray-200"
//                 allowFullScreen=""
//                 loading="lazy"
//               ></iframe>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OverallDangerAnalysis;
