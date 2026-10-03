export interface CoupleConfig {
  brideName: string;
  groomName: string;
  weddingDate: string; // e.g. "2026-10-25"
  displayDate: string; // e.g. "October 25, 2026"
  shortDate: string;   // e.g. "25 · 10 · 2026"
  locationCity: string;
  locationState: string;
  hashtag: string;
}

export interface GuestConfig {
  name: string;
  greeting: string;
  hasPlusOne: boolean;
  plusOneNameDefault: string;
  assignedTable: string;
  invitationCode: string;
}

export interface StoryMoment {
  id: string;
  date: string;
  title: string;
  photoUrl: string;
  photoCaption?: string;
  messages: {
    sender: 'groom' | 'bride';
    text: string;
    time?: string;
  }[];
}

export interface PhotoItem {
  id: string;
  title: string;
  category: 'Us' | 'Adventures' | 'Proposal' | 'Family' | 'Wedding';
  url: string;
  caption?: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  time: string;
  endTime?: string;
  venue: string;
  address: string;
  city: string;
  description: string;
  imageUrl: string;
  googleMapsUrl: string;
  dressCode?: string;
}

export interface PlaceItem {
  id: string;
  category: 'Ceremony' | 'Reception' | 'Hotel' | 'Airport';
  name: string;
  tagline: string;
  address: string;
  distanceInfo: string;
  imageUrl: string;
  mapsUrl: string;
}

export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  label: string; // e.g. "Our first-date song"
  duration: string;
  audioUrl?: string; // audio track link
}

export interface AttirePalette {
  name: string;
  hex: string;
  description: string;
}

export interface AttireSection {
  event: string;
  code: string;
  description: string;
  guidelines: string[];
}

