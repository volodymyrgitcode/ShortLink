import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "../ui/button";
import NavItem from './NavItem';

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

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/">
                                <span className="text-xl font-bold text-gray-800">ShortLink</span>
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
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
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <Link to="/login">
                            <Button variant="outline">Sign In</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;