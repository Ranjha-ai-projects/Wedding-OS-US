import type { PhotoItem, SongTrack } from '../config/weddingConfig';

/**
 * Format a raw filename into a human-readable title.
 * e.g., "sunset_at_central_park-1.jpg" -> "Sunset At Central Park 1"
 * e.g., "song1.mp3" -> "Song 1"
 */
export function formatTitleFromFilename(filename: string): string {
  // Remove extension
  const baseName = filename.replace(/\.[^/.]+$/, '');
  // Insert space between letters and numbers if like "song1" -> "song 1"
  const spacedNum = baseName.replace(/([a-zA-Z]+)(\d+)/g, '$1 $2');
  // Replace dashes, underscores, and dots with spaces
  const spaced = spacedNum.replace(/[-_.]+/g, ' ').trim();
  // Capitalize first letter of each word
  return spaced.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Auto-discover all images placed into src/assets/gallery/
 * Uses Vite's native JavaScript import.meta.glob (no terminal warnings).
 */
export function getAutoDiscoveredGalleryPhotos(): PhotoItem[] {
  try {
    const modules = import.meta.glob<string>(
      [
        '/src/assets/gallery/*.{jpg,jpeg,png,webp,svg,gif,avif}',
        '/src/assets/gallery/**/*.{jpg,jpeg,png,webp,svg,gif,avif}',
      ],
      { eager: true, import: 'default' }
    );

    const items: PhotoItem[] = [];

    for (const [pathKey, resolvedUrl] of Object.entries(modules)) {
      const fileName = pathKey.split('/').pop() || '';
      if (!fileName || fileName.startsWith('.') || fileName.endsWith('.md')) continue;

      const title = formatTitleFromFilename(fileName);
      const slug = fileName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();

      items.push({
        id: `gallery-auto-${slug}`,
        title,
        category: 'Us',
        url: resolvedUrl,
        caption: title,
      });
    }

    return items;
  } catch (err) {
    console.warn('Auto-gallery discovery error:', err);
    return [];
  }
}

/**
 * Auto-discover all audio tracks placed into src/assets/songs/
 * Uses Vite's native JavaScript import.meta.glob (no terminal warnings).
 */
export function getAutoDiscoveredSongs(): SongTrack[] {
  try {
    const modules = import.meta.glob<string>(
      [
        '/src/assets/songs/*.{mp3,wav,ogg,m4a,aac,flac}',
        '/src/assets/songs/**/*.{mp3,wav,ogg,m4a,aac,flac}',
      ],
      { eager: true, import: 'default' }
    );

    const items: SongTrack[] = [];

    for (const [pathKey, resolvedUrl] of Object.entries(modules)) {
      const fileName = pathKey.split('/').pop() || '';
      if (!fileName || fileName.startsWith('.') || fileName.endsWith('.md')) continue;

      const title = formatTitleFromFilename(fileName);
      const slug = fileName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();

      items.push({
        id: `song-${slug}`,
        title,
        artist: 'Couple Soundtrack',
        label: 'Soundtrack',
        duration: '3:00',
        audioUrl: resolvedUrl,
      });
    }

    return items;
  } catch (err) {
    console.warn('Auto-song discovery error:', err);
    return [];
  }
}

/**
 * Merge photos: returns auto-discovered gallery photos combined with any extra configured photos.
 */
export function getMergedPhotos(configuredPhotos: PhotoItem[] = []): PhotoItem[] {
  const discovered = getAutoDiscoveredGalleryPhotos();

  if (discovered.length === 0) {
    return configuredPhotos;
  }

  const enrichedDiscovered = discovered.map((disc) => {
    const discFileName = disc.url.split('/').pop()?.toLowerCase() || '';
    const match = configuredPhotos.find((cfg) => {
      const cfgFileName = cfg.url.split('/').pop()?.toLowerCase() || '';
      return cfgFileName === discFileName || cfg.id === disc.id;
    });

    if (match) {
      return {
        ...disc,
        title: match.title || disc.title,
        category: match.category || disc.category,
        caption: match.caption || disc.caption,
      };
    }
    return disc;
  });

  const discoveredNames = new Set(
    discovered.map((d) => d.url.split('/').pop()?.toLowerCase())
  );

  const extraPhotos = configuredPhotos.filter((p) => {
    const fn = p.url.split('/').pop()?.toLowerCase();
    return fn && !discoveredNames.has(fn);
  });

  return [...enrichedDiscovered, ...extraPhotos];
}

/**
 * Get active playlist for music player:
 * Prioritizes actual audio files placed in the songs folder so ONLY real songs are played!
 * Matches any custom titles/artists from configuredTracks if provided by user.
 */
export function getActiveSoundtrack(configuredTracks: SongTrack[] = []): SongTrack[] {
  const discovered = getAutoDiscoveredSongs();

  // If the user has placed songs in the songs folder, play ONLY those real songs!
  if (discovered.length > 0) {
    return discovered.map((discTrack) => {
      const discFileName = discTrack.audioUrl?.split('/').pop()?.toLowerCase() || '';

      // Check if user specified custom metadata in weddingConfig for this filename
      const match = configuredTracks.find((cfg) => {
        if (!cfg.audioUrl) return false;
        const cfgFileName = cfg.audioUrl.split('/').pop()?.toLowerCase() || '';
        return cfgFileName === discFileName || cfg.id === discTrack.id;
      });

      if (match) {
        return {
          ...discTrack,
          title: match.title || discTrack.title,
          artist: match.artist || discTrack.artist,
          label: match.label || discTrack.label,
          duration: match.duration || discTrack.duration,
        };
      }

      return discTrack;
    });
  }

  // If no songs placed yet, return whatever is configured with audioUrls, or fallback
  const withAudio = configuredTracks.filter((t) => Boolean(t.audioUrl));
  return withAudio.length > 0 ? withAudio : configuredTracks;
}
