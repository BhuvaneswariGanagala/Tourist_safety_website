import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Mic,
  MessageSquare,
  AlertTriangle,
  Bell,
  BarChart2,
  LogOut,
} from "lucide-react";

const Sidebar = ({ user, setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Voice Messages", path: "/voice-messages", icon: <Mic size={20} /> },
    { name: "Text Messages", path: "/text-messages", icon: <MessageSquare size={20} /> },
    { name: "SOS Alerts", path: "/sos-alerts", icon: <AlertTriangle size={20} /> },
    { name: "Overall Danger Analysis", path: "/overall-danger", icon: <Bell size={20} /> },
    { name: "E-FIR", path: "/E-FIR", icon: <BarChart2 size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-full">
      {/* App Logo/Title */}
      <div className="p-6 text-2xl font-bold tracking-wide border-b border-slate-700">
        Tourist Safety
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-2 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center w-full p-3 rounded-lg transition-colors ${location.pathname === item.path
                ? "bg-slate-700 text-teal-300"
                : "hover:bg-slate-800"
              }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      {/* User Profile + Logout */}
      <div className="border-t border-slate-700 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={user?.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border border-slate-600"
          />

          <div>
            <p className="font-medium">{user?.username || "Guest User"}</p>
            <p className="text-xs text-slate-400">Admin</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-slate-800 text-red-400"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
