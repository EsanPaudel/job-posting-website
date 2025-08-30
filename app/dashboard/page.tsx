import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/signin");

  const [applications, postedJobs] = await Promise.all([
    prisma.application.findMany({
      where: { userId: session.user.id },
      include: { job: { include: { postedBy: true } } },
      orderBy: { appliedAt: "desc" },
    }),
    prisma.job.findMany({
      where: { postedById: session.user.id },
      include: { _count: { select: { applications: true } } },
      orderBy: { postedAt: "desc" },
    }),
  ]);

  const Card = ({
    title,
    company,
    location,
    type,
    time,
    badge,
    href,
  }: {
    title: string;
    company: string;
    location: string;
    type: string;
    time: string;
    badge?: { text: string; color: string };
    href: string;
  }) => (
    <div className="p-4 border border-gray-200 rounded-lg bg-white flex flex-col sm:flex-row sm:justify-between sm:items-start">
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="text-gray-600">{company}</p>
        <div className="flex flex-wrap items-center text-sm text-gray-500 mt-1 gap-x-2 gap-y-1">
          <span>{location}</span>
          <span>•</span>
          <span>{type}</span>
          <span>•</span>
          <span>{time}</span>
        </div>
      </div>
      {badge && (
        <span
          className={`mt-2 sm:mt-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}
        >
          {badge.text}
        </span>
      )}
      <div className="mt-3 sm:mt-4 sm:text-right">
        <Link href={href} className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          View Job
        </Link>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <div className="flex flex-col md:flex-row md:gap-8">
        {/* Posted Jobs */}
        <div className="flex-1 mb-8 md:mb-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Posted Jobs</h2>
            <Link href="/jobs/post" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Post New Job
            </Link>
          </div>
          <div className="space-y-4">
            {postedJobs.length === 0 ? (
              <p className="p-6 text-gray-500 text-center">You haven't posted any jobs yet.</p>
            ) : (
              postedJobs.map((job) => (
                <Card
                  key={job.id}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  type={job.type}
                  time={formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
                  badge={{ text: `${job._count.applications} applications`, color: "bg-indigo-100 text-indigo-800" }}
                  href={`/jobs/${job.id}`}
                />
              ))
            )}
          </div>
        </div>

        {/* Applications */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Applications</h2>
          <div className="space-y-4">
            {applications.length === 0 ? (
              <p className="p-6 text-gray-500 text-center">You haven't applied to any jobs yet.</p>
            ) : (
              applications.map((app) => {
                const statusColors =
                  app.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-800"
                    : app.status === "ACCEPTED"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800";

                return (
                  <Card
                    key={app.id}
                    title={app.job.title}
                    company={app.job.company}
                    location={app.job.location}
                    type={app.job.type}
                    time={`Applied ${formatDistanceToNow(new Date(app.appliedAt), { addSuffix: true })}`}
                    badge={{ text: app.status, color: statusColors }}
                    href={`/jobs/${app.job.id}`}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
