import React from 'react';
import DashboardHeader from '~/components/DashboardHeader';

export default function LaporanRmj() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DashboardHeader title="Laporan Remaja" bgColor="bg-sky-500" />
      <div className="px-6 py-6 grow md:pl-64">
        <p className='text-black'>Selamat datang di halaman Laporan Remaja.</p>
      </div>
    </div>
  );
}