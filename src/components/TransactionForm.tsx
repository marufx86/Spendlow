
import React, { useState } from 'react';
import { useBudget } from '@/context/BudgetContext';
import { cn } from "@/lib/utils";
import Transition from './Transition';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PlusCircle } from 'lucide-react';
import { DialogClose } from "@/components/ui/dialog";

interface TransactionFormProps {
  className?: string;
  inDialog?: boolean;
  onSuccess?: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ 
  className, 
  inDialog = false,
  onSuccess
}) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addTransaction } = useBudget();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim() || !amount || parseFloat(amount) <= 0) {
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      addTransaction({
        description: description.trim(),
        amount: parseFloat(amount),
        type
      });
      
      // Reset form
      setDescription('');
      setAmount('');
      setType('income');
      setIsSubmitting(false);
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    }, 300);
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-5">
      {!inDialog && (
        <div>
          <h2 className="text-lg font-medium mb-4">Add New Transaction</h2>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            placeholder="e.g., Salary, Groceries"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="h-10"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="h-10"
          />
        </div>
      </div>
      
      <div className="mt-5">
        <Label className="mb-2 block">Transaction Type</Label>
        <RadioGroup 
          value={type} 
          onValueChange={(value) => setType(value as 'income' | 'expense')}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="income" id="income" />
            <Label htmlFor="income" className="font-normal">Income</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="expense" id="expense" />
            <Label htmlFor="expense" className="font-normal">Expense</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="pt-2">
        {inDialog ? (
          <DialogClose asChild>
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full sm:w-auto h-10 font-medium"
              onClick={handleSubmit}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </DialogClose>
        ) : (
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full sm:w-auto h-10 font-medium"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        )}
      </div>
    </form>
  );

  if (inDialog) {
    return formContent;
  }

  return (
    <Transition appear="slide-up" className={cn(
      "w-full max-w-3xl mx-auto glass-morphism rounded-xl p-5 sm:p-6",
      "border border-border/30 shadow-sm",
      className
    )}>
      {formContent}
    </Transition>
  );
};

export default TransactionForm;
