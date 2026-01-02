// FAQ Accordion component
"use client";

import { useState } from "react";

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  faqs: FAQ[];
};

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggleFAQ = (id: string) => {
    const newOpenIds = new Set(openIds);
    if (newOpenIds.has(id)) {
      newOpenIds.delete(id);
    } else {
      newOpenIds.add(id);
    }
    setOpenIds(newOpenIds);
  };

  return (
    <div className="content-stretch flex flex-col gap-[11px] items-start justify-center relative shrink-0 w-full">
      {faqs.map((faq) => {
        const isOpen = openIds.has(faq.id);
        return (
          <div
            key={faq.id}
            className={`border-2 border-solid content-stretch flex flex-col gap-[14px] items-start px-[16px] py-[12px] sm:py-[15px] relative rounded-[24px] shrink-0 w-full transition-all ${
              isOpen
                ? "border-[rgba(255,255,255,0.3)]"
                : "border-[rgba(255,255,255,0.1)]"
            }`}
          >
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="content-stretch flex items-center justify-between relative shrink-0 w-full"
            >
              <p
                className="basis-0 bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] font-semibold from-[#f9f9f9] grow leading-[0.82] min-h-px min-w-px not-italic relative shrink-0 text-[20px] text-left to-[#a6b5c0]"
                style={{ WebkitTextFillColor: "transparent" }}
              >
                {faq.question}
              </p>
              <div className="content-stretch flex items-center p-[4px] relative rounded-[6px] shrink-0">
                <div className="relative shrink-0 size-[18px]">
                  {isOpen ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-white"
                    >
                      <path
                        d="M18 15L12 9L6 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-white"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </button>
            {isOpen && (
              <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[12px] sm:text-[14px] text-[rgba(255,255,255,0.55)] w-full">
                {faq.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

