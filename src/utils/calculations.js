import { EXPENSE_CATEGORIES } from '../data/categories.js';
import { formatCurrency } from './currency.js';

/**
 * Calculates budget summary for a given month
 */
export const calculateMonthlyStats = (monthlyBudgetAmount, transactions = [], selectedMonth, currencyCode = 'TWD') => {
  const budget = Number(monthlyBudgetAmount) || 0;
  
  // Filter transactions for the selected month (date in format YYYY-MM-DD)
  const monthTransactions = transactions.filter(t => t.date && t.date.startsWith(selectedMonth));
  
  const totalExpenses = monthTransactions.reduce((acc, t) => acc + (Number(t.amount) || 0), 0);
  
  const remainingBudget = budget - totalExpenses;
  const overspentAmount = totalExpenses > budget ? totalExpenses - budget : 0;
  
  let usagePercentage = 0;
  if (budget > 0) {
    usagePercentage = (totalExpenses / budget) * 100;
  } else if (totalExpenses > 0) {
    usagePercentage = 100; // If expenses exist without budget
  }

  // Calculate Delulu Status
  let deluluStatus = {
    level: 'safe',
    title: 'Financially Responsible Fan',
    badge: 'Bias Approved',
    message: 'Your bias would be proud! Slaying both your stan life and bank account ♡',
    emoji: '💖',
    color: '#10B981',
    bgColor: '#ECFDF5',
    borderColor: '#A7F3D0'
  };

  if (budget <= 0) {
    deluluStatus = {
      level: 'no_budget',
      title: 'No Monthly Budget Configured',
      badge: 'Trainee Era',
      message: 'Bestie, set a monthly budget so we can keep track of your delulu spending!',
      emoji: '🌱',
      color: '#6B7280',
      bgColor: '#F3F4F6',
      borderColor: '#E5E7EB'
    };
  } else if (usagePercentage >= 100) {
    deluluStatus = {
      level: 'bankruptcy',
      title: 'Delulu Bankruptcy Era',
      badge: 'Budget Exceeded',
      message: `Emotionally rich, financially struggling. You exceeded your monthly budget by ${formatCurrency(overspentAmount, currencyCode)}!`,
      emoji: '💸',
      color: '#EF4444',
      bgColor: '#FEF2F2',
      borderColor: '#FECACA'
    };
  } else if (usagePercentage >= 80) {
    deluluStatus = {
      level: 'danger',
      title: 'Photocard Emergency',
      badge: 'Danger Zone',
      message: 'BESTIE, THE COMEBACK IS NOT GOING TO PAY YOUR BILLS! Step away from the checkout cart!',
      emoji: '🚨',
      color: '#F59E0B',
      bgColor: '#FFFBEB',
      borderColor: '#FDE68A'
    };
  } else if (usagePercentage >= 50) {
    deluluStatus = {
      level: 'caution',
      title: 'Comeback Temptation Zone',
      badge: 'Stay Strong',
      message: 'Comeback teasers dropped! Stay strong, bestie — think twice before clicking pre-order!',
      emoji: '⚠️',
      color: '#3B82F6',
      bgColor: '#EFF6FF',
      borderColor: '#BFDBFE'
    };
  }

  // Spending breakdown by category
  const categoryTotals = {};
  EXPENSE_CATEGORIES.forEach(cat => {
    categoryTotals[cat.id] = {
      ...cat,
      total: 0,
      count: 0,
      percentage: 0
    };
  });

  monthTransactions.forEach(t => {
    const catId = t.category || 'other_expenses';
    if (!categoryTotals[catId]) {
      categoryTotals[catId] = {
        id: catId,
        name: 'Other',
        emoji: '🎀',
        color: '#9CA3AF',
        bgColor: '#F3F4F6',
        total: 0,
        count: 0,
        percentage: 0
      };
    }
    categoryTotals[catId].total += Number(t.amount) || 0;
    categoryTotals[catId].count += 1;
  });

  const categoryBreakdown = Object.values(categoryTotals)
    .filter(cat => cat.total > 0)
    .map(cat => ({
      ...cat,
      percentage: totalExpenses > 0 ? (cat.total / totalExpenses) * 100 : 0
    }))
    .sort((a, b) => b.total - a.total);

  return {
    budget,
    totalExpenses,
    remainingBudget,
    overspentAmount,
    usagePercentage: Math.round(usagePercentage * 10) / 10,
    transactionCount: monthTransactions.length,
    deluluStatus,
    categoryBreakdown,
    monthTransactions
  };
};

