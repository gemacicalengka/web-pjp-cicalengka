import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Navbar from "./components/Navbar";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();

  const cbrNavItems = [
    { name: "Dashboard", to: "/dashboard_cbr/cbr_dashboard" },
    { name: "Database", to: "/dashboard_cbr/cbr_database" },
    { name: "Presensi Bulanan", to: "/dashboard_cbr/cbr_presensi_bulanan" },
    { name: "Presensi Kegiatan", to: "/dashboard_cbr/cbr_presensi_kegiatan" },
    { name: "Laporan", to: "/dashboard_cbr/cbr_laporan" },
  ];
  const prjNavItems = [
    { name: "Dashboard", to: "/dashboard_prj/prj_dashboard" },
    { name: "Database", to: "/dashboard_prj/prj_database" },
    { name: "Presensi Bulanan", to: "/dashboard_prj/prj_presensi_bulanan" },
    { name: "Presensi Kegiatan", to: "/dashboard_prj/prj_presensi_kegiatan" },
    { name: "Laporan", to: "/dashboard_prj/prj_laporan" },
  ];
  const muslimunNavItems = [
    { name: "Dashboard", to: "/dashboard_lapmuslimun/muslimun_dashboard" },
    { name: "Caberawit", to: "/dashboard_lapmuslimun/laporan_cbr" },
    { name: "Pra-Remaja", to: "/dashboard_lapmuslimun/laporan_prj" },
    { name: "Remaja", to: "/dashboard_lapmuslimun/laporan_rmj" },
    { name: "Pra-Nikah", to: "/dashboard_lapmuslimun/laporan_pranikah" },
  ];

  let currentNavbar = null;
  if (location.pathname.startsWith("/dashboard_cbr")) {
    currentNavbar = (
      <Navbar
        title="Caberawit"
        navItems={cbrNavItems}
        headerBgColor="bg-green-500"
        defaultTextColor="text-green-500"
        activeBgColor="bg-green-500"
        activeTextColor="text-white"
        hoverBgColor="bg-green-500"
        hoverTextColor="text-white"
      />
    );
  } else if (location.pathname.startsWith("/dashboard_prj")) {
    currentNavbar = (
      <Navbar
        title="Pra-Remaja"
        navItems={prjNavItems}
        headerBgColor="bg-yellow-500"
        defaultTextColor="text-yellow-500"
        activeBgColor="bg-yellow-500"
        activeTextColor="text-white"
        hoverBgColor="bg-yellow-500"
        hoverTextColor="text-white"
      />
    );
  } else if (location.pathname.startsWith("/dashboard_lapmuslimun")) {
    currentNavbar = (
      <Navbar
        title="Laporan 5 Unsur"
        navItems={muslimunNavItems}
        headerBgColor="bg-sky-500"
        defaultTextColor="text-sky-500"
        activeBgColor="bg-sky-500"
        activeTextColor="text-white"
        hoverBgColor="bg-sky-500"
        hoverTextColor="text-white"
      />
    );
  }

  return (
    <div className="flex">
      {currentNavbar}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
