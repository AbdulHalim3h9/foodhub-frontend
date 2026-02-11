"use client";

import { useState } from "react";
import { Search, Filter, MoreHorizontal, Eye, Edit, Trash2, Check, X, Star, MapPin, Mail, Phone, Calendar, User, Shield, Clock } from "lucide-react";
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

// Mock data for users
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Apt 4B, New York, NY 10001",
    role: "customer",
    status: "active",
    joinDate: "2024-01-15",
    lastLogin: "2024-02-16",
    totalOrders: 45,
    rating: 4.8,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1fa768068?w=100",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Suite 200, Los Angeles, CA 90001",
    role: "provider",
    status: "active",
    joinDate: "2024-02-20",
    lastLogin: "2024-02-17",
    totalOrders: 189,
    rating: 4.7,
    avatar: "https://images.unsplash.com/photo-149477864529-9c049c437324?w=100",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@email.com",
    phone: "+1 (555) 246-8135",
    address: "789 Highway Rd, Houston, TX 77001",
    role: "customer",
    status: "suspended",
    joinDate: "2023-12-10",
    lastLogin: "2024-02-10",
    totalOrders: 312,
    rating: 4.5,
    avatar: "https://images.unsplash.com/photo-1568901346375-23c44588c66c?w=100",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice.brown@email.com",
    phone: "+1 (555) 369-2580",
    address: "321 Health St, Portland, OR 97201",
    role: "customer",
    status: "inactive",
    joinDate: "2024-03-05",
    lastLogin: "2024-01-15",
    totalOrders: 156,
    rating: 4.2,
    avatar: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100",
  },
];

type User = typeof mockUsers[0];

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "suspended": return "bg-red-100 text-red-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Check className="size-4" />;
      case "suspended": return <X className="size-4" />;
      case "inactive": return <Clock className="size-4" />;
      default: return null;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-purple-100 text-purple-800";
      case "provider": return "bg-blue-100 text-blue-800";
      case "customer": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin": return <Shield className="size-4" />;
      case "provider": return <User className="size-4" />;
      case "customer": return <User className="size-4" />;
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
              <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage all users and their permissions
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
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
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              {/* Role Filter */}
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="provider">Provider</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Actions */}
              <Button className="bg-orange-500 hover:bg-orange-600">
                Add New User
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
              <div className="p-3 bg-green-100 rounded-full">
                <Check className="size-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">2</p>
                <p className="text-sm text-gray-600">Active Users</p>
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
                <p className="text-sm text-gray-600">Suspended Users</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-gray-100 rounded-full">
                <Clock className="size-6 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">1</p>
                <p className="text-sm text-gray-600">Inactive Users</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <User className="size-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4</p>
                <p className="text-sm text-gray-600">Total Users</p>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">User</TableHead>
                  <TableHead className="w-20">Contact</TableHead>
                  <TableHead className="w-16">Role</TableHead>
                  <TableHead className="w-16">Status</TableHead>
                  <TableHead className="w-16">Rating</TableHead>
                  <TableHead className="w-16">Orders</TableHead>
                  <TableHead className="w-20">Joined</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Phone className="size-3" />
                          <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="size-3" />
                          <span className="truncate">{user.address}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleColor(user.role)}>
                        <div className="flex items-center gap-1">
                          {getRoleIcon(user.role)}
                          <span className="capitalize">{user.role}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(user.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(user.status)}
                          <span className="capitalize">{user.status}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="size-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{user.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{user.totalOrders}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{user.joinDate}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedUser(user)}
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

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">User Details</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedUser(null)}
                  className="border-gray-200"
                >
                  <X className="size-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    className="w-24 h-24 rounded-lg object-cover mx-auto"
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedUser.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge className={getRoleColor(selectedUser.role)}>
                        <div className="flex items-center gap-1">
                          {getRoleIcon(selectedUser.role)}
                          <span className="capitalize">{selectedUser.role}</span>
                        </div>
                      </Badge>
                      <Badge className={getStatusColor(selectedUser.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(selectedUser.status)}
                          <span className="capitalize">{selectedUser.status}</span>
                        </div>
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Email</p>
                      <p className="text-gray-600">{selectedUser.email}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Phone</p>
                      <p className="text-gray-600">{selectedUser.phone}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Address</p>
                      <p className="text-gray-600">{selectedUser.address}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Join Date</p>
                      <p className="text-gray-600">{selectedUser.joinDate}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Last Login</p>
                      <p className="text-gray-600">{selectedUser.lastLogin}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Total Orders</p>
                      <p className="text-gray-600">{selectedUser.totalOrders}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Rating</p>
                      <div className="flex items-center gap-1">
                        <Star className="size-4 text-yellow-400 fill-current" />
                        <span>{selectedUser.rating}</span>
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