/**
 * Calculates statistics for attended concerts
 */
export const calculateConcertMemoriesStats = (concerts = []) => {
  if (!concerts || concerts.length === 0) {
    return {
      totalConcerts: 0,
      totalSpent: 0,
      averageSpent: 0,
      mostExpensiveConcert: null,
      topGroup: null,
      favoriteConcert: null,
      yearlySpending: []
    };
  }

  let totalSpent = 0;
  let mostExpensive = concerts[0];
  let mostExpensiveCost = 0;
  let highestRated = concerts[0];
  let highestRating = -1;

  const groupCounts = {};
  const yearTotals = {};

  concerts.forEach(c => {
    const cost = 
      (Number(c.ticketPrice) || 0) +
      (Number(c.transportCost) || 0) +
      (Number(c.accommodationCost) || 0) +
      (Number(c.foodCost) || 0) +
      (Number(c.merchCost) || 0) +
      (Number(c.otherCost) || 0);

    totalSpent += cost;

    if (cost > mostExpensiveCost) {
      mostExpensiveCost = cost;
      mostExpensive = { ...c, totalCost: cost };
    }

    const rating = Number(c.rating) || 0;
    if (rating > highestRating) {
      highestRating = rating;
      highestRated = c;
    }

    // Group frequency
    const groupName = c.groupName || 'Unknown Artist';
    groupCounts[groupName] = (groupCounts[groupName] || 0) + 1;

    // Yearly spending
    const year = c.date ? c.date.split('-')[0] : 'Unknown';
    if (!yearTotals[year]) {
      yearTotals[year] = { year, total: 0, count: 0 };
    }
    yearTotals[year].total += cost;
    yearTotals[year].count += 1;
  });

  let topGroup = null;
  let maxCount = 0;
  Object.entries(groupCounts).forEach(([name, count]) => {
    if (count > maxCount) {
      maxCount = count;
      topGroup = { name, count };
    }
  });

  const yearlySpending = Object.values(yearTotals).sort((a, b) => a.year.localeCompare(b.year));

  return {
    totalConcerts: concerts.length,
    totalSpent,
    averageSpent: concerts.length > 0 ? Math.round(totalSpent / concerts.length) : 0,
    mostExpensiveConcert: mostExpensiveCost > 0 ? mostExpensive : null,
    topGroup,
    favoriteConcert: highestRating > 0 ? highestRated : null,
    yearlySpending
  };
};

/**
 * Calculates single attended concert total cost
 */
export const calculateSingleConcertTotal = (concert) => {
  if (!concert) return 0;
  return (
    (Number(concert.ticketPrice) || 0) +
    (Number(concert.transportCost) || 0) +
    (Number(concert.accommodationCost) || 0) +
    (Number(concert.foodCost) || 0) +
    (Number(concert.merchCost) || 0) +
    (Number(concert.otherCost) || 0)
  );
};

/**
 * Calculates single upcoming concert estimated total cost
 */
export const calculateUpcomingEstimatedTotal = (concert) => {
  if (!concert) return 0;
  return (
    (Number(concert.estimatedTicket) || 0) +
    (Number(concert.estimatedTransport) || 0) +
    (Number(concert.estimatedAccommodation) || 0) +
    (Number(concert.estimatedFood) || 0) +
    (Number(concert.estimatedMerch) || 0) +
    (Number(concert.estimatedOther) || 0)
  );
};

/**
 * Calculates savings progress & motivation message
 */
export const calculateSavingsProgress = (currentAmount, targetAmount) => {
  const current = Number(currentAmount) || 0;
  const target = Number(targetAmount) || 0;
  const remaining = Math.max(0, target - current);
  
  let percentage = 0;
  if (target > 0) {
    percentage = Math.min(100, Math.round((current / target) * 100));
  } else if (current > 0) {
    percentage = 100;
  }

  const isCompleted = target > 0 && current >= target;

  let message = "Concert savings era initiated! Let's get that barricade ticket! 🎀";
  if (isCompleted) {
    message = "CONCERT ERA UNLOCKED! Your dedication is unmatched! 🎉";
  } else if (percentage >= 80) {
    message = "You're almost ready for your concert era! Lightstick is within reach! ✨";
  } else if (percentage >= 50) {
    message = "Halfway there, bestie! Keep your eye on the barricade! 💖";
  } else if (current > 0) {
    message = "Your concert dream is getting closer! Every cent counts! 🎫";
  }

  return {
    current,
    target,
    remaining,
    percentage,
    isCompleted,
    message
  };
};
