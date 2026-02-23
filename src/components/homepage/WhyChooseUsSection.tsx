import { ChefHat, Truck, ShieldCheck, HeartPulse } from "lucide-react";

export function WhyChooseUsSection() {
  const features = [
    {
      icon: ChefHat,
      title: "Top Quality Meals",
      description:
        "We partner with the best local restaurants and chefs to ensure premium quality.",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Real-time tracking and efficient routing gets your food to you hot and fresh.",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payments",
      description:
        "Multiple payment options with bank-level security for your peace of mind.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: HeartPulse,
      title: "Healthy Options",
      description:
        "Easily find vegan, keto, and gluten-free meals tailored to your diet.",
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
  ];

  return (
    <section className="bg-white py-12 md:py-16 border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
            Why Choose FoodHub?
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            We're committed to providing the best delivery experience from start
            to finish
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 md:p-8 rounded-3xl bg-gray-50 border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center sm:text-left flex flex-col items-center sm:items-start group"
              >
                <div
                  className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`h-7 w-7 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2.5">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
