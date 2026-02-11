import { cn } from "@/lib/utils";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface FooterProps {
  className?: string;
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer = ({
  className,
  tagline = "Delicious meals delivered to your doorstep. Fresh, fast, and always satisfying.",
  menuItems = [
    {
      title: "Quick Links",
      links: [
        { text: "Browse Meals", url: "/browse" },
        { text: "About Us", url: "/about" },
        { text: "Contact", url: "/contact" },
        { text: "How it Works", url: "#" },
      ],
    },
    {
      title: "For Customers",
      links: [
        { text: "My Orders", url: "#" },
        { text: "Track Order", url: "#" },
        { text: "Customer Support", url: "#" },
        { text: "Payment Options", url: "#" },
      ],
    },
    {
      title: "For Providers",
      links: [
        { text: "Join as Provider", url: "/signup" },
        { text: "Provider Login", url: "/login" },
        { text: "Provider Dashboard", url: "#" },
        { text: "Provider Resources", url: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About FoodHub", url: "/about" },
        { text: "Careers", url: "#" },
        { text: "Press", url: "#" },
        { text: "Blog", url: "#" },
      ],
    },
  ],
  copyright = "© 2024 FoodHub. All rights reserved.",
  bottomLinks = [
    { text: "Terms of Service", url: "#" },
    { text: "Privacy Policy", url: "#" },
    { text: "Cookie Policy", url: "#" },
  ],
}: FooterProps) => {
  return (
    <footer className={cn("bg-gray-900 text-gray-300", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Brand Section - Takes up more space */}
            <div className="lg:col-span-4">
              {/* Logo */}
              <div className="flex items-center">
                <span className="text-2xl font-bold text-orange-500 tracking-tight">
                  FoodHub
                </span>
              </div>
              
              {/* Tagline */}
              <p className="mt-4 text-gray-400 leading-relaxed max-w-sm">
                {tagline}
              </p>
              
              {/* Quick Stats/Features */}
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-orange-400">
                  <span className="text-2xl">🍕</span>
                  <span className="text-sm font-medium">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-orange-400">
                  <span className="text-2xl">⭐</span>
                  <span className="text-sm font-medium">Top Rated</span>
                </div>
                <div className="flex items-center gap-2 text-orange-400">
                  <span className="text-2xl">🛡️</span>
                  <span className="text-sm font-medium">Secure</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Mail className="size-4 text-orange-500 shrink-0" />
                  <a href="mailto:support@foodhub.com" className="hover:text-orange-400 transition-colors">
                    support@foodhub.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Phone className="size-4 text-orange-500 shrink-0" />
                  <a href="tel:+1234567890" className="hover:text-orange-400 transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-400">
                  <MapPin className="size-4 text-orange-500 shrink-0 mt-0.5" />
                  <span>123 Food Street, Culinary District, NY 10001</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-white mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  <a 
                    href="#" 
                    className="flex items-center justify-center size-10 rounded-full bg-gray-800 text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-200"
                    aria-label="Facebook"
                  >
                    <Facebook className="size-4" />
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center justify-center size-10 rounded-full bg-gray-800 text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-200"
                    aria-label="Twitter"
                  >
                    <Twitter className="size-4" />
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center justify-center size-10 rounded-full bg-gray-800 text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-200"
                    aria-label="Instagram"
                  >
                    <Instagram className="size-4" />
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center justify-center size-10 rounded-full bg-gray-800 text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-200"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="size-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Links Sections - Evenly distributed */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                {menuItems.map((section, sectionIdx) => (
                  <div key={sectionIdx}>
                    <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.links.map((link, linkIdx) => (
                        <li key={linkIdx}>
                          <a 
                            href={link.url}
                            className="text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200 inline-block"
                          >
                            {link.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section (Optional) */}
        <div className="border-t border-gray-800 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Stay updated with our latest offers
              </h3>
              <p className="text-sm text-gray-400">
                Subscribe to our newsletter and never miss a deal!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              <button className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              {copyright}
            </p>
            <ul className="flex flex-wrap justify-center gap-6 text-sm">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <a 
                    href={link.url}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer as Footer2 };