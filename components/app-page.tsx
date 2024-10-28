"use client";

import JobListing from "./job-listing";
import JobPostingForm from "./job-posting-form";

export function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          Find Your <span className="text-indigo-600">Dream Job</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Discover exciting opportunities or post your job openings on
          TrendyJobs - the modern way to connect talent with great companies.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Post a New Job
          </h2>
          <JobPostingForm />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Job Listings
          </h2>
          <JobListing />
        </div>
      </div>
    </div>
  );
}
