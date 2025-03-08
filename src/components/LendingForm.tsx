
import React, { useState } from 'react';
import { useBudget } from '@/context/BudgetContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PlusCircle } from 'lucide-react';

const LendingForm: React.FC = () => {
  const [person, setPerson] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'lent' | 'borrowed'>('lent');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addLending } = useBudget();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!person.trim() || !description.trim() || !amount || parseFloat(amount) <= 0) {
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      addLending({
        person: person.trim(),
        description: description.trim(),
        amount: parseFloat(amount),
        type
      });
      
      // Reset form
      setPerson('');
      setDescription('');
      setAmount('');
      setType('lent');
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
      <div className="space-y-2">
        <Label htmlFor="person">Person</Label>
        <Input
          id="person"
          placeholder="Name of person"
          value={person}
          onChange={(e) => setPerson(e.target.value)}
          required
          className="h-10"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="lend-description">Description</Label>
        <Input
          id="lend-description"
          placeholder="What is this for?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="h-10"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="lend-amount">Amount</Label>
        <Input
          id="lend-amount"
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
      
      <div className="space-y-2">
        <Label className="mb-2 block">Type</Label>
        <RadioGroup 
          value={type} 
          onValueChange={(value) => setType(value as 'lent' | 'borrowed')}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lent" id="lent" />
            <Label htmlFor="lent" className="font-normal">I lent money</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="borrowed" id="borrowed" />
            <Label htmlFor="borrowed" className="font-normal">I borrowed money</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="pt-2">
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full sm:w-auto h-10 font-medium"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Record
        </Button>
      </div>
    </form>
  );
};

export default LendingForm;
