"use client";

import { useState } from "react";
import {
  TrendingUp,
  ShoppingCart,
  DollarSign,
  Star,
  Calendar,
  BarChart3,
  Package,
  Clock,
  Plus,
  Eye,
  Edit,
  AlertTriangle,
  Users,
  Activity,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

// Mock data for provider dashboard
const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    items: ["Margherita Pizza", "Garlic Bread"],
    amount: 30.97,
    status: "delivered",
    date: "2024-02-17",
    time: "14:30",
    rating: 5,
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    items: ["Chicken Pad Thai"],
    amount: 14.99,
    status: "preparing",
    date: "2024-02-17",
    time: "15:45",
    rating: 0,
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    items: ["Classic Burger", "French Fries"],
    amount: 25.97,
    status: "out-for-delivery",
    date: "2024-02-17",
    time: "16:20",
    rating: 0,
  },
];

const menuItems = [
  {
    id: "1",
    name: "Margherita Pizza",
    category: "Pizza",
    price: 12.99,
    status: "active",
    orders: 89,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1593560900405?w=100",
  },
  {
    id: "2",
    name: "Chicken Pad Thai",
    category: "Asian",
    price: 14.99,
    status: "active",
    orders: 76,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=100",
  },
  {
    id: "3",
    name: "Classic Burger",
    category: "Fast Food",
    price: 10.99,
    status: "active",
    orders: 124,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1568901346375-23c44588c66c?w=100",
  },
];

const monthlyData = [
  { month: "Jan", revenue: 2800, orders: 120, customers: 89 },
  { month: "Feb", revenue: 3200, orders: 145, customers: 102 },
  { month: "Mar", revenue: 2950, orders: 132, customers: 95 },
  { month: "Apr", revenue: 3800, orders: 168, customers: 118 },
];

const recentActivity = [
  {
    id: 1,
    type: "order",
    message: "New order received from John Doe",
    time: "2 minutes ago",
    icon: ShoppingCart,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: 2,
    type: "review",
    message: "5-star review for Margherita Pizza",
    time: "1 hour ago",
    icon: Star,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    id: 3,
    type: "alert",
    message: "Low stock alert for Classic Burger",
    time: "30 minutes ago",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    id: 4,
    type: "customer",
    message: "New customer registered",
    time: "2 hours ago",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
];

export default function ProviderDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("30days");

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Provider Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your restaurant and track performance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40 bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>

          <Button>
            <Plus className="size-4 mr-2" />
            Add New Item
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-100" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,750</div>
            <p className="text-xs text-orange-100">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +18.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-100" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">565</div>
            <p className="text-xs text-blue-100">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +15.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Items</CardTitle>
            <Package className="h-4 w-4 text-green-100" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-green-100">
              Menu items currently available
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Star className="h-4 w-4 text-purple-100" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7</div>
            <p className="text-xs text-purple-100">Across all menu items</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-center">
              <div className="w-full h-full flex items-end justify-between gap-2">
                {monthlyData.map((data, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className="w-full bg-orange-400 rounded-t"
                      style={{ height: `${(data.revenue / 4000) * 100}%` }}
                    />
                    <div className="text-xs text-gray-600 mt-2 text-center">
                      {data.month}
                    </div>
                    <div className="text-sm font-medium text-gray-900 text-center">
                      ${data.revenue.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="size-4 mr-3" />
              Add New Menu Item
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-gray-200"
            >
              <Package className="size-4 mr-3" />
              Manage Menu Items
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-gray-200"
            >
              <ShoppingCart className="size-4 mr-3" />
              View All Orders
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-gray-200"
            >
              <BarChart3 className="size-4 mr-3" />
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                <Eye className="size-4 mr-2" />
                View All Orders
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold">
                        {order.id.slice(-1)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {order.customer}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.items.join(", ")}
                        </p>
                        <p className="text-xs text-gray-400">
                          {order.date} at {order.time}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-gray-900">
                      ${order.amount.toFixed(2)}
                    </p>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "preparing"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "out-for-delivery"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status.replace("-", " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Menu Items */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Top Menu Items</CardTitle>
              <Button variant="outline" size="sm" className="border-gray-200">
                <Edit className="size-4 mr-2" />
                Manage Menu
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {menuItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="size-3 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${activity.bgColor}`}
                >
                  <activity.icon className={`size-5 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
