import axios from 'axios';
import { UserRole } from '../components/types/Roles';

const API_URL = 'http://localhost:3000/api/auth';

export interface SignupData {
  email: string;
  password: string;
  nom: string;
  prenom: string;
  role: UserRole;
  telephone: string;
  adresse: string;
  region?: string;
  surfaceFerme?: string;
  nbrVaches?: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UserData {
  id: string;
  email: string;
  role: UserRole;
  nom: string;
  prenom: string;
}

export interface AuthResponse {
  access_token: string;
  user: UserData;
}

export const authService = {
  async signup(userData: SignupData): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/signup`, userData);
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userRole', response.data.user.role);
      }
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erreur lors de l\'inscription'
      );
    }
  },

  async login(credentials: LoginData): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/login`, credentials);
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userRole', response.data.user.role);
      }
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Email ou mot de passe incorrect'
      );
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
  },

  getCurrentUser(): UserData | null {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) return JSON.parse(userStr);
      return null;
    } catch (e) {
      // If parsing fails, clean up the invalid data
      localStorage.removeItem('user');
      return null;
    }
  },

  getCurrentUserRole(): UserRole | null {
    return localStorage.getItem('userRole') as UserRole || null;
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  hasRole(requiredRole: UserRole): boolean {
    const userRole = this.getCurrentUserRole();
    return userRole === requiredRole;
  },

  hasAnyRole(roles: UserRole[]): boolean {
    const userRole = this.getCurrentUserRole();
    return userRole ? roles.includes(userRole) : false;
  }
};

// Add axios interceptor to include token in requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
