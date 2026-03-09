/**
 * Format a date to show relative time within 24 hours,
 * then fallback to DD/MM/YY date format.
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date string
 */
export function formatRelativeTime(date) {
  if (!date) return 'Date not available';
  
  const now = new Date();
  const postDate = new Date(date);
  
  // Check if date is valid
  if (isNaN(postDate.getTime())) return 'Invalid date';
  
  const diffInMilliseconds = now - postDate;
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const formatAsDDMMYY = (value) => {
    const day = String(value.getDate()).padStart(2, '0');
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const year = String(value.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };
  
  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    return formatAsDDMMYY(postDate);
  }
}

/**
 * Format a date to a readable string (e.g., "Jan 15, 2024")
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  if (!date) return 'Date not available';
  
  const postDate = new Date(date);
  
  // Check if date is valid
  if (isNaN(postDate.getTime())) return 'Invalid date';
  
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return postDate.toLocaleDateString('en-US', options);
}

export default formatRelativeTime;
