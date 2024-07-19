import apiClient from '@/api/apiClient';
import { AUTH_ENDPOINTS } from '@/config/config';
import { AuthResponse, LoginCredentials, RegisterData } from '@/types/auth';


export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, credentials);
    return response.data;
};

export const register = async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(AUTH_ENDPOINTS.REGISTER, userData);
    return response.data;
};

export const logout = async (): Promise<void> => {
    await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
};
