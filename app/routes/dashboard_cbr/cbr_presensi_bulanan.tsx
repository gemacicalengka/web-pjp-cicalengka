import React from 'react';
import DashboardHeader from '~/components/DashboardHeader';

export default function CbrPresensiBulanan() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DashboardHeader title="Presensi Bulanan" bgColor="bg-green-500" />
      <div className="p-4 grow">
        <p className='text-black'>Selamat datang di halaman Presensi Bulanan Caberawit.</p>
      </div>
    </div>
  );
}