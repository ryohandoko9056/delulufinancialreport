# 🎀 Delulu Budget Tracker ♡ K-pop Finance & Concert Planner

> *"Stay delulu, but keep your budget real!"*

**Delulu Budget Tracker** is a cute, funny, interactive, and aesthetic personal finance web application tailored specifically for K-pop fans. It combines personal finance management, K-pop spending categorization (albums, photocards, lightsticks, bubble subscriptions), concert tour planning, attended concert scrapbooks, savings goals with celebratory confetti, and a comprehensive database of K-pop groups and idols.

Built with **React**, **Vite**, **Lucide Icons**, and **Recharts**, styled in a soft coquette aesthetic with pastel themes (Pink, Lavender, Baby Blue, Peach Blossom, Soft Cream).

---

## 🌸 Key Features

### 1. 💖 Personalized Fan Dashboard & Dynamic "Delulu Status"
- **Personalized Stan Greeting:** Welcomes the fan using their custom nickname and shows encouragement from their bias and ult group.
- **Dynamic Delulu Status Banner:** Automatically calculated from actual monthly budget utilization:
  - `< 50%`: *"Financially Responsible Fan — Your bias would be proud!"* (Safe)
  - `50% – 79%`: *"Comeback Temptation Zone — Stay strong, bestie!"* (Caution)
  - `80% – 99%`: *"Photocard Emergency — BESTIE, THE COMEBACK IS NOT GOING TO PAY YOUR BILLS!"* (Danger)
  - `≥ 100%`: *"Delulu Bankruptcy Era — Emotionally rich, financially struggling."* (Overbudget warning with exact overspent amount)
  - *No budget set:* Friendly prompt to configure a spending limit.
- **Financial Summary Cards:** Total monthly budget, total expenses for selected month, remaining balance, active planned concerts, and total saved for tours.
- **Interactive Budget Progress Bar:** Color-coded with comfortable, warning, and overbudget visual states (layout-safe when spending exceeds 100%).
- **Interactive Spending Breakdown Charts:** Switch dynamically between Doughnut/Pie chart, Horizontal Bar chart, and detailed category list.
- **Nearest Upcoming Concert Widget:** Shows days countdown, ticket purchase status, estimated tour expenses, and linked savings goal progress.
- **Recent Transactions Feed:** Shows latest fan expenses with quick edit/delete actions.

