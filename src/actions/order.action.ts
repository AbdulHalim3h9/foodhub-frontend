"use server";

import {
  orderService,
  GetOrdersParams,
} from "@/services/order.service";

export async function getOrders(params: GetOrdersParams = {}) {
  try {
    const result = await orderService.getAllOrders(params, {
      revalidate: 60,
      tags: ["orders"],
    });
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateOrderStatus(
  id: string,
  status: string
) {
  try {
    const result = await orderService.updateOrderStatus(id, status, {
      revalidate: 0,
      tags: [`order-${id}`],
    });
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to update order status:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}