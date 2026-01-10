// Password hashing utilities using Web Crypto API
// Note: bcryptjs is not available in Cloudflare Workers, so we'll use a simple hash

import crypto from 'crypto';

/**
 * Hash password using PBKDF2
 */
export async function hashPassword(password: string, salt?: string): Promise<string> {
  const saltValue = salt || crypto.randomBytes(16).toString('hex');

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, saltValue, 100000, 64, 'sha512', (err, derivedKey) => {
      if (err) reject(err);
      resolve(`${saltValue}:${derivedKey.toString('hex')}`);
    });
  });
}

/**
 * Verify password against hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const [salt] = hash.split(':');

  const hashedPassword = await hashPassword(password, salt);
  return hashedPassword === hash;
}

/**
 * Validate password strength
 * Requirements: min 8 chars, at least 1 uppercase, 1 lowercase, 1 number
 */
export function validatePasswordStrength(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least 1 uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least 1 lowercase letter');
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least 1 number');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
