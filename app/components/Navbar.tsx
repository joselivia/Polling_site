"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Live Reports", href: "/Reports" },
    {
      label: "Login",
      href: "/Login",
      className:
        "inline-block bg-orange-600 text-white font-medium px-5 py-2.5 rounded-md shadow hover:bg-blue-700 transition duration-300 ease-in-out",
    },
  ];

  const toggleSidebar = () => setSidebarOpen((v) => !v);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b p-5 sticky top-0 z-50">
      <div className="md:hidden flex justify-between">
        <Image src="/logo.jpg" alt="Politrack Africa Logo" width={100} height={100} />
        <button onClick={toggleSidebar} className="text-2xl">
          {sidebarOpen ? <FiX color="white" /> : <FiMenu color="white" />}
        </button>
      </div>
      <div className="hidden md:flex flex items-center justify-between max-w-7xl mx-auto px-4 ">
        <Image src="/logo.jpg" alt="Politrack Africa Logo" width={150} height={80} />
        <ul className="flex space-x-8 font-medium">
          {navItems.map((item) => (
            <li key={item.label}>
              {item.className ? (
                <Link href={item.href} className={item.className}>
                  {item.label}
                </Link>
              ) : (
                <Link href={item.href} className="flex text-white justify-center items-center ">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      {sidebarOpen && (
        <div className="md:hidden fixed top-16 right-0 w-3/4 h-full bg-gray-800 text-white p-6">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.label}>
                     {item.className ? (
                  <Link href={item.href} className={item.className} onClick={closeSidebar}>
                    {item.label}
                  </Link>
                ) : (
                  <Link href={item.href} className="text-gray-900 dark:text-white" onClick={closeSidebar}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}