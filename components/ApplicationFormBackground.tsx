// Application Form Background component
import Image from "next/image";
import { ReactNode } from "react";

type ApplicationFormBackgroundProps = {
  children?: ReactNode;
  className?: string;
};

export default function ApplicationFormBackground({
  children,
  className = "",
}: ApplicationFormBackgroundProps) {
  return (
    <div className={`relative w-full min-h-screen bg-white ${className}`}>
      {/* Dark blue plate background */}
      <div className="absolute h-[1823.683px] left-[-4px] top-0 w-full">
        <div className="absolute flex h-[1823.683px] items-center justify-center left-[-4px] top-0 w-full">
          <div className="flex-none rotate-[180deg] scale-y-[-100%]">
            <div className="h-[1823.683px] relative w-full">
              <Image
                src="/career-assets/rectangle-121-form.svg"
                alt=""
                fill
                sizes="100vw"
                className="block max-w-none size-full"
                priority
              />
            </div>
          </div>
        </div>
        {/* Texture overlays */}
        <div className="absolute contents left-[-4px] top-0">
          <div className="absolute h-[1823.683px] left-[4.78px] mix-blend-overlay opacity-30 top-0 w-[calc(100%-9.56px)]">
            <Image
              src="/product-assets/metal-overlay.webp"
              alt=""
              fill
              sizes="100vw"
              className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
            />
          </div>
          <div className="absolute h-[1823.683px] left-[-4px] mix-blend-lighten opacity-[0.19] top-0 w-full">
            <Image
              src="/product-assets/grunge-overlay.webp"
              alt=""
              fill
              sizes="100vw"
              className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
            />
          </div>
          <div className="absolute flex h-[1823.683px] items-center justify-center left-[-4px] mix-blend-soft-light top-0 w-full">
            <div className="flex-none rotate-[180deg] scale-y-[-100%]">
              <div
                className="h-[1823.683px] opacity-30 w-full"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(128, 128, 128, 0.6) 0%, rgb(128, 128, 128) 19.684%, rgba(128, 128, 128, 0.3) 70.46%, rgb(128, 128, 128) 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Orange blur effects */}
      <div className="absolute flex h-[462.018px] items-center justify-center left-[calc(100%-32.45px)] top-[396.09px] w-[129.171px] hidden lg:block">
        <div className="flex-none rotate-[90deg]">
          <div className="bg-[#ff8b32] blur-[49.36px] filter h-[129.171px] opacity-30 rounded-[999px] w-[462.018px]" />
        </div>
      </div>

      <div className="absolute flex h-[129.171px] items-center justify-center left-[8.51px] top-[1411.04px] w-[675.135px] hidden lg:block">
        <div className="flex-none rotate-[180deg]">
          <div className="bg-[#ff8b32] blur-[49.36px] filter h-[129.171px] opacity-30 rounded-[999px] w-[675.135px]" />
        </div>
      </div>

      {/* Vertical separator lines */}
      <div className="absolute flex h-[2.018px] items-center justify-center left-[-4.95px] top-[171.71px] w-[1776.572px] hidden lg:block">
        <div className="flex-none rotate-[90deg]">
          <div className="h-[1776.572px] relative w-[2.018px]">
            <Image
              src="/career-assets/group-182.svg"
              alt=""
              fill
              sizes="2px"
              className="block max-w-none size-full"
            />
          </div>
        </div>
      </div>

      <div className="absolute h-[1776.572px] left-[calc(18.75%+70.21px)] top-[171.71px] w-[2.018px] hidden lg:block">
        <Image
          src="/career-assets/group-181.svg"
          alt=""
          fill
          sizes="2px"
          className="block max-w-none size-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

