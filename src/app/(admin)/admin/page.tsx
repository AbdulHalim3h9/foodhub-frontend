"use client";

import { useState } from "react";
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  Star,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Calendar,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Mock data
const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    provider: "Mario's Pizza",
    amount: 45.99,
    status: "delivered",
    date: "2024-02-15",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    provider: "Bangkok Kitchen",
    amount: 32.5,
    status: "preparing",
    date: "2024-02-16",
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    provider: "Burger House",
    amount: 28.75,
    status: "out-for-delivery",
    date: "2024-02-17",
  },
  {
    id: "ORD-004",
    customer: "Alice Brown",
    provider: "Green Garden",
    amount: 15.5,
    status: "pending",
    date: "2024-02-18",
  },
];

const topProviders = [
  { name: "Mario's Pizza", orders: 245, revenue: 4850, rating: 4.8 },
  { name: "Bangkok Kitchen", orders: 189, revenue: 3200, rating: 4.7 },
  { name: "Burger House", orders: 312, revenue: 5200, rating: 4.5 },
  { name: "Green Garden", orders: 156, revenue: 2100, rating: 4.2 },
];

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("30days");

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of your FoodHub platform
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
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Calendar className="size-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value="$15,350"
          change="+20.1%"
          icon={<DollarSign className="size-4 text-orange-100" />}
          colorClass="bg-gradient-to-br from-orange-500 to-orange-600 text-white"
          trend="up"
        />
        <KPICard
          title="Total Orders"
          value="565"
          change="+15.3%"
          icon={<ShoppingCart className="size-4 text-blue-100" />}
          colorClass="bg-gradient-to-br from-blue-500 to-blue-600 text-white"
          trend="up"
        />
        <KPICard
          title="Active Users"
          value="1,234"
          change="+8.7%"
          icon={<Users className="size-4 text-green-100" />}
          colorClass="bg-gradient-to-br from-green-500 to-green-600 text-white"
          trend="up"
        />
        <KPICard
          title="Active Providers"
          value="16"
          change="+2 new"
          icon={<Package className="size-4 text-purple-100" />}
          colorClass="bg-gradient-to-br from-purple-500 to-purple-600 text-white"
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest transactions from users.</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.provider}</TableCell>
                    <TableCell className="font-medium">
                      ${order.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Providers */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Top Providers</CardTitle>
            <CardDescription>
              Highest revenue generating partners.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topProviders.map((provider, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-8 rounded-full bg-orange-100 text-orange-600 text-xs font-bold ring-2 ring-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{provider.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {provider.orders} orders
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">
                      ${provider.revenue.toLocaleString()}
                    </p>
                    <div className="flex items-center justify-end gap-1">
                      <Star className="size-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs text-muted-foreground">
                        {provider.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-3 border-none shadow-md">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events and alerts.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ActivityItem
                icon={<CheckCircle className="text-green-600" />}
                bg="bg-green-100"
                title="New order placed"
                desc="Order #ORD-004 from Alice"
                time="2 min ago"
              />
              <ActivityItem
                icon={<Users className="text-blue-600" />}
                bg="bg-blue-100"
                title="New provider registered"
                desc="Healthy Bites joined"
                time="1 hour ago"
              />
              <ActivityItem
                icon={<Star className="text-orange-600" />}
                bg="bg-orange-100"
                title="New review received"
                desc="5-star for Mario's Pizza"
                time="3 hours ago"
              />
              <ActivityItem
                icon={<AlertTriangle className="text-red-600" />}
                bg="bg-red-100"
                title="Payment issue"
                desc="Order #ORD-002 failed"
                time="5 hours ago"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function KPICard({ title, value, change, icon, colorClass, trend }: any) {
  return (
    <Card className={`${colorClass} border-none shadow-md`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium opacity-90">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs opacity-75 mt-1">
          {trend === "up" ? (
            <ArrowUpRight className="inline size-3 mr-1" />
          ) : (
            <ArrowDownRight className="inline size-3 mr-1" />
          )}
          {change} from last month
        </p>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    delivered:
      "bg-green-100 text-green-700 hover:bg-green-100 border-green-200",
    preparing: "bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200",
    "out-for-delivery":
      "bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200",
    pending:
      "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200",
  };

  return (
    <Badge
      variant="outline"
      className={`${styles[status] || "bg-gray-100"} font-normal capitalize`}
    >
      {status.replace("-", " ")}
    </Badge>
  );
}

function ActivityItem({ icon, bg, title, desc, time }: any) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <div className={`p-2 rounded-full ${bg} mt-0.5`}>{icon}</div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
        <p className="text-[10px] text-muted-foreground mt-1">{time}</p>
      </div>
    </div>
  );
}
