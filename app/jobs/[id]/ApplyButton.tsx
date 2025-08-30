"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ApplyButton({ jobId }: { jobId: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isApplying, setIsApplying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [applicationStatus, setApplicationStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleApply = async () => {
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    setIsApplying(true);
    setErrorMessage("");
    setApplicationStatus("idle");

    try {
      const response = await fetch(`/api/jobs/${jobId}/apply`, {
        method: "POST",
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to apply for the job");
      }

      setApplicationStatus("success");
    } catch (error) {
      setApplicationStatus("error");
      if (error instanceof Error) setErrorMessage(error.message);
      else setErrorMessage("Failed to apply for the job");
    } finally {
      setIsApplying(false);
    }
  };

  // Loading state while session is being fetched
  if (status === "loading") {
    return (
      <button
        disabled
        className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md opacity-50 cursor-not-allowed"
      >
        Loading...
      </button>
    );
  }

  // Success message
  if (applicationStatus === "success") {
    return (
      <div className="text-center">
        <p className="text-green-600 font-medium mb-4">
          Application submitted successfully!
        </p>
        <Link
          href="/dashboard"
          className="text-indigo-600 hover:text-indigo-700 font-medium"
        >
          View your applications →
        </Link>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={handleApply}
        disabled={isApplying}
        className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isApplying ? "Applying..." : "Apply for this position"}
      </button>

      {applicationStatus === "error" && errorMessage && (
        <p className="mt-2 text-red-600 text-center">{errorMessage}</p>
      )}
    </>
  );
}
