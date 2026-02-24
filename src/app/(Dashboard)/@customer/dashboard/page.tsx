import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, ShoppingBag, Star, ArrowRight } from "lucide-react";

export default function CustomerDashboard() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening given your recent activities.
        </p>
      </div>

      {/* Stats / Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <ShoppingBag className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Arriving in 15 mins</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Clock className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorites</CardTitle>
            <Star className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Saved restaurants</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reward Points</CardTitle>
            <Star className="size-4 text-yellow-500 fill-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">
              Redeemable for discounts
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Orders - Takes up 4 columns */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>You made 24 orders this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                {
                  restaurant: "Burger King",
                  date: "Today, 12:30 PM",
                  price: "$24.50",
                  status: "In Transit",
                  color: "text-blue-500",
                },
                {
                  restaurant: "Pizza Hut",
                  date: "Yesterday, 8:15 PM",
                  price: "$32.00",
                  status: "Delivered",
                  color: "text-green-500",
                },
                {
                  restaurant: "Subway",
                  date: "Oct 22, 1:00 PM",
                  price: "$12.99",
                  status: "Delivered",
                  color: "text-green-500",
                },
                {
                  restaurant: "KFC",
                  date: "Oct 20, 7:45 PM",
                  price: "$45.00",
                  status: "Delivered",
                  color: "text-green-500",
                },
              ].map((order, i) => (
                <div key={i} className="flex items-center">
                  <div className="ml-4 space-y-1 flex-1">
                    <p className="text-sm font-medium leading-none">
                      {order.restaurant}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.date}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">{order.price}</div>
                  <div className={`ml-4 text-xs ${order.color}`}>
                    {order.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trending / Favorites - Takes up 3 columns */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Trending Near You</CardTitle>
            <CardDescription>
              Top rated by customers in your area.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Spicy Ramen", place: "Tokyo House", rating: 4.9 },
                {
                  name: "Double Cheeseburger",
                  place: "Burger Joint",
                  rating: 4.8,
                },
                { name: "Margherita Pizza", place: "Mama Mia", rating: 4.7 },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 hover:bg-muted rounded-lg transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-md group-hover:bg-primary/20 transition-colors">
                      <Star className="size-4 text-primary fill-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.place}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
