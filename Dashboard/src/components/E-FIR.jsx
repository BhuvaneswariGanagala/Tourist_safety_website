import { useState } from "react";
import { Search, FileText, MapPin } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Mock Data
const mockTourists = [
  {
    id: "DTI-4592-BCN",
    name: "Rohit Sharma",
    nationality: "Indian",
    passportNo: "••••4589",
    emergencyContact: "+91-987654310 (Meera Sharma)",
    photo: "https://randomuser.me/api/portraits/men/11.jpg",
    incident: {
      firId: "FIR/20S/0915/001",
      dateTime: "15 Sept 2025, 11:20 AM",
      type: "Missing Tourist Report",
      location: { name: "Kaziranga National Park, Assam", lat: 26.57, lng: 93.17 },
      reportedBy: "SOS Button (Mobile App)",
      description:
        "Tourist stopped responding, GPS dropped suddenly, and no activity detected for 9+ hours.",
      evidence: {
        audioVideo: "AV-20250915-001 (secured)",
        iotData: "Last heart rate 68 bpm, GPS log attached",
      },
      actionTaken:
        "FIR auto-generated and forwarded to Kaziranga Police Station. Case assigned to Officer ID: POL-203",
    },
  },
  {
    id: "DTI-5010-DEL",
    name: "Priya Verma",
    nationality: "Indian",
    passportNo: "••••9821",
    emergencyContact: "+91-998877665 (Ravi Verma)",
    photo: "https://randomuser.me/api/portraits/women/21.jpg",
    incident: {
      firId: "FIR/20S/0915/002",
      dateTime: "15 Sept 2025, 03:45 PM",
      type: "Theft Report",
      location: { name: "Connaught Place, New Delhi", lat: 28.63, lng: 77.22 },
      reportedBy: "Local Police Station",
      description:
        "Tourist reported theft of personal belongings at crowded area.",
      evidence: {
        audioVideo: "AV-20250915-002 (secured)",
        iotData: "GPS device showed sudden location change.",
      },
      actionTaken:
        "FIR auto-logged and sent to Delhi Police. Investigation ongoing.",
    },
  },
  {
    id: "DTI-6031-MUM",
    name: "David Miller",
    nationality: "British",
    passportNo: "••••7743",
    emergencyContact: "+44-7890123456 (Anna Miller)",
    photo: "https://randomuser.me/api/portraits/men/22.jpg",
    incident: {
      firId: "FIR/20S/0915/003",
      dateTime: "16 Sept 2025, 09:15 AM",
      type: "Assault Report",
      location: { name: "Gateway of India, Mumbai", lat: 18.92, lng: 72.83 },
      reportedBy: "Nearby Tourist via SOS",
      description:
        "Tourist reported being assaulted by unidentified individuals near Gateway of India.",
      evidence: {
        audioVideo: "AV-20250916-003 (secured)",
        iotData: "Sudden rise in heart rate detected.",
      },
      actionTaken:
        "Mumbai Police notified. Emergency medical support dispatched.",
    },
  },
  {
    id: "DTI-7890-GOA",
    name: "Sophie Turner",
    nationality: "American",
    passportNo: "••••6678",
    emergencyContact: "+1-202-555-0198 (Jack Turner)",
    photo: "https://randomuser.me/api/portraits/women/45.jpg",
    incident: {
      firId: "FIR/20S/0916/004",
      dateTime: "16 Sept 2025, 05:30 PM",
      type: "Accident Report",
      location: { name: "Baga Beach, Goa", lat: 15.55, lng: 73.75 },
      reportedBy: "Local Authorities",
      description:
        "Tourist injured in a bike accident at Baga Beach, rushed to hospital.",
      evidence: {
        audioVideo: "AV-20250916-004 (secured)",
        iotData: "Impact detected by wearable device.",
      },
      actionTaken:
        "Emergency medical team alerted. FIR registered at Goa Police Station.",
    },
  },
  {
    id: "DTI-8921-KOL",
    name: "Amit Gupta",
    nationality: "Indian",
    passportNo: "••••1144",
    emergencyContact: "+91-7766554433 (Pooja Gupta)",
    photo: "https://randomuser.me/api/portraits/men/55.jpg",
    incident: {
      firId: "FIR/20S/0916/005",
      dateTime: "16 Sept 2025, 08:50 PM",
      type: "Suspicious Activity",
      location: { name: "Victoria Memorial, Kolkata", lat: 22.55, lng: 88.35 },
      reportedBy: "Tourist Self Report",
      description:
        "Tourist observed suspicious individuals following him for over 20 minutes.",
      evidence: {
        audioVideo: "AV-20250916-005 (secured)",
        iotData: "GPS logs confirm unusual movement.",
      },
      actionTaken:
        "Kolkata Police dispatched a team for surveillance and protection.",
    },
  },
  {
    id: "DTI-9012-RAJ",
    name: "Karan Mehta",
    nationality: "Indian",
    passportNo: "••••5521",
    emergencyContact: "+91-7788996655 (Arjun Mehta)",
    photo: "https://randomuser.me/api/portraits/men/62.jpg",
    incident: {
      firId: "FIR/20S/0917/006",
      dateTime: "17 Sept 2025, 10:15 AM",
      type: "Kidnapping Suspicion",
      location: { name: "Jaisalmer Fort, Rajasthan", lat: 26.91, lng: 70.91 },
      reportedBy: "Nearby Tourist SOS",
      description:
        "Tourist seen being dragged into a vehicle by unknown individuals.",
      evidence: {
        audioVideo: "AV-20250917-006 (secured)",
        iotData: "Wearable tracker shows sudden displacement.",
      },
      actionTaken:
        "Jaisalmer Police alerted immediately. Roadblocks set up around fort.",
    },
  },
  {
    id: "DTI-9911-SIK",
    name: "Emily Davis",
    nationality: "Canadian",
    passportNo: "••••8290",
    emergencyContact: "+1-514-999-7788 (Mark Davis)",
    photo: "https://randomuser.me/api/portraits/women/62.jpg",
    incident: {
      firId: "FIR/20S/0917/007",
      dateTime: "17 Sept 2025, 12:40 PM",
      type: "Missing Tourist",
      location: { name: "Gangtok, Sikkim", lat: 27.33, lng: 88.61 },
      reportedBy: "Hotel Management",
      description:
        "Tourist did not return to hotel overnight, phone switched off.",
      evidence: {
        audioVideo: "AV-20250917-007 (secured)",
        iotData: "Last GPS ping from MG Marg area, Gangtok.",
      },
      actionTaken:
        "Local police and tourist assistance team conducting search operation.",
    },
  },
  {
    id: "DTI-5566-MAN",
    name: "Liu Wei",
    nationality: "Chinese",
    passportNo: "••••3399",
    emergencyContact: "+86-130-4567-7788 (Chen Wei)",
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
    incident: {
      firId: "FIR/20S/0917/008",
      dateTime: "17 Sept 2025, 03:10 PM",
      type: "Road Accident",
      location: { name: "Imphal, Manipur", lat: 24.82, lng: 93.94 },
      reportedBy: "Local Residents",
      description:
        "Tourist’s bike collided with a truck. Severe injuries reported.",
      evidence: {
        audioVideo: "AV-20250917-008 (secured)",
        iotData: "Impact detected with high force.",
      },
      actionTaken: "Police registered FIR, ambulance dispatched immediately.",
    },
  },
  {
    id: "DTI-2001-BLR",
    name: "Nikita Rao",
    nationality: "Indian",
    passportNo: "••••1140",
    emergencyContact: "+91-9090909090 (Sunita Rao)",
    photo: "https://randomuser.me/api/portraits/women/72.jpg",
    incident: {
      firId: "FIR/20S/0917/009",
      dateTime: "17 Sept 2025, 06:30 PM",
      type: "Cyber Fraud",
      location: { name: "MG Road, Bangalore", lat: 12.97, lng: 77.59 },
      reportedBy: "Tourist Self Report",
      description:
        "Tourist scammed by fake travel agency, lost ₹50,000 via UPI.",
      evidence: {
        audioVideo: "AV-20250917-009 (secured)",
        iotData: "UPI transaction logs attached.",
      },
      actionTaken: "Cyber Crime Police Station notified. FIR registered.",
    },
  },
  {
    id: "DTI-3110-DEL",
    name: "Sara Khan",
    nationality: "Pakistani",
    passportNo: "••••7781",
    emergencyContact: "+92-300-1234567 (Ali Khan)",
    photo: "https://randomuser.me/api/portraits/women/85.jpg",
    incident: {
      firId: "FIR/20S/0917/010",
      dateTime: "17 Sept 2025, 09:00 PM",
      type: "Harassment Complaint",
      location: { name: "India Gate, Delhi", lat: 28.61, lng: 77.23 },
      reportedBy: "Tourist via SOS App",
      description:
        "Tourist reported being harassed by unknown men while sightseeing.",
      evidence: {
        audioVideo: "AV-20250917-010 (secured)",
        iotData: "Panic button triggered on wearable.",
      },
      actionTaken: "Delhi Police patrol dispatched immediately.",
    },
  },
  {
    id: "DTI-4567-UTT",
    name: "Tom Walker",
    nationality: "Australian",
    passportNo: "••••9021",
    emergencyContact: "+61-490-112233 (Jane Walker)",
    photo: "https://randomuser.me/api/portraits/men/44.jpg",
    incident: {
      firId: "FIR/20S/0917/011",
      dateTime: "18 Sept 2025, 07:45 AM",
      type: "Natural Disaster Emergency",
      location: { name: "Kedarnath, Uttarakhand", lat: 30.73, lng: 79.06 },
      reportedBy: "Disaster Management Cell",
      description:
        "Tourists stranded due to landslide blocking main road.",
      evidence: {
        audioVideo: "AV-20250917-011 (secured)",
        iotData: "GPS confirms group location near blocked path.",
      },
      actionTaken:
        "Rescue operation launched with NDRF team assistance.",
    },
  },
  {
    id: "DTI-6788-KER",
    name: "Ananya Nair",
    nationality: "Indian",
    passportNo: "••••3322",
    emergencyContact: "+91-8888777766 (Ramesh Nair)",
    photo: "https://randomuser.me/api/portraits/women/50.jpg",
    incident: {
      firId: "FIR/20S/0918/012",
      dateTime: "18 Sept 2025, 11:20 AM",
      type: "Lost Child Report",
      location: { name: "Alleppey Beach, Kerala", lat: 9.49, lng: 76.33 },
      reportedBy: "Tourist Mother",
      description:
        "Child of tourist went missing while playing near the beach.",
      evidence: {
        audioVideo: "AV-20250918-012 (secured)",
        iotData: "Last GPS detected near food stalls.",
      },
      actionTaken: "Beach security and police conducting search.",
    },
  },
  {
    id: "DTI-7895-PUN",
    name: "Rajiv Singh",
    nationality: "Indian",
    passportNo: "••••8821",
    emergencyContact: "+91-9988774411 (Suresh Singh)",
    photo: "https://randomuser.me/api/portraits/men/36.jpg",
    incident: {
      firId: "FIR/20S/0918/013",
      dateTime: "18 Sept 2025, 04:40 PM",
      type: "Drug Overdose",
      location: { name: "Shivaji Nagar, Pune", lat: 18.52, lng: 73.86 },
      reportedBy: "Tourist Friends",
      description:
        "Tourist collapsed due to suspected drug overdose at a party.",
      evidence: {
        audioVideo: "AV-20250918-013 (secured)",
        iotData: "Wearable detected abnormal pulse before collapse.",
      },
      actionTaken: "Medical emergency response dispatched, FIR filed.",
    },
  },
  {
    id: "DTI-2025-AND",
    name: "Hiroshi Tanaka",
    nationality: "Japanese",
    passportNo: "••••1234",
    emergencyContact: "+81-90-1234-5678 (Yuki Tanaka)",
    photo: "https://randomuser.me/api/portraits/men/29.jpg",
    incident: {
      firId: "FIR/20S/0918/014",
      dateTime: "18 Sept 2025, 07:15 PM",
      type: "Boat Mishap",
      location: { name: "Havelock Island, Andaman", lat: 11.97, lng: 92.99 },
      reportedBy: "Boat Operator",
      description:
        "Tourist fell off a boat during water sports activity. Rescued quickly.",
      evidence: {
        audioVideo: "AV-20250918-014 (secured)",
        iotData: "GPS confirms sudden water entry detected.",
      },
      actionTaken:
        "Local police and coast guard informed, safety measures reinforced.",
    },
  },
  {
    id: "DTI-3333-HP",
    name: "Arjun Kapoor",
    nationality: "Indian",
    passportNo: "••••6677",
    emergencyContact: "+91-9123456789 (Vikas Kapoor)",
    photo: "https://randomuser.me/api/portraits/men/84.jpg",
    incident: {
      firId: "FIR/20S/0918/015",
      dateTime: "18 Sept 2025, 09:55 PM",
      type: "Suspicious Death",
      location: { name: "Shimla, Himachal Pradesh", lat: 31.10, lng: 77.17 },
      reportedBy: "Hotel Staff",
      description:
        "Tourist found dead under mysterious circumstances in hotel room.",
      evidence: {
        audioVideo: "AV-20250918-015 (secured)",
        iotData: "Last wearable data stopped abruptly.",
      },
      actionTaken:
        "Local police investigating. Case transferred to CID.",
    },
  },
];

