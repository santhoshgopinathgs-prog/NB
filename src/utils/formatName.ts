/**
 * Utility to capitalize the first letter of every word in a name string.
 * Examples:
 * "santhosh" -> "Santhosh"
 * "santhosh gopinath" -> "Santhosh Gopinath"
 * "poornima s" -> "Poornima S"
 * "RASHMI SHARMA" -> "Rashmi Sharma"
 */
export const formatCapitalizedName = (name: string): string => {
  if (!name || typeof name !== 'string') return '';
  return name
    .trim()
    .split(/\s+/)
    .map(word => {
      if (!word) return '';
      if (word.length === 1) return word.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};
