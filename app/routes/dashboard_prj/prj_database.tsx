import React from 'react';
import DashboardHeader from '~/components/DashboardHeader';

export default function PrjDatabase() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DashboardHeader title="Database Pra-Remaja" bgColor="bg-yellow-500" />
      <div className="p-4 grow">
        <p className='text-black'>Selamat datang di halaman Database Pra-Remaja.</p>
      </div>
    </div>
  );
}