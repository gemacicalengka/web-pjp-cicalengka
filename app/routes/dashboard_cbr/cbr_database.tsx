import React from 'react';
import DashboardHeader from '~/components/DashboardHeader';

export default function CbrDatabase() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DashboardHeader title="Database" bgColor="bg-green-500" />
      <div className="p-4 grow">
        <p className='text-black'>Selamat datang di halaman Database Caberawit.</p>
      </div>
    </div>
  );
}