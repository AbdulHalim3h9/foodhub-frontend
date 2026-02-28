"use client";

import { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getMyProfile, updateProviderProfile } from "@/actions/profile.action";
import { UserProfile } from "@/services/profile.service";
import { toast } from "sonner";

export default function ProviderProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    // User profile fields
    name: "",
    phone: "",
    address: "",
    image: "",
    
    // Provider profile fields
    businessName: "",
    description: "",
    logo: "",
    providerPhone: "",
    providerAddress: "",
    website: "",
    cuisine: "",
    openingHours: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const result = await getMyProfile();
      
      if (result.success && result.data) {
        setProfile(result.data);
        
        // Set form data with both user and provider profile data
        setFormData({
          name: result.data.name || "",
          phone: result.data.phone || "",
          address: result.data.address || "",
          image: result.data.image || "",
          businessName: result.data.providerProfile?.businessName || "",
          description: result.data.providerProfile?.description || "",
          logo: result.data.providerProfile?.logo || "",
          providerPhone: result.data.providerProfile?.phone || "",
          providerAddress: result.data.providerProfile?.address || "",
          website: result.data.providerProfile?.website || "",
          cuisine: result.data.providerProfile?.cuisine || "",
          openingHours: result.data.providerProfile?.openingHours || "",
        });
      } else {
        toast.error(result.error || "Failed to load profile");
      }
    } catch (error) {
      toast.error("Error loading profile");
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

  const handleSave = async () => {
    try {
      setSaving(true);
      
      const updateData = {
        // User profile fields
        name: formData.name || undefined,
        phone: formData.phone || undefined,
        address: formData.address || undefined,
        image: formData.image || undefined,
        
        // Provider profile fields
        businessName: formData.businessName || undefined,
        description: formData.description || undefined,
        logo: formData.logo || undefined,
        providerPhone: formData.providerPhone || undefined,
        providerAddress: formData.providerAddress || undefined,
        website: formData.website || undefined,
        cuisine: formData.cuisine || undefined,
        openingHours: formData.openingHours || undefined,
      };

      const result = await updateProviderProfile(updateData);
      
      if (result.success && result.data) {
        setProfile(result.data);
        setIsEditing(false);
        toast.success("Provider profile updated successfully!");
      } else {
        toast.error(result.error || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'logo') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          [field]: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-6">
              <div className="bg-gray-200 rounded-lg h-64"></div>
              <div className="bg-gray-200 rounded-lg h-64"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Restaurant Profile</h1>
            <div className="flex items-center gap-3">
              {!isEditing ? (
                <Button
                  onClick={toggleEditMode}
                  variant="outline"
                  className="border-gray-200"
                >
                  <Edit className="size-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleSave}
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
                        <Save className="size-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={toggleEditMode}
                    className="border-gray-200"
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User & Restaurant Info */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Restaurant Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Pictures */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User Profile Picture */}
                <div className="text-center">
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Your Photo</Label>
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={formData.image} alt={formData.name} />
                      <AvatarFallback className="text-2xl">
                        {formData.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="w-full">
                      <input
                        type="file"
                        id="user-image"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'image')}
                        className="hidden"
                        disabled={!isEditing}
                      />
                      <Label htmlFor="user-image" className={`cursor-pointer ${!isEditing && 'opacity-50 cursor-not-allowed'}`}>
                        <Button variant="outline" className="w-full" asChild disabled={!isEditing}>
                          <span className="flex items-center gap-2">
                            <Upload className="h-4 w-4" />
                            Upload Photo
                          </span>
                        </Button>
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Restaurant Logo */}
                <div className="text-center">
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Restaurant Logo</Label>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <Avatar className="h-20 w-20 rounded-lg">
                        <AvatarImage src={formData.logo} alt={formData.businessName} />
                        <AvatarFallback className="text-2xl rounded-lg">
                          {formData.businessName?.charAt(0).toUpperCase() || "R"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <div className="w-full">
                      <input
                        type="file"
                        id="restaurant-logo"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'logo')}
                        className="hidden"
                        disabled={!isEditing}
                      />
                      <Label htmlFor="restaurant-logo" className={`cursor-pointer ${!isEditing && 'opacity-50 cursor-not-allowed'}`}>
                        <Button variant="outline" className="w-full" asChild disabled={!isEditing}>
                          <span className="flex items-center gap-2">
                            <Upload className="h-4 w-4" />
                            Upload Logo
                          </span>
                        </Button>
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-t pt-4">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      disabled={!isEditing}
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      value={profile?.email || ""}
                      disabled
                      className="bg-gray-50"
                      placeholder="Email cannot be changed"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>

                  <div>
                    <Label htmlFor="phone">Your Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Your Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      disabled={!isEditing}
                      placeholder="Your address"
                    />
                  </div>
                </div>
              </div>

              {/* Restaurant Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-t pt-4">Restaurant Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessName">Restaurant Name</Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange("businessName", e.target.value)}
                      disabled={!isEditing}
                      placeholder="Restaurant name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="providerPhone">Restaurant Phone</Label>
                    <Input
                      id="providerPhone"
                      value={formData.providerPhone}
                      onChange={(e) => handleInputChange("providerPhone", e.target.value)}
                      disabled={!isEditing}
                      placeholder="Restaurant phone number"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="providerAddress">Restaurant Address</Label>
                    <Input
                      id="providerAddress"
                      value={formData.providerAddress}
                      onChange={(e) => handleInputChange("providerAddress", e.target.value)}
                      disabled={!isEditing}
                      placeholder="Restaurant address"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Restaurant Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    placeholder="Tell customers about your restaurant..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      disabled={!isEditing}
                      placeholder="www.yourrestaurant.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cuisine">Cuisine Type</Label>
                    <Select
                      value={formData.cuisine}
                      onValueChange={(value) => handleInputChange("cuisine", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select cuisine type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="italian">Italian</SelectItem>
                        <SelectItem value="american">American</SelectItem>
                        <SelectItem value="asian">Asian</SelectItem>
                        <SelectItem value="mexican">Mexican</SelectItem>
                        <SelectItem value="indian">Indian</SelectItem>
                        <SelectItem value="mediterranean">Mediterranean</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="openingHours">Opening Hours</Label>
                    <Input
                      id="openingHours"
                      value={formData.openingHours}
                      onChange={(e) => handleInputChange("openingHours", e.target.value)}
                      disabled={!isEditing}
                      placeholder="Mon-Fri: 11AM-10PM, Sat-Sun: 10AM-11PM"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Account Type</Label>
                <Input
                  value={profile?.role || "PROVIDER"}
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

              <div>
                <Label>Provider Status</Label>
                <Input
                  value={profile?.providerProfile?.isActive ? "Active" : "Pending Approval"}
                  className={`bg-gray-50 ${profile?.providerProfile?.isActive ? 'text-green-600' : 'text-yellow-600'}`}
                  disabled
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
