import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Map from './pages/Map';
import Trails from './pages/Trails';
import Community from './pages/Community';
import About from './pages/About';
import Profile from './pages/Profile';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import MainLayout from './layout/MainLayout';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import IndividualTrailPage from './pages/IndividualTrail';


function App() {
  return (
    <Router>
      <Routes>
        {/* Routes wrapped in MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/map" element={<Map />} />
          <Route path="/trails" element={<Trails />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/trail/:id" element={<IndividualTrailPage />} />
        </Route>

        {/* Separate Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
