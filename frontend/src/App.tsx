import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { AuthProvider, useAuth } from './context/AuthContext';

import Accueil from './components/home pages/Accueil';
import Contact from './components/home pages/Contact';
import About from './components/home pages/About';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Profile from './components/profiles/Profile';
import Dashboard from './components/dashboard/Dashboard';
import Settings from './components/settings/Settings';
import SideBar from './components/sidebar/SideBar';
import Login from './components/connection/Login';
import AuthTest from './components/test/AuthTest';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRoles }: { children: React.ReactNode, requiredRoles?: string[] }) => {
  const { userRole, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && !requiredRoles.includes(userRole)) {
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
        <div className="relative min-h-screen">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <PublicLayout>
                <Accueil />
                <About />
                <Contact />
              </PublicLayout>
            } />

            <Route path="/login" element={
              <PublicLayout>
                <Login />
              </PublicLayout>
            } />
            
            {/* Test route - remove in production */}
            <Route path="/test-auth" element={
              <PublicLayout>
                <AuthTest />
              </PublicLayout>
            } />

            {/* Protected Routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            <Route path="/dashboard" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />

            <Route path="/sidebar" element={
              <ProtectedRoute>
                <SideBar />
              </ProtectedRoute>
            } />

            {/* 404 Route */}
            <Route path="*" element={
              <PublicLayout>
                <div className="flex items-center justify-center h-[60vh]">
                  <h2 className="text-2xl font-bold">404 - Page Not Found</h2>
                </div>
              </PublicLayout>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App
