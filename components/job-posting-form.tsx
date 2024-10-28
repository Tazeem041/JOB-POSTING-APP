"use client";

import React, { useState } from "react";
import axios from "axios";

interface JobPosting {
  title: string;
  description: string;
  requirements: string;
  salary: string;
  location: string;
}

export default function JobPostingForm() {
  const [jobPosting, setJobPosting] = useState<JobPosting>({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJobPosting((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("/api/jobs", jobPosting, {
        headers: { Authorization: token },
      });
      setSuccess(true);
      setError("");
      setJobPosting({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
      });
    } catch (error) {
      console.error("Error posting job:", error);
      setError("An error occurred while posting the job");
      setSuccess(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white shadow-sm rounded-lg p-6"
    >
      {success && (
        <div className="text-green-500 text-sm text-center">
          Job posted successfully!
        </div>
      )}
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Job Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={jobPosting.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={jobPosting.description}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
      </div>
      <div>
        <label
          htmlFor="requirements"
          className="block text-sm font-medium text-gray-700"
        >
          Requirements
        </label>
        <input
          type="text"
          id="requirements"
          name="requirements"
          value={jobPosting.requirements}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          htmlFor="salary"
          className="block text-sm font-medium text-gray-700"
        >
          Salary
        </label>
        <input
          type="text"
          id="salary"
          name="salary"
          value={jobPosting.salary}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={jobPosting.location}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Post Job
      </button>
    </form>
  );
}
