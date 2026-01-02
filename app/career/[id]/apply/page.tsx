// Application Form Page
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import ApplicationFormBackground from "@/components/ApplicationFormBackground";
import BackButton from "@/components/BackButton";
import FormInput from "@/components/FormInput";
import FormTextarea from "@/components/FormTextarea";
import UploadCVButton from "@/components/UploadCVButton";
import JobDetailsCard from "@/components/JobDetailsCard";
import Image from "next/image";

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
    },
    "2": {
      id: "2",
      title: "Office Staff",
      category: "Office",
      workingHours: "9am - 5pm",
      contract: "No",
      salary: "Negotiate",
      closeDate: "18 Dec 2025",
    },
    "3": {
      id: "3",
      title: "Office Staff",
      category: "Office",
      workingHours: "9am - 5pm",
      contract: "No",
      salary: "Negotiate",
      closeDate: "18 Dec 2025",
    },
  };

  return jobs[id] || jobs["1"];
};

export default function ApplicationFormPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = (params?.id as string) || "1";
  const job = getJobById(jobId);

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
    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setSubmitError("File size must be less than 5MB");
      return;
    }
    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      setSubmitError("Please upload a PDF or Word document");
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
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("interest", formData.interest);
      submitData.append("pressure", formData.pressure);
      submitData.append("coverLetter", formData.coverLetter);
      submitData.append("jobId", jobId);
      if (cvFile) {
        submitData.append("cv", cvFile);
      }

      // TODO: Replace with actual API call
      // const response = await fetch('/api/career/apply', {
      //   method: 'POST',
      //   body: submitData,
      // });
      // if (!response.ok) throw new Error('Submission failed');

      console.log("Form submitted:", { ...formData, cvFile, jobId });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to success page or show success message
      router.push(`/career/${jobId}?success=true`);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to submit application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!job) {
    router.push("/career");
    return null;
  }

  return (
    <ApplicationFormBackground>
      <div className="min-h-screen w-full">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          {/* Back Button */}
          <div className="mb-6 sm:mb-8">
            <BackButton />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start relative">
            {/* Left Column - Application Form */}
            <div className="w-full lg:max-w-[600px]">
              <form onSubmit={handleSubmit} className="content-stretch flex flex-col gap-[65px] items-start w-full">
                {/* Title and Instruction */}
                <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
                  <p
                    className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] from-[#f9f9f9] leading-none min-w-full not-italic relative shrink-0 text-[32px] sm:text-[36px] md:text-[40px] to-[#a6b5c0] tracking-[-0.8px] w-[min-content]"
                    style={{ WebkitTextFillColor: "transparent" }}
                  >
                    {job.title} Application Form
                  </p>
                  <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[12px] sm:text-[13px] md:text-[14px] text-[rgba(255,255,255,0.55)] text-nowrap">
                    Please fill in all forms.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
                  <FormInput
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    required
                    value={formData.name}
                    onChange={(value) => handleInputChange("name", value)}
                    error={errors.name}
                  />

                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={(value) => handleInputChange("email", value)}
                    error={errors.email}
                  />

                  <FormTextarea
                    label="Why are you interested in joining BamBite?"
                    name="interest"
                    placeholder="Your respond"
                    rows={5}
                    value={formData.interest}
                    onChange={(value) => handleInputChange("interest", value)}
                    error={errors.interest}
                  />

                  <FormTextarea
                    label="How do you handle multiple tasks or work under pressure?"
                    name="pressure"
                    placeholder="Your respond"
                    rows={5}
                    value={formData.pressure}
                    onChange={(value) => handleInputChange("pressure", value)}
                    error={errors.pressure}
                  />

                  <FormTextarea
                    label="Cover Letter"
                    name="coverLetter"
                    placeholder="Write cover letter here"
                    rows={5}
                    value={formData.coverLetter}
                    onChange={(value) => handleInputChange("coverLetter", value)}
                    error={errors.coverLetter}
                  />

                  {/* Upload CV Button */}
                  <UploadCVButton onFileSelect={handleFileSelect} />
                  {cvFile && (
                    <p className="text-sm text-green-400">
                      CV uploaded: {cvFile.name}
                    </p>
                  )}
                </div>

                {/* Error Message */}
                {submitError && (
                  <div className="bg-red-500/20 border border-red-500 rounded-lg p-4">
                    <p className="text-red-400 text-sm">{submitError}</p>
                  </div>
                )}

                {/* Apply Now Button */}
                <div className="w-full">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-b border border-[#193551] border-solid content-stretch flex from-[#074980] h-[58px] items-center relative to-[#172743] overflow-hidden rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Submit application"
                  >
                    {/* Texture overlays */}
                    <div className="absolute contents inset-[-0.5px_calc(-0.08%-0.5px)_calc(0%-0.5px)_-0.5px]">
                      <div className="absolute inset-[0_-0.08%_0_0.57%] mix-blend-overlay opacity-30">
                        <Image
                          src="/product-assets/metal-overlay.webp"
                          alt=""
                          fill
                          sizes="600px"
                          className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                        />
                      </div>
                      <div className="absolute flex inset-[0_-0.08%_0_0] items-center justify-center mix-blend-lighten">
                        <div className="flex-none h-[58px] scale-y-[-100%] w-full">
                          <div className="opacity-[0.34] relative size-full">
                            <Image
                              src="/product-assets/grunge-overlay.webp"
                              alt=""
                              fill
                              sizes="600px"
                              className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="absolute flex inset-[0_-0.08%_0_0] items-center justify-center mix-blend-soft-light">
                        <div className="flex-none h-[58px] rotate-[180deg] scale-y-[-100%] w-full">
                          <div
                            className="opacity-30 size-full"
                            style={{
                              backgroundImage:
                                "linear-gradient(rgba(128, 128, 128, 0.6) 0%, rgb(128, 128, 128) 19.684%, rgba(128, 128, 128, 0.3) 70.46%, rgb(128, 128, 128) 100%)",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Button Content */}
                    <div className="basis-0 content-stretch flex gap-[24px] grow h-[58px] items-center min-h-px min-w-px pl-[12px] pr-[20px] py-0 relative shrink-0 z-10">
                      <div className="basis-0 flex grow items-center justify-center min-h-px min-w-px relative shrink-0">
                        <div className="flex-none rotate-[180deg] w-full">
                          <div className="content-stretch flex gap-[16px] items-center relative w-full">
                            <p className="font-['Space_Mono',sans-serif] font-bold leading-none not-italic relative shrink-0 text-[11px] sm:text-[12px] md:text-[12.583px] text-[rgba(255,255,255,0.9)] text-nowrap uppercase">
                              {isSubmitting ? "Submitting..." : "Apply Now"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-[-0.5px] pointer-events-none shadow-[inset_3.77px_3.77px_1.153px_0px_rgba(226,239,255,0.12)]" />
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column - Job Details Card */}
            <div className="w-full lg:relative lg:max-w-[298px] lg:ml-auto">
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
    </ApplicationFormBackground>
  );
}

