import React from 'react';

const Header = () => (
    <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Store Ratings</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="#" className="hover:text-gray-300 transition-colors">Home</a></li>
                    <li><a href="#" className="hover:text-gray-300 transition-colors">About</a></li>
                </ul>
            </nav>
        </div>
    </header>
);

export default Header;
