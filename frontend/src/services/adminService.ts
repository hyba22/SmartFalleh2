import axios from 'axios';

// Define the shape of the user data we expect to update
export interface UpdateUserData {
  nom?: string;
  prenom?: string;
  email?: string;
  password?: string;
  telephone?: string;
  adresse?: string;
}

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:3008/api', // API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Update user information
 * @param userId - The ID of the user to update
 * @param userData - The updated user data
 * @returns A promise that resolves to the updated user data
 */
export const updateUser = async (userId: string, userData: UpdateUserData) => {
  try {
    const response = await api.patch(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle specific error responses from the server
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to update user');
      } else if (error.request) {
        throw new Error('No response received from server');
      }
    }
    throw new Error('An error occurred while updating user');
  }

};

//Getting all users 
export const getAllUsers = async () => {
    try {
      const response = await api.get('/user');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle specific error responses from the server
        if (error.response) {
          throw new Error(error.response.data.message || 'Failed to fetch users');
        } else if (error.request) {
          throw new Error('No response received from server');
        }
      }
      throw new Error('An error occurred while fetching users');
    }
  };


