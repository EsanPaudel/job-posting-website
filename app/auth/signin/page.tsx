// app/auth/signin/page.tsx

import {login} from "@/lib/auth"
export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-2 text-gray-500">Welcome to JobList</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Sign in to post jobs or apply for opportunities
        </p>

        {/* GitHub Button */}
        <button onClick={login}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.87 10.93c.58.1.79-.25.79-.56v-2.02c-3.2.7-3.87-1.54-3.87-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.05 1.78 2.76 1.27 3.43.97.1-.76.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.19-3.11-.12-.29-.52-1.45.11-3.03 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.74.11 3.03.74.81 1.19 1.85 1.19 3.11 0 4.43-2.69 5.41-5.25 5.7.42.36.8 1.07.8 2.16v3.2c0 .31.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
              clipRule="evenodd"
            />
          </svg>
          Continue with GitHub
        </button>

        {/* Terms */}
        <p className="text-xs text-gray-500 mt-4">
          By signing in, you agree to our{" "}
          <a href="/terms" className="text-indigo-600 underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-indigo-600 underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
