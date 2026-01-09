// Career Page - Production Ready with Real API Data
"use client";

import { useState, useEffect } from "react";
import CareerBackground from "@/components/CareerBackground";
import MissionStatement from "@/components/MissionStatement";
import JoinBamsTeamSection from "@/components/JoinBamsTeamSection";
import JobListingsSection, { Job } from "@/components/JobListingsSection";
import JobCard from "@/components/JobCard";
import { getJobPosts, mapJobPostToFrontendJob } from "@/lib/api/jobPosts";

const missionText =
  "We're fast moving team that strive to offer the best Asian food in Thailand. We're looking for those who share the same values: quality, dedication, and velocity, with us.";

export default function CareerPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch job posts from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getJobPosts();

        if (response.status === "success" && response.data) {
          // Map API job posts to frontend Job type
          const mappedJobs = response.data.map(mapJobPostToFrontendJob);
          setJobs(mappedJobs);
        } else {
          setError("Failed to load job posts");
        }
      } catch (err) {
        console.error("Error fetching job posts:", err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to load job posts. Please try again later.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (jobId: string) => {
    // Navigate to job detail page or open application modal
    window.location.href = `/career/${jobId}/apply`;
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="w-full max-w-[320px] xl:w-[450px] mx-auto bg-white/5 rounded-lg p-6 animate-pulse"
        >
          <div className="h-6 bg-white/10 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-white/10 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-white/10 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );

  // Error message component
  const ErrorMessage = () => (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md">
        <p className="font-medium mb-2">Error Loading Job Posts</p>
        <p className="text-sm mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm font-medium"
        >
          Retry
        </button>
      </div>
    </div>
  );

  // No jobs message
  const NoJobsMessage = () => (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center max-w-md">
        <p className="font-['Chillax_Variable',sans-serif] text-2xl text-white/90 mb-4">
          No Open Positions
        </p>
        <p className="text-white/60 text-sm">
          We don&apos;t have any open positions at the moment. Please check back
          later or follow us on social media for updates.
        </p>
      </div>
    </div>
  );

  return (
    <div className="overflow-visible">
      <CareerBackground>
        {/* Mobile/Tablet Layout */}
        <div className="block lg:hidden w-full bg-transparent pt-32 overflow-visible">
          {/* Mission Statement */}
          <div className="px-5 mt-0">
            <MissionStatement text={missionText} />
          </div>

          {/* Join Bam's Team */}
          <div className="px-5 mt-7">
            <p className="font-['Chillax_Variable',sans-serif] text-[20px] font-semibold leading-[1.1] bg-linear-to-b from-[#f9f9f9] to-[#a6b5c0] bg-clip-text text-transparent tracking-[-0.5px]">
              Join Bam&apos;s Team
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
            {loading ? (
              <LoadingSkeleton />
            ) : error ? (
              <ErrorMessage />
            ) : jobs.length === 0 ? (
              <NoJobsMessage />
            ) : (
              <div className="flex flex-col gap-5">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="w-full max-w-[320px] xl:w-[450px] mx-auto"
                  >
                    <JobCard job={job} onApply={handleApply} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block w-full min-h-screen overflow-x-hidden pt-20">
          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 md:pt-12 pb-12">
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
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5 xl:gap-6">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="bg-white/5 rounded-lg p-6 animate-pulse"
                      >
                        <div className="h-6 bg-white/10 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-white/10 rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-white/10 rounded w-2/3"></div>
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <ErrorMessage />
                ) : jobs.length === 0 ? (
                  <NoJobsMessage />
                ) : (
                  <JobListingsSection jobs={jobs} onApply={handleApply} />
                )}
              </div>
            </div>
          </div>
        </div>
      </CareerBackground>
    </div>
  );
}
