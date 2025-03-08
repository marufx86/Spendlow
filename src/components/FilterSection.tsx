
import React, { useState } from 'react';
import { useBudget } from '@/context/BudgetContext';
import { cn } from "@/lib/utils";
import Transition from './Transition';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FilterSectionProps {
  className?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ 
  className, 
  isOpen: externalIsOpen, 
  onOpenChange: externalOnOpenChange 
}) => {
  const { 
    selectedMonth, 
    setSelectedMonth, 
    selectedYear, 
    setSelectedYear, 
    availableMonths, 
    availableYears 
  } = useBudget();

  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  // Use external state if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const onOpenChange = externalOnOpenChange || setInternalIsOpen;

  return (
    <Transition appear="slide-up" delay="short" className={cn(
      "w-full max-w-3xl mx-auto glass-morphism rounded-xl p-5 sm:p-6",
      "border border-border/30 shadow-sm",
      className
    )}>
      <Collapsible open={isOpen} onOpenChange={onOpenChange}>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Filter Transactions</h3>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
          <div className="flex flex-col sm:flex-row gap-4 items-end pt-2">
            <div className="w-full sm:w-1/3">
              <label htmlFor="month" className="block text-sm font-medium text-muted-foreground mb-2">
                Month
              </label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger id="month" className="w-full">
                  <SelectValue placeholder="All Months" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-months">All Months</SelectItem>
                  {availableMonths.filter(option => option.value !== "").map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-1/3">
              <label htmlFor="year" className="block text-sm font-medium text-muted-foreground mb-2">
                Year
              </label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger id="year" className="w-full">
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-years">All Years</SelectItem>
                  {availableYears.filter(option => option.value !== "").map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-1/3">
              <Button 
                type="button" 
                variant="secondary" 
                className="w-full h-10 font-medium" 
                onClick={() => {
                  setSelectedMonth('all-months');
                  setSelectedYear('all-years');
                }}
              >
                Reset Filter
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Transition>
  );
};

export default FilterSection;
