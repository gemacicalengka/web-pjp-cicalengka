import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    // Halaman utama ketika web dibuka (atau setelah login)
    index("routes/home.tsx"),

    // Halaman login
    route("login", "routes/login.tsx"),

    // Dashboard Caberawit
    route("dashboard_cbr/cbr_dashboard", "routes/dashboard_cbr/cbr_dashboard.tsx"),
    route("dashboard_cbr/cbr_database", "routes/dashboard_cbr/cbr_database.tsx"),
    route("dashboard_cbr/cbr_presensi_bulanan", "routes/dashboard_cbr/cbr_presensi_bulanan.tsx"),
    route("dashboard_cbr/cbr_presensi_kegiatan", "routes/dashboard_cbr/cbr_presensi_kegiatan.tsx"),
    route("dashboard_cbr/cbr_laporan", "routes/dashboard_cbr/cbr_laporan.tsx"),

    // CRUD Caberawit
    route("dashboard_cbr/crud_cbr/tambah_cbr", "routes/dashboard_cbr/crud_cbr/tambah_cbr.tsx"),
    route("dashboard_cbr/crud_cbr/edit_cbr/:id", "routes/dashboard_cbr/crud_cbr/edit_cbr.tsx"),

    // Dashboard Pra-Remaja
    route("dashboard_prj/prj_dashboard", "routes/dashboard_prj/prj_dashboard.tsx"),
    route("dashboard_prj/prj_database", "routes/dashboard_prj/prj_database.tsx"),
    route("dashboard_prj/prj_presensi_bulanan", "routes/dashboard_prj/prj_presensi_bulanan.tsx"),
    route("dashboard_prj/prj_presensi_kegiatan", "routes/dashboard_prj/prj_presensi_kegiatan.tsx"),
    route("dashboard_prj/prj_laporan", "routes/dashboard_prj/prj_laporan.tsx"),

    // Dashboard Laporan Musyawarah Lima Unsur
    route("dashboard_lapmuslimun/muslimun_dashboard", "routes/dashboard_lapmuslimun/muslimun_dashboard.tsx"),
    route("dashboard_lapmuslimun/laporan_cbr", "routes/dashboard_lapmuslimun/laporan_cbr.tsx"),
    route("dashboard_lapmuslimun/laporan_prj", "routes/dashboard_lapmuslimun/laporan_prj.tsx"),
    route("dashboard_lapmuslimun/laporan_rmj", "routes/dashboard_lapmuslimun/laporan_rmj.tsx"),
    route("dashboard_lapmuslimun/laporan_pranikah", "routes/dashboard_lapmuslimun/laporan_pranikah.tsx"),

] satisfies RouteConfig;
