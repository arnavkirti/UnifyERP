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
          {/* Rest of your dashboard content remains unchanged */}
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

          {/* Stats Cards and other content remain the same */}
          {/* ... */}
        </div>
      </div>
    </div>
  );
}