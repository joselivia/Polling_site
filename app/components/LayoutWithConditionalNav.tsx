"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";



export default function LayoutWithConditionalNav({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith("/vote/");

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main>{children}</main>
      
    </>
  );
}
