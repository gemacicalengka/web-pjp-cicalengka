import React from 'react';
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

  const hoverBgClass = hoverBgColor.replace('bg-', 'hover:bg-');
  const hoverTextClass = hoverTextColor.replace('text-', 'hover:text-');
  
  return (
    <div className={`w-55 bg-white flex flex-col h-screen`}>
        <div className={`${headerBgColor} p-4 shadow-lg`}>
            <div className={`text-2xl font-bold text-left text-white`}>{title}</div>
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
  );
};

export default Navbar;