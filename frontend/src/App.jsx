import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import RestaurantDash from './pages/RestaurantDash';
import CharityDash from './pages/CharityDash';

// Create a small helper component to handle conditional logic
function AppContent() {
  const location = useLocation();
  
  // Hide navbar on login and signup pages to prevent UI overlap
  const hideNavbarOn = ['/login', '/signup'];
  const showNavbar = !hideNavbarOn.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Toaster position="top-center" />
      
      <main className="relative z-0"> 
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/restaurant" element={<RestaurantDash />} />
          <Route path="/charity" element={<CharityDash />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}