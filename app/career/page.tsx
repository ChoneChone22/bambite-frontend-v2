// Career Page
"use client";

import CareerBackground from "@/components/CareerBackground";
import MissionStatement from "@/components/MissionStatement";
import JoinBamsTeamSection from "@/components/JoinBamsTeamSection";
import JobListingsSection, { Job } from "@/components/JobListingsSection";

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
    <CareerBackground>
      <div className="w-full h-screen max-h-screen overflow-hidden overflow-x-hidden pt-[70px]">
        {/* Main Content */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 md:pt-12 pb-4 sm:pb-6 md:pb-8 h-[calc(100vh-70px)] overflow-y-auto">
          {/* Mission Statement */}
          <div className="mb-4 sm:mb-5 md:mb-6">
            <MissionStatement text={missionText} />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 xl:gap-8 items-start">
            {/* Left Column - Join Bam's Team */}
            <div className="w-full lg:max-w-[273px]">
              <JoinBamsTeamSection />
            </div>

            {/* Right Column - Job Listings */}
            <div className="w-full">
              <JobListingsSection jobs={jobs} onApply={handleApply} />
            </div>
          </div>
        </div>
      </div>
    </CareerBackground>
  );
}
