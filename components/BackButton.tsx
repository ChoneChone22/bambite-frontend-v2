// Back Button component
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

type BackButtonProps = {
  onClick?: () => void;
};

export default function BackButton({ onClick }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="content-stretch flex items-center lg:p-[6px] p-6 pl-0 rounded-[8px] hover:opacity-80 transition-opacity cursor-pointer"
      aria-label="Go back"
    >
      <div className="h-32 relative shrink-0 w-32">
        <div className="absolute flex inset-[15.3%_21.23%_17.98%_19.08%] items-center justify-center">
          <div className="flex-none h-[80px] scale-y-[-100%] w-[75px]">
            <Image
              src="/career-assets/arrow-left-icon.svg"
              alt="Back"
              width={60}
              height={62}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </button>
  );
}
