import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import {
  ChevronRight,
  Code,
  FileText,
  Layers,
  Lock,
  Server,
  Settings,
  Users,
  LogIn,
  UserPlus
} from "lucide-react"
import Dashboard from "./components/Dashboard"
import ApiTesting from "./components/ApiTesting"
import { authService } from "./services/authService"
import Documentation from "./components/Documentation";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await authService.isAuthenticated();
      if (authenticated) {
        const userInfo = await authService.getUserInfo();
        setUser(userInfo);
      }
      setIsLoggedIn(authenticated);
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const handleLogin = () => {
    authService.login();
  }

  const handleLogout = async () => {
    const success = await authService.logout();
    if (success) {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // If logged in, show the app with routes
  if (isLoggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard onLogout={handleLogout} user={user} />} />
          <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} user={user} />} />
          <Route path="/invoices" element={<Dashboard onLogout={handleLogout} user={user} />} />
          <Route path="/payments" element={<Dashboard onLogout={handleLogout} user={user} />} />
          <Route path="/products" element={<Dashboard onLogout={handleLogout} user={user} />} />
          <Route path="/customers" element={<Dashboard onLogout={handleLogout} user={user} />} />
          <Route path="/analytics" element={<Dashboard onLogout={handleLogout} user={user} />} />
          <Route path="/api-testing" element={<ApiTesting />} />
          <Route path="/documentation" element={<Documentation />} /> {/* Add this line */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    );
  }

  // Landing page for non-logged in users
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="w-full max-w-[1920px] mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <img src="src/assets/logo.png" alt="ICICI Bank Logo" className="h-16 w-auto" />
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#features" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
              Features
            </a>
            <a href="#team" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
              Our Team
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleLogin}
              className="flex items-center gap-2 rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 transition-colors"
            >
              <LogIn className="h-4 w-4" />
              Login with OAuth
            </button>
          </div>
        </div>
      </header>

      {/* Rest of your landing page content remains the same */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-orange-600 to-orange-700 py-20">
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="w-full max-w-[1920px] mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                  Unified ERP Solution for Modern Business
                </h1>
                <p className="mt-6 text-lg text-orange-50">
                  Streamline your business operations with our comprehensive ERP system. 
                  Integrate, automate, and grow with confidence.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <button 
                    onClick={handleLogin}
                    className="rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-orange-600 shadow-sm hover:bg-orange-50"
                  >
                    Get Started
                  </button>
                  <a 
                    href="#features"
                    className="rounded-md border border-white bg-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-grey/10 inline-flex items-center"
                  >
                    Learn More
                  </a>
                </div>
              </div>
              <div className="hidden lg:block">
                <img 
                  src="src/assets/dashboard.png" 
                  alt="Dashboard Preview" 
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="w-full max-w-[1920px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
              <p className="mt-4 text-lg text-gray-600">
                Everything you need to manage your business efficiently
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="h-12 w-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Integrated System</h3>
                <p className="text-gray-600">
                  Seamlessly connect all your business processes in one unified platform.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="h-12 w-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Enhanced Security</h3>
                <p className="text-gray-600">
                  Enterprise-grade security measures to protect your business data.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="h-12 w-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Automation</h3>
                <p className="text-gray-600">
                  Automate routine tasks and streamline your business workflows.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-20">
          <div className="w-full max-w-[1920px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Team Enigma</h2>
              <p className="mt-4 text-lg text-gray-600">
                Meet the talented individuals behind UnifyERP
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
              {[
                {
                  name: "Arnav Kirti",
                  role: "Team Lead",
                  image: "src/assets/mem-1.png"
                },
                {
                  name: "Harshit Kumar",
                  role: "Frontend Developer",
                  image: "src/assets/mem-2.png"
                },
                {
                  name: "Nitin Nigam",
                  role: "Backend Developer",
                  image: "src/assets/mem-2.png"
                },
                {
                  name: "Ishit Kalra",
                  role: "UI/UX Designer",
                  image: "src/assets/mem-2.png"
                },
                {
                  name: "Aviral Singh",
                  role: "DevOps Engineer",
                  image: "src/assets/mem-2.png"
                }
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative mx-auto w-32 h-32 mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="rounded-full object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} UnifyERP. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
