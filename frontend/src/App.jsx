import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth'; 
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import RestaurantDash from './pages/RestaurantDash';
import CharityDash from './pages/CharityDash';

function AppContent() {
  const location = useLocation();
  const { user } = useAuth(); 
  
  // THE FIX: Removed '/restaurant' and '/charity' so the Navbar shows up there!
  const hideNavbarOn = ['/login', '/signup'];
  const showNavbar = !hideNavbarOn.includes(location.pathname);

  // Safely extracts the role from the nested user object
  const userRole = user?.user?.role || user?.role;

  return (
    <>
      {showNavbar && <Navbar />}
      <Toaster position="top-center" />
      
      <main className="relative z-0"> 
        <Routes>
          <Route path="/" element={<Landing />} />
          
          <Route path="/login" element={!user ? <Login /> : <Navigate to={userRole === 'restaurant' ? '/restaurant' : '/charity'} />} />
          <Route path="/signup" element={!user ? <Register /> : <Navigate to={userRole === 'restaurant' ? '/restaurant' : '/charity'} />} />
          
          <Route path="/restaurant" element={userRole === 'restaurant' ? <RestaurantDash /> : <Navigate to="/login" />} />
          <Route path="/charity" element={userRole === 'charity' ? <CharityDash /> : <Navigate to="/login" />} />
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