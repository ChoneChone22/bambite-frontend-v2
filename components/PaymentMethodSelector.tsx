// Payment Method Selector component
"use client";

import { useState } from "react";
import Image from "next/image";
import CheckoutFormInput from "./CheckoutFormInput";

type PaymentMethod = "qr" | "card";

type PaymentMethodSelectorProps = {
  selectedMethod?: PaymentMethod;
  onMethodChange?: (method: PaymentMethod) => void;
  onCardDataChange?: (data: {
    name: string;
    cardNumber: string;
    expiry: string;
    cvc: string;
  }) => void;
};

export default function PaymentMethodSelector({
  selectedMethod = "qr",
  onMethodChange,
  onCardDataChange,
}: PaymentMethodSelectorProps) {
  const [cardData, setCardData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const handleCardDataChange = (field: string, value: string) => {
    const newData = { ...cardData, [field]: value };
    setCardData(newData);
    if (onCardDataChange) {
      onCardDataChange(newData);
    }
  };

  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <p className="font-['Chillax_Variable',sans-serif] font-semibold leading-[0.82] not-italic relative shrink-0 text-[20px] text-[#273b4f] w-full">
        Select Payment Method
      </p>

      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
        {/* QR PromptPay Option */}
        <button
          type="button"
          onClick={() => onMethodChange?.("qr")}
          className={`border border-solid content-stretch flex gap-[13px] items-center p-4 relative rounded-[8px] shrink-0 w-full transition-colors ${
            selectedMethod === "qr"
              ? "border-[rgba(25,53,81,0.9)] bg-[#e6eef2]"
              : "border-[rgba(39,59,79,0.15)] bg-white hover:bg-gray-50"
          }`}
        >
          <div className="h-[24px] relative shrink-0 w-[23.958px]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <Image
                src="/checkout-assets/qr-icon.webp"
                alt="QR Code"
                fill
                sizes="24px"
                className="absolute left-[-53.49%] max-w-none size-[204.07%] top-[-53.73%]"
              />
            </div>
          </div>
          <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[#273b4f] text-nowrap">
            QR PromptPay
          </p>
        </button>

        {/* Credit/Debit Card Option */}
        <div
          className={`border border-solid content-stretch flex flex-col gap-[13px] items-start justify-center p-4 relative rounded-[8px] shrink-0 w-full ${
            selectedMethod === "card"
              ? "border-[rgba(25,53,81,0.9)] bg-[#e6eef2]"
              : "border-[rgba(39,59,79,0.15)] bg-white"
          }`}
        >
          <button
            type="button"
            onClick={() => onMethodChange?.("card")}
            className="content-stretch flex gap-[13px] items-center relative shrink-0 w-full text-left"
          >
            <div className="overflow-clip relative shrink-0 size-[24px]">
              <div className="absolute inset-[20.09%_8.88%]">
                <div className="absolute inset-[-6.97%_-5.07%]">
                  <Image
                    src="/checkout-assets/credit-card-icon.svg"
                    alt="Credit Card"
                    width={24}
                    height={24}
                    className="block max-w-none size-full"
                  />
                </div>
              </div>
            </div>
            <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[#273b4f] text-nowrap">
              Credit/Debit Card
            </p>
          </button>

          {selectedMethod === "card" && (
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <CheckoutFormInput
                label="Name"
                placeholder="Name"
                required
                value={cardData.name}
                onChange={(value) => handleCardDataChange("name", value)}
              />
              <CheckoutFormInput
                label="Card Number"
                placeholder="Card Number"
                required
                value={cardData.cardNumber}
                onChange={(value) => handleCardDataChange("cardNumber", value)}
              />
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
                <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                  <CheckoutFormInput
                    label="MM/YY"
                    placeholder="MM/YY"
                    required
                    value={cardData.expiry}
                    onChange={(value) => handleCardDataChange("expiry", value)}
                  />
                </div>
                <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                  <CheckoutFormInput
                    label="CVC"
                    placeholder="CVC"
                    required
                    value={cardData.cvc}
                    onChange={(value) => handleCardDataChange("cvc", value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

