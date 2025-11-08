import React from 'react';
import DashboardHeader from '~/components/DashboardHeader';
import type { MetaArgs } from "react-router";

export function meta({}: MetaArgs) {
  return [
    { title: "Presensi Kegiatan Caberawit" },
    { name: "description", content: "Presensi Kegiatan Caberawit" },
  ];
}

export default function CbrPresensiKegiatan() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DashboardHeader title="Presensi Kegiatan" bgColor="bg-green-500" />
      <div className="px-6 py-6 grow pl-[250px]">
        <p className='text-black'>Selamat datang di halaman Presensi Kegiatan Caberawit.</p>
      </div>
    </div>
  );
}