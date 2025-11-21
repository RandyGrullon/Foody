import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Check if Firebase is configured
const isFirebaseConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  );
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'demo.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:abcdef',
};

// Initialize Firebase only once
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let firebaseInitialized = false;

// Only show warning once
let warningShown = false;

try {
  if (isFirebaseConfigured()) {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApp();
    }

    // Get Auth and Firestore instances
    auth = getAuth(app);
    db = getFirestore(app);
    firebaseInitialized = true;
  } else {
    // Firebase not configured - show helpful message only once
    if (!warningShown && typeof window !== 'undefined') {
      console.log('%c🔥 Firebase no configurado', 'color: #FBD914; background: #0058AB; padding: 8px; font-size: 14px; font-weight: bold;');
      console.log('%c📝 Para habilitar autenticación:', 'color: #0058AB; font-size: 12px; font-weight: bold;');
      console.log('%c1. Sigue las instrucciones en AUTH_SETUP_CHECKLIST.md', 'color: #666; font-size: 11px;');
      console.log('%c2. Crea un archivo .env.local con tus credenciales de Firebase', 'color: #666; font-size: 11px;');
      console.log('%c3. Reinicia el servidor con: yarn dev', 'color: #666; font-size: 11px;');
      console.log('%c\n✨ La app funcionará sin autenticación hasta que configures Firebase', 'color: #0058AB; font-size: 11px;');
      warningShown = true;
    }
  }
} catch (error) {
  if (!warningShown && typeof window !== 'undefined') {
    console.warn('⚠️ Error inicializando Firebase. La app funcionará sin autenticación.');
    warningShown = true;
  }
}

export { app, auth, db, firebaseInitialized };
