import './App.css'
import SignInForm from "./components/SignInForm"
import SignUpForm from "./components/SignUpForm";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Map from "./pages/Map";
import Trails from "./pages/Trails";
import Community from "./pages/Community";
import About from "./pages/About";
import MainLayout from './layout/MainLayout';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';


function App() {
  return (
  
      <Router>
        <Routes>
        <Route element={<MainLayout children={<Routes />} />}>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/map" element={<Map />} />
          <Route path="/trails" element={<Trails />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
        </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      
      </Router>
   
  );
}



export default App
