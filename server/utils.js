import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const generateRandomPassword = () => {
  return Math.random().toString(36).substring(0, 12);
};

export const hashRandomPassword = async (password) => {
  if (password === undefined || password === null) {
    password = generateRandomPassword();
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  return { password, passwordHash };
};