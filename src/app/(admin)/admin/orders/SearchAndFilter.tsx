'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

type OrderStatus = "delivered" | "preparing" | "out-for-delivery" | "cancelled";

// Simple in-memory debounce (or use lodash.debounce)
function useDebounce<T>(value: T, delay = 350): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export default function SearchAndFilter({
  initialSearch,
  initialStatus,
}: {
  initialSearch: string;
  initialStatus: OrderStatus | 'all';
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(initialSearch);
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      params.set('q', debouncedSearch);
    } else {
      params.delete('q');
    }

    // status already managed via Select onValueChange

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Order Management</h1>
        <p className="text-sm text-muted-foreground">Track and manage all customer orders</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 w-full sm:w-64"
          />
        </div>

        <Select
          defaultValue={initialStatus}
          onValueChange={value => {
            const params = new URLSearchParams(searchParams.toString());
            if (value === 'all') {
              params.delete('status');
            } else {
              params.set('status', value);
            }
            router.replace(`?${params.toString()}`, { scroll: false });
          }}
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="preparing">Preparing</SelectItem>
            <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button variant="outline">Export</Button>
          <Button className="bg-orange-600 hover:bg-orange-700">New Order</Button>
        </div>
      </div>
    </div>
  );
}
