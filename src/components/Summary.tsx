
import React from 'react';
import { useBudget } from '@/context/BudgetContext';
import { cn } from "@/lib/utils";
import Transition from './Transition';
import { ArrowUp, ArrowDown, DollarSign, HandCoins } from 'lucide-react';

interface SummaryProps {
  className?: string;
  type?: 'transactions' | 'lending';
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

const Summary: React.FC<SummaryProps> = ({ className, type = 'transactions' }) => {
  const { 
    totalIncome, 
    totalExpense, 
    netBalance, 
    totalLentOut, 
    totalBorrowed, 
    netLending 
  } = useBudget();

  const transactionCards = [
    { 
      title: 'Total Income', 
      value: totalIncome,
      icon: <ArrowUp size={24} className="text-success" />,
      color: 'bg-success/10 text-foreground border-success/20'
    },
    { 
      title: 'Total Expenses', 
      value: totalExpense,
      icon: <ArrowDown size={24} className="text-destructive" />,
      color: 'bg-destructive/10 text-foreground border-destructive/20'
    },
    { 
      title: 'Net Balance', 
      value: netBalance,
      icon: <DollarSign size={24} className="text-primary" />,
      color: 'bg-primary/10 text-foreground border-primary/20'
    }
  ];
  
  const lendingCards = [
    { 
      title: 'Money Lent Out', 
      value: totalLentOut,
      icon: <ArrowUp size={24} className="text-amber-500" />,
      color: 'bg-amber-500/10 text-foreground border-amber-500/20'
    },
    { 
      title: 'Money Borrowed', 
      value: totalBorrowed,
      icon: <ArrowDown size={24} className="text-purple-500" />,
      color: 'bg-purple-500/10 text-foreground border-purple-500/20'
    },
    { 
      title: 'Net Lending', 
      value: netLending,
      icon: <HandCoins size={24} className="text-blue-500" />,
      color: 'bg-blue-500/10 text-foreground border-blue-500/20'
    }
  ];

  // If type is provided, directly show that type of summary
  if (type === 'lending') {
    return (
      <div className={cn("w-full", className)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lendingCards.map((card, index) => (
            <Transition 
              key={card.title}
              appear="scale"
              delay={index === 0 ? 'short' : index === 1 ? 'medium' : 'long'}
              className="w-full"
            >
              <div className={cn(
                "glass-morphism rounded-xl p-5 border border-border/30 h-full flex flex-col",
                "shadow-sm hover:shadow-md transition-shadow duration-300",
                card.color
              )}>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-foreground">{card.title}</h3>
                  {card.icon}
                </div>
                <div className="mt-auto">
                  <p className="text-3xl font-bold text-foreground">{formatter.format(card.value)}</p>
                </div>
              </div>
            </Transition>
          ))}
        </div>
      </div>
    );
  }
  
  // Default to transactions summary
  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {transactionCards.map((card, index) => (
          <Transition 
            key={card.title}
            appear="scale"
            delay={index === 0 ? 'short' : index === 1 ? 'medium' : 'long'}
            className="w-full"
          >
            <div className={cn(
              "glass-morphism rounded-xl p-5 border border-border/30 h-full flex flex-col",
              "shadow-sm hover:shadow-md transition-shadow duration-300",
              card.color
            )}>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-foreground">{card.title}</h3>
                {card.icon}
              </div>
              <div className="mt-auto">
                <p className="text-3xl font-bold text-foreground">{formatter.format(card.value)}</p>
              </div>
            </div>
          </Transition>
        ))}
      </div>
    </div>
  );
};

export default Summary;
