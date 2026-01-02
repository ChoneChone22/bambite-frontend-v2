// Job Details Card component (right panel)
import Image from "next/image";
import SocketScrew from "./SocketScrew";

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
    <div className="relative h-auto min-h-[300px] lg:h-[369px] w-full lg:w-[298px] max-w-[298px] mx-auto lg:mx-0">
      {/* Background with texture - Mobile fallback */}
      <div className="lg:hidden bg-[#1a1f26] border border-[#2a3441] rounded-lg p-6 relative overflow-hidden">
        {/* Texture overlay for mobile */}
        <div className="absolute inset-0 mix-blend-overlay opacity-30">
          <Image
            src="/product-assets/metal-overlay.webp"
            alt=""
            fill
            sizes="298px"
            className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-lg"
          />
        </div>
        <div className="relative z-10">
          <p className="font-['Space_Mono',sans-serif] font-bold leading-none not-italic opacity-90 text-[13px] text-white mb-6 uppercase">
            Job details
          </p>
          <div className="content-stretch flex flex-col font-['DM_Sans',sans-serif] font-normal gap-[6px] items-start leading-[1.2] text-[rgba(255,255,255,0.75)]">
            <p className="text-[14px]">
              Working hours: {details.workingHours}
            </p>
            <p className="text-[14px]">Contract: {details.contract}</p>
            <p className="text-[14px]">Salary: {details.salary}</p>
            <p className="text-[12px] text-nowrap">
              Close date: {details.closeDate}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop version with assets */}
      <div className="hidden lg:block relative h-[369px] w-[298px]">
        <Image
          src="/career-assets/frame-252.svg"
          alt=""
          fill
          sizes="298px"
          className="block max-w-none size-full"
        />
        <div className="absolute inset-[-3.52%_-4.61%]">
          <div className="absolute inset-[0_0_-0.51%_0]">
            <Image
              src="/career-assets/rectangle-312.svg"
              alt=""
              fill
              sizes="325px"
              className="block max-w-none size-full"
            />
          </div>
        </div>

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
        <div className="absolute left-[66.17px] top-[334.8px] w-[184.285px] h-[9.699px] opacity-50">
          <div className="flex gap-[4.85px] flex-wrap">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="bg-[#5c5c5c] size-[4.85px]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

