'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';

type OrderStatus = "delivered" | "preparing" | "out-for-delivery" | "cancelled";

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  providerName: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: OrderStatus;
  orderDate: string;
  deliveryDate?: string;
  deliveryAddress: string;
  rating: number;
  avatar: string;
}

const getStatusStyles = (status: Order['status']) => {
  const styles: Record<Order['status'], string> = {
    delivered: 'bg-green-100 text-green-800 border-green-200',
    preparing: 'bg-blue-100 text-blue-800 border-blue-200',
    'out-for-delivery': 'bg-purple-100 text-purple-800 border-purple-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
  };
  return styles[status];
};

const getStatusIcon = (status: Order['status']) => {
  // You'd import icons here if needed
  const icons = {
    delivered: '✓',
    preparing: '⌛',
    'out-for-delivery': '🚚',
    cancelled: '✗',
  };
  return icons[status];
};

export default function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-64">Customer</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead className="w-36">Status</TableHead>
              <TableHead className="w-28">Total</TableHead>
              <TableHead className="w-32">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id} className="group">
                <TableCell className="p-0">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="block p-4 hover:bg-muted/50 transition-colors h-full"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={order.avatar}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-sm">{order.customerName}</div>
                        <div className="text-xs text-muted-foreground">{order.customerEmail}</div>
                      </div>
                    </div>
                  </Link>
                </TableCell>

                <TableCell>
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="block p-4 hover:bg-muted/50 transition-colors h-full"
                  >
                    {order.providerName}
                  </Link>
                </TableCell>

                <TableCell>
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="block p-4 hover:bg-muted/50 transition-colors h-full"
                  >
                    <Badge
                      variant="outline"
                      className={getStatusStyles(order.status)}
                    >
                      {getStatusIcon(order.status)}{' '}
                      <span className="capitalize">{order.status.replace('-', ' ')}</span>
                    </Badge>
                  </Link>
                </TableCell>

                <TableCell>
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="block p-4 hover:bg-muted/50 transition-colors h-full"
                  >
                    ${order.totalAmount.toFixed(2)}
                  </Link>
                </TableCell>

                <TableCell>
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="block p-4 hover:bg-muted/50 transition-colors h-full"
                  >
                    {order.orderDate}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
