/**
 * ==============================================================================
 *                     WEDDING OS — SINGLE USER DATA FILE
 * ==============================================================================
 * 
 * ALL user data, settings, names, dates, schedules, and content are centralized
 * in this single file (configured in ./config/weddingConfig.ts).
 * 
 * In future, if you want to change any details, you only need to change it here!
 * 
 * WHAT YOU CAN CUSTOMIZE IN ONE PLACE:
 * ------------------------------------------------------------------------------
 *  1. Couple Information: Bride & groom names, wedding date, city, hashtag
 *  2. Guest Personalization: Guest name, table, greeting, invitation code
 *  3. Hero & Wallpapers: Lock screen photo, hero portrait
 *  4. Story Timeline: Milestone dates, titles, photos, and live chat bubbles
 *  5. Photo Gallery: Categories and photos list (or drop images in /public/assets/gallery)
 *  6. Events Schedule: Ceremony, cocktail hour, reception, Google Maps links
 *  7. Accommodations & Places: Hotels, airports, venue locations
 *  8. Soundtrack & Songs: Music playlist (or drop songs in /public/assets/songs)
 *  9. Attire & Moodboard: Dress code, palette hex codes, ladies/gentlemen tips
 * 10. Promises & Vows: Couple checklist
 * 
 * ASSET DIRECTORIES:
 * ------------------------------------------------------------------------------
 *  All assets are consolidated under: /public/assets/
 *   ├── /public/assets/gallery/  -> Drop new photos here (auto-shows in gallery!)
 *   ├── /public/assets/songs/    -> Drop audio songs here (.mp3, .wav, .m4a)
 *   ├── /public/assets/images/   -> Hero, wallpaper & highlight images
 *   └── /public/assets/icons/    -> System icons and favicons
 * ==============================================================================
 */

export {
  weddingConfig,
  weddingData,
  type WeddingConfig,
  type CoupleConfig,
  type GuestConfig,
  type StoryMoment,
  type PhotoItem,
  type WeddingEvent,
  type PlaceItem,
  type SongTrack,
  type AttirePalette,
  type AttireSection,
} from './config/weddingConfig';
