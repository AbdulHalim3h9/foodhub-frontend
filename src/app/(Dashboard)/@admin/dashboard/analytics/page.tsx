"use client";

import { useState } from "react";
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  BarChart3,
  Download,
  ArrowUpRight,
  Eye,
  Clock,
  Activity,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data
const revenueData = [
  { month: "Jan", revenue: 2800, orders: 120 },
  { month: "Feb", revenue: 3200, orders: 145 },
  { month: "Mar", revenue: 2950, orders: 132 },
  { month: "Apr", revenue: 3800, orders: 168 },
  { month: "May", revenue: 4200, orders: 190 },
  { month: "Jun", revenue: 4800, orders: 210 },
];

const topDishes = [
  { name: "Margherita Pizza", orders: 89, revenue: 2225, rating: 4.8 },
  { name: "Chicken Pad Thai", orders: 76, revenue: 1139, rating: 4.7 },
  { name: "Classic Burger", orders: 124, revenue: 1364, rating: 4.5 },
  { name: "Caesar Salad", orders: 58, revenue: 522, rating: 4.2 },
];

export default function AdminAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("30days");

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            System Analytics
          </h1>
          <p className="text-sm text-muted-foreground">
            Comprehensive insights into platform performance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40 bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>

          <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm">
            <Download className="size-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value="$12,750"
          change="+18.2%"
          icon={<DollarSign className="size-4 text-orange-600" />}
          trend="up"
        />
        <KPICard
          title="Total Orders"
          value="565"
          change="+15.3%"
          icon={<ShoppingCart className="size-4 text-blue-600" />}
          trend="up"
        />
        <KPICard
          title="Active Users"
          value="1,010"
          change="+8.7%"
          icon={<Users className="size-4 text-green-600" />}
          trend="up"
        />
        <KPICard
          title="Avg. Order Value"
          value="$22.57"
          change="+3.2%"
          icon={<BarChart3 className="size-4 text-purple-600" />}
          trend="up"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Revenue Chart */}
        <Card className="lg:col-span-2 border-none shadow-md">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Monthly revenue performance for the current year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-end justify-between gap-4 pt-8">
              {revenueData.map((data, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center gap-2 group"
                >
                  <div className="relative w-full max-w-[60px] flex items-end justify-center h-full bg-orange-50/50 rounded-t-lg overflow-hidden">
                    <div
                      className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-500 rounded-t-md"
                      style={{ height: `${(data.revenue / 5000) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">
                    {data.month}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Top Dishes</CardTitle>
            <CardDescription>Best selling items by revenue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {topDishes.map((dish, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">
                      {dish.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {dish.orders} orders
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">
                    ${dish.revenue.toLocaleString()}
                  </p>
                  <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                    <Star className="size-3 text-yellow-500 fill-yellow-500" />{" "}
                    {dish.rating}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricBox
          label="Avg Response Time"
          value="1.2s"
          icon={<Clock className="size-5 text-blue-500" />}
        />
        <MetricBox
          label="System Uptime"
          value="99.9%"
          icon={<Activity className="size-5 text-green-500" />}
        />
        <MetricBox
          label="Conversion Rate"
          value="3.4%"
          icon={<TrendingUp className="size-5 text-purple-500" />}
        />
        <MetricBox
          label="Customer Satisfaction"
          value="4.8/5"
          icon={<Star className="size-5 text-yellow-500 fill-yellow-500" />}
        />
      </div>
    </div>
  );
}

function KPICard({
  title,
  value,
  change,
  icon,
  trend,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: "up" | "down";
}) {
  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="p-2 bg-muted/50 rounded-full">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1 flex items-center">
          {trend === "up" ? (
            <ArrowUpRight className="size-3 text-green-500 mr-1" />
          ) : (
            <div className="size-3 bg-red-500 mr-1" />
          )}
          <span
            className={
              trend === "up"
                ? "text-green-600 font-medium"
                : "text-red-600 font-medium"
            }
          >
            {change}
          </span>
          <span className="ml-1 text-muted-foreground">from last month</span>
        </p>
      </CardContent>
    </Card>
  );
}

function MetricBox({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="border-none shadow-sm flex items-center p-4 gap-4">
      <div className="p-3 bg-muted/40 rounded-xl">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </Card>
  );
}
