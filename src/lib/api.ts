import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// Token management
const TOKEN_KEY = 'auth_token';

// Function to get token from storage (using memory as fallback for SSR)
let inMemoryToken: string | null = null;
const getToken = (): string | null => {
  if (typeof window === 'undefined') return inMemoryToken;
  
  // Try to get from localStorage if in browser environment
  try {
    return localStorage.getItem(TOKEN_KEY) || inMemoryToken;
  } catch (e) {
    return inMemoryToken;
  }
};

// Function to save token
export const setToken = (token: string | null): void => {
  inMemoryToken = token;
  
  if (typeof window !== 'undefined' && token) {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (e) {
      console.error('Error saving token to localStorage:', e);
    }
  } else if (typeof window !== 'undefined' && !token) {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (e) {
      console.error('Error removing token from localStorage:', e);
    }
  }
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
// Create an axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach Authorization header with JWT token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling common error scenarios
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { response } = error;
    
    // Handle common error scenarios
    if (response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      setToken(null);
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Type for API error responses
export interface ApiError {
  message: string;
  statusCode: number;
}

// Helper function to handle API responses
const handleResponse = async <T>(promise: Promise<AxiosResponse<T>>): Promise<T> => {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiError;
    }
    throw { message: 'An unexpected error occurred', statusCode: 500 };
  }
};

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await handleResponse<{ token: string; user: any }>(
      api.post('/auth/login', { email, password })
    );
    
    // Store the JWT token
    if (response.token) {
      setToken(response.token);
    }
    
    return response;
  },
  
  register: async (name: string, email: string, password: string) => {
    const response = await handleResponse<{ token: string; user: any }>(
      api.post('/auth/register', { name, email, password })
    );
    
    // Store the JWT token
    if (response.token) {
      setToken(response.token);
    }
    
    return response;
  },
  
  logout: () => {
    // Clear the token on logout
    setToken(null);
  },
  
  // getSession: () => 
  //   handleResponse(api.get('/auth/session')),
    
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!getToken();
  }
};

// Hackathons API
export const hackathonsApi = {
  getAll: () => 
    handleResponse(api.get('/hackathons')),
  
  getById: (id: string) => 
    handleResponse(api.get(`/hackathons/${id}`)),
  
  register: (hackathonId: string, teamId: string) => 
    handleResponse(api.post(`/hackathons/${hackathonId}/register`, { teamId })),
};

// Teams API
export const teamsApi = {
  getMyTeams: () => 
    handleResponse(api.get('/teams')),
  
  getById: (id: string) => 
    handleResponse(api.get(`/teams/${id}`)),
  
  create: (teamData: {
    name: string;
    description: string;
    hackathonId?: string;
    projectName?: string;
    projectDescription?: string;
    projectRepo?: string;
    projectDemo?: string;
  }) => 
    handleResponse(api.post('/teams', teamData)),
  
  update: (id: string, teamData: Partial<{
    name: string;
    description: string;
    hackathonId?: string;
    projectName?: string;
    projectDescription?: string;
    projectRepo?: string;
    projectDemo?: string;
  }>) => 
    handleResponse(api.put(`/teams/${id}`, teamData)),
  
  leave: (teamId: string) => 
    handleResponse(api.post(`/teams/${teamId}/leave`)),
  
  inviteMember: (teamId: string, email: string) => 
    handleResponse(api.post(`/teams/${teamId}/invite`, { email })),
  
  join: (inviteCode: string) => 
    handleResponse(api.post('/teams/join', { inviteCode })),
};

// Users API
export const usersApi = {
  getProfile: () => 
    handleResponse(api.get('/users/profile')),
  
  updateProfile: (userData: {
    name?: string;
    bio?: string;
    skills?: string[];
  }) => 
    handleResponse(api.put('/users/profile', userData)),
};

export default api;
