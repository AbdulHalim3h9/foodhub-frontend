"use client";

import { useState } from "react";
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign, 
  Star, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Eye,
  ArrowUpRight,
  ArrowDownRight
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

// Mock data for dashboard
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
    amount: 32.50,
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
];

const topProviders = [
  { name: "Mario's Pizza", orders: 245, revenue: 4850, rating: 4.8 },
  { name: "Bangkok Kitchen", orders: 189, revenue: 3200, rating: 4.7 },
  { name: "Burger House", orders: 312, revenue: 5200, rating: 4.5 },
  { name: "Green Garden", orders: 156, revenue: 2100, rating: 4.2 },
];

const monthlyStats = [
  { month: "Jan", orders: 120, revenue: 2800 },
  { month: "Feb", orders: 145, revenue: 3200 },
  { month: "Mar", orders: 132, revenue: 2950 },
  { month: "Apr", orders: 168, revenue: 3800 },
];

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("30days");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">
                Overview of your FoodHub platform
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <select 
                value={selectedPeriod} 
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="1year">Last year</option>
              </select>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Calendar className="size-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-orange-100" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$15,350</div>
              <p className="text-xs text-orange-100">
                <ArrowUpRight className="inline h-3 w-3 mr-1" />
                +20.1% from last month
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
                <ArrowUpRight className="inline h-3 w-3 mr-1" />
                +15.3% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-green-100" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-green-100">
                <ArrowUpRight className="inline h-3 w-3 mr-1" />
                +8.7% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Providers</CardTitle>
              <Package className="h-4 w-4 text-purple-100" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">16</div>
              <p className="text-xs text-purple-100">
                <ArrowDownRight className="inline h-3 w-3 mr-1" />
                +2 new this month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Orders */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="outline" size="sm" className="border-orange-200 text-orange-600 hover:bg-orange-50">
                  <Eye className="size-4 mr-2" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.provider}</TableCell>
                      <TableCell className="font-medium">${order.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'out-for-delivery' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status.replace('-', ' ')}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-orange-500 hover:bg-orange-600 text-white">
                <Users className="size-4 mr-3" />
                Manage Users
              </Button>
              <Button variant="outline" className="w-full justify-start border-gray-200">
                <Package className="size-4 mr-3" />
                Manage Providers
              </Button>
              <Button variant="outline" className="w-full justify-start border-gray-200">
                <ShoppingCart className="size-4 mr-3" />
                View Orders
              </Button>
              <Button variant="outline" className="w-full justify-start border-gray-200">
                <BarChart3 className="size-4 mr-3" />
                Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start border-gray-200">
                <AlertTriangle className="size-4 mr-3" />
                System Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Providers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Providers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProviders.map((provider, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{provider.name}</p>
                        <p className="text-sm text-gray-500">{provider.orders} orders</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${provider.revenue.toLocaleString()}</p>
                      <div className="flex items-center gap-1">
                        <Star className="size-3 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{provider.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 text-xs font-bold">
                        {stat.month.slice(0, 1)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{stat.month}</p>
                        <p className="text-sm text-gray-500">{stat.orders} orders</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${stat.revenue.toLocaleString()}</p>
                      <p className="text-sm text-green-600">
                        <TrendingUp className="inline h-3 w-3 mr-1" />
                        +{Math.floor(Math.random() * 20 + 5)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="outline" size="sm" className="border-gray-200">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                  <CheckCircle className="size-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New order placed</p>
                  <p className="text-xs text-gray-500">Order #ORD-004 from Alice Brown</p>
                  <p className="text-xs text-gray-400">2 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                  <Users className="size-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New provider registered</p>
                  <p className="text-xs text-gray-500">Healthy Bites joined the platform</p>
                  <p className="text-xs text-gray-400">1 hour ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100">
                  <Star className="size-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New review received</p>
                  <p className="text-xs text-gray-500">5-star review for Mario's Pizza</p>
                  <p className="text-xs text-gray-400">3 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                  <AlertTriangle className="size-4 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Payment issue detected</p>
                  <p className="text-xs text-gray-500">Order #ORD-002 payment failed</p>
                  <p className="text-xs text-gray-400">5 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
