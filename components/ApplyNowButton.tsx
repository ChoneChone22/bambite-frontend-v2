// Apply Now Button component
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

type ApplyNowButtonProps = {
  onClick?: () => void;
  className?: string;
  jobId?: string;
};

export default function ApplyNowButton({
  onClick,
  className = "",
  jobId,
}: ApplyNowButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (jobId) {
      router.push(`/career/${jobId}/apply`);
    }
  };
  return (
    <div
      className={`flex h-[58px] items-center justify-center w-full max-w-[600px] mx-auto ${className}`}
    >
      <div className="flex-none rotate-[180deg] w-full">
        <button
          type="button"
          onClick={handleClick}
          className="bg-gradient-to-b border border-[#193551] border-solid content-stretch flex from-[#074980] h-[58px] items-center relative to-[#172743] w-full overflow-hidden cursor-pointer"
        >
          {/* Texture overlays */}
          <div className="absolute contents inset-[-0.5px_calc(-0.08%-0.5px)_calc(0%-0.5px)_-0.5px]">
            <div className="absolute inset-[0_-0.08%_0_0.57%] mix-blend-overlay opacity-30">
              <Image
                src="/product-assets/metal-overlay.webp"
                alt=""
                fill
                sizes="600px"
                className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
              />
            </div>
            <div className="absolute flex inset-[0_-0.08%_0_0] items-center justify-center mix-blend-lighten">
              <div className="flex-none h-[58px] scale-y-[-100%] w-full">
                <div className="opacity-[0.34] relative size-full">
                  <Image
                    src="/product-assets/grunge-overlay.webp"
                    alt=""
                    fill
                    sizes="600px"
                    className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                  />
                </div>
              </div>
            </div>
            <div className="absolute flex inset-[0_-0.08%_0_0] items-center justify-center mix-blend-soft-light">
              <div className="flex-none h-[58px] rotate-[180deg] scale-y-[-100%] w-full">
                <div
                  className="opacity-30 size-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(128, 128, 128, 0.6) 0%, rgb(128, 128, 128) 19.684%, rgba(128, 128, 128, 0.3) 70.46%, rgb(128, 128, 128) 100%)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Button Content */}
          <div className="basis-0 content-stretch flex gap-[24px] grow h-[58px] items-center min-h-px min-w-px pl-[12px] pr-[20px] py-0 relative shrink-0 z-10">
            <div className="basis-0 flex grow items-center justify-center min-h-px min-w-px relative shrink-0">
              <div className="flex-none rotate-[180deg] w-full">
                <div className="content-stretch flex gap-[16px] items-center relative w-full">
                  <p className="font-['Space_Mono',sans-serif] font-bold leading-none not-italic relative shrink-0 text-[11px] sm:text-[12px] md:text-[12.583px] text-[rgba(255,255,255,0.9)] text-nowrap uppercase">
                    Apply Now
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-[-0.5px] pointer-events-none shadow-[inset_3.77px_3.77px_1.153px_0px_rgba(226,239,255,0.12)]" />
        </button>
      </div>
    </div>
  );
}
