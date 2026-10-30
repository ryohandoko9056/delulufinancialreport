export const CURRENCIES = [
  { code: 'TWD', symbol: 'NT$', name: 'New Taiwan Dollar (NT$)', flag: '🇹🇼', decimals: 0 },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah (Rp)', flag: '🇮🇩', decimals: 0 },
  { code: 'USD', symbol: '$', name: 'US Dollar ($)', flag: '🇺🇸', decimals: 2 },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won (₩)', flag: '🇰🇷', decimals: 0 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen (¥)', flag: '🇯🇵', decimals: 0 },
  { code: 'EUR', symbol: '€', name: 'Euro (€)', flag: '🇪🇺', decimals: 2 }
];

export const DEFAULT_CURRENCY = 'TWD';

export const getCurrencyDetails = (currencyCode = DEFAULT_CURRENCY) => {
  return CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0];
};

export const formatCurrency = (amount, currencyCode = DEFAULT_CURRENCY) => {
  const numericAmount = Number(amount) || 0;
  const currency = getCurrencyDetails(currencyCode);

  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: currency.decimals,
      maximumFractionDigits: currency.decimals
    }).format(numericAmount);
  } catch {
    // Fallback if specific currency is unsupported by engine
    const formattedNum = numericAmount.toLocaleString('en-US', {
      minimumFractionDigits: currency.decimals,
      maximumFractionDigits: currency.decimals
    });
    return `${currency.symbol} ${formattedNum}`;
  }
};
