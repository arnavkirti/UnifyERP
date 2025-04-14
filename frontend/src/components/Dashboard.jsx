import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BarChart3,
  FileText,
  Home,
  Menu,
  Package,
  Settings,
  Users,
  X,
  CreditCard,
  DollarSign,
  Bell,
  Search,
  ChevronDown,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  LogOut,
  ArrowRightLeft,
  ExternalLink,
  Activity,
  Zap,
  Shield,
  TrendingUp
} from "lucide-react";
import ApiTesting from "./ApiTesting";

export default function Dashboard({ onLogout, user }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active item based on current path
  const getActiveItem = () => {
    if (location.pathname === "/") return "Dashboard";
    if (location.pathname === "/dashboard") return "Dashboard";
    if (location.pathname === "/invoices") return "Invoices";
    if (location.pathname === "/payments") return "Payments";
    if (location.pathname === "/products") return "Products";
    if (location.pathname === "/customers") return "Customers";
    if (location.pathname === "/reports") return "Reports";
    if (location.pathname === "/settings") return "Settings";
    if (location.pathname === "/api-testing") return "API Testing";
    return "Dashboard";
  };
  
  const activeItem = getActiveItem();

  // Get user initials for avatar
  const getInitials = (name) => {
    return name
      ? name
          .split(' ')
          .map(word => word[0])
          .join('')
          .toUpperCase()
      : 'AU';
  };

  const userInitials = user ? getInitials(user.name) : 'AU';
  const userName = user?.name || 'Admin User';
  const userEmail = user?.email || 'admin@unifyerp.com';

  // Handle navigation item click
  const handleNavItemClick = (label, path) => {
    navigate(path);
  };

  // Handle API testing page navigation
  const goToApiTestingPage = () => {
    navigate('/api-testing');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-md transition-all duration-300 ease-in-out flex flex-col shrink-0 border-r border-slate-200`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-600 rounded-md flex items-center justify-center text-white font-bold">UE</div>
              <span className="font-bold text-slate-800">UnifyERP</span>
            </div>
          ) : (
            <div className="flex justify-center w-full">
              <div className="w-8 h-8 bg-orange-600 rounded-md flex items-center justify-center text-white font-bold">UE</div>
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`text-slate-500 hover:text-slate-700 ${!isSidebarOpen ? "absolute right-2" : ""}`}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4">
          <div className={`${isSidebarOpen ? "mb-4" : "mb-6"}`}>
            {isSidebarOpen && <p className="text-xs font-medium text-slate-400 uppercase mb-2 ml-2">Main Menu</p>}
          </div>
          <ul className="space-y-1.5">
            {[
              { icon: <Home size={20} />, label: "Dashboard", path: "/", active: activeItem === "Dashboard" },
              { icon: <FileText size={20} />, label: "Invoices", path: "/invoices", active: activeItem === "Invoices" },
              { icon: <CreditCard size={20} />, label: "Payments", path: "/payments", active: activeItem === "Payments" },
              { icon: <Package size={20} />, label: "Products", path: "/products", active: activeItem === "Products" },
              { icon: <Users size={20} />, label: "Customers", path: "/customers", active: activeItem === "Customers" },
            ].map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavItemClick(item.label, item.path)}
                  className={`flex items-center w-full p-2.5 rounded-md ${
                    item.active
                      ? "bg-orange-50 text-orange-600 font-medium"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {isSidebarOpen && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>

          {isSidebarOpen && <p className="text-xs font-medium text-slate-400 uppercase mt-6 mb-2 ml-2">Analytics</p>}
          <ul className="space-y-1.5">
            {[
              { icon: <BarChart3 size={20} />, label: "Reports", path: "/reports", active: activeItem === "Reports" },
              { icon: <Activity size={20} />, label: "Analytics", path: "/analytics", active: activeItem === "Analytics" },
            ].map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavItemClick(item.label, item.path)}
                  className={`flex items-center w-full p-2.5 rounded-md ${
                    item.active
                      ? "bg-orange-50 text-orange-600 font-medium"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {isSidebarOpen && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>

          {isSidebarOpen && <p className="text-xs font-medium text-slate-400 uppercase mt-6 mb-2 ml-2">System</p>}
          <ul className="space-y-1.5">
            {[
              { icon: <Settings size={20} />, label: "Settings", path: "/settings", active: activeItem === "Settings" },
              { icon: <ArrowRightLeft size={20} />, label: "API Testing", path: "/api-testing", active: activeItem === "API Testing", special: true },
            ].map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavItemClick(item.label, item.path)}
                  className={`flex items-center w-full p-2.5 rounded-md ${
                    item.active
                      ? "bg-orange-50 text-orange-600 font-medium"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {isSidebarOpen && (
                    <div className="flex items-center justify-between w-full">
                      <span>{item.label}</span>
                      {item.special && <ExternalLink className="h-4 w-4" />}
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-200 mt-auto">
          <div className="flex items-center gap-3">
            {isSidebarOpen && (
              <>
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                  {userInitials}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">{userName}</p>
                  <p className="text-xs text-slate-500">{userEmail}</p>
                </div>
              </>
            )}
            {!isSidebarOpen && (
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold mx-auto">
                {userInitials}
              </div>
            )}
          </div>
          
          {/* Logout button - only in sidebar */}
          {onLogout && (
            <button 
              onClick={onLogout}
              className="mt-4 flex items-center gap-2 w-full rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              {isSidebarOpen && <span>Logout</span>}
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto w-full">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 w-full sticky top-0 z-10 border-b border-slate-200">
          <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
            <div className="flex items-center rounded-md bg-slate-100 px-3 py-2 w-64 border border-slate-200">
              <Search size={18} className="text-slate-500 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="relative text-slate-500 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                  {userInitials}
                </div>
                <span className="text-sm font-medium text-slate-700">{userName}</span>
                <ChevronDown size={16} className="text-slate-500" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 w-full max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 w-full">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{activeItem}</h1>
              <p className="text-sm text-slate-500 mt-1">Welcome back to your ERP dashboard</p>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm">
              <Calendar size={18} className="text-slate-500" />
              <span className="text-sm text-slate-600">
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* API Testing Promotion Card */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-sm p-6 mb-6 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mt-20 -mr-20"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <h2 className="text-xl font-semibold mb-2">ERP API Standardization</h2>
                <p className="text-orange-50 mb-4 max-w-xl">
                  Test our AI-powered API standardization tool. Convert any ERP API response to our universal format with a single click.
                </p>
                <button 
                  onClick={goToApiTestingPage}
                  className="inline-flex items-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-md font-medium hover:bg-orange-50 transition-colors shadow-sm"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                  Try API Testing Tool
                  <ExternalLink className="h-4 w-4 ml-1" />
                </button>
              </div>
              <div className="hidden md:block">
                <ArrowRightLeft className="h-24 w-24 text-orange-100 opacity-50" />
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-600 text-sm font-medium">Total Revenue</h3>
                <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <TrendingUp size={12} />
                  +12.5%
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">$24,560</p>
                  <p className="text-sm text-slate-500">+2.5k this week</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-600 text-sm font-medium">Total Orders</h3>
                <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <TrendingUp size={12} />
                  +8.2%
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">1,240</p>
                  <p className="text-sm text-slate-500">+180 this week</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-600 text-sm font-medium">Total Customers</h3>
                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <TrendingUp size={12} className="rotate-180" />
                  -3.1%
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">3,120</p>
                  <p className="text-sm text-slate-500">-32 this week</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-600 text-sm font-medium">Pending Invoices</h3>
                <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full">Pending</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">15</p>
                  <p className="text-sm text-slate-500">Need attention</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center mb-4">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-slate-800 font-medium mb-2">Quick Actions</h3>
              <p className="text-slate-500 text-sm mb-4">Access frequently used tools and actions in one place.</p>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700">Get Started →</button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-md bg-green-100 flex items-center justify-center mb-4">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-slate-800 font-medium mb-2">Security Center</h3>
              <p className="text-slate-500 text-sm mb-4">Review and enhance your account security settings.</p>
              <button className="text-green-600 text-sm font-medium hover:text-green-700">View Settings →</button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-md bg-purple-100 flex items-center justify-center mb-4">
                <Activity className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-slate-800 font-medium mb-2">System Health</h3>
              <p className="text-slate-500 text-sm mb-4">Monitor the performance and status of your ERP system.</p>
              <button className="text-purple-600 text-sm font-medium hover:text-purple-700">Check Status →</button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Recent Activity</h2>
              <button className="text-sm text-orange-600 font-medium hover:text-orange-700">View All</button>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: "New order received",
                  amount: "$1,200.00",
                  time: "2 hours ago",
                  status: "success"
                },
                {
                  title: "Payment processed",
                  amount: "$850.00",
                  time: "5 hours ago",
                  status: "success"
                },
                {
                  title: "Invoice declined",
                  amount: "$320.00",
                  time: "1 day ago",
                  status: "error"
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    {activity.status === "success" ? (
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                      <p className="text-xs text-slate-500">{activity.time}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-medium ${
                    activity.status === "success" ? "text-green-600" : "text-red-600"
                  }`}>
                    {activity.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}