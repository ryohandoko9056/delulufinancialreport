export const EXPENSE_CATEGORIES = [
  {
    id: 'albums',
    name: 'Albums',
    icon: 'Disc3',
    emoji: '💿',
    color: '#FF6584',
    bgColor: '#FFF0F5',
    description: 'Comebacks, regular albums, digipaks, signed editions'
  },
  {
    id: 'photocards',
    name: 'Photocards',
    icon: 'Sparkles',
    emoji: '✨',
    color: '#E056FD',
    bgColor: '#F8EEFE',
    description: 'POBs, lucky draws, trading cards, binder sleeves'
  },
  {
    id: 'merchandise',
    name: 'Merchandise',
    icon: 'ShoppingBag',
    emoji: '🛍️',
    color: '#FF7675',
    bgColor: '#FFF2F2',
    description: 'Lightsticks, tour tees, plushies, seasons greetings'
  },
  {
    id: 'concert_tickets',
    name: 'Concert Tickets',
    icon: 'Ticket',
    emoji: '🎫',
    color: '#6C5CE7',
    bgColor: '#F0EEFF',
    description: 'VIP soundcheck, general admission, floor seating'
  },
  {
    id: 'food_drinks',
    name: 'Food and Drinks',
    icon: 'Coffee',
    emoji: '🧋',
    color: '#FD79A8',
    bgColor: '#FFF0F7',
    description: 'Boba runs, cup sleeve events, concert day snacks'
  },
  {
    id: 'transportation',
    name: 'Transportation',
    icon: 'Plane',
    emoji: '✈️',
    color: '#0984E3',
    bgColor: '#EDF7FF',
    description: 'Flights, High Speed Rail, subway, concert shuttles'
  },
  {
    id: 'accommodation',
    name: 'Accommodation',
    icon: 'Hotel',
    emoji: '🏨',
    color: '#00CEC9',
    bgColor: '#EEFDFD',
    description: 'Hotels, Airbnb, stays near the stadium/arena'
  },
  {
    id: 'fan_events',
    name: 'Fan Events',
    icon: 'HeartHandshake',
    emoji: '💌',
    color: '#E84393',
    bgColor: '#FFEBF5',
    description: 'Fan meetings, fansigns, birthday cafes, send-offs'
  },
  {
    id: 'digital_subscriptions',
    name: 'Digital Subscriptions',
    icon: 'Smartphone',
    emoji: '📱',
    color: '#A29BFE',
    bgColor: '#F4F2FF',
    description: 'Bubble, Weverse DM, Fromm, idol streaming passes'
  },
  {
    id: 'other_expenses',
    name: 'Other Expenses',
    icon: 'MoreHorizontal',
    emoji: '🎀',
    color: '#B2BEC3',
    bgColor: '#F5F6F8',
    description: 'Batteries for lightsticks, concert outfits, decor'
  }
];

export const getCategoryById = (id) => {
  return EXPENSE_CATEGORIES.find(cat => cat.id === id) || EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length - 1];
};
