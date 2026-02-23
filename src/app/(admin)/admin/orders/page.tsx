// app/admin/orders/page.tsx
// This is a SERVER COMPONENT (no "use client")

import { Suspense } from 'react';
import SearchAndFilter from './SearchAndFilter';      // Client
import OrdersTable from './OrdersTable';              // Client (minimal)
import StatsCards from './StatsCards';                // Server

import ordersData from './orders.json';

// ──────────────────────────────────────────────── Types (same as before)
type OrderStatus = "delivered" | "preparing" | "out-for-delivery" | "cancelled";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  providerName: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  orderDate: string;
  deliveryDate?: string;
  deliveryAddress: string;
  rating: number;
  avatar: string;
}

// Simulate async fetch (replace with real db/api later)
async function getOrders(): Promise<Order[]> {
  // In real app: await db.order.findMany() or fetch(...)
  // For demo we delay a bit to mimic network
  await new Promise(r => setTimeout(r, 400));
  return ordersData as Order[];
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const params = await searchParams;
  const search = (params.q || '').trim().toLowerCase();
  const statusFilter = (params.status || 'all') as OrderStatus | 'all';

  const allOrders = await getOrders();

  // Filter on server — cheap if data isn't millions of rows
  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = !search || [
      order.orderNumber,
      order.customerName,
      order.customerEmail,
      order.providerName,
    ].some(val => val.toLowerCase().includes(search));

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Compute stats from full set (or filtered — your choice)
  const stats = {
    total: allOrders.length,
    delivered: allOrders.filter(o => o.status === 'delivered').length,
    preparing: allOrders.filter(o => o.status === 'preparing').length,
    outForDelivery: allOrders.filter(o => o.status === 'out-for-delivery').length,
    cancelled: allOrders.filter(o => o.status === 'cancelled').length,
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Client part — controls that update URL */}
      <SearchAndFilter initialSearch={search} initialStatus={statusFilter} />

      {/* Server-rendered stats */}
      <StatsCards stats={stats} />

      {/* Suspense in case you add real streaming/fetch later */}
      <Suspense fallback={<div className="h-64 animate-pulse bg-muted/30 rounded-xl" />}>
        <OrdersTable orders={filteredOrders} />
      </Suspense>
    </div>
  );
}