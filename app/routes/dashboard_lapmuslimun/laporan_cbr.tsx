import React from 'react';
import DashboardHeader from '~/components/DashboardHeader';

export default function LaporanCbr() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DashboardHeader title="Laporan Caberawit" bgColor="bg-sky-500" />
      <div className="p-4 grow">
        <p className='text-black'>Selamat datang di halaman Laporan Caberawit.</p>
      </div>
    </div>
  );
}