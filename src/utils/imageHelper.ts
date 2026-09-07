/**
 * Utility functions for handling image URLs including Google Drive direct image conversion.
 */

export function extractGoogleDriveId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  // Match /file/d/{ID}
  const fileDMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch && fileDMatch[1]) return fileDMatch[1];

  // Match id={ID}
  const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParamMatch && idParamMatch[1]) return idParamMatch[1];

  // Match googleusercontent.com/d/{ID}
  const lh3Match = trimmed.match(/googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/);
  if (lh3Match && lh3Match[1]) return lh3Match[1];

  // Match /d/{ID}
  const dMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (dMatch && dMatch[1]) return dMatch[1];

  return null;
}

/**
 * Transforms any Google Drive share link into a direct CDN image link.
 * If the URL is already a direct link, local path, or Base64 string, returns it untouched.
 */
export function formatImageUrl(url: string | undefined | null): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (!trimmed) return '';

  // Check if it is a Google Drive link
  if (trimmed.includes('drive.google.com') || trimmed.includes('docs.google.com')) {
    const driveId = extractGoogleDriveId(trimmed);
    if (driveId) {
      // Direct CDN for Google Drive images (requires the file to be shared with 'Anyone with the link')
      return `https://lh3.googleusercontent.com/d/${driveId}`;
    }
  }

  return trimmed;
}

/**
 * Provides a secondary Google Drive image URL in case the primary one fails.
 */
export function getGoogleDriveFallbackUrl(url: string | undefined | null): string | null {
  if (!url) return null;
  const driveId = extractGoogleDriveId(url);
  if (driveId) {
    return `https://drive.google.com/thumbnail?id=${driveId}&sz=w1200`;
  }
  return null;
}