### 2. 🛍️ Expense Management & K-pop Categorization
- Add, edit, and delete transactions with full numeric validation (prevents negative values).
- 10 specialized K-pop categories:
  - 💿 **Albums** (Comebacks, digipaks, signed editions)
  - ✨ **Photocards** (POBs, lucky draws, trading cards)
  - 🛍️ **Merchandise** (Lightsticks, tour hoodies, season's greetings)
  - 🎫 **Concert Tickets** (VIP floor, soundcheck, general admission)
  - 🧋 **Food and Drinks** (Boba runs, cup sleeve events)
  - ✈️ **Transportation** (Flights, high-speed rail, shuttles)
  - 🏨 **Accommodation** (Hotels, stays near stadiums)
  - 💌 **Fan Events** (Fan meetings, fansigns, birthday cafes)
  - 📱 **Digital Subscriptions** (Bubble, Weverse DM, Fromm)
  - 🎀 **Other Expenses** (Lightstick batteries, toploaders, concert outfits)
- Filter by category, month, and year.
- Search transactions by name, group, or personal notes.
- Sort by date (newest/oldest) or amount (highest/lowest).

### 3. 📸 Concert Memories — Attended Concert Scrapbook
- Digital fan journal recording all live concerts and tours attended.
- Tracks itemized spending: Ticket price, transport, accommodation, food & drinks, tour merch, and miscellaneous costs.
- Calculates total concert spending, average cost per concert, and yearly expenditure trends.
- Interactive 5-star ratings, favorite concert memory quote, and seating section (e.g., VIP Soundcheck Section A).
- **Photo Gallery:** Upload concert memories and ticket stubs with automatic HTML5 Canvas compression to optimize browser storage without exceeding limits.
- Full search, group filtering, and yearly analytics.

### 4. 🗓️ Upcoming Concerts — Tour Planner & Interactive Calendar
- **Interactive Calendar:** Toggle between **Month Grid View** and **Agenda View**. Navigate between months, click any date to schedule a concert, and click any event to view/edit.
- **Dynamic Countdowns:** Real-time countdown in days to the concert and ticket sale deadlines (e.g. *"12 days until you see your bias!"*).
- **Ticket Statuses:** *Planning to Buy*, *Ticket Purchased*, *Not Available Yet*, and *Sold Out*.
- Links directly to ticketing websites and linked savings goals.
- **"Mark as Attended" Conversion Workflow:**
  - Converts an upcoming event into Concert Memories.
  - Prompts for actual expenses while preserving original estimated costs for comparison.
  - Prevents duplicate records and avoids double-counting savings with actual expenses.

### 5. 🐷 Concert Savings Goals & Celebration
- Dedicated savings tracker for barricade tickets, lightsticks, and tour travel.
- Animated progress bars displaying current vs target amount and percentage saved.
- **Confetti Celebration:** Reaching or completing 100% of a goal triggers a festive confetti animation (respects `prefers-reduced-motion`).
- Quick "Add Contribution" action with real-time balance updates.
- Links to planned upcoming concerts.

### 6. 🎶 Comprehensive K-pop Group & Member Database
- Over 85 boy groups, girl groups, co-ed groups, and soloists categorized across 5 generations:
  - **1st Gen (1992–2002):** S.E.S., Fin.K.L., H.O.T., Sechs Kies, Shinhwa, g.o.d.
  - **2nd Gen (2003–2011):** Girls' Generation (SNSD), Wonder Girls, KARA, 2NE1, f(x), T-ara, miss A, SISTAR, Apink, TVXQ, BIGBANG, Super Junior, SHINee, 2PM, INFINITE, BEAST / HIGHLIGHT, MBLAQ, B1A4, IU, TAEYEON, SUNMI, TAEMIN.
  - **3rd Gen (2012–2017):** Red Velvet, TWICE, BLACKPINK, MAMAMOO, GFRIEND, Oh My Girl, WJSN, EXID, Dreamcatcher, LOONA, BTS, EXO, SEVENTEEN, GOT7, MONSTA X, NCT (127/DREAM/WayV), WINNER, iKON, BTOB, VIXX, KARD, AKMU, CHUNG HA, BAEKHYUN, WONHO.
  - **4th Gen (2018–2022):** ITZY, aespa, IVE, LE SSERAFIM, NewJeans, NMIXX, STAYC, (G)I-DLE, Kep1er, tripleS, H1-KEY, Stray Kids, ATEEZ, TXT, ENHYPEN, THE BOYZ, TREASURE, P1Harmony, CRAVITY, ONEUS.
  - **5th Gen (2023–Present):** ILLIT, BABYMONSTER, KISS OF LIFE, Hearts2Hearts, KiiiKiii, izna, ZEROBASEONE, RIIZE, BOYNEXTDOOR, TWS, xikers, KickFlip.
- **Accurate Lineups:** Member lists with stage names, real names, and active / former / memorial statuses.
- **Custom Artists:** Easily add custom groups, soloists, or members if not in the default catalog.
- Reusable selectors throughout profile settings, transactions, and concert forms.

### 7. 🎨 Themes, Multi-Currency & Data Management
- **5 Aesthetic Themes:** Coquette Pink (default), Lavender Dream, Baby Blue, Peach Blossom, and Soft Cream.
- **6 Supported Currencies:** New Taiwan Dollar (NT$ / TWD, default), Indonesian Rupiah (Rp / IDR), US Dollar ($ / USD), South Korean Won (₩ / KRW), Japanese Yen (¥ / JPY), and Euro (€ / EUR).
- **Data Backup & Restore:** Export full application state as a JSON file and import backups with validation.
- **Reset to Defaults:** Safe confirmation dialog before wiping local storage.

---

## 🛠️ Technology Stack

- **Frontend:** React 18 with Vite
- **Styling:** Semantic CSS3, custom CSS Variables for themes, Flexbox & CSS Grid, responsive mobile design
- **Icons:** [Lucide React](https://lucide.dev)
- **Visualizations:** [Recharts](https://recharts.org) (Pie, Doughnut, and Bar charts)
- **Celebration Effects:** [canvas-confetti](https://github.com/catdad/canvas-confetti)
- **Storage:** HTML5 `localStorage` with JSON schema validation & HTML5 Canvas image compression

---

## 📁 Project Structure

```
delulu-budget-tracker/
├── dist/                          # Production build output
├── public/
│   ├── icons/
│   └── images/
├── src/
│   ├── components/
│   │   ├── BudgetProgress.jsx     # Spending bar with threshold states (<50%, 80%, 100%+)
│   │   ├── ConcertCalendar.jsx    # Month grid and agenda calendar
│   │   ├── ConcertCard.jsx        # Attended & upcoming tour cards with countdowns
│   │   ├── ConvertConcertModal.jsx# "Mark as Attended" conversion workflow
│   │   ├── DashboardCard.jsx      # Stat cards with badges and icons
│   │   ├── GroupSelector.jsx      # Searchable artist selector with type/gen filters
│   │   ├── MemberSelector.jsx     # Member and bias selector with status indicators
│   │   ├── Modal.jsx              # Accessible modal dialog with keyboard navigation
│   │   ├── Navbar.jsx             # Top bar with greeting, month selector & theme menu
│   │   ├── SavingsGoalCard.jsx    # Savings card with progress bar & confetti triggers
│   │   ├── Sidebar.jsx            # Desktop & mobile drawer navigation
│   │   ├── Toast.jsx              # Toast notification system
│   │   ├── TransactionForm.jsx    # Expense entry form with full validation
│   │   └── TransactionList.jsx    # Searchable, filterable expense list
│   ├── context/
│   │   └── BudgetContext.jsx      # Global React state, storage sync, and theme manager
│   ├── data/
│   │   ├── categories.js          # 10 K-pop expense categories with icons and colors
│   │   └── kpopGroups.js          # 85+ K-pop artists (1st–5th Gen) and member lists
│   ├── hooks/
│   │   ├── useBudget.js           # Re-exports useBudget context hook
│   │   └── useLocalStorage.js     # Standalone local storage hook
│   ├── pages/
│   │   ├── ConcertMemories.jsx    # Attended tours, memory quotes, photos, stats
│   │   ├── Dashboard.jsx          # Summary cards, delulu banner, charts, widgets
│   │   ├── KpopGroups.jsx         # Searchable group catalog and member profiles
│   │   ├── SavingsGoals.jsx       # Concert savings goals and progress
│   │   ├── Settings.jsx           # Profile setup, currencies, themes, backup/restore
│   │   ├── Transactions.jsx       # Complete transaction management page
│   │   └── UpcomingConcerts.jsx   # Planned concerts, calendar, ticketing reminders
│   ├── utils/
│   │   ├── calculations.js        # Budget usage, Delulu status, concert stats
│   │   ├── currency.js            # Currency formatting with Intl.NumberFormat
│   │   ├── dateHelpers.js         # Month grids, local timezone countdowns
│   │   └── storage.js             # LocalStorage manager, schema migration, image compression
│   ├── App.jsx                    # Root component with routing and layout
│   ├── index.css                  # Soft coquette design system & theme variables
│   └── main.jsx                   # React entrypoint
├── index.html                     # HTML5 template with Google Fonts
├── package.json
├── test-workflows.js              # Automated test suite (31/31 passed)
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended; developed and verified on Node v24.22.1)
- npm or pnpm

### Installation
1. Clone or extract the repository files.
2. In the project root directory, install dependencies:
   ```bash
   npm install
   ```

### Running Locally (Development Mode)
Start the Vite development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Building for Production
Create the optimized production bundle:
```bash
npm run build
```
The output will be generated inside the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

### Running Automated Verification Tests
Run the workflow verification suite:
```bash
node test-workflows.js
```
*(All 31 workflow, calculation, database, and status tests pass!)*

---

## 💾 LocalStorage Data Model

The application automatically persists all state in `localStorage` under the key `delulu_budget_data_v1`.

### Data Schema (`SCHEMA_VERSION: 1.0.0`):
```json
{
  "version": "1.0.0",
  "profile": {
    "nickname": "Hanni Bunny",
    "primaryGroupId": "newjeans",
    "primaryGroupName": "NewJeans",
    "bias": "Hanni",
    "biasWrecker": "Minji",
    "currency": "TWD",
    "theme": "coquette_pink",
    "monthlyBudget": 18000,
    "avatar": "data:image/jpeg;base64,..."
  },
  "monthlyBudgets": {
    "2026-10": 18000
  },
  "transactions": [
    {
      "id": "tx_seed_1",
      "name": "NewJeans 'Get Up' Beach Bag Album",
      "amount": 850,
      "date": "2026-10-28",
      "category": "albums",
      "groupId": "newjeans",
      "groupName": "NewJeans",
      "concertId": null,
      "notes": "Came with 3 holographic cards!"
    }
  ],
  "savingsGoals": [
    {
      "id": "goal_seed_1",
      "name": "NewJeans 1st World Tour VIP Floor Barricade",
      "groupId": "newjeans",
      "groupName": "NewJeans",
      "targetAmount": 15000,
      "currentAmount": 10500,
      "targetDate": "2026-12-15",
      "notes": "Must get VIP Soundcheck ticket!"
    }
  ],
  "upcomingConcerts": [
    {
      "id": "up_seed_1",
      "concertName": "aespa LIVE TOUR - SYNK : PARALLEL LINE",
      "groupId": "aespa",
      "groupName": "aespa",
      "date": "2026-11-20",
      "time": "19:00",
      "venue": "NTSU Arena (Linkou Arena)",
      "city": "Taipei",
      "country": "Taiwan",
      "ticketingDate": "2026-11-01",
      "ticketStatus": "Ticket Purchased",
      "estimatedTicket": 5800,
      "estimatedTransport": 700,
      "estimatedAccommodation": 2400,
      "estimatedFood": 800,
      "estimatedMerch": 1800,
      "estimatedOther": 300,
      "linkedGoalId": "goal_seed_2",
      "notes": "VIP Soundcheck included!"
    }
  ],
  "concertMemories": [
    {
      "id": "mem_seed_1",
      "concertName": "IVE THE 1ST WORLD TOUR <SHOW WHAT I HAVE>",
      "groupId": "ive",
      "groupName": "IVE",
      "date": "2024-03-02",
      "venue": "NTSU Arena",
      "city": "Taipei",
      "country": "Taiwan",
      "seatingSection": "VIP Standing Section A",
      "ticketPrice": 5800,
      "transportCost": 600,
      "accommodationCost": 2000,
      "foodCost": 750,
      "merchCost": 2100,
      "otherCost": 350,
      "rating": 5,
      "favoriteMemory": "Wonyoung blew a kiss directly to our section during 'I AM' ♡",
      "photos": ["data:image/jpeg;base64,..."]
    }
  ],
  "customGroups": []
}
```

---

## 🧪 Quality Assurance & Tested Workflows

All user journeys described in the project requirements were systematically tested and validated:
1. **Transaction Management:** Adding expenses, editing existing records, deletion confirmations, search query matching, category filtering, monthly totals, and instant chart synchronization.
2. **Budget Management:** Setting budgets for different months, recalculating remaining balances, dynamic threshold messages at 50%, 80%, and 100%+ (budget exceeded).
3. **Savings Goals:** Real-time percentage updates, adding savings contributions, celebratory confetti on completion, and linking to upcoming tours.
4. **K-pop Database & Personalization:** Filtering by 1st through 5th gen, type filtering, member list switching, setting ult group and bias, and adding custom artists.
5. **Concert Memories:** Adding attended concerts, calculating itemized spending, displaying rating stars, and uploading compressed memory photos.
6. **Upcoming Concerts:** Monthly calendar grid navigation, agenda list view, event countdowns, ticketing reminders, and the "Mark as Attended" conversion workflow.
7. **Data Persistence & Backups:** Automatic synchronization with `localStorage`, JSON export, import validation with error protection, and secure data reset.

---

## ⚠️ Notes & Limitations

- **Browser Storage (localStorage):** User data is stored locally in the user's browser. Clearing browser cookies/cache will reset the data. Use the **Export Data Backup** feature in Settings to safeguard records.
- **Image Compression:** To prevent exceeding browser `localStorage` quotas (typically 5MB–10MB), uploaded photos are automatically downscaled to 800×800 JPEG (~30–70KB) using an HTML5 Canvas pipeline before storage.
- **Offline / In-App Notifications:** Because the application is a client-side web application without a background push server, ticketing reminders and concert countdowns are displayed in-app when the website is open.
- **Currency Conversions:** Display currency changes the formatting symbol without arbitrarily converting recorded monetary figures, ensuring numerical accuracy.

---

*Made with love, sparkles, and delulu dreams for K-pop fans worldwide! ♡*
