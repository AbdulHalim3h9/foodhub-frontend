"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Package,
  ShoppingCart,
  Star,
  Calendar,
  TrendingUp,
  TrendingDown,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
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
import { getDashboardStats } from "@/actions/dashboard.action";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("30days");
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const result = await getDashboardStats();
        if (result.success) {
          setStats(result.data);
        } else {
          setError(result.error || "Failed to fetch dashboard data");
        }
      } catch (err) {
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <div className="text-center py-12">
          <p className="text-red-600">
            {error || "Failed to load dashboard data"}
          </p>
        </div>
      </div>
    );
  }

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard
          title="Total Orders"
          value={stats.totalOrders.toLocaleString()}
          change="All time"
          icon={<ShoppingCart className="size-4 text-blue-100" />}
          colorClass="bg-gradient-to-br from-blue-500 to-blue-600 text-white"
          trend="up"
        />
        <KPICard
          title="Active Users"
          value={stats.activeUsers.toLocaleString()}
          change={`${stats.userStats.CUSTOMER || 0} customers, ${stats.userStats.PROVIDER || 0} providers`}
          icon={<Users className="size-4 text-green-100" />}
          colorClass="bg-gradient-to-br from-green-500 to-green-600 text-white"
          trend="up"
        />
        <KPICard
          title="Active Providers"
          value={stats.activeProviders.toLocaleString()}
          change="Business partners"
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
              <CardTitle>All Orders</CardTitle>
              <CardDescription>All orders in the platform.</CardDescription>
            </div>
            <Link href="/dashboard/orders">
              <Button variant="outline" size="sm" className="text-xs">
                Manage Orders
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-y-auto">
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
                  {stats.recentOrders.map((order: any) => (
                    <TableRow key={order.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        {order.orderNumber}
                      </TableCell>
                      <TableCell>{order.customer?.name || "N/A"}</TableCell>
                      <TableCell>
                        {order.provider?.businessName || "N/A"}
                      </TableCell>
                      <TableCell className="font-medium">
                        ${Number(order.totalAmount).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                  {stats.recentOrders.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-8 text-muted-foreground"
                      >
                        No orders found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Top Providers */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Top Providers</CardTitle>
            <CardDescription>Highest order count partners.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {stats.topProviders.map((provider: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-8 rounded-full bg-orange-100 text-orange-600 text-xs font-bold ring-2 ring-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{provider.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {provider.orderCount} orders
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">
                      ${provider.totalRevenue.toFixed(0)}
                    </p>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                  </div>
                </div>
              ))}
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
    DELIVERED:
      "bg-green-100 text-green-700 hover:bg-green-100 border-green-200",
    PREPARING: "bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200",
    OUT_FOR_DELIVERY:
      "bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200",
    PENDING:
      "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200",
    CONFIRMED:
      "bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200",
    CANCELLED: "bg-red-100 text-red-700 hover:bg-red-100 border-red-200",
  };

  return (
    <Badge
      variant="outline"
      className={`${styles[status] || "bg-gray-100"} font-normal capitalize`}
    >
      {status.replace(/_/g, " ")}
    </Badge>
  );
}
