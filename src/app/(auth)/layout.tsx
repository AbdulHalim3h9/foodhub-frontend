import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Branding/Image */}
      <div className="hidden lg:flex flex-col justify-between bg-primary p-12 text-primary-foreground relative overflow-hidden">
        <div className="relative z-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold tracking-tight mb-8 hover:opacity-90"
          >
            <ArrowLeft className="size-5" /> Back to Home
          </Link>
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            Experience the <br /> FoodHub Magic
          </h1>
          <p className="text-xl opacity-90">
            Join thousands of food lovers and get your favorite meals delivered
            in minutes.
          </p>
        </div>

        {/* Decorative Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/food.png')] opacity-10"></div>

        {/* Bottom Testimonial */}
        <div className="relative z-10 bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
          <p className="italic text-lg mb-4">
            "FoodHub changed the way I order food. The delivery is super fast
            and the quality is amazing!"
          </p>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-white/20"></div>
            <div>
              <p className="font-bold">Sarah Jenkins</p>
              <p className="text-sm opacity-80">Food Blogger</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex items-center justify-center p-8 bg-gray-50/50">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
