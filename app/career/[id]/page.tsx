// Job Detail Page - Production Ready with Real API Data
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import JobDetailBackground from "@/components/JobDetailBackground";
import BackButton from "@/components/BackButton";
import JobDetailContent from "@/components/JobDetailContent";
import JobDetailsCard from "@/components/JobDetailsCard";
import ApplyNowButton from "@/components/ApplyNowButton";
import { getJobPostById } from "@/lib/api/jobPosts";
import type { ApiJobPost } from "@/lib/types/api.types";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.id as string;

  const [jobPost, setJobPost] = useState<ApiJobPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch job post from API
  useEffect(() => {
    const fetchJobPost = async () => {
      if (!jobId) {
        router.push("/career");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await getJobPostById(jobId);

        if (!data) {
          setError("Job post not found");
          setTimeout(() => router.push("/career"), 2000);
          return;
        }

        setJobPost(data);
      } catch (err) {
        console.error("Error fetching job post:", err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to load job post. Please try again.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchJobPost();
  }, [jobId, router]);

  // Format date for display
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Until filled";
    }
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <JobDetailBackground>
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/70 text-lg">Loading job details...</p>
        </div>
      </div>
    </JobDetailBackground>
  );

  // Error message
  const ErrorMessage = () => (
    <JobDetailBackground>
      <div className="min-h-screen w-full flex items-center justify-center px-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md">
          <p className="font-medium mb-2">Error Loading Job Post</p>
          <p className="text-sm mb-4">{error}</p>
          <button
            onClick={() => router.push("/career")}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Back to Career Page
          </button>
        </div>
      </div>
    </JobDetailBackground>
  );

  if (loading) return <LoadingSkeleton />;
  if (error || !jobPost) return <ErrorMessage />;

  // Map API data to component format
  const job = {
    id: jobPost.id,
    title: jobPost.title,
    category: jobPost.placeTag?.name || "Location not specified",
    workingHours: jobPost.jobDetails.workingHours || "Flexible",
    contract: jobPost.jobDetails.contract ? "Yes" : "No",
    salary: jobPost.jobDetails.salary || "Negotiate",
    closeDate: formatDate(jobPost.jobDetails.closeDate),
    tasks: jobPost.tasks?.descriptions || [],
    qualifications: jobPost.requiredQualifications?.descriptions || [],
  };

  return (
    <JobDetailBackground>
      <div
        className="min-h-screen w-full overflow-x-hidden"
        style={{ margin: 0, padding: 0 }}
      >
        {/* Mobile/Tablet Layout (hidden on lg+) */}
        <div className="lg:hidden w-full pb-6">
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
              {jobPost.tasks?.title || "Tasks to be Performed"}
            </p>
            <ul className="list-disc pl-[25.5px] text-[rgba(255,255,255,0.9)]">
              {job.tasks.length > 0 ? (
                job.tasks.map((task, index) => (
                  <li
                    key={index}
                    className="font-['DM_Sans',sans-serif] font-normal text-[17px] leading-[1.2] mb-0"
                  >
                    {task}
                  </li>
                ))
              ) : (
                <li className="font-['DM_Sans',sans-serif] font-normal text-[17px] leading-[1.2]">
                  No tasks specified
                </li>
              )}
            </ul>
          </div>

          {/* Qualifications Section */}
          <div className="flex flex-col gap-5 px-6">
            <p className="font-['Space_Mono',sans-serif] font-bold text-[13px] leading-none text-[rgba(255,255,255,0.9)] uppercase">
              {jobPost.requiredQualifications?.title ||
                "Required Qualifications"}
            </p>
            <ul className="list-disc pl-[25.5px] text-[rgba(255,255,255,0.9)]">
              {job.qualifications.length > 0 ? (
                job.qualifications.map((qualification, index) => (
                  <li
                    key={index}
                    className="font-['DM_Sans',sans-serif] font-normal text-[17px] leading-[1.2] mb-0"
                  >
                    {qualification}
                  </li>
                ))
              ) : (
                <li className="font-['DM_Sans',sans-serif] font-normal text-[17px] leading-[1.2]">
                  No qualifications specified
                </li>
              )}
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
