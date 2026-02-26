"use client";

import React, { useState, useEffect } from "react";
import { User, Phone, MapPin, Camera, Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getMyProfile, updateProfile } from "@/actions/profile.action";
import { UserProfile } from "@/services/profile.service";
import { toast } from "sonner";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    image: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      console.log("🔍 Fetching profile data...");
      const result = await getMyProfile();
      console.log("📊 Profile result:", result);
      
      if (result.success && result.data) {
        console.log("✅ Profile data loaded:", result.data);
        setProfile(result.data);
        setFormData({
          name: result.data.name || "",
          phone: result.data.phone || "",
          address: result.data.address || "",
          image: result.data.image || ""
        });
        console.log("📝 Form data set:", {
          name: result.data.name || "",
          phone: result.data.phone || "",
          address: result.data.address || "",
          image: result.data.image || ""
        });
      } else {
        console.error("❌ Failed to fetch profile:", result.error);
        toast.error(result.error || "Failed to load profile");
        // Set default values even on error
        setFormData({
          name: "",
          phone: "",
          address: "",
          image: ""
        });
      }
    } catch (error) {
      console.error("❌ Error fetching profile:", error);
      toast.error("Error loading profile");
      // Set default values on error
      setFormData({
        name: "",
        phone: "",
        address: "",
        image: ""
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      
      const updateData = {
        name: formData.name,
        phone: formData.phone || undefined,
        address: formData.address || undefined,
        image: formData.image || undefined
      };

      const result = await updateProfile(updateData);
      if (result.success && result.data) {
        setProfile(result.data);
        toast.success("Profile updated successfully!");
      } else {
        console.error("Failed to update profile:", result.error);
        toast.error(result.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a service like Cloudinary
      // For now, we'll use a placeholder URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-6">
            <div className="bg-gray-200 rounded-lg h-64"></div>
            <div className="bg-gray-200 rounded-lg h-64"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">
          Manage your personal information and preferences.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Picture Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={formData.image} alt={formData.name} />
                  <AvatarFallback className="text-2xl">
                    {formData.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                
                <div className="w-full">
                  <input
                    type="file"
                    id="profile-image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Label htmlFor="profile-image" className="cursor-pointer">
                    <Button variant="outline" className="w-full" asChild>
                      <span className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Photo
                      </span>
                    </Button>
                  </Label>
                </div>
                
                <p className="text-sm text-gray-500">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Information Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="pl-10"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      value={profile?.email || ""}
                      className="pl-10 bg-gray-50"
                      disabled
                      placeholder="Email cannot be changed"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Email cannot be changed
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="pl-10"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Delivery Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="pl-10 min-h-[100px] resize-none"
                    placeholder="Enter your delivery address"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid lg:grid-cols-2 gap-4">
                <div>
                  <Label>Account Type</Label>
                  <Input
                    value={profile?.role || "CUSTOMER"}
                    className="bg-gray-50"
                    disabled
                  />
                </div>
                
                <div>
                  <Label>Member Since</Label>
                  <Input
                    value={profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : ""}
                    className="bg-gray-50"
                    disabled
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSaveProfile}
              disabled={saving}
              className="bg-orange-500 hover:bg-orange-600"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
