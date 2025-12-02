"use client";

import { Home as HomeIcon, Clock } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

interface SimulatorHeaderProps {
  timeSavedMonths: number;
  formatMonthsToYears: (m: number) => string;
}

export function SimulatorHeader({ timeSavedMonths, formatMonthsToYears }: SimulatorHeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-6 lg:px-12 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg shadow-lg shadow-primary/20">
            <HomeIcon className="h-5 w-5 text-primary-foreground"/>
          </div>
          <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground leading-none">
                Qurtuba<span className="text-primary">Simulator</span>
              </h1>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                Édition Master 2025
              </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           {timeSavedMonths > 0 && (
               <div className="hidden lg:flex items-center gap-2 bg-green-500/10 text-green-600 px-3 py-1.5 rounded-full text-xs font-bold border border-green-500/20">
                   <Clock className="h-3 w-3" />
                   Gagné : {formatMonthsToYears(timeSavedMonths)}
               </div>
           )}
           <ModeToggle />
        </div>
    </header>
  );
}