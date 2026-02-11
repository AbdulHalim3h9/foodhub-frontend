"use client";

import { useState } from "react";
import { 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  Star, 
  Edit, 
  Camera,
  Save,
  Upload,
  Shield,
  Calendar,
  ShoppingCart,
  Package,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProviderProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    restaurantName: "Mario's Pizza",
    email: "mario@foodhub.com",
    phone: "+1 (555) 123-4567",
    address: "123 Pizza Street, Culinary District, NY 10001",
    description: "Authentic Italian cuisine with fresh ingredients and traditional recipes. Serving the community since 2020 with passion and dedication to quality.",
    cuisine: "italian",
    deliveryRadius: "5",
    minOrder: "15",
    avgPrepTime: "25-30",
    openingHours: "11:00 AM - 10:00 PM",
    logo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db7?w=100",
    website: "www.mariospizza.com",
    socialMedia: {
      facebook: "mariospizza",
      instagram: "@mariospizza_ny",
      twitter: "mariospizza_ny"
    }
  });

  const handleSave = () => {
    console.log("Saving profile:", formData);
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Uploading logo:", file.name);
    }
  };

  const stats = {
    totalRevenue: 4850,
    totalOrders: 245,
    activeItems: 8,
    avgRating: 4.7,
    customers: 1234,
    prepTime: 25,
    orderValue: 19.80
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Restaurant Profile</h1>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "default" : "outline"}
                className={isEditing ? "bg-orange-500 hover:bg-orange-600" : "border-gray-200"}
              >
                {isEditing ? <Save className="size-4 mr-2" /> : <Edit className="size-4 mr-2" />}
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Restaurant Info */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Restaurant Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Logo Upload */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <img
                    src={formData.logo}
                    alt="Restaurant Logo"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
                    <Upload className="size-8 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Restaurant Name
                  </label>
                  <Input
                    value={formData.restaurantName}
                    onChange={(e) => setFormData({...formData, restaurantName: e.target.value})}
                    disabled={!isEditing}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    disabled={!isEditing}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    disabled={!isEditing}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <Input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    disabled={!isEditing}
                    className="w-full"
                    placeholder="www.yourrestaurant.com"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    disabled={!isEditing}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Restaurant Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  placeholder="Tell customers about your restaurant..."
                />
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Social Media
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs text-gray-600">Facebook</label>
                    <Input
                      value={formData.socialMedia.facebook}
                      onChange={(e) => setFormData({
                        ...formData, 
                        socialMedia: {...formData.socialMedia, facebook: e.target.value}
                      })}
                      disabled={!isEditing}
                      placeholder="username"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs text-gray-600">Instagram</label>
                    <Input
                      value={formData.socialMedia.instagram}
                      onChange={(e) => setFormData({
                        ...formData, 
                        socialMedia: {...formData.socialMedia, instagram: e.target.value}
                      })}
                      disabled={!isEditing}
                      placeholder="@username"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs text-gray-600">Twitter</label>
                    <Input
                      value={formData.socialMedia.twitter}
                      onChange={(e) => setFormData({
                        ...formData, 
                        socialMedia: {...formData.socialMedia, twitter: e.target.value}
                      })}
                      disabled={!isEditing}
                      placeholder="@username"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Business Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cuisine Type
                  </label>
                  <Select value={formData.cuisine} disabled={!isEditing}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="italian">Italian</SelectItem>
                      <SelectItem value="asian">Asian</SelectItem>
                      <SelectItem value="american">American</SelectItem>
                      <SelectItem value="mexican">Mexican</SelectItem>
                      <SelectItem value="indian">Indian</SelectItem>
                      <SelectItem value="mediterranean">Mediterranean</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Radius
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={formData.deliveryRadius}
                      onChange={(e) => setFormData({...formData, deliveryRadius: e.target.value})}
                      disabled={!isEditing}
                      className="flex-1"
                      min="1"
                      max="20"
                    />
                    <span className="text-sm text-gray-600">miles</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Order Amount
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">$</span>
                    <Input
                      type="number"
                      value={formData.minOrder}
                      onChange={(e) => setFormData({...formData, minOrder: e.target.value})}
                      disabled={!isEditing}
                      className="flex-1"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Average Prep Time
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={formData.avgPrepTime}
                      onChange={(e) => setFormData({...formData, avgPrepTime: e.target.value})}
                      disabled={!isEditing}
                      className="flex-1"
                      placeholder="e.g., 25-30 min"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Opening Hours
                  </label>
                  <Input
                    value={formData.openingHours}
                    onChange={(e) => setFormData({...formData, openingHours: e.target.value})}
                    disabled={!isEditing}
                    className="w-full"
                    placeholder="e.g., 11:00 AM - 10:00 PM"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Stats */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Performance Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-orange-50 rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-600 mb-4">
                    <DollarSign className="size-6" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-xs text-gray-500 mt-1">All time earnings</p>
                </div>

                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                    <ShoppingCart className="size-6" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-xs text-gray-500 mt-1">All time orders</p>
                </div>

                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                    <Package className="size-6" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeItems}</p>
                  <p className="text-sm text-gray-600">Active Items</p>
                  <p className="text-xs text-gray-500 mt-1">Menu items available</p>
                </div>

                <div className="text-center p-6 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mb-4">
                    <Star className="size-6" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.avgRating}</p>
                  <p className="text-sm text-gray-600">Average Rating</p>
                  <p className="text-xs text-gray-500 mt-1">Based on customer reviews</p>
                </div>

                <div className="text-center p-6 bg-yellow-50 rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 mb-4">
                    <User className="size-6" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.customers.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Customers</p>
                  <p className="text-xs text-gray-500 mt-1">Unique customers served</p>
                </div>

                <div className="text-center p-6 bg-red-50 rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4">
                    <Clock className="size-6" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.prepTime} min</p>
                  <p className="text-sm text-gray-600">Avg. Prep Time</p>
                  <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                </div>

                <div className="text-center p-6 bg-indigo-50 rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                    <DollarSign className="size-6" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">${stats.orderValue.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Avg. Order Value</p>
                  <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                </div>

                <div className="text-center p-6 bg-teal-50 rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 text-teal-600 mb-4">
                    <Shield className="size-6" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">Verified</p>
                  <p className="text-sm text-gray-600">Verification Status</p>
                  <p className="text-xs text-gray-500 mt-1">Restaurant is verified</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={handleSave}
              className="bg-orange-500 hover:bg-orange-600 px-8"
            >
              <Save className="size-4 mr-2" />
              Save Profile
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              className="border-gray-200 px-8"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
