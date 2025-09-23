import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Home from "./Home"; 
import VoiceMessages from "./VoiceMessages";
import TextMessages  from "./TextMessages";
import SosAlerts from "./SosAlerts";
import OverallDangerAnalysis from "./OverallDangerAnalysis";
import EFIR from "./E-FIR";
const Layout = ({ user , setUser}) => {
  return (
    <Router>
      <div className="flex w-full h-screen">
      <Sidebar user={user} setUser={setUser} />
        <main className="flex-1 bg-slate-100 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/voice-messages" element={<VoiceMessages />} />
            <Route path="/text-messages"  element={<TextMessages/>} />
            <Route path="/sos-alerts" element={<SosAlerts/>}/>
            <Route path="/overall-danger" element={<OverallDangerAnalysis/>}/>
            <Route path="/E-FIR" element={<EFIR/>}/>

            {/* add more routes here later */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default Layout;
