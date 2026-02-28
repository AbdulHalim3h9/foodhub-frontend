"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Heart, 
  Clock, 
  MapPin, 
  Star, 
  ShoppingBag,
  ArrowLeft,
  Share2,
  Plus,
  Minus
} from "lucide-react";
import Image from "next/image";
import { Meal } from "@/types";
import { useRouter } from "next/navigation";
import { getMealById } from "@/actions/meal.action";
import { addItemToCart } from "@/actions/cart.action";
import { createOrder } from "@/actions/order.action";
import { getCurrentUserProfile } from "@/actions/current-user.action";
import { getMealReviews } from "@/actions/review.action";

interface MealDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function MealDetailsPage({ params }: MealDetailsPageProps) {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [orderingNow, setOrderingNow] = useState(false);
  const [cartMessage, setCartMessage] = useState<string | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [orderForm, setOrderForm] = useState({
    deliveryAddress: "",
    deliveryPhone: "",
    specialInstructions: ""
  });
  const router = useRouter();

  const { slug } = React.use(params);

  useEffect(() => {
    fetchMeal();
  }, [slug]);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const result = await getCurrentUserProfile();
        if (result.success && result.data?.role) {
          setCurrentUserRole(result.data.role);
        }
      } catch {
        // ignore
      }
    };

    fetchRole();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!meal) return;
      
      try {
        setLoadingReviews(true);
        const result = await getMealReviews(meal.id);
        if (result.success && result.data) {
          setReviews(result.data.data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [meal]);

  const fetchMeal = async () => {
    try {
      setLoading(true);
      console.log(`🔍 Fetching meal details for: ${slug}`);
      
      const result = await getMealById(slug);
      
      if (result.success && result.data) {
        setMeal(result.data);
        console.log(`✅ Successfully loaded meal: ${result.data.name}`);
      } else {
        console.error("Failed to fetch meal:", result.error);
        setMeal(null);
      }
    } catch (error) {
      console.error("Error fetching meal:", error);
      setMeal(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      setLoadingProfile(true);
      console.log("👤 Fetching user profile...");
      const result = await getCurrentUserProfile();
      console.log("👤 User profile result:", result);
      
      if (result.success && result.data) {
        setUserProfile(result.data);
        console.log("👤 User data:", {
          address: result.data.address,
          phone: result.data.phone
        });
        
        // Pre-fill order form with user's address and phone
        setOrderForm(prev => ({
          ...prev,
          deliveryAddress: result.data.address || "",
          deliveryPhone: result.data.phone || ""
        }));
        
        console.log("👤 Order form updated:", {
          deliveryAddress: result.data.address || "",
          deliveryPhone: result.data.phone || ""
        });
      } else {
        console.error("👤 Failed to fetch user profile:", result.error);
        // Still show modal but with empty form
      }
    } catch (error) {
      console.error("👤 Error fetching user profile:", error);
      // Still show modal but with empty form
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleOrderNow = () => {
    if (!meal) return;

    if (currentUserRole === "PROVIDER" || currentUserRole === "ADMIN") {
      setCartMessage("❌ Providers/Admins cannot place orders. Please login as a customer.");
      setTimeout(() => setCartMessage(null), 3000);
      return;
    }
    
    // Fetch user profile and show order modal
    fetchUserProfile();
    setShowOrderModal(true);
  };

  const handleCreateOrder = async () => {
    if (!meal) return;

    if (currentUserRole === "PROVIDER" || currentUserRole === "ADMIN") {
      setCartMessage("❌ Providers/Admins cannot place orders. Please login as a customer.");
      setTimeout(() => setCartMessage(null), 3000);
      return;
    }
    
    // Validate form
    if (!orderForm.deliveryAddress.trim()) {
      setCartMessage("❌ Delivery address is required");
      setTimeout(() => setCartMessage(null), 3000);
      return;
    }
    
    if (!orderForm.deliveryPhone.trim()) {
      setCartMessage("❌ Delivery phone is required");
      setTimeout(() => setCartMessage(null), 3000);
      return;
    }
    
    try {
      setOrderingNow(true);
      setCartMessage(null);
      
      console.log(`🛒 Creating order: ${meal.name} (qty: ${quantity})`);
      
      // Create order directly
      const result = await createOrder({
        mealId: meal.id,
        quantity,
        deliveryAddress: orderForm.deliveryAddress,
        deliveryPhone: orderForm.deliveryPhone,
        specialInstructions: orderForm.specialInstructions
      });
      
      if (result.success) {
        setCartMessage(`✅ Order placed successfully! Order #${result.data?.orderNumber || 'Created'}`);
        setShowOrderModal(false);
        
        // Reset form and quantity
        setOrderForm({
          deliveryAddress: "",
          deliveryPhone: "",
          specialInstructions: ""
        });
        setQuantity(1);
        
        // Redirect to orders page after 2 seconds
        setTimeout(() => {
          router.push('/orders');
        }, 2000);
      } else {
        setCartMessage(`❌ ${result.error}`);
        setTimeout(() => {
          setCartMessage(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      setCartMessage("❌ Failed to place order");
      setTimeout(() => {
        setCartMessage(null);
      }, 3000);
    } finally {
      setOrderingNow(false);
    }
  };

  const handleAddToOrder = async () => {
    if (!meal) return;

    if (currentUserRole === "PROVIDER" || currentUserRole === "ADMIN") {
      setCartMessage("❌ Providers/Admins cannot add items to cart. Please login as a customer.");
      setTimeout(() => setCartMessage(null), 3000);
      return;
    }
    
    try {
      setAddingToCart(true);
      setCartMessage(null);
      
      console.log(`🛒 Adding to cart: ${meal.name} (qty: ${quantity})`);
      
      const result = await addItemToCart({
        mealId: meal.id,
        quantity: quantity
      });
      
      if (result.success) {
        setCartMessage(`✅ ${meal.name} added to cart!`);
        // Reset quantity after successful addition
        setQuantity(1);
        
        // Clear message after 3 seconds
        setTimeout(() => {
          setCartMessage(null);
        }, 3000);
      } else {
        setCartMessage(`❌ ${result.error}`);
        // Clear error message after 3 seconds
        setTimeout(() => {
          setCartMessage(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setCartMessage("❌ Failed to add to cart");
      setTimeout(() => {
        setCartMessage(null);
      }, 3000);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <p className="mt-4 text-gray-600">Loading meal details...</p>
        </div>
      </div>
    );
  }

  if (!meal) {
    console.log(`❌ Meal not found for slug: ${slug}`);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Meal Not Found</h1>
          <p className="text-gray-600">The meal you're looking for doesn't exist or has been removed.</p>
          <Button 
            onClick={() => router.back()}
            variant="outline"
            className="mt-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFavorite}
                className="flex items-center"
              >
                <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                {isFavorite ? 'Saved' : 'Save'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Meal Info */}
          <div className="space-y-6">
            {/* Image */}
            <Card className="overflow-hidden">
              <div className="relative h-96 bg-gray-50">
                <Image
                  src={meal.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800"}
                  alt={meal.name}
                  fill
                  className="object-cover"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {meal.isFeatured && (
                    <Badge className="bg-orange-500 text-white">
                      Featured
                    </Badge>
                  )}
                  {meal.isVegan && (
                    <Badge className="bg-green-500 text-white">
                      🌱 Vegan
                    </Badge>
                  )}
                </div>
              </div>
            </Card>

            {/* Basic Info */}
            <Card>
              <CardHeader>
                <h1 className="text-3xl font-bold text-gray-900">{meal.name}</h1>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{meal.provider?.name || "Local Restaurant"}</span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{meal.prepTime ? `${meal.prepTime} min` : "20-30 min"}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">
                    {meal.reviews && meal.reviews.length > 0
                      ? (
                        meal.reviews.reduce(
                          (acc: number, review: any) => acc + review.rating,
                          0,
                        ) / meal.reviews.length
                      ).toFixed(1)
                      : "4.5"}
                  </span>
                  {meal.reviews && meal.reviews.length > 0 ? (
                    <span className="text-gray-400 text-sm ml-1">
                      ({meal.reviews.length} reviews)
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm ml-1">(12)</span>
                  )}
                </div>

                <div className="text-2xl font-bold text-gray-900">
                  ${Number(meal.price).toFixed(2)}
                </div>

                <div className="flex gap-2">
                  {meal.cuisine && (
                    <Badge variant="secondary" className="text-xs">
                      {meal.cuisine}
                    </Badge>
                  )}
                  {meal.category?.name && (
                    <Badge variant="secondary" className="text-xs">
                      {meal.category.name}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Description</h2>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {meal.description || "No description available for this meal."}
                </p>
              </CardContent>
            </Card>

            {/* Ingredients */}
            {meal.ingredients && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900">Ingredients</h2>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {meal.ingredients.split(',').map((ingredient, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-3 py-1 bg-gray-50 text-gray-700 text-sm rounded-full border border-gray-100"
                      >
                        {ingredient.trim()}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Allergens */}
            {meal.allergens && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900">Allergens</h2>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {meal.allergens.split(',').map((allergen, index) => (
                      <Badge 
                        key={index} 
                        variant="destructive" 
                        className="text-xs"
                      >
                        {allergen.trim()}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reviews Section */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Customer Reviews</h2>
              </CardHeader>
              <CardContent>
                {loadingReviews ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                  </div>
                ) : reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= review.rating
                                        ? "text-yellow-500 fill-yellow-500"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="font-medium text-gray-900">
                                {review.customer?.name || "Anonymous"}
                              </span>
                              <span className="text-sm text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            {review.comment && (
                              <p className="text-gray-700 mt-2">{review.comment}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No reviews yet. Be the first to review this meal!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Section */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Order This Meal</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Quantity Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <div className="w-16 text-center">
                      <span className="text-lg font-semibold">{quantity}</span>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Price Calculation */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Price per item:</span>
                    <span className="font-semibold">${Number(meal.price).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-semibold">{quantity}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-orange-600">
                      ${(Number(meal.price) * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {/* Cart Message */}
                  {cartMessage && (
                    <div className={`p-3 rounded-lg text-sm text-center ${
                      cartMessage.includes('✅') 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {cartMessage}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-3">
                    {/* Add to Cart Button */}
                    <Button
                      onClick={handleAddToOrder}
                      disabled={addingToCart || orderingNow || currentUserRole === "PROVIDER" || currentUserRole === "ADMIN"}
                      className="h-12 text-base font-semibold"
                      variant="outline"
                    >
                      {addingToCart ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600 mr-2"></div>
                          Adding...
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="h-5 w-5 mr-2" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                    
                    {/* Order Now Button */}
                    <Button
                      onClick={handleOrderNow}
                      disabled={addingToCart || orderingNow || currentUserRole === "PROVIDER" || currentUserRole === "ADMIN"}
                      className="h-12 text-base font-semibold bg-orange-600 hover:bg-orange-700"
                    >
                      {orderingNow ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Ordering...
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="h-5 w-5 mr-2" />
                          Order Now
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={() => router.push('/browse')}
                    className="w-full"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      <Dialog open={showOrderModal} onOpenChange={setShowOrderModal}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Complete Your Order
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2 text-orange-600" />
                Order Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{meal?.name}</span>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-medium">
                    x{quantity}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-orange-200">
                  <span className="font-bold text-gray-900">Total:</span>
                  <span className="text-xl font-bold text-orange-600">
                    ${meal ? (Number(meal.price) * quantity).toFixed(2) : '0.00'}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                Delivery Information
              </h3>
              
              {/* Show current user info status */}
              {loadingProfile ? (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Loading your profile...</p>
                </div>
              ) : userProfile ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800 font-medium mb-2">
                    👤 Your Current Information:
                  </p>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-start">
                      <span className="mr-2">📍</span>
                      <span>
                        <strong>Address:</strong> {userProfile.address || 
                          <span className="text-red-600 font-medium"> Not set</span>}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2">📞</span>
                      <span>
                        <strong>Phone:</strong> {userProfile.phone || 
                          <span className="text-red-600 font-medium"> Not set</span>}
                      </span>
                    </div>
                  </div>
                  {(!userProfile.address || !userProfile.phone) && (
                    <div className="mt-3 p-2 bg-blue-100 rounded text-sm text-blue-700">
                      ⚠️ Please provide your missing information below to complete the order.
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    ⚠️ Unable to load your profile. Please provide your delivery information below.
                  </p>
                </div>
              )}
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="deliveryAddress" className="text-sm font-medium text-gray-700">
                    Delivery Address *
                    {!userProfile?.address && (
                      <span className="text-red-500 ml-1 text-xs">(Required - Not in profile)</span>
                    )}
                  </Label>
                  <Input
                    id="deliveryAddress"
                    placeholder={userProfile?.address ? "Update your delivery address" : "Enter your delivery address"}
                    value={orderForm.deliveryAddress}
                    onChange={(e) => setOrderForm(prev => ({
                      ...prev,
                      deliveryAddress: e.target.value
                    }))}
                    className="h-11"
                  />
                  {userProfile?.address && (
                    <p className="text-xs text-green-600 flex items-center">
                      ✓ Using your saved address
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryPhone" className="text-sm font-medium text-gray-700">
                    Phone Number *
                    {!userProfile?.phone && (
                      <span className="text-red-500 ml-1 text-xs">(Required - Not in profile)</span>
                    )}
                  </Label>
                  <Input
                    id="deliveryPhone"
                    type="tel"
                    placeholder={userProfile?.phone ? "Update your phone number" : "Enter your phone number"}
                    value={orderForm.deliveryPhone}
                    onChange={(e) => setOrderForm(prev => ({
                      ...prev,
                      deliveryPhone: e.target.value
                    }))}
                    className="h-11"
                  />
                  {userProfile?.phone && (
                    <p className="text-xs text-green-600 flex items-center">
                      ✓ Using your saved phone number
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialInstructions" className="text-sm font-medium text-gray-700">
                    Special Instructions <span className="text-gray-400">(Optional)</span>
                  </Label>
                  <Input
                    id="specialInstructions"
                    placeholder="Any special requests or dietary requirements?"
                    value={orderForm.specialInstructions}
                    onChange={(e) => setOrderForm(prev => ({
                      ...prev,
                      specialInstructions: e.target.value
                    }))}
                    className="h-11"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t">
              <Button
                onClick={handleCreateOrder}
                disabled={orderingNow}
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white shadow-lg"
              >
                {orderingNow ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Placing Order...
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Place Order
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowOrderModal(false)}
                className="w-full h-11"
                disabled={orderingNow}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
