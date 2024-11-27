import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <div>
      <footer className="bg-emerald-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Washington Trails. All rights reserved.</p>
          <nav className="mt-4">
            <Link to="/about" className="text-emerald-200 hover:text-white mx-2">About</Link>
            <Link to="/contact" className="text-emerald-200 hover:text-white mx-2">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default Footer
