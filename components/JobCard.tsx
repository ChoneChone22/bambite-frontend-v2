// Job Card component
"use client";

import Image from "next/image";
import Link from "next/link";
import SocketScrew from "./SocketScrew";

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
      className="content-stretch flex flex-col h-auto min-h-[380px] items-start w-full max-w-[334px] mx-auto no-underline"
    >
      {/* Job Card Container */}
      <div className="basis-0 content-stretch flex flex-col grow items-end justify-between min-h-px min-w-px overflow-clip p-4 sm:p-6 relative shrink-0 w-full rounded-t-lg">
        {/* Background plate */}
        <div className="absolute contents inset-0">
          <div className="absolute flex inset-[0_0.08%_0_0] items-center justify-center">
            <div className="flex-none h-[300px] sm:h-[340px] md:h-[380px] rotate-[180deg] scale-y-[-100%] w-full">
              <div className="relative size-full">
                <Image
                  src="/career-assets/rectangle-122.svg"
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 334px"
                  className="block max-w-none size-full"
                />
              </div>
            </div>
          </div>
          {/* Texture overlays */}
          <div className="absolute contents inset-0">
            <div className="absolute inset-0 mix-blend-overlay opacity-30 rounded-tl-[8px] rounded-tr-[8px]">
              <Image
                src="/product-assets/metal-overlay.webp"
                alt=""
                fill
                sizes="334px"
                className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-tl-[8px] rounded-tr-[8px] size-full"
              />
            </div>
            <div className="absolute flex inset-0 items-center justify-center mix-blend-lighten">
              <div className="flex-none h-[380px] scale-y-[-100%] w-full">
                <div className="opacity-[0.34] relative rounded-tl-[8px] rounded-tr-[8px] size-full">
                  <Image
                    src="/product-assets/grunge-overlay.webp"
                    alt=""
                    fill
                    sizes="334px"
                    className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-tl-[8px] rounded-tr-[8px] size-full"
                  />
                </div>
              </div>
            </div>
            <div className="absolute flex inset-0 items-center justify-center mix-blend-soft-light">
              <div className="flex-none h-[380px] rotate-[180deg] scale-y-[-100%] w-full">
                <div
                  className="opacity-30 rounded-tl-[8px] rounded-tr-[8px] size-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(128, 128, 128, 0.6) 0%, rgb(128, 128, 128) 19.684%, rgba(128, 128, 128, 0.3) 70.46%, rgb(128, 128, 128) 100%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="content-stretch flex flex-col gap-[9px] items-start not-italic relative shrink-0 text-white w-full z-10">
          <p className="font-['Chillax_Variable',sans-serif] leading-[0.89] relative shrink-0 text-[24px] sm:text-[28px] md:text-[32px] w-full">
            {job.title}
          </p>
          <p className="font-['Space_Mono',sans-serif] font-bold leading-none relative shrink-0 text-[11px] sm:text-[12px] md:text-[13px] uppercase w-full">
            {job.category}
          </p>
        </div>

        {/* Job Details */}
        <div className="content-stretch flex flex-col items-start relative shrink-0 z-10">
          <div className="content-stretch flex flex-col font-['DM_Sans',sans-serif] font-normal gap-[6px] items-start leading-[1.2] relative shrink-0 text-[rgba(255,255,255,0.75)] w-full">
            <p className="min-w-full relative shrink-0 text-[12px] sm:text-[13px] md:text-[14px]">
              Working hours: {job.workingHours}
            </p>
            <p className="min-w-full relative shrink-0 text-[12px] sm:text-[13px] md:text-[14px]">
              Contract: {job.contract}
            </p>
            <p className="min-w-full relative shrink-0 text-[12px] sm:text-[13px] md:text-[14px]">
              Salary: {job.salary}
            </p>
            <p className="relative shrink-0 text-[10px] sm:text-[11px] md:text-[12px] text-nowrap">
              Close date: {job.closeDate}
            </p>
          </div>
        </div>

        {/* Socket Screws - Hidden on mobile, visible on larger screens */}
        <div className="hidden md:block absolute flex items-center justify-center right-0 size-[16.708px] bottom-[24px] z-10">
          <div className="flex-none scale-y-[-100%]">
            <SocketScrew className="relative size-[16.708px]" direction="right" color="blue" size="small" />
          </div>
        </div>
        <div className="hidden md:block absolute flex items-center justify-center right-0 size-[16.708px] top-[24px] z-10">
          <div className="flex-none scale-y-[-100%]">
            <SocketScrew className="relative size-[16.708px]" direction="right" color="blue" size="small" />
          </div>
        </div>
        <div className="hidden md:block absolute flex items-center justify-center left-0 size-[16.708px] bottom-[24px] z-10">
          <div className="flex-none scale-y-[-100%]">
            <SocketScrew className="relative size-[16.708px]" direction="left" color="blue" size="small" />
          </div>
        </div>

        {/* Separator lines - Hidden on mobile */}
        <div className="hidden md:block absolute flex h-[2.02px] items-center justify-center left-0 right-0 top-[60%] z-10">
          <div className="flex-none h-[333.996px] rotate-[90deg] w-[2.02px]">
            <div className="relative size-full">
              <Image
                src="/career-assets/group-188.svg"
                alt=""
                fill
                sizes="2px"
                className="block max-w-none size-full"
              />
            </div>
          </div>
        </div>
        <div className="hidden md:block absolute h-[138.02px] left-[19.62%] right-[79.77%] top-[60%] z-10">
          <Image
            src="/career-assets/group-198.svg"
            alt=""
            fill
            sizes="2px"
            className="block max-w-none size-full"
          />
        </div>
      </div>

      {/* Apply Now Button */}
      <div className="flex items-center justify-center relative shrink-0 w-full">
        <div className="flex-none rotate-[180deg] w-full">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleApply();
            }}
            className="bg-gradient-to-t border border-[#193551] border-solid content-stretch flex from-[#c2d4db] h-[50px] sm:h-[54px] md:h-[58px] items-center relative to-[#9cb2ba] w-full rounded-b-lg overflow-hidden"
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
          </button>
        </div>
      </div>
    </Link>
  );
}

