// Application Form Page - Production Ready with Real API Data
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import JobDetailBackground from "@/components/JobDetailBackground";
import BackButton from "@/components/BackButton";
import FormInput from "@/components/FormInput";
import FormTextarea from "@/components/FormTextarea";
import UploadCVButton from "@/components/UploadCVButton";
import JobDetailsCard from "@/components/JobDetailsCard";
import Image from "next/image";
import { getJobPostById } from "@/lib/api/jobPosts";
import { submitJobApplication } from "@/lib/api/jobApplication";
import type { ApiJobPost } from "@/lib/types/api.types";

export default function ApplicationFormPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.id as string;

  // Job data state
  const [jobPost, setJobPost] = useState<ApiJobPost | null>(null);
  const [jobLoading, setJobLoading] = useState(true);
  const [jobError, setJobError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
    pressure: "",
    coverLetter: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Fetch job post from API
  useEffect(() => {
    const fetchJobPost = async () => {
      if (!jobId) {
        router.push("/career");
        return;
      }

      try {
        setJobLoading(true);
        setJobError(null);

        const data = await getJobPostById(jobId);

        if (!data) {
          setJobError("Job post not found");
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
        setJobError(errorMessage);
      } finally {
        setJobLoading(false);
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

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.interest.trim()) {
      newErrors.interest = "This field is required";
    }

    if (!formData.pressure.trim()) {
      newErrors.pressure = "This field is required";
    }

    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = "Cover letter is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileSelect = (file: File) => {
    // Validate file size (max 3MB as per backend API)
    const maxSize = 3 * 1024 * 1024; // 3MB
    if (file.size > maxSize) {
      setSubmitError("File size must be less than 3MB");
      return;
    }
    
    // Validate file type (PDF only as per backend API)
    if (file.type !== "application/pdf") {
      setSubmitError("Please upload a PDF file only");
      return;
    }
    
    setCvFile(file);
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for API submission
      // Backend expects: jobPostId, name, email, joiningReason, additionalQuestion, coverLetter, uploadedFile
      const submitData = new FormData();
      submitData.append("jobPostId", jobId);
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("joiningReason", formData.interest); // Map interest to joiningReason
      submitData.append("additionalQuestion", formData.pressure); // Map pressure to additionalQuestion
      submitData.append("coverLetter", formData.coverLetter);
      
      if (cvFile) {
        submitData.append("uploadedFile", cvFile); // Backend expects 'uploadedFile'
      }

      // Submit to API
      const response = await submitJobApplication(submitData);

      console.log("Application submitted successfully:", response);

      // Redirect to success page
      router.push(`/career/${jobId}/apply/success?jobId=${jobId}`);
    } catch (error) {
      console.error("Error submitting application:", error);
      
      // Handle different error types
      const errorObj = error as Error & { code?: string; retryAfter?: number };
      
      if (errorObj.code === "RATE_LIMIT_EXCEEDED") {
        const retryMinutes = Math.ceil((errorObj.retryAfter || 15) / 60);
        setSubmitError(
          `Too many applications submitted. Please try again in ${retryMinutes} minutes.`
        );
      } else {
        setSubmitError(
          errorObj.message || "Failed to submit application. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading skeleton
  if (jobLoading) {
    return (
      <JobDetailBackground>
        <div className="min-h-screen w-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white/70 text-lg">Loading application form...</p>
          </div>
        </div>
      </JobDetailBackground>
    );
  }

  // Error state
  if (jobError || !jobPost) {
    return (
      <JobDetailBackground>
        <div className="min-h-screen w-full flex items-center justify-center px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md">
            <p className="font-medium mb-2">Error Loading Job Post</p>
            <p className="text-sm mb-4">{jobError || "Job post not found"}</p>
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
  }

  // Map API data to component format
  const job = {
    id: jobPost.id,
    title: jobPost.title,
    category: jobPost.placeTag?.name || "Location not specified",
    workingHours: jobPost.jobDetails.workingHours || "Flexible",
    contract: jobPost.jobDetails.contract ? "Yes" : "No",
    salary: jobPost.jobDetails.salary || "Negotiate",
    closeDate: formatDate(jobPost.jobDetails.closeDate),
  };

  return (
    <JobDetailBackground>
      <div
        className="min-h-screen w-full overflow-x-hidden pb-10"
        style={{ margin: 0, padding: 0 }}
      >
        {/* Mobile/Tablet Layout (hidden on lg+) */}
        <div className="lg:hidden w-full pb-6">
          {/* Back Button */}
          <div className="mb-5 mt-12 px-6">
            <BackButton />
          </div>

          {/* Form Header */}
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8 px-6">
            {/* Submit Error */}
            {submitError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <span className="block sm:inline">{submitError}</span>
              </div>
            )}

            {/* Name Field */}
            <div>
              <FormInput
                label="Name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(value) => handleInputChange("name", value)}
                error={errors.name}
              />
            </div>

            {/* Email Field */}
            <div>
              <FormInput
                label="Email"
                name="email"
                placeholder="Your email"
                type="email"
                value={formData.email}
                onChange={(value) => handleInputChange("email", value)}
                error={errors.email}
              />
            </div>

            {/* Interest Field */}
            <div>
              <FormTextarea
                label="Why are you interested in joining Bam's?"
                name="interest"
                placeholder="Tell us why you want to join our team"
                value={formData.interest}
                onChange={(value) => handleInputChange("interest", value)}
                error={errors.interest}
              />
            </div>

            {/* Pressure Field */}
            <div>
              <FormTextarea
                label="How do you handle pressure and tight deadlines?"
                name="pressure"
                placeholder="Share your experience with handling pressure"
                value={formData.pressure}
                onChange={(value) => handleInputChange("pressure", value)}
                error={errors.pressure}
              />
            </div>

            {/* Cover Letter */}
            <div>
              <FormTextarea
                label="Cover Letter"
                name="coverLetter"
                placeholder="Write your cover letter here"
                value={formData.coverLetter}
                onChange={(value) => handleInputChange("coverLetter", value)}
                error={errors.coverLetter}
                rows={8}
              />
            </div>

            {/* CV Upload */}
            <div>
              <label className="font-['Space_Mono',sans-serif] font-bold text-[13px] leading-none text-[rgba(255,255,255,0.9)] uppercase mb-3 block">
                Upload CV (Optional - PDF only, max 3MB)
              </label>
              <UploadCVButton
                onFileSelect={handleFileSelect}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#2176bb] hover:bg-[#1a5f99] disabled:bg-gray-400 text-white font-['DM_Sans',sans-serif] font-bold text-[16px] py-4 px-6 rounded-lg transition-colors duration-200"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>

        {/* Desktop Layout (hidden on mobile/tablet) */}
        <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start relative pt-40 pl-44">
            {/* Left Column - Form */}
            <div className="w-full lg:max-w-[600px] relative">
              {/* Back Button positioned at the left */}
              <div className="absolute -left-96 -top-14">
                <BackButton />
              </div>

              {/* Form Header */}
              <div className="flex flex-col gap-[10px] mb-10">
                <h1 className="font-['Chillax_Variable',sans-serif] font-semibold text-[48px] leading-[0.95] bg-gradient-to-b from-[#f9f9f9] to-[#a6b5c0] bg-clip-text text-transparent">
                  {job.title}
                </h1>
                <div className="inline-flex bg-[#2176bb] px-[5px] py-[3px] rounded-[4px] self-start">
                  <p className="font-['Space_Mono',sans-serif] font-bold text-[13px] leading-none text-white uppercase">
                    {job.category}
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Submit Error */}
                {submitError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    <span className="block sm:inline">{submitError}</span>
                  </div>
                )}

                <FormInput
                  label="Name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(value) => handleInputChange("name", value)}
                  error={errors.name}
                />

                <FormInput
                  label="Email"
                  name="email"
                  placeholder="Your email"
                  type="email"
                  value={formData.email}
                  onChange={(value) => handleInputChange("email", value)}
                  error={errors.email}
                />

                <FormTextarea
                  label="Why are you interested in joining Bam's?"
                  name="interest"
                  placeholder="Tell us why you want to join our team"
                  value={formData.interest}
                  onChange={(value) => handleInputChange("interest", value)}
                  error={errors.interest}
                />

                <FormTextarea
                  label="How do you handle pressure and tight deadlines?"
                  name="pressure"
                  placeholder="Share your experience with handling pressure"
                  value={formData.pressure}
                  onChange={(value) => handleInputChange("pressure", value)}
                  error={errors.pressure}
                />

                <FormTextarea
                  label="Cover Letter"
                  name="coverLetter"
                  placeholder="Write your cover letter here"
                  value={formData.coverLetter}
                  onChange={(value) => handleInputChange("coverLetter", value)}
                  error={errors.coverLetter}
                  rows={8}
                />

                <div>
                  <label className="font-['Space_Mono',sans-serif] font-bold text-[13px] leading-none text-[rgba(255,255,255,0.9)] uppercase mb-3 block">
                    Upload CV (Optional - PDF only, max 3MB)
                  </label>
                  <UploadCVButton
                    onFileSelect={handleFileSelect}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2176bb] hover:bg-[#1a5f99] disabled:bg-gray-400 text-white font-['DM_Sans',sans-serif] font-bold text-[18px] py-4 px-6 rounded-lg transition-colors duration-200"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </form>
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
