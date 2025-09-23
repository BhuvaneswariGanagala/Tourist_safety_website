import { useState } from "react";
import { MapPin, AlertTriangle, Clock, X, Search } from "lucide-react";

// Mock data
const mockTextMessages = [
  {
    id: 1,
    touristId: "T-1023",
    message: "We are stuck near the old temple, heavy rain and landslide.",
    location: "Old Temple, Valley Side",
    coordinates: { lat: 34.169, lon: 77.585 },
    priority: "High",
    time: "2025-09-20 14:35",
  },
  {
    id: 2,
    touristId: "T-1041",
    message: "Lost track in the forest, battery low.",
    location: "North Forest Zone",
    coordinates: { lat: 34.171, lon: 77.602 },
    priority: "Medium",
    time: "2025-09-20 13:50",
  },
  {
    id: 3,
    touristId: "T-1066",
    message: "All safe at the base camp, no issues.",
    location: "Base Camp",
    coordinates: { lat: 34.162, lon: 77.590 },
    priority: "Low",
    time: "2025-09-20 12:20",
  },
  {
    id: 4,
    touristId: "T-1090",
    message: "Severe breathing issue, altitude sickness getting worse.",
    location: "Mountain Ridge",
    coordinates: { lat: 34.180, lon: 77.600 },
    priority: "High",
    time: "2025-09-20 11:05",
  },
];

const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700 border-red-300";
    case "Medium":
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    default:
      return "bg-green-100 text-green-700 border-green-300";
  }
};

