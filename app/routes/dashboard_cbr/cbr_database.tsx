import React, { useEffect, useState } from 'react';
import DashboardHeader from '~/components/DashboardHeader';
import { getAllCbrData, deleteCbrData, filterCbrData } from '~/routes/database/data_cbr';
import type { CbrData } from '~/routes/database/data_cbr';
import { Link, useNavigate, useLocation } from 'react-router';
import type { MetaArgs } from "react-router";
import Pagination from "~/components/Pagination";
import * as XLSX from 'xlsx';

export function meta({}: MetaArgs) {
  return [
    { title: "Database Caberawit" },
    { name: "description", content: "Database Caberawit" },
  ];
}

export default function CbrDatabase() {
  const [cbrData, setCbrData] = useState<CbrData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Helper function to format date from YYYY-MM-DD to DD-MM-YYYY for display.
   * @param dateString - Date string in YYYY-MM-DD format.
   * @returns Formatted date string in DD-MM-YYYY format, or original if invalid.
   */
  const formatDisplayDate = (dateString: string): string => {
    if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString; // Return original if invalid or empty
    }
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const getKelasSekolahOrder = (kelas: string): number => {
    switch (kelas) {
      case "Belum Sekolah": return 0;
      case "PAUD": return 1;
      case "TK/RA": return 2;
      case "Kelas 1": return 3;
      case "Kelas 2": return 4;
      case "Kelas 3": return 5;
      case "Kelas 4": return 6;
      case "Kelas 5": return 7;
      case "Kelas 6": return 8;
      default: return 99; // Fallback for unknown values
    }
  };

  /**
   * Sorts CBR data based on kelas_sekolah_cbr, kelompok_cbr, and nama_cbr.
   * @param data - Array of CbrData to sort.
   * @returns Sorted array of CbrData.
   */
  const sortCbrData = (data: CbrData[]): CbrData[] => {
    return [...data].sort((a, b) => {
      // 1. Sort by kelas_sekolah_cbr (custom order)
      const orderA = getKelasSekolahOrder(a.kelas_sekolah_cbr);
      const orderB = getKelasSekolahOrder(b.kelas_sekolah_cbr);
      if (orderA < orderB) return -1;
      if (orderA > orderB) return 1;

      // 2. Then by kelompok_cbr (ascending)
      if (a.kelompok_cbr < b.kelompok_cbr) return -1;
      if (a.kelompok_cbr > b.kelompok_cbr) return 1;

      // 3. Then by nama_cbr (ascending)
      if (a.nama_cbr < b.nama_cbr) return -1;
      if (a.nama_cbr > b.nama_cbr) return 1;

      return 0;
    });
  };

  /**
   * Determines 'Kelas Ngaji' based on 'Kelas Sekolah' following specific rules.
   * @param kelasSekolah - The 'Kelas Sekolah' value.
   * @returns The corresponding 'Kelas Ngaji' value.
   */
  const getKelasNgaji = (kelasSekolah: string): string => {
    switch (kelasSekolah) {
      case "Belum Sekolah":
      case "PAUD":
      case "TK/RA":
        return "PAUD";
      case "Kelas 1":
      case "Kelas 2":
        return "A";
      case "Kelas 3":
      case "Kelas 4":
        return "B";
      case "Kelas 5":
      case "Kelas 6":
        return "C";
      default:
        return "-"; // Default value if no match is found
    }
  };

  // Helper function to format name for table display
  const formatNameForTable = (name: string) => {
    if (name.length <= 35) {
      return name;
    }
    let formattedName = '';
    let currentLineLength = 0;
    const words = name.split(' ');

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (currentLineLength + word.length + (currentLineLength > 0 ? 1 : 0) > 35) {
        formattedName += '\n' + word;
        currentLineLength = word.length;
      } else {
        if (currentLineLength > 0) {
          formattedName += ' ';
          currentLineLength += 1;
        }
        formattedName += word;
        currentLineLength += word.length;
      }
    }
    return formattedName.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < formattedName.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const [searchNama, setSearchNama] = useState<string>('');
  const [searchKelompok, setSearchKelompok] = useState<string>('');
  const [searchKelasSekolah, setSearchKelasSekolah] = useState<string>('');
  const [searchKelasNgaji, setSearchKelasNgaji] = useState<string>('');

  const fetchCbrData = async () => {
    try {
      setLoading(true);
      const filters: Partial<Omit<CbrData, 'id'> & { kelas_ngaji?: string }> = {};
      if (searchNama) filters.nama_cbr = searchNama;
      if (searchKelompok) filters.kelompok_cbr = searchKelompok;
      if (searchKelasSekolah) filters.kelas_sekolah_cbr = searchKelasSekolah;
      if (searchKelasNgaji) filters.kelas_ngaji = searchKelasNgaji;

      const result = await filterCbrData(filters);
      const sortedData = sortCbrData(result.data);

      // Apply pagination manually
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = sortedData.slice(startIndex, endIndex);

      setCbrData(paginatedData);
      setTotalItems(result.totalCount);
    } catch (err: any) {
      console.error("Error fetching CBR data:", err);
      setError(err.message || "Gagal memuat data Caberawit.");
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = async () => {
    try {
      setLoading(true);
      const filters: Partial<Omit<CbrData, 'id'> & { kelas_ngaji?: string }> = {};
      if (searchNama) filters.nama_cbr = searchNama;
      if (searchKelompok) filters.kelompok_cbr = searchKelompok;
      if (searchKelasSekolah) filters.kelas_sekolah_cbr = searchKelasSekolah;
      if (searchKelasNgaji) filters.kelas_ngaji = searchKelasNgaji;

      const { data: allCbrData } = await filterCbrData(filters);
      const sortedAllCbrData = sortCbrData(allCbrData);

      const dataToExport = sortedAllCbrData.map((data, index) => ({
        "No.": index + 1,
        "Nama": data.nama_cbr,
        "Jenis Kelamin": data.jenis_kelamin_cbr,
        "Tanggal Lahir": formatDisplayDate(data.tgl_lahir_cbr),
        "Kelompok": data.kelompok_cbr,
        "Jenjang Sekolah": data.kelas_sekolah_cbr,
        "Kelas Ngaji": getKelasNgaji(data.kelas_sekolah_cbr),
      }));

      const ws = XLSX.utils.json_to_sheet(dataToExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Database Caberawit");
      XLSX.writeFile(wb, "Database Caberawit.xlsx");
    } catch (err: any) {
      console.error("Error exporting Excel:", err);
      setError(err.message || "Gagal mengekspor data ke Excel.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await deleteCbrData(id);
        fetchCbrData(); // Refresh data after deletion
      } catch (err: any) {
        console.error("Error deleting CBR data:", err);
        setError(err.message || "Gagal menghapus data Caberawit.");
      }
    }
  };

  // Pagination handlers
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  // Read URL search params on mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '10');
    const nama = searchParams.get('nama') || '';
    const kelompok = searchParams.get('kelompok') || '';
    const kelasSekolah = searchParams.get('kelasSekolah') || '';
    const kelasNgaji = searchParams.get('kelasNgaji') || '';

    if (!isNaN(page) && page >= 1) {
      setCurrentPage(page);
    }
    if (!isNaN(perPage) && [10, 20, 50].includes(perPage)) {
      setItemsPerPage(perPage);
    }
    setSearchNama(nama);
    setSearchKelompok(kelompok);
    setSearchKelasSekolah(kelasSekolah);
    setSearchKelasNgaji(kelasNgaji);
  }, [location.search]);

  // Update URL search params when page or itemsPerPage changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', currentPage.toString());
    searchParams.set('perPage', itemsPerPage.toString());
    if (searchNama) searchParams.set('nama', searchNama);
    else searchParams.delete('nama');
    if (searchKelompok) searchParams.set('kelompok', searchKelompok);
    else searchParams.delete('kelompok');
    if (searchKelasSekolah) searchParams.set('kelasSekolah', searchKelasSekolah);
    else searchParams.delete('kelasSekolah');
    if (searchKelasNgaji) searchParams.set('kelasNgaji', searchKelasNgaji);
    else searchParams.delete('kelasNgaji');
    navigate(`?${searchParams.toString()}`, { replace: true });
  }, [currentPage, itemsPerPage, searchNama, searchKelompok, searchKelasSekolah, searchKelasNgaji, navigate, location.search]);

  useEffect(() => {
    fetchCbrData();
  }, [currentPage, itemsPerPage, searchNama, searchKelompok, searchKelasSekolah, searchKelasNgaji]);

  // if (loading) {
  //   return <div className="bg-white text-center py-8 text-black">Memuat data...</div>;
  // }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DashboardHeader title="Database Caberawit" bgColor="bg-green-500" />
      <div className="px-6 py-6 grow md:pl-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Data Caberawit</h2>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={exportToExcel} // Mengubah dari exportPdf ke exportToExcel
                className="inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 w-full sm:w-auto"
              >
                Export Data
              </button>
              <Link to="/dashboard_cbr/crud_cbr/tambah_cbr" className="inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-full sm:w-auto">
                Tambah Data
              </Link>
            </div>
          </div>

          {/* Search and Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 fade-in-stagger mb-4">
            <div className="flex flex-wrap items-end gap-3 w-full">
              <div className="w-full sm:flex-1">
                <input
                  value={searchNama}
                  onChange={(e) => setSearchNama(e.target.value)}
                  placeholder="Cari Nama"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 min-w-0"
                />
              </div>
              <div className="w-full sm:flex-1">
                <input
                  value={searchKelompok}
                  onChange={(e) => setSearchKelompok(e.target.value)}
                  placeholder="Cari Kelompok"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 min-w-0"
                />
              </div>
              <div className="w-full sm:flex-1">
                <input
                  value={searchKelasSekolah}
                  onChange={(e) => setSearchKelasSekolah(e.target.value)}
                  placeholder="Cari Jenjang Sekolah"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 min-w-0"
                />
              </div>
              <div className="w-full sm:flex-1">
                <input
                  value={searchKelasNgaji}
                  onChange={(e) => setSearchKelasNgaji(e.target.value)}
                  placeholder="Cari Kelas Ngaji"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 min-w-0"
                />
              </div>
              <div className="w-full sm:w-auto">
                <button
                  onClick={() => {
                    setSearchNama('');
                    setSearchKelompok('');
                    setSearchKelasSekolah('');
                    setSearchKelasNgaji('');
                  }} // Meng-clear pencarian saat ini
                  className="mt-1 w-full sm:w-auto text-center px-3 py-2 text-white bg-sky-500 hover:bg-sky-600 rounded-md border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400">
                  Clear
                </button>
              </div>
            </div>
          </div>

          {cbrData.length === 0 ? (
            <p className="text-black">Tidak ada data Caberawit yang tersedia.</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col" className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-4 sm:py-3 sm:text-sm">No.</th>
                      <th scope="col" className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-4 sm:py-3 sm:text-sm">Nama</th>
                      <th scope="col" className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-4 sm:py-3 sm:text-sm">Jenis Kelamin</th>
                      <th scope="col" className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-4 sm:py-3 sm:text-sm">Tanggal Lahir</th>
                      <th scope="col" className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-4 sm:py-3 sm:text-sm">Kelompok</th>
                      <th scope="col" className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-4 sm:py-3 sm:text-sm">Jenjang Sekolah</th>
                      <th scope="col" className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-4 sm:py-3 sm:text-sm">Kelas Ngaji</th>
                      <th scope="col" className="relative px-2 py-2 sm:px-4 sm:py-3"><span className="sr-only">Aksi</span></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cbrData.map((data, index) => (
                      <tr key={data.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                        <td className="px-2 py-2 whitespace-nowrap text-xs font-medium text-black text-center sm:px-4 sm:py-3 sm:text-sm">{((currentPage - 1) * itemsPerPage) + index + 1}</td>
                        <td className="px-2 py-2 text-xs font-medium text-black sm:px-4 sm:py-3 sm:text-sm">{formatNameForTable(data.nama_cbr)}</td>
                        <td className="px-2 py-2 whitespace-nowrap text-xs text-black text-center sm:px-4 sm:py-3 sm:text-sm">{data.jenis_kelamin_cbr}</td>
                        <td className="px-2 py-2 whitespace-nowrap text-xs text-black text-center sm:px-4 sm:py-3 sm:text-sm">{formatDisplayDate(data.tgl_lahir_cbr)}</td>
                        <td className="px-2 py-2 text-xs text-black text-center sm:px-4 sm:py-3 sm:text-sm">{data.kelompok_cbr}</td>
                        <td className="px-2 py-2 text-xs text-black text-center sm:px-4 sm:py-3 sm:text-sm">{data.kelas_sekolah_cbr}</td>
                        <td className="px-2 py-2 text-xs text-black text-center sm:px-4 sm:py-3 sm:text-sm">{getKelasNgaji(data.kelas_sekolah_cbr)}</td>
                        <td className="px-2 py-2 text-right text-xs font-medium sm:px-4 sm:py-3 sm:text-sm">
                          <div className="flex justify-end items-center space-x-3">
                            <Link to={`/dashboard_cbr/crud_cbr/edit_cbr/${data.id}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                            <button onClick={() => handleDelete(data.id!)} className="text-red-600 hover:text-red-900">Hapus</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination UI */}
              <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <span className="text-sm text-gray-700">Tampilkan:</span>
                  <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="text-black px-2 py-1 border border-gray-300 rounded-md text-sm"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                  <span className="text-sm text-gray-700 text-center sm:text-left">
                    Menampilkan {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} data
                  </span>
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={goToPage}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}