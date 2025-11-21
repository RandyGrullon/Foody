'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

/**
 * Protected Route Component
 * Only protects specific routes that require authentication (e.g., checkout, profile, orders)
 * The rest of the app is publicly accessible
 */
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Routes that require authentication
  const protectedRoutes = ['/checkout', '/profile', '/orders', '/create-dish'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  useEffect(() => {
    if (!loading && !user && isProtectedRoute) {
      // Store the intended destination
      sessionStorage.setItem('redirectAfterLogin', pathname);
      router.push('/auth/login');
    }
  }, [user, loading, isProtectedRoute, pathname, router]);

  // Show loading state while checking authentication (only for protected routes)
  if (loading && isProtectedRoute) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // If not authenticated and trying to access protected route, show nothing
  // (will redirect in useEffect)
  if (!user && isProtectedRoute) {
    return null;
  }

  return <>{children}</>;
}
