// "use client";

// import { Home as HomeIcon, Clock } from "lucide-react";
// import { ModeToggle } from "@/components/mode-toggle";
// import { SimulatorGuide } from "@/components/simulator/simulator-guide";

// interface SimulatorHeaderProps {
//   timeSavedMonths: number;
//   formatMonthsToYears: (m: number) => string;
// }

// export function SimulatorHeader({ timeSavedMonths, formatMonthsToYears }: SimulatorHeaderProps) {
//   return (
//     // MODIF: h-14 sur mobile (plus fin), h-16 sur desktop
//     <header className="h-14 md:h-16 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-4 lg:px-12 shadow-sm transition-all">
//         <div className="flex items-center gap-3">
//           <div className="bg-primary p-1.5 md:p-2 rounded-lg shadow-lg shadow-primary/20">
//             <HomeIcon className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground"/>
//           </div>
//           <div>
//               <h1 className="text-sm md:text-xl font-bold tracking-tight text-foreground leading-none">
//                 Qurtuba<span className="text-primary">Sim</span>
//               </h1>
//               {/* MODIF: Caché sur mobile pour gagner de la place verticale */}
//               <p className="hidden md:block text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
//                 Édition Master 2025
//               </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2 md:gap-4">
//            {/* MODIF: Le badge "Gagné" est caché sur mobile (hidden md:flex) car il est déjà visible dans les KPI */}
//            {timeSavedMonths > 0 && (
//                <div className="hidden md:flex items-center gap-2 bg-green-500/10 text-green-600 px-3 py-1.5 rounded-full text-xs font-bold border border-green-500/20">
//                    <Clock className="h-3 w-3" />
//                    Gagné : {formatMonthsToYears(timeSavedMonths)}
//                </div>
//            )}
           
//            <SimulatorGuide />
           
//            <div className="h-6 w-[1px] bg-border mx-1 hidden sm:block"></div>
           
//            <ModeToggle />
//         </div>
//     </header>
//   );
// }

"use client";
import { Home as HomeIcon, Clock } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { SimulatorGuide } from "@/components/simulator/simulator-guide";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/components/language-provider";

interface SimulatorHeaderProps {
  timeSavedMonths: number;
  formatMonthsToYears: (m: number) => string;
}

export function SimulatorHeader({ timeSavedMonths, formatMonthsToYears }: SimulatorHeaderProps) {
  const { t } = useLanguage();
  return (
    <header className="h-14 md:h-16 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-4 lg:px-12 shadow-sm transition-all">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-1.5 md:p-2 rounded-lg shadow-lg shadow-primary/20">
            <HomeIcon className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground"/>
          </div>
          <div>
              <h1 className="text-sm md:text-xl font-bold tracking-tight text-foreground leading-none">
                Qurtuba<span className="text-primary">Sim</span>
              </h1>
              <p className="hidden md:block text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                {t('subtitle')}
              </p>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
           {timeSavedMonths > 0 && (
               <div className="hidden md:flex items-center gap-2 bg-green-500/10 text-green-600 px-3 py-1.5 rounded-full text-xs font-bold border border-green-500/20">
                   <Clock className="h-3 w-3" />
                   {t('gained')} : {formatMonthsToYears(timeSavedMonths)}
               </div>
           )}
           <SimulatorGuide />
           <div className="h-6 w-[1px] bg-border mx-1 hidden sm:block"></div>
           <LanguageToggle />
           <ModeToggle />
        </div>
    </header>
  );
}