export const generatePassword = (options = {}) => {
  const {
    length = 16,
    useUppercase = true,
    useLowercase = true,
    useNumbers = true,
    useSymbols = true,
    excludeAmbiguous = false,
  } = options;

  let chars = '';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:\'",.<>?/\\';
  const ambiguous = 'il1Lo0O';

  if (useUppercase) {
    chars += excludeAmbiguous
      ? uppercase.split('').filter(c => !ambiguous.includes(c)).join('')
      : uppercase;
  }
  if (useLowercase) {
    chars += excludeAmbiguous
      ? lowercase.split('').filter(c => !ambiguous.includes(c)).join('')
      : lowercase;
  }
  if (useNumbers) {
    chars += excludeAmbiguous
      ? numbers.split('').filter(c => !ambiguous.includes(c)).join('')
      : numbers;
  }
  if (useSymbols) chars += symbols;

  if (!chars) chars = lowercase;

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
};

export const generateMultiplePasswords = (count, options) => {
  const passwords = [];
  for (let i = 0; i < count; i++) {
    passwords.push(generatePassword(options));
  }
  return passwords;
};
