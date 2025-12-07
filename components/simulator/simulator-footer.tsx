// "use client";

// export function SimulatorFooter() {
//   return (
//     <footer className="mt-12 py-8 border-t border-border/40 bg-card/30 backdrop-blur-sm">
//       <div className="max-w-4xl mx-auto px-6 text-center space-y-2">
//         <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/80">
//             Avis de non-responsabilité
//         </p>
//         <p className="text-[10px] text-muted-foreground/60 leading-relaxed">
//             Ce simulateur est un outil pédagogique fourni à titre indicatif seulement. Il ne constitue pas une offre de financement officielle.
//             Les résultats sont des estimations basées sur les données saisies et peuvent différer des calculs réels de la Coopérative d&apos;habitation Qurtuba.
//         </p>
//         <p className="text-[10px] text-muted-foreground/40 font-mono pt-2">
//             © 2025 Qurtuba Simulator.
//         </p>
//       </div>
//     </footer>
//   );
// }

"use client";
import { useLanguage } from "@/components/language-provider";

export function SimulatorFooter() {
  const { t } = useLanguage();
  return (
    <footer className="mt-12 py-8 border-t border-border/40 bg-card/30 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-2">
        <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/80">{t('disclaimer_title')}</p>
        <p className="text-[10px] text-muted-foreground/60 leading-relaxed">{t('disclaimer_text')}</p>
        <p className="text-[10px] text-muted-foreground/40 font-mono pt-2">{t('copyright')}</p>
      </div>
    </footer>
  );
}