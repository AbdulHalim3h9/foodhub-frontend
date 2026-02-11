"use client";

import { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Star, 
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for analytics
const revenueData = [
  { month: "Jan", revenue: 2800, orders: 120, users: 890 },
  { month: "Feb", revenue: 3200, orders: 145, users: 920 },
  { month: "Mar", revenue: 2950, orders: 132, users: 945 },
  { month: "Apr", revenue: 3800, orders: 168, users: 1010 },
];

const topDishes = [
  { name: "Margherita Pizza", orders: 89, revenue: 2225, rating: 4.8 },
  { name: "Chicken Pad Thai", orders: 76, revenue: 1139, rating: 4.7 },
  { name: "Classic Burger", orders: 124, revenue: 1364, rating: 4.5 },
  { name: "Caesar Salad", orders: 58, revenue: 522, rating: 4.2 },
];

const userActivity = [
  { date: "2024-02-17", newUsers: 12, activeUsers: 890, orders: 45 },
  { date: "2024-02-16", newUsers: 8, activeUsers: 885, orders: 38 },
  { date: "2024-02-15", newUsers: 15, activeUsers: 872, orders: 52 },
  { date: "2024-02-14", newUsers: 10, activeUsers: 860, orders: 41 },
];

const deviceStats = [
  { device: "Desktop", users: 2456, percentage: 65 },
  { device: "Mobile", users: 1189, percentage: 31.5 },
  { device: "Tablet", users: 125, percentage: 3.3 },
];

export default function AdminAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("30days");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">System Analytics</h1>
              <p className="text-sm text-gray-600 mt-1">
                Comprehensive insights into platform performance
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
                <Download className="size-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                <ArrowUpRight className="inline h-3 w-3 mr-1" />
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
              <div className="text-2xl font-bold">1,010</div>
              <p className="text-xs text-green-100">
                <ArrowUpRight className="inline h-3 w-3 mr-1" />
                +8.7% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-100" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$22.57</div>
              <p className="text-xs text-purple-100">
                <ArrowUpRight className="inline h-3 w-3 mr-1" />
                +3.2% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Revenue Trend</CardTitle>
                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="orders">Orders</SelectItem>
                    <SelectItem value="users">Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-center">
                <div className="w-full h-full flex items-end justify-between gap-2">
                  {revenueData.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
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

          {/* Top Dishes */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Dishes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topDishes.map((dish, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{dish.name}</p>
                        <p className="text-sm text-gray-500">{dish.orders} orders</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${dish.revenue.toLocaleString()}</p>
                      <div className="flex items-center gap-1">
                        <Star className="size-3 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{dish.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Activity */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>User Activity</CardTitle>
                <Button variant="outline" size="sm" className="border-gray-200">
                  <Eye className="size-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 text-xs font-bold">
                        {activity.date.slice(8, 10)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {activity.newUsers} new users
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.activeUsers} active, {activity.orders} orders
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="size-3 text-green-500" />
                        <span className="text-sm text-green-600">
                          +{Math.floor(Math.random() * 15 + 5)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Device Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Device Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deviceStats.map((device, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-xs font-bold">
                          {device.device.slice(0, 1)}
                        </div>
                        <span className="font-medium text-gray-900">{device.device}</span>
                      </div>
                      <span className="text-sm text-gray-600">{device.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${device.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Avg. Response Time</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">1.2s</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Activity className="size-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Server Uptime</span>
                  </div>
                  <p className="text-lg font-bold text-green-600">99.8%</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="size-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Conversion Rate</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">3.4%</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Star className="size-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Avg. Rating</span>
                  </div>
                  <p className="text-lg font-bold text-orange-600">4.6</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
