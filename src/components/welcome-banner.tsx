'use client';

import { useAuth } from '@/hooks/use-auth';
import { Sparkles } from 'lucide-react';

export function WelcomeBanner() {
  const { user } = useAuth();

  if (!user) return null;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '¡Buenos días';
    if (hour < 18) return '¡Buenas tardes';
    return '¡Buenas noches';
  };

  const firstName = user.displayName?.split(' ')[0] || 'Usuario';

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-primary/80 p-8 mb-8">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full blur-2xl" />
      
      <div className="relative z-10 flex items-center gap-4">
        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-secondary-foreground" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-1">
            {getGreeting()}, {firstName}!
          </h2>
          <p className="text-primary-foreground/90 text-sm md:text-base">
            ¿Qué te gustaría comer hoy?
          </p>
        </div>
      </div>
    </div>
  );
}
