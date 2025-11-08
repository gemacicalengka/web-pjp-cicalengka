import React, { useState, useEffect } from 'react';
import DashboardHeader from '~/components/DashboardHeader';
import type { MetaArgs } from "react-router";
import { getAllCbrData } from '~/routes/database/data_cbr';
import type { CbrData } from '~/routes/database/data_cbr';
import type { JSX } from "react";
import { calculateCbrStatistics } from './cbr_dashboard_utils';
import type { CbrStatistics } from './cbr_dashboard_utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faMars, faVenus, faChartBar, faBookOpen } from '@fortawesome/free-solid-svg-icons';

// SummaryCard component from dashboard.tsx
function SummaryCard({ title, value, icon: Icon }: { title: string; value: string; icon: any }) {
  return (
    <div className="rounded-xl border border-green-300 bg-white p-3 sm:p-4">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={Icon} className="h-4 w-4 text-green-500" aria-label={title} />
        <div className="text-sm sm:text-base font-medium text-black">{title}</div>
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
        <div className="text-xs sm:text-sm font-medium text-black leading-tight">{title}</div>
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
      <div className="px-4 py-6 grow md:pl-64">
        <section className="space-y-6 text-justify fade-in">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 inline-block border-b-2 border-green-500 pb-1">Statistik Caberawit</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 fade-in-stagger">
            {/* Card Jumlah Caberawit */}
            <SummaryCard title="Jumlah Caberawit" value={stats.totalCbr.toString()} icon={faUsers} />
            <StatCard title="Laki-laki" value={stats.totalMaleCbr.toString()} icon={faMars} />
            <StatCard title="Perempuan" value={stats.totalFemaleCbr.toString()} icon={faVenus} />
          </div>

          {/* Separator Line */}
          <div className="border-t border-black"></div>

          {/* Card Jumlah Kelas PAUD */}
          <h2 className="text-2xl font-bold text-gray-900 inline-block border-b-2 border-green-500 pb-1">Statistik Kelas PAUD</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 fade-in-stagger">
            <SummaryCard title="Jumlah Kelas PAUD/TK/RA" value={stats.totalPaud.toString()} icon={faChartBar} />
            <div className="rounded-xl border border-green-300 bg-white p-3">
              <div className="flex items-center gap-2 mb-1">
                <FontAwesomeIcon icon={faChartBar} className="h-4 w-4 text-green-500" aria-label="Belum Sekolah" />
                <div className="text-base font-medium text-gray-900">Belum Sekolah</div>
              </div>
              <div className="text-xl font-semibold text-green-600 mb-2">{stats.belumSekolahData.length}</div>
              <div className="text-sm text-gray-700">
                <p>Laki-laki: {stats.belumSekolahMale} | <span>Perempuan: {stats.belumSekolahFemale}</span></p>
              </div>
            </div>
            <div className="rounded-xl border border-green-300 bg-white p-3">
              <div className="flex items-center gap-2 mb-1">
                <FontAwesomeIcon icon={faChartBar} className="h-4 w-4 text-green-500" aria-label="PAUD" />
                <div className="text-base font-medium text-gray-900">PAUD</div>
              </div>
              <div className="text-xl font-semibold text-green-600 mb-2">{stats.paudOnlyData.length}</div>
              <div className="text-sm text-gray-700">
                <p>Laki-laki: {stats.paudOnlyMale} | <span>Perempuan: {stats.paudOnlyFemale}</span></p>
              </div>
            </div>
            <div className="rounded-xl border border-green-300 bg-white p-3">
              <div className="flex items-center gap-2 mb-1">
                <FontAwesomeIcon icon={faChartBar} className="h-4 w-4 text-green-500" aria-label="TK/RA" />
                <div className="text-base font-medium text-gray-900">TK/RA</div>
              </div>
              <div className="text-xl font-semibold text-green-600 mb-2">{stats.tkRaData.length}</div>
              <div className="text-sm text-gray-700">
                <p>Laki-laki: {stats.tkRaMale} | <span>Perempuan: {stats.tkRaFemale}</span></p>
              </div>
            </div>
          </div>

          {/* Separator Line */}
          <div className="border-t border-black"></div>

          {/* Card Jumlah Kelas A */}
          <h2 className="text-2xl font-bold text-gray-900 inline-block border-b-2 border-green-500 pb-1">Statistik Kelas A</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 fade-in-stagger">
            <SummaryCard title="Total Kelas A" value={stats.totalKelasA.toString()} icon={faBookOpen} />
            <div className="rounded-xl border border-green-300 bg-white p-3">
              <div className="flex items-center gap-2 mb-1">
                <FontAwesomeIcon icon={faBookOpen} className="h-4 w-4 text-green-500" aria-label="Kelas 1" />
                <div className="text-base font-medium text-gray-900">Kelas 1</div>
              </div>
              <div className="text-xl font-semibold text-green-600 mb-2">{stats.kelas1Data.length}</div>
              <div className="text-sm text-gray-700">
                <p>Laki-laki: {stats.kelas1Male} | <span>Perempuan: {stats.kelas1Female}</span></p>
              </div>
            </div>
            <div className="rounded-xl border border-green-300 bg-white p-3">
              <div className="flex items-center gap-2 mb-1">
                <FontAwesomeIcon icon={faBookOpen} className="h-4 w-4 text-green-500" aria-label="Kelas 2" />
                <div className="text-base font-medium text-gray-900">Kelas 2</div>
              </div>
              <div className="text-xl font-semibold text-green-600 mb-2">{stats.kelas2Data.length}</div>
              <div className="text-sm text-gray-700">
                <p>Laki-laki: {stats.kelas2Male} | <span>Perempuan: {stats.kelas2Female}</span></p>
              </div>
            </div>
          </div>

          {/* Separator Line */}
          <div className="border-t border-black"></div>

          {/* Card Jumlah Kelas B */}
          <h2 className="text-2xl font-bold text-gray-900 inline-block border-b-2 border-green-500 pb-1">Statistik Kelas B</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 fade-in-stagger">
            <SummaryCard title="Total Kelas B" value={stats.totalKelasB.toString()} icon={faBookOpen} />
            <div className="rounded-xl border border-green-300 bg-white p-3">
              <div className="flex items-center gap-2 mb-1">
                <FontAwesomeIcon icon={faBookOpen} className="h-4 w-4 text-green-500" aria-label="Kelas 3" />
                <div className="text-base font-medium text-gray-900">Kelas 3</div>
              </div>
              <div className="text-xl font-semibold text-green-600 mb-2">{stats.kelas3Data.length}</div>
              <div className="text-sm text-gray-700">
                <p>Laki-laki: {stats.kelas3Male} | <span>Perempuan: {stats.kelas3Female}</span></p>
              </div>
            </div>
            <div className="rounded-xl border border-green-300 bg-white p-3">
              <div className="flex items-center gap-2 mb-1">
                <FontAwesomeIcon icon={faBookOpen} className="h-4 w-4 text-green-500" aria-label="Kelas 4" />
                <div className="text-base font-medium text-gray-900">Kelas 4</div>
              </div>
              <div className="text-xl font-semibold text-green-600 mb-2">{stats.kelas4Data.length}</div>
              <div className="text-sm text-gray-700">
                <p>Laki-laki: {stats.kelas4Male} | <span>Perempuan: {stats.kelas4Female}</span></p>
              </div>
            </div>
          </div>

          {/* Separator Line */}
          <div className="border-t border-black"></div>

          {/* Card Jumlah Kelas C */}
          <h2 className="text-2xl font-bold text-gray-900 inline-block border-b-2 border-green-500 pb-1">Statistik Kelas C</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 fade-in-stagger">
            <SummaryCard title="Total Kelas C" value={stats.totalKelasC.toString()} icon={faBookOpen} />
            <div className="rounded-xl border border-green-300 bg-white p-3">
              <div className="flex items-center gap-2 mb-1">
                <FontAwesomeIcon icon={faBookOpen} className="h-4 w-4 text-green-500" aria-label="Kelas 5" />
                <div className="text-base font-medium text-gray-900">Kelas 5</div>
              </div>
              <div className="text-xl font-semibold text-green-600 mb-2">{stats.kelas5Data.length}</div>
              <div className="text-sm text-gray-700">
                <p>Laki-laki: {stats.kelas5Male} | <span>Perempuan: {stats.kelas5Female}</span></p>
              </div>
            </div>
            <div className="rounded-xl border border-green-300 bg-white p-3">
              <div className="flex items-center gap-2 mb-1">
                <FontAwesomeIcon icon={faBookOpen} className="h-4 w-4 text-green-500" aria-label="Kelas 6" />
                <div className="text-base font-medium text-gray-900">Kelas 6</div>
              </div>
              <div className="text-xl font-semibold text-green-600 mb-2">{stats.kelas6Data.length}</div>
              <div className="text-sm text-gray-700">
                <p>Laki-laki: {stats.kelas6Male} | <span>Perempuan: {stats.kelas6Female}</span></p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}