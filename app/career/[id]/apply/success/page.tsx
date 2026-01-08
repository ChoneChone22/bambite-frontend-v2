"use client";
// Removed JobDetailsCard import, not needed for success page
import RelatedJobCard from "@/components/RelatedJobCard";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

export default function ApplySuccessPage() {
  // In a real app, fetch job details by jobId or context
  const params = useParams();
  const jobId = (params?.id as string) || "1";
  // TODO: fetch real job data by jobId
  const job = {
    id: jobId,
    title: "Office Staff",
    category: "Office",
    workingHours: "9am - 5pm",
    contract: "No",
    salary: "Negotiate",
    closeDate: "18 Dec 2025",
  };
  // Example related job (in real app, fetch from API or context)
  const relatedJob = {
    id: "2",
    title: "Kitchen Staff",
    category: "Kitchen",
    workingHours: "10am - 6pm",
    contract: "No",
    salary: "Negotiate",
    closeDate: "20 Dec 2025",
  };
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-[#0B1A2A] px-4 py-12">
      {/* Main Success Content, no blue background */}
      <div className="w-full max-w-lg flex flex-col items-center gap-8 p-0 bg-transparent">
        <h1 className="text-2xl font-bold text-white text-left w-full">
          Successfully Applied
        </h1>
        <p className="text-base text-[#A6B5C0] text-left w-full">
          We’ll reach out to you shortly via mail and phone.
        </p>
        <button
          className="w-full bg-linear-to-b from-[#074980] to-[#172743] border border-[#193551] border-solid flex items-center justify-center h-13.5 rounded-b-lg font-['Space_Mono',sans-serif] font-bold text-[13px] text-[rgba(255,255,255,0.9)] uppercase tracking-wide cursor-pointer transition hover:brightness-110"
          onClick={() => router.push("/career")}
        >
          Go back to career
        </button>
      </div>
      {/* Related Job Post Card for desktop only, right side */}
      <div className="hidden lg:block ml-12 w-full max-w-xs">
        <RelatedJobCard job={relatedJob} />
      </div>
    </div>
  );
}
