import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';

interface NavItem {
  name: string;
  to: string;
}

interface NavbarProps {
  title: string;
  navItems: NavItem[];
  headerBgColor: string; // e.g., 'bg-green-100', 'bg-yellow-100', 'bg-sky-100'
  defaultTextColor: string; // e.g., 'text-green-500', 'text-yellow-400', 'text-sky-500'
  activeBgColor: string; // e.g., 'bg-green-100', 'bg-yellow-100', 'bg-sky-100'
  activeTextColor: string; // e.g., 'text-gray-800'
  hoverBgColor: string; // e.g., 'bg-green-100', 'bg-yellow-100', 'bg-sky-100'
  hoverTextColor: string; // e.g., 'text-gray-800'
}

const Navbar: React.FC<NavbarProps> = ({
  title,
  navItems,
  headerBgColor,
  defaultTextColor,
  activeBgColor,
  activeTextColor,
  hoverBgColor,
  hoverTextColor,
}) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const hoverBgClass = hoverBgColor.replace('bg-', 'hover:bg-');
  const hoverTextClass = hoverTextColor.replace('text-', 'hover:text-');
  
  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>
      <div
        className={`fixed top-0 left-0 w-full md:w-55 z-40 bg-white flex flex-col h-screen transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className={`${headerBgColor} p-4 shadow-lg`}>
            <div className={`text-2xl font-bold text-center md:text-left text-white`}>{title}</div>
        </div>
        <div className={`p-4`}>
            <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                <Link
                    key={item.to}
                    to={item.to}
                    className={`py-2 px-4 rounded-lg transition-colors duration-200
                      ${location.pathname.startsWith(item.to)
                        ? `${activeBgColor} ${activeTextColor}` // Active state
                        : `${defaultTextColor}` // Default state
                      } ${hoverBgClass} ${hoverTextClass}`
                    }
                >
                    {item.name}
                </Link>
                ))}
            </nav>
        </div>
        <div className="p-4">
            <Link to="/" className={`text-white text-sm py-2 px-4 rounded-lg transition-colors duration-200 bg-red-500 hover:bg-red-700`}>
                ← Kembali
            </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;