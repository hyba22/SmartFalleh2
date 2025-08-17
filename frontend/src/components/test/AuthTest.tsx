import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../types/Roles';

const AuthTest: React.FC = () => {
  const { userRole, logout } = useAuth();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Authentication Test Page</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Current Auth State</h2>
        
        <div className="space-y-4">
          <div>
            <span className="font-medium">User Role: </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
              {userRole || 'Not authenticated'}
            </span>
          </div>
          
          <div className="mt-4">
            <h3 className="font-medium mb-2">Test Buttons:</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
              
              <button
                onClick={() => {
                  // Simulate admin login for testing
                  localStorage.setItem('userRole', UserRole.ADMIN);
                  window.location.reload();
                }}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Simulate Admin Login
              </button>
              
              <button
                onClick={() => {
                  // Simulate agriculteur login for testing
                  localStorage.setItem('userRole', UserRole.AGRICULTEUR);
                  window.location.reload();
                }}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Simulate Agriculteur Login
              </button>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-2">Protected Routes Test:</h3>
            <div className="space-y-2">
              <a 
                href="/dashboard" 
                className="block text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Try accessing Dashboard (Admin only)
              </a>
              <a 
                href="/profile" 
                className="block text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Try accessing Profile (Authenticated users)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTest;
