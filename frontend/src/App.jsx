import { Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import NormalUserDashboard from './pages/NormalUserDashboard.jsx';
import StoreOwnerDashboard from './pages/StoreOwnerDashboard.jsx';
import About from './pages/About.jsx';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<NormalUserDashboard />} />
        <Route path="/store-owner-dashboard" element={<StoreOwnerDashboard />} />
        {/* Add a catch-all route for 404 Not Found pages if desired */}
        <Route path="/about" element={<About />} /> // Add the route for the About page
       <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;