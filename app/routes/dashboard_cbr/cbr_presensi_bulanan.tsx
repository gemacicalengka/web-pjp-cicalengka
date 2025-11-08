import React from 'react';
import DashboardHeader from '~/components/DashboardHeader';
import type { MetaArgs } from "react-router";

export function meta({}: MetaArgs) {
  return [
    { title: "Presensi Bulanan Caberawit" },
    { name: "description", content: "Presensi Bulanan Caberawit" },
  ];
}

export default function CbrPresensiBulanan() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DashboardHeader title="Presensi Bulanan" bgColor="bg-green-500" />
      <div className="px-6 py-6 grow md:pl-64">
        <p className='text-black'>Selamat datang di halaman Presensi Bulanan Caberawit.</p>
      </div>
    </div>
  );
}