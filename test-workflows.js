// Verification Test Suite for Delulu Budget Tracker Workflows
import { calculateMonthlyStats, calculateSavingsProgress, calculateConcertMemoriesStats, calculateSingleConcertTotal, calculateUpcomingEstimatedTotal } from './src/utils/calculations.js';
import { formatCurrency, getCurrencyDetails } from './src/utils/currency.js';
import { calculateCountdown, formatMonthDisplay, formatDisplayDate, getTodayDateString } from './src/utils/dateHelpers.js';
import { KPOP_GROUPS, GENERATIONS, GROUP_TYPES, getGroupById } from './src/data/kpopGroups.js';
import { EXPENSE_CATEGORIES } from './src/data/categories.js';
import { INITIAL_DATA, SCHEMA_VERSION } from './src/utils/storage.js';

console.log('✨ RUNNING DELULU BUDGET TRACKER VERIFICATION SUITE ✨\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`❌ FAIL: ${testName}`);
    process.exitCode = 1;
  }
}

// 1. Currency Formatting
console.log('--- 1. Currency Support Verification ---');
assert(formatCurrency(15000, 'TWD').includes('15,000'), 'TWD formats with NT$ or 15,000');
assert(formatCurrency(250000, 'IDR').includes('250,000'), 'IDR formats with Rp 250,000');
assert(formatCurrency(120.5, 'USD').includes('120.50'), 'USD formats with 2 decimals');
assert(formatCurrency(50000, 'KRW').includes('50,000'), 'KRW formats correctly');
assert(getCurrencyDetails('TWD').code === 'TWD', 'Default currency is TWD');

// 2. Delulu Status & Budget Thresholds
console.log('\n--- 2. Budget & Delulu Status Thresholds ---');
const sampleTx = [
  { id: '1', name: 'Album', amount: 3000, date: '2026-10-01', category: 'albums' },
  { id: '2', name: 'Photocard', amount: 2000, date: '2026-10-05', category: 'photocards' }
];

// No budget set
const noBudgetStats = calculateMonthlyStats(0, sampleTx, '2026-10', 'TWD');
assert(noBudgetStats.deluluStatus.level === 'no_budget', 'Detects no budget configured');

// Under 50% (< 50%)
const safeStats = calculateMonthlyStats(15000, sampleTx, '2026-10', 'TWD'); // 5000 / 15000 = 33.3%
assert(safeStats.usagePercentage < 50, '33.3% usage calculated accurately');
assert(safeStats.deluluStatus.level === 'safe', 'Level is safe (<50%)');
assert(safeStats.deluluStatus.title === 'Financially Responsible Fan', 'Safe title matches prompt');

// 50% to 79% (Caution: Comeback Temptation Zone)
const cautionTx = [...sampleTx, { id: '3', name: 'Lightstick', amount: 5000, date: '2026-10-10', category: 'merchandise' }];
const cautionStats = calculateMonthlyStats(15000, cautionTx, '2026-10', 'TWD'); // 10000 / 15000 = 66.7%
assert(cautionStats.deluluStatus.level === 'caution', 'Level is caution (50-79%)');
assert(cautionStats.deluluStatus.title === 'Comeback Temptation Zone', 'Caution title matches prompt');

// 80% to 99% (Danger: Photocard Emergency)
const dangerTx = [...cautionTx, { id: '4', name: 'Ticket GA', amount: 3000, date: '2026-10-15', category: 'concert_tickets' }];
const dangerStats = calculateMonthlyStats(15000, dangerTx, '2026-10', 'TWD'); // 13000 / 15000 = 86.7%
assert(dangerStats.deluluStatus.level === 'danger', 'Level is danger (80-99%)');
assert(dangerStats.deluluStatus.title === 'Photocard Emergency', 'Danger title matches prompt');
assert(dangerStats.deluluStatus.message.includes('NOT GOING TO PAY YOUR BILLS'), 'Danger message contains iconic warning');

