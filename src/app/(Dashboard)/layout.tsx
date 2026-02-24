"use client";
import { Sidebar1 } from "@/components/layout/sidebar";
import { authClient } from "@/lib/auth-client";

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
  return (
    <Sidebar1 type={session?.user.role as "ADMIN" | "CUSTOMER" | "PROVIDER"}>
      {session?.user.role === "ADMIN" && admin}
      {session?.user.role === "CUSTOMER" && customer}
      {session?.user.role === "PROVIDER" && provider}
    </Sidebar1>
  );
}
