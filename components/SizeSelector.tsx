// Size Selector component
"use client";

import Image from "next/image";

type SizeOption = {
  id: string;
  label: string;
  price?: number;
};

type SizeSelectorProps = {
  options: SizeOption[];
  selectedSize: string;
  onSizeChange: (sizeId: string) => void;
};

export default function SizeSelector({
  options,
  selectedSize,
  onSizeChange,
}: SizeSelectorProps) {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative rounded-[40px]  shrink-0 w-full overflow-hidden">
      {options.map((option) => {
        const isSelected = selectedSize === option.id;
        return (
          <button
            key={option.id}
            onClick={() => onSizeChange(option.id)}
            className="basis-0 bg-[#181e24] content-stretch flex grow h-[42px] items-center justify-between min-h-px min-w-px px-[16px] py-0 relative rounded-[999px] shadow-[0px_2px_1px_0px_rgba(226,239,255,0.08)] shrink-0 transition-opacity hover:opacity-90 overflow-hidden border-0"
          >
            <p className="font-['DM_Sans',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[13px] text-[rgba(255,255,255,0.75)] text-nowrap">
              {option.label}
            </p>
            {isSelected && (
              <div className="flex h-[9px] items-center justify-center relative shrink-0 w-[18px]">
                <Image
                  src="/product-details-assets/blue-dot.svg"
                  alt="Selected"
                  width={18}
                  height={9}
                  className="object-contain"
                />
              </div>
            )}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.35)]" />
          </button>
        );
      })}
    </div>
  );
}
