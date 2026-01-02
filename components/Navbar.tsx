// Figma-based Navbar implementation

import Image from "next/image";

type NavItemProps = {
  className?: string;
  navLabel?: string;
  no?: string;
  iconBack?: boolean;
};

function NavItem({
  className,
  navLabel = "About",
  no = "01",
  iconBack = false,
}: NavItemProps) {
  return (
    <div
      className={
        className ||
        "content-stretch flex gap-[7px] items-start px-0 py-[7px] relative shrink-0"
      }
    >
      <p className="font-['Space_Mono',monospace] leading-none not-italic relative shrink-0 text-[#b9c7d6] text-[12px] text-nowrap uppercase">
        {no}
      </p>
      <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
        <p className="font-['Chillax_Variable',sans-serif] leading-[0.82] not-italic relative shrink-0 text-[#b9c7d6] text-[20px] text-nowrap font-semibold">
          {navLabel}
        </p>
        {iconBack && (
          <div className="relative shrink-0 size-[20px]">
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 20 20"
              className="size-full"
            >
              <path
                d="M6 10h7.17l-3.59-3.59L11 5l6 6-6 6-1.41-1.41L13.17 12H6v-2z"
                fill="#b9c7d6"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

type GlobalNavProps = {
  className?: string;
};

function GlobalNav({ className }: GlobalNavProps) {
  return (
    <div
      className={
        className ||
        "content-stretch flex gap-[44px] items-start relative size-full"
      }
    >
      <div className="basis-0 content-stretch flex grow h-[70.047px] items-center min-h-px min-w-px relative shrink-0">
        <div className="basis-0 bg-[#181e24] content-stretch flex flex-col grow h-full items-start justify-center min-h-px min-w-px px-[25px] py-[22px] relative shrink-0">
          <div className="content-stretch flex gap-[40px] items-center relative shrink-0">
            <NavItem no="C1" />
            <NavItem navLabel="Career" no="C2" />
            <NavItem navLabel="Contact" no="C3" />
          </div>
          <div className="absolute inset-0 pointer-events-none shadow-[inset_-1px_-3px_0.635px_0px_rgba(226,239,255,0.15)]" />
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start pb-0 pt-[13px] px-0 relative shrink-0 w-[254.186px]">
        <div className="flex items-center justify-center w-full h-full">
          <Image
            src="/bambite-logo-blue.webp"
            alt="Bambite Logo"
            width={254}
            height={58}
            className="object-contain"
            priority
          />
        </div>
      </div>
      <div className="basis-0 content-stretch flex grow h-[70.047px] items-center min-h-px min-w-px relative shrink-0">
        <div className="basis-0 bg-[#181e24] content-stretch flex flex-col grow h-full items-end justify-center min-h-px min-w-px px-[25px] py-[22px] relative shrink-0">
          <div className="content-stretch flex gap-[40px] items-center relative shrink-0">
            <NavItem navLabel="Dishes" no="C4" />
            <NavItem iconBack={true} navLabel="Cart" no="C5" />
          </div>
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_-3px_0.635px_0px_rgba(226,239,255,0.15)]" />
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  return (
    <nav className="w-full bg-[#181e24] flex items-center justify-center min-h-[82px] relative">
      <GlobalNav className="w-full max-w-full" />
    </nav>
  );
}
