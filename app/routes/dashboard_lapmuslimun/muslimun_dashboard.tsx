import React from 'react';
import DashboardHeader from '~/components/DashboardHeader';
import type { MetaArgs } from "react-router";

export function meta({}: MetaArgs) {
  return [
    { title: "Dashboard Lapmuslimun" },
    { name: "description", content: "Dashboard Laporan Musyawarah Lima Unsur" },
  ];
}

export default function MuslimunDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DashboardHeader title="Dashboard Laporan Musyawarah Lima Unsur" bgColor="bg-sky-500" />
      <div className="px-6 py-6 grow md:pl-64">
        <p className='text-black'>Selamat datang di halaman Dashboard Laporan Musyawarah Lima Unsur.</p>
      </div>
    </div>
  );
}