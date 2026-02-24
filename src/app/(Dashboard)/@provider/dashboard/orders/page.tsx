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
  Calendar,
  BarChart3,
  AlertTriangle,
  User,
  Package,
  RefreshCw,
  Phone,
  MapPin,
  CreditCard,
  DollarSign
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

// Mock data for provider orders
const orders = [
  {
    id: "ORD-001",
    orderNumber: "ORD-001",
    customer: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1fa768068?w=100",
    },
    items: [
      { name: "Margherita Pizza", quantity: 2, price: 25.98, image: "https://images.unsplash.com/photo-1593560900405?w=100" },
      { name: "Garlic Bread", quantity: 1, price: 4.99, image: "https://images.unsplash.com/photo-1525322178264-e5df9a9a2c0c?w=100" }
    ],
    totalAmount: 30.97,
    status: "delivered",
    orderDate: "2024-02-17",
    orderTime: "14:30",
    deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
    deliveryTime: "15:45",
    rating: 5,
    paymentMethod: "Credit Card",
    prepTime: "25 min",
    deliveryFee: 2.99,
    notes: "Extra napkins requested"
  },
  {
    id: "ORD-002",
    orderNumber: "ORD-002",
    customer: {
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+1 (555) 987-6543",
      avatar: "https://images.unsplash.com/photo-149477864529-9c049c437324?w=100",
    },
    items: [
      { name: "Chicken Pad Thai", quantity: 1, price: 14.99, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=100" }
    ],
    totalAmount: 14.99,
    status: "preparing",
    orderDate: "2024-02-17",
    orderTime: "15:45",
    deliveryAddress: "456 Oak Ave, Suite 200, Los Angeles, CA 90001",
    estimatedDelivery: "16:30",
    rating: 0,
    paymentMethod: "PayPal",
    prepTime: "20 min",
    deliveryFee: 2.99,
    notes: "No peanuts please"
  },
  {
    id: "ORD-003",
    orderNumber: "ORD-003",
    customer: {
      name: "Bob Johnson",
      email: "bob.johnson@email.com",
      phone: "+1 (555) 246-8135",
      avatar: "https://images.unsplash.com/photo-1568901346375-23c44588c66c?w=100",
    },
    items: [
      { name: "Classic Burger", quantity: 2, price: 21.98, image: "https://images.unsplash.com/photo-1568901346375-23c44588c66c?w=100" },
      { name: "French Fries", quantity: 1, price: 3.99, image: "https://images.unsplash.com/photo-1576107236508-5b9c3065d686?w=100" }
    ],
    totalAmount: 25.97,
    status: "out-for-delivery",
    orderDate: "2024-02-17",
    orderTime: "16:20",
    deliveryAddress: "789 Highway Rd, Houston, TX 77001",
    estimatedDelivery: "16:45",
    rating: 0,
    paymentMethod: "Cash on Delivery",
    prepTime: "15 min",
    deliveryFee: 2.99,
    notes: "Extra ketchup"
  },
  {
    id: "ORD-004",
    orderNumber: "ORD-004",
    customer: {
      name: "Alice Brown",
      email: "alice.brown@email.com",
      phone: "+1 (555) 369-2580",
      avatar: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100",
    },
    items: [
      { name: "Caesar Salad", quantity: 3, price: 26.97, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100" }
    ],
    totalAmount: 26.97,
    status: "cancelled",
    orderDate: "2024-02-16",
    orderTime: "13:15",
    deliveryAddress: "321 Health St, Portland, OR 97201",
    estimatedDelivery: "N/A",
    rating: 2,
    paymentMethod: "Credit Card",
    prepTime: "10 min",
    deliveryFee: 2.99,
    notes: "Customer cancelled due to long wait time"
  },
];

export default function ProviderOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-100 text-green-800";
      case "preparing": return "bg-blue-100 text-blue-800";
      case "out-for-delivery": return "bg-purple-100 text-purple-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <Check className="size-4" />;
      case "preparing": return <Clock className="size-4" />;
      case "out-for-delivery": return <Truck className="size-4" />;
      case "cancelled": return <X className="size-4" />;
      default: return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered": return "Delivered";
      case "preparing": return "Preparing";
      case "out-for-delivery": return "Out for Delivery";
      case "cancelled": return "Cancelled";
      default: return status;
    }
  };

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case "Credit Card": return <CreditCard className="size-4" />;
      case "PayPal": return <Package className="size-4" />;
      case "Cash on Delivery": return <DollarSign className="size-4" />;
      default: return <Package className="size-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage and track your restaurant orders
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 h-10 border-gray-200 focus:border-orange-300 focus:ring-orange-200"
                />
              </div>
              
              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
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
              
              {/* Actions */}
              <Button className="bg-orange-500 hover:bg-orange-600">
                <RefreshCw className="size-4 mr-2" />
                Refresh Orders
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Check className="size-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{orders.filter(o => o.status === 'delivered').length}</p>
                <p className="text-sm text-gray-600">Delivered Orders</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Clock className="size-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{orders.filter(o => o.status === 'preparing').length}</p>
                <p className="text-sm text-gray-600">Preparing Orders</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <Truck className="size-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{orders.filter(o => o.status === 'out-for-delivery').length}</p>
                <p className="text-sm text-gray-600">Out for Delivery</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-full">
                <X className="size-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{orders.filter(o => o.status === 'cancelled').length}</p>
                <p className="text-sm text-gray-600">Cancelled Orders</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">Order</TableHead>
                  <TableHead className="w-32">Customer</TableHead>
                  <TableHead className="w-48">Items</TableHead>
                  <TableHead className="w-20">Amount</TableHead>
                  <TableHead className="w-20">Status</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={order.customer.avatar}
                          alt={order.customer.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{order.customer.name}</p>
                          <p className="text-sm text-gray-500">{order.customer.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-6 h-6 rounded object-cover"
                            />
                            <span>{item.quantity}x {item.name}</span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">${order.totalAmount.toFixed(2)}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          <span>{getStatusText(order.status)}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                          className="border-orange-200 text-orange-600 hover:bg-orange-50"
                        >
                          <Eye className="size-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-200 text-gray-600 hover:bg-gray-50"
                        >
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
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Order Details - {selectedOrder.orderNumber}</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedOrder(null)}
                  className="border-gray-200"
                >
                  <X className="size-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Customer Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={selectedOrder.customer.avatar}
                      alt={selectedOrder.customer.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{selectedOrder.customer.name}</p>
                      <p className="text-sm text-gray-500">{selectedOrder.customer.email}</p>
                      <p className="text-sm text-gray-500">{selectedOrder.customer.phone}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Order Date:</p>
                      <p className="text-gray-600">{selectedOrder.orderDate}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Order Time:</p>
                      <p className="text-gray-600">{selectedOrder.orderTime}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Payment Method:</p>
                      <div className="flex items-center gap-1">
                        {getPaymentIcon(selectedOrder.paymentMethod)}
                        <span className="text-gray-600">{selectedOrder.paymentMethod}</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Rating:</p>
                      <div className="flex items-center gap-1">
                        <Star className="size-4 text-yellow-400 fill-current" />
                        <span className="text-gray-600">{selectedOrder.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold">
                            {item.quantity}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <span className="font-medium text-gray-900">${(item.quantity * item.price).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <p className="text-sm text-gray-600">Subtotal: ${(selectedOrder.totalAmount - selectedOrder.deliveryFee).toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Delivery Fee: ${selectedOrder.deliveryFee.toFixed(2)}</p>
                    </div>
                    <p className="text-xl font-bold text-orange-600">Total: ${selectedOrder.totalAmount.toFixed(2)}</p>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Delivery Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-gray-700">Delivery Address:</p>
                      <p className="text-gray-600">{selectedOrder.deliveryAddress}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Estimated Delivery:</p>
                      <p className="text-gray-600">{selectedOrder.estimatedDelivery || "N/A"}</p>
                    </div>
                    {selectedOrder.status === "delivered" && (
                      <div>
                        <p className="font-medium text-gray-700">Actual Delivery:</p>
                        <p className="text-gray-600">{selectedOrder.deliveryTime}</p>
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-700">Prep Time:</p>
                      <p className="text-gray-600">{selectedOrder.prepTime}</p>
                    </div>
                  </div>
                </div>

                {/* Order Notes */}
                {selectedOrder.notes && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Notes</h3>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-gray-700">{selectedOrder.notes}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Actions */}
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <Button variant="outline" className="border-gray-200">
                  <Phone className="size-4 mr-2" />
                  Call Customer
                </Button>
                <Button variant="outline" className="border-gray-200">
                  <MapPin className="size-4 mr-2" />
                  Get Directions
                </Button>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Check className="size-4 mr-2" />
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
