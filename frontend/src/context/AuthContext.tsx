import { type ReactNode, useCallback } from 'react';
import { createContext, useContext, useState, useEffect } from "react";
import { UserRole } from "../components/types/Roles";

interface AuthContextType {
  userRole: UserRole | null;
  isLoading: boolean;
  setUserRole: (role: UserRole) => void;
  logout: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole | null>(() => {
    // Initialize from localStorage if available
    const savedRole = localStorage.getItem('userRole');
    return savedRole ? (savedRole as UserRole) : null;
  });
  
  const [isLoading, setIsLoading] = useState(true);

  // Logout function
  const logout = useCallback(async (): Promise<boolean> => {
    try {
      // Call backend logout if needed
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Add your logout API call here if needed
          // await authService.logout();
        } catch (error) {
          console.error('Logout API call failed:', error);
          // Continue with local logout even if API call fails
        }
      }
      
      // Clear all auth data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      setUserRole(null);
      
      return true; // Success
    } catch (error) {
      console.error('Logout failed:', error);
      return false; // Failure
    }
  }, []);

  useEffect(() => {
    // Fetch user role from backend (NestJS)
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoading(false);
          // Clear any existing role if no token is present
          setUserRole(null);
          return;
        }

        const response = await fetch("http://localhost:3000/api/auth/me", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('User data from /me:', data); // Debug log
          
          if (data?.role) {
            setUserRole(data.role);
            localStorage.setItem('userRole', data.role);
            localStorage.setItem('user', JSON.stringify(data)); // Store user data for later use
          } else {
            console.error('No role found in response:', data);
            throw new Error('Invalid user data received');
          }
        } else if (response.status === 401) {
          // If token is invalid or expired, clear auth data
          localStorage.removeItem('token');
          localStorage.removeItem('userRole');
          setUserRole(null);
        } else {
          console.error('Failed to fetch user role:', response.status, response.statusText);
          const responseText = await response.text();
          console.error('Response text:', responseText);
        }
      } catch (error) {
        console.error("Failed to fetch user role", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  const value = {
    userRole,
    isLoading,
    setUserRole: (role: UserRole) => {
      setUserRole(role);
      localStorage.setItem('userRole', role);
    },
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
