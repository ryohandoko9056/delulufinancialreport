import { getCurrentMonth, getTodayDateString } from './dateHelpers.js';

export const STORAGE_KEYS = {
  APP_DATA: 'delulu_budget_data_v1',
  THEME: 'delulu_theme_v1'
};

export const SCHEMA_VERSION = '1.0.0';

export const INITIAL_DATA = {
  version: SCHEMA_VERSION,
  profile: {
    nickname: 'Hanni Bunny',
    primaryGroupId: 'newjeans',
    primaryGroupName: 'NewJeans',
    bias: 'Hanni',
    biasWrecker: 'Minji',
    currency: 'TWD',
    theme: 'coquette_pink',
    monthlyBudget: 18000,
    avatar: null
  },
  monthlyBudgets: {
    // Format: 'YYYY-MM': amount
    [getCurrentMonth()]: 18000
  },
  transactions: [
    {
      id: 'tx_seed_1',
      name: "NewJeans 'Get Up' Beach Bag Album (Hanni Ver.)",
      amount: 850,
      date: getTodayDateString(),
      category: 'albums',
      groupId: 'newjeans',
      groupName: 'NewJeans',
      concertId: null,
      notes: 'Came with 3 holographic cards and beach bag!'
    },
    {
      id: 'tx_seed_2',
      name: 'Hanni Singapore Fancall Lucky Draw PC',
      amount: 1450,
      date: getTodayDateString(),
      category: 'photocards',
      groupId: 'newjeans',
      groupName: 'NewJeans',
      concertId: null,
      notes: 'Mint condition, double sleeved in pink toploader ♡'
    },
    {
      id: 'tx_seed_3',
      name: 'Official Binky Bong Lightstick + Parts',
      amount: 1750,
      date: getTodayDateString(),
      category: 'merchandise',
      groupId: 'newjeans',
      groupName: 'NewJeans',
      concertId: null,
      notes: 'Tested Bluetooth mode with NewJeans MV!'
    },
    {
      id: 'tx_seed_4',
      name: 'Taro Milk Tea at Minji Birthday Cafe',
      amount: 160,
      date: getTodayDateString(),
      category: 'food_drinks',
      groupId: 'newjeans',
      groupName: 'NewJeans',
      concertId: null,
      notes: 'Received free cup sleeve and sticker sheet!'
    },
    {
      id: 'tx_seed_5',
      name: 'Phoning App Monthly Subscription',
      amount: 150,
      date: getTodayDateString(),
      category: 'digital_subscriptions',
      groupId: 'newjeans',
      groupName: 'NewJeans',
      concertId: null,
      notes: 'Got a cute morning audio voice note!'
    }
  ],
  savingsGoals: [
    {
      id: 'goal_seed_1',
      name: 'NewJeans 1st World Tour VIP Floor Barricade',
      groupId: 'newjeans',
      groupName: 'NewJeans',
      concertName: 'Bunnies Camp World Tour',
      targetAmount: 15000,
      currentAmount: 10500,
      targetDate: '2026-12-15',
      notes: 'Must get VIP Soundcheck ticket and cute tour hoodie!'
    },
    {
      id: 'goal_seed_2',
      name: 'aespa SYNK: PARALLEL LINE Taipei Trip',
      groupId: 'aespa',
      groupName: 'aespa',
      concertName: 'SYNK : PARALLEL LINE in Taipei',
      targetAmount: 12000,
      currentAmount: 12000,
      targetDate: '2026-11-20',
      notes: 'Completed goal! Ready for Supernova live!'
    }
  ],
  upcomingConcerts: [
    {
      id: 'up_seed_1',
      concertName: 'aespa LIVE TOUR - SYNK : PARALLEL LINE in Taipei',
      groupId: 'aespa',
      groupName: 'aespa',
      date: '2026-11-20',
      time: '19:00',
      venue: 'NTSU Arena (Linkou Arena)',
      city: 'Taipei',
      country: 'Taiwan',
      ticketingDate: '2026-11-01',
      ticketingDeadline: '2026-11-05',
      ticketStatus: 'Ticket Purchased',
      estimatedTicket: 5800,
      estimatedTransport: 700,
      estimatedAccommodation: 2400,
      estimatedFood: 800,
      estimatedMerch: 1800,
      estimatedOther: 300,
      ticketingUrl: 'https://tixcraft.com',
      linkedGoalId: 'goal_seed_2',
      notes: 'Section B Floor VIP! Soundcheck pass included!'
    }
  ],
  concertMemories: [
    {
      id: 'mem_seed_1',
      concertName: 'IVE THE 1ST WORLD TOUR <SHOW WHAT I HAVE> in Taipei',
      groupId: 'ive',
      groupName: 'IVE',
      date: '2024-03-02',
      venue: 'NTSU Arena (Linkou Arena)',
      city: 'Taipei',
      country: 'Taiwan',
      seatingSection: 'VIP Standing Section A',
      ticketPrice: 5800,
      transportCost: 600,
      accommodationCost: 2000,
      foodCost: 750,
      merchCost: 2100,
      otherCost: 350,
      rating: 5,
      favoriteMemory: "Wonyoung blew a kiss directly to our section during 'I AM' and Liz's high note shook the entire arena! ♡",
      notes: 'Best day of my life! Lightstick sync was so pretty in the dark!',
      photos: []
    }
  ],
  customGroups: []
};

/**
 * Loads data from localStorage with schema validation & fallback
 */
export const loadAppData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.APP_DATA);
    if (!raw) {
      saveAppData(INITIAL_DATA);
      return INITIAL_DATA;
    }
    const parsed = JSON.parse(raw);
    
    // Ensure all critical root keys exist
    return {
      version: parsed.version || SCHEMA_VERSION,
      profile: { ...INITIAL_DATA.profile, ...(parsed.profile || {}) },
      monthlyBudgets: { ...INITIAL_DATA.monthlyBudgets, ...(parsed.monthlyBudgets || {}) },
      transactions: Array.isArray(parsed.transactions) ? parsed.transactions : [],
      savingsGoals: Array.isArray(parsed.savingsGoals) ? parsed.savingsGoals : [],
      upcomingConcerts: Array.isArray(parsed.upcomingConcerts) ? parsed.upcomingConcerts : [],
      concertMemories: Array.isArray(parsed.concertMemories) ? parsed.concertMemories : [],
      customGroups: Array.isArray(parsed.customGroups) ? parsed.customGroups : []
    };
  } catch (err) {
    console.error('Failed to parse localStorage data:', err);
    return INITIAL_DATA;
  }
};

/**
 * Saves entire state into localStorage
 */
export const saveAppData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEYS.APP_DATA, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error('Failed to save to localStorage (storage quota may be exceeded):', err);
    return false;
  }
};

/**
 * Image compressor using HTML5 canvas
 * Resizes image to max 800x800 and compresses to JPEG ~0.7 quality
 */
export const compressImageFile = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('No file provided'));
    if (!file.type.startsWith('image/')) return reject(new Error('File is not an image'));

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Quality 0.7 JPEG produces ~30-80KB images
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image for compression'));
      img.src = readerEvent.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};
