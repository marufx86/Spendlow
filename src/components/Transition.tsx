
import React from 'react';
import { cn } from "@/lib/utils";

interface TransitionProps {
  children: React.ReactNode;
  show?: boolean;
  appear?: 'fade' | 'slide-up' | 'slide-down' | 'scale';
  duration?: 'fast' | 'normal' | 'slow';
  delay?: 'none' | 'short' | 'medium' | 'long';
  className?: string;
}

const Transition: React.FC<TransitionProps> = ({
  children,
  show = true,
  appear = 'fade',
  duration = 'normal',
  delay = 'none',
  className
}) => {
  if (!show) return null;
  
  const getAppearClass = () => {
    switch (appear) {
      case 'fade': return 'animate-fade-in';
      case 'slide-up': return 'animate-slide-up';
      case 'slide-down': return 'animate-slide-down';
      case 'scale': return 'animate-scale-in';
      default: return 'animate-fade-in';
    }
  };
  
  const getDurationClass = () => {
    switch (duration) {
      case 'fast': return 'duration-200';
      case 'normal': return 'duration-300';
      case 'slow': return 'duration-500';
      default: return 'duration-300';
    }
  };
  
  const getDelayClass = () => {
    switch (delay) {
      case 'none': return 'delay-0';
      case 'short': return 'delay-75';
      case 'medium': return 'delay-150';
      case 'long': return 'delay-300';
      default: return 'delay-0';
    }
  };
  
  return (
    <div className={cn(
      getAppearClass(),
      getDurationClass(),
      getDelayClass(),
      className
    )}>
      {children}
    </div>
  );
};

export default Transition;
