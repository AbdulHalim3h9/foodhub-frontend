"use client";

import { useState } from "react";
import { Search, Filter, MoreHorizontal, Eye, Edit, Trash2, Check, X, Star, MapPin, Mail, Phone, Calendar } from "lucide-react";
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

// Mock data for providers
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
    avatar: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=100",
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
    avatar: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100",
  },
];

type Provider = typeof mockProviders[0];

export default function AdminProviders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  const filteredProviders = mockProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || provider.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "suspended": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified": return <Check className="size-4" />;
      case "pending": return <Calendar className="size-4" />;
      case "suspended": return <X className="size-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Provider Management</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage and verify food providers on the platform
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  placeholder="Search providers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 h-10 border-gray-200 focus:border-orange-300 focus:ring-orange-200"
                />
              </div>
              
              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Providers</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Actions */}
              <Button className="bg-orange-500 hover:bg-orange-600">
                Add New Provider
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-full">
                <Check className="size-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Verified Providers</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Calendar className="size-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-sm text-gray-600">Pending Verification</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-full">
                <X className="size-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">1</p>
                <p className="text-sm text-gray-600">Suspended</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Filter className="size-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">16</p>
                <p className="text-sm text-gray-600">Total Providers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Providers Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Provider</TableHead>
                  <TableHead className="w-20">Contact</TableHead>
                  <TableHead className="w-16">Status</TableHead>
                  <TableHead className="w-16">Rating</TableHead>
                  <TableHead className="w-16">Orders</TableHead>
                  <TableHead className="w-20">Joined</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProviders.map((provider) => (
                  <TableRow key={provider.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={provider.avatar}
                          alt={provider.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{provider.name}</p>
                          <p className="text-sm text-gray-500">{provider.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Phone className="size-3" />
                          <span>{provider.phone}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="size-3" />
                          <span className="truncate">{provider.address}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(provider.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(provider.status)}
                          <span className="capitalize">{provider.status}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="size-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{provider.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{provider.totalOrders}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{provider.joinedDate}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedProvider(provider)}
                          className="border-orange-200 text-orange-600 hover:bg-orange-50"
                        >
                          <Eye className="size-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-200 text-gray-600 hover:bg-gray-50"
                        >
                          <Edit className="size-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Provider Details Modal */}
      {selectedProvider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Provider Details</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedProvider(null)}
                  className="border-gray-200"
                >
                  <X className="size-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedProvider.avatar}
                    alt={selectedProvider.name}
                    className="w-24 h-24 rounded-lg object-cover mx-auto"
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedProvider.name}</h3>
                    <Badge className={getStatusColor(selectedProvider.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(selectedProvider.status)}
                        <span className="capitalize">{selectedProvider.status}</span>
                      </div>
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Email</p>
                      <p className="text-gray-600">{selectedProvider.email}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Phone</p>
                      <p className="text-gray-600">{selectedProvider.phone}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Address</p>
                      <p className="text-gray-600">{selectedProvider.address}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Joined</p>
                      <p className="text-gray-600">{selectedProvider.joinedDate}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Menu Items</p>
                      <p className="text-gray-600">{selectedProvider.menuItems} items</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Total Orders</p>
                      <p className="text-gray-600">{selectedProvider.totalOrders}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Rating</p>
                      <div className="flex items-center gap-1">
                        <Star className="size-4 text-yellow-400 fill-current" />
                        <span>{selectedProvider.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <Button variant="outline" className="border-gray-200">
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
