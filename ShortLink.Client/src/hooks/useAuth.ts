import { login, register } from '../api/auth';
import { useEffect, useState } from 'react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { AuthUser, LoginCredentials, RegisterData } from '@/types/auth';
import { useToast } from '@/components/ui/use-toast';


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
    const signOut = useSignOut();
    const authUser = useAuthUser<AuthUser>();
    const isAuthenticated = useIsAuthenticated();
    const [authStatus, setAuthStatus] = useState(useIsAuthenticated());
    const { toast } = useToast();

    const [error, setError] = useState<any>(null);

    useEffect(() => {
        if (isAuthenticated) {
            setAuthStatus(true);
        } else {
            setAuthStatus(false);
        }
    }, [isAuthenticated]);


    const handleLogin = async (credentials: LoginCredentials): Promise<void> => {
        try {
            const data = await login(credentials);
            const status = signIn({
                auth: {
                    token: data.token,
                    type: 'Bearer',
                },
                userState: { id: data.id, userName: data.userName, email: data.email }
            });
            setAuthStatus(status);

            if (status) {
                toast({
                    title: "Login successful",
                    description: `Welcome back!`,
                });
                setError(null);
            } else {
                throw new Error("Sign in failed");
            }
        } catch (err) {
            setError(err);
            setAuthStatus(false);
            toast({
                variant: "destructive",
                title: "Login failed",
                description: "Error occurred",
            });
        }
    };

    const handleRegister = async (userData: RegisterData): Promise<void> => {
        try {
            const data = await register(userData);
            const status = signIn({
                auth: {
                    token: data.token,
                    type: 'Bearer',
                },
                userState: { id: data.id, userName: data.userName, email: data.email }
            });

            setAuthStatus(status);

            if (status) {
                toast({
                    title: "Registration successful",
                    description: `Welcome!`,
                });
                setError(null);
            } else {
                throw new Error("Sign in failed");
            }
        } catch (err) {
            setError(err);
            setAuthStatus(false);
            toast({
                variant: "destructive",
                title: "Registration failed",
                description: "Error occurred",
            });
        }
    };

    const handleLogout = async (): Promise<void> => {
        signOut();
        setAuthStatus(false);
        toast({
            title: "Logged out",
            description: "You have been successfully logged out.",
        });
    };

    return { handleLogin, handleRegister, handleLogout, error, isAuthenticated: authStatus, authUser: authUser };
};