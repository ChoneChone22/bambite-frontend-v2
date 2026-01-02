// Checkout Order Summary component
"use client";

import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";

export default function CheckoutOrderSummary() {
  const { items, updateQuantity, removeItem, getTotal } = useCart();
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);

  // Calculate delivery fee based on address (placeholder logic)
  useEffect(() => {
    // TODO: Calculate delivery fee based on address
    // For now, set a default fee if address is provided
    // Use setTimeout to avoid synchronous setState in effect
    const timer = setTimeout(() => {
      setDeliveryFee(null);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const subtotal = getTotal();
  const total = subtotal + (deliveryFee || 0);

  const handleIncrement = (id: string, currentQuantity: number) => {
    updateQuantity(id, currentQuantity + 1);
  };

  const handleDecrement = (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    } else {
      removeItem(id);
    }
  };

  return (
    <div className="content-stretch flex flex-col gap-[34px] items-center w-full max-w-[338px]">
      {/* Cart Items */}
      <div className="content-stretch flex flex-col gap-[18px] items-start relative shrink-0 w-full">
        {items.length === 0 ? (
          <p className="text-[#273b4f] text-center w-full py-8">
            Your cart is empty.
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="content-stretch flex flex-col items-start relative shrink-0 w-full"
            >
              <div className="content-stretch flex gap-[23px] items-center relative shrink-0 w-full">
                {/* Product Image */}
                <div className="h-[100.819px] relative shrink-0 w-[80px] rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="80px"
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* Product Info */}
                <div className="basis-0 content-stretch flex gap-[51px] grow items-start min-h-px min-w-px relative shrink-0">
                  <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-[119px]">
                    <p
                      className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] from-[#1b232a] leading-[0.82] min-w-full not-italic relative shrink-0 text-[20px] to-[#315273] w-[min-content]"
                      style={{ WebkitTextFillColor: "transparent" }}
                    >
                      {item.title}
                    </p>
                    {item.size && (
                      <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] min-w-full relative shrink-0 text-[14px] text-[rgba(21,32,43,0.55)] w-[min-content]">
                        Size: {item.size}
                      </p>
                    )}
                    {item.variant && (
                      <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] min-w-full relative shrink-0 text-[14px] text-[rgba(21,32,43,0.55)] w-[min-content]">
                        {item.variant}
                      </p>
                    )}

                    {/* Quantity Controls */}
                    <div className="content-stretch flex items-center relative shrink-0">
                      <div className="flex items-center justify-center relative shrink-0">
                        <div className="flex-none rotate-180">
                          <div className="content-stretch flex gap-[4px] items-center justify-center relative">
                            <button
                              onClick={() => handleDecrement(item.id, item.quantity)}
                              className="flex items-center justify-center relative shrink-0"
                            >
                              <div className="flex-none rotate-180">
                                <div className="content-stretch flex items-center p-[8px] relative rounded-[8px] hover:bg-gray-200 transition-colors">
                                  <div className="overflow-clip relative shrink-0 size-[16px]">
                                    <Image
                                      src="/product-assets/minus.svg"
                                      alt="Decrease quantity"
                                      width={16}
                                      height={16}
                                      className="block max-w-none"
                                    />
                                  </div>
                                </div>
                              </div>
                            </button>
                            <div className="flex items-center justify-center relative shrink-0">
                              <div className="flex-none rotate-180">
                                <p className="font-['Space_Mono',sans-serif] font-bold leading-none not-italic relative text-[16px] text-[#273b4f] text-nowrap uppercase">
                                  {item.quantity}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleIncrement(item.id, item.quantity)}
                              className="flex items-center justify-center relative shrink-0"
                            >
                              <div className="flex-none rotate-180">
                                <div className="content-stretch flex items-center p-[8px] relative rounded-[8px] hover:bg-gray-200 transition-colors">
                                  <div className="overflow-clip relative shrink-0 size-[16px]">
                                    <Image
                                      src="/product-assets/plus-icon.svg"
                                      alt="Increase quantity"
                                      width={16}
                                      height={16}
                                      className="block max-w-none"
                                    />
                                  </div>
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <p
                    className="bg-clip-text bg-gradient-to-b font-['DM_Sans',sans-serif] font-normal from-[#1b232a] leading-[1.2] relative shrink-0 text-[14px] text-nowrap to-[#315273]"
                    style={{ WebkitTextFillColor: "transparent" }}
                  >
                    {item.price * item.quantity} THB
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cost Breakdown */}
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
        <div className="content-stretch flex font-['DM_Sans',sans-serif] font-normal items-center justify-between leading-[1.2] relative shrink-0 text-[#273b4f] text-nowrap w-full">
          <p className="relative shrink-0 text-[12px]">Subtotal</p>
          <p className="relative shrink-0 text-[14px] text-right">
            {subtotal} THB
          </p>
        </div>
        <div className="content-stretch flex font-['DM_Sans',sans-serif] font-normal gap-[57px] items-center leading-[1.2] relative shrink-0 text-[12px] text-nowrap w-full">
          <p className="relative shrink-0 text-[#273b4f]">Delivery Fee</p>
          <p className="relative shrink-0 text-[rgba(21,32,43,0.55)] text-right">
            {deliveryFee !== null
              ? `${deliveryFee} THB`
              : "Enter your address to see delivery fee."}
          </p>
        </div>
      </div>

      {/* Total */}
      <div className="content-stretch flex flex-col gap-[11px] items-end relative shrink-0 w-full">
        <div className="h-0 relative shrink-0 w-full">
          <div className="absolute inset-[-2px_0_0_0]">
            <Image
              src="/checkout-assets/line-20.svg"
              alt=""
              fill
              sizes="100%"
              className="block max-w-none size-full"
            />
          </div>
        </div>
        <div className="content-stretch flex font-['DM_Sans',sans-serif] font-semibold items-center justify-between leading-[1.2] relative shrink-0 text-[14px] text-[#273b4f] text-nowrap w-full">
          <p className="relative shrink-0">Total</p>
          <p className="relative shrink-0 text-right">{total} THB</p>
        </div>
      </div>
    </div>
  );
}

