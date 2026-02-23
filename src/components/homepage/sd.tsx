// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Search, Star, ArrowRight, ChefHat, Truck } from "lucide-react";
// import { mealService } from "@/services/meal.service";
// import { categoryService } from "@/services/category.service";
// import { Meal } from "@/types";
// import Image from "next/image";

// interface Category {
//   id: string;
//   name: string;
//   description?: string;
//   image?: string;
// }

// interface HeroSectionProps {
//   searchTerm: string;
//   onSearchChange: (value: string) => void;
// }

// export function HeroSection({ searchTerm, onSearchChange }: HeroSectionProps) {
//   return (
//     <section className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 py-4">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-white text-center">
//           <div className="flex items-center gap-2">
//             <Star className="size-5 fill-white" />
//             <p className="text-base md:text-lg font-semibold">
//               Sign up for free delivery on your first order
//             </p>
//           </div>
//           <Button size="sm" className="bg-white text-orange-600 hover:bg-orange-50">
//             Get Started
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// }

// interface SearchSectionProps {
//   searchTerm: string;
//   onSearchChange: (value: string) => void;
// }

// export function SearchSection({ searchTerm, onSearchChange }: SearchSectionProps) {
//   return (
//     <section className="bg-white py-12">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto text-center">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//             Delicious Food Delivered{" "}
//             <span className="text-orange-600">Fast & Fresh</span>
//           </h1>
//           <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//             Order from your favorite restaurants and get delivery in minutes
//           </p>
//           <div className="relative max-w-2xl mx-auto">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <Input
//               type="text"
//               placeholder="Search for restaurants, cuisines, or dishes..."
//               className="pl-12 pr-4 h-14 text-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
//               value={searchTerm}
//               onChange={(e) => onSearchChange(e.target.value)}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// interface CategoriesSectionProps {
//   categories: Category[];
// }

// export function CategoriesSection({ categories }: CategoriesSectionProps) {
//   return (
//     <section className="bg-slate-50 py-20">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center max-w-2xl mx-auto mb-12">
//           <h2 className="text-3xl font-bold tracking-tight mb-4">
//             Explore by Category
//           </h2>
//           <p className="text-muted-foreground text-lg">
//             Whatever you're craving, we have it. Explore our wide range of
//             cuisines.
//           </p>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//           {categories.slice(0, 6).map((category, index) => {
//             // Define some default colors for categories
//             const colors = [
//               "bg-red-50 text-red-600",
//               "bg-orange-50 text-orange-600", 
//               "bg-yellow-50 text-yellow-600",
//               "bg-green-50 text-green-600",
//               "bg-pink-50 text-pink-600",
//               "bg-emerald-50 text-emerald-600"
//             ];
//             const icons = ["🍕", "🥟", "🍛", "🌮", "🍱", "🥗"];
            
//             return (
//               <Link
//                 key={category.id}
//                 href={`/browse?category=${category.id}`}
//                 className="group relative"
//               >
//                 <div className="h-full border-none shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col items-center justify-center p-6 text-center cursor-pointer rounded-xl bg-white">
//                   {category.image ? (
//                     <div className="relative mb-3">
//                       <Image
//                         src={category.image}
//                         alt={category.name}
//                         width={60}
//                         height={60}
//                         className="rounded-full object-cover"
//                       />
//                     </div>
//                   ) : (
//                     <div
//                       className={`text-4xl mb-3 p-4 rounded-full ${colors[index % colors.length]} transition-colors group-hover:scale-110 duration-300`}
//                     >
//                       {icons[index % icons.length]}
//                     </div>
//                   )}
//                   <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
//                     {category.name}
//                   </h3>
//                   {category.description && (
//                     <p className="text-sm text-muted-foreground line-clamp-2">
//                       {category.description}
//                     </p>
//                   )}
//                 </div>
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// interface FeaturedMealsProps {
//   meals: Meal[];
// }

// export function FeaturedMealsSection({ meals }: FeaturedMealsProps) {
//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(price);
//   };

//   return (
//     <section className="py-20">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold tracking-tight mb-4">
//             Featured Meals
//           </h2>
//           <p className="text-muted-foreground text-lg">
//             Hand-picked delicious meals from top restaurants
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {meals.map((meal) => (
//             <div
//               key={meal.id}
//               className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
//             >
//               <div className="relative aspect-[4/3] overflow-hidden">
//                 <Image
//                   src={meal.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800"}
//                   alt={meal.name}
//                   fill
//                   className="object-cover group-hover:scale-105 transition-transform duration-500"
//                 />
//                 {meal.isFeatured && (
//                   <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600">
//                     Featured
//                   </Badge>
//                 )}
//                 {meal.isVegan && (
//                   <Badge className="absolute top-4 left-4 bg-green-500 hover:bg-green-600">
//                     🌱 Vegan
//                   </Badge>
//                 )}
//               </div>

//               <div className="p-6">
//                 <div className="flex justify-between items-start mb-3">
//                   <div>
//                     <h3 className="font-bold text-xl text-gray-900 group-hover:text-orange-600 transition-colors">
//                       {meal.name}
//                     </h3>
//                     <p className="text-gray-600">
//                       {meal.provider?.name || "Local Restaurant"}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <span className="font-bold text-2xl text-orange-600">
//                       {formatPrice(meal.price)}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
//                   <div className="flex items-center gap-1">
//                     <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
//                     <span className="font-medium text-gray-900">
//                       {meal.reviews && meal.reviews.length > 0
//                         ? (meal.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / meal.reviews.length).toFixed(1)
//                         : "New"
//                       }
//                     </span>
//                     {meal.reviews && meal.reviews.length > 0 && (
//                       <span className="text-xs text-gray-500">({meal.reviews.length})</span>
//                     )}
//                   </div>
//                   {meal.prepTime && (
//                     <span>{meal.prepTime} min</span>
//                   )}
//                 </div>

//                 <Button className="w-full gap-2 group-hover:bg-orange-600 transition-colors">
//                   Order Now
//                   <ArrowRight className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// interface WhyChooseUsProps {}

// export function WhyChooseUsSection({}: WhyChooseUsProps) {
//   return (
//     <section className="bg-gray-50 py-20">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold tracking-tight mb-4">
//             Why Choose FoodHub?
//           </h2>
//           <p className="text-muted-foreground text-lg">
//             We're committed to providing the best food delivery experience
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="text-center">
//             <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <ChefHat className="h-8 w-8 text-orange-600" />
//             </div>
//             <h3 className="text-xl font-semibold mb-3">Quality Food</h3>
//             <p className="text-gray-600">
//               Partnered with top-rated restaurants ensuring delicious, high-quality meals every time.
//             </p>
//           </div>

//           <div className="text-center">
//             <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Truck className="h-8 w-8 text-blue-600" />
//             </div>
//             <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
//             <p className="text-gray-600">
//               Quick delivery times with real-time tracking so you know exactly when your food arrives.
//             </p>
//           </div>

//           <div className="text-center">
//             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Star className="h-8 w-8 text-green-600" />
//             </div>
//             <h3 className="text-xl font-semibold mb-3">Excellent Service</h3>
//             <p className="text-gray-600">
//               24/7 customer support and easy ordering process for a seamless experience.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
