"use client";

import * as React from "react";
import { Sidebar1 } from "@/components/layout/sidebar";
import { getUser } from "@/services/auth/auth.service";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  admin,
  customer,
  provider,
}: {
  admin: React.ReactNode;
  customer: React.ReactNode;
  provider: React.ReactNode;
}) {
  const [session, setSession] = React.useState<any>(null);
  const [isPending, setIsPending] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const fetchSession = async () => {
      setIsPending(true);
      try {
        const user = await getUser();
        if (user) {
          setSession({ user });
          // Redirect customers away from dashboard to browse
          if ((user as any).role === "CUSTOMER") {
            router.replace("/browse");
          }
        } else {
          setSession(null);
          router.replace("/login");
        }
      } catch (error) {
        console.error("Failed to fetch session:", error);
      } finally {
        setIsPending(false);
      }
    };
    fetchSession();
  }, [router]);

  // Show loading while session is being fetched
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Redirect if not authenticated (handled in useEffect, but this is a safety guard)
  if (!session?.user) {
    return null;
  }

  return (
    <Sidebar1
      type={(session?.user as any)?.role as "ADMIN" | "CUSTOMER" | "PROVIDER"}
    >
      {(session?.user as any)?.role === "ADMIN" && admin}
      {(session?.user as any)?.role === "PROVIDER" && provider}
    </Sidebar1>
  );
}
