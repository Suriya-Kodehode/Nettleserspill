/**
 * Generates a unique ID with these rules:
 *   1. The ID is always exactly 20 characters in length.
 *   2. The ID is unique (combining the current date with a random number).
 *   3. The ID only contains numbers and a single hyphen ('-').
 *   4. The ID always starts with the current date in "ddmmyy" format.
 *
 * Format: ddmmyy-XXXXXXXXXXXXX,
 * where:
 *   - ddmmyy is today’s date (6 digits).
 *   - '-' is the separator.
 *   - XXXXXXXXXXXXX is a random 13-digit number.
 * Example: 190525-1234567890123
 */
export function generateRandomId() {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
  const yy = String(now.getFullYear()).slice(-2);
  const dateStr = `${dd}${mm}${yy}`; // 6 characters
  
  // Generate a random 13-digit number, padded with zeros if necessary.
  const randomPart = String(Math.floor(Math.random() * 1e13)).padStart(13, '0');

  // Concatenate all parts (6 + 1 + 13 = 20 characters)
  return `${dateStr}-${randomPart}`;
}