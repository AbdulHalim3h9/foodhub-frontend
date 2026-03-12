"use server";

import { cartService, AddToCartData, Cart } from "@/services/cart.service";
import { revalidatePath } from "next/cache";

// Get full cart with all items
export async function getCart(): Promise<{ success: boolean; data: Cart | null; error: string | null }> {
  try {
    console.log("🛒 Fetching user cart");
    
    const result = await cartService.getCart();

    if (result.error) {
      console.error("❌ Failed to fetch cart:", result.error.message);
      return { 
        success: false, 
        error: result.error.message,
        data: null 
      };
    }

    if (result.data) {
      console.log(`✅ Cart loaded with ${result.data.itemCount} items`);
      return { success: true, data: result.data, error: null };
    } else {
      console.error("❌ No cart data found");
      return { 
        success: false, 
        error: "Cart not found",
        data: null 
      };
    }
  } catch (error) {
    console.error("❌ Unexpected error fetching cart:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch cart",
      data: null 
    };
  }
}

// Get cart count (for navbar badge)
export async function getCartCount(): Promise<{ success: boolean; count: number; error: string | null }> {
  try {
    console.log("🛒 Fetching cart count");
    
    const result = await cartService.getCart();

    if (result.error) {
      console.error("❌ Failed to fetch cart:", result.error.message);
      return { 
        success: false, 
        error: result.error.message,
        count: 0 
      };
    }

    if (result.data) {
      console.log(`✅ Cart loaded with ${result.data.itemCount} items`);
      return { success: true, count: result.data.itemCount, error: null };
    } else {
      console.error("❌ No cart data found");
      return { 
        success: false, 
        error: "Cart not found",
        count: 0 
      };
    }
  } catch (error) {
    console.error("❌ Unexpected error fetching cart:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch cart",
      count: 0 
    };
  }
}

// Add item to cart
export async function addItemToCart(itemData: AddToCartData): Promise<{ success: boolean; data: any; error: string | null }> {
  try {
    console.log(`🛒 Adding item to cart: ${itemData.mealId} (qty: ${itemData.quantity})`);
    
    const result = await cartService.addItemToCart(itemData);

    if (result.error) {
      console.error("❌ Failed to add item to cart:", result.error.message);
      return { 
        success: false, 
        error: result.error.message,
        data: null 
      };
    }

    if (result.data) {
      console.log(`✅ Item added to cart`);
      revalidatePath("/cart");
      revalidatePath("/browse");
      return { success: true, data: result.data, error: null };
    } else {
      console.error("❌ No item data returned");
      return { 
        success: false, 
        error: "Failed to add item to cart",
        data: null 
      };
    }
  } catch (error) {
    console.error("❌ Unexpected error adding item to cart:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to add item to cart",
      data: null 
    };
  }
}

// Update item quantity
export async function updateItemQuantity(mealId: string, quantity: number): Promise<{ success: boolean; data: Cart | null; error: string | null }> {
  try {
    console.log(`🛒 Updating item quantity: ${mealId} (qty: ${quantity})`);
    
    if (quantity <= 0) {
      const result = await removeItemFromCart(mealId);
      return { success: result.success, data: null, error: result.error };
    }
    
    const result = await cartService.updateItemQuantity(mealId, quantity);

    if (result.error) {
      console.error("❌ Failed to update item quantity:", result.error.message);
      return { 
        success: false, 
        error: result.error.message,
        data: null 
      };
    }

    if (result.data) {
      console.log(`✅ Item quantity updated`);
      revalidatePath("/cart");
      return { success: true, data: result.data, error: null };
    } else {
      console.error("❌ No cart data returned");
      return { 
        success: false, 
        error: "Failed to update item quantity",
        data: null 
      };
    }
  } catch (error) {
    console.error("❌ Unexpected error updating item quantity:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to update item quantity",
      data: null 
    };
  }
}

// Remove item from cart
export async function removeItemFromCart(mealId: string): Promise<{ success: boolean; error: string | null }> {
  try {
    console.log(`🛒 Removing item from cart: ${mealId}`);
    
    const result = await cartService.removeItemFromCart(mealId);

    if (result.error) {
      console.error("❌ Failed to remove item from cart:", result.error.message);
      return { 
        success: false, 
        error: result.error.message
      };
    }

    if (result.success) {
      console.log(`✅ Item removed from cart`);
      revalidatePath("/cart");
      revalidatePath("/browse");
      return { success: true, error: null };
    } else {
      console.error("❌ Failed to remove cart item");
      return { 
        success: false, 
        error: "Failed to remove cart item" 
      };
    }
  } catch (error) {
    console.error("❌ Unexpected error removing item from cart:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to remove item from cart" 
    };
  }
}

// Clear entire cart
export async function clearCart(): Promise<{ success: boolean; error: string | null }> {
  try {
    console.log("🛒 Clearing cart");
    
    const result = await cartService.clearCart();

    if (result.error) {
      console.error("❌ Failed to clear cart:", result.error.message);
      return { 
        success: false, 
        error: result.error.message 
      };
    }

    if (result.success) {
      console.log(`✅ Cart cleared successfully`);
      revalidatePath("/cart");
      revalidatePath("/browse");
      return { success: true, error: null };
    } else {
      console.error("❌ Failed to clear cart");
      return { 
        success: false, 
        error: "Failed to clear cart" 
      };
    }
  } catch (error) {
    console.error("❌ Unexpected error clearing cart:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to clear cart" 
    };
  }
}