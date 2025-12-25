import React from 'react';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={onMenuClick}
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <h1 className="ml-4 md:ml-0 text-xl font-semibold text-gray-900">
              Admin Dashboard
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button
              type="button"
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            
            {/* User menu */}
            <div className="relative">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;