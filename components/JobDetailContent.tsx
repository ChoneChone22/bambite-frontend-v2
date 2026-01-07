// Job Detail Content component
type JobDetail = {
  title: string;
  category: string;
  tasks: string[];
  qualifications: string[];
};

type JobDetailContentProps = {
  job: JobDetail;
};

export default function JobDetailContent({ job }: JobDetailContentProps) {
  return (
    <div className="content-stretch flex flex-col gap-[65px] items-start w-full max-w-[600px]">
      {/* Title and Category */}
      <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
        <p
          className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] from-[#f9f9f9] leading-none min-w-full not-italic relative shrink-0 text-[32px] sm:text-[36px] md:text-[40px] to-[#a6b5c0] tracking-[-0.8px] w-[min-content]"
          style={{ WebkitTextFillColor: "transparent" }}
        >
          {job.title}
        </p>
        <div className="bg-[#1e6cad] content-stretch flex items-center justify-center px-[5px] py-[3px] relative rounded-[4px] shrink-0">
          <p className="font-['Space_Mono',sans-serif] font-bold leading-none not-italic relative shrink-0 text-[11px] sm:text-[12px] md:text-[13px] text-nowrap text-white uppercase">
            {job.category}
          </p>
        </div>
      </div>

      {/* Tasks and Qualifications */}
      <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-full">
        {/* Tasks Section */}
        <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 text-[rgba(255,255,255,0.9)] w-full">
          <p className="font-['Space_Mono',sans-serif] font-bold leading-none not-italic relative shrink-0 text-[11px] sm:text-[12px] md:text-[13px] uppercase w-full">
            Tasks to be Performed
          </p>
          <ul className="list-disc font-['DM_Sans',sans-serif] font-normal relative shrink-0 text-[15px] sm:text-[16px] md:text-[17px] w-full space-y-2 pl-5">
            {job.tasks.map((task, index) => (
              <li key={index} className="leading-[1.2]">
                {task}
              </li>
            ))}
          </ul>
        </div>

        {/* Qualifications Section */}
        <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 text-[rgba(255,255,255,0.9)] w-full">
          <p className="font-['Space_Mono',sans-serif] font-bold leading-none not-italic relative shrink-0 text-[11px] sm:text-[12px] md:text-[13px] uppercase w-full">
            Required Qualifications
          </p>
          <ul className="list-disc font-['DM_Sans',sans-serif] font-normal relative shrink-0 text-[15px] sm:text-[16px] md:text-[17px] w-full space-y-2 pl-5">
            {job.qualifications.map((qualification, index) => (
              <li key={index} className="leading-[1.2]">
                {qualification}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
