"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { useSavedDishes } from "@/hooks/use-saved-dishes";
import type { CartItem } from "@/types";
import {
  User,
  CreditCard,
  ShoppingCart,
  Clock,
  History,
  Settings,
  Shield,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Package,
  Truck,
  ChefHat,
  Timer,
  Star,
  Wallet,
  Heart,
  RefreshCw,
} from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
}



export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { cartItems, clearCart, addToCart } = useCart();
  const { savedDishes, removeDish } = useSavedDishes();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const { toast } = useToast();
  const [history, setHistory] = useState<Array<any>>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Stockholm, Sweden",
    joinDate: "2024-01-15",
  });
  
  // Mock payroll balance state
  const [payrollBalance] = useState({
    limit: 500.00,
    consumed: 120.50,
    available: 379.50,
  });

  useEffect(() => {
    const loadData = async () => {
      // Load order history
      const h = localStorage.getItem("ikea-eats-history");
      const parsed = h ? JSON.parse(h) : [];
      setHistory(parsed);

      // Load user profile
      const profile = localStorage.getItem("ikea-eats-profile");
      if (profile) {
        setUserProfile(JSON.parse(profile));
      }
    };

    loadData();
  }, []);

  const saveUserProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem("ikea-eats-profile", JSON.stringify(profile));
  };

  const clearHistory = () => {
    localStorage.removeItem("ikea-eats-history");
    setHistory([]);
  };

  const getOrderStatusInfo = (status: string) => {
    switch (status) {
      case "in-progress":
        return {
          icon: Timer,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          label: "In Progress",
          progress: 25,
        };
      case "confirmed":
        return {
          icon: CheckCircle,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          label: "Confirmed",
          progress: 50,
        };
      case "preparing":
        return {
          icon: ChefHat,
          color: "text-orange-600",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
          label: "Preparing",
          progress: 75,
        };
      case "ready":
        return {
          icon: Package,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          label: "Ready for Pickup",
          progress: 90,
        };
      case "completed":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          label: "Completed",
          progress: 100,
        };
      default:
        return {
          icon: Clock,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          label: "Unknown",
          progress: 0,
        };
    }
  };

  const inProgressOrders = history.filter(
    (o: any) => o.status === "in-progress"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" />
              <AvatarFallback className="text-lg">
                {userProfile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-headline font-bold">
                {userProfile.name}
              </h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Member since{" "}
                {new Date(userProfile.joinDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Back to Menu
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="gap-2">
              <User className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Orders Card */}
              <Card className="border-none shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden relative group">
                <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
                <CardHeader className="pb-2 relative z-10">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-blue-100">
                    <ShoppingCart className="h-4 w-4" />
                    Total Orders
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-4xl font-bold mb-1">{history.length}</div>
                  <p className="text-sm text-blue-100 font-medium">
                    {inProgressOrders.length} in progress
                  </p>
                </CardContent>
              </Card>

              {/* Payroll Balance Card */}
              <Card className="border-none shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white overflow-hidden relative group">
                <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
                <CardHeader className="pb-2 relative z-10">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-emerald-100">
                    <Wallet className="h-4 w-4" />
                    Payroll Balance
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-4xl font-bold mb-1">${payrollBalance.available.toFixed(2)}</div>
                  <div className="flex justify-between text-sm text-emerald-100 font-medium mt-2">
                    <span>Limit: ${payrollBalance.limit.toFixed(2)}</span>
                    <span>Used: ${payrollBalance.consumed.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Saved Dishes Card */}
              <Card className="border-none shadow-lg bg-gradient-to-br from-pink-500 to-pink-600 text-white overflow-hidden relative group">
                <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
                <CardHeader className="pb-2 relative z-10">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-pink-100">
                    <Heart className="h-4 w-4" />
                    Saved Dishes
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-4xl font-bold mb-1">{savedDishes.length}</div>
                  <p className="text-sm text-pink-100 font-medium">
                    Favorite items
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-muted/50 to-transparent">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/orders">
                    <Button variant="outline" className="w-full h-auto flex-col gap-2 py-4 hover:bg-primary/5 hover:border-primary transition-all">
                      <RefreshCw className="h-6 w-6 text-primary" />
                      <span className="text-sm font-medium">Re-order</span>
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline" className="w-full h-auto flex-col gap-2 py-4 hover:bg-primary/5 hover:border-primary transition-all">
                      <ShoppingCart className="h-6 w-6 text-primary" />
                      <span className="text-sm font-medium">Browse Menu</span>
                    </Button>
                  </Link>
                  <Link href="/create-dish">
                    <Button variant="outline" className="w-full h-auto flex-col gap-2 py-4 hover:bg-primary/5 hover:border-primary transition-all">
                      <Plus className="h-6 w-6 text-primary" />
                      <span className="text-sm font-medium">Create Dish</span>
                    </Button>
                  </Link>
                  {cartItems.length > 0 && (
                    <Link href="/checkout">
                      <Button variant="outline" className="w-full h-auto flex-col gap-2 py-4 hover:bg-primary/5 hover:border-primary transition-all">
                        <CreditCard className="h-6 w-6 text-primary" />
                        <span className="text-sm font-medium">Checkout</span>
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Saved Dishes List */}
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-muted/50 to-transparent border-b">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Saved Dishes
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedDishes.length === 0 ? (
                    <div className="col-span-2 text-center py-8 text-muted-foreground">
                      <Heart className="h-12 w-12 mx-auto mb-2 opacity-20" />
                      <p>No saved dishes yet</p>
                    </div>
                  ) : (
                    savedDishes.map((dish) => (
                      <div key={dish.id} className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors relative group">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden shrink-0">
                           <Image
                            src={dish.image || PlaceHolderImages[0].imageUrl}
                            alt={dish.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{dish.name}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-1">{dish.description}</p>
                          <p className="text-sm font-bold text-primary mt-1">${dish.price.toFixed(2)}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => addToCart({
                              id: dish.id,
                              name: dish.name,
                              description: dish.description,
                              price: dish.price,
                              image: dish.image,
                              category: "saved",
                              isAvailable: true
                            })}
                            title="Add to Cart"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeDish(dish.id)}
                            title="Remove"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Current Cart Preview */}
            {cartItems.length > 0 && (
              <Card className="border-none shadow-lg">
                <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5 text-primary" />
                      Current Cart
                    </CardTitle>
                    <Badge variant="secondary" className="font-semibold">
                      {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {cartItems.slice(0, 3).map((item: CartItem) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                            <ShoppingCart className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold">{item.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Qty: {item.quantity}
                            </div>
                          </div>
                        </div>
                        <div className="text-lg font-bold text-primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                    {cartItems.length > 3 && (
                      <p className="text-sm text-muted-foreground text-center py-2">
                        +{cartItems.length - 3} more items
                      </p>
                    )}
                  </div>
                  <Separator className="my-4" />
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => clearCart()}
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Clear Cart
                    </Button>
                    <Link href="/checkout" className="flex-1">
                      <Button className="w-full gap-2 shadow-md hover:shadow-lg transition-all">
                        <CreditCard className="h-4 w-4" />
                        Proceed to Checkout
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-muted/50 to-transparent border-b">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <Input 
                      value={userProfile.name} 
                      onChange={(e) => saveUserProfile({ ...userProfile, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <Input 
                      value={userProfile.email} 
                      onChange={(e) => saveUserProfile({ ...userProfile, email: e.target.value })}
                      className="mt-1"
                      type="email"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <Input 
                      value={userProfile.phone} 
                      onChange={(e) => saveUserProfile({ ...userProfile, phone: e.target.value })}
                      className="mt-1"
                      type="tel"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Address</label>
                    <Input 
                      value={userProfile.address} 
                      onChange={(e) => saveUserProfile({ ...userProfile, address: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                <Separator />
                <div className="flex justify-end">
                  <Button className="gap-2">
                    <Settings className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-muted/50 to-transparent border-b">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <h4 className="font-semibold">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <h4 className="font-semibold">Change Password</h4>
                      <p className="text-sm text-muted-foreground">Update your password regularly</p>
                    </div>
                    <Button variant="outline" size="sm">Change</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <h4 className="font-semibold">Login History</h4>
                      <p className="text-sm text-muted-foreground">View recent login activity</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
