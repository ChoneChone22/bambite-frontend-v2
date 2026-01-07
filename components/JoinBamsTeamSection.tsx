// Join Bam's Team Section component
export default function JoinBamsTeamSection() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full -ml-6">
      {/* Main Title */}
      <p
        className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] from-[#f9f9f9] leading-[0.92] not-italic text-[40px] sm:text-[52px] md:text-[64px] to-[#a6b5c0] tracking-[-1.28px] w-full"
        style={{ WebkitTextFillColor: "transparent" }}
      >
        Join Bam's Team
      </p>

      {/* Decorative "Join us!" text */}
      <div className="relative mt-4 sm:mt-6 md:mt-8 lg:absolute lg:flex lg:h-[50.691px] lg:items-center lg:justify-center lg:left-[calc(6.25%+100px)] lg:top-[168px] lg:translate-x-[-50%] lg:w-[89.128px]">
        <div className="flex-none rotate-[341deg]">
          <p className="font-indie-flower leading-[0.82] not-italic relative text-[#bb7b37] text-[16px] sm:text-[18px] md:text-[20px] text-center text-nowrap uppercase">
            Join us!
          </p>
        </div>
      </div>
    </div>
  );
}
