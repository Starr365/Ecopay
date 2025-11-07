import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Environment variable for API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/proxy-api';

// Types for API responses
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  walletAddress?: string;
}

export interface Transaction {
  id: string;
  type: 'sent' | 'received' | 'offset';
  description: string;
  amount: number;
  time: string;
  fee?: number;
}

export interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
}

export interface CarbonProject {
  id: string;
  name: string;
  description: string;
  impact: string;
  status?: 'active' | 'completed';
}

// Request interfaces
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface TransactionRequest {
  recipientId: string;
  amount: number;
  description?: string;
  carbonFootprint?: number;
  category?: string;
}

export interface SavingsRequest {
  name: string;
  target: number;
  due: string;
}

export interface AddSavingsRequest {
  savingsId: string;
  amount: number;
}

export interface ProjectRequest {
  name: string;
  description: string;
  impact: string;
}

export interface OffsetRequest {
  projectId: string;
  amount: number;
  currency?: 'cUSD' | 'cEUR';
  co2Offset?: number;
}

// API Service Class
class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for authentication
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Handle unauthorized - clear token and redirect to login
          this.clearAuthToken();
          if (typeof window !== 'undefined') {
            window.location.href = '/auth';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  private setAuthToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  private clearAuthToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  // Authentication methods
  async register(data: RegisterRequest): Promise<ApiResponse<User>> {
    try {
      const response = await this.axiosInstance.post('/auth/signup', data);
      if (response.data.token) {
        this.setAuthToken(response.data.token);
      }
      return { success: true, data: response.data.user };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async login(data: LoginRequest): Promise<ApiResponse<User>> {
    try {
      const response = await this.axiosInstance.post('/auth/signin', data);
      if (response.data.token) {
        this.setAuthToken(response.data.token);
      }
      return { success: true, data: response.data.user };
    } catch (error) {
      return this.handleError(error);
    }
  }

  logout(): void {
    this.clearAuthToken();
  }

  // Transaction methods
  async makeTransaction(data: TransactionRequest): Promise<ApiResponse<Transaction>> {
    try {
      const response = await this.axiosInstance.post('/transactions', data);
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getTransactions(): Promise<ApiResponse<Transaction[]>> {
    try {
      const response = await this.axiosInstance.get('/transactions');
      // Handle both wrapped and direct responses
      const data = response.data?.data || response.data;
      return { success: true, data: Array.isArray(data) ? data : [] };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Balance methods
  async addUserBalance(amount: number): Promise<ApiResponse<{ balance: number }>> {
    try {
      const response = await this.axiosInstance.post('/users/balance', { amount });
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Profile methods
  async getUserProfile(): Promise<ApiResponse<User>> {
    try {
      const response = await this.axiosInstance.get('/profile');
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Savings methods
  async createSavings(data: SavingsRequest): Promise<ApiResponse<SavingsGoal>> {
    try {
      const response = await this.axiosInstance.post('/savings', data);
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getSavings(): Promise<ApiResponse<SavingsGoal[]>> {
    try {
      const response = await this.axiosInstance.get('/savings');
      // Handle both wrapped and direct responses
      const data = response.data?.data || response.data;
      return { success: true, data: Array.isArray(data) ? data : [] };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async addSavingsMoney(savingsId: string, amount: number): Promise<ApiResponse<SavingsGoal>> {
    try {
      const response = await this.axiosInstance.put(`/savings/${savingsId}`, { amount });
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Wallet methods
  async connectWallet(address: string): Promise<ApiResponse<{ connected: boolean }>> {
    try {
      const response = await this.axiosInstance.post('/auth/wallet', { address });
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Carbon offset methods
  async createProject(data: ProjectRequest): Promise<ApiResponse<CarbonProject>> {
    try {
      const response = await this.axiosInstance.post('/projects', data);
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async offsetProject(data: OffsetRequest): Promise<ApiResponse<{ offsetId: string }>> {
    try {
      const response = await this.axiosInstance.post('/projects', data);
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAllProjects(): Promise<ApiResponse<CarbonProject[]>> {
    try {
      const response = await this.axiosInstance.get('/projects');
      // Handle both wrapped and direct responses
      const data = response.data?.data || response.data;
      return { success: true, data: Array.isArray(data) ? data : [] };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Error handling utility
  private handleError<T>(error: unknown): ApiResponse<T> {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      return {
        success: false,
        error: axiosError.response?.data?.message || axiosError.message || 'An error occurred',
      };
    }
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;