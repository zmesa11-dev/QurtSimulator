// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Wallet, TrendingUp, PiggyBank, Zap, Home } from "lucide-react";

// interface SimulatorKPIsProps {
//   totalMonthlyOutPocket: number;
//   paymentQurtuba: number;
//   monthlyCharges: number; // NOUVEAU
//   qualifyingIncome: number;
//   statsWealth: { equity: number; value: number };
//   wealthHorizon: number | 'end';
//   setWealthHorizon: (v: number | 'end') => void;
//   totalRentPaid: number; // NOUVEAU
//   interestSaved: number;
//   timeSaved: number;
//   currency: Intl.NumberFormat;
//   formatMonthsToYears: (m: number) => string;
// }

// export function SimulatorKPIs({
//   totalMonthlyOutPocket,
//   paymentQurtuba,
//   monthlyCharges, // Récupéré ici
//   qualifyingIncome,
//   statsWealth,
//   wealthHorizon,
//   setWealthHorizon,
//   totalRentPaid, // Récupéré ici
//   interestSaved,
//   timeSaved,
//   currency,
//   formatMonthsToYears
// }: SimulatorKPIsProps) {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

//         {/* 1. BUDGET MENSUEL (Refondu avec sous-sections) */}
//         <Card className="relative overflow-hidden group hover:shadow-lg transition-all border-l-4 border-l-primary">
//             <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground uppercase">Mensualité Totale</CardTitle></CardHeader>
//             <CardContent>
//                 {/* Gros Chiffre Total */}
//                 <div className="text-3xl font-bold text-foreground mb-4">{currency.format(totalMonthlyOutPocket)}</div>

//                 {/* Sous-sections : Qurtuba vs Charges */}
//                 <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border/60">
//                     <div className="flex flex-col gap-1">
//                         <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
//                             <Home className="h-3 w-3" /> Qurtuba
//                         </span>
//                         <span className="font-semibold text-primary text-sm">{currency.format(paymentQurtuba)}</span>
//                     </div>
//                     <div className="flex flex-col gap-1 border-l pl-3">
//                         <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
//                             <Zap className="h-3 w-3" /> Charges
//                         </span>
//                         <span className="font-semibold text-foreground text-sm">{currency.format(monthlyCharges)}</span>
//                     </div>
//                 </div>
//             </CardContent>
//         </Card>

//         {/* 2. REVENU REQUIS (Inchangé) */}
//         <Card className="relative overflow-hidden group hover:shadow-lg transition-all border-l-4 border-l-blue-500">
//             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><TrendingUp className="w-16 h-16 text-blue-500" /></div>
//             <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground uppercase">Revenu Requis</CardTitle></CardHeader>
//             <CardContent>
//                 <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{currency.format(qualifyingIncome)}</div>
//                 <p className="text-xs text-muted-foreground mt-1">Brut familial (Ratio 32%)</p>
//             </CardContent>
//         </Card>

//         {/* 3. PATRIMOINE (Inchangé) */}
//         <Card className="relative overflow-hidden group hover:shadow-lg transition-all border-l-4 border-l-green-500">
//             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><PiggyBank className="w-16 h-16 text-green-500" /></div>
//             <CardHeader className="pb-2 flex flex-row justify-between items-center space-y-0">
//                 <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Net à {wealthHorizon === 'end' ? 'la fin' : `${wealthHorizon} ans`}</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <div className="text-3xl font-bold text-green-600 dark:text-green-400">{currency.format(statsWealth.equity)}</div>
//                 <div className="flex flex-wrap gap-1 mt-2">
//                     {[5, 10, 15, 20, 25].map(y => (
//                         <button key={y} onClick={() => setWealthHorizon(y)} className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${wealthHorizon === y ? 'bg-green-600 text-white border-green-600' : 'hover:bg-muted'}`}>{y}a</button>
//                     ))}
//                     <button onClick={() => setWealthHorizon('end')} className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${wealthHorizon === 'end' ? 'bg-green-600 text-white border-green-600' : 'hover:bg-muted'}`}>Fin</button>
//                 </div>
//             </CardContent>
//         </Card>

//         {/* 4. COÛT TOTAL DU LOYER (Modifié) */}
//         <Card className="relative overflow-hidden group hover:shadow-lg transition-all border-l-4 border-l-orange-500 bg-orange-50/50 dark:bg-orange-950/10">
//             <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground uppercase">Coût Financement (Loyer)</CardTitle></CardHeader>
//             <CardContent>
//                 {/* On affiche le total payé en loyer */}
//                 <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{currency.format(totalRentPaid)}</div>

