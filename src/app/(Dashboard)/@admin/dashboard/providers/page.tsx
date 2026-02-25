"use client";

import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Phone,
  Calendar,
  Check,
  X,
  Star,
  Eye,
  Edit,
  Trash2,
  Filter,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
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
import { Card, CardContent } from "@/components/ui/card";
import { getProviders } from "@/actions/provider.action";
import { Provider, GetProvidersParams } from "@/services/provider.service";

export default function AdminProviders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      setError(null);

      const params: GetProvidersParams = {
        search: searchTerm || undefined,
        isActive: statusFilter === "active" ? true : statusFilter === "inactive" ? false : undefined,
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      };

      const result = await getProviders(params);

      if (result.success && result.data) {
        setProviders(result.data.data);
        setPagination(result.data.pagination);
      } else {
        setError(result.error ?? "Failed to load providers");
      }

      setLoading(false);
    };

    const debounce = setTimeout(fetchProviders, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm, statusFilter, pagination.page]);

  // Derived stats from actual data
  const totalProviders = providers.length;
  const activeProviders = providers.filter((p) => p.isActive).length;
  const inactiveProviders = providers.filter((p) => !p.isActive).length;

  const getStatusColor = (isActive: boolean) =>
    isActive
      ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-100"
      : "bg-red-100 text-red-800 border-red-200 hover:bg-red-100";

  const getStatusIcon = (isActive: boolean) =>
    isActive ? <Check className="size-3" /> : <X className="size-3" />;

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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          label="Active Providers"
          value={loading ? "—" : String(activeProviders)}
          icon={<Check className="size-5 text-green-600" />}
          className="bg-green-50/50 border-green-100"
        />
        <StatsCard
          label="Inactive Providers"
          value={loading ? "—" : String(inactiveProviders)}
          icon={<X className="size-5 text-red-600" />}
          className="bg-red-50/50 border-red-100"
        />
        <StatsCard
          label="Total Providers"
          value={loading ? "—" : String(totalProviders)}
          icon={<Filter className="size-5 text-blue-600" />}
          className="bg-blue-50/50 border-blue-100"
        />
      </div>

      {/* Providers Table */}
      <Card className="border-none shadow-md">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="size-5 animate-spin" />
              <span>Loading providers…</span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-red-500">
              <AlertCircle className="size-8" />
              <p className="font-medium">{error}</p>
            </div>
          ) : providers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-2 text-muted-foreground">
              <Filter className="size-8" />
              <p className="font-medium">No providers found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="w-[250px]">Provider</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Meals</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {providers.map((provider) => (
                  <TableRow key={provider.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {provider.logo ? (
                          <img
                            src={provider.logo}
                            alt={provider.businessName}
                            className="size-10 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="size-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
                            {provider.businessName.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-foreground">
                            {provider.businessName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {provider.user.email}
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
                        className={`${getStatusColor(provider.isActive)} flex w-fit items-center gap-1.5 px-2.5 py-0.5 font-normal`}
                      >
                        {getStatusIcon(provider.isActive)}
                        <span>{provider.isActive ? "Active" : "Inactive"}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        {provider._count.meals}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        {provider._count.orders}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {new Date(provider.createdAt).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "short", day: "numeric" },
                        )}
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
          )}
        </CardContent>
      </Card>

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
            {pagination.total} providers
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page <= 1}
            >
              <ChevronLeft className="size-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === pagination.page;
                return (
                  <Button
                    key={pageNum}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    className="size-8 p-0"
                    onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              {pagination.totalPages > 5 && (
                <>
                  <span className="px-2 text-sm text-muted-foreground">...</span>
                  <Button
                    variant={pagination.page === pagination.totalPages ? "default" : "outline"}
                    size="sm"
                    className="size-8 p-0"
                    onClick={() => setPagination(prev => ({ ...prev, page: pagination.totalPages }))}
                  >
                    {pagination.totalPages}
                  </Button>
                </>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page >= pagination.totalPages}
            >
              Next
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Provider Details Modal */}
      {selectedProvider && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
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
                  {selectedProvider.logo ? (
                    <img
                      src={selectedProvider.logo}
                      alt={selectedProvider.businessName}
                      className="size-24 rounded-full object-cover mb-4 ring-4 ring-orange-50"
                    />
                  ) : (
                    <div className="size-24 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-3xl mb-4 ring-4 ring-orange-50">
                      {selectedProvider.businessName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <h3 className="font-bold text-lg">
                    {selectedProvider.businessName}
                  </h3>
                  <Badge
                    variant="outline"
                    className={`mt-2 ${getStatusColor(selectedProvider.isActive)}`}
                  >
                    {selectedProvider.isActive ? "Active" : "Inactive"}
                  </Badge>
                  {selectedProvider.description && (
                    <p className="text-xs text-muted-foreground mt-2">
                      {selectedProvider.description}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <InfoItem label="Name" value={selectedProvider.user.name} />
                    <InfoItem
                      label="Email"
                      value={selectedProvider.user.email}
                    />
                    <InfoItem label="Phone" value={selectedProvider.phone} />
                    <InfoItem
                      label="Joined"
                      value={new Date(
                        selectedProvider.createdAt,
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    />
                    <InfoItem
                      label="Meals"
                      value={String(selectedProvider._count.meals)}
                    />
                    <InfoItem
                      label="Total Orders"
                      value={String(selectedProvider._count.orders)}
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
