"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/Reports" },
    { label: "News", href: "/BlogPostForm/BlogList" },
    { label: "Events", href: "/Event" },
  ];

  const toggleSidebar = () => setSidebarOpen((v) => !v);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <nav className="bg-white  border-b sticky top-0 z-50">
      <div className="md:hidden flex justify-between items-center px-4 py-2">
        <Image
          src="/logo.jpg"
          alt="Politrack Africa Logo"
          width={100}
          height={50}
        />
        <button
          onClick={toggleSidebar}
          className="text-3xl p-2 text-gray-900 dark:text-white focus:outline-none"
        >
          {sidebarOpen ? <FiX color="black"/> : <FiMenu color="black"/>}
        </button>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto px-6 py-3">
        <Image
          src="/logo.jpg"
          alt="Politrack Africa Logo"
          width={150}
          height={80}
        />
        <ul className="flex space-x-8 font-medium">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="font-bold hover:text-blue-600"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed top-16 right-0 w-3/4 h-full text-gray-800 bg-white p-6 shadow-lg z-50">
          <ul className="space-y-6 text-lg">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="hover:text-blue-400"
                  onClick={closeSidebar}
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
