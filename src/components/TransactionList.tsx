
import React, { useState } from 'react';
import { useBudget } from '@/context/BudgetContext';
import { cn } from "@/lib/utils";
import Transition from './Transition';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, RefreshCw, ListFilter } from 'lucide-react';

interface TransactionListProps {
  className?: string;
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

const TransactionList: React.FC<TransactionListProps> = ({ className }) => {
  const { filteredTransactions, deleteTransaction, isLoading } = useBudget();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [displayLimit, setDisplayLimit] = useState(5);
  
  const handleDelete = (id: string) => {
    setIsDeleting(id);
    
    // Add a small delay for the animation
    setTimeout(() => {
      deleteTransaction(id);
      setIsDeleting(null);
    }, 300);
  };
  
  const showAll = () => {
    setDisplayLimit(filteredTransactions.length);
  };
  
  const showLess = () => {
    setDisplayLimit(5);
  };

  return (
    <Transition appear="fade" className={cn(
      "w-full glass-morphism rounded-xl p-5 sm:p-6",
      "border border-border/30 shadow-sm",
      className
    )}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium flex items-center">
          <ListFilter className="mr-2 h-5 w-5 text-muted-foreground" />
          Transactions
        </h2>
        
        {filteredTransactions.length > 5 && (
          <Button
            variant="outline"
            size="sm"
            onClick={displayLimit === 5 ? showAll : showLess}
            className="text-xs h-8"
          >
            <RefreshCw className="mr-1 h-3 w-3" />
            {displayLimit === 5 ? 'View All' : 'Show Less'}
          </Button>
        )}
      </div>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground text-sm">Loading transactions...</p>
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-lg bg-accent/50">
          <p className="text-muted-foreground">No transactions found</p>
          <p className="text-sm mt-1">Add a new transaction to get started</p>
        </div>
      ) : (
        <ScrollArea className="rounded-md border h-[calc(100vh-28rem)] min-h-[300px]">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-muted/70 backdrop-blur-sm">
              <TableRow>
                <TableHead className="w-[120px]">Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[100px]">Type</TableHead>
                <TableHead className="text-right w-[120px]">Amount</TableHead>
                <TableHead className="text-right w-[80px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.slice(0, displayLimit).map((transaction) => (
                <TableRow 
                  key={transaction.id}
                  className={cn(
                    "transition-all duration-300",
                    isDeleting === transaction.id && "opacity-0 scale-95"
                  )}
                >
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">{transaction.description}</TableCell>
                  <TableCell>
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      transaction.type === 'income' 
                        ? "bg-success/10 text-success border border-success/20" 
                        : "bg-destructive/10 text-destructive border border-destructive/20"
                    )}>
                      {transaction.type === 'income' ? 'Income' : 'Expense'}
                    </span>
                  </TableCell>
                  <TableCell className={cn(
                    "text-right font-medium",
                    transaction.type === 'income' ? "text-success" : "text-destructive"
                  )}>
                    {formatter.format(transaction.amount)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(transaction.id)}
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      )}
    </Transition>
  );
};

export default TransactionList;
