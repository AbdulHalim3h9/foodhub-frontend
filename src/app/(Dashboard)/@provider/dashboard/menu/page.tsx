"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Star, 
  Clock, 
  DollarSign, 
  BarChart3,
  Package,
  AlertTriangle,
  ToggleLeft,
  ToggleRight,
  ChefHat,
  X
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
import { getProviderMeals, createMeal, updateMeal, deleteMeal, toggleFeatured } from "@/actions/meal.action";
import { GetMealsParams, MealData } from "@/services/meal.service";
import { getCategories } from "@/actions/category.action";
import { Category } from "@/services/category.service";
import MealForm from "@/components/meal/MealForm";
import { toast } from "sonner";

// Define Meal interface based on backend response
interface Meal {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  ingredients?: string;
  allergens?: string;
  prepTime?: number;
  cuisine?: string;
  isFeatured?: boolean;
  isAvailable?: boolean;
  categoryId?: string | null;
  category?: {
    id: string;
    name: string;
  } | null;
  providerId: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginatedMeals {
  data: Meal[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function ProviderMenu() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  
  // Edit modal state
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch meals on component mount and when filters change
  useEffect(() => {
    fetchMeals();
  }, [searchTerm, selectedCategory]);

  const fetchCategories = async () => {
    setCategoriesLoading(true);
    try {
      console.log("🔍 Fetching categories...");
      const result = await getCategories();
      console.log("📊 Categories result:", result);
      
      if (result.success && result.data) {
        console.log("✅ Categories loaded:", result.data);
        setCategories(result.data);
      } else {
        console.error("❌ Failed to fetch categories:", result.error);
        setCategories([]); // Set empty array instead of hardcoded data
      }
    } catch (err) {
      console.error("❌ Failed to fetch categories:", err);
      setCategories([]); // Set empty array instead of hardcoded data
    } finally {
      setCategoriesLoading(false);
    }
  };

  const fetchMeals = async () => {
    setLoading(true);
    setError(null);
    
    const params: GetMealsParams = {
      search: searchTerm || undefined,
      cuisine: selectedCategory !== "All" ? selectedCategory : undefined,
    };

    try {
      const result = await getProviderMeals(params);
      if (result.success && result.data) {
        setMeals(result.data.data || []);
      } else if (result.needsProfile) {
        // Show profile completion error with link
        setError(
          <div className="flex flex-col gap-2">
            <span>{result.error}</span>
            <a 
              href="/dashboard/profile" 
              className="text-blue-600 hover:text-blue-800 underline font-medium"
            >
              Complete your provider profile →
            </a>
          </div>
        );
      } else {
        setError(result.error || "Failed to fetch provider meals");
      }
    } catch (err) {
      setError("Failed to fetch provider meals");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (isAvailable?: boolean) => {
    if (isAvailable === false) return "bg-gray-100 text-gray-800";
    return "bg-green-100 text-green-800";
  };

  const getStatusText = (isAvailable?: boolean) => {
    if (isAvailable === false) return "Inactive";
    return "Active";
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectAll = () => {
    setSelectedItems(meals.map(item => item.id));
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const handleToggleFeatured = async (mealId: string, isFeatured: boolean) => {
    try {
      await toggleFeatured(mealId, isFeatured);
      fetchMeals(); // Refresh the list
    } catch (error) {
      console.error("Failed to toggle featured status:", error);
    }
  };

  const handleDeleteMeal = async (id: string) => {
    if (!confirm("Are you sure you want to delete this meal?")) return;
    
    try {
      const result = await deleteMeal(id);
      if (result.success) {
        toast.success("Meal deleted successfully");
        fetchMeals();
      } else {
        toast.error(result.error || "Failed to delete meal");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the meal");
    }
  };

  const handleCreateMeal = () => {
    setEditingMeal(null);
    setShowEditModal(true);
  };

  const handleCreateMealSubmit = async (mealData: MealData) => {
    try {
      setIsSubmitting(true);
      const result = await createMeal(mealData);
      
      if (result.success) {
        toast.success("Meal created successfully");
        setShowEditModal(false);
        fetchMeals();
      } else {
        toast.error(result.error || "Failed to create meal");
      }
    } catch (error) {
      toast.error("An error occurred while creating the meal");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditMeal = (meal: Meal) => {
    setEditingMeal(meal);
    setShowEditModal(true);
  };

  const handleUpdateMeal = async (mealData: MealData) => {
    if (!editingMeal) return;
    
    try {
      setIsSubmitting(true);
      const result = await updateMeal(editingMeal.id, mealData);
      
      if (result.success) {
        toast.success("Meal updated successfully");
        setShowEditModal(false);
        setEditingMeal(null);
        fetchMeals();
      } else {
        toast.error(result.error || "Failed to update meal");
      }
    } catch (error) {
      toast.error("An error occurred while updating the meal");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingMeal(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage your restaurant menu items
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 h-10 border-gray-200 focus:border-orange-300 focus:ring-orange-200"
                />
              </div>
              
              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="All" value="All">All</SelectItem>
                  {categoriesLoading ? (
                    <SelectItem disabled>Loading...</SelectItem>
                  ) : (
                    categories.map(category => (
                      <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="p-1"
                >
                  <ToggleLeft className="size-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="p-1"
                >
                  <ToggleRight className="size-4" />
                </Button>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  className="bg-orange-500 hover:bg-orange-600"
                  onClick={handleCreateMeal}
                >
                  <Plus className="size-4 mr-2" />
                  Add New Item
                </Button>
                
                {selectedItems.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      {selectedItems.length} selected
                    </Badge>
                    <Button variant="outline" size="sm" className="border-gray-200">
                      <Edit className="size-4 mr-2" />
                      Edit Selected
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-200 text-red-600">
                      <Trash2 className="size-4 mr-2" />
                      Delete Selected
                    </Button>
                  </div>
                )}
              </div>
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
                <Package className="size-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{meals.length}</p>
                <p className="text-sm text-gray-600">Total Items</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Eye className="size-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{meals.filter(item => item.isAvailable !== false).length}</p>
                <p className="text-sm text-gray-600">Active Items</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <ChefHat className="size-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{meals.filter(item => item.isFeatured).length}</p>
                <p className="text-sm text-gray-600">Featured Items</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <Star className="size-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4.6</p>
                <p className="text-sm text-gray-600">Avg. Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedItems.length === meals.length}
                  onChange={(e) => e.target.checked ? selectAll() : clearSelection()}
                  className="size-4 text-orange-600 focus:ring-orange-500"
                />
                <label className="text-sm text-gray-600 ml-2">
                  Select all ({selectedItems.length} of {meals.length})
                </label>
              </div>
              
              <div className="text-sm text-gray-600">
                Showing {meals.length} items
              </div>
            </div>

            {/* Grid/List View */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-gray-500">Loading meals...</div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-red-500">{error}</div>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {meals.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      {/* Checkbox */}
                      <div className="absolute top-3 left-3 z-10">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleItemSelection(item.id)}
                          className="size-4 text-orange-600 focus:ring-orange-500"
                        />
                      </div>
                      
                      {/* Item Image */}
                      <div className="relative h-48 bg-gray-100">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ChefHat className="size-8" />
                          </div>
                        )}
                        <div className="absolute top-3 right-3 flex flex-col gap-2">
                          {item.isFeatured && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <Star className="size-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Item Details */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="size-3" />
                              {item.prepTime ? `${item.prepTime} min` : "N/A"}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="size-3" />
                              ${Number(item.price).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Category */}
                      <div className="mb-3">
                        <Badge className="bg-blue-100 text-blue-800">
                          {item.category?.name || 'No Category'}
                        </Badge>
                      </div>
                      
                      {/* Ingredients */}
                      <div className="mb-3">
                        <p className="text-xs font-medium text-gray-700 mb-1">Ingredients:</p>
                        <div className="flex flex-wrap gap-1">
                          {item.ingredients ? item.ingredients.split(',').slice(0, 3).map((ingredient, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {ingredient.trim()}
                            </span>
                          )) : (
                            <span className="text-xs text-gray-500">No ingredients listed</span>
                          )}
                          {item.ingredients && item.ingredients.split(',').length > 3 && (
                            <span className="text-xs text-gray-500">+{item.ingredients.split(',').length - 3} more</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Allergens */}
                      <div className="mb-3">
                        <p className="text-xs font-medium text-gray-700 mb-1">Allergens:</p>
                        <div className="flex flex-wrap gap-1">
                          {item.allergens ? item.allergens.split(',').map((allergen, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                              {allergen.trim()}
                            </span>
                          )) : (
                            <span className="text-xs text-gray-500">No allergens listed</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Stats & Actions */}
                      <div className="flex items-center justify-between">
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="size-3 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{item.category?.name || 'No Category'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BarChart3 className="size-3 text-gray-400" />
                            <span className="text-sm text-gray-600">{item.cuisine || 'No Cuisine'}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="border-gray-200">
                            <Eye className="size-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-gray-200"
                            onClick={() => handleEditMeal(item)}
                          >
                            <Edit className="size-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-red-200 text-red-600"
                            onClick={() => handleDeleteMeal(item.id)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {meals.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleItemSelection(item.id)}
                          className="size-4 text-orange-600 focus:ring-orange-500"
                        />
                        
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">No Image</span>
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                            {item.isFeatured && (
                              <Badge className="bg-yellow-100 text-yellow-800">
                                <Star className="size-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="size-3" />
                              {item.prepTime ? `${item.prepTime} min` : "N/A"}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="size-3" />
                              ${Number(item.price).toFixed(2)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="size-3 text-yellow-400 fill-current" />
                              {item.category?.name || 'No Category'}
                            </span>
                            <span className="flex items-center gap-1">
                              <BarChart3 className="size-3 text-gray-400" />
                              {item.cuisine || 'No Cuisine'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-gray-200">
                          <Eye className="size-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-gray-200"
                          onClick={() => handleEditMeal(item)}
                        >
                          <Edit className="size-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-red-200 text-red-600"
                          onClick={() => handleDeleteMeal(item.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                    </div>
                  ))}
                </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit/Create Meal Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {editingMeal ? "Edit Meal" : "Create New Meal"}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCancelEdit}
                >
                  <X className="size-4" />
                </Button>
              </div>
              
              <MealForm
                meal={editingMeal}
                categories={categories}
                onSubmit={editingMeal ? handleUpdateMeal : handleCreateMealSubmit}
                onCancel={handleCancelEdit}
                loading={isSubmitting}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
