"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Order } from "@/services/order.service";

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  orderReviews: Record<string, any[]>;
}

export default function OrderDetailsModal({
  order,
  isOpen,
  onClose,
  orderReviews,
}: OrderDetailsModalProps) {
  if (!order) return null;

  const statusConfig: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    PREPARING: "bg-orange-100 text-orange-800",
    READY: "bg-green-100 text-green-800",
    COMPLETED: "bg-gray-100 text-gray-800",
    CANCELLED: "bg-red-100 text-red-800",
    DELIVERED: "bg-emerald-100 text-emerald-800",
  };

  const statusColor = statusConfig[order.status] ?? "bg-gray-100 text-gray-800";

  const mealId = order.mealId ?? "";
  const hasReview = !!orderReviews[mealId]?.length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle>Order #{order.orderNumber}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
              ×
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <Badge variant="secondary" className={statusColor}>
              {order.status}
            </Badge>
          </div>

          <div className="space-y-5">
            <div>
              <h3 className="text-base font-medium mb-2">Delivery</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                <p>
                  <span className="font-medium">Address:</span> {order.deliveryAddress}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {order.deliveryPhone}
                </p>
                {order.specialInstructions && (
                  <p>
                    <span className="font-medium">Note:</span> {order.specialInstructions}
                  </p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-base font-medium mb-2">Items</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-700">×{order.quantity}</span>
                    <div>
                      <p className="font-medium">{order.meal?.name ?? "Meal"}</p>
                      <p className="text-sm text-gray-500">
                        ${Number(order.pricePerItem ?? 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">
                    ${Number(order.totalAmount ?? 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {hasReview && (
              <div>
                <h3 className="text-base font-medium mb-2">Your Review</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  {orderReviews[mealId].map((review) => (
                    <div key={review.id} className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-0.5">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <span
                                key={i}
                                className={`text-lg ${
                                  i + 1 <= review.rating ? "text-amber-500" : "text-gray-300"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {review.comment && (
                        <p className="text-gray-700 text-sm leading-relaxed pl-1 border-l-2 border-gray-300">
                          {review.comment}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}