
import React from 'react';
import { cn } from "@/lib/utils";
import Transition from './Transition';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <Transition appear="slide-down" duration="normal">
      <header className={cn(
        "w-full pt-8 pb-4 flex items-center justify-between",
        className
      )}>
        <div />
        <ThemeToggle className="absolute top-4 right-4" />
      </header>
    </Transition>
  );
};

export default Header;
