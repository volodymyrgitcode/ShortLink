import { login, register, logout } from '../api/auth';
import { useState } from 'react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { LoginCredentials, RegisterData } from '@/types/auth';


interface UseAuthReturn {
    handleLogin: (credentials: LoginCredentials) => Promise<void>;
    handleRegister: (userData: RegisterData) => Promise<void>;
    handleLogout: () => Promise<void>;
    error: any;
    isAuthenticated: boolean;
    authUser: { id: string, userName: string, email: string } | null;
}

export const useAuth = (): UseAuthReturn => {

    const signIn = useSignIn();
    const signOut = useSignOut()
    const isAuthenticated = useIsAuthenticated();
    const authUser = useAuthUser<{ id: string, userName: string, email: string }>();

    const [error, setError] = useState<any>(null);

    const handleLogin = async (credentials: LoginCredentials): Promise<void> => {
        try {
            const data = await login(credentials);
            signIn({
                auth: {
                    token: data.token,
                    type: 'Bearer',
                },
                userState: { id: data.id, userName: data.userName, email: data.email }
            });
            setError(null);
        } catch (err) {
            setError(err);
        }
    };

    const handleRegister = async (userData: RegisterData): Promise<void> => {
        try {
            const data = await register(userData);

            signIn({
                auth: {
                    token: data.token,
                    type: 'Bearer',
                },
                userState: { id: data.id, userName: data.userName, email: data.email }
            });
            setError(null);
        } catch (err) {
            setError(err);
        }
    };

    const handleLogout = async (): Promise<void> => {
        await logout();
        signOut();
    };

    return { handleLogin, handleRegister, handleLogout, error, isAuthenticated, authUser };
};