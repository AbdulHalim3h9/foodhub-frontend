"use client";

import { useState } from "react";
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
  ChefHat
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

// Mock data for menu items
const menuItems = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Fresh mozzarella, tomato sauce, and basil on our homemade dough",
    category: "Pizza",
    price: 12.99,
    status: "active",
    orders: 89,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1593560900405?w=100",
    ingredients: ["Mozzarella", "Tomato Sauce", "Fresh Basil", "Homemade Dough"],
    prepTime: "15-20 min",
    allergens: ["Dairy", "Gluten"],
    stock: 45,
    featured: true,
  },
  {
    id: "2",
    name: "Chicken Pad Thai",
    description: "Traditional Thai stir-fried rice noodles with chicken, vegetables, and our special sauce",
    category: "Asian",
    price: 14.99,
    status: "active",
    orders: 76,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=100",
    ingredients: ["Chicken", "Rice Noodles", "Vegetables", "Special Thai Sauce"],
    prepTime: "20-25 min",
    allergens: ["Soy", "Peanuts"],
    stock: 32,
    featured: false,
  },
  {
    id: "3",
    name: "Classic Burger",
    description: "Juicy beef patty with lettuce, tomato, onion, and our special sauce on a brioche bun",
    category: "Fast Food",
    price: 10.99,
    status: "active",
    orders: 124,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1568901346375-23c44588c66c?w=100",
    ingredients: ["Beef Patty", "Lettuce", "Tomato", "Onion", "Special Sauce", "Brioche Bun"],
    prepTime: "10-15 min",
    allergens: ["Gluten", "Dairy"],
    stock: 8,
    featured: true,
  },
  {
    id: "4",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce, parmesan cheese, croutons, and our house-made caesar dressing",
    category: "Healthy",
    price: 8.99,
    status: "active",
    orders: 58,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100",
    ingredients: ["Romaine Lettuce", "Parmesan Cheese", "Croutons", "Caesar Dressing"],
    prepTime: "5-10 min",
    allergens: ["Dairy", "Eggs"],
    stock: 67,
    featured: false,
  },
  {
    id: "5",
    name: "Spaghetti Carbonara",
    description: "Creamy pasta with bacon, eggs, and parmesan cheese",
    category: "Italian",
    price: 13.99,
    status: "inactive",
    orders: 45,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1608896657426-735412fbb4b2?w=100",
    ingredients: ["Spaghetti", "Bacon", "Eggs", "Parmesan Cheese", "Black Pepper"],
    prepTime: "18-22 min",
    allergens: ["Dairy", "Eggs", "Gluten"],
    stock: 0,
    featured: false,
  },
];

const categories = ["All", "Pizza", "Asian", "Fast Food", "Healthy", "Italian", "Beverages", "Desserts"];

export default function ProviderMenu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStockColor = (stock: number) => {
    if (stock === 0) return "bg-red-100 text-red-800";
    if (stock < 10) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  const getStockText = (stock: number) => {
    if (stock === 0) return "Out of Stock";
    if (stock < 10) return "Low Stock";
    return "In Stock";
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectAll = () => {
    setSelectedItems(filteredItems.map(item => item.id));
  };

  const clearSelection = () => {
    setSelectedItems([]);
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
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
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
                <Button className="bg-orange-500 hover:bg-orange-600">
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
                <p className="text-2xl font-bold text-gray-900">{menuItems.length}</p>
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
                <p className="text-2xl font-bold text-gray-900">{menuItems.filter(item => item.status === 'active').length}</p>
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
                <p className="text-2xl font-bold text-gray-900">{menuItems.filter(item => item.featured).length}</p>
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
                  checked={selectedItems.length === filteredItems.length}
                  onChange={(e) => e.target.checked ? selectAll() : clearSelection()}
                  className="size-4 text-orange-600 focus:ring-orange-500"
                />
                <label className="text-sm text-gray-600 ml-2">
                  Select all ({selectedItems.length} of {filteredItems.length})
                </label>
              </div>
              
              <div className="text-sm text-gray-600">
                Showing {filteredItems.length} items
              </div>
            </div>

            {/* Grid/List View */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
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
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 flex flex-col gap-2">
                          {item.featured && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <Star className="size-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
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
                              {item.prepTime}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="size-3" />
                              {item.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Stock Status */}
                      <div className="mb-3">
                        <Badge className={getStockColor(item.stock)}>
                          {getStockText(item.stock)}
                        </Badge>
                        <span className="text-sm text-gray-600 ml-2">{item.stock} units</span>
                      </div>
                      
                      {/* Ingredients & Allergens */}
                      <div className="mb-3 space-y-2">
                        <div>
                          <p className="text-xs font-medium text-gray-700 mb-1">Ingredients:</p>
                          <div className="flex flex-wrap gap-1">
                            {item.ingredients.slice(0, 3).map((ingredient, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                {ingredient}
                              </span>
                            ))}
                            {item.ingredients.length > 3 && (
                              <span className="text-xs text-gray-500">+{item.ingredients.length - 3} more</span>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs font-medium text-gray-700 mb-1">Allergens:</p>
                          <div className="flex flex-wrap gap-1">
                            {item.allergens.map((allergen, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                                {allergen}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Stats & Actions */}
                      <div className="flex items-center justify-between">
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="size-3 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{item.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BarChart3 className="size-3 text-gray-400" />
                            <span className="text-sm text-gray-600">{item.orders} orders</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="border-gray-200">
                            <Eye className="size-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-gray-200">
                            <Edit className="size-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-red-200 text-red-600">
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
                {filteredItems.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleItemSelection(item.id)}
                          className="size-4 text-orange-600 focus:ring-orange-500"
                        />
                        
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                            {item.featured && (
                              <Badge className="bg-yellow-100 text-yellow-800">
                                <Star className="size-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                            <Badge className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                            <Badge className={getStockColor(item.stock)}>
                              {getStockText(item.stock)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="size-3" />
                              {item.prepTime}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="size-3" />
                              {item.price.toFixed(2)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="size-3 text-yellow-400 fill-current" />
                              {item.rating}
                            </span>
                            <span className="flex items-center gap-1">
                              <BarChart3 className="size-3 text-gray-400" />
                              {item.orders} orders
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-gray-200">
                          <Eye className="size-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-200">
                          <Edit className="size-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-red-200 text-red-600">
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
    </div>
  );
}
