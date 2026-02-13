import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Utensils, Zap, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-orange-50 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge
              variant="outline"
              className="mb-4 bg-white/50 backdrop-blur-sm border-orange-200 text-orange-700"
            >
              Our Mission
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              Connecting People with{" "}
              <span className="text-primary">Great Food</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              FoodHub is more than just a delivery service. We're a community
              platform bridging the gap between passionate local chefs and
              hungry food lovers, delivering happiness one meal at a time.
            </p>
          </div>
        </div>
        {/* Decorative background elements if needed */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why We Do What We Do
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our core values guide every decision we make, ensuring the best
              experience for our customers, partners, and community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-gray-50">
              <CardContent className="pt-8 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Utensils className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Quality First</h3>
                <p className="text-gray-600">
                  We verify every provider to ensure only the highest quality,
                  most delicious meals make it to your table.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-gray-50">
              <CardContent className="pt-8 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
                <p className="text-gray-600">
                  Our optimized delivery network ensures your food arrives hot
                  and fresh, exactly when you expect it.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-gray-50">
              <CardContent className="pt-8 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Community Focused</h3>
                <p className="text-gray-600">
                  We support local businesses and create fair opportunities for
                  drivers and restaurant partners.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
                500+
              </div>
              <div className="text-gray-400">Restaurant Partners</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
                10k+
              </div>
              <div className="text-gray-400">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
                50k+
              </div>
              <div className="text-gray-400">Orders Delivered</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
                4.9
              </div>
              <div className="text-gray-400">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to taste the difference?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Join thousands of satisfied customers and start exploring the best
            local food today.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 h-12 px-8"
            >
              Order Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 border-orange-200 text-orange-700 hover:bg-orange-100"
            >
              Become a Partner
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
