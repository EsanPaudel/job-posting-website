"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { logout } from "@/lib/auth";
import { FilePlus2, LayoutDashboard, LogOut, LogIn } from "lucide-react";

const navItems = [
  { title: "Post a Job", href: "/jobs/post", icon: <FilePlus2 /> },
  { title: "Dashboard", href: "/dashboard", icon: <LayoutDashboard /> },
];

export default function Navbar() {
  const { data: session } = useSession();
  const linkClass =
    "flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium";

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Job Board Logo"
              width={40}
              height={40}
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-semibold text-gray-900 hidden sm:inline">
              Job Board
            </span>
          </Link>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {session ? (
              <>
                {navItems.map(({ href, title, icon }) => (
                  <Link key={href} href={href} className={linkClass}>
                    {icon}
                    <span className="ml-1 hidden sm:inline">{title}</span>
                  </Link>
                ))}
                <button onClick={logout} className={linkClass}>
                  <LogOut />
                  <span className="ml-1 hidden sm:inline">Sign Out</span>
                </button>
              </>
            ) : (
              <Link href="/auth/signin" className={linkClass}>
                <LogIn />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
