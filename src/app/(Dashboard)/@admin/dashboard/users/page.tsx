"use client";

import { useState, useEffect } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  getUsers,
  updateUserStatus,
  deleteUser,
  updateUser,
} from "@/actions/user.action";
import { User as UserType, GetUsersParams } from "@/services/user.service";

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<UserType>>({});
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    const params: GetUsersParams = {
      search: searchTerm || undefined,
      status:
        statusFilter !== "all"
          ? (statusFilter as "active" | "inactive" | "suspended")
          : undefined,
      role:
        roleFilter !== "all"
          ? (roleFilter as "customer" | "provider" | "admin")
          : undefined,
      page: pagination.page.toString(),
      limit: pagination.limit.toString(),
    };

    try {
      const result = await getUsers(params);
      if (result.success && result.data) {
        setUsers(result.data.data);
        setPagination(result.data.pagination);
      } else {
        setError(result.error || "Failed to fetch users");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, statusFilter, roleFilter, pagination.page]);

  const filteredUsers = users; // Backend handles filtering now

  const handleEditUser = (user: UserType) => {
    setSelectedUser(user);
    setIsEditing(false);
    setEditFormData({
      name: user.name,
      phone: user.phone || "",
      address: user.address || "",
      role: user.role,
      status: user.status,
    });
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    try {
      const result = await updateUser(selectedUser.id, editFormData);
      if (result.success) {
        await fetchUsers();
        setSelectedUser(null);
        setIsEditing(false);
        setEditFormData({});
      } else {
        setError(result.error || "Failed to update user");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const result = await deleteUser(userId);
        if (result.success) {
          await fetchUsers(); // Refresh the list
        } else {
          setError(result.error || "Failed to delete user");
        }
      } catch (err) {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleStatusChange = async (
    userId: string,
    newStatus: "active" | "inactive" | "suspended",
  ) => {
    try {
      const result = await updateUserStatus(userId, newStatus);
      if (result.success) {
        await fetchUsers(); // Refresh the list
      } else {
        setError(result.error || "Failed to update user status");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

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
          value={users.filter(u => u.status === 'active').length.toString()}
          icon={<Check className="size-5 text-green-600" />}
          className="bg-green-50/50 border-green-100"
        />
        <StatsCard
          label="Suspended"
          value={users.filter(u => u.status === 'suspended').length.toString()}
          icon={<X className="size-5 text-red-600" />}
          className="bg-red-50/50 border-red-100"
        />
        <StatsCard
          label="Inactive"
          value={users.filter(u => u.status === 'inactive').length.toString()}
          icon={<Clock className="size-5 text-gray-600" />}
          className="bg-gray-50/50 border-gray-100"
        />
        <StatsCard
          label="Total Users"
          value={users.length.toString()}
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
                    <Select
                      value={user.status}
                      onValueChange={(value) =>
                        handleStatusChange(
                          user.id,
                          value as "active" | "inactive" | "suspended",
                        )
                      }
                    >
                      <SelectTrigger
                        className={`${getStatusColor(user.status)} flex w-fit items-center gap-1.5 px-2.5 py-0.5 font-normal capitalize border-0 bg-transparent hover:bg-transparent`}
                      >
                        {getStatusIcon(user.status)}
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">
                          <div className="flex items-center gap-2">
                            <Check className="size-3 text-green-600" />
                            Active
                          </div>
                        </SelectItem>
                        <SelectItem value="inactive">
                          <div className="flex items-center gap-2">
                            <X className="size-3 text-gray-600" />
                            Inactive
                          </div>
                        </SelectItem>
                        <SelectItem value="suspended">
                          <div className="flex items-center gap-2">
                            <X className="size-3 text-red-600" />
                            Suspended
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEditUser(user)}
                      >
                        <Edit className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteUser(user.id)}
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

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} users
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
              }
              disabled={pagination.page <= 1}
            >
              <ChevronLeft className="size-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from(
                { length: Math.min(5, pagination.totalPages) },
                (_, i) => {
                  const pageNum = i + 1;
                  const isActive = pageNum === pagination.page;
                  return (
                    <Button
                      key={pageNum}
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      className="size-8 p-0"
                      onClick={() =>
                        setPagination((prev) => ({ ...prev, page: pageNum }))
                      }
                    >
                      {pageNum}
                    </Button>
                  );
                },
              )}
              {pagination.totalPages > 5 && (
                <>
                  <span className="px-2 text-sm text-muted-foreground">
                    ...
                  </span>
                  <Button
                    variant={
                      pagination.page === pagination.totalPages
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    className="size-8 p-0"
                    onClick={() =>
                      setPagination((prev) => ({
                        ...prev,
                        page: pagination.totalPages,
                      }))
                    }
                  >
                    {pagination.totalPages}
                  </Button>
                </>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
              }
              disabled={pagination.page >= pagination.totalPages}
            >
              Next
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {isEditing ? "Edit User" : "User Details"}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedUser(null);
                    setIsEditing(false);
                    setEditFormData({});
                  }}
                >
                  <X className="size-5" />
                </Button>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <Input
                        value={editFormData.name || ""}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            name: e.target.value,
                          })
                        }
                        placeholder="Enter name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        value={selectedUser?.email || ""}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone
                      </label>
                      <Input
                        value={editFormData.phone || ""}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            phone: e.target.value,
                          })
                        }
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Address
                      </label>
                      <Input
                        value={editFormData.address || ""}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            address: e.target.value,
                          })
                        }
                        placeholder="Enter address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Role
                      </label>
                      <Select
                        value={editFormData.role || ""}
                        onValueChange={(value) =>
                          setEditFormData({
                            ...editFormData,
                            role: value as "customer" | "provider" | "admin",
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CUSTOMER">Customer</SelectItem>
                          <SelectItem value="PROVIDER">Provider</SelectItem>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Status
                      </label>
                      <Select
                        value={editFormData.status || ""}
                        onValueChange={(value) =>
                          setEditFormData({
                            ...editFormData,
                            status: value as
                              | "active"
                              | "inactive"
                              | "suspended",
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ACTIVE">Active</SelectItem>
                          <SelectItem value="INACTIVE">Inactive</SelectItem>
                          <SelectItem value="SUSPENDED">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ) : (
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
                      <InfoItem
                        label="Phone"
                        value={selectedUser.phone || "Not provided"}
                      />
                      <InfoItem
                        label="Joined"
                        value={selectedUser.joinDate || selectedUser.createdAt}
                      />
                      <InfoItem
                        label="Last Login"
                        value={selectedUser.lastLogin || "Never"}
                      />
                      <InfoItem
                        label="Total Orders"
                        value={`${selectedUser.totalOrders || selectedUser._count?.orders || 0}`}
                      />
                      <InfoItem
                        label="Rating"
                        value={`${selectedUser.rating?.toFixed(1) || "N/A"}`}
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
              )}

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedUser(null);
                    setIsEditing(false);
                    setEditFormData({});
                  }}
                >
                  {isEditing ? "Cancel" : "Close"}
                </Button>
                {isEditing ? (
                  <Button
                    className="bg-orange-600 hover:bg-orange-700"
                    onClick={handleUpdateUser}
                  >
                    Save Changes
                  </Button>
                ) : (
                  <Button
                    className="bg-orange-600 hover:bg-orange-700"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit User
                  </Button>
                )}
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
