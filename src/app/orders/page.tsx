"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Clock,
  History,
  ShoppingCart,
  ChefHat,
  Timer,
  CheckCircle,
  Package,
  Calendar,
  Eye,
  ArrowLeft,
} from "lucide-react";
import { ProtectedRoute } from "@/components/protected-route";

export default function OrdersPage() {
  const [history, setHistory] = useState<Array<any>>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadData = () => {
      const h = localStorage.getItem("ikea-eats-history");
      const parsed = h ? JSON.parse(h) : [];
      setHistory(parsed);
      setIsLoaded(true);
    };

    loadData();
  }, []);

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

  const inProgressOrders = history.filter((o: any) => o.status === "in-progress");
  const completedOrders = history.filter((o: any) => o.status !== "in-progress");

  if (!isLoaded) {
    return null;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="relative h-48 bg-gradient-to-r from-primary/20 to-secondary/20">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="container py-12 h-full flex flex-col justify-center">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2 mb-4 w-fit">
                <ArrowLeft className="h-4 w-4" />
                Back to Menu
              </Button>
            </Link>
            <h1 className="text-4xl font-bold font-headline text-foreground">My Orders</h1>
            <p className="text-muted-foreground mt-2">Track your orders and view history</p>
          </div>
        </div>

        <div className="container py-8 -mt-12 relative z-10 max-w-6xl">
          <Tabs defaultValue="in-progress" className="space-y-6">
            <TabsList className="w-full justify-start h-auto p-1 bg-muted/50 backdrop-blur-sm rounded-xl">
              <TabsTrigger 
                value="in-progress" 
                className="gap-2 py-3 px-6 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-md transition-all"
              >
                <Clock className="h-4 w-4" />
                In Progress ({inProgressOrders.length})
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="gap-2 py-3 px-6 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-md transition-all"
              >
                <History className="h-4 w-4" />
                Order History ({completedOrders.length})
              </TabsTrigger>
            </TabsList>

            {/* In Progress Tab */}
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
                      Your current orders in progress will appear here. Start by browsing our menu and placing an order.
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
                                    ? new Date(order.createdAt).toLocaleDateString("en-US", {
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
                                  const img = PlaceHolderImages.find((p) => p.id === item.image);
                                  return img ? (
                                    <div key={idx} className="relative">
                                      <Image
                                        src={img.imageUrl}
                                        alt={item.name}
                                        width={40}
                                        height={32}
                                        className="rounded-md border-2 border-white shadow-sm"
                                      />
                                      {idx === 3 && order.items.length > 4 && (
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
                                {order.items?.length > 1 && ` +${order.items.length - 1} more`}
                              </div>
                              <div className="text-sm text-gray-600 flex items-center gap-1">
                                <Timer className="h-4 w-4" />
                                Ready in ~15-20 mins
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
                            <Button asChild size="sm" className="gap-2 text-sm px-6">
                              <Link href={`/orders/${order.id}`}>
                                <Eye className="h-4 w-4" />
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="mt-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <History className="h-5 w-5 text-primary" />
                    </div>
                    Order History
                    <Badge variant="secondary" className="ml-auto">
                      {completedOrders.length} orders
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {completedOrders.length === 0 ? (
                    <div className="py-16 text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <History className="h-10 w-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-900">
                        No Order History
                      </h3>
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        Your completed orders will appear here once you place and complete your first order.
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
                      {completedOrders.map((order: any) => {
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
                                  <StatusIcon className={`h-6 w-6 ${statusInfo.color}`} />
                                </div>
                                <div className="space-y-1">
                                  <div className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                                    Order #{order.code || order.id}
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      {order.createdAt
                                        ? new Date(order.createdAt).toLocaleDateString("en-US", {
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
                              <div className="text-right">
                                <div className="text-lg font-bold text-primary">
                                  ${order.total?.toFixed(2) || "0.00"}
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
}
