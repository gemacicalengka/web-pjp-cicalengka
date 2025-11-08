import React, { useState } from 'react';

interface DashboardHeaderProps {
  title: string;
  bgColor: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, bgColor }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`w-full ${bgColor} p-4 shadow-md md:pl-64`}>
      <div className="flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold">{title}</h1>
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-2">
          {/* Mobile navigation links will go here */}
          <p className="text-white">Menu goes here</p>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;