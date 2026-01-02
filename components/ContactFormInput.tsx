// Contact Form Input component
"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

type ContactFormInputProps = {
  label: string;
  placeholder: string;
  required?: boolean;
  type?: "text" | "email" | "select" | "textarea";
  options?: string[];
  value?: string;
  onChange?: (value: string) => void;
};

export default function ContactFormInput({
  label,
  placeholder,
  required = false,
  type = "text",
  options = [],
  value = "",
  onChange,
}: ContactFormInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (newValue: string) => {
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (type === "textarea") {
    return (
      <div className="content-stretch flex flex-col gap-3 items-start relative shrink-0 w-full">
        <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[15px] text-[#273b4f] w-full">
          {label}
          {required && " *"}
        </p>
        <div className="content-stretch flex gap-5 h-[105px] items-start px-5 py-4 relative rounded-[6px] shrink-0 w-full">
          <div className="absolute bg-[#bac8c9] border-2 border-[#8fa5ae] border-solid inset-0 rounded-[6px] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)]">
            <div className="absolute inset-[-1px] pointer-events-none shadow-[inset_3px_4px_0px_0px_rgba(255,255,255,0.5)]" />
          </div>
          <div className="basis-0 content-stretch flex gap-[6px] grow h-full items-start min-h-px min-w-px relative shrink-0 z-10">
            <textarea
              value={inputValue}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={placeholder}
              className="basis-0 font-['DM_Sans',sans-serif] font-normal grow h-full leading-[1.2] min-h-px min-w-px relative shrink-0 text-[15px] text-[rgba(21,32,43,0.55)] bg-transparent border-none outline-none resize-none w-full"
              rows={4}
            />
          </div>
        </div>
      </div>
    );
  }

  if (type === "select") {
    return (
      <div className="content-stretch flex flex-col gap-3 items-start relative shrink-0 w-full z-50">
        <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[15px] text-[#273b4f] w-full">
          {label}
          {required && " *"}
        </p>
        <div className="content-stretch flex gap-5 h-[48px] items-center px-5 py-0 relative rounded-[6px] shrink-0 w-full">
          <div className="absolute bg-[#bac8c9] border-2 border-[#8fa5ae] border-solid inset-0 rounded-[6px] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)]">
            <div className="absolute inset-[-1px] pointer-events-none shadow-[inset_3px_4px_0px_0px_rgba(255,255,255,0.5)]" />
          </div>
          <div
            ref={dropdownRef}
            className="basis-0 content-stretch flex gap-[6px] grow items-center min-h-px min-w-px relative shrink-0 z-50"
          >
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="basis-0 content-stretch flex gap-[6px] grow items-center min-h-px min-w-px relative shrink-0"
            >
              <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[15px] text-[rgba(21,32,43,0.55)] text-nowrap">
                {inputValue || placeholder}
              </p>
              <div className="relative shrink-0 size-[26px]">
                <div className="absolute inset-[33.67%_16.64%]">
                  <div className="absolute inset-[-9.52%_-6.16%_-15.79%_-6.16%]">
                    <Image
                      src="/contact-assets/chevron-down.svg"
                      alt=""
                      width={26}
                      height={26}
                      className="block max-w-none size-full"
                    />
                  </div>
                </div>
              </div>
            </button>
            {isOpen && options.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#bac8c9] border-2 border-[#8fa5ae] border-solid rounded-[6px] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] z-[9999] max-h-[200px] overflow-y-auto">
                {options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleChange(option);
                      setIsOpen(false);
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="w-full px-5 py-2 text-left hover:bg-[#a8b6b7] font-['DM_Sans',sans-serif] font-normal text-[15px] text-[#273b4f] first:rounded-t-[4px] last:rounded-b-[4px] cursor-pointer"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content-stretch flex flex-col gap-3 items-start relative shrink-0 w-full">
      <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[15px] text-[#273b4f] w-full">
        {label}
        {required && " *"}
      </p>
      <div className="content-stretch flex gap-5 h-[48px] items-center px-5 py-0 relative rounded-[6px] shrink-0 w-full">
        <div className="absolute bg-[#bac8c9] border-2 border-[#8fa5ae] border-solid inset-0 rounded-[6px] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)]">
          <div className="absolute inset-[-1px] pointer-events-none shadow-[inset_3px_4px_0px_0px_rgba(255,255,255,0.5)]" />
        </div>
        <div className="basis-0 content-stretch flex gap-[6px] grow items-center min-h-px min-w-px relative shrink-0 z-10">
          <input
            type={type}
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            className="basis-0 font-['DM_Sans',sans-serif] font-normal grow leading-[1.2] min-h-px min-w-px relative shrink-0 text-[15px] text-[rgba(21,32,43,0.55)] bg-transparent border-none outline-none w-full placeholder:text-[rgba(21,32,43,0.55)]"
          />
        </div>
      </div>
    </div>
  );
}
