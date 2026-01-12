import axios from 'axios';
import { UserRole } from '../components/types/Roles';

const API_URL = 'http://localhost:3008/api/auth';

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
  async signup(userData: SignupData): Promise<{ user: UserData }> {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/signup`, userData);
<<<<<<< HEAD
      // Return only the user data without setting auth tokens
      return { user: response.data.user };
=======
      const { access_token, user } = response.data;
      if (access_token && user) {
        localStorage.setItem('token', access_token);
        localStorage.setItem('role', user.role);
        localStorage.setItem('email', user.email);
        localStorage.setItem('id', user.id);
        localStorage.setItem('user', JSON.stringify(user)); // ✅ حفظ بيانات المستخدم كاملة
      }
      return response.data;
>>>>>>> 35ddaa2 (Modifications backend et frontend terminées)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erreur lors de l'inscription");
    }
  },

  async login(credentials: LoginData): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/login`, credentials);
      const { access_token, user } = response.data;
      if (access_token && user) {
        localStorage.setItem('token', access_token);
        localStorage.setItem('role', user.role);
        localStorage.setItem('email', user.email);
        localStorage.setItem('id', user.id);
        localStorage.setItem('user', JSON.stringify(user)); // ✅ حفظ بيانات المستخدم كاملة
      }
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Email ou mot de passe incorrect');
    }
  },

  logout() {
    // ✅ مسح جميع البيانات عند الخروج
    localStorage.clear();
    sessionStorage.clear();
    console.log('🚪 Déconnexion réussie : LocalStorage vidé.');
  },

  getCurrentUser(): UserData | null {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      localStorage.removeItem('user');
      return null;
    }
  },

  getCurrentUserRole(): UserRole | null {
    return localStorage.getItem('role') as UserRole || null;
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

// ✅ Ajouter l'intercepteur pour inclure le token dans chaque requête
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
