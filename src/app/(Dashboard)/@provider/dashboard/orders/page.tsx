"use client";

import { useState, useEffect } from "react";
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
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle
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
import { Card, CardContent } from "@/components/ui/card";
import { getProviderOrders, updateOrderStatus } from "@/actions/order.action";
import { Order, GetOrdersParams } from "@/services/order.service";

export default function ProviderOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      
      const params: GetOrdersParams = {
        search: searchTerm || undefined,
        status: statusFilter !== "all" ? statusFilter as Order["status"] : undefined,
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      };

      try {
        const result = await getProviderOrders(params);
        if (result.success && result.data) {
          setOrders(result.data.data);
          setPagination(result.data.pagination);
        } else {
          setError(result.error || "Failed to fetch orders");
        }
      } catch (err) {
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchOrders, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm, statusFilter, pagination.page]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED": return "bg-green-100 text-green-800 border-green-200 hover:bg-green-100";
      case "PREPARING": return "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100";
      case "READY": return "bg-cyan-100 text-cyan-800 border-cyan-200 hover:bg-cyan-100";
      case "OUT_FOR_DELIVERY": return "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100";
      case "PENDING": return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100";
      case "CONFIRMED": return "bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-100";
      case "CANCELLED": return "bg-red-100 text-red-800 border-red-200 hover:bg-red-100";
      default: return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DELIVERED": return <Check className="size-3" />;
      case "PREPARING": return <Clock className="size-3" />;
      case "READY": return <Check className="size-3" />;
      case "OUT_FOR_DELIVERY": return <Truck className="size-3" />;
      case "PENDING": return <Calendar className="size-3" />;
      case "CONFIRMED": return <Check className="size-3" />;
      case "CANCELLED": return <X className="size-3" />;
      default: return null;
    }
  };

  const getStatusText = (status: string) => {
    return status.replace(/_/g, ' ').toLowerCase();
  };

  const handleStatusUpdate = async (orderId: string, newStatus: Order["status"]) => {
    const previousOrders = orders;
    const previousSelectedOrder = selectedOrder;

    // Enforce: DELIVERED is final (frontend)
    const current = orders.find((o) => o.id === orderId) ?? (selectedOrder?.id === orderId ? selectedOrder : null);
    if (current?.status === "DELIVERED") {
      setError("Delivered orders cannot be updated!");
      return;
    }

    try {
      setError(null);

      // Optimistic UI update
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
      setSelectedOrder((prev) => (prev?.id === orderId ? { ...prev, status: newStatus } : prev));

      const result = await updateOrderStatus(orderId, newStatus);
      if (result.success) {
        // If the order no longer matches the current filter, switch to all
        if (statusFilter !== "all" && newStatus !== (statusFilter as Order["status"])) {
          setStatusFilter("all");
          setPagination((prev) => ({ ...prev, page: 1 }));
          return;
        }

        // Refetch orders
        const params: GetOrdersParams = {
          search: searchTerm || undefined,
          status: statusFilter !== "all" ? (statusFilter as Order["status"]) : undefined,
          page: pagination.page.toString(),
          limit: pagination.limit.toString(),
        };
        const updatedResult = await getProviderOrders(params);
        if (updatedResult.success && updatedResult.data) {
          setOrders(updatedResult.data.data);
        }
      } else {
        // Revert optimistic update
        setOrders(previousOrders);
        setSelectedOrder(previousSelectedOrder);
        setError(result.error || "Failed to update order status");
      }
    } catch (err) {
      // Revert optimistic update
      setOrders(previousOrders);
      setSelectedOrder(previousSelectedOrder);
      setError("An unexpected error occurred");
    }
  };

  // Derived stats from actual data
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(o => o.status === 'DELIVERED').length;
  const preparingOrders = orders.filter(o => o.status === 'PREPARING').length;
  const readyOrders = orders.filter(o => o.status === 'READY').length;
  const outForDeliveryOrders = orders.filter(o => o.status === 'OUT_FOR_DELIVERY').length;

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case "Credit Card": return <CreditCard className="size-4" />;
      case "PayPal": return <Package className="size-4" />;
      case "Cash on Delivery": return <DollarSign className="size-4" />;
      default: return <Package className="size-4" />;
    }
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
            Manage and track your restaurant orders
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="CONFIRMED">Confirmed</SelectItem>
              <SelectItem value="PREPARING">Preparing</SelectItem>
              <SelectItem value="READY">Ready</SelectItem>
              <SelectItem value="OUT_FOR_DELIVERY">Out for Delivery</SelectItem>
              <SelectItem value="DELIVERED">Delivered</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <Check className="size-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{deliveredOrders}</p>
                <p className="text-xs text-muted-foreground">Delivered Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Clock className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{preparingOrders}</p>
                <p className="text-xs text-muted-foreground">Preparing Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-100 rounded-full">
                <Check className="size-5 text-cyan-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{readyOrders}</p>
                <p className="text-xs text-muted-foreground">Ready Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <Truck className="size-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{outForDeliveryOrders}</p>
                <p className="text-xs text-muted-foreground">Out for Delivery</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-full">
                <Package className="size-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalOrders}</p>
                <p className="text-xs text-muted-foreground">Total Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

        {/* Orders Table */}
      <Card className="border-none shadow-md">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="size-5 animate-spin" />
              <span>Loading orders...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-20 gap-3 text-red-600">
              <AlertCircle className="size-5" />
              <span>{error}</span>
            </div>
          ) : orders.length === 0 ? (
            <div className="flex items-center justify-center py-20 text-muted-foreground">
              <span>No orders found</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{order.id.slice(0, 8)}...</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-orange-100 flex items-center justify-center">
                          <span className="text-orange-600 font-bold text-sm">
                            {(order as any).customer?.name?.charAt(0) || order.user?.name?.charAt(0) || "C"}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{(order as any).customer?.name || order.user?.name || "Customer"}</p>
                          <p className="text-sm text-muted-foreground">{(order as any).customer?.email || order.user?.email || ""}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <span>{order.quantity}x {order.meal?.name ?? "Meal"}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">${Number(order.totalAmount).toFixed(2)}</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusColor(order.status)}
                      >
                        <div className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          <span>{getStatusText(order.status)}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="size-4" />
                        </Button>
                        <Select
                          value={order.status}
                          onValueChange={(value) => handleStatusUpdate(order.id, value as Order["status"])}
                          disabled={order.status === "DELIVERED"}
                        >
                          <SelectTrigger className="h-8 w-[150px]">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                            <SelectItem value="PREPARING">Preparing</SelectItem>
                            <SelectItem value="READY">Ready</SelectItem>
                            <SelectItem value="OUT_FOR_DELIVERY">Out for Delivery</SelectItem>
                            <SelectItem value="DELIVERED">Delivered</SelectItem>
                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        {order.status === 'PREPARING' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusUpdate(order.id, 'READY')}
                            className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50"
                          >
                            <Check className="size-4" />
                          </Button>
                        )}
                        {order.status === 'READY' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusUpdate(order.id, 'OUT_FOR_DELIVERY')}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Truck className="size-4" />
                          </Button>
                        )}
                        {order.status === 'OUT_FOR_DELIVERY' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusUpdate(order.id, 'DELIVERED')}
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Check className="size-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
            {pagination.total} orders
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page <= 1}
            >
              <ChevronLeft className="size-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === pagination.page;
                return (
                  <Button
                    key={pageNum}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    className="size-8 p-0"
                    onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              {pagination.totalPages > 5 && (
                <>
                  <span className="px-2 text-sm text-muted-foreground">...</span>
                  <Button
                    variant={pagination.page === pagination.totalPages ? "default" : "outline"}
                    size="sm"
                    className="size-8 p-0"
                    onClick={() => setPagination(prev => ({ ...prev, page: pagination.totalPages }))}
                  >
                    {pagination.totalPages}
                  </Button>
                </>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page >= pagination.totalPages}
            >
              Next
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Order Details - {selectedOrder.id.slice(0, 8)}...</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedOrder(null)}
                >
                  <X className="size-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Customer Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="size-12 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-orange-600 font-bold text-lg">
                        {selectedOrder.customer.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{selectedOrder.customer.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedOrder.customer.email}</p>
                      <p className="text-sm text-muted-foreground">{selectedOrder.customer.phone}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-muted-foreground">Order Date:</p>
                      <p>{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Order Time:</p>
                      <p>{new Date(selectedOrder.createdAt).toLocaleTimeString()}</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Status:</p>
                      <Badge className={getStatusColor(selectedOrder.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(selectedOrder.status)}
                          <span>{getStatusText(selectedOrder.status)}</span>
                        </div>
                      </Badge>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Total Amount:</p>
                      <p className="font-medium">${Number(selectedOrder.totalAmount).toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-3">Order Items</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center size-8 rounded-full bg-orange-100 text-orange-600 font-bold text-sm">
                          {selectedOrder.quantity}
                        </div>
                        <div>
                          <p className="font-medium">{selectedOrder.meal?.name ?? "Meal"}</p>
                          <p className="text-sm text-muted-foreground">${Number(selectedOrder.pricePerItem).toFixed(2)}</p>
                        </div>
                      </div>
                      <p className="font-medium">${Number(selectedOrder.totalAmount).toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Total:</p>
                    </div>
                    <p className="text-xl font-bold text-orange-600">${Number(selectedOrder.totalAmount).toFixed(2)}</p>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-3">Delivery Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-muted-foreground">Delivery Address:</p>
                      <p>{selectedOrder.deliveryAddress}</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Delivery Phone:</p>
                      <p>{selectedOrder.deliveryPhone}</p>
                    </div>
                    {selectedOrder.specialInstructions && (
                      <div>
                        <p className="font-medium text-muted-foreground">Special Instructions:</p>
                        <p className="text-sm">{selectedOrder.specialInstructions}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <Button variant="outline">
                  <Phone className="size-4 mr-2" />
                  Call Customer
                </Button>
                <Select
                  value={selectedOrder.status}
                  onValueChange={(value) => handleStatusUpdate(selectedOrder.id, value as Order["status"])}
                  disabled={selectedOrder.status === "DELIVERED"}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Update status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                    <SelectItem value="PREPARING">Preparing</SelectItem>
                    <SelectItem value="READY">Ready</SelectItem>
                    <SelectItem value="OUT_FOR_DELIVERY">Out for Delivery</SelectItem>
                    <SelectItem value="DELIVERED">Delivered</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                {selectedOrder.status === 'PREPARING' && (
                  <Button onClick={() => handleStatusUpdate(selectedOrder.id, 'READY')}>
                    <Check className="size-4 mr-2" />
                    Mark as Ready
                  </Button>
                )}
                {selectedOrder.status === 'READY' && (
                  <Button onClick={() => handleStatusUpdate(selectedOrder.id, 'OUT_FOR_DELIVERY')}>
                    <Truck className="size-4 mr-2" />
                    Mark as Out for Delivery
                  </Button>
                )}
                {selectedOrder.status === 'OUT_FOR_DELIVERY' && (
                  <Button onClick={() => handleStatusUpdate(selectedOrder.id, 'DELIVERED')}>
                    <Check className="size-4 mr-2" />
                    Mark as Delivered
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
