import crypto from 'crypto';

/**
 * Hash password using PBKDF2
 */
function hashPassword(password) {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha256').toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verify password against hash
 */
function verifyPassword(password, hashedPassword) {
  const [salt, hash] = hashedPassword.split(':');
  const newHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha256').toString('hex');
  return hash === newHash;
}

/**
 * Validate password strength
 */
function validatePasswordStrength(password) {
  if (password.length < 8) {
    return { valid: false, error: 'Password minimal 8 karakter' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: 'Password harus mengandung minimal 1 huruf besar' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, error: 'Password harus mengandung minimal 1 huruf kecil' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, error: 'Password harus mengandung minimal 1 angka' };
  }
  return { valid: true };
}

export {
  hashPassword,
  verifyPassword,
  validatePasswordStrength
};
