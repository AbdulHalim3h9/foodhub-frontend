"use client";

import { useState, useEffect } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MealData } from "@/services/meal.service";
import type { Meal } from "@/types";
import { Category } from "@/services/category.service";
import { Upload, X } from "lucide-react";

interface MealFormProps {
  meal?: Meal | null;
  categories: Category[];
  onSubmit: (data: MealData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function MealForm({ meal, categories, onSubmit, onCancel, loading = false }: MealFormProps) {
  const [formData, setFormData] = useState<MealData>({
    name: "",
    description: "",
    price: 0,
    image: "",
    ingredients: "",
    allergens: "",
    prepTime: 15,
    categoryId: "",
    isFeatured: false,
  });

  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (meal) {
      setFormData({
        name: meal.name || "",
        description: meal.description || "",
        price: meal.price || 0,
        image: meal.image || "",
        ingredients: meal.ingredients || "",
        allergens: meal.allergens || "",
        prepTime: meal.prepTime || 15,
        categoryId: meal.categoryId || "",
        isFeatured: meal.isFeatured || false,
      });
      setImagePreview(meal.image || "");
    }
  }, [meal]);

  const handleInputChange = (field: keyof MealData, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        handleInputChange("image", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const removeImage = () => {
    setImagePreview("");
    handleInputChange("image", "");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Meal Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter meal name"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Describe your meal"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price ($) *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => handleInputChange("price", parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <Label htmlFor="prepTime">Prep Time (minutes)</Label>
            <Input
              id="prepTime"
              type="number"
              min="1"
              value={formData.prepTime}
              onChange={(e) => handleInputChange("prepTime", parseInt(e.target.value) || 15)}
              placeholder="15"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="categoryId">Category</Label>
          <Select
            value={formData.categoryId}
            onValueChange={(value) => handleInputChange("categoryId", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Image Upload */}
      <div className="space-y-4">
        <Label>Meal Image</Label>
        <div className="flex items-center gap-4">
          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Meal preview"
                className="w-24 h-24 object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="absolute -top-2 -right-2 rounded-full p-1 h-6 w-6"
                onClick={removeImage}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <Upload className="h-6 w-6 text-gray-400" />
            </div>
          )}
          
          <div>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Label htmlFor="image" className="cursor-pointer">
              <Button type="button" variant="outline" asChild>
                <span>Upload Image</span>
              </Button>
            </Label>
            <p className="text-xs text-gray-500 mt-1">
              JPG, PNG or GIF. Max size 2MB.
            </p>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="ingredients">Ingredients</Label>
          <Textarea
            id="ingredients"
            value={formData.ingredients}
            onChange={(e) => handleInputChange("ingredients", e.target.value)}
            placeholder="Enter ingredients separated by commas (e.g., tomatoes, cheese, basil)"
            rows={2}
          />
        </div>

        <div>
          <Label htmlFor="allergens">Allergens</Label>
          <Textarea
            id="allergens"
            value={formData.allergens}
            onChange={(e) => handleInputChange("allergens", e.target.value)}
            placeholder="Enter allergens separated by commas (e.g., gluten, dairy, nuts)"
            rows={2}
          />
        </div>
      </div>

      {/* Featured Toggle */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="featured">Featured Meal</Label>
          <p className="text-sm text-gray-500">
            Featured meals appear on the homepage and in special promotions
          </p>
        </div>
        <Switch
          id="featured"
          checked={formData.isFeatured}
          onCheckedChange={(checked) => handleInputChange("isFeatured", checked)}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {meal ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>
              {meal ? "Update Meal" : "Create Meal"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
