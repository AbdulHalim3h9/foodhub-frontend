"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Upload, 
  Plus, 
  X,
  ChefHat,
  Clock,
  DollarSign,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createMeal } from "@/actions/meal.action";
import { getCategories } from "@/actions/category.action";
import { Category } from "@/services/category.service";

export default function CreateMenuItem() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    ingredients: "",
    allergens: "",
    prepTime: "",
    cuisineId: "",
    categoryId: "",
    isFeatured: false,
  });

  // Validation errors
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const result = await getCategories();
        if (result.success && result.data) {
          setCategories(result.data);
        }
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  // Handle form input changes
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Meal name is required";
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      errors.price = "Valid price is required";
    }

    if (!formData.categoryId) {
      errors.categoryId = "Category is required";
    }

    if (formData.prepTime && (parseInt(formData.prepTime) < 0 || parseInt(formData.prepTime) > 999)) {
      errors.prepTime = "Preparation time must be between 0 and 999 minutes";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const mealData = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        price: parseFloat(formData.price),
        image: formData.image.trim() || undefined,
        ingredients: formData.ingredients.trim() || undefined,
        allergens: formData.allergens.trim() || undefined,
        prepTime: formData.prepTime ? parseInt(formData.prepTime) : undefined,
        cuisineId: formData.cuisineId.trim() || undefined,
        isFeatured: formData.isFeatured,
        categoryId: formData.categoryId,
      };

      const result = await createMeal(mealData);

      if (result.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          name: "",
          description: "",
          price: "",
          image: "",
          ingredients: "",
          allergens: "",
          prepTime: "",
          cuisineId: "",
          categoryId: "",
          isFeatured: false,
        });
        
        // Redirect after 2 seconds
        setTimeout(() => {
          router.push("/dashboard/menu");
        }, 2000);
      } else {
        setError(result.error || "Failed to create meal");
      }
    } catch (error) {
      console.error("Error creating meal:", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/dashboard/menu")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Menu
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <ChefHat className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Menu Item</h1>
            <p className="text-gray-600 mt-1">
              Create a delicious new item for your menu
            </p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Menu item created successfully! Redirecting to menu...
          </AlertDescription>
        </Alert>
      )}

      {/* Error Message */}
      {error && (
        <Alert className="mb-6 bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-1 bg-blue-100 rounded">
                <ChefHat className="h-4 w-4 text-blue-600" />
              </div>
              Basic Information
            </CardTitle>
            <CardDescription>
              Essential details about your menu item
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Meal Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g., Classic Burger"
                  className={validationErrors.name ? "border-red-500" : ""}
                />
                {validationErrors.name && (
                  <p className="text-sm text-red-500 mt-1">{validationErrors.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="price">Price ($) *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="12.99"
                    className={`pl-10 ${validationErrors.price ? "border-red-500" : ""}`}
                  />
                </div>
                {validationErrors.price && (
                  <p className="text-sm text-red-500 mt-1">{validationErrors.price}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe your meal, ingredients, cooking style, etc."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleInputChange("image", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter a URL to your meal image
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Category & Cuisine */}
        <Card>
          <CardHeader>
            <CardTitle>Category & Cuisine</CardTitle>
            <CardDescription>
              Organize your menu item
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="categoryId">Category *</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) => handleInputChange("categoryId", value)}
                >
                  <SelectTrigger className={validationErrors.categoryId ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingCategories ? (
                      <div className="p-2 text-center text-sm text-gray-500">
                        Loading categories...
                      </div>
                    ) : categories.length === 0 ? (
                      <div className="p-2 text-center text-sm text-gray-500">
                        No categories available
                      </div>
                    ) : (
                      categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                {validationErrors.categoryId && (
                  <p className="text-sm text-red-500 mt-1">{validationErrors.categoryId}</p>
                )}
              </div>

              <div>
                <Label htmlFor="cuisineId">Cuisine Type</Label>
                <Input
                  id="cuisineId"
                  value={formData.cuisineId}
                  onChange={(e) => handleInputChange("cuisineId", e.target.value)}
                  placeholder="e.g., Italian, Mexican, Chinese"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isFeatured"
                checked={formData.isFeatured}
                onCheckedChange={(checked) => handleInputChange("isFeatured", checked as boolean)}
              />
              <Label htmlFor="isFeatured" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Feature this item on the homepage
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Additional Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-1 bg-green-100 rounded">
                <Clock className="h-4 w-4 text-green-600" />
              </div>
              Additional Details
            </CardTitle>
            <CardDescription>
              Extra information about your meal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="prepTime">Preparation Time (minutes)</Label>
                <Input
                  id="prepTime"
                  type="number"
                  min="0"
                  max="999"
                  value={formData.prepTime}
                  onChange={(e) => handleInputChange("prepTime", e.target.value)}
                  placeholder="e.g., 25"
                  className={validationErrors.prepTime ? "border-red-500" : ""}
                />
                {validationErrors.prepTime && (
                  <p className="text-sm text-red-500 mt-1">{validationErrors.prepTime}</p>
                )}
              </div>

              <div>
                <Label htmlFor="allergens">Allergens</Label>
                <Input
                  id="allergens"
                  value={formData.allergens}
                  onChange={(e) => handleInputChange("allergens", e.target.value)}
                  placeholder="e.g., Nuts, Dairy, Gluten"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="ingredients">Ingredients</Label>
              <Textarea
                id="ingredients"
                value={formData.ingredients}
                onChange={(e) => handleInputChange("ingredients", e.target.value)}
                placeholder="List the main ingredients, separated by commas"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/menu")}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading || loadingCategories}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add Menu Item
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
