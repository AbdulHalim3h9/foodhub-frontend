import { env } from "../../env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export interface OrderItem {
  id: string;
  quantity: number;
  meal: {
    id: string;
    name: string;
    price: string;
    image: string;
  };
  totalPrice: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: "PENDING" | "CONFIRMED" | "PREPARING" | "READY" | "COMPLETED" | "CANCELLED";
  totalAmount: string;
  deliveryAddress: string;
  deliveryPhone: string;
  specialInstructions?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  customer?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  provider?: {
    id: string;
    businessName: string;
    phone: string;
    user: {
      email: string;
    };
  };
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

export interface CreateOrderData {
  items: {
    mealId: string;
    quantity: number;
  }[];
  deliveryAddress: string;
  deliveryPhone: string;
  specialInstructions?: string;
}

export interface GetOrdersParams {
  search?: string;
  page?: string;
  limit?: string;
  sort?: string;
  status?: string;
}

export interface ServiceOptions {
  revalidate?: number;
  tags?: string[];
}

class OrderService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_URL}/orders`;
  }

  async getOrders(params?: GetOrdersParams, options?: ServiceOptions): Promise<{ data: PaginatedOrders | null; error: { message: string } | null }> {
    try {
      const cookieStore = await cookies();
      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join('; ');

      const searchParams = new URLSearchParams();
      
      if (params?.search) searchParams.append('search', params.search);
      if (params?.page) searchParams.append('page', params.page);
      if (params?.limit) searchParams.append('limit', params.limit);
      if (params?.sort) searchParams.append('sort', params.sort);
      if (params?.status) searchParams.append('status', params.status);

      const url = searchParams.toString() 
        ? `${this.baseUrl}?${searchParams.toString()}`
        : this.baseUrl;

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
        return { 
          data: null, 
          error: { message: `Failed to fetch orders: ${response.statusText}` } 
        };
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: { message: error instanceof Error ? error.message : "Something Went Wrong" } 
      };
    }
  }

  async getOrderById(id: string, options?: ServiceOptions): Promise<{ data: Order | null; error: { message: string } | null }> {
    try {
      const cookieStore = await cookies();
      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join('; ');

      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader && { Cookie: cookieHeader }),
        },
        next: {
          revalidate: options?.revalidate ?? 60,
          tags: options?.tags ?? [`order-${id}`],
        },
      });

      if (!response.ok) {
        return { 
          data: null, 
          error: { message: `Failed to fetch order: ${response.statusText}` } 
        };
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: { message: error instanceof Error ? error.message : "Something Went Wrong" } 
      };
    }
  }

  async createOrder(orderData: CreateOrderData, options?: ServiceOptions): Promise<{ data: Order | null; error: { message: string } | null }> {
    try {
      const cookieStore = await cookies();
      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join('; ');

      const response = await fetch(`${this.baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader && { Cookie: cookieHeader }),
        },
        body: JSON.stringify(orderData),
        next: {
          revalidate: options?.revalidate ?? 0,
          tags: options?.tags ?? ["orders"],
        },
      });

      if (!response.ok) {
        return { 
          data: null, 
          error: { message: `Failed to create order: ${response.statusText}` } 
        };
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: { message: error instanceof Error ? error.message : "Something Went Wrong" } 
      };
    }
  }

  async updateOrderStatus(id: string, status: string, options?: ServiceOptions): Promise<{ data: Order | null; error: { message: string } | null }> {
    try {
      const cookieStore = await cookies();
      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join('; ');

      const response = await fetch(`${this.baseUrl}/${id}/status`, {
        method: "PUT",
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
        return { 
          data: null, 
          error: { message: `Failed to update order status: ${response.statusText}` } 
        };
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: { message: error instanceof Error ? error.message : "Something Went Wrong" } 
      };
    }
  }

  // Admin methods
  async getAllOrders(params?: GetOrdersParams, options?: ServiceOptions): Promise<{ data: PaginatedOrders | null; error: { message: string } | null }> {
    // For admin, this might include all orders from all users
    return this.getOrders(params, options);
  }
}

export const orderService = new OrderService();
