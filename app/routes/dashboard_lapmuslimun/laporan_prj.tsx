import React from 'react';
import DashboardHeader from '~/components/DashboardHeader';
import type { MetaArgs } from "react-router";

export function meta({}: MetaArgs) {
  return [
    { title: "Laporan Pra-Remaja" },
    { name: "description", content: "Laporan Pra-Remaja" },
  ];
}

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