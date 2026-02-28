"use client";

import { useState, useEffect, useCallback } from "react";
import { getCustomerOrders } from "@/actions/order.action";
import { getMealReviews } from "@/actions/review.action";
import type { Order, PaginatedOrders } from "@/services/order.service";
import ReviewModal from "@/components/ReviewModal";
import { OrderCard, OrderDetailsModal, OrdersList } from "@/components/orders";

export default function OrdersPage() {
  const [orders, setOrders] = useState<PaginatedOrders | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [reviewModal, setReviewModal] = useState<{
    open: boolean;
    mealId: string;
    mealName: string;
    existingReview?: { id: string; rating: number; comment: string | null } | null;
  } | null>(null);

  const [reviewsByMeal, setReviewsByMeal] = useState<Record<string, any[]>>({});

  const fetchOrdersAndReviews = useCallback(async () => {
    setLoading(true);
    try {
      const orderRes = await getCustomerOrders();
      if (!orderRes.success || !orderRes.data) {
        console.error(orderRes.error);
        return;
      }

      setOrders(orderRes.data);

      const uniqueMealIds = [...new Set(orderRes.data.data.map((o) => o.mealId))];

      const reviewPromises = uniqueMealIds.map(async (mealId) => {
        const res = await getMealReviews(mealId);
        return res.success && res.data ? [mealId, res.data.data] : [mealId, []];
      });

      const results = await Promise.all(reviewPromises);
      const map = Object.fromEntries(results);
      setReviewsByMeal(map);
    } catch (err) {
      console.error("Failed to load orders/reviews", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrdersAndReviews();
  }, [fetchOrdersAndReviews]);

  const openReviewModal = useCallback(
    (order: Order, isDeleteIntent = false) => {
      const mealId = order.mealId || (order.meal as any)?.id || "";
      const mealName = order.meal?.name || "Meal";

      const review = reviewsByMeal[mealId]?.[0] ?? null;

      setReviewModal({
        open: true,
        mealId,
        mealName,
        existingReview: review,
      });
    },
    [reviewsByMeal]
  );

  const handleReviewSubmittedOrDeleted = useCallback(() => {
    fetchOrdersAndReviews(); // refresh everything
  }, [fetchOrdersAndReviews]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (!orders?.data?.length) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h1>

        <OrdersList
          orders={orders}
          loading={loading}
          onViewDetails={setSelectedOrder}
          onReview={(order) => openReviewModal(order)}
          // You can add onDeleteReview if you want separate trigger
        />

        <OrderDetailsModal
          order={selectedOrder}
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          orderReviews={reviewsByMeal}
        />

        {reviewModal && (
          <ReviewModal
            isOpen={reviewModal.open}
            onClose={() => setReviewModal(null)}
            mealId={reviewModal.mealId}
            mealName={reviewModal.mealName}
            existingReview={reviewModal.existingReview}
            onReviewChange={handleReviewSubmittedOrDeleted}
          />
        )}
      </div>
    </div>
  );
}