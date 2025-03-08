
import React, { useState } from 'react';
import { BudgetProvider } from '@/context/BudgetContext';
import Header from '@/components/Header';
import FilterSection from '@/components/FilterSection';
import Summary from '@/components/Summary';
import TransactionList from '@/components/TransactionList';
import TransactionForm from '@/components/TransactionForm';
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Wallet, HandCoins, Filter } from 'lucide-react';
import LendingForm from '@/components/LendingForm';
import LendingList from '@/components/LendingList';

const Index = () => {
  const [activeTab, setActiveTab] = useState<"transactions" | "lending">("transactions");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  return (
    <BudgetProvider>
      <div className="min-h-screen flex flex-col items-center">
        <div className="w-full max-w-6xl mx-auto px-4 pb-20">
          <Header />
          
          <main className="space-y-6 mt-2">
            {/* Summary section with tabs */}
            <Tabs 
              defaultValue="transactions" 
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as "transactions" | "lending")} 
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="transactions" className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  <span>Budget Summary</span>
                </TabsTrigger>
                <TabsTrigger value="lending" className="flex items-center gap-2">
                  <HandCoins className="h-4 w-4" />
                  <span>Lending Summary</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Tab content */}
              <TabsContent value="transactions">
                <Summary className="mt-4" type="transactions" />
              </TabsContent>
              <TabsContent value="lending">
                <Summary className="mt-4" type="lending" />
              </TabsContent>
            </Tabs>
            
            {/* Filter section */}
            <div className="flex justify-between items-center mt-8">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-4 w-4" />
                <span>Filter Transactions</span>
              </Button>
            </div>
            
            {isFilterOpen && (
              <FilterSection 
                isOpen={isFilterOpen} 
                onOpenChange={setIsFilterOpen} 
              />
            )}
            
            {/* Content based on active tab */}
            {activeTab === "transactions" ? (
              <TransactionList />
            ) : (
              <LendingList />
            )}
          </main>

          {/* Add new transaction/lending button */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="fixed bottom-6 right-6 shadow-lg z-10 h-14 w-14 rounded-full flex items-center justify-center"
              >
                <Plus className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {activeTab === "transactions" ? "Add Transaction" : "Add Lending Record"}
                </DialogTitle>
                <DialogDescription>
                  {activeTab === "transactions" 
                    ? "Add a new income or expense to your budget."
                    : "Track money you've lent to others or borrowed."
                  }
                </DialogDescription>
              </DialogHeader>
              {activeTab === "transactions" ? (
                <TransactionForm 
                  inDialog 
                  onSuccess={() => setIsDialogOpen(false)} 
                />
              ) : (
                <LendingForm />
              )}
            </DialogContent>
          </Dialog>

          {/* Copyright text */}
          <div className="text-center mt-12 text-sm text-gray-500 opacity-30">
            A Budget Planner app by Maruf Inc
          </div>
        </div>
      </div>
    </BudgetProvider>
  );
};

export default Index;
