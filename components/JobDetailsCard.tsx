// Job Details Card component (right panel)
import Image from "next/image";

type JobDetails = {
  workingHours: string;
  contract: string;
  salary: string;
  closeDate: string;
};

type JobDetailsCardProps = {
  details: JobDetails;
};

export default function JobDetailsCard({ details }: JobDetailsCardProps) {
  return (
    <div className="relative h-auto min-h-[300px] lg:h-[369px] w-full lg:w-[298px] max-w-[298px] mx-auto hidden lg:block lg:mx-0">
      {/* Mobile version */}
      <div className="lg:hidden p-6 relative">
        <div className="relative">
          <p className="font-['Space_Mono',sans-serif] font-bold leading-none not-italic opacity-90 text-[13px] text-white mb-6 uppercase">
            Job details
          </p>
          <div className="content-stretch flex flex-col font-['DM_Sans',sans-serif] font-normal gap-[6px] items-start leading-[1.2] text-[rgba(255,255,255,0.75)]">
            <p className="text-[14px]">Working hours: {details.workingHours}</p>
            <p className="text-[14px]">Contract: {details.contract}</p>
            <p className="text-[14px]">Salary: {details.salary}</p>
            <p className="text-[12px] text-nowrap">
              Close date: {details.closeDate}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop version */}
      <div className="hidden lg:block relative h-[369px] w-[298px]">
        {/* Title */}
        <p className="absolute font-['Space_Mono',sans-serif] font-bold leading-none left-[calc(50%-118.36px)] not-italic opacity-90 text-[13px] text-white top-[calc(50%-148.24px)] uppercase w-[139.697px]">
          Job details
        </p>

        {/* Details */}
        <div className="absolute content-stretch flex flex-col items-start left-[30.64px] top-[74.27px]">
          <div className="content-stretch flex flex-col font-['DM_Sans',sans-serif] font-normal gap-[6px] items-start leading-[1.2] relative shrink-0 text-[rgba(255,255,255,0.75)] w-[218px]">
            <p className="min-w-full relative shrink-0 text-[14px]">
              Working hours: {details.workingHours}
            </p>
            <p className="min-w-full relative shrink-0 text-[14px]">
              Contract: {details.contract}
            </p>
            <p className="min-w-full relative shrink-0 text-[14px]">
              Salary: {details.salary}
            </p>
            <p className="relative shrink-0 text-[12px] text-nowrap">
              Close date: {details.closeDate}
            </p>
          </div>
        </div>

        {/* Decorative wavy pattern */}
      </div>
    </div>
  );
}
