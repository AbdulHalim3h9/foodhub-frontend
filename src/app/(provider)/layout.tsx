import { Sidebar1 } from "@/components/layout/sidebar";

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Sidebar1 type="provider">{children}</Sidebar1>;
}
