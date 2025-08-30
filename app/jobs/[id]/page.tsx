import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import ApplyButton from "./ApplyButton";

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: jobId } = await params;

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: { postedBy: true },
  });

  if (!job) notFound();

  const { title, company, location, type, salary, postedBy, postedAt, description } = job;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 flex flex-col gap-6">
        <Link href="/jobs" className="text-indigo-600 hover:text-indigo-700 font-medium">
          ← Back to Jobs
        </Link>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
            <p className="text-lg sm:text-xl text-gray-600">{company}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-gray-500 text-sm sm:text-base">
            <span>{location}</span>
            <span>•</span>
            <span>{type}</span>
            {salary && (
              <>
                <span>•</span>
                <span className="text-gray-900 font-medium">${salary}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-gray-500 text-sm">
          <span>Posted by {postedBy.name}</span>
          <span>•</span>
          <span>{formatDistanceToNow(new Date(postedAt), { addSuffix: true })}</span>
        </div>

        <div className="prose max-w-none text-gray-600 whitespace-pre-wrap">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Job Description</h2>
          {description}
        </div>

        <div className="mt-4 sm:mt-6 border-t border-gray-200 pt-4">
          <ApplyButton jobId={jobId} />
        </div>
      </div>
    </div>
  );
}
