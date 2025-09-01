/**
 * Formats a number into a USD currency string.
 * Example: formatCurrency(100.5) => "$100.50"
 * @param amount - The number to format.
 * @returns A string representing the formatted currency.
 */
export function formatCurrency(amount: number | string) {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(numericAmount);
}