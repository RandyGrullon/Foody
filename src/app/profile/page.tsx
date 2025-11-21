"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
import {
  encryptData,
  decryptData,
  safeEncryptData,
  safeDecryptData,
} from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
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
} from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
}

interface SavedCard {
  id: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  cardholder_name: string;
}

export default function ProfilePage() {
  const { cartItems, clearCart } = useCart();
  const { toast } = useToast();
  const [history, setHistory] = useState<Array<any>>([]);
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Stockholm, Sweden",
    joinDate: "2024-01-15",
  });
  const [showCardForm, setShowCardForm] = useState(false);
  const [editingCard, setEditingCard] = useState<SavedCard | null>(null);
  const [newCard, setNewCard] = useState({
    number: "",
    expiry: "",
    cardholder_name: "",
    cvv: "",
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadData = async () => {
      // Load order history
      const h = localStorage.getItem("ikea-eats-history");
      const parsed = h ? JSON.parse(h) : [];
      setHistory(parsed);

      // Load encrypted cards
      const encryptedCards = localStorage.getItem("ikea-eats-cards-encrypted");
      if (encryptedCards) {
        try {
          const decrypted = await safeDecryptData(encryptedCards);
          setCards(JSON.parse(decrypted));
        } catch (error) {
          console.error("Failed to decrypt cards:", error);
          // Try to load unencrypted cards as fallback
          const unencryptedCards = localStorage.getItem("ikea-eats-cards");
          if (unencryptedCards) {
            setCards(JSON.parse(unencryptedCards));
          } else {
            setCards([]);
          }
        }
      }

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

  const addCard = async () => {
    // Validate all fields
    const errors: { [key: string]: string } = {};

    const cardNumberError = validateCardNumber(newCard.number);
    if (cardNumberError) errors.number = cardNumberError;

    const expiryError = validateExpiry(newCard.expiry);
    if (expiryError) errors.expiry = expiryError;

    const cvvError = validateCVV(newCard.cvv, newCard.number);
    if (cvvError) errors.cvv = cvvError;

    const nameError = validateCardholderName(newCard.cardholder_name);
    if (nameError) errors.cardholder_name = nameError;

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const [expMonth, expYear] = newCard.expiry.split("/");
    const card: SavedCard = {
      id: editingCard ? editingCard.id : Date.now().toString(),
      brand: getCardBrand(newCard.number),
      last4: newCard.number.replace(/\s/g, "").slice(-4),
      exp_month: parseInt(expMonth),
      exp_year: parseInt(expYear),
      cardholder_name: newCard.cardholder_name.trim(),
    };

    let updatedCards;
    if (editingCard) {
      // Update existing card
      updatedCards = cards.map((c) => (c.id === editingCard.id ? card : c));
    } else {
      // Add new card
      updatedCards = [...cards, card];
    }

    setCards(updatedCards);

    // Encrypt and save
    try {
      const encrypted = await safeEncryptData(JSON.stringify(updatedCards));
      localStorage.setItem("ikea-eats-cards-encrypted", encrypted);
      toast({
        title: editingCard ? "Card updated" : "Card added",
        description: `Your card ending in ${card.last4} has been ${
          editingCard ? "updated" : "saved"
        } securely.`,
      });
    } catch (error) {
      console.error("Failed to encrypt cards:", error);
      // Fallback: save unencrypted if encryption fails (not recommended for production)
      localStorage.setItem("ikea-eats-cards", JSON.stringify(updatedCards));
      toast({
        title: editingCard ? "Card updated" : "Card added",
        description: `Your card ending in ${card.last4} has been ${
          editingCard ? "updated" : "saved"
        }. Note: Data encryption unavailable.`,
        variant: "destructive",
      });
    }

    setNewCard({ number: "", expiry: "", cardholder_name: "", cvv: "" });
    setFormErrors({});
    setShowCardForm(false);
    setEditingCard(null);
  };

  const editCard = (card: SavedCard) => {
    setEditingCard(card);
    setNewCard({
      number: `**** **** **** ${card.last4}`, // Mask the number for security
      expiry: `${card.exp_month.toString().padStart(2, "0")}/${card.exp_year
        .toString()
        .slice(-2)}`,
      cardholder_name: card.cardholder_name,
      cvv: "", // Don't pre-fill CVV for security
    });
    setShowCardForm(true);
    setFormErrors({});
  };

  const cancelEdit = () => {
    setShowCardForm(false);
    setEditingCard(null);
    setNewCard({ number: "", expiry: "", cardholder_name: "", cvv: "" });
    setFormErrors({});
  };

  const removeCard = async (id: string) => {
    const updated = cards.filter((cc) => cc.id !== id);
    setCards(updated);

    try {
      const encrypted = await safeEncryptData(JSON.stringify(updated));
      localStorage.setItem("ikea-eats-cards-encrypted", encrypted);
      toast({
        title: "Card removed",
        description: "Your card has been removed successfully.",
      });
    } catch (error) {
      console.error("Failed to encrypt cards:", error);
      // Fallback: save unencrypted if encryption fails
      localStorage.setItem("ikea-eats-cards", JSON.stringify(updated));
      toast({
        title: "Card removed",
        description:
          "Your card has been removed. Note: Data encryption unavailable.",
        variant: "destructive",
      });
    }
  };

  const getCardBrand = (number: string): string => {
    const num = number.replace(/\s/g, "");
    if (num.startsWith("4")) return "Visa";
    if (num.startsWith("5") || num.startsWith("2")) return "Mastercard";
    if (num.startsWith("3")) return "American Express";
    return "Unknown";
  };

  // Validation functions
  const validateCardNumber = (number: string): string => {
    const cleaned = number.replace(/\s/g, "");
    if (!cleaned) return "Card number is required";
    if (!/^\d{13,19}$/.test(cleaned)) return "Card number must be 13-19 digits";
    if (!isValidLuhn(cleaned)) return "Invalid card number";
    return "";
  };

  const validateExpiry = (expiry: string): string => {
    if (!expiry) return "Expiry date is required";
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return "Expiry must be in MM/YY format";

    const [month, year] = expiry.split("/");
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    const expMonth = parseInt(month);
    const expYear = parseInt(year);

    if (expMonth < 1 || expMonth > 12) return "Invalid month";
    if (
      expYear < currentYear ||
      (expYear === currentYear && expMonth < currentMonth)
    ) {
      return "Card has expired";
    }
    return "";
  };

  const validateCVV = (cvv: string, cardNumber: string): string => {
    if (!cvv) return "CVV is required";
    const brand = getCardBrand(cardNumber);
    const expectedLength = brand === "American Express" ? 4 : 3;
    if (cvv.length !== expectedLength)
      return `CVV must be ${expectedLength} digits`;
    if (!/^\d+$/.test(cvv)) return "CVV must contain only digits";
    return "";
  };

  const validateCardholderName = (name: string): string => {
    if (!name.trim()) return "Cardholder name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (!/^[a-zA-Z\s]+$/.test(name.trim()))
      return "Name can only contain letters and spaces";
    return "";
  };

  const isValidLuhn = (number: string): boolean => {
    let sum = 0;
    let shouldDouble = false;
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number.charAt(i));
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  // Format functions
  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const match = cleaned.match(/\d{1,4}/g);
    return match ? match.join(" ").substr(0, 19) : cleaned;
  };

  const formatExpiry = (value: string): string => {
    const cleaned = value.replace(/\D+/g, "");
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4);
    }
    return cleaned;
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

              {/* Saved Cards Card */}
              <Card className="border-none shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white overflow-hidden relative group">
                <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
                <CardHeader className="pb-2 relative z-10">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-purple-100">
                    <CreditCard className="h-4 w-4" />
                    Saved Cards
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-4xl font-bold mb-1">{cards.length}</div>
                  <p className="text-sm text-purple-100 font-medium">
                    Securely encrypted
                  </p>
                </CardContent>
              </Card>

              {/* Cart Items Card */}
              <Card className="border-none shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white overflow-hidden relative group">
                <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
                <CardHeader className="pb-2 relative z-10">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-orange-100">
                    <History className="h-4 w-4" />
                    Cart Items
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-4xl font-bold mb-1">{cartItems.length}</div>
                  <p className="text-sm text-orange-100 font-medium">
                    Ready to checkout
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
                      <Clock className="h-6 w-6 text-primary" />
                      <span className="text-sm font-medium">My Orders</span>
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

          <TabsContent value="orders" className="space-y-6">
            <Tabs defaultValue="in-progress" className="w-full">
              <TabsList>
                <TabsTrigger value="in-progress">
                  In Progress ({inProgressOrders.length})
                </TabsTrigger>
                <TabsTrigger value="history">
                  Order History (
                  {history.filter((o) => o.status !== "in-progress").length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="in-progress" className="mt-6">
                {inProgressOrders.length === 0 ? (
                  <Card className="border-dashed border-2">
                    <CardContent className="py-16 text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Clock className="h-10 w-10 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-900">
                        No Active Orders
                      </h3>
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        Your current orders in progress will appear here. Start
                        by browsing our menu and placing an order.
                      </p>
                      <Link href="/">
                        <Button size="lg" className="gap-2">
                          <ChefHat className="h-5 w-5" />
                          Browse Menu
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6">
                    {inProgressOrders.map((order: any) => {
                      const statusInfo = getOrderStatusInfo(order.status);
                      const StatusIcon = statusInfo.icon;

                      return (
                        <Card
                          key={order.id}
                          className="overflow-hidden border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-300 bg-white rounded-lg"
                        >
                          <CardHeader className="pb-4 bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-t-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <ShoppingCart className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                  <CardTitle className="text-lg font-semibold text-gray-900">
                                    Order #{order.code || order.id}
                                  </CardTitle>
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="h-4 w-4" />
                                    {order.createdAt
                                      ? new Date(
                                          order.createdAt
                                        ).toLocaleDateString("en-US", {
                                          month: "short",
                                          day: "numeric",
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })
                                      : ""}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold text-blue-600">
                                  ${order.total?.toFixed(2) || "0.00"}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {order.items?.length || 0} items
                                </div>
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent className="pt-4">
                            {/* Status */}
                            <div className="flex items-center justify-center mb-4">
                              <div
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color} border ${statusInfo.borderColor}`}
                              >
                                <StatusIcon className="h-4 w-4" />
                                {statusInfo.label}
                              </div>
                            </div>

                            {/* Order Items Preview */}
                            <div className="flex items-center gap-4">
                              <div className="flex -space-x-2">
                                {order.items
                                  ?.slice(0, 4)
                                  .map((item: any, idx: number) => {
                                    const img = PlaceHolderImages.find(
                                      (p) => p.id === item.image
                                    );
                                    return img ? (
                                      <div key={idx} className="relative">
                                        <Image
                                          src={img.imageUrl}
                                          alt={item.name}
                                          width={40}
                                          height={32}
                                          className="rounded-md border-2 border-white shadow-sm"
                                        />
                                        {idx === 3 &&
                                          order.items.length > 4 && (
                                            <div className="absolute inset-0 bg-black/70 rounded-md flex items-center justify-center">
                                              <span className="text-white text-sm font-bold">
                                                +{order.items.length - 4}
                                              </span>
                                            </div>
                                          )}
                                      </div>
                                    ) : (
                                      <div
                                        key={idx}
                                        className="w-10 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-md flex items-center justify-center text-xs font-medium text-gray-600 border-2 border-white shadow-sm"
                                      >
                                        {item.name.slice(0, 2).toUpperCase()}
                                      </div>
                                    );
                                  })}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 text-sm">
                                  {order.items?.[0]?.name}
                                  {order.items?.length > 1 &&
                                    ` +${order.items.length - 1} more`}
                                </div>
                                <div className="text-sm text-gray-600 flex items-center gap-1">
                                  <Timer className="h-4 w-4" />
                                  Ready in ~15-20 mins
                                </div>
                              </div>
                            </div>
                          </CardContent>

                          <CardFooter className="pt-4 border-t border-gray-100 bg-gray-50/30 rounded-b-lg">
                            <div className="flex justify-end w-full">
                              <Button
                                asChild
                                size="sm"
                                className="gap-2 text-sm px-6"
                              >
                                <Link href={`/orders/${order.id}`}>
                                  <Eye className="h-4 w-4" />
                                  View Details
                                </Link>
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <History className="h-5 w-5 text-primary" />
                      </div>
                      Order History
                      <Badge variant="secondary" className="ml-auto">
                        {
                          history.filter((o) => o.status !== "in-progress")
                            .length
                        }{" "}
                        orders
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {history.filter((o) => o.status !== "in-progress")
                      .length === 0 ? (
                      <div className="py-16 text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                          <History className="h-10 w-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">
                          No Order History
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                          Your completed orders will appear here once you place
                          and complete your first order.
                        </p>
                        <Link href="/">
                          <Button size="lg" className="gap-2">
                            <ChefHat className="h-5 w-5" />
                            Start Ordering
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {history
                          .filter((o) => o.status !== "in-progress")
                          .map((order: any) => {
                            const statusInfo = getOrderStatusInfo(order.status);
                            const StatusIcon = statusInfo.icon;

                            return (
                              <Link
                                key={order.id}
                                href={`/orders/${order.id}`}
                                className="block p-6 hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-white transition-all duration-200 group"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <div
                                      className={`w-12 h-12 ${statusInfo.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                                    >
                                      <StatusIcon
                                        className={`h-6 w-6 ${statusInfo.color}`}
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <div className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                                        Order #{order.code || order.id}
                                      </div>
                                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                          <Calendar className="h-3 w-3" />
                                          {order.createdAt
                                            ? new Date(
                                                order.createdAt
                                              ).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                              })
                                            : ""}
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <Package className="h-3 w-3" />
                                          {order.items?.length || 0} items
                                        </div>
                                        <div
                                          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color}`}
                                        >
                                          {statusInfo.label}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="text-right space-y-1">
                                    <div className="text-xl font-bold text-gray-900">
                                      ${order.total?.toFixed(2) || "0.00"}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <Star className="h-3 w-3" />
                                      <span>Rate order</span>
                                      <Eye className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                  </div>
                                </div>

                                {/* Order Items Preview */}
                                <div className="mt-4 flex items-center gap-2">
                                  <div className="flex -space-x-2">
                                    {order.items
                                      ?.slice(0, 6)
                                      .map((item: any, idx: number) => {
                                        const img = PlaceHolderImages.find(
                                          (p) => p.id === item.image
                                        );
                                        return img ? (
                                          <div key={idx} className="relative">
                                            <Image
                                              src={img.imageUrl}
                                              alt={item.name}
                                              width={32}
                                              height={24}
                                              className="rounded-md border border-white shadow-sm"
                                            />
                                          </div>
                                        ) : (
                                          <div
                                            key={idx}
                                            className="w-8 h-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-md flex items-center justify-center text-xs font-medium text-gray-600 border border-white shadow-sm"
                                          >
                                            {item.name
                                              .slice(0, 1)
                                              .toUpperCase()}
                                          </div>
                                        );
                                      })}
                                  </div>
                                  {order.items?.length > 6 && (
                                    <span className="text-xs text-muted-foreground ml-2">
                                      +{order.items.length - 6} more items
                                    </span>
                                  )}
                                </div>
                              </Link>
                            );
                          })}
                      </div>
                    )}

                    {history.filter((o) => o.status !== "in-progress").length >
                      0 && (
                      <div className="p-6 border-t bg-gray-50/50">
                        <Button
                          variant="outline"
                          onClick={clearHistory}
                          className="w-full gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Clear Order History
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="cards" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Saved Payment Methods
                  </CardTitle>
                  <Button
                    onClick={() => {
                      if (showCardForm) {
                        cancelEdit();
                      } else {
                        setShowCardForm(true);
                      }
                    }}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    {showCardForm ? "Cancel" : "Add Card"}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your card information is encrypted and securely stored
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {showCardForm && (
                  <Card className="border-dashed">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {editingCard ? "Edit Card" : "Add New Card"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label htmlFor="card-number">
                            Card Number{" "}
                            {editingCard && "(Enter full number to update)"}
                          </Label>
                          <Input
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                            value={newCard.number}
                            onChange={(e) => {
                              const formatted = formatCardNumber(
                                e.target.value
                              );
                              setNewCard({ ...newCard, number: formatted });
                              if (formErrors.number) {
                                setFormErrors({ ...formErrors, number: "" });
                              }
                            }}
                            maxLength={19}
                            className={
                              formErrors.number ? "border-red-500" : ""
                            }
                          />
                          {formErrors.number && (
                            <p className="text-sm text-red-500 mt-1">
                              {formErrors.number}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              value={newCard.expiry}
                              onChange={(e) => {
                                const formatted = formatExpiry(e.target.value);
                                setNewCard({ ...newCard, expiry: formatted });
                                if (formErrors.expiry) {
                                  setFormErrors({ ...formErrors, expiry: "" });
                                }
                              }}
                              maxLength={5}
                              className={
                                formErrors.expiry ? "border-red-500" : ""
                              }
                            />
                            {formErrors.expiry && (
                              <p className="text-sm text-red-500 mt-1">
                                {formErrors.expiry}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={newCard.cvv}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                const maxLength =
                                  getCardBrand(newCard.number) ===
                                  "American Express"
                                    ? 4
                                    : 3;
                                setNewCard({
                                  ...newCard,
                                  cvv: value.substring(0, maxLength),
                                });
                                if (formErrors.cvv) {
                                  setFormErrors({ ...formErrors, cvv: "" });
                                }
                              }}
                              maxLength={
                                getCardBrand(newCard.number) ===
                                "American Express"
                                  ? 4
                                  : 3
                              }
                              className={formErrors.cvv ? "border-red-500" : ""}
                            />
                            {formErrors.cvv && (
                              <p className="text-sm text-red-500 mt-1">
                                {formErrors.cvv}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="cardholder">Cardholder Name</Label>
                          <Input
                            id="cardholder"
                            placeholder="John Doe"
                            value={newCard.cardholder_name}
                            onChange={(e) => {
                              setNewCard({
                                ...newCard,
                                cardholder_name: e.target.value,
                              });
                              if (formErrors.cardholder_name) {
                                setFormErrors({
                                  ...formErrors,
                                  cardholder_name: "",
                                });
                              }
                            }}
                            className={
                              formErrors.cardholder_name ? "border-red-500" : ""
                            }
                          />
                          {formErrors.cardholder_name && (
                            <p className="text-sm text-red-500 mt-1">
                              {formErrors.cardholder_name}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={addCard} className="flex-1">
                          {editingCard ? "Update Card" : "Add Card"}
                        </Button>
                        <Button variant="outline" onClick={cancelEdit}>
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {cards.length === 0 ? (
                  <div className="text-center py-8">
                    <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      No saved cards
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Add a payment method for faster checkout
                    </p>
                    {!showCardForm && (
                      <Button onClick={() => setShowCardForm(true)}>
                        Add Your First Card
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cards.map((card) => (
                      <div
                        key={card.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
                            <CreditCard className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium">
                              {card.brand} •••• {card.last4}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {card.cardholder_name} • Expires {card.exp_month}/
                              {card.exp_year}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editCard(card)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCard(card.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={userProfile.name}
                      onChange={(e) =>
                        setUserProfile({ ...userProfile, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userProfile.email}
                      onChange={(e) =>
                        setUserProfile({
                          ...userProfile,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={userProfile.phone}
                      onChange={(e) =>
                        setUserProfile({
                          ...userProfile,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={userProfile.address}
                      onChange={(e) =>
                        setUserProfile({
                          ...userProfile,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <Button onClick={() => saveUserProfile(userProfile)}>
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Data Encryption</h4>
                      <p className="text-sm text-muted-foreground">
                        Your payment information is encrypted using AES-GCM
                      </p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Local Storage</h4>
                      <p className="text-sm text-muted-foreground">
                        Data is stored securely in your browser
                      </p>
                    </div>
                    <Badge variant="secondary">Secure</Badge>
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
