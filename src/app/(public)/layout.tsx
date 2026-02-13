import { Navbar1 } from "@/components/layout/navbar";
import { Footer2 } from "@/components/layout/footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar1 />
      <main className="flex-grow pt-20">{children}</main>
      <Footer2 />
    </div>
  );
}
