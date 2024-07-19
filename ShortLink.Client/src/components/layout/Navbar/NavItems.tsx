import React from 'react';
import { useLocation } from 'react-router-dom';
import NavItem from './NavItem';

export interface NavItemType {
    href: string;
    label: string;
}

const navItems: NavItemType[] = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
];

interface NavItemsProps {
    className?: string;
}
export const NavItems: React.FC<NavItemsProps> = ({ className }) => {
    const location = useLocation();

    return (
        <div className={className}>
            {navItems.map(({ href, label }) => (
                <NavItem
                    key={href}
                    href={href}
                    label={label}
                    isActive={location.pathname === href}
                />
            ))}
        </div>
    );
};