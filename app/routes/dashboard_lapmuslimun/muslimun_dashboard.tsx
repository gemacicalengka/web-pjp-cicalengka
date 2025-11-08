import React from 'react';
import DashboardHeader from '~/components/DashboardHeader';

export default function MuslimunDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DashboardHeader title="Dashboard Laporan Musyawarah Lima Unsur" bgColor="bg-sky-500" />
      <div className="px-6 py-6 grow pl-[250px]">
        <p className='text-black'>Selamat datang di halaman Dashboard Laporan Musyawarah Lima Unsur.</p>
      </div>
    </div>
  );
}