export interface WeddingConfig {
  couple: CoupleConfig;
  guest: GuestConfig;
  heroPhoto: string;
  lockPhoto: string;
  storyMoments: StoryMoment[];
  photoCategories: string[];
  photos: PhotoItem[];
  events: WeddingEvent[];
  places: PlaceItem[];
  soundtrack: SongTrack[];
  attire: {
    title: string;
    subtitle: string;
    dressCode: string;
    description: string;
    palettes: AttirePalette[];
    sections: AttireSection[];
  };
  promisesNote: {
    title: string;
    items: { text: string; done: boolean }[];
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    brideName: 'Emily',
    groomName: 'Joshua',
    weddingDate: '2026-10-25T16:00:00',
    displayDate: 'October 25, 2026',
    shortDate: '25 · 10 · 2026',
    locationCity: 'New York',
    locationState: 'NY',
    hashtag: '#EmilyAndJoshua2026',
  },
  guest: {
    name: 'Sarah',
    greeting: 'Good evening, Sarah',
    hasPlusOne: true,
    plusOneNameDefault: 'Guest',
    assignedTable: 'Table 12',
    invitationCode: 'WDL-NY-2026-088',
  },
  heroPhoto: '/assets/images/hero-couple.jpg',
  lockPhoto: '/assets/images/lock-portrait.jpg',
  storyMoments: [
    {
      id: 'first-date',
      date: '23 FEB 2022',
      title: 'THE FIRST DATE',
      photoUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
      photoCaption: 'A quiet candlelit table at Balthazar in SoHo',
      messages: [
        { sender: 'groom', text: 'Made it home safely?', time: '11:42 PM' },
        { sender: 'bride', text: 'Yep 😊 Tonight was genuinely so fun.', time: '11:44 PM' },
        { sender: 'groom', text: 'So... second date?', time: '11:45 PM' },
        { sender: 'bride', text: 'I thought you’d never ask.', time: '11:46 PM' },
      ],
    },
    {
      id: 'first-trip',
      date: '14 AUG 2023',
      title: 'THE FIRST GETAWAY',
      photoUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80',
      photoCaption: 'Positano cliffs at sunset',
      messages: [
        { sender: 'bride', text: 'We missed our train connection!', time: '3:15 PM' },
        { sender: 'groom', text: 'Which means two extra hours of gelato overlooking the coast.', time: '3:17 PM' },
        { sender: 'bride', text: 'Best travel partner in the world.', time: '3:20 PM' },
      ],
    },
    {
      id: 'moving-in',
      date: '10 MAY 2024',
      title: 'MAKING A HOME',
      photoUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
      photoCaption: 'Sitting on packing boxes, pizza and champagne',
      messages: [
        { sender: 'groom', text: 'Keys in hand. Our first home together.', time: '6:02 PM' },
        { sender: 'bride', text: 'I already claimed the walk-in closet 💕', time: '6:04 PM' },
        { sender: 'groom', text: 'Fair trade for living with my favorite human.', time: '6:06 PM' },
      ],
    },
    {
      id: 'proposal',
      date: '18 SEP 2025',
      title: 'THE PROPOSAL',
      photoUrl: '/assets/images/proposal.jpg',
      photoCaption: 'Terrace overlooking the city at dusk',
      messages: [
        { sender: 'groom', text: 'Four years later...', time: '8:30 PM' },
        { sender: 'bride', text: 'Best conversation I ever said yes to. A million times over. 💍', time: '8:35 PM' },
      ],
    },
  ],
  photoCategories: ['Us', 'Adventures', 'Proposal', 'Family', 'Wedding'],
  photos: [
    {
      id: 'photo-1',
      title: 'Under the Tuscan Sun',
      category: 'Adventures',
      url: '/assets/images/hero-couple.jpg',
      caption: 'Golden hour moments in the countryside',
    },
    {
      id: 'photo-2',
      title: 'Forever Starts Here',
      category: 'Us',
      url: '/assets/images/lock-portrait.jpg',
      caption: 'Emily & Joshua, dusk portrait',
    },
    {
      id: 'photo-3',
      title: 'The Rooftop Question',
      category: 'Proposal',
      url: '/assets/images/proposal.jpg',
      caption: 'The twilight proposal overlooking the lights',
    },
    {
      id: 'photo-4',
      title: 'Afternoon in SoHo',
      category: 'Us',
      url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80',
      caption: 'Autumn stroll in downtown Manhattan',
    },
    {
      id: 'photo-5',
      title: 'Italian Coastline',
      category: 'Adventures',
      url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80',
      caption: 'Our favorite summer together',
    },
    {
      id: 'photo-6',
      title: 'Family Thanksgiving',
      category: 'Family',
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80',
      caption: 'Surrounded by the ones who shaped us',
    },
    {
      id: 'photo-7',
      title: 'The Rings',
      category: 'Wedding',
      url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      caption: 'Restrained elegance in gold and diamond',
    },
    {
      id: 'photo-8',
      title: 'Winter Evenings',
      category: 'Us',
      url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=80',
      caption: 'Hot chocolate by the fireplace',
    },
  ],
  events: [
    {
      id: 'ceremony',
      title: 'The Ceremony',
      time: '4:00 PM',
      endTime: '5:00 PM',
      venue: 'The Glasshouse',
      address: '660 12th Avenue',
      city: 'New York, NY 10019',
      description: 'An intimate vows ceremony with sweeping floor-to-ceiling panoramic views of the Hudson River sunset.',
      imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80',
      googleMapsUrl: 'https://maps.google.com/?q=The+Glasshouse+660+12th+Ave+New+York',
      dressCode: 'Black Tie Optional',
    },
    {
      id: 'cocktails',
      title: 'Cocktails & Sunset',
      time: '5:30 PM',
      endTime: '6:45 PM',
      venue: 'The Terrace Lounge',
      address: '660 12th Avenue, 5th Floor',
      city: 'New York, NY 10019',
      description: 'Artisanal champagne, curated cocktails, and hors d’oeuvres accompanied by a live jazz trio on the heated river terrace.',
      imageUrl: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1000&q=80',
      googleMapsUrl: 'https://maps.google.com/?q=The+Glasshouse+New+York',
      dressCode: 'Black Tie Optional',
    },
    {
      id: 'reception',
      title: 'The Dinner & Reception',
      time: '7:00 PM',
      endTime: 'Midnight',
      venue: 'The Grand Hall',
      address: '660 12th Avenue',
      city: 'New York, NY 10019',
      description: 'A candlelit four-course seasonal dinner, heartfelt toasts, cake cutting, followed by unforgettable dancing late into the evening.',
      imageUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80',
      googleMapsUrl: 'https://maps.google.com/?q=The+Glasshouse+New+York',
      dressCode: 'Black Tie Optional',
    },
  ],
  places: [
    {
      id: 'place-glasshouse',
      category: 'Ceremony',
      name: 'The Glasshouse',
      tagline: 'Ceremony · 4:00 PM',
      address: '660 12th Ave, New York, NY 10019',
      distanceInfo: '12 min from recommended hotel',
      imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      mapsUrl: 'https://maps.google.com/?q=The+Glasshouse+New+York',
    },
    {
      id: 'place-terrace',
      category: 'Reception',
      name: 'The Terrace & Grand Hall',
      tagline: 'Cocktails & Dinner · 5:30 PM',
      address: '660 12th Ave, New York, NY 10019',
      distanceInfo: 'Same venue complex',
      imageUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
      mapsUrl: 'https://maps.google.com/?q=The+Glasshouse+New+York',
    },
    {
      id: 'place-carlyle',
      category: 'Hotel',
      name: 'The Carlyle, A Rosewood Hotel',
      tagline: 'Official Wedding Guest Room Block',
      address: '35 E 76th St, New York, NY 10021',
      distanceInfo: '15 min drive to venue',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      mapsUrl: 'https://maps.google.com/?q=The+Carlyle+New+York',
    },
    {
      id: 'place-jfk',
      category: 'Airport',
      name: 'JFK & LaGuardia International',
      tagline: 'Primary Flight Hubs',
      address: 'Queens, New York, NY',
      distanceInfo: '45-60 min via taxi / express train',
      imageUrl: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=800&q=80',
      mapsUrl: 'https://maps.google.com/?q=JFK+Airport+New+York',
    },
  ],
  /**
   * Soundtrack Playlist:
   * The player automatically loads ALL real audio files (.mp3, .wav, .m4a)
   * found in the songs/ directory (src/assets/songs/ or public/assets/songs/).
   * Any new song dropped in the folder will appear and play automatically!
   */
  soundtrack: [
    {
      id: 'song-1',
      title: 'Song 1',
      artist: 'Wedding Soundtrack',
      label: 'Our Soundtrack',
      duration: '3:20',
      audioUrl: '/src/assets/songs/song1.mp3',
    },
    {
      id: 'song-2',
      title: 'Song 2',
      artist: 'Wedding Soundtrack',
      label: 'Our Soundtrack',
      duration: '3:45',
      audioUrl: '/src/assets/songs/song2.mp3',
    },
    {
      id: 'song-3',
      title: 'Song 3',
      artist: 'Wedding Soundtrack',
      label: 'Our Soundtrack',
      duration: '3:15',
      audioUrl: '/src/assets/songs/song3.mp3',
    },
  ],
  attire: {
    title: 'What to Wear',
    subtitle: 'Editorial Dress Code & Moodboard',
    dressCode: 'Black Tie Optional',
    description: 'We invite you to dress in celebratory formal wear. Think classic silhouettes, refined tailoring, and rich textured fabrics.',
    palettes: [
      { name: 'Champagne', hex: '#B89253', description: 'Warm metallic elegance' },
      { name: 'Muted Sage', hex: '#8A947A', description: 'Understated botanical accent' },
      { name: 'Warm Charcoal', hex: '#1E1A17', description: 'Timeless tuxedo & evening wear' },
      { name: 'Soft Cream', hex: '#F2EADF', description: 'Neutral silk & linen tones' },
    ],
    sections: [
      {
        event: 'Ladies',
        code: 'Floor-length gowns or refined cocktail dresses',
        description: 'Silk, satin, or crepe fabrics in warm neutrals, sage, champagne, or jewel tones.',
        guidelines: ['Floor-length or sophisticated midi dresses', 'Elegant heels or dressy flats', 'Wrap or shawl for breezy river terrace'],
      },
      {
        event: 'Gentlemen',
        code: 'Tuxedos or dark tailored suits with neckties',
        description: 'Black, midnight blue, or charcoal suits paired with crisp white dress shirts and polished leather footwear.',
        guidelines: ['Black tie tuxedo or tailored dark suit', 'Necktie or bow tie encouraged', 'Polished dress shoes'],
      },
    ],
  },
  promisesNote: {
    title: 'Things we promised each other',
    items: [
      { text: 'Travel somewhere new every year', done: true },
      { text: 'Adopt a sweet golden retriever', done: true },
      { text: 'Learn to cook homemade pasta together', done: true },
      { text: 'Celebrate our wedding in New York', done: true },
      { text: 'Grow old together, laughing through it all', done: false },
    ],
  },
};

/**
 * Direct alias for weddingConfig
 */
export const weddingData = weddingConfig;
