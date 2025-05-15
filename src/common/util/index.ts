const SENSITIVE_KEYS = ['password', 'pin', 'ssn', 'cardNumber', 'cvv', 'authorization'];

export function maskSensitiveData(data: any, keysToMask: string[] = SENSITIVE_KEYS): any {
    if (!data || typeof data !== 'object') return data;
  
    const masked: any = Array.isArray(data) ? [] : {};
  
    for (const key in data) {
      if (keysToMask.includes(key.toLowerCase())) {
        masked[key] = '***MASKED***';
      } else if (typeof data[key] === 'object') {
        masked[key] = maskSensitiveData(data[key], keysToMask);
      } else {
        masked[key] = data[key];
      }
    }
  
    return masked;
}

export const maskCardNumber = (card: string): string =>
  card.replace(/\d(?=\d{4})/g, '*');

export const maskSSN = (ssn: string): string =>
  ssn.replace(/^\d{3}-\d{2}/, 'XXX-XX');

export const maskEmail = (email: string): string => {
  const [user, domain] = email.split('@');
  return `${user[0]}***@${domain}`;
};
  