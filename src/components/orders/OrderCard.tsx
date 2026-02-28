import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Clock, CheckCircle, Truck, ChefHat } from "lucide-react";
import { Order } from "@/services/order.service";

interface OrderCardProps {
  order: Order;
  onViewDetails: (order: Order) => void;
  onReview: (order: Order) => void;
  orderReviews: Record<string, any[]>;
}

export default function OrderCard({ order, onViewDetails, onReview, orderReviews }: OrderCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800";
      case "PREPARING":
        return "bg-orange-100 text-orange-800";
      case "READY":
        return "bg-green-100 text-green-800";
      case "COMPLETED":
        return "bg-gray-100 text-gray-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "DELIVERED":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Clock className="h-4 w-4" />;
      case "CONFIRMED":
        return <CheckCircle className="h-4 w-4" />;
      case "PREPARING":
        return <ChefHat className="h-4 w-4" />;
      case "READY":
        return <Truck className="h-4 w-4" />;
      case "COMPLETED":
        return <CheckCircle className="h-4 w-4" />;
      case "CANCELLED":
        return <Package className="h-4 w-4" />;
      case "DELIVERED":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const reviews = orderReviews[order.mealId ?? ""] ?? [];
  const hasReview = reviews.length > 0;
  const canReview = order.status === "DELIVERED";

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-gray-900">Order #{order.orderNumber}</p>
            <p className="text-sm text-gray-500">
              Placed on{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <Badge className={getStatusColor(order.status)}>
            {getStatusIcon(order.status)}
            <span className="ml-1">{order.status}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              x{order.quantity}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900">
                {order.meal?.name ?? "Meal"}
              </p>
              <p className="text-sm text-gray-500">
                ${Number(order.pricePerItem).toFixed(2)}
              </p>
            </div>
          </div>
          <div className="text-sm font-medium text-gray-900">
            ${Number(order.totalAmount).toFixed(2)}
          </div>
        </div>

        {/* Reviews Section */}
        {canReview && hasReview && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Your Review</h4>
            {reviews.map((review: any) => (
              <div key={review.id} className="border-b pb-2 last:border-b-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div key={star} className={`h-4 w-4 ${
                        star <= review.rating ? "text-yellow-500" : "text-gray-300"
                      }`}>
                        ★
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="ml-auto text-xs"
                    onClick={() => onReview(order)}
                  >
                    Delete
                  </Button>
                </div>
                {review.comment && (
                  <p className="text-gray-700 text-sm">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Action Button */}
        <div className="pt-4 flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onViewDetails(order)}
          >
            View Details
          </Button>
          {canReview && (
            <Button
              size="sm"
              variant="outline"
              className="text-xs border-orange-200 text-orange-600 hover:bg-orange-50 bg-white h-7 px-2"
              onClick={() => onReview(order)}
            >
              {hasReview ? "Delete Review" : "Review"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
