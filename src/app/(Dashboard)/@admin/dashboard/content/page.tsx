"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Grid3X3, Plus } from "lucide-react";
import Link from "next/link";
import { AddCategoryDialog } from "./categories/AddCategoryDialog";

export default function ContentManagementPage() {
  const handleCategoryAdded = () => {
    // Refresh the page or update state if needed
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600 mt-2">
            Manage categories across the FoodHub platform
          </p>
        </div>
        <AddCategoryDialog onCategoryAdded={handleCategoryAdded} />
      </div>

      {/* Categories Section */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-blue-500">
                <Grid3X3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Categories</CardTitle>
                <CardDescription>Organize and manage meal categories</CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/content/categories">
                Manage →
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">12</div>
              <p className="text-sm text-gray-600">Total Categories</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">10</div>
              <p className="text-sm text-gray-600">Active</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">156</div>
              <p className="text-sm text-gray-600">Total Meals</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common category management tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-20 flex-col" asChild>
              <Link href="/dashboard/content/categories/new">
                <Grid3X3 className="h-6 w-6 mb-2" />
                Add New Category
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col" asChild>
              <Link href="/dashboard/content/categories">
                <Database className="h-6 w-6 mb-2" />
                Manage All Categories
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest category updates and changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Database className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No recent activity to display</p>
            <p className="text-sm">Category changes will appear here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
