"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { SearchIcon } from "@heroicons/react/solid";

interface Job {
  _id: string;
  title: string;
  description: string;
  requirements: string;
  salary: string;
  location: string;
}

export default function JobListing() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (search: string = "") => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `/api/jobs${search ? `?search=${search}` : ""}`,
        {
          headers: { Authorization: token },
        }
      );
      setJobs(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("An error occurred while fetching jobs");
    }
  };

  const debouncedSearch = debounce(async (term: string) => {
    fetchJobs(term);
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <div className="space-y-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
            <p className="mt-2 text-sm text-gray-500">{job.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                {job.location}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {job.salary}
              </span>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900">
                Requirements:
              </h4>
              <p className="mt-1 text-sm text-gray-500">{job.requirements}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function debounce<F extends (...args: any[]) => any>(
  func: F,
  wait: number
): (...args: Parameters<F>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<F>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
