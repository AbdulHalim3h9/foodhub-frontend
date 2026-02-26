"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getCart, updateItemQuantity, removeItemFromCart, clearCart } from "@/actions/cart.action";
import { CartItem, Cart } from "@/services/cart.service";

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [removing, setRemoving] = useState<string | null>(null);
  const [ordering, setOrdering] = useState<string | null>(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const result = await getCart();
      if (result.success && result.data) {
        setCart(result.data);
      } else {
        console.error("Failed to fetch cart:", result.error);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (mealId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      setUpdating(mealId);
      const result = await updateItemQuantity(mealId, newQuantity);
      if (result.success) {
        // Refresh cart data
        fetchCart();
      } else {
        console.error("Failed to update quantity:", result.error);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setUpdating(null);
    }
  };

  const handleRemoveItem = async (mealId: string) => {
    try {
      setRemoving(mealId);
      const result = await removeItemFromCart(mealId);
      if (result.success) {
        // Refresh cart data
        fetchCart();
      } else {
        console.error("Failed to remove item:", result.error);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setRemoving(null);
    }
  };

  const handleClearCart = async () => {
    if (!cart?.items.length) return;
    
    try {
      const result = await clearCart();
      if (result.success) {
        setCart({ ...cart, items: [], itemCount: 0, total: "0.00" });
      } else {
        console.error("Failed to clear cart:", result.error);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const handleOrderNow = async (mealId: string, mealName: string) => {
    try {
      setOrdering(mealId);
      // Navigate to meal details page with order now trigger
      window.location.href = `/browse/meal/${mealName.toLowerCase().replace(/\s+/g, '-')}?orderNow=true`;
    } catch (error) {
      console.error("Error navigating to order:", error);
    } finally {
      setOrdering(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!cart || !cart.items.length) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any delicious meals yet.
          </p>
          <Button asChild className="bg-orange-500 hover:bg-orange-600">
            <a href="/browse" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Browse Meals
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">
          {cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-3 space-y-4">
          {cart.items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Meal Image */}
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.meal.image}
                      alt={item.meal.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  {/* Meal Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.meal.name}</h3>
                    {item.meal.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {item.meal.description}
                      </p>
                    )}
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Quantity:</span>
                        <div className="flex items-center border rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => handleQuantityChange(item.meal.id, item.quantity - 1)}
                            disabled={updating === item.meal.id || item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="px-3 py-1 text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => handleQuantityChange(item.meal.id, item.quantity + 1)}
                            disabled={updating === item.meal.id}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Price and Actions */}
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-900">
                          ${(Number(item.meal.price) * item.quantity).toFixed(2)}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 w-8"
                            onClick={() => handleRemoveItem(item.meal.id)}
                            disabled={removing === item.meal.id}
                          >
                            {removing === item.meal.id ? (
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-500"></div>
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            className="bg-orange-500 hover:bg-orange-600 text-white h-8 px-3"
                            onClick={() => handleOrderNow(item.meal.id, item.meal.name)}
                            disabled={ordering === item.meal.id}
                          >
                            {ordering === item.meal.id ? (
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                            ) : (
                              <ShoppingBag className="h-4 w-4 mr-2" />
                            )}
                            {ordering === item.meal.id ? 'Ordering...' : 'Order Now'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Clear Cart Button */}
        <div className="lg:col-span-3">
          <Button 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            onClick={handleClearCart}
            disabled={!cart.items.length}
          >
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
