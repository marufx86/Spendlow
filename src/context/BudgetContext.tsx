
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}

export interface Lending {
  id: string;
  person: string;
  description: string;
  amount: number;
  type: 'lent' | 'borrowed';
  date: string;
}

interface BudgetContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  deleteTransaction: (id: string) => void;
  lendings: Lending[];
  addLending: (lending: Omit<Lending, 'id' | 'date'>) => void;
  deleteLending: (id: string) => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  totalLentOut: number;
  totalBorrowed: number;
  netLending: number;
  filteredTransactions: Transaction[];
  filteredLendings: Lending[];
  availableMonths: { value: string; label: string }[];
  availableYears: { value: string; label: string }[];
  isLoading: boolean;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};

interface BudgetProviderProps {
  children: ReactNode;
}

export const BudgetProvider: React.FC<BudgetProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [lendings, setLendings] = useState<Lending[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('all-months');
  const [selectedYear, setSelectedYear] = useState<string>('all-years');
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const savedTransactions = localStorage.getItem('transactions');
        if (savedTransactions) {
          setTransactions(JSON.parse(savedTransactions));
        }
        
        const savedLendings = localStorage.getItem('lendings');
        if (savedLendings) {
          setLendings(JSON.parse(savedLendings));
        }
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Failed to load your financial data');
      } finally {
        // Simulate a slight delay for visual transition
        setTimeout(() => setIsLoading(false), 500);
      }
    };

    loadData();
  }, []);

  // Save transactions to localStorage when they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }, [transactions, isLoading]);
  
  // Save lendings to localStorage when they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('lendings', JSON.stringify(lendings));
    }
  }, [lendings, isLoading]);

  // Generate available months and years for filtering
  const getAllDates = () => {
    const allTransactionDates = transactions.map(tx => new Date(tx.date));
    const allLendingDates = lendings.map(lending => new Date(lending.date));
    return [...allTransactionDates, ...allLendingDates];
  };
  
  const allDates = getAllDates();
  
  const availableMonths = [
    { value: '', label: 'All Months' },
    ...Array.from(new Set(allDates.map(date => date.getMonth().toString())))
      .map(month => ({
        value: month,
        label: new Date(2025, parseInt(month), 1).toLocaleString('en-US', { month: 'long' })
      }))
      .sort((a, b) => parseInt(a.value) - parseInt(b.value))
  ];

  const availableYears = [
    { value: '', label: 'All Years' },
    ...Array.from(new Set(allDates.map(date => date.getFullYear().toString())))
      .map(year => ({ value: year, label: year }))
      .sort((a, b) => parseInt(a.value) - parseInt(b.value))
  ];

  // Filter transactions and lendings based on selected month and year
  const filterByDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return (selectedYear === "all-years" || date.getFullYear().toString() === selectedYear) &&
           (selectedMonth === "all-months" || date.getMonth().toString() === selectedMonth);
  };
  
  const filteredTransactions = transactions.filter(tx => filterByDate(tx.date));
  const filteredLendings = lendings.filter(lending => filterByDate(lending.date));

  // Calculate totals for transactions
  const totalIncome = filteredTransactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpense = filteredTransactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const netBalance = totalIncome - totalExpense;
  
  // Calculate totals for lendings
  const totalLentOut = filteredLendings
    .filter(lending => lending.type === 'lent')
    .reduce((sum, lending) => sum + lending.amount, 0);
    
  const totalBorrowed = filteredLendings
    .filter(lending => lending.type === 'borrowed')
    .reduce((sum, lending) => sum + lending.amount, 0);
    
  const netLending = totalLentOut - totalBorrowed;

  // Add new transaction
  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      date: new Date().toISOString()
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    toast.success('Transaction added successfully');
  };

  // Delete transaction
  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
    toast.success('Transaction deleted');
  };
  
  // Add new lending record
  const addLending = (lending: Omit<Lending, 'id' | 'date'>) => {
    const newLending: Lending = {
      ...lending,
      id: crypto.randomUUID(),
      date: new Date().toISOString()
    };
    
    setLendings(prev => [newLending, ...prev]);
    toast.success('Lending record added successfully');
  };
  
  // Delete lending record
  const deleteLending = (id: string) => {
    setLendings(prev => prev.filter(lending => lending.id !== id));
    toast.success('Lending record deleted');
  };

  return (
    <BudgetContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        lendings,
        addLending,
        deleteLending,
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear,
        totalIncome,
        totalExpense,
        netBalance,
        totalLentOut,
        totalBorrowed,
        netLending,
        filteredTransactions,
        filteredLendings,
        availableMonths,
        availableYears,
        isLoading
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
