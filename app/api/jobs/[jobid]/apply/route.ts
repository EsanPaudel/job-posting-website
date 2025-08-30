import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,context: { params: { jobid: string } }
) {

  try {
    // Get current user session
    const session = await auth();

    if (!session?.user?.id) {
      // Instead of redirecting, return 401 for API
      return new NextResponse("Unauthorized", { status: 401 });
    }
     const { params } = await context;

    const jobId  = params.jobid;

    // Check if the job exists
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      return new NextResponse("Job not found", { status: 404 });
    }

    // Check if the user already applied
    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId,
        userId: session.user.id,
      },
    });

    if (existingApplication) {
      return new NextResponse("You already applied for this job", {
        status: 400,
      });
    }

    // Create new application
    const application = await prisma.application.create({
      data: {
        jobId,
        userId: session.user.id,
        status: "PENDING",
      },
    });

    return NextResponse.json(application);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
