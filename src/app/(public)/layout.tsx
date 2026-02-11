import Link from "next/link";
import { Navbar1 } from "@/components/layout/navbar";
import { Footer2 } from "@/components/layout/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar1
        menu={[
          { title: "Home", url: "/" },
          { title: "Browse", url: "/browse" },
          { title: "About", url: "/about" },
          { title: "Contact", url: "/contact" },
        ]}
        auth={{
          login: { title: "Login", url: "/login" },
          signup: { title: "Register", url: "/signup" },
        }}
      />

      {/* Main Content */}
      <main className="flex-grow pt-16">
        {children}
      </main>

      {/* Footer */}
      <Footer2
        tagline="Discover and order delicious meals from local providers."
        menuItems={[
          {
            title: "Quick Links",
            links: [
              { text: "Browse Meals", url: "/browse" },
              { text: "About Us", url: "/about" },
              { text: "Contact", url: "/contact" },
            ],
          },
          {
            title: "For Providers",
            links: [
              { text: "Join as Provider", url: "/signup" },
              { text: "Provider Login", url: "/login" },
              { text: "Resources", url: "#" },
            ],
          },
          {
            title: "Support",
            links: [
              { text: "Help Center", url: "#" },
              { text: "Privacy Policy", url: "#" },
              { text: "Terms of Service", url: "#" },
            ],
          },
          {
            title: "Company",
            links: [
              { text: "About", url: "/about" },
              { text: "Blog", url: "#" },
              { text: "Careers", url: "#" },
            ],
          },
        ]}
        copyright="© 2024 FoodHub. All rights reserved. Made with ❤️ for food lovers."
        bottomLinks={[
          { text: "Terms and Conditions", url: "#" },
          { text: "Privacy Policy", url: "#" },
        ]}
      />
    </div>
  );
}
