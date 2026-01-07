// Job Detail Page
"use client";

import { useParams, useRouter } from "next/navigation";
import JobDetailBackground from "@/components/JobDetailBackground";
import BackButton from "@/components/BackButton";
import JobDetailContent from "@/components/JobDetailContent";
import JobDetailsCard from "@/components/JobDetailsCard";
import ApplyNowButton from "@/components/ApplyNowButton";

// Sample job data - replace with actual API call
const getJobById = (id: string) => {
  const jobs: Record<
    string,
    {
      id: string;
      title: string;
      category: string;
      workingHours: string;
      contract: string;
      salary: string;
      closeDate: string;
      tasks: string[];
      qualifications: string[];
    }
  > = {
    "1": {
      id: "1",
      title: "Office Staff",
      category: "Office",
      workingHours: "9am - 5pm",
      contract: "No",
      salary: "Negotiate",
      closeDate: "18 Dec 2025",
      tasks: [
        "Handle data entry and record keeping, maintaining important information accurately.",
        "Manage email correspondence, scheduling, and calendar management.",
        "Prepare documents, organize filing systems, and operate office equipment.",
        "Provide meeting support and communication, including responding to customer inquiries.",
        "Oversee office supplies and assist with general administrative workflows.",
      ],
      qualifications: [
        "Strong computer and digital skills.",
        "Proficiency in English and Thai; Thai language ability is an advantage.",
        "Ability to work well with others, manage time effectively, and perform tasks with accuracy and attention to detail.",
      ],
    },
    "2": {
      id: "2",
      title: "Office Staff",
      category: "Office",
      workingHours: "9am - 5pm",
      contract: "No",
      salary: "Negotiate",
      closeDate: "18 Dec 2025",
      tasks: [
        "Handle data entry and record keeping, maintaining important information accurately.",
        "Manage email correspondence, scheduling, and calendar management.",
        "Prepare documents, organize filing systems, and operate office equipment.",
        "Provide meeting support and communication, including responding to customer inquiries.",
        "Oversee office supplies and assist with general administrative workflows.",
      ],
      qualifications: [
        "Strong computer and digital skills.",
        "Proficiency in English and Thai; Thai language ability is an advantage.",
        "Ability to work well with others, manage time effectively, and perform tasks with accuracy and attention to detail.",
      ],
    },
    "3": {
      id: "3",
      title: "Office Staff",
      category: "Office",
      workingHours: "9am - 5pm",
      contract: "No",
      salary: "Negotiate",
      closeDate: "18 Dec 2025",
      tasks: [
        "Handle data entry and record keeping, maintaining important information accurately.",
        "Manage email correspondence, scheduling, and calendar management.",
        "Prepare documents, organize filing systems, and operate office equipment.",
        "Provide meeting support and communication, including responding to customer inquiries.",
        "Oversee office supplies and assist with general administrative workflows.",
      ],
      qualifications: [
        "Strong computer and digital skills.",
        "Proficiency in English and Thai; Thai language ability is an advantage.",
        "Ability to work well with others, manage time effectively, and perform tasks with accuracy and attention to detail.",
      ],
    },
  };

  return jobs[id] || jobs["1"];
};

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = (params?.id as string) || "1";
  const job = getJobById(jobId);

  if (!job) {
    router.push("/career");
    return null;
  }

  return (
    <JobDetailBackground>
      <div
        className="min-h-screen w-full overflow-x-hidden"
        style={{ margin: 0, padding: 0 }}
      >
        {/* Mobile/Tablet Layout (hidden on lg+) */}
        <div className="lg:hidden w-full  pb-6">
          {/* Back Button */}
          <div className="mb-5 mt-12">
            <BackButton />
          </div>

          {/* Title and Category */}
          <div className="flex flex-col gap-[10px] mb-10 px-6">
            <h1 className="font-['Chillax_Variable',sans-serif] font-semibold text-[32px] leading-[0.95] bg-gradient-to-b from-[#f9f9f9] to-[#a6b5c0] bg-clip-text text-transparent">
              {job.title}
            </h1>
            <div className="inline-flex bg-[#2176bb] px-[5px] py-[3px] rounded-[4px] self-start">
              <p className="font-['Space_Mono',sans-serif] font-bold text-[13px] leading-none text-white uppercase">
                {job.category}
              </p>
            </div>
          </div>

          {/* Apply Now Button */}
          <div className="mb-10 px-6">
            <ApplyNowButton jobId={job.id} />
          </div>

          {/* Tasks Section */}
          <div className="flex flex-col gap-5 mb-12 px-6">
            <p className="font-['Space_Mono',sans-serif] font-bold text-[13px] leading-none text-[rgba(255,255,255,0.9)] uppercase">
              Tasks to be Performed
            </p>
            <ul className="list-disc pl-[25.5px] text-[rgba(255,255,255,0.9)]">
              {job.tasks.map((task, index) => (
                <li
                  key={index}
                  className="font-['DM_Sans',sans-serif] font-normal text-[17px] leading-[1.2] mb-0"
                >
                  {task}
                </li>
              ))}
            </ul>
          </div>

          {/* Qualifications Section */}
          <div className="flex flex-col gap-5 px-6">
            <p className="font-['Space_Mono',sans-serif] font-bold text-[13px] leading-none text-[rgba(255,255,255,0.9)] uppercase">
              Required Qualifications
            </p>
            <ul className="list-disc pl-[25.5px] text-[rgba(255,255,255,0.9)]">
              {job.qualifications.map((qualification, index) => (
                <li
                  key={index}
                  className="font-['DM_Sans',sans-serif] font-normal text-[17px] leading-[1.2] mb-0"
                >
                  {qualification}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Desktop Layout (hidden on mobile/tablet) */}
        <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start relative pt-40 pl-44">
            {/* Left Column - Job Detail Content */}
            <div className="w-full lg:max-w-[600px] relative">
              {/* Back Button positioned at the left */}
              <div className="absolute -left-96 -top-14">
                <BackButton />
              </div>

              <JobDetailContent
                job={{
                  title: job.title,
                  category: job.category,
                  tasks: job.tasks,
                  qualifications: job.qualifications,
                }}
              />

              {/* Apply Now Button */}
              <div className="mt-12 sm:mt-16 md:mt-20">
                <ApplyNowButton jobId={job.id} />
              </div>
            </div>

            {/* Right Column - Job Details Card */}
            <div
              className="w-full lg:relative lg:max-w-[298px] lg:ml-auto bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden"
              style={{
                backgroundImage: "url(/career-assets/job-detail-bg.webp)",
              }}
            >
              <JobDetailsCard
                details={{
                  workingHours: job.workingHours,
                  contract: job.contract,
                  salary: job.salary,
                  closeDate: job.closeDate,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </JobDetailBackground>
  );
}