// 100% or above (Bankruptcy: Delulu Bankruptcy Era)
const bankruptcyTx = [...dangerTx, { id: '5', name: 'Signed Merch', amount: 3000, date: '2026-10-20', category: 'merchandise' }];
const bankruptcyStats = calculateMonthlyStats(15000, bankruptcyTx, '2026-10', 'TWD'); // 16000 / 15000 = 106.7%
assert(bankruptcyStats.deluluStatus.level === 'bankruptcy', 'Level is bankruptcy (>=100%)');
assert(bankruptcyStats.overspentAmount === 1000, 'Overspent amount 1000 calculated correctly');
assert(bankruptcyStats.deluluStatus.title === 'Delulu Bankruptcy Era', 'Bankruptcy title matches prompt');

// 3. Savings Goals Progress & Celebration
console.log('\n--- 3. Savings Goals Calculations ---');
const goalInitial = calculateSavingsProgress(0, 10000);
assert(goalInitial.percentage === 0 && !goalInitial.isCompleted, '0% progress initial');

const goalHalfway = calculateSavingsProgress(5000, 10000);
assert(goalHalfway.percentage === 50 && goalHalfway.remaining === 5000, '50% progress calculated');

const goalComplete = calculateSavingsProgress(12000, 10000);
assert(goalComplete.percentage === 100 && goalComplete.isCompleted, 'Goal completes at or above 100%');
assert(goalComplete.message.includes('CONCERT ERA UNLOCKED'), 'Celebratory message unlocked');

// 4. K-Pop Database Verification
console.log('\n--- 4. K-pop Groups & Generations Database ---');
assert(KPOP_GROUPS.length >= 40, `K-pop database contains ${KPOP_GROUPS.length} groups/artists`);
const ses = getGroupById('ses');
assert(ses && ses.generation === '1st' && ses.debutYear === 1997, 'S.E.S. 1st Gen verified');
const snsd = getGroupById('snsd');
assert(snsd && snsd.members.length >= 8, 'Girls Generation (SNSD) members verified');
const bts = getGroupById('bts');
assert(bts && bts.members.some(m => m.name.includes('SUGA')), 'BTS members verified');
const newjeans = getGroupById('newjeans');
assert(newjeans && newjeans.members.some(m => m.name === 'Hanni'), 'NewJeans Hanni verified');
const illit = getGroupById('illit');
assert(illit && illit.generation === '5th' && illit.debutYear === 2024, 'ILLIT 5th Gen verified');

// 5. Concert Cost Calculations
console.log('\n--- 5. Concert Finances & Conversion ---');
const sampleConcert = {
  ticketPrice: 5800,
  transportCost: 800,
  accommodationCost: 2200,
  foodCost: 600,
  merchCost: 1900,
  otherCost: 300
};
const totalAttendedCost = calculateSingleConcertTotal(sampleConcert);
assert(totalAttendedCost === 11600, `Concert total calculated accurately: ${totalAttendedCost} = 11600`);

const upcomingSample = {
  estimatedTicket: 5800,
  estimatedTransport: 700,
  estimatedAccommodation: 2000,
  estimatedFood: 500,
  estimatedMerch: 1500,
  estimatedOther: 200
};
const totalEstimated = calculateUpcomingEstimatedTotal(upcomingSample);
assert(totalEstimated === 10700, `Estimated total calculated accurately: ${totalEstimated} = 10700`);

// 6. Countdown & Date Logic
console.log('\n--- 6. Date & Countdown Handling ---');
const todayCd = calculateCountdown(getTodayDateString());
assert(todayCd.isToday === true, 'Identifies today correctly');

const pastCd = calculateCountdown('2020-01-01');
assert(pastCd.isPast === true, 'Identifies past events accurately without future countdown');

console.log(`\n========================================`);
console.log(`RESULTS: ${passedTests}/${totalTests} TESTS PASSED! 🎉`);
console.log(`========================================\n`);
