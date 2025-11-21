/**
 * Authentication Service
 * Simulates authentication endpoints without Firebase
 */

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Test user credentials
const TEST_USER = {
  email: 'test@foody.com',
  password: 'test123',
  displayName: 'Usuario de Prueba',
  id: 'test-user-001',
};

// Simulated delay to mimic API call
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Sign in with email and password
 */
export async function signInWithEmail(email: string, password: string): Promise<AuthResponse> {
  await delay(800); // Simulate network delay

  // Validate credentials
  if (email === TEST_USER.email && password === TEST_USER.password) {
    const user: User = {
      id: TEST_USER.id,
      email: TEST_USER.email,
      displayName: TEST_USER.displayName,
    };

    const token = generateToken(user);

    return { user, token };
  }

  throw new Error('Credenciales inválidas');
}

/**
 * Sign up with email and password
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string
): Promise<AuthResponse> {
  await delay(800);

  // For demo purposes, we'll only allow the test user
  // In a real app, this would create a new user in the database
  if (email === TEST_USER.email) {
    throw new Error('Este correo ya está registrado');
  }

  // Create new user (simulated)
  const user: User = {
    id: `user-${Date.now()}`,
    email,
    displayName,
  };

  const token = generateToken(user);

  return { user, token };
}

/**
 * Sign in with Google (simulated)
 */
export async function signInWithGoogle(): Promise<AuthResponse> {
  await delay(1000);

  // For demo, return the test user
  const user: User = {
    id: TEST_USER.id,
    email: TEST_USER.email,
    displayName: TEST_USER.displayName,
    photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test',
  };

  const token = generateToken(user);

  return { user, token };
}

/**
 * Reset password (simulated)
 */
export async function resetPassword(email: string): Promise<void> {
  await delay(800);

  // Simulate sending reset email
  console.log(`Password reset email sent to: ${email}`);
}

/**
 * Validate token and get user
 */
export async function validateToken(token: string): Promise<User | null> {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    // Check if token is expired (24 hours)
    if (payload.exp < Date.now()) {
      return null;
    }

    return payload.user;
  } catch {
    return null;
  }
}

/**
 * Generate a simple JWT-like token (for demo purposes only)
 * In production, use a proper JWT library and sign with a secret
 */
function generateToken(user: User): string {
  const header = btoa(JSON.stringify({ alg: 'none', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      user,
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      iat: Date.now(),
    })
  );
  const signature = 'demo-signature';

  return `${header}.${payload}.${signature}`;
}

/**
 * Storage keys
 */
export const STORAGE_KEYS = {
  TOKEN: 'foody_auth_token',
  USER: 'foody_user',
} as const;
