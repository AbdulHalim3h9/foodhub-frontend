import { Navbar1 } from "@/components/layout/navbar";
import { Footer2 } from "@/components/layout/footer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  console.log("this is the token", token);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar1 />
      <main className="flex-grow pt-20">{children}</main>
      <Footer2 />
    </div>
  );
}
