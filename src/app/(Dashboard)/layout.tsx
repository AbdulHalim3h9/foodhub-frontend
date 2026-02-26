"use client";
import { Sidebar1 } from "@/components/layout/sidebar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  admin,
  customer,
  provider,
}: {
  admin: React.ReactNode;
  customer: React.ReactNode;
  provider: React.ReactNode;
}) {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect customers away from dashboard to browse
    if ((session?.user as any)?.role === "CUSTOMER") {
      router.replace("/browse");
    }
  }, [session, router]);

  // Show loading or redirect for customers
  if ((session?.user as any)?.role === "CUSTOMER") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <Sidebar1 type={(session?.user as any)?.role as "ADMIN" | "CUSTOMER" | "PROVIDER"}>
      {(session?.user as any)?.role === "ADMIN" && admin}
      {(session?.user as any)?.role === "PROVIDER" && provider}
    </Sidebar1>
  );
}
