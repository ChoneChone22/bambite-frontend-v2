// Related Job Card component (no Apply Now button)
"use client";

import Image from "next/image";
import Link from "next/link";

type Job = {
  id: string;
  title: string;
  category: string;
  workingHours: string;
  contract: string;
  salary: string;
  closeDate: string;
};

type RelatedJobCardProps = {
  job: Job;
};

export default function RelatedJobCard({ job }: RelatedJobCardProps) {
  return (
    <Link
      href={`/career/${job.id}`}
      className="content-stretch flex flex-col h-auto min-h-[380px] items-start w-full no-underline"
    >
      {/* Job Card Container */}
      <div
        className="basis-0 content-stretch flex flex-col grow items-end justify-between min-h-px min-w-px p-4 sm:p-6 relative shrink-0 w-full rounded-t-lg"
        style={{
          backgroundImage: "url(/career-assets/jobpost-bg.webp)",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Content */}
        <div className="content-stretch flex flex-col gap-[9px] items-start not-italic relative shrink-0 text-white w-full z-10">
          <p className="font-['Chillax_Variable',sans-serif] leading-[0.89] relative shrink-0 text-[28px] sm:text-[22px] md:text-[24px] w-full">
            {job.title}
          </p>
          <p className="font-['Space_Mono',sans-serif] font-bold leading-none relative shrink-0 text-[16px] sm:text-[10px] md:text-[11px] uppercase w-full">
            {job.category}
          </p>
        </div>

        {/* Job Details */}
        <div className="content-stretch flex flex-col items-start relative shrink-0 z-10">
          <div className="content-stretch flex flex-col font-['DM_Sans',sans-serif] font-normal gap-[6px] items-start leading-[1.2] relative shrink-0 text-[rgba(255,255,255,0.75)] w-full">
            <p className="min-w-full relative shrink-0 text-[14px] sm:text-[10px] md:text-[10px]">
              Working hours: {job.workingHours}
            </p>
            <p className="min-w-full relative shrink-0 text-[14px] sm:text-[10px] md:text-[10px]">
              Contract: {job.contract}
            </p>
            <p className="min-w-full relative shrink-0 text-[14px] sm:text-[10px] md:text-[10px]">
              Salary: {job.salary}
            </p>
            <p className="relative shrink-0 text-[12px] sm:text-[9px] md:text-[9px] text-nowrap">
              Close date: {job.closeDate}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
