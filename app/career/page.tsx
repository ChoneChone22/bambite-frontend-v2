// Career Page
"use client";

import CareerBackground from "@/components/CareerBackground";
import MissionStatement from "@/components/MissionStatement";
import JoinBamsTeamSection from "@/components/JoinBamsTeamSection";
import JobListingsSection, { Job } from "@/components/JobListingsSection";
import JobCard from "@/components/JobCard";

// Sample job data - replace with actual API call
const getJobs = (): Job[] => {
  return [
    {
      id: "1",
      title: "Office staff",
      category: "Office",
      workingHours: "9am - 5pm",
      contract: "No",
      salary: "Negotiate",
      closeDate: "18 Dec 2025",
    },
    {
      id: "2",
      title: "Office staff",
      category: "Office",
      workingHours: "9am - 5pm",
      contract: "No",
      salary: "Negotiate",
      closeDate: "18 Dec 2025",
    },
    {
      id: "3",
      title: "Office staff",
      category: "Office",
      workingHours: "9am - 5pm",
      contract: "No",
      salary: "Negotiate",
      closeDate: "18 Dec 2025",
    },
  ];
};

const missionText =
  "We're fast moving team that stive to offer the best Asian food in Thailand. We're looking for those who share the same values: quality, dedication, and velocity, with us.";

export default function CareerPage() {
  const jobs = getJobs();

  const handleApply = (jobId: string) => {
    console.log("Apply for job:", jobId);
    // Implement application logic here
  };

  return (
    <div className="overflow-visible">
      <CareerBackground>
        {/* Mobile/Tablet Layout - Figma exact, with user requests */}
        <div className="block lg:hidden w-full bg-transparent pt-32 overflow-visible">
          {/* Mission Statement */}
          <div className="px-5 mt-0">
            <MissionStatement text={missionText} />
          </div>
          {/* Join Bam's Team */}
          <div className="px-5 mt-7">
            <p className="font-['Chillax_Variable',sans-serif] text-[20px] font-semibold leading-[1.1] bg-linear-to-b from-[#f9f9f9] to-[#a6b5c0] bg-clip-text text-transparent tracking-[-0.5px]">
              Join Bam's Team
            </p>
            <div className="mt-1 flex items-center w-full">
              <span
                className="font-indie-flower text-[#bb7b37] text-[12px] leading-[0.82] not-italic uppercase inline-block pr-2"
                style={{ transform: "rotate(-19deg)" }}
              >
                Join us!
              </span>
            </div>
          </div>
          {/* Job Listings */}
          <div className="px-2 mt-7 pb-10">
            <div className="flex flex-col gap-5">
              {jobs.map((job) => (
                <div key={job.id} className="w-full max-w-[320px] mx-auto">
                  <JobCard job={job} onApply={handleApply} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout (unchanged) */}
        <div className="hidden lg:block w-full h-screen max-h-screen overflow-hidden overflow-x-hidden pt-20">
          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 md:pt-12 pb-4 sm:pb-6 md:pb-8 h-[calc(100vh-70px)] overflow-y-auto">
            {/* Mission Statement */}
            <div className="mb-4 sm:mb-5 md:mb-6">
              <MissionStatement text={missionText} />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 xl:gap-8 items-start">
              {/* Left Column - Join Bam's Team */}
              <div className="w-full lg:max-w-68 mt-24">
                <JoinBamsTeamSection />
              </div>

              {/* Right Column - Job Listings */}
              <div className="w-full mt-24">
                <JobListingsSection jobs={jobs} onApply={handleApply} />
              </div>
            </div>
          </div>
        </div>
      </CareerBackground>
    </div>
  );
}
