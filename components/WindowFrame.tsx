// Window Frame component for "My Home to Yours" section
"use client";

import Image from "next/image";

type WindowFrameProps = {
  sceneImage?: string;
  label?: string;
  className?: string;
};

export default function WindowFrame({
  sceneImage = "/home-assets/window-frame-assets/forest-scene.png",
  label = "BAm's spaceship 320",
  className = "",
}: WindowFrameProps) {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{
        width: "994.565px",
        height: "534.047px",
        transform: "scale(0.80) translateX(80px)",
      }}
    >
      {/* Outer Ring */}
      <div className="absolute h-[534.047px] w-[994.565px] hidden lg:block">
        <div className="absolute inset-[-0.36%_-0.19%_-0.45%_-0.19%]">
          <Image
            src="/home-assets/window-frame-assets/outter-ring.svg"
            alt=""
            fill
            sizes="995px"
            className="block max-w-none"
          />
        </div>
      </div>

      {/* Window Frame Border */}
      <div
        className="absolute h-[485.975px] w-[946.492px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        style={{ marginTop: "12px" }}
      >
        <div className="absolute inset-[-0.2%_-0.1%]">
          <Image
            src="/home-assets/window-frame-assets/window-frame.svg"
            alt=""
            fill
            sizes="946px"
            className="block max-w-none"
          />
        </div>
      </div>

      {/* Scene Image */}
      <div
        className="absolute h-[474.881px] w-[928.535px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        style={{ marginTop: "15px" }}
      >
        <Image
          src={sceneImage}
          alt="Forest scene"
          fill
          sizes="929px"
          className="block max-w-none object-cover"
        />
      </div>

      {/* Glow Light Effect */}
      <div
        className="absolute h-[536.196px] w-[994.563px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 hidden lg:block"
        style={{ marginTop: "-8px" }}
      >
        <div className="absolute inset-[-31.56%_-17.01%]">
          <Image
            src="/home-assets/window-frame-assets/glow-light.png"
            alt=""
            fill
            sizes="995px"
            className="block max-w-none object-cover"
          />
        </div>
      </div>

      {/* Label */}
      <p
        className="absolute bg-clip-text bg-gradient-to-b font-['Space_Mono',sans-serif] from-[#ffffff] leading-none left-1/2 -translate-x-1/2 not-italic opacity-70 text-[11px] sm:text-[12px] md:text-[13px] to-[#999999] top-[calc(50%+161px)] uppercase w-[83.455px] hidden lg:block"
        style={{ WebkitTextFillColor: "transparent" }}
      >
        {label}
      </p>

      {/* Vertical separator lines */}
      <div className="absolute h-[151.752px] left-[calc(50%+330px)] top-[0.57px] w-[3.019px] hidden lg:block">
        <div className="absolute inset-[0_-99.37%_0_0]">
          <Image
            src="/career-assets/group-188.svg"
            alt=""
            fill
            sizes="3px"
            className="block max-w-none size-full"
          />
        </div>
      </div>
      <div className="absolute h-[151.752px] left-[calc(50%+697px)] top-[0.57px] w-[3.019px] hidden lg:block">
        <div className="absolute inset-[0_-99.37%_0_0]">
          <Image
            src="/career-assets/group-188.svg"
            alt=""
            fill
            sizes="3px"
            className="block max-w-none size-full"
          />
        </div>
      </div>
      <div className="absolute h-[153.489px] left-[calc(50%+328px)] top-[684.51px] w-[3.019px] hidden lg:block">
        <div className="absolute inset-[0_-99.37%_0_0]">
          <Image
            src="/career-assets/group-187.svg"
            alt=""
            fill
            sizes="3px"
            className="block max-w-none size-full"
          />
        </div>
      </div>
      <div className="absolute h-[153.489px] left-[calc(50%+697px)] top-[684.51px] w-[3.019px] hidden lg:block">
        <div className="absolute inset-[0_-99.37%_0_0]">
          <Image
            src="/career-assets/group-187.svg"
            alt=""
            fill
            sizes="3px"
            className="block max-w-none size-full"
          />
        </div>
      </div>
    </div>
  );
}
