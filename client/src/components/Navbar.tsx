import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, LogOut, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-emerald-800 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="font-bold text-2xl">
            Washington Trails
          </Link>

          <nav className="hidden md:flex space-x-4">
            <Link
              to="/trails"
              className="hover:text-emerald-200 transition-colors"
            >
              Trails
            </Link>
            <Link
              to="/map"
              className="hover:text-emerald-200 transition-colors"
            >
              Map
            </Link>
            <Link
              to="/community"
              className="hover:text-emerald-200 transition-colors"
            >
              Community
            </Link>
            <Link
              to="/about"
              className="hover:text-emerald-200 transition-colors"
            >
              About
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <User className="w-5 h-5" />

            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" >{user.name}</Link>

                <button
                  className="flex items-center bg-emerald-700 hover:bg-emerald-600 px-3 py-2 rounded transition-colors"
                  onClick={logout}
                >
                  <LogOut className="w-5 h-5 mr-1" />
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <h1>Sign in for a more personaliazed experience</h1>
                <button
                  className="flex items-center bg-emerald-700 hover:bg-emerald-600 px-3 py-2 rounded transition-colors"
                  onClick={() => navigate("/login", { state: { from: location } })}
                >
                  <LogIn className="w-5 h-5 mr-1" />
                  Log In
                </button>
              </div>
            )}
          </div>
        
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/trails"
                className="hover:text-emerald-200 transition-colors"
              >
                Trails
              </Link>
              <Link
                to="/map"
                className="hover:text-emerald-200 transition-colors"
              >
                Map
              </Link>
              <Link
                to="/community"
                className="hover:text-emerald-200 transition-colors"
              >
                Community
              </Link>
              <Link
                to="/about"
                className="hover:text-emerald-200 transition-colors"
              >
                About
              </Link>


            {user? (
              <div className="flex items-center space-x-2">
                
                <h1>{user.name}</h1>
                <button
                  className="flex items-center bg-emerald-700 hover:bg-emerald-600 px-3 py-2 rounded transition-colors"
                  onClick={logout}
                >
                  <LogOut className="w-5 h-5 mr-1" />
                  Log Out
                </button>
              </div>

            ): (
              <button
                className="flex items-center bg-emerald-700 hover:bg-emerald-600 px-3 py-2 rounded transition-colors"
                onClick={() => navigate("/login", { state: { from: location.pathname } })}
              >

                <LogIn className="w-5 h-5 mr-1" />
                
                Log In
              </button>
            )}
              




            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
