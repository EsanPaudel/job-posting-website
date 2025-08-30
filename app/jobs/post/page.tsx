"use client";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

const Jobs = () => {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Post a Job</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Job Title & Company side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input type="text" name="title" id="title" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <input type="text" name="company" id="company" required className={inputClass} />
          </div>
        </div>

        {/* Location & Job Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input type="text" name="location" id="location" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Job Type
            </label>
            <select name="type" id="type" required className={inputClass}>
              <option value="">Select a type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={6}
            required
            className={inputClass}
          />
        </div>

        {/* Salary */}
        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
            Salary (optional)
          </label>
          <input
            type="text"
            name="salary"
            id="salary"
            placeholder="e.g., $80,000 - $100,000"
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default Jobs;
