"use client";
import React from "react";
import { CompanyPage } from "./components/CompanyWebsite";

export interface PollSummary {
  id: number;
  title: string;
  lastUpdated: Date | string;
}

export default function Home() {
  return (
    <div className="max-w-full mx-auto ">
    
           < CompanyPage />
      
        </div>

    
  );
}
