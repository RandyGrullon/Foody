'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { AlertCircle, FileText } from 'lucide-react';

export function FirebaseNotConfigured() {
  const { isFirebaseReady } = useAuth();

  if (isFirebaseReady) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-2xl w-full">
        <div className="bg-card border-2 border-primary/20 rounded-2xl p-8 md:p-12 shadow-lg">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-primary" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Firebase no está configurado
          </h1>

          {/* Description */}
          <p className="text-center text-muted-foreground mb-8 text-lg">
            Para habilitar la autenticación, necesitas configurar Firebase.
            Es un proceso rápido que toma solo 10-15 minutos.
          </p>

          {/* Steps */}
          <div className="bg-muted/50 rounded-xl p-6 mb-8 space-y-4">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Pasos rápidos:
            </h2>
            <ol className="space-y-3 text-sm md:text-base">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span>
                  Abre el archivo <code className="bg-background px-2 py-1 rounded text-primary font-mono">AUTH_SETUP_CHECKLIST.md</code>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span>
                  Crea un proyecto en{' '}
                  <a
                    href="https://console.firebase.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-semibold"
                  >
                    Firebase Console
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span>
                  Habilita <strong>Email/Password</strong> y <strong>Google</strong> en Authentication
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  4
                </span>
                <span>
                  Copia tus credenciales al archivo <code className="bg-background px-2 py-1 rounded text-primary font-mono">.env.local</code>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  5
                </span>
                <span>
                  Reinicia el servidor con <code className="bg-background px-2 py-1 rounded text-primary font-mono">yarn dev</code>
                </span>
              </li>
            </ol>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Volver al inicio
              </Button>
            </Link>
            <a
              href="https://console.firebase.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90">
                Ir a Firebase Console
              </Button>
            </a>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-muted-foreground mt-8">
            💡 Mientras tanto, puedes explorar la app sin autenticación
          </p>
        </div>
      </div>
    </div>
  );
}
