"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Check,
  X,
  Star,
  Eye,
  Edit,
  Trash2,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Mock data
const mockProviders = [
  {
    id: "1",
    name: "Mario's Pizza",
    email: "mario@foodhub.com",
    phone: "+1 (555) 123-4567",
    address: "123 Pizza Street, Culinary District, NY 10001",
    status: "verified",
    rating: 4.8,
    totalOrders: 245,
    joinedDate: "2024-01-15",
    menuItems: 12,
    avatar: "https://images.unsplash.com/photo-1555396273-367ea4eb4db7?w=100",
  },
  {
    id: "2",
    name: "Bangkok Kitchen",
    email: "contact@bangkokkitchen.com",
    phone: "+1 (555) 987-6543",
    address: "456 Asian Ave, Food District, NY 10002",
    status: "pending",
    rating: 4.7,
    totalOrders: 189,
    joinedDate: "2024-02-20",
    menuItems: 8,
    avatar:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=100",
  },
  {
    id: "3",
    name: "Burger House",
    email: "info@burgerhouse.com",
    phone: "+1 (555) 246-8135",
    address: "789 Burger Blvd, Fast Food Zone, NY 10003",
    status: "verified",
    rating: 4.5,
    totalOrders: 312,
    joinedDate: "2023-12-10",
    menuItems: 15,
    avatar: "https://images.unsplash.com/photo-1552566626-52f8b828add3?w=100",
  },
  {
    id: "4",
    name: "Green Garden",
    email: "hello@greengarden.com",
    phone: "+1 (555) 369-2580",
    address: "321 Healthy Street, Organic District, NY 10004",
    status: "suspended",
    rating: 4.2,
    totalOrders: 156,
    joinedDate: "2024-03-05",
    menuItems: 6,
    avatar:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100",
  },
];

type Provider = (typeof mockProviders)[0];

export default function AdminProviders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );

  const filteredProviders = mockProviders.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || provider.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800 border-green-200 hover:bg-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100";
      case "suspended":
        return "bg-red-100 text-red-800 border-red-200 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <Check className="size-3" />;
      case "pending":
        return <Calendar className="size-3" />;
      case "suspended":
        return <X className="size-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Provider Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage and verify food providers on the platform
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search providers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full sm:w-64 bg-background"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40 bg-background">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Providers</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>

          <Button className="bg-orange-600 hover:bg-orange-700">
            Add Provider
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          label="Verified Providers"
          value="12"
          icon={<Check className="size-5 text-green-600" />}
          className="bg-green-50/50 border-green-100"
        />
        <StatsCard
          label="Pending Verification"
          value="3"
          icon={<Calendar className="size-5 text-yellow-600" />}
          className="bg-yellow-50/50 border-yellow-100"
        />
        <StatsCard
          label="Suspended"
          value="1"
          icon={<X className="size-5 text-red-600" />}
          className="bg-red-50/50 border-red-100"
        />
        <StatsCard
          label="Total Providers"
          value="16"
          icon={<Filter className="size-5 text-blue-600" />}
          className="bg-blue-50/50 border-blue-100"
        />
      </div>

      {/* Providers Table */}
      <Card className="border-none shadow-md">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-[250px]">Provider</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProviders.map((provider) => (
                <TableRow key={provider.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={provider.avatar}
                        alt={provider.name}
                        className="size-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-foreground">
                          {provider.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {provider.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Phone className="size-3" />
                        <span>{provider.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="size-3" />
                        <span className="truncate max-w-[150px]">
                          {provider.address}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(provider.status)} flex w-fit items-center gap-1.5 px-2.5 py-0.5 font-normal`}
                    >
                      {getStatusIcon(provider.status)}
                      <span className="capitalize">{provider.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="size-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium text-sm">
                        {provider.rating}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{provider.totalOrders}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {provider.joinedDate}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedProvider(provider)}
                        className="h-8 w-8"
                      >
                        <Eye className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Provider Details Modal (Simplified) */}
      {selectedProvider && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          {/* In a real app, use a proper Dialog component */}
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Provider Details</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedProvider(null)}
                >
                  <X className="size-5" />
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={selectedProvider.avatar}
                    className="size-24 rounded-full object-cover mb-4 ring-4 ring-orange-50"
                  />
                  <h3 className="font-bold text-lg">{selectedProvider.name}</h3>
                  <Badge
                    variant="outline"
                    className={`mt-2 ${getStatusColor(selectedProvider.status)}`}
                  >
                    {selectedProvider.status}
                  </Badge>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <InfoItem label="Email" value={selectedProvider.email} />
                    <InfoItem label="Phone" value={selectedProvider.phone} />
                    <InfoItem
                      label="Joined"
                      value={selectedProvider.joinedDate}
                    />
                    <InfoItem
                      label="Menu Items"
                      value={`${selectedProvider.menuItems}`}
                    />
                    <InfoItem
                      label="Total Orders"
                      value={`${selectedProvider.totalOrders}`}
                    />
                    <InfoItem
                      label="Rating"
                      value={`${selectedProvider.rating}/5.0`}
                    />
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground font-medium uppercase mb-1">
                      Address
                    </p>
                    <p className="font-medium text-sm">
                      {selectedProvider.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setSelectedProvider(null)}
                >
                  Close
                </Button>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Manage Provider
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatsCard({
  label,
  value,
  icon,
  className,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={`border shadow-sm flex items-center p-4 gap-4 ${className}`}
    >
      <div className="p-2 bg-white rounded-full shadow-sm">{icon}</div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
          {label}
        </p>
      </div>
    </Card>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground font-medium uppercase">
        {label}
      </p>
      <p className="font-medium text-sm truncate">{value}</p>
    </div>
  );
}
