import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../../ui/button";
import { useAuth } from '@/hooks/useAuth';

export interface AuthSectionProps {
    className?: string;
}

export const AuthSection: React.FC<AuthSectionProps> = ({ className }) => {
    const { handleLogout, isAuthenticated, authUser } = useAuth();

    return (
        <div className={className}>
            {!isAuthenticated ? (
                <Link to="/login">
                    <Button variant="default">Sign In</Button>
                </Link>
            ) : (
                <>
                    <div>{authUser?.userName}</div>
                    <Button variant="outline" onClick={handleLogout}>
                        Sign out
                    </Button>
                </>
            )}
        </div>
    );
};