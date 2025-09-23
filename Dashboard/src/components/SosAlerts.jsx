import { useState, useRef } from "react";
import {
  MapPin,
  AlertTriangle,
  X,
  PlayCircle,
  PauseCircle,
  Bot,
  Loader2,
  Video,
} from "lucide-react";

const mockSosAlerts = [
  {
    id: 1,
    touristId: "T-501",
    message:
      "Emergency Alert: Distress audio detected with screaming sounds. Immediate security response required.",
    priority: "High",
    timestamp: "2025-01-20 14:25:30",
    location: { lat: 26.1445, lng: 91.7362, name: "Guwahati, Assam" },
    audio: "/mock/scream1.mp3",
    video: "/mock/emergency_video1.mp4",
    aiAnalysis:
      "AI Analysis: High-risk situation. Audio shows panic and distress signals. Immediate law enforcement and medical response recommended.",
  },
  {
    id: 2,
    touristId: "T-502",
    message:
      "Status Update: Tourist safety confirmation received. All systems normal.",
    priority: "Low",
    timestamp: "2025-01-20 13:45:15",
    location: { lat: 25.5788, lng: 91.8933, name: "Shillong, Meghalaya" },
    audio: "/mock/safe_audio1.mp3",
    video: "/mock/safe_video1.mp4",
    aiAnalysis:
      "AI Analysis: Routine check-in confirmed. Calm, normal communication. No threats detected.",
  },
];

const priorityColors = {
  Critical: "bg-red-600 text-white",
  High: "bg-orange-500 text-white",
  Medium: "bg-yellow-400 text-black",
  Low: "bg-green-500 text-white",
};

