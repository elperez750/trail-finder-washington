import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, User, LogOut } from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-emerald-800 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="font-bold text-2xl">Washington Trails</Link>
          
          <nav className="hidden md:flex space-x-4">
            <Link to="/trails" className="hover:text-emerald-200 transition-colors">Trails</Link>
            <Link to="/map" className="hover:text-emerald-200 transition-colors">Map</Link>
            <Link to="/community" className="hover:text-emerald-200 transition-colors">Community</Link>
            <Link to="/about" className="hover:text-emerald-200 transition-colors">About</Link>
          </nav>


          <div className="hidden md:flex items-center space-x-4">
            <Link to="/profile" className="flex items-center hover:text-emerald-200 transition-colors">
              <User className="w-5 h-5 mr-1" />
              Profile
            </Link>
            <button className="flex items-center bg-emerald-700 hover:bg-emerald-600 px-3 py-2 rounded transition-colors">
              <LogOut className="w-5 h-5 mr-1" />
              Log Out
            </button>
          </div>

          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <nav className="flex flex-col space-y-2">
              <Link to="/trails" className="hover:text-emerald-200 transition-colors">Trails</Link>
              <Link to="/map" className="hover:text-emerald-200 transition-colors">Map</Link>
              <Link to="/community" className="hover:text-emerald-200 transition-colors">Community</Link>
              <Link to="/about" className="hover:text-emerald-200 transition-colors">About</Link>
              <Link to="/profile" className="hover:text-emerald-200 transition-colors">Profile</Link>
              <button className="flex items-center bg-emerald-700 hover:bg-emerald-600 px-3 py-2 rounded transition-colors">
                <LogOut className="w-5 h-5 mr-1" />
                Log Out
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar