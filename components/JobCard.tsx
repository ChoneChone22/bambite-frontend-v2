// Job Card component
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

type JobCardProps = {
  job: Job;
  onApply?: (jobId: string) => void;
};

export default function JobCard({ job, onApply }: JobCardProps) {
  const handleApply = () => {
    if (onApply) {
      onApply(job.id);
    }
  };

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

      {/* Apply Now Button */}
      <div className="flex items-center justify-center relative shrink-0 w-full">
        <div className="flex-none rotate-[180deg] w-full">
          <Link
            href={`/career/${job.id}/apply`}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-gradient-to-t border border-[#193551] border-solid content-stretch flex from-[#c2d4db] h-[50px] sm:h-[54px] md:h-[58px] items-center relative to-[#9cb2ba] w-full rounded-b-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
          >
            {/* Texture overlays */}
            <div className="absolute contents left-[calc(-0.12%-0.5px)] right-[calc(-0.12%-0.5px)] top-[-0.5px]">
              <div className="absolute flex h-full items-center justify-center left-[-0.12%] mix-blend-soft-light right-[-0.12%] top-0">
                <div className="flex-none h-full rotate-[180deg] w-full">
                  <div className="opacity-80 relative size-full">
                    <Image
                      src="/product-assets/metal-overlay.webp"
                      alt=""
                      fill
                      sizes="334px"
                      className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute flex h-full items-center justify-center left-[0.12%] mix-blend-soft-light right-[-0.12%] top-0">
                <div className="flex-none h-full rotate-[180deg] scale-y-[-100%] w-full">
                  <div className="opacity-30 relative size-full">
                    <Image
                      src="/product-assets/grunge-overlay.webp"
                      alt=""
                      fill
                      sizes="334px"
                      className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute flex h-full items-center justify-center left-[0.12%] mix-blend-soft-light right-[-0.12%] top-0">
                <div className="flex-none h-full scale-y-[-100%] w-full">
                  <div
                    className="opacity-80 size-full"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(128, 128, 128, 0.6) 0%, rgb(128, 128, 128) 19.684%, rgba(128, 128, 128, 0.3) 70.46%, rgb(128, 128, 128) 100%)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Button Content */}
            <div className="basis-0 content-stretch flex gap-[24px] grow h-full items-center min-h-px min-w-px pl-[12px] pr-[20px] py-0 relative shrink-0 z-10">
              <div className="flex items-center justify-center relative shrink-0">
                <div className="flex-none rotate-[180deg]">
                  <div className="content-stretch flex items-center p-[6px] relative rounded-[8px]">
                    <div className="relative shrink-0 size-[24px]">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-[#273b4f]"
                      >
                        <path
                          d="M9 18L15 12L9 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="basis-0 flex grow items-center justify-center min-h-px min-w-px relative shrink-0">
                <div className="flex-none rotate-[180deg] w-full">
                  <div className="content-stretch flex gap-[16px] items-center relative w-full">
                    <p className="font-['Space_Mono',sans-serif] font-bold leading-none not-italic relative shrink-0 text-[11px] sm:text-[12px] md:text-[12.583px] text-[#273b4f] text-nowrap uppercase">
                      Apply Now
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-[-0.5px] pointer-events-none shadow-[inset_3.77px_3.77px_1.153px_0px_rgba(226,239,255,0.72)]" />
          </Link>
        </div>
      </div>
    </Link>
  );
}
