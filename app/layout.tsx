import type { Metadata } from "next";
import "./globals.css";

import Footerpage from "./components/Footer";

import LayoutWithConditionalNav from "./components/LayoutWithConditionalNav";


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
      <body><LayoutWithConditionalNav>{children}</LayoutWithConditionalNav>
        <Footerpage />
      </body>
    </html>
  );
}

