import React from 'react';
import DashboardHeader from '~/components/DashboardHeader';

export default function LaporanPrj() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DashboardHeader title="Laporan Pra-Remaja" bgColor="bg-sky-500" />
      <div className="px-6 py-6 grow md:pl-64">
        <p className='text-black'>Selamat datang di halaman Laporan Pra-Remaja.</p>
      </div>
    </div>
  );
}