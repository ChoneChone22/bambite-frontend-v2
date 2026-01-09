"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type SpiceLevelOption = {
  id: string;
  label: string;
};

type SpiceLevelSelectorProps = {
  options: SpiceLevelOption[];
  selectedLevel: string;
  onLevelChange: (levelId: string) => void;
  disabled?: boolean;
};

export default function SpiceLevelSelector({
  options,
  selectedLevel,
  onLevelChange,
  disabled = false,
}: SpiceLevelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.id === selectedLevel);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    setIsFocused(!isOpen);
  };

  const handleSelect = (optionId: string) => {
    onLevelChange(optionId);
    setIsOpen(false);
    setIsFocused(false);
  };

  return (
    <div className="flex flex-col gap-[20px] w-full" ref={dropdownRef}>
      {/* Title */}

      {/* Dropdown Button */}
      <div className="relative w-full">
        <button
          onClick={handleToggle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          disabled={disabled}
          className={`
            w-full bg-[#181e24] rounded-[999px] px-[23px] py-[16px] 
            flex items-center justify-between
            shadow-[0px_2px_1px_0px_rgba(226,239,255,0.08)]
            relative overflow-hidden
            transition-opacity
            ${
              disabled
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:opacity-90"
            }
            ${
              isFocused ? "border-2 border-[rgba(255,255,255,0.7)]" : "border-0"
            }
          `}
        >
          <p
            className={`font-['DM_Sans',sans-serif] font-medium leading-[1.2] text-[17px] text-nowrap ${
              disabled
                ? "text-[rgba(255,255,255,0.3)]"
                : "text-[rgba(255,255,255,0.75)]"
            }`}
          >
            {selectedOption?.label || "Select"}
          </p>

          {/* Dropdown Arrow Icon */}
          <div className="h-[4.75px] w-[12.624px] relative flex items-center justify-center">
            <Image
              src="/product-details-assets/drop-blue.svg"
              alt="Dropdown"
              width={12.624}
              height={4.75}
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </div>

          {/* Inset Shadow */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.35)]" />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className="absolute top-0 left-0 w-full bg-[#181e24] rounded-[24px] px-[23px] py-[24px] 
                       shadow-[0px_2px_1px_0px_rgba(226,239,255,0.08)] z-10 overflow-hidden"
          >
            <div className="flex flex-col gap-[24px]">
              {options.map((option) => {
                const isSelected = option.id === selectedLevel;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    className="flex items-center gap-[4px] group cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    {/* Checkmark */}
                    <div className="w-[20px] h-[20px] flex items-center justify-center">
                      {isSelected && (
                        <Image
                          src="/product-details-assets/check-white.svg"
                          alt="Selected"
                          width={16}
                          height={16}
                          className="object-contain"
                        />
                      )}
                    </div>

                    <p className="font-['DM_Sans',sans-serif] font-medium leading-[1.2] text-[17px] text-[rgba(255,255,255,0.75)] text-nowrap">
                      {option.label}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Inset Shadow for dropdown */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.35)]" />
          </div>
        )}
      </div>
    </div>
  );
}
