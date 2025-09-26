import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

// Pages
import Accueil from './components/home pages/Accueil';
import Contact from './components/home pages/Contact';
import About from './components/home pages/About';
import Profile from './components/profiles/ProfileHeader';
import Settings from './components/settings/Settings';
import Login from './components/connection/Login';
import AuthTest from './components/test/AuthTest';
import DashboardLayout from './components/layout/DashboardLayout';
import UserList from './components/dashboard/UserList';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRoles }: { children: React.ReactNode, requiredRoles?: string[] }) => {
  const { userRole, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  // If no specific roles are required, any authenticated user can access
  if (!requiredRoles) {
    return children;
  }

  // If specific roles are required, check if user has one of them
  if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Public Layout Component
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

// App Component
function App() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      setTimeout(() => {
        scroller.scrollTo(id, {
          smooth: true,
          offset: -100,
          duration: 500
        });
      }, 0);
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Navbar />
              <Accueil />
              <About />
              <Contact />
              <Footer />
            </>
          } />

          <Route path="/login" element={<Login />} />
          
          {/* Test route - remove in production */}
          <Route path="/test-auth" element={<AuthTest />} />

          {/* Dashboard Layout - All dashboard routes are nested here */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="userslist" element={<UserList />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={
            <div className="flex items-center justify-center h-screen">
              <h2 className="text-2xl font-bold">404 - Page Not Found</h2>
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
