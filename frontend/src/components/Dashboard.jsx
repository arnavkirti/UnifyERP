import { useState } from "react";
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
  LogOut
} from "lucide-react";

export default function Dashboard({ onLogout, user }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-md transition-all duration-300 ease-in-out flex flex-col shrink-0`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-800">UnifyERP</span>
            </div>
          ) : (
            <div className="flex justify-center w-full">
              <span className="font-bold text-gray-800 text-sm">UE</span>
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`text-gray-500 hover:text-gray-700 ${!isSidebarOpen ? "absolute right-2" : ""}`}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {[
              { icon: <Home size={20} />, label: "Dashboard", active: true },
              { icon: <FileText size={20} />, label: "Invoices", active: false },
              { icon: <CreditCard size={20} />, label: "Payments", active: false },
              { icon: <Package size={20} />, label: "Products", active: false },
              { icon: <Users size={20} />, label: "Customers", active: false },
              { icon: <BarChart3 size={20} />, label: "Reports", active: false },
              { icon: <Settings size={20} />, label: "Settings", active: false },
            ].map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center p-2 rounded-md ${
                    item.active
                      ? "bg-orange-100 text-orange-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {isSidebarOpen && <span>{item.label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            {isSidebarOpen && (
              <>
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                  {userInitials}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">{userName}</p>
                  <p className="text-xs text-gray-500">{userEmail}</p>
                </div>
              </>
            )}
            {!isSidebarOpen && (
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold mx-auto">
                {userInitials}
              </div>
            )}
          </div>
          
          {/* Add logout button to sidebar */}
          {isSidebarOpen && onLogout && (
            <button 
              onClick={onLogout}
              className="mt-4 flex items-center gap-2 w-full rounded-md bg-red-100 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-200 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto w-full">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center rounded-md bg-gray-100 px-3 py-2 w-64">
              <Search size={18} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="relative text-gray-500 hover:text-gray-700">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                  AU
                </div>
                <span className="text-sm font-medium text-gray-700">Admin User</span>
                <ChevronDown size={16} className="text-gray-500" />
              </div>
              
              {/* Add logout button to header for mobile/responsive view */}
              {onLogout && (
                <button 
                  onClick={onLogout}
                  className="hidden sm:flex items-center gap-1 text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 w-full">
          <div className="flex items-center justify-between mb-6 w-full">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-gray-500" />
              <span className="text-sm text-gray-600">
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 text-sm font-medium">Total Revenue</h3>
                <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">+12.5%</span>
              </div>
              <div className="flex items-center gap-4">
                <DollarSign className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">$24,560</p>
                  <p className="text-sm text-gray-500">+2.5k this week</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 text-sm font-medium">Total Orders</h3>
                <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">+8.2%</span>
              </div>
              <div className="flex items-center gap-4">
                <Package className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">1,240</p>
                  <p className="text-sm text-gray-500">+180 this week</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 text-sm font-medium">Total Customers</h3>
                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">-3.1%</span>
              </div>
              <div className="flex items-center gap-4">
                <Users className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">3,120</p>
                  <p className="text-sm text-gray-500">-32 this week</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 text-sm font-medium">Pending Invoices</h3>
                <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full">Pending</span>
              </div>
              <div className="flex items-center gap-4">
                <FileText className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">15</p>
                  <p className="text-sm text-gray-500">Need attention</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
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
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
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