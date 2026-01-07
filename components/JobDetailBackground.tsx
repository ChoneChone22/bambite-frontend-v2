// Job Detail Background component
import Image from "next/image";
import { ReactNode } from "react";

type JobDetailBackgroundProps = {
  children?: ReactNode;
  className?: string;
};

export default function JobDetailBackground({
  children,
  className = "",
}: JobDetailBackgroundProps) {
  return (
    <div
      className={`relative w-full min-h-screen bg-white overflow-hidden overflow-x-hidden ${className}`}
    >
      {/* Dark blue plate background */}
      <div className="absolute inset-0 w-full h-full min-h-screen overflow-hidden">
        <div className="absolute flex inset-0 items-center justify-center">
          <div className="flex-none h-full min-h-[1040.093px] rotate-[180deg] scale-y-[-100%] w-full">
            <div className="relative size-full">
              <Image
                src="/career-assets/rectangle-121.svg"
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
        <div className="absolute contents inset-0">
          <div className="absolute inset-[0_0_38.78%_0.31%] mix-blend-overlay opacity-30">
            <Image
              src="/product-assets/metal-overlay.webp"
              alt=""
              fill
              sizes="100vw"
              className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
            />
          </div>
          <div className="absolute inset-[0_0_38.78%_-0.26%] mix-blend-lighten opacity-[0.19]">
            <Image
              src="/product-assets/grunge-overlay.webp"
              alt=""
              fill
              sizes="100vw"
              className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
            />
          </div>
          <div className="absolute flex inset-[0_0_38.78%_-0.26%] items-center justify-center mix-blend-soft-light">
            <div className="flex-none h-[1040.093px] rotate-[180deg] scale-y-[-100%] w-full">
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
      </div>

      {/* Orange blur effects */}
      <div className="absolute flex h-[462.018px] items-center justify-center left-[calc(100%-32.45px)] top-[396.09px] w-[129.171px] hidden lg:block">
        <div className="flex-none rotate-[90deg]">
          <div className="bg-[#ff8b32] blur-[49.36px] filter h-[129.171px] opacity-30 rounded-[999px] w-[462.018px]" />
        </div>
      </div>

      <div className="absolute flex h-[129.171px] items-center justify-center left-[8.51px] top-[869.92px] w-[675.135px] hidden lg:block">
        <div className="flex-none rotate-[180deg]">
          <div className="bg-[#ff8b32] blur-[49.36px] filter h-[129.171px] opacity-30 rounded-[999px] w-[675.135px]" />
        </div>
      </div>

      {/* Vertical separator lines */}
      <div className="absolute flex h-[2.018px] items-center justify-center left-0 top-[171.71px] w-[100vh] max-w-[1776.572px] hidden lg:block overflow-hidden">
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
