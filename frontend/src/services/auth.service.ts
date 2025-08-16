import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

export interface SignupData {
  email: string;
  password: string;
  nom: string;
  prenom: string;
  role: string;
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

export const authService = {
  async signup(userData: SignupData) {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erreur lors de l\'inscription'
      );
    }
  },

  async login(credentials: LoginData) {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
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
  },

  getCurrentUser() {
    try {
      const user = localStorage.getItem('user');
      if (!user) return null;
      // Check if the string is valid JSON
      const parsed = JSON.parse(user);
      // Validate the parsed object has required fields
      if (parsed && typeof parsed === 'object' && 'email' in parsed) {
        return parsed;
      }
      // If we get here, the data is invalid - clean it up
      localStorage.removeItem('user');
      return null;
    } catch (e) {
      // If parsing fails, clean up the invalid data
      localStorage.removeItem('user');
      return null;
    }
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};

// Add axios interceptor to include token in requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
