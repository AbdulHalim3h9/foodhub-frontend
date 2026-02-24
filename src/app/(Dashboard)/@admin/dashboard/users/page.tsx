"use client";

import { useState } from "react";
import {
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Check,
  X,
  Star,
  MapPin,
  Phone,
  Clock,
  Shield,
  User,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data
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
    avatar:
      "https://images.unsplash.com/photo-1568901346375-23c44588c66c?w=100",
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
    avatar:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100",
  },
];

type UserType = (typeof mockUsers)[0];

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200 hover:bg-green-100";
      case "suspended":
        return "bg-red-100 text-red-800 border-red-200 hover:bg-red-100";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "provider":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "customer":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Check className="size-3" />;
      case "suspended":
        return <X className="size-3" />;
      case "inactive":
        return <Clock className="size-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage all users and their permissions
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full sm:w-64 bg-background"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="provider">Provider</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
            </SelectContent>
          </Select>

          <Button className="bg-orange-600 hover:bg-orange-700">
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          label="Active Users"
          value="2"
          icon={<Check className="size-5 text-green-600" />}
          className="bg-green-50/50 border-green-100"
        />
        <StatsCard
          label="Suspended"
          value="1"
          icon={<X className="size-5 text-red-600" />}
          className="bg-red-50/50 border-red-100"
        />
        <StatsCard
          label="Inactive"
          value="1"
          icon={<Clock className="size-5 text-gray-600" />}
          className="bg-gray-50/50 border-gray-100"
        />
        <StatsCard
          label="Total Users"
          value="4"
          icon={<User className="size-5 text-blue-600" />}
          className="bg-blue-50/50 border-blue-100"
        />
      </div>

      {/* Users Table */}
      <Card className="border-none shadow-md">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-[250px]">User</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9 rounded-lg">
                        <AvatarImage
                          src={user.avatar}
                          className="object-cover"
                        />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">
                          {user.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Phone className="size-3" />
                        <span>{user.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="size-3" />
                        <span className="truncate max-w-[120px]">
                          {user.address}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${getRoleColor(user.role)} font-normal capitalize`}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(user.status)} flex w-fit items-center gap-1.5 px-2.5 py-0.5 font-normal capitalize`}
                    >
                      {getStatusIcon(user.status)}
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="size-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium text-sm">{user.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{user.totalOrders}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {user.joinDate}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedUser(user)}
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

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">User Details</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedUser(null)}
                >
                  <X className="size-5" />
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="size-24 mb-4 ring-4 ring-orange-50">
                    <AvatarImage
                      src={selectedUser.avatar}
                      className="object-cover"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg">{selectedUser.name}</h3>
                  <div className="flex gap-2 mt-2">
                    <Badge
                      variant="outline"
                      className={getRoleColor(selectedUser.role)}
                    >
                      {selectedUser.role}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={getStatusColor(selectedUser.status)}
                    >
                      {selectedUser.status}
                    </Badge>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <InfoItem label="Email" value={selectedUser.email} />
                    <InfoItem label="Phone" value={selectedUser.phone} />
                    <InfoItem label="Joined" value={selectedUser.joinDate} />
                    <InfoItem
                      label="Last Login"
                      value={selectedUser.lastLogin}
                    />
                    <InfoItem
                      label="Total Orders"
                      value={`${selectedUser.totalOrders}`}
                    />
                    <InfoItem
                      label="Rating"
                      value={`${selectedUser.rating}/5.0`}
                    />
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground font-medium uppercase mb-1">
                      Address
                    </p>
                    <p className="font-medium text-sm">
                      {selectedUser.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
                <Button variant="outline" onClick={() => setSelectedUser(null)}>
                  Close
                </Button>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Edit User
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
