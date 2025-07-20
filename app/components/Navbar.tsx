"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

const navItems = [
  { label: "Home", href: "/" },
  { label: "Presidential Results", href: "/results?category=Presidential" },
  { label: "Governor Results", href: "/results?category=Governorship" },
  { label: "Senator Results", href: "/results?category=Senatorial" },
  { label: "Women Rep. Results", href: "/results?category=Women%20Representative" },
  { label: "MP Results", href: "/results?category=Parliamentary" },
];



  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-5 sticky top-0 z-50">
      <div className="md:hidden flex  justify-end">
        <button
          onClick={toggleSidebar}
          className="text-2xl text-gray-900 dark:text-white"
          aria-label="Toggle menu"
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <div className="hidden md:flex justify-center items-center">
        <ul className="flex space-x-8 font-medium">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-gray-900 dark:text-white hover:underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {sidebarOpen && (
        <div className="md:hidden fixed top-15 right-0 w-3/4 h-full bg-gray-800 text-white z-50 p-6 shadow-lg backdrop-blur-sm">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={closeSidebar}
                  className="block text-white hover:text-gray-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
