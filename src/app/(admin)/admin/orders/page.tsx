"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Truck,
  Check,
  X,
  Star,
  Clock,
  Package,
  User,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
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

// Types
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

// Mock Data
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    orderNumber: "ORD-001",
    customerName: "John Doe",
    customerEmail: "john.doe@email.com",
    providerName: "Mario's Pizza",
    items: [
      { name: "Margherita Pizza", quantity: 2, price: 12.99 },
      { name: "Garlic Bread", quantity: 1, price: 4.99 },
    ],
    totalAmount: 30.97,
    status: "delivered",
    orderDate: "2024-02-15",
    deliveryDate: "2024-02-15",
    deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1fa768068?w=100",
  },
  {
    id: "ORD-002",
    orderNumber: "ORD-002",
    customerName: "Jane Smith",
    customerEmail: "jane.smith@email.com",
    providerName: "Bangkok Kitchen",
    items: [
      { name: "Chicken Pad Thai", quantity: 1, price: 14.99 },
      { name: "Spring Rolls", quantity: 2, price: 7.99 },
    ],
    totalAmount: 30.97,
    status: "preparing",
    orderDate: "2024-02-16",
    deliveryDate: "2024-02-17",
    deliveryAddress: "456 Oak Ave, Suite 200, Los Angeles, CA 90001",
    rating: 0,
    avatar: "https://images.unsplash.com/photo-149477864529-9c049c437324?w=100",
  },
  // ... (keeping other mock data if needed, simplified for brevity but functional)
  {
    id: "ORD-003",
    orderNumber: "ORD-003",
    customerName: "Bob Johnson",
    customerEmail: "bob.johnson@email.com",
    providerName: "Burger House",
    items: [
      { name: "Classic Burger", quantity: 2, price: 10.99 },
      { name: "French Fries", quantity: 1, price: 3.99 },
    ],
    totalAmount: 25.97,
    status: "cancelled",
    orderDate: "2024-02-14",
    deliveryAddress: "789 Highway Rd, Houston, TX 77001",
    rating: 2,
    avatar:
      "https://images.unsplash.com/photo-1568901346375-23c44588c66c?w=100",
  },
  {
    id: "ORD-004",
    orderNumber: "ORD-004",
    customerName: "Alice Brown",
    customerEmail: "alice.brown@email.com",
    providerName: "Green Garden",
    items: [
      { name: "Caesar Salad", quantity: 3, price: 8.99 },
      { name: "Fresh Juice", quantity: 2, price: 3.99 },
    ],
    totalAmount: 34.95,
    status: "out-for-delivery",
    orderDate: "2024-02-17",
    deliveryDate: "2024-02-18",
    deliveryAddress: "321 Health St, Portland, OR 97201",
    rating: 4,
    avatar:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100",
  },
];

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const stats = {
    total: mockOrders.length,
    delivered: mockOrders.filter((o) => o.status === "delivered").length,
    preparing: mockOrders.filter((o) => o.status === "preparing").length,
    outForDelivery: mockOrders.filter((o) => o.status === "out-for-delivery")
      .length,
    cancelled: mockOrders.filter((o) => o.status === "cancelled").length,
  };

  const filteredOrders = mockOrders.filter((order) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(search) ||
      order.customerName.toLowerCase().includes(search) ||
      order.customerEmail.toLowerCase().includes(search) ||
      order.providerName.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

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
          <h1 className="text-2xl font-bold tracking-tight">
            Order Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Track and manage all customer orders
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full sm:w-64 bg-background"
            />
          </div>

          <Select
            value={statusFilter}
            onValueChange={(value) =>
              setStatusFilter(value as OrderStatus | "all")
            }
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
            <Button className="bg-orange-600 hover:bg-orange-700">
              New Order
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
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

      {/* Orders Table */}
      <Card className="border-none shadow-md">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-28">Order</TableHead>
                <TableHead className="w-64">Customer</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead className="w-36">Status</TableHead>
                <TableHead className="w-24">Rating</TableHead>
                <TableHead className="w-28">Total</TableHead>
                <TableHead className="w-32">Date</TableHead>
                <TableHead className="w-32 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <Link href={`/admin/orders/${order.id}`}>
                  <TableRow key={order.id} className="hover:bg-muted/50 cursor-pointer">
                    <TableCell className="font-medium">
                      {order.orderNumber}
                    </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={order.avatar}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-sm">
                          {order.customerName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {order.customerEmail}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{order.providerName}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${getStatusStyles(order.status)} flex w-fit items-center gap-1.5 px-2.5 py-0.5 font-normal`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="capitalize">
                        {order.status.replace("-", " ")}
                      </span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="size-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm">{order.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                </Link>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Details Modal Overlay */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          {/* Simple Click Outside to Close mock - in real app use Dialog component */}
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-xl font-bold">
                  Order {selectedOrder.orderNumber}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Placed on {selectedOrder.orderDate}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedOrder(null)}
              >
                <X className="size-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Customer & Status */}
                <div className="space-y-6">
                  <section>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <User className="size-4" /> Customer Details
                    </h3>
                    <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                      <img
                        src={selectedOrder.avatar}
                        className="size-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">
                          {selectedOrder.customerName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedOrder.customerEmail}
                        </p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Truck className="size-4" /> Delivery Info
                    </h3>
                    <div className="p-4 bg-muted/30 rounded-lg space-y-3 text-sm">
                      <div>
                        <span className="text-muted-foreground block mb-1">
                          Status
                        </span>
                        <Badge
                          className={getStatusStyles(selectedOrder.status)}
                        >
                          {selectedOrder.status}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-muted-foreground block mb-1">
                          Address
                        </span>
                        <p className="font-medium">
                          {selectedOrder.deliveryAddress}
                        </p>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Order Items */}
                <div className="space-y-6">
                  <section>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Package className="size-4" /> Order Items
                    </h3>
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead>Item</TableHead>
                            <TableHead className="text-right">Qty</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedOrder.items.map((item, i) => (
                            <TableRow key={i}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell className="text-right">
                                {item.quantity}
                              </TableCell>
                              <TableCell className="text-right">
                                ${item.price}
                              </TableCell>
                            </TableRow>
                          ))}
                          <TableRow className="border-t-2">
                            <TableCell colSpan={2} className="font-bold">
                              Total Amount
                            </TableCell>
                            <TableCell className="text-right font-bold text-orange-600">
                              ${selectedOrder.totalAmount}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </section>
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                Close
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700">
                Update Status
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatsCard({
  icon,
  label,
  value,
  className,
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