//                 {/* Si on a fait des économies, on l'affiche en dessous comme un bonus */}
//                 {interestSaved > 0 ? (
//                     <div className="mt-2 inline-flex flex-col items-start">
//                         <div className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
//                             Économie : -{currency.format(interestSaved)}
//                         </div>
//                         <p className="text-[10px] text-muted-foreground mt-1 ml-1">
//                             Gagné : {formatMonthsToYears(timeSaved)}
//                         </p>
//                     </div>
//                 ) : (
//                     <p className="text-xs text-muted-foreground mt-2">Total des frais sur la durée</p>
//                 )}
//             </CardContent>
//         </Card>
//     </div>
//     );
// }

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, TrendingUp, PiggyBank, Zap, Home } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

interface SimulatorKPIsProps {
  totalMonthlyOutPocket: number;
  paymentQurtuba: number;
  monthlyCharges: number;
  qualifyingIncome: number;
  statsWealth: { equity: number; value: number };
  wealthHorizon: number | 'end';
  setWealthHorizon: (v: number | 'end') => void;
  totalRentPaid: number;
  interestSaved: number;
  timeSaved: number;
  currency: Intl.NumberFormat;
  formatMonthsToYears: (m: number) => string;
}

export function SimulatorKPIs({
  totalMonthlyOutPocket,
  paymentQurtuba,
  monthlyCharges,
  qualifyingIncome,
  statsWealth,
  wealthHorizon,
  setWealthHorizon,
  totalRentPaid,
  interestSaved,
  timeSaved,
  currency,
  formatMonthsToYears
}: SimulatorKPIsProps) {
  
  // Hook pour la traduction
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* 1. BUDGET MENSUEL */}
        <Card className="relative overflow-hidden group hover:shadow-lg transition-all border-l-4 border-l-primary">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground uppercase">{t('monthly_total')}</CardTitle></CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-foreground mb-4">{currency.format(totalMonthlyOutPocket)}</div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border/60">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                            <Home className="h-3 w-3" /> Qurtuba
                        </span>
                        <span className="font-semibold text-primary text-sm">{currency.format(paymentQurtuba)}</span>
                    </div>
                    <div className="flex flex-col gap-1 border-l pl-3">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                            <Zap className="h-3 w-3" /> {t('charges')}
                        </span>
                        <span className="font-semibold text-foreground text-sm">{currency.format(monthlyCharges)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>

        {/* 2. REVENU REQUIS */}
        <Card className="relative overflow-hidden group hover:shadow-lg transition-all border-l-4 border-l-blue-500">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><TrendingUp className="w-16 h-16 text-blue-500" /></div>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground uppercase">{t('income_required')}</CardTitle></CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{currency.format(qualifyingIncome)}</div>
                <p className="text-xs text-muted-foreground mt-1">{t('gross_family')}</p>
            </CardContent>
        </Card>

        {/* 3. PATRIMOINE */}
        <Card className="relative overflow-hidden group hover:shadow-lg transition-all border-l-4 border-l-green-500">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><PiggyBank className="w-16 h-16 text-green-500" /></div>
            <CardHeader className="pb-2 flex flex-row justify-between items-center space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase">
                    {t('net_at')} {wealthHorizon === 'end' ? t('end') : `${wealthHorizon} ${t('years')}`}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">{currency.format(statsWealth.equity)}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                    {[5, 10, 15, 20, 25].map(y => (
                        <button key={y} onClick={() => setWealthHorizon(y)} className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${wealthHorizon === y ? 'bg-green-600 text-white border-green-600' : 'hover:bg-muted'}`}>{y}a</button>
                    ))}
                    <button onClick={() => setWealthHorizon('end')} className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${wealthHorizon === 'end' ? 'bg-green-600 text-white border-green-600' : 'hover:bg-muted'}`}>{t('end')}</button>
                </div>
            </CardContent>
        </Card>

        {/* 4. COÛT TOTAL (Optimisation) */}
        <Card className="relative overflow-hidden group hover:shadow-lg transition-all border-l-4 border-l-orange-500 bg-orange-50/50 dark:bg-orange-950/10">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground uppercase">{t('cost_financing')}</CardTitle></CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{currency.format(totalRentPaid)}</div>

                {interestSaved > 0 ? (
                    <div className="mt-2 inline-flex flex-col items-start">
                        <div className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                            {t('economy')} : -{currency.format(interestSaved)}
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1 ml-1">
                            {t('gained')} : {formatMonthsToYears(timeSaved)}
                        </p>
                    </div>
                ) : (
                    <p className="text-xs text-muted-foreground mt-2">{t('total_fees')}</p>
                )}
            </CardContent>
        </Card>
    </div>
  );
}