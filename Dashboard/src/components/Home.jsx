import { useState } from "react";
import {
  Mic,
  MessageSquare,
  AlertTriangle,
  Bell,
  BarChart2,
  MapPin,
  Phone,
  Shield,
  Users,
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Download,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Home = ({ user }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const sosCount = 12;
  const textMsgCount = 25;
  const voiceMsgCount = 8;
  const efirCount = 5;
  // Professional dashboard data structure
  const overviewStats = [
    {
      title: "Total Safety Incidents",
      value: "247",
      subtitle: "Last 30 days",
      trend: "+12%",
      trendUp: true,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Active Emergency Response",
      value: "8",
      subtitle: "In progress",
      trend: "-3",
      trendUp: false,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Response Rate",
      value: "94.2%",
      subtitle: "Average",
      trend: "+2.1%",
      trendUp: true,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "System Uptime",
      value: "99.8%",
      subtitle: "Last 7 days",
      trend: "+0.1%",
      trendUp: true,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const performanceMetrics = [
    {
      title: "Panic Button Activations",
      value: "156",
      resolved: "142",
      pending: "14",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "SOS Alerts",
      value: "89",
      resolved: "82",
      pending: "7",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Emergency Calls",
      value: "34",
      resolved: "31",
      pending: "3",
      color: "text-red-700",
      bgColor: "bg-red-100"
    }
  ];

  // Example recentActivities data structure
  // You can use this as a placeholder or replace with API data
  const recentActivities = [
    {
      id: 1,
      alertType: "SOS Alert",
      location: "Nuzividu",
      reportedBy: "John Doe",
      time: "10:15 AM",
      status: "Active",
    },
    {
      id: 2,
      alertType: "Voice Message",
      location: "Vijayawada",
      reportedBy: "Jane Smith",
      time: "09:45 AM",
      status: "Pending",
    },
    {
      id: 3,
      alertType: "Text Message",
      location: "Hyderabad",
      reportedBy: "System",
      time: "08:30 AM",
      status: "Resolved",
    },
  ];

  const pendingApprovals = [
    { id: 1, user: "John Smith", type: "Emergency Response", amount: "€2,450", dueDate: "Immediate", priority: "high" },
    { id: 2, user: "Maria Garcia", type: "Panic Response", amount: "€1,200", dueDate: "15 min", priority: "high" },
    { id: 3, user: "David Chen", type: "Resource Allocation", amount: "€890", dueDate: "2 hours", priority: "medium" }
  ];

  // Chart data with professional colors (sky blue, blue, white, red)
  const incidentTrendData = [
    { month: "Jan", incidents: 65, resolved: 58, response: 89 },
    { month: "Feb", incidents: 78, resolved: 72, response: 92 },
    { month: "Mar", incidents: 82, resolved: 75, response: 91 },
    { month: "Apr", incidents: 95, resolved: 88, response: 93 },
    { month: "May", incidents: 108, resolved: 102, response: 94 },
    { month: "Jun", incidents: 124, resolved: 118, response: 95 },
    { month: "Jul", incidents: 142, resolved: 135, response: 95 },
    { month: "Aug", incidents: 156, resolved: 148, response: 95 },
    { month: "Sep", incidents: 168, resolved: 162, response: 96 },
    { month: "Oct", incidents: 189, resolved: 182, response: 96 },
    { month: "Nov", incidents: 203, resolved: 195, response: 96 },
    { month: "Dec", incidents: 247, resolved: 235, response: 94 }
  ];

  const responseTimeData = [
    { day: "Mon", avgTime: 2.3, target: 2.0 },
    { day: "Tue", avgTime: 2.1, target: 2.0 },
    { day: "Wed", avgTime: 1.9, target: 2.0 },
    { day: "Thu", avgTime: 2.4, target: 2.0 },
    { day: "Fri", avgTime: 2.6, target: 2.0 },
    { day: "Sat", avgTime: 3.1, target: 2.0 },
    { day: "Sun", avgTime: 2.8, target: 2.0 }
  ];

  const alertTypeData = [
    { name: "SOS Alerts", value: 89, color: "#dc2626" },
    { name: "Panic Button", value: 156, color: "#0ea5e9" },
    { name: "Emergency Calls", value: 34, color: "#dc2626" },
    { name: "Medical Emergency", value: 23, color: "#2563eb" },
    { name: "Lost Person", value: 45, color: "#0ea5e9" },
    { name: "Other", value: 12, color: "#2563eb" }
  ];

  const weeklyPerformanceData = [
    { week: "Week 1", incidents: 45, response: 42, efficiency: 93 },
    { week: "Week 2", incidents: 52, response: 48, efficiency: 92 },
    { week: "Week 3", incidents: 38, response: 36, efficiency: 95 },
    { week: "Week 4", incidents: 61, response: 58, efficiency: 95 },
    { week: "Week 5", incidents: 47, response: 44, efficiency: 94 }
  ];

  const quickActions = [
    { name: "Send Voice Message", icon: <Mic className="w-5 h-5" />, color: "bg-blue-500" },
    { name: "Send Text Alert", icon: <MessageSquare className="w-5 h-5" />, color: "bg-green-500" },
    { name: "Emergency SOS", icon: <AlertTriangle className="w-5 h-5" />, color: "bg-red-500" },
    { name: "Panic Button", icon: <Bell className="w-5 h-5" />, color: "bg-orange-500" },
    { name: "Check Location", icon: <MapPin className="w-5 h-5" />, color: "bg-purple-500" },
  ];

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-8">
        {/* Professional Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Safety Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                Welcome back, {user?.verificationId} • Tourist Safety Management System
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                System Online
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4 inline mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overviewStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  {stat.trendUp ? (
                    <TrendingUp className={`w-4 h-4 ${stat.color}`} />
                  ) : (
                    <TrendingDown className={`w-4 h-4 ${stat.color}`} />
                  )}
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <div>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.subtitle}</p>
                </div>
                <div className={`text-sm font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Professional Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Incident Trends Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">Monthly Trends</h3>
              <div className="flex items-center space-x-3 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-500">Total</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
                  <span className="text-gray-500">Resolved</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={incidentTrendData}>
                <CartesianGrid strokeDasharray="2 2" stroke="#f8fafc" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    fontSize: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="incidents"
                  stackId="1"
                  stroke="#2563eb"
                  fill="#2563eb"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="resolved"
                  stackId="1"
                  stroke="#0ea5e9"
                  fill="#0ea5e9"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Alert Distribution Pie Chart */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">Alert Types</h3>
              <div className="text-xs text-gray-500">359 total</div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={alertTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={70}
                  paddingAngle={1}
                  dataKey="value"
                >
                  {alertTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}`, 'alerts']}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="text-gray-600">SOS (89)</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
                <span className="text-gray-600">Panic (156)</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="text-gray-600">Calls (34)</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-600">Medical (23)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Response Time Chart and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Response Time Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">Response Times</h3>
              <div className="flex items-center space-x-3 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="text-gray-500">Actual</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-500">Target</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="2 2" stroke="#f8fafc" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip
                  formatter={(value, name) => [
                    `${value}s`,
                    name === 'avgTime' ? 'Actual Time' : 'Target Time'
                  ]}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="avgTime" fill="#dc2626" radius={[2, 2, 0, 0]} />
                <Bar dataKey="target" fill="#2563eb" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Alerts Summary</h3>
            <div className="space-y-2">
              <div className="w-full flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-500 text-white p-1.5 rounded-md">
                    <AlertTriangle size={16} />
                  </div>
                  <span className="text-gray-700 font-medium text-sm">SOS Alerts</span>
                </div>
                <span className="text-gray-900 font-semibold text-sm">{sosCount}</span>
              </div>

              <div className="w-full flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500 text-white p-1.5 rounded-md">
                    <MessageSquare size={16} />
                  </div>
                  <span className="text-gray-700 font-medium text-sm">Text Messages</span>
                </div>
                <span className="text-gray-900 font-semibold text-sm">{textMsgCount}</span>
              </div>

              <div className="w-full flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-500 text-white p-1.5 rounded-md">
                    <Mic size={16} />
                  </div>
                  <span className="text-gray-700 font-medium text-sm">Voice Messages</span>
                </div>
                <span className="text-gray-900 font-semibold text-sm">{voiceMsgCount}</span>
              </div>

              <div className="w-full flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-500 text-white p-1.5 rounded-md">
                    <BarChart2 size={16} />
                  </div>
                  <span className="text-gray-700 font-medium text-sm">E-FIRs</span>
                </div>
                <span className="text-gray-900 font-semibold text-sm">{efirCount}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Performance Efficiency Chart */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">Performance Efficiency</h3>
            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-500">Incidents</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
                <span className="text-gray-500">Response</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="text-gray-500">Efficiency</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyPerformanceData}>
              <CartesianGrid strokeDasharray="2 2" stroke="#f8fafc" />
              <XAxis dataKey="week" stroke="#64748b" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px'
                }}
              />
              <Line
                type="monotone"
                dataKey="incidents"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ fill: '#2563eb', strokeWidth: 1, r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="response"
                stroke="#0ea5e9"
                strokeWidth={2}
                dot={{ fill: '#0ea5e9', strokeWidth: 1, r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="efficiency"
                stroke="#dc2626"
                strokeWidth={2}
                dot={{ fill: '#dc2626', strokeWidth: 1, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
            <div className="flex items-center space-x-2">
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Alert Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Location</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Reported By</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Time</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentActivities.map((activity) => (
                  <tr key={activity.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{activity.alertType}</td>
                    <td className="py-3 px-4 text-gray-600">{activity.location}</td>
                    <td className="py-3 px-4 text-gray-600">{activity.reportedBy}</td>
                    <td className="py-3 px-4 text-gray-600">{activity.time}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activity.status === 'Active' ? 'bg-red-100 text-red-700' :
                        activity.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {activity.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-700 p-1">
                          <Eye className="w-4 h-4" />
                        </button>
                        {activity.status === 'Pending' && (
                          <>
                            <button className="text-green-600 hover:text-green-700 p-1">
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-700 p-1">
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Emergency Response & Contacts */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">24/7 Emergency Response</h3>
                <p className="text-red-100">Rapid dispatch of units to reported incidents</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg mb-2 md:mb-0">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">System Active</span>
                </div>
              </div>
              {/* Emergency Contacts */}
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
                <a
                  href="tel:102"
                  className="flex items-center bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors shadow-sm"
                  title="Call Ambulance"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Ambulance
                </a>
                <a
                  href="tel:101"
                  className="flex items-center bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors shadow-sm"
                  title="Call Fire Station"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 2C12 2 7 7.5 7 12a5 5 0 0010 0c0-4.5-5-10-5-10zm0 15a3 3 0 01-3-3c0-1.5 1.5-4 3-6.5C13.5 10 15 12.5 15 14a3 3 0 01-3 3z" />
                  </svg>
                  Fire Station
                </a>
                <a
                  href="tel:100"
                  className="flex items-center bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-sm"
                  title="Call Police Station"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 2l4 4 6 2-2 6-4 4-6-2-2-6 4-4z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Police Station
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
