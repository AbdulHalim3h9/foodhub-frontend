"use client";

import { useActionState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChefHat,
  Clock,
  DollarSign,
  Plus,
  AlertCircle,
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

import { useEffect, useState } from "react";

// ────────────────────────────────────────────────
// Type for action response (very recommended)
type FormState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
  values?: Partial<typeof initialFormData>; // for repopulating on error
};

// We define initial data outside → easier to reset & type
const initialFormData = {
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
} as const;

export default function CreateMenuItem() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [isPending, startTransition] = useTransition();

  // Modern way — useActionState + form action
  const [state, formAction, isSubmitting] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData): Promise<FormState> => {
      // Optional: you could do light client→server data shaping here

      try {
        const mealData = {
          name: formData.get("name") as string,
          description: (formData.get("description") as string) || undefined,
          price: Number(formData.get("price")),
          image: (formData.get("image") as string) || undefined,
          ingredients: (formData.get("ingredients") as string) || undefined,
          allergens: (formData.get("allergens") as string) || undefined,
          prepTime: formData.get("prepTime")
            ? Number(formData.get("prepTime"))
            : undefined,
          cuisineId: (formData.get("cuisineId") as string) || undefined,
          categoryId: (formData.get("categoryId") as string) || undefined,
          isFeatured: formData.get("isFeatured") === "on",
        };

        // You should do proper validation here (Zod recommended)
        if (!mealData.name?.trim()) {
          return {
            error: "Validation failed",
            fieldErrors: { name: "Meal name is required" },
          };
        }
        if (!mealData.price || isNaN(mealData.price) || mealData.price <= 0) {
          return {
            error: "Validation failed",
            fieldErrors: { price: "Valid price is required" },
          };
        }
        const result = await createMeal(mealData);

        if (!result.success) {
          return { error: result.error ?? "Failed to create meal" };
        }

        // Success → redirect immediately
        router.push("/dashboard/menu");
        router.refresh(); // optional – helps if list is cached

        return { success: true };
      } catch (err) {
        console.error(err);
        return { error: "An unexpected error occurred. Please try again." };
      }
    },
    { success: false } // initial state
  );

  // Load categories (unchanged)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getCategories();
        if (mounted && res.success && res.data) {
          setCategories(res.data);
        }
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        if (mounted) setLoadingCategories(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const isLoading = isPending || isSubmitting || loadingCategories;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Menu
        </Button>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <ChefHat className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Add New Menu Item</h1>
            <p className="text-muted-foreground mt-1">
              Create a delicious new item for your menu
            </p>
          </div>
        </div>
      </div>

      {/* Global messages */}
      {state.error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state.success && (
        <Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertDescription>Menu item created! Redirecting...</AlertDescription>
        </Alert>
      )}

      <form action={formAction} className="space-y-8">
        {/* ─── Basic Information ───────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-blue-600" />
              Basic Information
            </CardTitle>
            <CardDescription>Essential details about your menu item</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Meal Name *</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={state.values?.name ?? ""}
                  placeholder="Classic Burger"
                  required
                  disabled={isLoading}
                  className={state.fieldErrors?.name ? "border-destructive" : ""}
                />
                {state.fieldErrors?.name && (
                  <p className="text-sm text-destructive">{state.fieldErrors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price ($) *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0.01"
                    defaultValue={state.values?.price ?? ""}
                    placeholder="12.99"
                    required
                    disabled={isLoading}
                    className={`pl-10 ${state.fieldErrors?.price ? "border-destructive" : ""}`}
                  />
                </div>
                {state.fieldErrors?.price && (
                  <p className="text-sm text-destructive">{state.fieldErrors.price}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={state.values?.description ?? ""}
                placeholder="Describe your meal..."
                rows={3}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                defaultValue={state.values?.image ?? ""}
                placeholder="https://example.com/image.jpg"
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Direct link to a publicly accessible image
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ─── Category & Cuisine ──────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle>Category & Cuisine</CardTitle>
            <CardDescription>Help customers find your dish</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="categoryId">Category</Label>
                <Select name="categoryId" defaultValue={state.values?.categoryId ?? ""} disabled={isLoading}>
                  <SelectTrigger className={state.fieldErrors?.categoryId ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingCategories ? (
                      <div className="py-6 text-center text-sm text-muted-foreground">
                        Loading categories...
                      </div>
                    ) : categories.length === 0 ? (
                      <div className="py-6 text-center text-sm text-muted-foreground">
                        No categories found
                      </div>
                    ) : (
                      categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                {state.fieldErrors?.categoryId && (
                  <p className="text-sm text-destructive">{state.fieldErrors.categoryId}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cuisineId">Cuisine Type</Label>
                <Input
                  id="cuisineId"
                  name="cuisineId"
                  defaultValue={state.values?.cuisineId ?? ""}
                  placeholder="Italian, Thai, Fusion..."
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isFeatured"
                name="isFeatured"
                defaultChecked={state.values?.isFeatured ?? false}
                disabled={isLoading}
              />
              <Label
                htmlFor="isFeatured"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Feature this item on homepage
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* ─── Additional Details ──────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-600" />
              Additional Details
            </CardTitle>
            <CardDescription>Helpful info for kitchen & customers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="prepTime">Prep Time (minutes)</Label>
                <Input
                  id="prepTime"
                  name="prepTime"
                  type="number"
                  min="0"
                  max="999"
                  defaultValue={state.values?.prepTime ?? ""}
                  placeholder="25"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergens">Allergens</Label>
                <Input
                  id="allergens"
                  name="allergens"
                  defaultValue={state.values?.allergens ?? ""}
                  placeholder="Nuts, Dairy, Shellfish..."
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ingredients">Ingredients</Label>
              <Textarea
                id="ingredients"
                name="ingredients"
                defaultValue={state.values?.ingredients ?? ""}
                placeholder="Beef patty, cheddar, lettuce, tomato, brioche bun..."
                rows={3}
                disabled={isLoading}
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isLoading}
            className="bg-orange-600 hover:bg-orange-700 min-w-[160px]"
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Add Menu Item
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}