import { Volume2, Bot, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import { useState } from "react";

const mockMessages = [
  {
    id: 1,
    text: "Help needed at Cherrapunji waterfall! Emergency situation!",
    status: "Emergency",
    location: "Cherrapunji, Meghalaya",
  },
  {
    id: 2,
    text: "We are safe, just arrived at Kaziranga National Park camp.",
    status: "Safe",
    location: "Kaziranga, Assam",
  },
  {
    id: 3,
    text: "The weather looks cloudy in Shillong, nothing serious.",
    status: "Normal",
    location: "Shillong, Meghalaya",
  },
  {
    id: 4,
    text: "I think I heard something dangerous in the Manipur forests!",
    status: "Threat",
    location: "Imphal, Manipur",
  },
  {
    id: 5,
    text: "Everything is fine here in Guwahati, just checking in.",
    status: "Safe",
    location: "Guwahati, Assam",
  },
  {
    id: 6,
    text: "There's a suspicious person following our group near Tawang.",
    status: "Threat",
    location: "Tawang, Arunachal Pradesh",
  },
  {
    id: 7,
    text: "Medical emergency at Kohima market! Need immediate help!",
    status: "Emergency",
    location: "Kohima, Nagaland",
  },
  {
    id: 8,
    text: "Beautiful sunrise at Majuli Island, everything peaceful.",
    status: "Safe",
    location: "Majuli, Assam",
  },
  {
    id: 9,
    text: "Lost our way in the Mizoram hills, need guidance.",
    status: "Threat",
    location: "Aizawl, Mizoram",
  },
  {
    id: 10,
    text: "Tripura palace visit completed successfully, all good.",
    status: "Safe",
    location: "Agartala, Tripura",
  },
];

const VoiceMessages = () => {
  const [analyzingMessages, setAnalyzingMessages] = useState(new Set());
  const [analysisResults, setAnalysisResults] = useState({});

  const handleAIAnalysis = async (messageId) => {
    // Add to analyzing set
    setAnalyzingMessages(prev => new Set(prev).add(messageId));
    
    // Simulate AI analysis delay
    setTimeout(() => {
      // Remove from analyzing set
      setAnalyzingMessages(prev => {
        const newSet = new Set(prev);
        newSet.delete(messageId);
        return newSet;
      });
      
      // Find the message to get its status
      const message = mockMessages.find(msg => msg.id === messageId);
      let analysisResult;
      
      if (message.status === "Emergency") {
        analysisResult = {
          status: "Emergency",
          description: `⚠️ EMERGENCY DETECTED — Critical situation reported from ${message.location}. Immediate emergency response required. Contact local authorities and emergency services in Northeast India region.`
        };
      } else if (message.status === "Threat") {
        analysisResult = {
          status: "Threat",
          description: `🚨 THREAT DETECTED — Potential danger identified in ${message.location}. Immediate attention and precautionary measures recommended. Monitor situation closely.`
        };
      } else {
        analysisResult = {
          status: "Safe",
          description: `✅ SAFE — Voice message analysis completed from ${message.location}. No threats or emergencies detected. Tourist appears to be in good condition.`
        };
      }
      
      // Set analysis result
      setAnalysisResults(prev => ({
        ...prev,
        [messageId]: analysisResult
      }));
    }, 2000); // 2 second delay for realistic analysis
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Voice Messages</h2>

      {mockMessages.map((msg) => (
        <div key={msg.id} className="space-y-3">
          {/* Main message card */}
          <div className="p-4 bg-white rounded-xl shadow flex justify-between items-center">
            {/* Message text */}
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
              <div>
                {analysisResults[msg.id] ? (
                  <>
                    <p className="font-medium text-slate-700">{msg.text}</p>
                    <p className="text-sm text-slate-500">Voice Message • {msg.location} • {new Date().toLocaleTimeString()}</p>
                  </>
                ) : (
                  <p className="text-slate-500 italic">Voice message received from {msg.location} - Click AI to analyze</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="p-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors">
                <Volume2 size={18} />
              </button>
              <button 
                onClick={() => handleAIAnalysis(msg.id)}
                disabled={analyzingMessages.has(msg.id)}
                className="p-2 bg-slate-200 rounded-full hover:bg-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {analyzingMessages.has(msg.id) ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Bot size={18} />
                )}
              </button>
            </div>
          </div>

          {/* AI Analysis Result */}
          {analyzingMessages.has(msg.id) && (
            <div className="ml-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-blue-600" />
                <span className="text-blue-700 font-medium">Analyzing voice message...</span>
              </div>
              <p className="text-sm text-blue-600 mt-1">Processing audio content and context</p>
            </div>
          )}

          {analysisResults[msg.id] && !analyzingMessages.has(msg.id) && (
            <div className={`ml-6 p-4 rounded-lg border ${
              analysisResults[msg.id].status === "Emergency" 
                ? "bg-red-50 border-red-200" 
                : analysisResults[msg.id].status === "Threat"
                ? "bg-orange-50 border-orange-200"
                : "bg-green-50 border-green-200"
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {analysisResults[msg.id].status === "Emergency" ? (
                  <AlertTriangle size={16} className="text-red-600" />
                ) : analysisResults[msg.id].status === "Threat" ? (
                  <AlertTriangle size={16} className="text-orange-600" />
                ) : (
                  <CheckCircle size={16} className="text-green-600" />
                )}
                <span className={`font-semibold ${
                  analysisResults[msg.id].status === "Emergency" 
                    ? "text-red-800" 
                    : analysisResults[msg.id].status === "Threat"
                    ? "text-orange-800"
                    : "text-green-800"
                }`}>
                  {analysisResults[msg.id].status}
                </span>
              </div>
              <p className={`text-sm ${
                analysisResults[msg.id].status === "Emergency" 
                  ? "text-red-700" 
                  : analysisResults[msg.id].status === "Threat"
                  ? "text-orange-700"
                  : "text-green-700"
              }`}>
                {analysisResults[msg.id].description}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VoiceMessages;
