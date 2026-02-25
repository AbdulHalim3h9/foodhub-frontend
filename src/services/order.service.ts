import { env } from "../../env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export interface Order {
  id: string;
  status: string;
  totalAmount: string | number; // Comes from Prisma Decimal
  deliveryAddress: string;
  deliveryPhone: string;
  specialInstructions?: string;
  createdAt: string;
  updatedAt: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  provider: {
    id: string;
    businessName: string;
    phone: string;
    user: {
      email: string;
    };
  };
  items: {
    id: string;
    quantity: number;
    price: string | number; // Comes from Prisma Decimal
    meal: {
      id: string;
      name: string;
      price: string | number; // Comes from Prisma Decimal
    };
  }[];
}

export interface PaginatedOrders {
  data: Order[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GetOrdersParams {
  search?: string;
  status?: string;
  customerId?: string;
  providerId?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface ServiceOptions {
  revalidate?: number;
  tags?: string[];
}

class OrderService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_URL}/admin/orders`;
  }

  async getAllOrders(
    params?: GetOrdersParams,
    options?: ServiceOptions,
  ): Promise<PaginatedOrders> {
    console.log("Fetching orders with params:", params);
    const searchParams = new URLSearchParams();

    if (params?.search) searchParams.append("search", params.search);
    if (params?.status) searchParams.append("status", params.status);
    if (params?.customerId) searchParams.append("customerId", params.customerId);
    if (params?.providerId) searchParams.append("providerId", params.providerId);
    if (params?.page) searchParams.append("page", params.page);
    if (params?.limit) searchParams.append("limit", params.limit);
    if (params?.sortBy) searchParams.append("sortBy", params.sortBy);
    if (params?.sortOrder) searchParams.append("sortOrder", params.sortOrder);

    const url = searchParams.toString()
      ? `${this.baseUrl}?${searchParams.toString()}`
      : this.baseUrl;
    
    // Build cookie header for server-side requests
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');
    
    console.log("Cookie header:", cookieHeader);
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
      next: {
        revalidate: options?.revalidate ?? 60,
        tags: options?.tags ?? ["orders"],
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.statusText}`);
    }

    return response.json();
  }

  async updateOrderStatus(
    id: string,
    status: string,
    options?: ServiceOptions,
  ): Promise<Order> {
    console.log("Updating order status:", id, status);
    
    // Build cookie header for server-side requests
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');
    
    const response = await fetch(`${this.baseUrl}/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
      body: JSON.stringify({ status }),
      next: {
        revalidate: options?.revalidate ?? 0,
        tags: options?.tags ?? [`order-${id}`],
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to update order status: ${response.statusText}`);
    }

    return response.json();
  }
}

export const orderService = new OrderService();
