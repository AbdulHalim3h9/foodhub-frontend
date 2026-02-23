import { Card, CardContent } from '@/components/ui/card';
import { Check, Clock, Truck, X, Package } from 'lucide-react';

interface Stats {
  total: number;
  delivered: number;
  preparing: number;
  outForDelivery: number;
  cancelled: number;
}

export default function StatsCards({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <StatsCard
        icon={<Check className="text-green-600" />}
        label="Delivered"
        value={stats.delivered}
        className="bg-green-50/50 border-green-100"
      />
      <StatsCard
        icon={<Clock className="text-blue-600" />}
        label="Preparing"
        value={stats.preparing}
        className="bg-blue-50/50 border-blue-100"
      />
      <StatsCard
        icon={<Truck className="text-purple-600" />}
        label="On Way"
        value={stats.outForDelivery}
        className="bg-purple-50/50 border-purple-100"
      />
      <StatsCard
        icon={<X className="text-red-600" />}
        label="Cancelled"
        value={stats.cancelled}
        className="bg-red-50/50 border-red-100"
      />
      <StatsCard
        icon={<Package className="text-orange-600" />}
        label="Total"
        value={stats.total}
        className="bg-orange-50/50 border-orange-100"
      />
    </div>
  );
}

function StatsCard({
  icon,
  label,
  value,
  className = '',
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  className?: string;
}) {
  return (
    <Card className={`border shadow-sm ${className}`}>
      <CardContent className="p-4 flex items-center gap-4">
        <div className="p-2 bg-white rounded-full shadow-sm">{icon}</div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            {label}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
