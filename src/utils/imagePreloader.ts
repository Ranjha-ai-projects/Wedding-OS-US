import { weddingConfig } from '../config/weddingConfig';

/**
 * Preload and decode critical images before screen transitions occur.
 * Calling img.decode() ensures that the image is decompressed and ready
 * in GPU memory before paint, eliminating black flashes during screen transitions.
 */
export async function preloadAndDecodeImage(src: string): Promise<void> {
  if (!src || typeof window === 'undefined') return;
  try {
    const img = new Image();
    img.src = src;
    if (typeof img.decode === 'function') {
      await img.decode();
    } else {
      await new Promise<void>((resolve) => {
        img.addEventListener('load', () => resolve(), { once: true });
        img.addEventListener('error', () => resolve(), { once: true });
      });
    }
  } catch {
    // Decoding failed or aborted, non-fatal fallback
  }
}

/**
 * Preload critical Couple OS photographs at application startup.
 * Specifically:
 * - Lock Screen portrait photo
 * - Home Screen hero photo
 * - Memory card / Featured photo
 * - First Story moment photo
 */
export function preloadCriticalImages(): void {
  if (typeof window === 'undefined') return;

  // Immediate Priority 1: Lock wallpaper & Home wallpaper (must be ready immediately)
  if (weddingConfig.lockPhoto) {
    preloadAndDecodeImage(weddingConfig.lockPhoto);
  }
  if (weddingConfig.heroPhoto) {
    preloadAndDecodeImage(weddingConfig.heroPhoto);
  }

  // Priority 2: When browser is idle, decode the first few application hero images
  const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 100));
  idleCallback(() => {
    if (weddingConfig.photos && weddingConfig.photos.length > 0 && weddingConfig.photos[0]?.url) {
      preloadAndDecodeImage(weddingConfig.photos[0].url);
    }
    if (weddingConfig.storyMoments && weddingConfig.storyMoments.length > 0 && weddingConfig.storyMoments[0]?.photoUrl) {
      preloadAndDecodeImage(weddingConfig.storyMoments[0].photoUrl);
    }
  });
}