const SosAlerts = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const [analyzingAlerts, setAnalyzingAlerts] = useState(new Set());
  const [analysisResults, setAnalysisResults] = useState({});
  const audioRefs = useRef({});

  const handlePlayPause = (id) => {
    if (playingId === id) {
      audioRefs.current[id].pause();
      setPlayingId(null);
    } else {
      Object.keys(audioRefs.current).forEach((key) => {
        if (audioRefs.current[key]) {
          audioRefs.current[key].pause();
          audioRefs.current[key].currentTime = 0;
        }
      });
      audioRefs.current[id].play();
      setPlayingId(id);
    }
  };

  const handleAIAnalysis = (alertId) => {
    setAnalyzingAlerts((prev) => new Set(prev).add(alertId));
    setTimeout(() => {
      const alert = mockSosAlerts.find((a) => a.id === alertId);
      setAnalysisResults((prev) => ({
        ...prev,
        [alertId]: {
          message: alert.message,
          priority: alert.priority,
          timestamp: alert.timestamp,
          aiAnalysis: alert.aiAnalysis,
        },
      }));
      setAnalyzingAlerts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(alertId);
        return newSet;
      });
    }, 2500); // realistic delay
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
        <AlertTriangle className="text-red-500" /> SOS Alerts Dashboard
      </h1>

      {mockSosAlerts.map((alert) => (
        <div
          key={alert.id}
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 space-y-4"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Tourist ID: {alert.touristId}
              </h2>
              <p className="text-sm text-gray-500">{alert.timestamp}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm ${priorityColors[alert.priority]}`}
            >
              {alert.priority} Priority
            </span>
          </div>

          {/* Alert Message */}
          <p className="text-gray-700">{alert.message}</p>

          {/* Location */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={16} /> {alert.location.name}
            </div>
            <button
              className="text-blue-600 hover:underline font-medium"
              onClick={() => setSelectedLocation(alert.location)}
            >
              View on Map
            </button>
          </div>

          {/* Media */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Audio */}
            <div className="bg-gray-50 rounded p-3 flex flex-col gap-2">
              <h3 className="text-sm font-medium text-gray-800 flex items-center gap-2">
                <PlayCircle size={16} /> Audio Evidence
              </h3>
              <button
                onClick={() => handlePlayPause(alert.id)}
                className="text-blue-500 hover:text-blue-600 flex items-center gap-2 text-sm"
              >
                {playingId === alert.id ? (
                  <>
                    <PauseCircle size={16} /> Pause
                  </>
                ) : (
                  <>
                    <PlayCircle size={16} /> Play
                  </>
                )}
              </button>
              <audio
                ref={(el) => (audioRefs.current[alert.id] = el)}
                src={alert.audio}
                onEnded={() => setPlayingId(null)}
              />
            </div>

            {/* Video */}
            <div className="bg-gray-50 rounded p-3 flex flex-col gap-2">
              <h3 className="text-sm font-medium text-gray-800 flex items-center gap-2">
                <Video size={16} /> Video Evidence
              </h3>
              <video
                src={alert.video}
                controls
                className="rounded w-full shadow-sm"
              />
            </div>
          </div>

          {/* AI Analysis */}
          <div className="flex justify-end">
            <button
              onClick={() => handleAIAnalysis(alert.id)}
              disabled={analyzingAlerts.has(alert.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {analyzingAlerts.has(alert.id) ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Analyzing...
                </>
              ) : (
                <>
                  <Bot size={16} /> Run AI Analysis
                </>
              )}
            </button>
          </div>

          {analysisResults[alert.id] && !analyzingAlerts.has(alert.id) && (
            <div className="mt-4 bg-gray-50 p-4 rounded border border-gray-200 space-y-2">
              <h4 className="text-sm font-semibold text-gray-800">AI Analysis Report</h4>
              <p className="text-gray-700">{analysisResults[alert.id].aiAnalysis}</p>
            </div>
          )}
        </div>
      ))}

      {/* Map Modal */}
      {selectedLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl relative">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Location: {selectedLocation.name}
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedLocation(null)}
              >
                <X size={20} />
              </button>
            </div>
            <iframe
              title="map"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                selectedLocation.lng - 0.05
              },${selectedLocation.lat - 0.05},${
                selectedLocation.lng + 0.05
              },${selectedLocation.lat + 0.05}&layer=mapnik&marker=${
                selectedLocation.lat
              },${selectedLocation.lng}`}
              width="100%"
              height="400"
              className="rounded-b-xl border-t border-gray-200"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default SosAlerts;

// import { useState, useRef } from "react";
// import { MapPin, AlertTriangle, X, PlayCircle, PauseCircle, Bot, Loader2 } from "lucide-react";

// const mockSosAlerts = [
//   {
//     id: 1,
//     touristId: "T-501",
//     message: "Emergency Alert: Distress audio detected with indicators of potential threat or assault. Immediate security response required.",
//     priority: "High",
//     timestamp: "2025-01-20 14:25:30",
//     location: { lat: 26.1445, lng: 91.7362, name: "Guwahati, Assam" },
//     audio: "/mock/scream1.mp3",
//     video: "/mock/emergency_video1.mp4",
//     aiAnalysis:
//       "AI Analysis: High-risk situation identified. Audio analysis detected screaming, panic indicators, and distress signals. Immediate law enforcement and medical response recommended. Threat level: ELEVATED.",
//   },
//   {
//     id: 2,
//     touristId: "T-502",
//     message: "Status Update: Tourist safety confirmation received. All systems normal.",
//     priority: "Low",
//     timestamp: "2025-01-20 13:45:15",
//     location: { lat: 25.5788, lng: 91.8933, name: "Shillong, Meghalaya" },
//     audio: "/mock/safe_audio1.mp3",
//     video: "/mock/safe_video1.mp4",
//     aiAnalysis: "AI Analysis: Routine check-in confirmed. Audio analysis shows calm, normal communication patterns. No threats detected. Status: SECURE.",
//   },
//   {
//     id: 3,
//     touristId: "T-503",
//     message: "Medical Emergency: Critical health situation requiring immediate medical intervention and emergency services.",
//     priority: "Critical",
//     timestamp: "2025-01-20 13:10:45",
//     location: { lat: 24.8167, lng: 93.9500, name: "Imphal, Manipur" },
//     audio: "/mock/scream2.mp3",
//     video: "/mock/emergency_video2.mp4",
//     aiAnalysis:
//       "AI Analysis: Medical emergency confirmed. Audio analysis detected labored breathing, distress calls, and medical distress indicators. Immediate ambulance and medical team dispatch required. Priority: CRITICAL.",
//   },
//   {
//     id: 4,
//     touristId: "T-504",
//     message: "Routine Check-in: Tourist reporting safe travel status and positive journey experience.",
//     priority: "Low",
//     timestamp: "2025-01-20 12:30:20",
//     location: { lat: 27.4728, lng: 94.9120, name: "Dibrugarh, Assam" },
//     audio: "/mock/safe_audio2.mp3",
//     video: "/mock/safe_video2.mp4",
//     aiAnalysis: "AI Analysis: Positive status update confirmed. Audio analysis indicates cheerful, relaxed communication. No concerns detected. Status: SAFE.",
//   },
// ];

// const priorityColors = {
//   Critical: "bg-red-600 text-white font-semibold",
//   High: "bg-orange-500 text-white font-semibold",
//   Medium: "bg-yellow-400 text-black font-semibold",
//   Low: "bg-green-500 text-white font-semibold",
// };

// const priorityIcons = {
//   Critical: "🚨",
//   High: "⚠️",
//   Medium: "⚡",
//   Low: "✅",
// };

// const SosAlerts = () => {
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [playingId, setPlayingId] = useState(null);
//   const [analyzingAlerts, setAnalyzingAlerts] = useState(new Set());
//   const [analysisResults, setAnalysisResults] = useState({});
//   const audioRefs = useRef({});

//   const handlePlayPause = (id) => {
//     if (playingId === id) {
//       audioRefs.current[id].pause();
//       setPlayingId(null);
//     } else {
//       // Stop any other playing audios
//       Object.keys(audioRefs.current).forEach((key) => {
//         if (audioRefs.current[key]) {
//           audioRefs.current[key].pause();
//           audioRefs.current[key].currentTime = 0;
//         }
//       });
//       audioRefs.current[id].play();
//       setPlayingId(id);
//     }
//   };

//   const handleAIAnalysis = async (alertId) => {
//     // Add to analyzing set
//     setAnalyzingAlerts(prev => new Set(prev).add(alertId));
    
//     // Simulate AI analysis delay
//     setTimeout(() => {
//       // Remove from analyzing set
//       setAnalyzingAlerts(prev => {
//         const newSet = new Set(prev);
//         newSet.delete(alertId);
//         return newSet;
//       });
      
//       // Find the alert to get its analysis
//       const alert = mockSosAlerts.find(alert => alert.id === alertId);
      
//       // Set analysis result
//       setAnalysisResults(prev => ({
//         ...prev,
//         [alertId]: {
//           message: alert.message,
//           priority: alert.priority,
//           timestamp: alert.timestamp,
//           aiAnalysis: alert.aiAnalysis
//         }
//       }));
//     }, 3000); // 3 second delay for realistic analysis
//   };

//   return (
//     <div className="p-6 space-y-6 bg-white min-h-screen">
//       <div className="bg-white border border-gray-200 rounded-lg p-6">
//         <h1 className="text-2xl font-semibold text-gray-800 mb-2">
//           Emergency Response Dashboard
//         </h1>
//         <p className="text-gray-500 text-sm">Real-time SOS alert monitoring and analysis system</p>
//       </div>

//       {mockSosAlerts.map((alert) => (
//         <div
//           key={alert.id}
//           className="bg-white border border-gray-200 rounded-lg p-6 space-y-4"
//         >
//           {/* Header - Always visible */}
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
//                 <span className="text-gray-600 font-semibold text-sm">{alert.touristId}</span>
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-800">Tourist ID: {alert.touristId}</h3>
//                 <p className="text-xs text-gray-500">Emergency Alert System</p>
//               </div>
//             </div>
//             <button
//               onClick={() => handleAIAnalysis(alert.id)}
//               disabled={analyzingAlerts.has(alert.id)}
//               className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {analyzingAlerts.has(alert.id) ? (
//                 <>
//                   <Loader2 size={16} className="animate-spin" />
//                   Analyzing...
//                 </>
//               ) : (
//                 <>
//                   <Bot size={16} />
//                   AI Analysis
//                 </>
//               )}
//             </button>
//           </div>

//           {/* Location - Always visible */}
//           <div className="flex items-center justify-between py-2 border-b border-gray-200">
//             <div className="flex items-center gap-2">
//               <MapPin size={16} className="text-gray-500" />
//               <span className="text-sm text-gray-600">Location:</span>
//               <span className="text-sm font-medium text-gray-800">{alert.location.name}</span>
//             </div>
//             <button
//               className="text-sm text-blue-500 hover:text-blue-600 font-medium"
//               onClick={() => setSelectedLocation(alert.location)}
//             >
//               View on Map
//             </button>
//           </div>

//           {/* Media Evidence - Always visible */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Audio Reference */}
//             <div className="border border-gray-200 rounded p-3">
//               <div className="flex items-center gap-2 mb-2">
//                 <PlayCircle size={14} className="text-gray-500" />
//                 <span className="text-sm font-medium text-gray-800">Audio Evidence</span>
//               </div>
//               <button
//                 onClick={() => handlePlayPause(alert.id)}
//                 className="flex items-center gap-2 text-blue-500 hover:text-blue-600 text-sm font-medium"
//               >
//                 {playingId === alert.id ? (
//                   <>
//                     <PauseCircle size={16} /> Pause
//                   </>
//                 ) : (
//                   <>
//                     <PlayCircle size={16} /> Play
//                   </>
//                 )}
//               </button>
//               <audio
//                 ref={(el) => (audioRefs.current[alert.id] = el)}
//                 src={alert.audio}
//                 onEnded={() => setPlayingId(null)}
//               />
//             </div>

//             {/* Video */}
//             <div className="border border-gray-200 rounded p-3">
//               <div className="flex items-center gap-2 mb-2">
//                 <PlayCircle size={14} className="text-gray-500" />
//                 <span className="text-sm font-medium text-gray-800">Video Evidence</span>
//               </div>
//               <video
//                 src={alert.video}
//                 controls
//                 className="w-full rounded"
//               />
//             </div>
//           </div>

//           {/* AI Analysis Loading State */}
//           {analyzingAlerts.has(alert.id) && (
//             <div className="bg-gray-50 border border-gray-200 rounded p-4">
//               <div className="flex items-center gap-2">
//                 <Loader2 size={16} className="animate-spin text-blue-500" />
//                 <span className="text-sm font-medium text-gray-800">Analyzing SOS alert...</span>
//               </div>
//               <p className="text-xs text-gray-500 mt-1">Processing audio, video, and location data</p>
//             </div>
//           )}

//           {/* AI Analysis Results - Only shown after analysis */}
//           {analysisResults[alert.id] && !analyzingAlerts.has(alert.id) && (
//             <div className="space-y-3 border-t border-gray-200 pt-4">
//               {/* Alert Details Header */}
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h4 className="text-sm font-semibold text-gray-800">Alert Details</h4>
//                   <p className="text-xs text-gray-500">Analysis completed at {new Date().toLocaleTimeString()}</p>
//                 </div>
//                 <span
//                   className={`px-2 py-1 text-xs rounded ${priorityColors[analysisResults[alert.id].priority]}`}
//                 >
//                   {analysisResults[alert.id].priority}
//                 </span>
//               </div>

//               {/* Message & Time */}
//               <div className="bg-gray-50 rounded p-3">
//                 <h5 className="text-sm font-medium text-gray-800 mb-1">Alert Message</h5>
//                 <p className="text-sm text-gray-700">{analysisResults[alert.id].message}</p>
//                 <p className="text-xs text-gray-500 mt-1">Timestamp: {analysisResults[alert.id].timestamp}</p>
//               </div>

//               {/* AI Analysis */}
//               <div className="bg-gray-50 rounded p-3">
//                 <div className="flex items-center gap-2 mb-2">
//                   <Bot size={14} className="text-blue-500" />
//                   <h5 className="text-sm font-medium text-gray-800">AI Analysis Report</h5>
//                 </div>
//                 <p className="text-sm text-gray-700">{analysisResults[alert.id].aiAnalysis}</p>
//               </div>
//             </div>
//           )}
//         </div>
//       ))}

//       {/* Map Popup - Northeast India Focus */}
//       {selectedLocation && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl relative">
//             <div className="flex items-center justify-between p-4 border-b border-gray-200">
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-800">Emergency Location</h2>
//                 <p className="text-sm text-gray-500">{selectedLocation.name} • Northeast India Region</p>
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
//                 height="400"
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

// export default SosAlerts;
