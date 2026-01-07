// Career Background component
import Image from "next/image";
import { ReactNode } from "react";

type CareerBackgroundProps = {
  children?: ReactNode;
  className?: string;
};

export default function CareerBackground({
  children,
  className = "",
}: CareerBackgroundProps) {
  return (
    <div
      className={`relative w-full bg-white overflow-x-hidden ${className} lg:h-screen lg:max-h-screen lg:overflow-hidden`}
    >
      {/* Dark blue plate background */}
      <div
        className="absolute left-0 top-0 w-full"
        style={{ height: "100%", minHeight: "100vh" }}
      >
        <div className="absolute flex inset-0 items-center justify-center">
          <div className="flex-none h-full rotate-[180deg] scale-y-[-100%] w-full">
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
          <div className="absolute inset-[0_0_0_0.57%] mix-blend-overlay opacity-30">
            <Image
              src="/product-assets/metal-overlay.webp"
              alt=""
              fill
              sizes="100vw"
              className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
            />
          </div>
          <div className="absolute inset-0 mix-blend-lighten opacity-[0.19]">
            <Image
              src="/product-assets/grunge-overlay.webp"
              alt=""
              fill
              sizes="100vw"
              className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
            />
          </div>
          <div className="absolute flex inset-0 items-center justify-center mix-blend-soft-light">
            <div className="flex-none h-full rotate-[180deg] scale-y-[-100%] w-full">
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
      <div className="absolute flex h-[462.018px] items-center justify-center right-0 top-[396.09px] w-[129.171px] hidden lg:block max-w-[100vw]">
        <div className="flex-none rotate-[90deg]">
          <div className="bg-[#ff8b32] blur-[49.36px] filter h-[129.171px] opacity-30 rounded-[999px] w-[462.018px]" />
        </div>
      </div>

      <div className="absolute flex h-[129.171px] items-center justify-center left-[8.51px] bottom-[100px] w-[675.135px] max-w-[calc(100vw-8.51px)] hidden lg:block">
        <div className="flex-none rotate-[180deg]">
          <div className="bg-[#ff8b32] blur-[49.36px] filter h-[129.171px] opacity-30 rounded-[999px] w-[675.135px]" />
        </div>
      </div>

      {/* Vertical separator lines */}
      <div className="absolute flex h-[2.018px] items-center justify-center left-0 top-[429.23px] w-full max-w-[100vw] hidden lg:block overflow-hidden">
        <div className="flex-none rotate-[90deg]">
          <div className="h-[800px] relative w-[2.018px]">
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

      <div className="absolute h-[800px] left-[calc(18.75%+70.21px)] top-[429.23px] w-[2.018px] hidden lg:block max-w-[calc(100vw-18.75%-70.21px)]">
        <Image
          src="/career-assets/group-181.svg"
          alt=""
          fill
          sizes="2px"
          className="block max-w-none size-full"
        />
      </div>

      {/* Decorative C2 text - Hidden on mobile */}
      <p className="absolute font-['Post_No_Bills_Colombo_SemiBold',sans-serif] leading-[0.82] right-[200px] xl:right-[300px] not-italic text-[#252f3a] text-[120px] sm:text-[150px] md:text-[186.464px] text-nowrap top-[226.95px] opacity-10 hidden lg:block pointer-events-none whitespace-nowrap">
        C2
      </p>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