const EFIR = () => {
  const [search, setSearch] = useState("");
  const [selectedTourist, setSelectedTourist] = useState(null);

  const filteredTourists = mockTourists.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-lg shadow">
        <FileText /> Digital E-FIR System
      </h1>

      {/* Search */}
      {!selectedTourist && (
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 w-full md:w-1/2 shadow-sm">
          <Search className="text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search by Tourist ID or Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>
      )}

      {/* Tourist List */}
      {!selectedTourist ? (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredTourists.map((tourist) => (
            <div
              key={tourist.id}
              onClick={() => setSelectedTourist(tourist)}
              className="cursor-pointer border border-gray-200 rounded-lg p-4 shadow-md bg-white hover:shadow-xl transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={tourist.photo}
                  alt={tourist.name}
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div>
                  <h2 className="font-semibold text-gray-800">{tourist.name}</h2>
                  <p className="text-xs text-gray-500">ID: {tourist.id}</p>
                  <p className="text-xs text-gray-500">
                    Incident: {tourist.incident.type}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Detailed FIR View */
        <div className="bg-white shadow-lg rounded-xl p-6 space-y-6 border border-gray-200">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Digital E-FIR</h2>
              <p className="text-xs text-gray-500">
                FIR ID: {selectedTourist.incident.firId}
              </p>
              <p className="text-xs text-gray-500">
                Date & Time: {selectedTourist.incident.dateTime}
              </p>
            </div>
            <button
              className="text-xs text-blue-600 hover:underline"
              onClick={() => setSelectedTourist(null)}
            >
              ← Back to List
            </button>
          </div>

          {/* Tourist Details */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700">Tourist Details</h3>
              <img
                src={selectedTourist.photo}
                alt={selectedTourist.name}
                className="w-28 h-28 rounded-lg object-cover border"
              />
              <p className="text-sm font-medium">{selectedTourist.name}</p>
              <p className="text-xs text-gray-600">
                Tourist ID: {selectedTourist.id}
              </p>
              <p className="text-xs text-gray-600">
                Passport: {selectedTourist.passportNo}
              </p>
              <p className="text-xs text-gray-600">
                Emergency: {selectedTourist.emergencyContact}
              </p>
            </div>

            {/* Incident */}
            <div className="space-y-2 md:col-span-1">
              <h3 className="font-semibold text-gray-700">Incident Details</h3>
              <p className="text-xs">
                <span className="font-medium">Type:</span>{" "}
                {selectedTourist.incident.type}
              </p>
              <p className="text-xs flex items-center gap-1">
                <MapPin size={12} /> {selectedTourist.incident.location.name}
              </p>
              <p className="text-xs">
                <span className="font-medium">Reported By:</span>{" "}
                {selectedTourist.incident.reportedBy}
              </p>
              <p className="text-xs text-gray-600">
                {selectedTourist.incident.description}
              </p>
            </div>

            {/* Evidence */}
            <div className="space-y-2 md:col-span-1">
              <h3 className="font-semibold text-gray-700">Evidence & Action</h3>
              <p className="text-xs">
                <span className="font-medium">Audio/Video:</span>{" "}
                {selectedTourist.incident.evidence.audioVideo}
              </p>
              <p className="text-xs">
                <span className="font-medium">IoT Data:</span>{" "}
                {selectedTourist.incident.evidence.iotData}
              </p>
              <p className="text-xs text-gray-600">
                {selectedTourist.incident.actionTaken}
              </p>
              <button className="mt-3 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs rounded-lg shadow hover:scale-105 transition">
                Generate E-FIR
              </button>
            </div>
          </div>

          {/* Map */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Reported Location</h3>
            <MapContainer
              center={[selectedTourist.incident.location.lat, selectedTourist.incident.location.lng]}
              zoom={13}
              className="h-64 w-full rounded-lg shadow"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[selectedTourist.incident.location.lat, selectedTourist.incident.location.lng]}
              >
                <Popup>{selectedTourist.incident.location.name}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default EFIR;
