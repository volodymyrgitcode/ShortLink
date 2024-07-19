import React from 'react';
import { Link } from 'react-router-dom';
import { NavItems } from './NavItems';
import { AuthSection } from './AuthSection';

const Navbar: React.FC = () => {
    return (
        <nav className="shadow-sm">
            <div className="max-w-4xl xl:max-w-5xl mx-auto px-4">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/">
                                <span className="text-xl font-bold text-gray-800">ShortLink</span>
                            </Link>
                        </div>
                        <NavItems className="hidden sm:ml-6 sm:flex" />
                    </div>
                    <AuthSection className="hidden sm:flex sm:items-center  gap-4" />
                </div>
            </div>
        </nav>
    );
};
export default Navbar;




