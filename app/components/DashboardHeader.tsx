import React from 'react';

interface DashboardHeaderProps {
  title: string;
  bgColor: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, bgColor }) => {
  return (
    <div className={`w-full ${bgColor} p-4 shadow-md pl-[250px]`}>
      <h1 className="text-white text-2xl font-bold">{title}</h1>
    </div>
  );
};

export default DashboardHeader;