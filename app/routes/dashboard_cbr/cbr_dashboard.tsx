import React, { useState, useEffect } from 'react';
import DashboardHeader from '~/components/DashboardHeader';
import type { MetaArgs } from "react-router";
import { getAllCbrData } from '~/routes/database/data_cbr';
import type { CbrData } from '~/routes/database/data_cbr';
import type { JSX } from "react";
import { calculateCbrStatistics } from './cbr_dashboard_utils';
import type { CbrStatistics } from './cbr_dashboard_utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faMars, faVenus, faChartBar, faBookOpen, faUsersGear } from '@fortawesome/free-solid-svg-icons';

// SummaryCard component from dashboard.tsx
function SummaryCard({ title, value, icon: Icon }: { title: string; value: string; icon: any }) {
  return (
    <div className="rounded-xl border border-green-300 bg-white p-3 sm:p-4">
      <div className="flex items-center gap-1 sm:gap-2">
        <FontAwesomeIcon icon={Icon} className="h-4 w-4 sm:h-4 sm:w-4 text-green-500" aria-label={title} />
        <div className="text-sm sm:text-base font-medium text-black leading-tight">{title}</div>
      </div>
      <div className="mt-1 text-lg sm:text-xl font-semibold text-green-600">{value}</div>
    </div>
  );
}

// StatCard component from dashboard.tsx
function StatCard({ title, value, icon: Icon }: { title: string; value: string; icon: any }) {
  return (
    <div className="rounded-xl border border-green-300 bg-white p-3 sm:p-4">
      <div className="flex items-center gap-1 sm:gap-2">
        <FontAwesomeIcon icon={Icon} className="h-4 w-4 sm:h-4 sm:w-4 text-green-500" aria-label={title} />
        <div className="text-sm sm:text-base font-medium text-black leading-tight">{title}</div>
      </div>
      <div className="mt-1 sm:mt-1 text-lg sm:text-xl font-semibold text-green-600">{value}</div>
    </div>
  );
}

export function meta({}: MetaArgs) {
  return [
    { title: "Dashboard Caberawit" },
    { name: "description", content: "Dashboard Caberawit" },
  ];
}

