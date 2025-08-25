import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footerpage from "./components/Footer";


export const metadata: Metadata = {
  title: "Admin | Politrack Africa",
  description: "Politrack Africa where your vote counts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><Navbar />
        {children}
        <Footerpage />
      </body>
    </html>
  );
}

