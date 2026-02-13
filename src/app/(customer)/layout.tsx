import { Sidebar1 } from "@/components/layout/sidebar";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Sidebar1 type="customer">{children}</Sidebar1>;
}