export default function CbrDashboard() {
  const [cbrData, setCbrData] = useState<CbrData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllCbrData();
        setCbrData(data);
      } catch (err) {
        console.error("Error fetching CBR data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // if (loading) {
  //   return (
  //     <section className="space-y-4 text-justify fade-in">
  //       <h2 className="text-2xl font-bold text-gray-900 inline-block border-b-2 border-sky-400 pb-1">Dashboard Caberawit</h2>
  //       <div className="text-center py-8">Loading...</div>
  //     </section>
  //   );
  // }

  if (error) {
    return (
      <section className="space-y-4 text-justify fade-in">
        <h2 className="text-2xl font-bold text-gray-900 inline-block border-b-2 border-sky-400 pb-1">Dashboard Caberawit</h2>
        <div className="text-center py-8 text-red-500">{error}</div>
      </section>
    );
  }

  // Calculate statistics for "Card Jumlah Caberawit"
  const stats = calculateCbrStatistics(cbrData);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DashboardHeader title="Dashboard Caberawit" bgColor="bg-green-500" />
      <div className="px-6 py-6 grow md:pl-64">
        <section className="space-y-6 text-justify fade-in">
          {/* Data Caberawit */}
          <h2 className="text-2xl font-bold text-gray-900 inline-block border-b-2 border-green-500 pb-1">Detail Data Caberawit</h2>
          {/* Card Detail Data Caberawit */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 fade-in-stagger">
            <div className="rounded-xl border border-green-300 bg-white p-3">
              <div className="flex items-center gap-2 mb-1">
                <FontAwesomeIcon icon={faUsers} className="h-4 w-4 text-green-500" aria-label="Jumlah Caberawit" />
                <div className="text-base font-medium text-gray-900">Jumlah Caberawit</div>
              </div>
              <div className="text-xl font-semibold text-green-600 mb-2">{stats.totalCbr.toString()}
              <p className="text-sm font-normal text-gray-700">
                <span> ( Laki-laki: {stats.totalMaleCbr.toString()} | </span>
                <span>Perempuan: {stats.totalFemaleCbr.toString()} )</span>
              </p>
              </div>
            </div>

            <div className="rounded-xl border border-green-300 bg-white p-3">
              <div className="flex items-center gap-2 mb-1">
                <FontAwesomeIcon icon={faUsers} className="h-4 w-4 text-green-500" aria-label="Jumlah PAUD/TK/RA" />
                <div className="text-base font-medium text-gray-900">Jumlah PAUD/TK/RA</div>
              </div>
              <div className="text-xl font-semibold text-green-600 mb-2">{stats.totalPaud.toString()}
              <p className="text-sm font-normal text-gray-700">
                <span> ( Laki-laki: {stats.belumSekolahMale + stats.paudOnlyMale + stats.tkRaMale} | </span>
                <span>Perempuan: {stats.belumSekolahFemale + stats.paudOnlyFemale + stats.tkRaFemale} )</span>
              </p>
              </div>
            </div>

            <div className="rounded-xl border border-green-300 bg-white p-3">
              <div className="flex items-center gap-2 mb-1">
                <FontAwesomeIcon icon={faUsers} className="h-4 w-4 text-green-500" aria-label="Jumlah Kelas A" />
                <div className="text-base font-medium text-gray-900">Jumlah Kelas A</div>
              </div>
              <div className="text-xl font-semibold text-green-600 mb-2">{stats.totalKelasA.toString()}
              <p className="text-sm font-normal text-gray-700">
                <span> ( Laki-laki: {stats.kelas1Male + stats.kelas2Male} | </span>
                <span>Perempuan: {stats.kelas1Female + stats.kelas2Female} )</span>
              </p>
              </div>
            </div>

            <div className="rounded-xl border border-green-300 bg-white p-3">
              <div className="flex items-center gap-2 mb-1">
                <FontAwesomeIcon icon={faUsers} className="h-4 w-4 text-green-500" aria-label="Jumlah Kelas B" />
                <div className="text-base font-medium text-gray-900">Jumlah Kelas B</div>
              </div>
              <div className="text-xl font-semibold text-green-600 mb-2">{stats.totalKelasB.toString()}
              <p className="text-sm font-normal text-gray-700">
                <span> ( Laki-laki: {stats.kelas3Male + stats.kelas4Male} | </span>
                <span>Perempuan: {stats.kelas3Female + stats.kelas4Female} )</span>
              </p>
              </div>
            </div>

            <div className="rounded-xl border border-green-300 bg-white p-3">
              <div className="flex items-center gap-2 mb-1">
                <FontAwesomeIcon icon={faUsers} className="h-4 w-4 text-green-500" aria-label="Jumlah Kelas C" />
                <div className="text-base font-medium text-gray-900">Jumlah Kelas C</div>
              </div>
              <div className="text-xl font-semibold text-green-600 mb-2">{stats.totalKelasC.toString()}
              <p className="text-sm font-normal text-gray-700">
                <span> ( Laki-laki: {stats.kelas5Male + stats.kelas6Male} | </span>
                <span>Perempuan: {stats.kelas5Female + stats.kelas6Female} )</span>
              </p>
              </div>
            </div>
          </div>

          {/* Separator Line */}
          {/* <div className="border-t border-black"></div> */}

          {/* Tabel Detail Data Caberawit */}
          <div className="overflow-x-auto">
            <table className="min-w-auto divide-y divide-green-500 border border-green-500">
              <thead className="bg-green-100">
                <tr className="text-black uppercase">
                  <th scope="col" className="px-2 py-2 text-center text-xs font-bold tracking-wider sm:px-4 sm:py-3 sm:text-sm">Jenjang Sekolah</th>
                  <th scope="col" className="px-2 py-2 text-center text-xs font-bold tracking-wider sm:px-4 sm:py-3 sm:text-sm">Laki-laki</th>
                  <th scope="col" className="px-2 py-2 text-center text-xs font-bold tracking-wider sm:px-4 sm:py-3 sm:text-sm">Perempuan</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-green-500">  
                {/* Belum Sekolah */}
                <tr className="text-green-500 uppercase">
                  <th scope="row" className="px-2 py-2 text-xs font-medium text-center tracking-wider sm:px-4 sm:py-3 sm:text-sm">Belum Sekolah</th>
                  <td className="px-2 py-2 text-xs text-center font-medium sm:px-4 sm:py-3 sm:text-sm">{stats.belumSekolahMale}</td>
                  <td className="px-2 py-2 text-xs text-center font-medium sm:px-4 sm:py-3 sm:text-sm">{stats.belumSekolahFemale}</td>
                </tr>

                {/* Kelas  PAUD*/}
                <tr className="bg-green-100 text-black uppercase">
                  <th scope="row" className="px-2 py-2 text-xs font-medium text-center tracking-wider sm:px-4 sm:py-3 sm:text-sm">PAUD</th>
                  <td className="px-2 py-2 text-xs text-center font-medium sm:px-4 sm:py-3 sm:text-sm">{stats.paudOnlyMale}</td>
                  <td className="px-2 py-2 text-xs text-center font-medium sm:px-4 sm:py-3 sm:text-sm">{stats.paudOnlyFemale}</td>
                </tr>

                {/* Kelas  TK/RA*/}
                <tr className="text-green-500 uppercase">
                  <th scope="row" className="px-2 py-2 text-xs font-medium text-center tracking-wider sm:px-4 sm:py-3 sm:text-sm">TK/RA</th>
                  <td className="px-2 py-2 text-xs text-center font-medium sm:px-4 sm:py-3 sm:text-sm">{stats.tkRaMale}</td>
                  <td className="px-2 py-2 text-xs text-center font-medium sm:px-4 sm:py-3 sm:text-sm">{stats.tkRaFemale}</td>
                </tr>

                {/* Kelas  1*/}
                <tr className="bg-green-100 text-black uppercase">
                  <th scope="row" className="px-2 py-2 text-xs font-medium text-center tracking-wider sm:px-4 sm:py-3 sm:text-sm">Kelas 1</th>
                  <td className="px-2 py-2 text-xs text-center font-medium sm:px-4 sm:py-3 sm:text-sm">{stats.kelas1Male}</td>
                  <td className="px-2 py-2 text-xs text-center font-medium sm:px-4 sm:py-3 sm:text-sm">{stats.kelas1Female}</td>
                </tr>

                {/* Kelas  2*/}
                <tr className="text-green-500 uppercase">
                  <th scope="row" className="px-2 py-2 text-xs font-medium text-center tracking-wider sm:px-4 sm:py-3 sm:text-sm">Kelas 2</th>
                  <td className="px-2 py-2 text-xs text-center font-medium sm:px-4 sm:py-3 sm:text-sm">{stats.kelas2Male}</td>
                  <td className="px-2 py-2 text-xs text-center font-medium sm:px-4 sm:py-3 sm:text-sm">{stats.kelas2Female}</td>
                </tr>

                {/* Kelas  3*/}
                <tr className="bg-green-100 text-black uppercase">
                  <th scope="row" className="px-2 py-2 text-xs font-medium text-center tracking-wider sm:px-4 sm:py-3 sm:text-sm">Kelas 3</th>
                  <td className="px-2 py-2 text-xs text-center font-medium sm:px-4 sm:py-3 sm:text-sm">{stats.kelas3Male}</td>
                  <td className="px-2 py-2 text-xs text-center font-medium sm:px-4 sm:py-3 sm:text-sm">{stats.kelas3Female}</td>
                </tr>

                {/* Kelas  4*/}
                <tr className="text-green-500 uppercase">
                  <th scope="row" className="px-2 py-2 text-xs font-medium text-center tracking-wider sm:px-4 sm:py-3 sm:text-sm">Kelas 4</th>
                  <td className="px-2 py-2 text-xs text-center font-medium sm:px-4 sm:py-3 sm:text-sm">{stats.kelas4Male}</td>
                  <td className="px-2 py-2 text-xs text-center font-medium sm:px-4 sm:py-3 sm:text-sm">{stats.kelas4Female}</td>
                </tr>

                {/* Kelas  5*/}
                <tr className="bg-green-100 text-black uppercase">
                  <th scope="row" className="px-2 py-2 text-xs font-medium text-center tracking-wider sm:px-4 sm:py-3 sm:text-sm">Kelas 5</th>
                  <td className="px-2 py-2 text-xs text-center font-medium sm:px-4 sm:py-3 sm:text-sm">{stats.kelas5Male}</td>
                  <td className="px-2 py-2 text-xs text-center font-medium sm:px-4 sm:py-3 sm:text-sm">{stats.kelas5Female}</td>
                </tr>

                {/* Kelas  6*/}
                <tr className="text-green-500 uppercase">
                  <th scope="row" className="px-2 py-2 text-xs font-medium text-center tracking-wider sm:px-4 sm:py-3 sm:text-sm">Kelas 6</th>
                  <td className="px-2 py-2 text-xs text-center font-medium sm:px-4 sm:py-3 sm:text-sm">{stats.kelas6Male}</td>
                  <td className="px-2 py-2 text-xs text-center font-medium sm:px-4 sm:py-3 sm:text-sm">{stats.kelas6Female}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}