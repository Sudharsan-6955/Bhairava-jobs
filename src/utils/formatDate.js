/**
 * Format a date to show relative time (e.g., "2 days ago", "1 week ago")
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
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  } else {
    return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
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
