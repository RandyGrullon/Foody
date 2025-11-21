'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, Sparkles, ArrowRight, Chrome, ShoppingBag } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  
  const { signIn, signInWithGoogle, resetPassword } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await signIn(email, password);
      toast({
        title: '¡Bienvenido de nuevo!',
        description: 'Has iniciado sesión exitosamente',
      });
      
      // Redirect to intended page or home
      const redirectTo = sessionStorage.getItem('redirectAfterLogin') || '/';
      sessionStorage.removeItem('redirectAfterLogin');
      router.push(redirectTo);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Correo o contraseña incorrectos',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast({
        title: '¡Bienvenido!',
        description: 'Has iniciado sesión exitosamente',
      });
      router.push('/');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Ocurrió un error al iniciar sesión',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast({
        title: 'Error',
        description: 'Por favor ingresa tu correo electrónico',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      toast({
        title: 'Correo enviado',
        description: 'Revisa tu bandeja de entrada para restablecer tu contraseña',
      });
      setShowResetPassword(false);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Ocurrió un error al enviar el correo',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary via-primary/95 to-primary/80 p-12 items-center justify-center relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-lg text-primary-foreground space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-secondary mb-6">
            <ShoppingBag className="w-10 h-10 text-secondary-foreground" />
          </div>
          <h2 className="text-5xl font-bold leading-tight">
            Tu comida favorita te espera
          </h2>
          <p className="text-xl text-primary-foreground/90 leading-relaxed">
            Inicia sesión para continuar disfrutando de las mejores comidas de IKEA, 
            entregadas directamente a tu puerta.
          </p>
          
      
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 mb-4">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Iniciar Sesión</h1>
            <p className="text-muted-foreground">
              Bienvenido de nuevo a IKEA Eats
            </p>
          </div>

          {!showResetPassword ? (
            <>
              {/* Test Credentials Banner */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm mb-1">Credenciales de Prueba</p>
                    <p className="text-xs text-muted-foreground mb-2">
                      Usa estas credenciales para probar la aplicación:
                    </p>
                    <div className="bg-background/50 rounded px-3 py-2 font-mono text-xs space-y-1">
                      <div><span className="text-muted-foreground">Email:</span> <span className="text-primary font-semibold">test@foody.com</span></div>
                      <div><span className="text-muted-foreground">Password:</span> <span className="text-primary font-semibold">test123</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Sign In */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-base font-medium border-2 hover:bg-accent/5 transition-all duration-200"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <Chrome className="w-5 h-5 mr-2" />
                Continuar con Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    O continúa con email
                  </span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Contraseña</Label>
                    <button
                      type="button"
                      onClick={() => setShowResetPassword(true)}
                      className="text-sm text-primary hover:underline transition-all"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-200"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Iniciar sesión
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </>
          ) : (
            /* Reset Password Form */
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Te enviaremos un enlace para restablecer tu contraseña
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-12"
                  onClick={() => setShowResetPassword(false)}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  className="flex-1 h-12 bg-gradient-to-r from-primary to-primary/90"
                  onClick={handleResetPassword}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Enviar enlace'
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground">
            ¿No tienes una cuenta?{' '}
            <Link
              href="/auth/signup"
              className="font-semibold text-primary hover:underline transition-all"
            >
              Regístrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
