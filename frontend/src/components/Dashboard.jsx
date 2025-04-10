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
} from "lucide-react";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
                  AU
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Admin User</p>
                  <p className="text-xs text-gray-500">admin@unifyerp.com</p>
                </div>
              </>
            )}
            {!isSidebarOpen && (
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold mx-auto">
                AU
              </div>
            )}
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 w-full">
            {[
              {
                title: "Total Revenue",
                value: "$24,560",
                change: "+2.5%",
                isPositive: true,
                icon: <DollarSign className="text-green-500" />,
              },
              {
                title: "Pending Invoices",
                value: "45",
                change: "+0.8%",
                isPositive: true,
                icon: <FileText className="text-blue-500" />,
              },
              {
                title: "Active Customers",
                value: "256",
                change: "+4.2%",
                isPositive: true,
                icon: <Users className="text-purple-500" />,
              },
              {
                title: "Overdue Payments",
                value: "12",
                change: "-2.0%",
                isPositive: false,
                icon: <CreditCard className="text-red-500" />,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-500">{stat.title}</span>
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    {stat.icon}
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                    <div
                      className={`flex items-center text-sm ${
                        stat.isPositive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {stat.isPositive ? (
                        <ArrowUpRight size={16} className="mr-1" />
                      ) : (
                        <ArrowDownRight size={16} className="mr-1" />
                      )}
                      <span>{stat.change} from last month</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Invoices */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Recent Invoices</h2>
                <button className="text-sm text-orange-600 hover:text-orange-700">
                  View All
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    {
                      id: "INV-300100171617",
                      customer: "Acme Corp",
                      amount: "$1,250.00",
                      date: "May 15, 2023",
                      status: "Paid",
                    },
                    {
                      id: "INV-300100171618",
                      customer: "Globex Inc",
                      amount: "$3,200.00",
                      date: "May 14, 2023",
                      status: "Pending",
                    },
                    {
                      id: "INV-300100171619",
                      customer: "Stark Industries",
                      amount: "$4,500.00",
                      date: "May 13, 2023",
                      status: "Overdue",
                    },
                    {
                      id: "INV-300100171620",
                      customer: "Wayne Enterprises",
                      amount: "$2,800.00",
                      date: "May 12, 2023",
                      status: "Paid",
                    },
                    {
                      id: "INV-300100171621",
                      customer: "Oscorp",
                      amount: "$1,750.00",
                      date: "May 11, 2023",
                      status: "Pending",
                    },
                  ].map((invoice, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {invoice.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {invoice.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {invoice.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {invoice.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            invoice.status === "Paid"
                              ? "bg-green-100 text-green-800"
                              : invoice.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Data Mapping Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">ERP Integration Status</h2>
                <button className="text-sm text-orange-600 hover:text-orange-700">
                  View Details
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-md font-medium text-gray-700">Oracle Integration</h3>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Invoices</span>
                      <span className="text-sm font-medium text-gray-800">245 mapped</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Payment Terms</span>
                      <span className="text-sm font-medium text-gray-800">12 mapped</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-md font-medium text-gray-700">SAP Integration</h3>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      In Progress
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Invoices</span>
                      <span className="text-sm font-medium text-gray-800">156 mapped</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Payment Terms</span>
                      <span className="text-sm font-medium text-gray-800">8 mapped</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}