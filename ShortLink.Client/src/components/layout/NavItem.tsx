import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface NavItemProps {
    href: string;
    label: string;
    isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, label, isActive }) => {
    return (
        <Link to={href}>
            <Button
                variant="ghost"
                className={`inline-flex items-center text-sm font-medium ${isActive
                    ? "border-indigo-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
            >
                {label}
            </Button>
        </Link>
    );
};

export default NavItem;