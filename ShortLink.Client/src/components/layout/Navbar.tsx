import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "../ui/button";
import NavItem from './NavItem';
import { useAuth } from '@/hooks/useAuth';


interface NavItemType {
    href: string;
    label: string;
}

const navItems: NavItemType[] = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
];

const Navbar: React.FC = () => {
    const location = useLocation();
    const { handleLogout, isAuthenticated, authUser } = useAuth();

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-4xl xl:max-w-5xl mx-auto px-4">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/">
                                <span className="text-xl font-bold text-gray-800">ShortLink</span>
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex ">
                            {navItems.map((item) => (
                                <NavItem
                                    key={item.href}
                                    href={item.href}
                                    label={item.label}
                                    isActive={location.pathname === item.href}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center gap-5">

                        {!isAuthenticated && (
                            <>
                                <Link to="/login">
                                    <Button variant="default">Sign In</Button>
                                </Link>
                            </>
                        )}

                        {isAuthenticated && (
                            <>
                                <div className=''>{authUser?.userName}</div>
                                <Button variant="outline" onClick={() => { handleLogout(); }}>Sign out</Button>
                            </>
                        )}


                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;