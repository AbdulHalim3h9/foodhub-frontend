"use server";

import { 
  orderService, 
  Order, 
  PaginatedOrders, 
  CreateOrderData, 
  GetOrdersParams 
} from "@/services/order.service";
import { revalidatePath } from "next/cache";

// Get customer orders (for customer dashboard and public orders page)
export async function getCustomerOrders(): Promise<{ success: boolean; data: PaginatedOrders | null; error: string | null }> {
  try {
    console.log("📦 Fetching customer orders");
    
    const result = await orderService.getOrders(
      undefined,
      { revalidate: 60, tags: ["orders"] }
    );

    if (result.error) {
      console.error("❌ Failed to fetch orders:", result.error.message);
      return { 
        success: false, 
        error: result.error.message,
        data: null 
      };
    }

    if (result.data) {
      console.log(`✅ Orders loaded: ${result.data.data.length} orders`);
      return { success: true, data: result.data, error: null };
    } else {
      console.error("❌ No orders data found");
      return { 
        success: false, 
        error: "Orders not found",
        data: null 
      };
    }
  } catch (error) {
    console.error("❌ Unexpected error fetching orders:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch orders",
      data: null 
    };
  }
}

// Get provider orders (for provider dashboard)
export async function getProviderOrders(params?: GetOrdersParams): Promise<{ success: boolean; data: PaginatedOrders | null; error: string | null }> {
  try {
    console.log("📦 Fetching provider orders");
    
    const result = await orderService.getProviderOrders(params, {
      revalidate: 60,
      tags: ["provider-orders"],
    });

    if (result.error) {
      console.error("❌ Failed to fetch provider orders:", result.error.message);
      return { 
        success: false, 
        error: result.error.message,
        data: null 
      };
    }

    if (result.data) {
      console.log(`✅ Provider orders loaded: ${result.data.data.length} orders`);
      return { success: true, data: result.data, error: null };
    } else {
      console.error("❌ No provider orders data found");
      return { 
        success: false, 
        error: "Provider orders not found",
        data: null 
      };
    }
  } catch (error) {
    console.error("❌ Unexpected error fetching provider orders:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch provider orders",
      data: null 
    };
  }
}

// Get all orders (for admin dashboard)
export async function getAllOrders(params?: GetOrdersParams): Promise<{ success: boolean; data: PaginatedOrders | null; error: string | null }> {
  try {
    console.log("📦 Fetching all orders for admin");
    
    const result = await orderService.getAllOrders(params, {
      revalidate: 60,
      tags: ["orders"],
    });

    if (result.error) {
      console.error("❌ Failed to fetch orders:", result.error.message);
      return { 
        success: false, 
        error: result.error.message,
        data: null 
      };
    }

    if (result.data) {
      console.log(`✅ Orders loaded: ${result.data.data.length} orders`);
      return { success: true, data: result.data, error: null };
    } else {
      console.error("❌ No orders data found");
      return { 
        success: false, 
        error: "Orders not found",
        data: null 
      };
    }
  } catch (error) {
    console.error("❌ Unexpected error fetching orders:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch orders",
      data: null 
    };
  }
}

// Get order details by ID
export async function getOrderDetails(orderId: string): Promise<{ success: boolean; data: Order | null; error: string | null }> {
  try {
    console.log(`📦 Fetching order details: ${orderId}`);
    
    const result = await orderService.getOrderById(
      orderId,
      { revalidate: 60, tags: ["order"] }
    );

    if (result.error) {
      console.error("❌ Failed to fetch order details:", result.error.message);
      return { 
        success: false, 
        error: result.error.message,
        data: null 
      };
    }

    if (result.data) {
      console.log(`✅ Order details loaded: ${result.data.orderNumber}`);
      return { success: true, data: result.data, error: null };
    } else {
      console.error("❌ No order data found");
      return { 
        success: false, 
        error: "Order not found",
        data: null 
      };
    }
  } catch (error) {
    console.error("❌ Unexpected error fetching order details:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch order details",
      data: null 
    };
  }
}

// Create new order
export async function createOrder(orderData: CreateOrderData): Promise<{ success: boolean; data: Order | null; error: string | null }> {
  try {
    console.log(`🛒 Creating order for meal: ${orderData.mealId}, quantity: ${orderData.quantity}`);
    
    const result = await orderService.createOrder(
      orderData,
      { revalidate: 0, tags: ["orders"] }
    );

    if (result.error) {
      console.error("❌ Failed to create order:", result.error.message);
      return { 
        success: false, 
        error: result.error.message,
        data: null 
      };
    }

    if (result.data) {
      console.log(`✅ Order created successfully: ${result.data.orderNumber}`);
      revalidatePath("/orders");
      revalidatePath("/browse");
      return { success: true, data: result.data, error: null };
    } else {
      console.error("❌ No order data returned");
      return { 
        success: false, 
        error: "Failed to create order",
        data: null 
      };
    }
  } catch (error) {
    console.error("❌ Unexpected error creating order:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to create order",
      data: null 
    };
  }
}

// Update order status (for admin/provider)
export async function updateOrderStatus(
  orderId: string,
  status: string
): Promise<{ success: boolean; data: Order | null; error: string | null }> {
  try {
    console.log(`📦 Updating order ${orderId} status to: ${status}`);
    
    const result = await orderService.updateOrderStatus(orderId, status, {
      revalidate: 0,
      tags: [`order-${orderId}`],
    });

    if (result.error) {
      console.error("❌ Failed to update order status:", result.error.message);
      return { 
        success: false, 
        error: result.error.message,
        data: null 
      };
    }

    if (result.data) {
      console.log(`✅ Order status updated successfully`);
      revalidatePath("/orders");
      return { success: true, data: result.data, error: null };
    } else {
      console.error("❌ No order data returned");
      return { 
        success: false, 
        error: "Failed to update order status",
        data: null 
      };
    }
  } catch (error) {
    console.error("❌ Unexpected error updating order status:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to update order status",
      data: null 
    };
  }
}