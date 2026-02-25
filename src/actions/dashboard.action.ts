"use server";

import { cookies } from "next/headers";
import { userService } from "@/services/user.service";
import { orderService } from "@/services/order.service";
import { providerService } from "@/services/provider.service";

export async function getDashboardStats() {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("token");
    if (!cookie) {
      return { success: false, error: "Not authenticated" };
    }

    // Fetch data in parallel
    const [usersData, ordersData, providersData] = await Promise.all([
      userService.getAllUsers({ limit: "1000" }, { revalidate: 0 }),
      orderService.getAllOrders({ limit: "1000" }, { revalidate: 0 }),
      providerService.getAllProviders({ limit: "1000" }, { revalidate: 0 }),
    ]);

    const users = usersData.data;
    const orders = ordersData.data;
    const providers = providersData.data;

    // Calculate stats
    const totalOrders = orders.length;
    const activeUsers = users.filter((user: any) => user.status === 'ACTIVE').length;
    const activeProviders = providers.filter((provider: any) => provider.isActive).length;
    
    // Calculate order status breakdown
    const orderStats = orders.reduce((acc: any, order: any) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate user role breakdown
    const userStats = users.reduce((acc: any, user: any) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get recent orders (last 5)
    const recentOrders = orders
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

    // Get top providers by order count
    const providerOrderCounts = orders.reduce((acc: any, order: any) => {
      const providerId = order.provider.id;
      const providerName = order.provider.businessName;
      if (!acc[providerId]) {
        acc[providerId] = {
          id: providerId,
          name: providerName,
          orderCount: 0,
          totalRevenue: 0,
        };
      }
      acc[providerId].orderCount += 1;
      acc[providerId].totalRevenue += Number(order.totalAmount);
      return acc;
    }, {} as Record<string, any>);

    const topProviders = Object.values(providerOrderCounts)
      .sort((a: any, b: any) => b.orderCount - a.orderCount)
      .slice(0, 5);

    return {
      success: true,
      data: {
        totalOrders,
        activeUsers,
        activeProviders,
        orderStats,
        userStats,
        recentOrders,
        topProviders,
      },
    };
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return { success: false, error: "Failed to fetch dashboard stats" };
  }
}
