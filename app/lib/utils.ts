/**
 * Converts bytes to human readable format
 * @param bytes - Size in bytes
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted string with appropriate unit (B, KB, MB, GB, TB)
 */
export function formatSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Validates if file size is within acceptable limits
 * @param bytes - Size in bytes
 * @param maxSizeInBytes - Maximum allowed size in bytes
 * @returns Boolean indicating if size is valid
 */
export function isValidFileSize(bytes: number, maxSizeInBytes: number): boolean {
  return bytes <= maxSizeInBytes;
}

/**
 * Gets file size category for UI styling
 * @param bytes - Size in bytes
 * @returns Category string for styling purposes
 */
export function getFileSizeCategory(bytes: number): 'small' | 'medium' | 'large' | 'xlarge' {
  const mb = bytes / (1024 * 1024);
  
  if (mb < 1) return 'small';
  if (mb < 5) return 'medium';
  if (mb < 15) return 'large';
  return 'xlarge';
}