const TextMessages = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Filtering + Search
  const filteredMessages = mockTextMessages.filter((msg) => {
    const matchesPriority = filter === "All" || msg.priority === filter;
    const matchesSearch =
      msg.touristId.toLowerCase().includes(search.toLowerCase()) ||
      msg.message.toLowerCase().includes(search.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Text Messages</h2>

        {/* Controls: Search + Filter */}
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by Tourist ID or Message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none w-72"
            />
          </div>

          {/* Filter Dropdown */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Messages */}
      {filteredMessages.length > 0 ? (
        filteredMessages.map((msg) => (
          <div
            key={msg.id}
            className="p-5 bg-white rounded-xl shadow-md border border-slate-200"
          >
            {/* Header: Tourist ID + Priority */}
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-slate-600">
                Tourist ID: <span className="text-slate-800">{msg.touristId}</span>
              </span>

              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(
                  msg.priority
                )}`}
              >
                {msg.priority} Priority
              </span>
            </div>

            {/* Message */}
            <p className="text-slate-700 font-medium mb-3">{msg.message}</p>

            {/* Location & Time */}
            <div className="flex items-center justify-between text-sm text-slate-500">
              <button
                onClick={() => setSelectedLocation(msg)}
                className="flex items-center gap-2 hover:text-teal-600 transition"
              >
                <MapPin size={16} className="text-teal-600" />
                <span className="underline">{msg.location}</span>
              </button>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-slate-600" />
                <span>{msg.time}</span>
              </div>
            </div>

            {/* Emergency Badge */}
            {msg.priority === "High" && (
              <div className="mt-3 flex items-center gap-2 text-red-600 font-semibold">
                <AlertTriangle size={18} />
                Emergency Situation — Immediate Action Required
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-slate-500">No messages match your search/filter.</p>
      )}

      {/* Map Popup */}
      {selectedLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[500px] max-w-full relative">
            {/* Close button */}
            <button
              onClick={() => setSelectedLocation(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-slate-200 hover:bg-slate-300"
            >
              <X size={18} />
            </button>

            {/* Map Title */}
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold text-slate-800">
                Location: {selectedLocation.location}
              </h3>
              <p className="text-sm text-slate-500">
                Tourist ID: {selectedLocation.touristId}
              </p>
            </div>

            {/* Embedded OpenStreetMap */}
            <iframe
              title="map"
              width="100%"
              height="300"
              frameBorder="0"
              className="rounded-b-xl"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                selectedLocation.coordinates.lon - 0.01
              },${selectedLocation.coordinates.lat - 0.01},${
                selectedLocation.coordinates.lon + 0.01
              },${selectedLocation.coordinates.lat + 0.01}&layer=mapnik&marker=${
                selectedLocation.coordinates.lat
              },${selectedLocation.coordinates.lon}`}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextMessages;

// import { useState } from "react";
// import { MapPin, AlertTriangle, Clock, X } from "lucide-react";

// // Mock data
// const mockTextMessages = [
//   {
//     id: 1,
//     touristId: "T-1023",
//     message: "We are stuck near the old temple, heavy rain and landslide.",
//     location: "Old Temple, Valley Side",
//     coordinates: { lat: 34.169, lon: 77.585 }, // mock coords
//     priority: "High",
//     time: "2025-09-20 14:35",
//   },
//   {
//     id: 2,
//     touristId: "T-1041",
//     message: "Lost track in the forest, battery low.",
//     location: "North Forest Zone",
//     coordinates: { lat: 34.171, lon: 77.602 },
//     priority: "Medium",
//     time: "2025-09-20 13:50",
//   },
//   {
//     id: 3,
//     touristId: "T-1066",
//     message: "All safe at the base camp, no issues.",
//     location: "Base Camp",
//     coordinates: { lat: 34.162, lon: 77.590 },
//     priority: "Low",
//     time: "2025-09-20 12:20",
//   },
// ];

// const getPriorityColor = (priority) => {
//   switch (priority) {
//     case "High":
//       return "bg-red-100 text-red-700 border-red-300";
//     case "Medium":
//       return "bg-yellow-100 text-yellow-700 border-yellow-300";
//     default:
//       return "bg-green-100 text-green-700 border-green-300";
//   }
// };

// const TextMessages = () => {
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   return (
//     <div className="space-y-6 relative">
//       <h2 className="text-2xl font-bold text-slate-800">Text Messages</h2>

//       {mockTextMessages.map((msg) => (
//         <div
//           key={msg.id}
//           className="p-5 bg-white rounded-xl shadow-md border border-slate-200"
//         >
//           {/* Header: Tourist ID + Priority */}
//           <div className="flex justify-between items-center mb-3">
//             <span className="text-sm font-semibold text-slate-600">
//               Tourist ID: <span className="text-slate-800">{msg.touristId}</span>
//             </span>

//             <span
//               className={`px-3 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(
//                 msg.priority
//               )}`}
//             >
//               {msg.priority} Priority
//             </span>
//           </div>

//           {/* Message */}
//           <p className="text-slate-700 font-medium mb-3">{msg.message}</p>

//           {/* Location & Time */}
//           <div className="flex items-center justify-between text-sm text-slate-500">
//             <button
//               onClick={() => setSelectedLocation(msg)}
//               className="flex items-center gap-2 hover:text-teal-600 transition"
//             >
//               <MapPin size={16} className="text-teal-600" />
//               <span className="underline">{msg.location}</span>
//             </button>
//             <div className="flex items-center gap-2">
//               <Clock size={16} className="text-slate-600" />
//               <span>{msg.time}</span>
//             </div>
//           </div>

//           {/* Emergency Badge */}
//           {msg.priority === "High" && (
//             <div className="mt-3 flex items-center gap-2 text-red-600 font-semibold">
//               <AlertTriangle size={18} />
//               Emergency Situation — Immediate Action Required
//             </div>
//           )}
//         </div>
//       ))}

//       {/* Map Popup */}
//       {selectedLocation && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl shadow-xl w-[500px] max-w-full relative">
//             {/* Close button */}
//             <button
//               onClick={() => setSelectedLocation(null)}
//               className="absolute top-3 right-3 p-2 rounded-full bg-slate-200 hover:bg-slate-300"
//             >
//               <X size={18} />
//             </button>

//             {/* Map Title */}
//             <div className="p-4 border-b">
//               <h3 className="text-lg font-semibold text-slate-800">
//                 Location: {selectedLocation.location}
//               </h3>
//               <p className="text-sm text-slate-500">
//                 Tourist ID: {selectedLocation.touristId}
//               </p>
//             </div>

//             {/* Embedded OpenStreetMap */}
//             <iframe
//               title="map"
//               width="100%"
//               height="300"
//               frameBorder="0"
//               className="rounded-b-xl"
//               src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedLocation.coordinates.lon -
//                 0.01},${selectedLocation.coordinates.lat -
//                 0.01},${selectedLocation.coordinates.lon +
//                 0.01},${selectedLocation.coordinates.lat +
//                 0.01}&layer=mapnik&marker=${selectedLocation.coordinates.lat},${selectedLocation.coordinates.lon}`}
//             ></iframe>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TextMessages;
