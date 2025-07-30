"use client";

import { useParams } from "next/navigation";
import FullPollDetails from "@/app/components/fullvotes"; 

export default function FullVotePage() {
  const params = useParams();
  const pollId = parseInt(params.id as string);

  if (isNaN(pollId)) {
    return <div className="text-red-500 text-center p-4">❌ Invalid poll ID in URL</div>;
  }

  return <FullPollDetails id={pollId} />;
}
