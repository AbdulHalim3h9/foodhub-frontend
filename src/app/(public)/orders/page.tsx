"use client";

import React, { useState, useEffect } from "react";
import { Package, Clock, CheckCircle, Truck, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCustomerOrders } from "@/actions/order.action";
import { Order, PaginatedOrders } from "@/services/order.service";

export default function OrdersPage() {
  const [orders, setOrders] = useState<PaginatedOrders | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const result = await getCustomerOrders();
      if (result.success && result.data) {
        setOrders(result.data);
      } else {
        console.error("Failed to fetch orders:", result.error);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED": return "bg-blue-100 text-blue-800";
      case "PREPARING": return "bg-orange-100 text-orange-800";
      case "READY": return "bg-green-100 text-green-800";
      case "COMPLETED": return "bg-gray-100 text-gray-800";
      case "CANCELLED": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING": return <Clock className="h-4 w-4" />;
      case "CONFIRMED": return <CheckCircle className="h-4 w-4" />;
      case "PREPARING": return <ChefHat className="h-4 w-4" />;
      case "READY": return <Truck className="h-4 w-4" />;
      case "COMPLETED": return <CheckCircle className="h-4 w-4" />;
      case "CANCELLED": return <Package className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!orders || !orders.data.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h1>
          <p className="text-gray-600 mb-8">
            You haven't placed any orders yet. Start browsing meals and add them to your cart!
          </p>
          <Button asChild className="bg-orange-500 hover:bg-orange-600">
            <a href="/browse" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Browse Meals
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">
          {orders.pagination.total} {orders.pagination.total === 1 ? 'order' : 'orders'} placed
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.data.map((order: Order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)}
                      <span className="ml-2">{order.status}</span>
                    </Badge>
                    <div>
                      <p className="font-semibold text-gray-900">#{order.orderNumber}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${order.totalAmount}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {/* Delivery Info */}
                <div className="border-b pb-3">
                  <h3 className="font-medium text-gray-900 mb-2">Delivery Information</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Address:</strong> {order.deliveryAddress}</p>
                    <p><strong>Phone:</strong> {order.deliveryPhone}</p>
                    {order.specialInstructions && (
                      <p><strong>Special Instructions:</strong> {order.specialInstructions}</p>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Order Items</h3>
                  <div className="space-y-2">
                    {order.items.map((item: any, index: number) => (
                      <div key={item.id} className="flex items-center gap-3 pb-2 border-b last:border-b-0">
                        <span className="text-sm text-gray-600 min-w-0">x{item.quantity}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900">{item.meal.name}</p>
                          <p className="text-sm text-gray-500">${item.totalPrice}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">${item.totalPrice}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
              <Button
                variant="ghost"
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </Button>
            </div>
            
            <div className="space-y-4">
              {/* Order Status */}
              <div className="flex items-center gap-3">
                <Badge className={getStatusColor(selectedOrder.status)}>
                  {getStatusIcon(selectedOrder.status)}
                  <span className="ml-2">{selectedOrder.status}</span>
                </Badge>
                <div>
                  <p className="font-semibold text-gray-900">#{selectedOrder.orderNumber}</p>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(selectedOrder.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Delivery and Items Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Delivery Information</h3>
                  <div className="space-y-1 text-sm bg-gray-50 p-3 rounded">
                    <p><strong>Address:</strong> {selectedOrder.deliveryAddress}</p>
                    <p><strong>Phone:</strong> {selectedOrder.deliveryPhone}</p>
                    {selectedOrder.specialInstructions && (
                      <p><strong>Special Instructions:</strong> {selectedOrder.specialInstructions}</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Order Items</h3>
                  <div className="space-y-2 bg-gray-50 p-3 rounded">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">x{item.quantity}</span>
                          <div>
                            <p className="font-medium text-gray-900">{item.meal.name}</p>
                            <p className="text-sm text-gray-500">${item.totalPrice}</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-900">${item.totalPrice}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
