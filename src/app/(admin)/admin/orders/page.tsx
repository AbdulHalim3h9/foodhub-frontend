"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Eye,
  MoreHorizontal,
  Truck,
  Check,
  X,
  Star,
  Clock,
  Package,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ordersData from "./orders.json";

// ──────────────────────────────────────────────── Types
type OrderStatus = "delivered" | "preparing" | "out-for-delivery" | "cancelled";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  providerName: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  orderDate: string;
  deliveryDate?: string;
  deliveryAddress: string;
  rating: number;
  avatar: string;
}

// ──────────────────────────────────────────────── Component
export default function AdminOrders() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(ordersData as Order[]);
  }, []);

  const stats = {
    total: orders.length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    preparing: orders.filter((o) => o.status === "preparing").length,
    outForDelivery: orders.filter((o) => o.status === "out-for-delivery").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  const filteredOrders = orders.filter((order) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(search) ||
      order.customerName.toLowerCase().includes(search) ||
      order.customerEmail.toLowerCase().includes(search) ||
      order.providerName.toLowerCase().includes(search);

    const matchesStatus = statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusStyles = (status: OrderStatus) => {
    const styles: Record<OrderStatus, string> = {
      delivered: "bg-green-100 text-green-800 border-green-200",
      preparing: "bg-blue-100 text-blue-800 border-blue-200",
      "out-for-delivery": "bg-purple-100 text-purple-800 border-purple-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    };
    return styles[status];
  };

  const getStatusIcon = (status: OrderStatus) => {
    const icons: Record<OrderStatus, JSX.Element> = {
      delivered: <Check className="size-3" />,
      preparing: <Clock className="size-3" />,
      "out-for-delivery": <Truck className="size-3" />,
      cancelled: <X className="size-3" />,
    };
    return icons[status];
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Order Management</h1>
          <p className="text-sm text-muted-foreground">Track and manage all customer orders</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full sm:w-64"
            />
          </div>

          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as OrderStatus | "all")}
          >
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="preparing">Preparing</SelectItem>
              <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button variant="outline">Export</Button>
            <Button className="bg-orange-600 hover:bg-orange-700">New Order</Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          icon={<Check className="text-green-600" />}
          label="Delivered"
          value={stats.delivered}
          className="bg-green-50/50 border-green-100"
        />
        <StatsCard
          icon={<Clock className="text-blue-600" />}
          label="Preparing"
          value={stats.preparing}
          className="bg-blue-50/50 border-blue-100"
        />
        <StatsCard
          icon={<Truck className="text-purple-600" />}
          label="On Way"
          value={stats.outForDelivery}
          className="bg-purple-50/50 border-purple-100"
        />
        <StatsCard
          icon={<X className="text-red-600" />}
          label="Cancelled"
          value={stats.cancelled}
          className="bg-red-50/50 border-red-100"
        />
        <StatsCard
          icon={<Package className="text-orange-600" />}
          label="Total"
          value={stats.total}
          className="bg-orange-50/50 border-orange-100"
        />
      </div>

      {/* Table */}
      <Card className="border-none shadow-md">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-64">Customer</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead className="w-36">Status</TableHead>
                <TableHead className="w-28">Total</TableHead>
                <TableHead className="w-32">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow
                  key={order.id}
                  className="hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => router.push(`/admin/orders/${order.id}`)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={order.avatar}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-sm">{order.customerName}</div>
                        <div className="text-xs text-muted-foreground">{order.customerEmail}</div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{order.providerName}</TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusStyles(order.status)}
                    >
                      {getStatusIcon(order.status)}
                      <span className="capitalize">
                        {order.status.replace("-", " ")}
                      </span>
                    </Badge>
                  </TableCell>

                  <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function StatsCard({
  icon,
  label,
  value,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  className?: string;
}) {
  return (
    <Card className={`border shadow-sm ${className}`}>
      <CardContent className="p-4 flex items-center gap-4">
        <div className="p-2 bg-white rounded-full shadow-sm">{icon}</div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            {label}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}