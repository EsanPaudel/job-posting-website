import { prisma } from "@/lib/prisma";
import Link from "next/link";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { q, type, location } = await searchParams;

  const jobs = await prisma.job.findMany({
    where: {
      AND: [
        q
          ? {
              OR: [
                { title: { contains: q as string, mode: "insensitive" } },
                { company: { contains: q as string, mode: "insensitive" } },
                { description: { contains: q as string, mode: "insensitive" } },
              ],
            }
          : {},
        type ? { type: type as string } : {},
        location
          ? { location: { contains: location as string, mode: "insensitive" } }
          : {},
      ],
    },
    orderBy: { postedAt: "desc" },
    include: { postedBy: true },
  });

  const inputClass =
    "w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 sm:p-6">
      {/* Search Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Find Jobs</h1>
        <form className="grid gap-4 sm:grid-cols-3">
          <input type="text" name="q" placeholder="Search jobs..." className={inputClass} />
          <select name="type" className={inputClass}>
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          <input type="text" name="location" placeholder="Location" className={inputClass} />
          <button
            type="submit"
            className="sm:col-span-3 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Search
          </button>
        </form>
      </div>

      {/* Jobs Listing */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h2>
                <p className="text-gray-600 mb-2">{job.company}</p>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-2">
                  <span>{job.location}</span>
                  <span>•</span>
                  <span>{job.type}</span>
                </div>
                <p className="text-gray-600 line-clamp-3">{job.description}</p>
              </div>
              {job.salary && (
                <p className="text-lg font-semibold text-gray-900 mb-4">${job.salary}</p>
              )}
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">Posted by {job.postedBy.name}</span>
              <Link
                href={`/jobs/${job.id}`}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
