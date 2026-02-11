"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Truck,
  Check,
  X,
  Star,
  Calendar,
  User,
  Package,
  Clock,
  ArrowUpDown,
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

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------
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
  deliveryDate?: string; // optional for cancelled orders
  deliveryAddress: string;
  rating: number;
  avatar: string;
}

// -----------------------------------------------------------------------------
// Mock Data (with fix for missing deliveryDate)
// -----------------------------------------------------------------------------
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
    deliveryDate: undefined, // cancelled → no delivery date
    deliveryAddress: "789 Highway Rd, Houston, TX 77001",
    rating: 2,
    avatar: "https://images.unsplash.com/photo-1568901346375-23c44588c66c?w=100",
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
    avatar: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100",
  },
];

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------
export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Dynamic stats calculation
  const stats = {
    total: mockOrders.length,
    delivered: mockOrders.filter(o => o.status === "delivered").length,
    preparing: mockOrders.filter(o => o.status === "preparing").length,
    outForDelivery: mockOrders.filter(o => o.status === "out-for-delivery").length,
    cancelled: mockOrders.filter(o => o.status === "cancelled").length,
  };

  const filteredOrders = mockOrders.filter(order => {
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
      delivered: <Check className="size-4" />,
      preparing: <Clock className="size-4" />,
      "out-for-delivery": <Truck className="size-4" />,
      cancelled: <X className="size-4" />,
    };
    return icons[status];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
              <p className="text-sm text-gray-600 mt-1">Track and manage all customer orders</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 h-10"
                />
              </div>

              <Select
                value={statusFilter}
                onValueChange={value => setStatusFilter(value as OrderStatus | "all")}
              >
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Filter by status" />
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
                <Button variant="outline">Export Orders</Button>
                <Button className="bg-orange-600 hover:bg-orange-700">New Order</Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
          <StatCard icon={<Check />} label="Delivered" value={stats.delivered} color="green" />
          <StatCard icon={<Clock />} label="Preparing" value={stats.preparing} color="blue" />
          <StatCard
            icon={<Truck />}
            label="Out for Delivery"
            value={stats.outForDelivery}
            color="purple"
          />
          <StatCard icon={<X />} label="Cancelled" value={stats.cancelled} color="red" />
          <StatCard icon={<Package />} label="Total Orders" value={stats.total} color="orange" />
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
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
                {filteredOrders.map(order => (
                  <TableRow key={order.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={order.avatar}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium">{order.customerName}</div>
                          <div className="text-sm text-gray-500">{order.customerEmail}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{order.providerName}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${getStatusStyles(order.status)} flex items-center gap-1.5 px-3 py-1`}
                      >
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status.replace("-", " ")}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="size-4 text-yellow-400 fill-yellow-400" />
                        <span>{order.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  Order {selectedOrder.orderNumber}
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(null)}>
                  <X className="size-5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                  <section>
                    <h3 className="text-lg font-semibold mb-4">Customer</h3>
                    <div className="flex items-center gap-4">
                      <img
                        src={selectedOrder.avatar}
                        alt=""
                        className="w-16 h-16 rounded-full object-cover ring-1 ring-gray-200"
                      />
                      <div>
                        <p className="font-medium text-lg">{selectedOrder.customerName}</p>
                        <p className="text-gray-600">{selectedOrder.customerEmail}</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-4">Delivery</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex gap-3">
                        <User className="size-5 text-gray-500 mt-0.5" />
                        <div>
                          <div className="font-medium text-gray-700">Address</div>
                          <p className="text-gray-600">{selectedOrder.deliveryAddress}</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  <section>
                    <h3 className="text-lg font-semibold mb-4">Order Info</h3>
                    <div className="grid grid-cols-2 gap-6 text-sm">
                      <div>
                        <div className="text-gray-600 mb-1">Provider</div>
                        <p className="font-medium">{selectedOrder.providerName}</p>
                      </div>
                      <div>
                        <div className="text-gray-600 mb-1">Order Date</div>
                        <p className="font-medium">{selectedOrder.orderDate}</p>
                      </div>
                      <div>
                        <div className="text-gray-600 mb-1">Delivery Date</div>
                        <p className="font-medium">
                          {selectedOrder.deliveryDate ?? "—"}
                        </p>
                      </div>
                      <div>
                        <div className="text-gray-600 mb-1">Status</div>
                        <Badge className={getStatusStyles(selectedOrder.status)}>
                          {selectedOrder.status.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-4">Items</h3>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-gray-800">
                              {item.quantity}×
                            </span>
                            <span>{item.name}</span>
                          </div>
                          <span className="font-medium">
                            ${(item.quantity * item.price).toFixed(2)}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between pt-4 border-t font-medium text-lg">
                        <span>Total</span>
                        <span className="text-orange-600">
                          ${selectedOrder.totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-10 pt-6 border-t flex flex-wrap gap-3 justify-end">
                <Button variant="outline">Send Update</Button>
                <Button variant="destructive">Cancel Order</Button>
                <Button
                  className={
                    selectedOrder.status === "delivered"
                      ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }
                  disabled={selectedOrder.status === "delivered"}
                >
                  Mark as Delivered
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Stat Card Component
function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: "green" | "blue" | "purple" | "red" | "orange";
}) {
  const colors = {
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
    red: "bg-red-100 text-red-700",
    orange: "bg-orange-100 text-orange-700",
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${colors[color]}`}>{icon}</div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-gray-600">{label}</p>
        </div>
      </div>
    </div>
  );
}