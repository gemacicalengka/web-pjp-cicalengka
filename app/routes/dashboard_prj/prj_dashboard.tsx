import React from 'react';
import DashboardHeader from '~/components/DashboardHeader';
import type { MetaArgs } from "react-router";

export function meta({}: MetaArgs) {
  return [
    { title: "Dashboard Pra-Remaja" },
    { name: "description", content: "Dashboard Pra-Remaja" },
  ];
}

export default function PrjDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DashboardHeader title="Dashboard Pra-Remaja" bgColor="bg-yellow-500" />
      <div className="px-6 py-6 grow md:pl-64">
        <p className='text-black'>Selamat datang di halaman Dashboard Pra-Remaja.</p>
      </div>
    </div>
  );
}