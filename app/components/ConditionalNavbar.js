"use client";

import { usePathname } from 'next/navigation';
import Navbar from "./layout/Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // Hide navbar on dashboard and instructor routes
  const isDashboardRoute = pathname?.startsWith('/dashboard') || pathname?.startsWith('/instructor');

  if (isDashboardRoute) {
    return null;
  }

  return <Navbar />;
}
