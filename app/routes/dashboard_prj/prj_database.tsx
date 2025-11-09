import React from 'react';
import DashboardHeader from '~/components/DashboardHeader';
import type { MetaArgs } from "react-router";

export function meta({}: MetaArgs) {
  return [
    { title: "Database Pra-Remaja" },
    { name: "description", content: "Database Pra-Remaja" },
  ];
}

export default function PrjDatabase() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DashboardHeader title="Database Pra-Remaja" bgColor="bg-yellow-500" />
      <div className="px-6 py-6 grow md:pl-64">
        <p className='text-black'>Selamat datang di halaman Database Pra-Remaja.</p>
      </div>
    </div>
  );
}