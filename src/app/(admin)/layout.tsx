import { Sidebar1 } from "@/components/layout/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Sidebar1 type="admin">{children}</Sidebar1>;
}
