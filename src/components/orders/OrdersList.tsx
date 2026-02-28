"use client";

import { useState, useEffect } from "react";
import type { Order, PaginatedOrders } from "@/services/order.service";
import { getMealReviews } from "@/actions/review.action";
import OrderCard from "./OrderCard";

interface OrdersListProps {
  orders: PaginatedOrders | null;
  loading: boolean;
  onViewDetails: (order: Order) => void;
  onReview: (order: Order) => void;
}

export default function OrdersList({
  orders,
  loading,
  onViewDetails,
  onReview,
}: OrdersListProps) {
  const [reviewsByMeal, setReviewsByMeal] = useState<Record<string, any[]>>({});

  useEffect(() => {
    if (!orders?.data?.length) return;

    let isCurrent = true;

    const loadReviews = async () => {
      const mealIds = [...new Set(orders.data.map((o) => o.mealId).filter(Boolean))];

      if (!mealIds.length) return;

      try {
        const promises = mealIds.map(async (mealId) => {
          const res = await getMealReviews(mealId);
          if (res.success && res.data?.data) {
            return [mealId, res.data.data] as const;
          }
          return [mealId, []] as const;
        });

        const results = await Promise.all(promises);
        const map = Object.fromEntries(results);

        if (isCurrent) {
          setReviewsByMeal(map);
        }
      } catch (err) {
        console.error("Failed to load meal reviews:", err);
      }
    };

    loadReviews();

    return () => {
      isCurrent = false;
    };
  }, [orders?.data]);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (!orders?.data?.length) {
    return (
      <div className="text-center py-16 text-gray-500">
        No orders found.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {orders.data.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onViewDetails={onViewDetails}
          onReview={onReview}
          orderReviews={reviewsByMeal}
        />
      ))}
    </div>
  );
}