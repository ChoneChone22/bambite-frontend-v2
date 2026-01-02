// Payment Success Modal component
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type PaymentSuccessModalProps = {
  onClose?: () => void;
};

export default function PaymentSuccessModal({
  onClose,
}: PaymentSuccessModalProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Redirect to order success page after countdown
      router.push("/order-success");
    }
  }, [countdown, router]);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gradient-to-b from-[rgba(21,32,43,0.3)] to-[rgba(60,93,126,0.3)] z-50" />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[#d1e3ea] content-stretch flex gap-[32px] items-center p-[32px] rounded-[16px] w-full max-w-[467.07px] mx-4">
        <div className="basis-0 content-stretch flex flex-col gap-[17px] grow items-start min-h-px min-w-px relative shrink-0">
          <p
            className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] from-[#1b232a] leading-none not-italic relative shrink-0 text-[32px] sm:text-[36px] md:text-[40px] to-[#315273] tracking-[-0.8px] w-full"
            style={{ WebkitTextFillColor: "transparent" }}
          >
            Payment Successful
          </p>
          <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[15px] sm:text-[16px] md:text-[17px] text-[rgba(21,32,43,0.55)] w-full">
            Proceeding to order status in{" "}
            {countdown === 3 ? "3" : countdown === 2 ? "2" : countdown === 1 ? "1" : ""}.
          </p>
        </div>
        <div className="h-[106.73px] relative shrink-0 w-[98.729px] flex-shrink-0">
          <div className="absolute inset-[-1.31%_-1.01%]">
            <Image
              src="/payment-assets/success-icon.svg"
              alt="Success"
              fill
              sizes="99px"
              className="block max-w-none size-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}

