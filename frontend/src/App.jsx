import { useState } from "react"
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

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setShowLoginModal(false)
    setIsLoggedIn(true)
  }

  if (isLoggedIn) {
    return <Dashboard />
  }

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
              onClick={() => setShowLoginModal(true)}
              className="flex items-center gap-2 text-sm font-medium text-white"
            >
              <LogIn className="h-4 w-4" />
              Login
            </button>
            <button 
              onClick={() => setShowSignupModal(true)}
              className="flex items-center gap-2 rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              Sign Up
            </button>
          </div>
        </div>
      </header>

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
                  <button className="rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-orange-600 shadow-sm hover:bg-orange-50">
                    Get Started
                  </button>
                  <button className="rounded-md border border-white bg-transparent px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
                    Learn More
                  </button>
                </div>
              </div>
              <div className="hidden lg:block">
                <img 
                  src="/dashboard-preview.png" 
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
                  image: "/team/member1.jpg"
                },
                {
                  name: "Harshit Kumar",
                  role: "Frontend Developer",
                  image: "/team/member2.jpg"
                },
                {
                  name: "Nitin Nigam",
                  role: "Backend Developer",
                  image: "/team/member3.jpg"
                },
                {
                  name: "Ishit Kalra",
                  role: "UI/UX Designer",
                  image: "/team/member4.jpg"
                },
                {
                  name: "Aviral Singh",
                  role: "DevOps Engineer",
                  image: "/team/member5.jpg"
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

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
              >
                Login
              </button>
            </form>
            <button
              onClick={() => setShowLoginModal(false)}
              className="mt-4 text-sm text-gray-600 hover:text-gray-900"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
              >
                Sign Up
              </button>
            </form>
            <button
              onClick={() => setShowSignupModal(false)}
              className="mt-4 text-sm text-gray-600 hover:text-gray-900"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
