import type { Route } from "./+types/home";
import { Link } from "react-router"; // Menggunakan Link dari react-router karena ini adalah aplikasi React Router

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard Utama" },
    { name: "description", content: "Halaman utama navigasi dashboard." },
  ];
}

export default function Home() {
  const class_button_cbr = "flex-1 p-5 rounded-lg shadow-lg text-center transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl bg-green-500 text-white hover:bg-gray-100 hover:text-green-500";
  const class_button_prj = "flex-1 p-5 rounded-lg shadow-lg text-center transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl bg-yellow-500 text-white hover:bg-gray-100 hover:text-yellow-500";
  const class_button_muslimun = "flex-1 p-5 rounded-lg shadow-lg text-center transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl bg-sky-500 text-white hover:bg-gray-100 hover:text-sky-500";

  return (
    <div className="min-h-screen bg-green-200 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-7">
          <img 
              src="/logo pjp.svg"
              alt="PJP Cicalengka Logo" 
              className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4"
            />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Menu Utama</h2>
        </div>
        <div className="flex flex-col gap-4">
          <Link to="/dashboard_cbr/cbr_dashboard" className={class_button_cbr}>
            <h3 className="text-lg sm:text-xl font-bold">Database Caberawit</h3>
          </Link>
          <Link to="/dashboard_prj/prj_dashboard" className={class_button_prj}>
            <h3 className="text-lg sm:text-xl font-bold">Database Pra-Remaja</h3>
          </Link>
          <Link to="/dashboard_lapmuslimun/muslimun_dashboard" className={class_button_muslimun}>
            <h3 className="text-lg sm:text-xl font-bold">Laporan Musyawarah Lima Unsur</h3>
          </Link>
          <p className="text-sm font-bold text-center text-gray-500 mt-3">© 2025 PJP Cicalengka. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
