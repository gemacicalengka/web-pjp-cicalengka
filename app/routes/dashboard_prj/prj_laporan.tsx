import React from 'react';
import DashboardHeader from '~/components/DashboardHeader';

export default function PrjLaporan() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DashboardHeader title="Laporan Pra-Remaja" bgColor="bg-yellow-500" />
      <div className="p-4 grow">
        <p className='text-black'>Selamat datang di halaman Laporan Pra-Remaja.</p>
      </div>
    </div>
  );
}