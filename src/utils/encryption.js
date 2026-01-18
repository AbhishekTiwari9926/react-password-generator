import CryptoJS from 'crypto-js';

export const encryptPassword = (text, masterPassword) => {
  return CryptoJS.AES.encrypt(text, masterPassword).toString();
};

export const decryptPassword = (encryptedText, masterPassword) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, masterPassword);
    const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedStr;
  } catch {
    return null;
  }
};

export const validateMasterPassword = (password) => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const isLongEnough = password.length >= 12;

  return {
    isValid: hasUppercase && hasLowercase && hasNumbers && hasSymbols && isLongEnough,
    requirements: {
      uppercase: hasUppercase,
      lowercase: hasLowercase,
      numbers: hasNumbers,
      symbols: hasSymbols,
      minLength: isLongEnough,
    },
  };
};

export const calculatePasswordStrength = (password) => {
  if (!password) return { score: 0, label: 'None', color: 'gray' };
  
  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (password.length >= 16) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;

  const scores = [
    { score: 0, label: 'None', color: 'gray' },
    { score: 1, label: 'Very Weak', color: 'red' },
    { score: 2, label: 'Weak', color: 'red' },
    { score: 3, label: 'Fair', color: 'yellow' },
    { score: 4, label: 'Good', color: 'blue' },
    { score: 5, label: 'Strong', color: 'green' },
    { score: 6, label: 'Very Strong', color: 'green' },
  ];

  return scores[Math.min(strength, 6)];
};

export const detectDuplicatePasswords = (passwords) => {
  const passwordMap = {};
  const duplicates = [];

  passwords.forEach((entry, index) => {
    if (passwordMap[entry.password]) {
      duplicates.push({
        current: index,
        previous: passwordMap[entry.password],
        password: entry.password,
      });
    } else {
      passwordMap[entry.password] = index;
    }
  });

  return duplicates;
};

export const validatePasswordEntry = (entry) => {
  const errors = {};

  if (!entry.platform?.trim()) {
    errors.platform = 'Platform name is required';
  }

  if (!entry.username?.trim()) {
    errors.username = 'Username/Email is required';
  }

  if (!entry.password?.trim()) {
    errors.password = 'Password is required';
  }

  if (entry.url && !/^https?:\/\//.test(entry.url)) {
    errors.url = 'URL must start with http:// or https://';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
