import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loadAppData, saveAppData, INITIAL_DATA, SCHEMA_VERSION } from '../utils/storage';
import { getCurrentMonth } from '../utils/dateHelpers';

const BudgetContext = createContext(null);

export const THEMES = [
  { id: 'coquette_pink', name: 'Coquette Pink', primary: '#FF85A2', secondary: '#FFE4E9', accent: '#FF5E89', bg: '#FFF7F9' },
  { id: 'lavender_dream', name: 'Lavender Dream', primary: '#A29BFE', secondary: '#F1EFFF', accent: '#6C5CE7', bg: '#F9F8FF' },
  { id: 'baby_blue', name: 'Baby Blue', primary: '#74B9FF', secondary: '#EBF4FF', accent: '#0984E3', bg: '#F7FAFF' },
  { id: 'peach_blossom', name: 'Peach Blossom', primary: '#FAB1A0', secondary: '#FFF2EE', accent: '#E17055', bg: '#FFF9F7' },
  { id: 'soft_cream', name: 'Soft Cream', primary: '#FDCB6E', secondary: '#FEF9EE', accent: '#E67E22', bg: '#FFFCF7' }
];

export const BudgetProvider = ({ children }) => {
  const [appData, setAppData] = useState(() => loadAppData());
  const [toasts, setToasts] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(() => getCurrentMonth());

  // Save to localStorage whenever appData changes
  useEffect(() => {
    saveAppData(appData);
  }, [appData]);

  // Apply theme to document element
  useEffect(() => {
    const theme = appData?.profile?.theme || 'coquette_pink';
    document.documentElement.setAttribute('data-theme', theme);
  }, [appData?.profile?.theme]);

  // Toast Notification System
  const addToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = 'toast_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Profile
  const updateProfile = useCallback((updates) => {
    setAppData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...updates
      }
    }));
    addToast('Profile updated successfully! ✨', 'success');
  }, [addToast]);

  // Theme
  const setTheme = useCallback((themeId) => {
    setAppData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        theme: themeId
      }
    }));
    addToast('Theme switched! 🎀', 'info');
  }, [addToast]);

  // Monthly Budget
  const setMonthlyBudget = useCallback((month, amount) => {
    const numericAmount = Math.max(0, Number(amount) || 0);
    setAppData((prev) => ({
      ...prev,
      monthlyBudgets: {
        ...prev.monthlyBudgets,
        [month]: numericAmount
      }
    }));
    addToast(`Monthly budget for ${month} saved! 💖`, 'success');
  }, [addToast]);

  // Transactions
  const addTransaction = useCallback((txData) => {
    const newTx = {
      ...txData,
      id: 'tx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      amount: Math.max(0, Number(txData.amount) || 0)
    };
    setAppData((prev) => ({
      ...prev,
      transactions: [newTx, ...prev.transactions]
    }));
    addToast('Transaction recorded! ♡', 'success');
    return newTx;
  }, [addToast]);

  const updateTransaction = useCallback((id, updates) => {
    setAppData((prev) => ({
      ...prev,
      transactions: prev.transactions.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            ...updates,
            amount: updates.amount !== undefined ? Math.max(0, Number(updates.amount) || 0) : t.amount
          };
        }
        return t;
      })
    }));
    addToast('Transaction updated! ✨', 'success');
  }, [addToast]);

  const deleteTransaction = useCallback((id) => {
    setAppData((prev) => ({
      ...prev,
      transactions: prev.transactions.filter((t) => t.id !== id)
    }));
    addToast('Transaction deleted.', 'info');
  }, [addToast]);

  // Savings Goals
  const addSavingsGoal = useCallback((goalData) => {
    const newGoal = {
      ...goalData,
      id: 'goal_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      targetAmount: Math.max(0, Number(goalData.targetAmount) || 0),
      currentAmount: Math.max(0, Number(goalData.currentAmount) || 0),
      createdAt: new Date().toISOString()
    };
    setAppData((prev) => ({
      ...prev,
      savingsGoals: [newGoal, ...prev.savingsGoals]
    }));
    addToast('New concert savings goal created! 🎫', 'success');
    return newGoal;
  }, [addToast]);

  const updateSavingsGoal = useCallback((id, updates) => {
    setAppData((prev) => ({
      ...prev,
      savingsGoals: prev.savingsGoals.map((g) => {
        if (g.id === id) {
          return {
            ...g,
            ...updates,
            targetAmount: updates.targetAmount !== undefined ? Math.max(0, Number(updates.targetAmount) || 0) : g.targetAmount,
            currentAmount: updates.currentAmount !== undefined ? Math.max(0, Number(updates.currentAmount) || 0) : g.currentAmount
          };
        }
        return g;
      })
    }));
    addToast('Savings goal updated! 🌟', 'success');
  }, [addToast]);

  const addSavingsContribution = useCallback((goalId, amountToAdd) => {
    const amt = Number(amountToAdd) || 0;
    if (amt <= 0) return;

    setAppData((prev) => {
      let completedJustNow = false;
      const updatedGoals = prev.savingsGoals.map((g) => {
        if (g.id === goalId) {
          const newCurrent = g.currentAmount + amt;
          if (newCurrent >= g.targetAmount && g.currentAmount < g.targetAmount) {
            completedJustNow = true;
          }
          return { ...g, currentAmount: newCurrent };
        }
        return g;
      });

      return {
        ...prev,
        savingsGoals: updatedGoals
      };
    });

    addToast(`Added savings contribution! Fighting! 💖`, 'success');
  }, [addToast]);

  const deleteSavingsGoal = useCallback((id) => {
    setAppData((prev) => ({
      ...prev,
      savingsGoals: prev.savingsGoals.filter((g) => g.id !== id),
      // Unlink from upcoming concerts
      upcomingConcerts: prev.upcomingConcerts.map((c) => (c.linkedGoalId === id ? { ...c, linkedGoalId: null } : c))
    }));
    addToast('Savings goal removed.', 'info');
  }, [addToast]);

  // Upcoming Concerts
  const addUpcomingConcert = useCallback((concertData) => {
    const newConcert = {
      ...concertData,
      id: 'up_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      createdAt: new Date().toISOString()
    };
    setAppData((prev) => ({
      ...prev,
      upcomingConcerts: [newConcert, ...prev.upcomingConcerts]
    }));
    addToast('Upcoming concert added to your planner! 🗓️', 'success');
    return newConcert;
  }, [addToast]);

  const updateUpcomingConcert = useCallback((id, updates) => {
    setAppData((prev) => ({
      ...prev,
      upcomingConcerts: prev.upcomingConcerts.map((c) => (c.id === id ? { ...c, ...updates } : c))
    }));
    addToast('Upcoming concert updated! 🎤', 'success');
  }, [addToast]);

  const deleteUpcomingConcert = useCallback((id) => {
    setAppData((prev) => ({
      ...prev,
      upcomingConcerts: prev.upcomingConcerts.filter((c) => c.id !== id)
    }));
    addToast('Upcoming concert removed from planner.', 'info');
  }, [addToast]);

  // Convert Upcoming Concert into Attended Concert Memory
  const convertUpcomingToMemory = useCallback((upcomingId, memoryPayload) => {
    const upcoming = appData.upcomingConcerts.find((c) => c.id === upcomingId);
    if (!upcoming) return;

    const newMemory = {
      id: 'mem_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      concertName: memoryPayload.concertName || upcoming.concertName,
      groupId: memoryPayload.groupId || upcoming.groupId,
      groupName: memoryPayload.groupName || upcoming.groupName,
      date: memoryPayload.date || upcoming.date,
      venue: memoryPayload.venue || upcoming.venue,
      city: memoryPayload.city || upcoming.city,
      country: memoryPayload.country || upcoming.country,
      seatingSection: memoryPayload.seatingSection || '',
      ticketPrice: Number(memoryPayload.ticketPrice) || Number(upcoming.estimatedTicket) || 0,
      transportCost: Number(memoryPayload.transportCost) || Number(upcoming.estimatedTransport) || 0,
      accommodationCost: Number(memoryPayload.accommodationCost) || Number(upcoming.estimatedAccommodation) || 0,
      foodCost: Number(memoryPayload.foodCost) || Number(upcoming.estimatedFood) || 0,
      merchCost: Number(memoryPayload.merchCost) || Number(upcoming.estimatedMerch) || 0,
      otherCost: Number(memoryPayload.otherCost) || Number(upcoming.estimatedOther) || 0,
      rating: Number(memoryPayload.rating) || 5,
      favoriteMemory: memoryPayload.favoriteMemory || '',
      notes: memoryPayload.notes || upcoming.notes || '',
      photos: memoryPayload.photos || [],
      originalEstimatedTotal: 
        (Number(upcoming.estimatedTicket) || 0) +
        (Number(upcoming.estimatedTransport) || 0) +
        (Number(upcoming.estimatedAccommodation) || 0) +
        (Number(upcoming.estimatedFood) || 0) +
        (Number(upcoming.estimatedMerch) || 0) +
        (Number(upcoming.estimatedOther) || 0)
    };

    setAppData((prev) => ({
      ...prev,
      upcomingConcerts: prev.upcomingConcerts.filter((c) => c.id !== upcomingId),
      concertMemories: [newMemory, ...prev.concertMemories]
    }));

    addToast('Concert successfully marked as attended and moved to Memories! 📸🎉', 'success');
  }, [appData.upcomingConcerts, addToast]);

  // Concert Memories
  const addConcertMemory = useCallback((memData) => {
    const newMemory = {
      ...memData,
      id: 'mem_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      photos: memData.photos || []
    };
    setAppData((prev) => ({
      ...prev,
      concertMemories: [newMemory, ...prev.concertMemories]
    }));
    addToast('Concert memory saved forever! 🎀', 'success');
    return newMemory;
  }, [addToast]);

  const updateConcertMemory = useCallback((id, updates) => {
    setAppData((prev) => ({
      ...prev,
      concertMemories: prev.concertMemories.map((m) => (m.id === id ? { ...m, ...updates } : m))
    }));
    addToast('Concert memory updated! ✨', 'success');
  }, [addToast]);

  const deleteConcertMemory = useCallback((id) => {
    setAppData((prev) => ({
      ...prev,
      concertMemories: prev.concertMemories.filter((m) => m.id !== id)
    }));
    addToast('Concert memory deleted.', 'info');
  }, [addToast]);

  // Custom Groups
  const addCustomGroup = useCallback((customGroup) => {
    const newGrp = {
      ...customGroup,
      id: 'custom_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      isCustom: true
    };
    setAppData((prev) => ({
      ...prev,
      customGroups: [...prev.customGroups, newGrp]
    }));
    addToast(`Added custom group "${customGroup.name}"! 🌸`, 'success');
    return newGrp;
  }, [addToast]);

  // Data Export, Import & Reset
  const exportData = useCallback(() => {
    const jsonStr = JSON.stringify(appData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `delulu_budget_tracker_backup_${getTodayDateString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    addToast('Data backup downloaded successfully! 💾', 'success');
  }, [appData, addToast]);

  const importData = useCallback((jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('Invalid JSON format');
      }

      // Check required structure
      const validated = {
        version: parsed.version || SCHEMA_VERSION,
        profile: { ...INITIAL_DATA.profile, ...(parsed.profile || {}) },
        monthlyBudgets: { ...INITIAL_DATA.monthlyBudgets, ...(parsed.monthlyBudgets || {}) },
        transactions: Array.isArray(parsed.transactions) ? parsed.transactions : [],
        savingsGoals: Array.isArray(parsed.savingsGoals) ? parsed.savingsGoals : [],
        upcomingConcerts: Array.isArray(parsed.upcomingConcerts) ? parsed.upcomingConcerts : [],
        concertMemories: Array.isArray(parsed.concertMemories) ? parsed.concertMemories : [],
        customGroups: Array.isArray(parsed.customGroups) ? parsed.customGroups : []
      };

      setAppData(validated);
      addToast('Backup restored successfully! 🎉', 'success');
      return { success: true };
    } catch (err) {
      console.error('Import error:', err);
      addToast('Failed to import backup: ' + err.message, 'error');
      return { success: false, error: err.message };
    }
  }, [addToast]);

  const resetAllData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.APP_DATA);
    setAppData(INITIAL_DATA);
    setSelectedMonth(getCurrentMonth());
    addToast('App data has been reset to defaults! 🎀', 'info');
  }, [addToast]);

  const value = {
    appData,
    profile: appData.profile,
    monthlyBudgets: appData.monthlyBudgets,
    transactions: appData.transactions,
    savingsGoals: appData.savingsGoals,
    upcomingConcerts: appData.upcomingConcerts,
    concertMemories: appData.concertMemories,
    customGroups: appData.customGroups,
    toasts,
    selectedMonth,
    setSelectedMonth,
    addToast,
    removeToast,
    updateProfile,
    setTheme,
    setMonthlyBudget,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addSavingsGoal,
    updateSavingsGoal,
    addSavingsContribution,
    deleteSavingsGoal,
    addUpcomingConcert,
    updateUpcomingConcert,
    deleteUpcomingConcert,
    convertUpcomingToMemory,
    addConcertMemory,
    updateConcertMemory,
    deleteConcertMemory,
    addCustomGroup,
    exportData,
    importData,
    resetAllData
  };

  return <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>;
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};
