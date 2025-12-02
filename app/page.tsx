// "use client";

// import { useState, useMemo } from "react";
// import { QurtubaSimulator } from "@/lib/qurtuba-logic";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Slider } from "@/components/ui/slider";
// import { Switch } from "@/components/ui/switch";
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, Line, ComposedChart } from 'recharts';
// import { ModeToggle } from "@/components/mode-toggle";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Separator } from "@/components/ui/separator"
// import { Lock, Download, Zap, Wallet, Home as HomeIcon, TrendingUp, PiggyBank, Settings2, ChevronDown, ChevronUp, Clock, MapPin, AlertTriangle } from "lucide-react"

// export default function Home() {
//   // --- ETATS ---
//   const [price, setPrice] = useState(500000);
//   const [downPayment, setDownPayment] = useState(60000);
//   const [durationYears, setDurationYears] = useState(25);
  
//   // Paramètres Avancés
//   const [showAdvanced, setShowAdvanced] = useState(false);
//   const [extraMonthly, setExtraMonthly] = useState(0);
//   const [extraAnnual, setExtraAnnual] = useState(0);
//   const [isMontreal, setIsMontreal] = useState(false);
  
//   const [municipalTax, setMunicipalTax] = useState(3000);
//   const [schoolTax, setSchoolTax] = useState(350);
//   const [insurance, setInsurance] = useState(1200);
//   const [hydro, setHydro] = useState(1800);
//   const [maintenance, setMaintenance] = useState(2400); 
//   const [appreciation, setAppreciation] = useState(3);
  
//   const [chartView, setChartView] = useState<'evolution' | 'distribution' | 'networth'>('evolution');
//   const [wealthHorizon, setWealthHorizon] = useState<number | 'end'>(5);

//   const rate = 5.5; 

//   // --- CALCULS ---
//   const { simulation, welcomeTax, notaryFees, startupFees } = useMemo(() => {
//     const sim = new QurtubaSimulator(price, downPayment, rate, durationYears, extraMonthly, extraAnnual, isMontreal);
//     return {
//         simulation: sim.generateSchedule(),
//         welcomeTax: sim.calculateWelcomeTax(),
//         notaryFees: sim.calculateNotaryFees(),
//         startupFees: sim.calculateStartupFees()
//     };
//   }, [price, downPayment, durationYears, extraMonthly, extraAnnual, isMontreal]);

//   // Fusionner les données pour le graphique comparatif
//   const chartData = useMemo(() => {
//       if (!simulation.schedule) return [];
      
//       // On prend le plus long des deux tableaux pour l'axe X
//       const maxLength = Math.max(simulation.schedule.length, simulation.standardSchedule?.length || 0);
      
//       const data = [];
//       for (let i = 0; i < maxLength; i++) {
//           const rowAcc = simulation.schedule[i] || { remainingBankBalance: 0 };
//           const rowStd = simulation.standardSchedule ? (simulation.standardSchedule[i] || { remainingBankBalance: 0 }) : rowAcc;
          
//           data.push({
//               month: i + 1,
//               balanceAccelerated: rowAcc.remainingBankBalance,
//               balanceStandard: rowStd.remainingBankBalance,
//               interestPaid: rowAcc.rentPayment || 0,
//               principalPaid: rowAcc.principalPayment || 0
//           });
//       }
//       return data;
//   }, [simulation]);

//   // Calcul Richesse
//   const enrichedSchedule = useMemo(() => {
//       if (!simulation.schedule) return [];
//       let currentHouseValue = price;
//       const monthlyAppreciationRate = appreciation / 100 / 12;
      
//       return simulation.schedule.map(row => {
//           currentHouseValue = currentHouseValue * (1 + monthlyAppreciationRate);
//           return {
//               ...row,
//               houseValue: currentHouseValue,
//               netEquity: currentHouseValue - row.remainingBankBalance
//           };
//       });
//   }, [simulation.schedule, price, appreciation]);

//   const currency = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

//   const totalCashRequired = downPayment + welcomeTax + notaryFees + startupFees;
//   const monthlyCharges = (municipalTax + schoolTax + insurance + hydro + maintenance) / 12;
//   const paymentQurtuba = simulation.monthlyPaymentFixed + extraMonthly;
//   const totalMonthlyOutPocket = paymentQurtuba + monthlyCharges;
//   const qualifyingIncome = (totalMonthlyOutPocket * 12) / 0.32;

// // CORRECTION : Calcul de richesse indépendant du tableau d'amortissement
//   const getWealthAtYear = (yearTarget: number | 'end') => {
//       // 1. Déterminer le nombre de mois exact
//       let targetMonth: number;
      
//       if (yearTarget === 'end') {
//           // Si on veut la fin du prêt, on prend la durée réelle
//           targetMonth = simulation.actualDurationMonths;
//       } else {
//           // Sinon on prend l'année demandée (ex: 15 ans * 12 = 180 mois)
//           targetMonth = yearTarget * 12;
//       }

//       // 2. Calculer la valeur future de la maison (Intérêts composés sur l'appréciation)
//       // Formule : Prix * (1 + taux_mensuel)^mois
//       const monthlyAppreciationRate = appreciation / 100 / 12;
//       const futureHouseValue = price * Math.pow(1 + monthlyAppreciationRate, targetMonth);

//       // 3. Trouver la dette restante à ce moment précis
//       let remainingDebt = 0;
      
//       // Si la date cible est AVANT la fin du prêt, on cherche la dette dans le tableau
//       if (targetMonth <= simulation.schedule.length && targetMonth > 0) {
//           const row = simulation.schedule[targetMonth - 1];
//           remainingDebt = row ? row.remainingBankBalance : (price - downPayment);
//       } 
//       // Si la date cible est APRÈS la fin du prêt, la dette reste à 0 (c'est le but !)

//       return { 
//           value: futureHouseValue, 
//           equity: futureHouseValue - remainingDebt 
//       };
//   };

//   // On appelle la fonction avec l'horizon choisi (5, 10, 15 ou 'end')
//   const statsWealth = getWealthAtYear(wealthHorizon);

//   const formatMonthsToYears = (m: number) => {
//       const y = Math.floor(m / 12);
//       const remM = m % 12;
//       if (y === 0) return `${remM} mois`;
//       if (remM === 0) return `${y} ans`;
//       return `${y} ans ${remM} mois`;
//   }

//   const handleExportCSV = () => {
//     if (!enrichedSchedule.length) return;
//     const headers = ["Mois,Loyer,Capital,Total,Solde,ValeurMaison,EquiteNette"];
//     const rows = enrichedSchedule.map(r => `${r.month},${r.rentPayment.toFixed(2)},${r.principalPayment.toFixed(2)},${r.totalPayment.toFixed(2)},${r.remainingBankBalance.toFixed(2)},${r.houseValue?.toFixed(2)},${r.netEquity?.toFixed(2)}`);
//     const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "qurtuba_plan_financier.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <main className="min-h-screen w-full bg-background font-sans flex flex-col">
      
//       {/* HEADER PRO */}
//       <header className="h-16 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-6 lg:px-12 shadow-sm">
//           <div className="flex items-center gap-3">
//             <div className="bg-primary p-2 rounded-lg shadow-lg shadow-primary/20"><HomeIcon className="h-5 w-5 text-primary-foreground"/></div>
//             <div>
//                 <h1 className="text-xl font-bold tracking-tight text-foreground leading-none">Qurtuba<span className="text-primary">Simulator</span></h1>
//                 <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Édition Master 2025</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//              {simulation.isCompliant && simulation.timeSavedMonths > 0 && (
//                  <div className="hidden lg:flex items-center gap-2 bg-green-500/10 text-green-600 px-3 py-1.5 rounded-full text-xs font-bold border border-green-500/20 animate-in fade-in slide-in-from-right-4">
//                      <Clock className="h-3 w-3" />
//                      Gagné : {formatMonthsToYears(simulation.timeSavedMonths)}
//                  </div>
//              )}
//              <ModeToggle />
//           </div>
//       </header>

//       {/* CONTROL DASHBOARD */}
//       <div className="border-b border-border bg-background/95 backdrop-blur sticky top-16 z-40 shadow-sm transition-all">
//           <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-4">
              
//               <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                  
//                   {/* PRIX */}
//                   <div className="md:col-span-4 space-y-3">
//                       <div className="flex justify-between items-center">
//                           <Label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1">Prix Propriété</Label>
//                           <div className="bg-primary/10 text-primary px-2 py-0.5 rounded text-sm font-bold font-mono">{currency.format(price)}</div>
//                       </div>
//                       <Slider min={100000} max={1500000} step={5000} value={[price]} onValueChange={(v) => setPrice(v[0])} className="py-2" />
//                   </div>

//                   {/* APPORT */}
//                   <div className="md:col-span-4 space-y-3">
//                       <div className="flex justify-between items-center">
//                           <Label className={`text-xs font-bold uppercase flex items-center gap-1 ${!simulation.isCompliant ? "text-destructive" : "text-muted-foreground"}`}>
//                               {simulation.isCompliant ? "Apport Initial" : <><AlertTriangle className="h-3 w-3"/> Apport Insuffisant</>}
//                           </Label>
//                           <div className={`px-2 py-0.5 rounded text-sm font-bold font-mono ${!simulation.isCompliant ? "bg-destructive/10 text-destructive" : "bg-green-500/10 text-green-600"}`}>
//                               {currency.format(downPayment)}
//                           </div>
//                       </div>
//                       <Slider min={0} max={price} step={1000} value={[downPayment]} onValueChange={(v) => setDownPayment(v[0])} className="py-2" />
//                   </div>

//                   {/* DUREE */}
//                   <div className="md:col-span-2 space-y-3">
//                       <div className="flex justify-between items-center"><Label className="text-xs font-bold uppercase text-muted-foreground">Durée</Label><span className="font-bold text-sm">{durationYears} ans</span></div>
//                       <Slider min={5} max={30} step={1} value={[durationYears]} onValueChange={(v) => setDurationYears(v[0])} className="py-2" />
//                   </div>

//                   {/* BOUTON OPTIONS */}
//                   <div className="md:col-span-2 flex justify-end">
//                       <Button variant={showAdvanced ? "secondary" : "outline"} onClick={() => setShowAdvanced(!showAdvanced)} className="w-full md:w-auto h-10 gap-2 text-xs font-bold shadow-sm">
//                           <Settings2 className="h-4 w-4" />
//                           {showAdvanced ? "Fermer" : "Configurer"}
//                       </Button>
//                   </div>
//               </div>

//               {/* PANNEAU AVANCÉ */}
//               {showAdvanced && (
//                   <div className="mt-6 pt-6 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-8 animate-in slide-in-from-top-2 fade-in duration-300">
                      
//                       {/* Colonne 1 : Charges */}
//                       <Card className="border-0 shadow-none bg-transparent space-y-4">
//                           <h3 className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2"><Zap className="h-3 w-3"/> Charges Mensuelles</h3>
//                           <div className="grid grid-cols-2 gap-3">
//                               <div className="space-y-1"><Label className="text-[10px]">Taxe Municipale (An)</Label><Input type="number" value={municipalTax} onChange={(e) => setMunicipalTax(Number(e.target.value))} className="h-8 text-xs bg-muted/50"/></div>
//                               <div className="space-y-1"><Label className="text-[10px]">Taxe Scolaire (An)</Label><Input type="number" value={schoolTax} onChange={(e) => setSchoolTax(Number(e.target.value))} className="h-8 text-xs bg-muted/50"/></div>
//                               <div className="space-y-1"><Label className="text-[10px]">Assurance (An)</Label><Input type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} className="h-8 text-xs bg-muted/50"/></div>
//                               <div className="space-y-1"><Label className="text-[10px]">Hydro / Élec (An)</Label><Input type="number" value={hydro} onChange={(e) => setHydro(Number(e.target.value))} className="h-8 text-xs bg-muted/50"/></div>
//                               <div className="col-span-2 space-y-1"><Label className="text-[10px]">Maintenance / Condo (An)</Label><Input type="number" value={maintenance} onChange={(e) => setMaintenance(Number(e.target.value))} className="h-8 text-xs bg-muted/50"/></div>
//                           </div>
//                       </Card>

//                       {/* Colonne 2 : Stratégie */}
//                       <Card className="border-0 shadow-none bg-transparent space-y-4">
//                           <h3 className="text-xs font-bold uppercase text-primary flex items-center gap-2"><TrendingUp className="h-3 w-3"/> Stratégie Accélérée</h3>
//                           <div className="space-y-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
//                               <div className="space-y-2">
//                                   <div className="flex justify-between text-xs"><Label>Extra Mensuel</Label><span className="font-bold text-primary">+{currency.format(extraMonthly)}</span></div>
//                                   <Slider min={0} max={2000} step={50} value={[extraMonthly]} onValueChange={(v) => setExtraMonthly(v[0])} className="cursor-pointer"/>
//                               </div>
//                               <Separator className="bg-primary/10"/>
//                               <div className="space-y-2">
//                                   <div className="flex justify-between text-xs"><Label>Extra Annuel (Lump sum)</Label><span className="font-bold text-primary">+{currency.format(extraAnnual)}</span></div>
//                                   <Slider min={0} max={20000} step={500} value={[extraAnnual]} onValueChange={(v) => setExtraAnnual(v[0])} className="cursor-pointer"/>
//                               </div>
//                           </div>
                          
//                           <div className="flex items-center justify-between pt-2">
//                              <Label className="text-xs flex items-center gap-2"><MapPin className="h-3 w-3"/> Propriété à Montréal ?</Label>
//                              <Switch checked={isMontreal} onCheckedChange={setIsMontreal} />
//                           </div>
//                       </Card>

//                       {/* Colonne 3 : Cashflow Initial */}
//                       <Card className="border-0 shadow-none bg-transparent space-y-4">
//                           <h3 className="text-xs font-bold uppercase text-green-600 flex items-center gap-2"><Wallet className="h-3 w-3"/> Coûts de Démarrage</h3>
//                           <div className="space-y-2 text-xs">
//                               <div className="flex justify-between p-2 rounded hover:bg-muted/50"><span>Mise de fonds</span><span className="font-medium">{currency.format(downPayment)}</span></div>
//                               <div className="flex justify-between p-2 rounded hover:bg-muted/50"><span>Taxe Bienvenue {isMontreal && "(MTL)"}</span><span className="text-muted-foreground">{currency.format(welcomeTax)}</span></div>
//                               <div className="flex justify-between p-2 rounded hover:bg-muted/50"><span>Notaire & Autres</span><span className="text-muted-foreground">{currency.format(notaryFees + startupFees)}</span></div>
//                               <Separator />
//                               <div className="flex justify-between p-2 bg-muted/30 rounded font-bold text-sm"><span>TOTAL REQUIS</span><span>{currency.format(totalCashRequired)}</span></div>
//                           </div>
//                       </Card>
//                   </div>
//               )}
//           </div>
//       </div>

//       {/* ZONE PRINCIPALE */}
//       <div className="flex-1 overflow-y-auto bg-muted/10 p-4 lg:p-8">
//           <div className="max-w-[1600px] mx-auto space-y-8 pb-20">
              
//               {/* ALERTE NON CONFORME */}
//               {!simulation.isCompliant && (
//                 <div className="rounded-xl border border-destructive bg-destructive/5 p-6 flex flex-col md:flex-row items-center gap-6 animate-in zoom-in-95 duration-300">
//                     <div className="p-4 bg-destructive/10 rounded-full"><Lock className="h-8 w-8 text-destructive" /></div>
//                     <div className="flex-1 text-center md:text-left">
//                         <h3 className="text-lg font-bold text-destructive">Financement Impossible</h3>
//                         <p className="text-sm text-muted-foreground mb-2">{simulation.complianceError}</p>
//                         <div className="inline-flex items-center gap-2 bg-background border px-3 py-1 rounded text-sm font-medium">
//                             Il manque <span className="text-destructive font-bold">{currency.format(simulation.shortfall || 0)}</span> d'apport
//                         </div>
//                     </div>
//                     <Button variant="destructive" onClick={() => setDownPayment(d => d + (simulation.shortfall || 0))}>
//                         Ajouter la différence
//                     </Button>
//                 </div>
//               )}

//               {/* STATS CARDS GRID */}
//               <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${!simulation.isCompliant ? "opacity-40 pointer-events-none grayscale" : ""}`}>
                  
//                   {/* 1. BUDGET */}
//                   <Card className="relative overflow-hidden group hover:shadow-lg transition-all border-l-4 border-l-primary">
//                       <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Wallet className="w-16 h-16" /></div>
//                       <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground uppercase">Mensualité Totale</CardTitle></CardHeader>
//                       <CardContent>
//                           <div className="text-3xl font-bold text-foreground">{currency.format(totalMonthlyOutPocket)}</div>
//                           <p className="text-xs text-muted-foreground mt-1">Dont financement: <span className="font-semibold text-primary">{currency.format(paymentQurtuba)}</span></p>
//                       </CardContent>
//                   </Card>

//                   {/* 2. REVENU */}
//                   <Card className="relative overflow-hidden group hover:shadow-lg transition-all border-l-4 border-l-blue-500">
//                       <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><TrendingUp className="w-16 h-16 text-blue-500" /></div>
//                       <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground uppercase">Revenu Requis</CardTitle></CardHeader>
//                       <CardContent>
//                           <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{currency.format(qualifyingIncome)}</div>
//                           <p className="text-xs text-muted-foreground mt-1">Brut familial (Ratio 32%)</p>
//                       </CardContent>
//                   </Card>

//                   {/* 3. PATRIMOINE */}
//                   <Card className="relative overflow-hidden group hover:shadow-lg transition-all border-l-4 border-l-green-500">
//                       <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><PiggyBank className="w-16 h-16 text-green-500" /></div>
//                       <CardHeader className="pb-2 flex flex-row justify-between items-center space-y-0">
//                           <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Net à {wealthHorizon === 'end' ? 'la fin' : `${wealthHorizon} ans`}</CardTitle>
//                       </CardHeader>
//                       <CardContent>
//                           <div className="text-3xl font-bold text-green-600 dark:text-green-400">{currency.format(statsWealth.equity)}</div>
                          
//                           {/* MODIFICATION ICI : Ajout de 20 et 25 ans */}
//                           <div className="flex flex-wrap gap-1 mt-2">
//                               {[5, 10, 15, 20, 25].map(y => (
//                                   <button 
//                                       key={y} 
//                                       onClick={() => setWealthHorizon(y)} 
//                                       className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${wealthHorizon === y ? 'bg-green-600 text-white border-green-600' : 'hover:bg-muted'}`}
//                                   >
//                                       {y}a
//                                   </button>
//                               ))}
//                               <button 
//                                   onClick={() => setWealthHorizon('end')} 
//                                   className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${wealthHorizon === 'end' ? 'bg-green-600 text-white border-green-600' : 'hover:bg-muted'}`}
//                               >
//                                   Fin
//                               </button>
//                           </div>
//                       </CardContent>
//                   </Card>

//                   {/* 4. ECONOMIE / TEMPS */}
//                   <Card className="relative overflow-hidden group hover:shadow-lg transition-all border-l-4 border-l-orange-500 bg-orange-50/50 dark:bg-orange-950/10">
//                       <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground uppercase">Optimisation</CardTitle></CardHeader>
//                       <CardContent>
//                           <div className="flex items-baseline gap-2">
//                               <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{currency.format(simulation.interestSaved)}</div>
//                           </div>
//                           <p className="text-xs font-medium mt-1 text-orange-600/80 dark:text-orange-400/80">
//                               {simulation.timeSavedMonths > 0 ? `+ ${formatMonthsToYears(simulation.timeSavedMonths)} gagnés !` : "d'économie potentielle"}
//                           </p>
//                       </CardContent>
//                   </Card>
//               </div>

//               {/* GRAPHIQUES & DATA */}
//               <div className={`space-y-6 ${!simulation.isCompliant ? "opacity-40 pointer-events-none" : ""}`}>
//                   <Tabs defaultValue="chart" className="w-full">
//                       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
//                           <TabsList className="grid w-full md:w-auto grid-cols-2">
//                               <TabsTrigger value="chart">Analyse Visuelle</TabsTrigger>
//                               <TabsTrigger value="table">Tableau Détaillé</TabsTrigger>
//                           </TabsList>
                          
//                           <div className="flex bg-card border p-1 rounded-lg shadow-sm">
//                                 <button onClick={() => setChartView('evolution')} className={`px-4 py-1.5 text-xs font-medium rounded transition-all ${chartView === 'evolution' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}>Dette & Accélération</button>
//                                 <button onClick={() => setChartView('networth')} className={`px-4 py-1.5 text-xs font-medium rounded transition-all ${chartView === 'networth' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}>Patrimoine</button>
//                                 <button onClick={() => setChartView('distribution')} className={`px-4 py-1.5 text-xs font-medium rounded transition-all ${chartView === 'distribution' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}>Répartition</button>
//                           </div>
//                       </div>

// <TabsContent value="chart" className="mt-0">
//     <Card className="h-[500px] p-2 md:p-6 shadow-md border-border bg-card">
//         <ResponsiveContainer width="100%" height="100%">
//             {chartView === 'evolution' ? (
//                 <ComposedChart 
//                     data={chartData} 
//                     margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
//                 >
//                     <defs>
//                         {/* Dégradé ORANGE Vif pour le Loyer */}
//                         <linearGradient id="colorRent" x1="0" y1="0" x2="0" y2="1">
//                             <stop offset="5%" stopColor="#f97316" stopOpacity={0.9}/>
//                             <stop offset="95%" stopColor="#f97316" stopOpacity={0.2}/>
//                         </linearGradient>
                        
//                         {/* Dégradé BLEU Profond pour le Capital */}
//                         <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
//                             <stop offset="5%" stopColor="#2563eb" stopOpacity={0.9}/>
//                             <stop offset="95%" stopColor="#2563eb" stopOpacity={0.2}/>
//                         </linearGradient>
//                     </defs>

//                     <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} stroke="currentColor" />

//                     <XAxis 
//                         dataKey="month" 
//                         stroke="currentColor" 
//                         fontSize={12} 
//                         tickLine={false} 
//                         axisLine={false} 
//                         tickFormatter={(val) => `An ${Math.floor(val/12)}`} 
//                         minTickGap={50} 
//                         className="text-muted-foreground"
//                     />

//                     {/* AXE Y GAUCHE : Caché (Pour les Aires) */}
//                     <YAxis yAxisId="left" hide />

//                     {/* AXE Y DROIT : Visible (Pour les Lignes de dette) */}
//                     <YAxis 
//                         yAxisId="right" 
//                         orientation="right" 
//                         stroke="currentColor" 
//                         fontSize={11} 
//                         tickLine={false} 
//                         axisLine={false} 
//                         tickFormatter={(value) => `${(value/1000).toFixed(0)}k`} 
//                         width={40}
//                         className="text-muted-foreground opacity-50"
//                     />

//                     <Tooltip 
//                         contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
//                         itemStyle={{ paddingBottom: '2px' }}
//                         formatter={(value: number, name: string) => {
//                             if (name === 'balanceAccelerated') return [currency.format(value), 'Votre Solde (Optimisé)'];
//                             if (name === 'balanceStandard') return [currency.format(value), 'Solde Standard (25 ans)'];
//                             if (name === 'principalPaid') return [currency.format(value), 'Capital (Bleu)'];
//                             if (name === 'interestPaid') return [currency.format(value), 'Loyer (Orange)'];
//                             return [currency.format(value), name];
//                         }}
//                         labelFormatter={(label) => `Mois ${label} (${(label/12).toFixed(1)} ans)`}
//                     />

//                     <Legend verticalAlign="top" height={36} iconType="circle"/>

//                     {/* 1. Loyer (Orange) */}
//                     <Area 
//                         yAxisId="left"
//                         type="monotone" 
//                         dataKey="interestPaid" 
//                         name="Loyer" 
//                         stackId="1" 
//                         stroke="#f97316" 
//                         fill="url(#colorRent)" 
//                         fillOpacity={1}
//                     />

//                     {/* 2. Capital (Bleu) */}
//                     <Area 
//                         yAxisId="left"
//                         type="monotone" 
//                         dataKey="principalPaid" 
//                         name="Capital" 
//                         stackId="1" 
//                         stroke="#2563eb" 
//                         fill="url(#colorPrincipal)" 
//                         fillOpacity={1}
//                     />

//                     {/* 3. LIGNE STANDARD (Grise Pointillée) - C'est celle qui manquait ! */}
//                     <Line 
//                         yAxisId="right"
//                         type="monotone" 
//                         dataKey="balanceStandard" 
//                         name="Standard" 
//                         stroke="#94a3b8" 
//                         strokeWidth={2} 
//                         strokeDasharray="5 5" // Effet pointillé
//                         dot={false}
//                         opacity={0.6}
//                     />

//                     {/* 4. LIGNE OPTIMISÉE (Blanche Solide) */}
//                     <Line 
//                         yAxisId="right"
//                         type="monotone" 
//                         dataKey="balanceAccelerated" 
//                         name="Optimisé" 
//                         stroke="currentColor" 
//                         strokeWidth={3} 
//                         dot={false}
//                         className="text-foreground"
//                     />

//                 </ComposedChart>
//             ) : chartView === 'networth' ? (
//                 // --- CODE PATRIMOINE (INCHANGÉ) ---
//                 <ComposedChart data={enrichedSchedule} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
//                     <defs>
//                         <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
//                             <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
//                             <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
//                         </linearGradient>
//                     </defs>
//                     <CartesianGrid strokeDasharray="3 3" opacity={0.15} vertical={false} />
//                     <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} minTickGap={50} />
//                     <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} width={40} />
//                     <Tooltip formatter={(value: number) => currency.format(value)} contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
//                     <Legend verticalAlign="top" height={36}/>
//                     <Area type="monotone" dataKey="houseValue" name="Valeur Maison" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorNet)" />
//                     <Line type="monotone" dataKey="netEquity" name="Équité Nette" stroke="#15803d" strokeWidth={3} dot={false} />
//                     <Line type="monotone" dataKey="remainingBankBalance" name="Dette Restante" stroke="#94a3b8" strokeWidth={2} dot={false} />
//                 </ComposedChart>
//             ) : (
//                 // --- CODE RÉPARTITION (INCHANGÉ) ---
//                 <PieChart>
//                     <Pie 
//                         data={[
//                             { name: 'Capital Remboursé', value: price, color: '#3b82f6' },
//                             { name: 'Coût Intérêts', value: simulation.totalInterestPaid, color: '#f97316' },
//                             { name: 'Taxes & Charges', value: monthlyCharges * simulation.actualDurationMonths, color: '#64748b' }
//                         ]} 
//                         cx="50%" cy="50%" innerRadius={100} outerRadius={140} paddingAngle={2} dataKey="value"
//                     >
//                         <Cell fill="#3b82f6"/>
//                         <Cell fill="#f97316"/>
//                         <Cell fill="#64748b"/>
//                     </Pie>
//                     <Tooltip formatter={(value: number) => currency.format(value)} contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
//                     <Legend verticalAlign="middle" align="right" layout="vertical" />
//                 </PieChart>
//             )}
//         </ResponsiveContainer>
//     </Card>
// </TabsContent>

// <TabsContent value="table">
//     <Card className="shadow-md border-border overflow-hidden">
//         <div className="flex items-center justify-between p-4 border-b bg-muted/30">
//             <div className="flex items-center gap-2">
//                 <CardTitle className="text-sm">Tableau d'amortissement</CardTitle>
//                 <Badge variant="secondary">{simulation.schedule.length} mois</Badge>
//             </div>
//             <Button variant="outline" size="sm" onClick={handleExportCSV} className="gap-2 h-8 text-xs">
//                 <Download className="h-3.5 w-3.5" /> CSV
//             </Button>
//         </div>
//         <div className="max-h-[500px] overflow-auto">
//             <Table>
//                 <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
//                     <TableRow className="hover:bg-transparent">
//                         <TableHead className="w-[80px]">Mois</TableHead>
//                         <TableHead className="text-orange-500">Loyer (Intérêts)</TableHead>
//                         <TableHead>Capital</TableHead>
//                         <TableHead>Paiement Total</TableHead>
//                         <TableHead className="text-right">Solde Restant</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {simulation.schedule.map((row) => (
//                         <TableRow key={row.month} className="hover:bg-muted/50 transition-colors">
//                             <TableCell className="font-mono text-xs text-muted-foreground">{row.month}</TableCell>
                            
//                             {/* ICI : Couleur Orange forcée et Gras */}
//                             <TableCell className="text-orange-500 font-bold">
//                                 {currency.format(row.rentPayment)}
//                             </TableCell>
                            
//                             <TableCell className="text-primary font-bold">{currency.format(row.principalPayment)}</TableCell>
//                             <TableCell className="font-mono">{currency.format(row.totalPayment)}</TableCell>
//                             <TableCell className="text-right font-mono text-muted-foreground">{currency.format(row.remainingBankBalance)}</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </div>
//     </Card>
// </TabsContent>
//                   </Tabs>
//               </div>
//           </div>
//       </div>
//     </main>
//   );
// }

// "use client";

// import { useQurtuba } from "@/hooks/use-qurtuba";
// import { SimulatorHeader } from "@/components/simulator/simulator-header";
// import { SimulatorControls } from "@/components/simulator/simulator-controls";
// import { SimulatorKPIs } from "@/components/simulator/simulator-kpis";
// import { SimulatorCharts } from "@/components/simulator/simulator-charts";
// import { Button } from "@/components/ui/button";
// import { Lock } from "lucide-react";

// export default function Home() {
//   // 1. LE CERVEAU : On récupère tout depuis le Custom Hook
//   const {
//     // Setters
//     setPrice, setDownPayment, setDurationYears, setExtraMonthly, setExtraAnnual, setIsMontreal,
//     setMunicipalTax, setSchoolTax, setInsurance, setHydro, setMaintenance, setChartView, setWealthHorizon,
//     // Values
//     price, downPayment, durationYears, extraMonthly, extraAnnual, isMontreal,
//     municipalTax, schoolTax, insurance, hydro, maintenance, chartView, wealthHorizon,
//     // Results
//     simulation, totalMonthlyOutPocket, paymentQurtuba, qualifyingIncome,
//     chartData, enrichedSchedule, statsWealth,
//     // Utils
//     isDark, currency, monthlyCharges
//   } = useQurtuba();

//   // 2. FONCTIONS UTILITAIRES (Pour l'affichage)
//   const formatMonthsToYears = (m: number) => {
//       const y = Math.floor(m / 12);
//       const remM = m % 12;
//       if (y === 0) return `${remM} mois`;
//       if (remM === 0) return `${y} ans`;
//       return `${y} ans ${remM} mois`;
//   }

//   // 3. LOGIQUE D'EXPORT CSV
//   const handleExportCSV = () => {
//     if (!enrichedSchedule.length) return;
//     const headers = ["Mois,Loyer,Capital,Total,Solde,ValeurMaison,EquiteNette"];
//     const rows = enrichedSchedule.map((r: any) => `${r.month},${r.rentPayment.toFixed(2)},${r.principalPayment.toFixed(2)},${r.totalPayment.toFixed(2)},${r.remainingBankBalance.toFixed(2)},${r.houseValue?.toFixed(2)},${r.netEquity?.toFixed(2)}`);
//     const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "qurtuba_plan_financier.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <main className="min-h-screen w-full bg-background font-sans flex flex-col transition-colors duration-300">
      
//       {/* 1. HEADER (Modulaire) */}
//       <SimulatorHeader 
//           timeSavedMonths={simulation.timeSavedMonths}
//           formatMonthsToYears={formatMonthsToYears}
//       />

// {/* 2. CONTROLS (Sticky Bar) */}
//       {/* CORRECTION MOBILE : 
//           1. max-h-[calc(100vh-4rem)] : Limite la hauteur à l'écran moins le header
//           2. overflow-y-auto : Ajoute un scroll interne si le menu est trop long
//       */}
//       <div className="border-b border-border bg-background/95 backdrop-blur sticky top-16 z-40 shadow-sm max-h-[calc(100vh-4rem)] overflow-y-auto">
//            <SimulatorControls 
//               price={price} setPrice={setPrice}
//               downPayment={downPayment} setDownPayment={setDownPayment}
//               durationYears={durationYears} setDurationYears={setDurationYears}
//               extraMonthly={extraMonthly} setExtraMonthly={setExtraMonthly}
//               extraAnnual={extraAnnual} setExtraAnnual={setExtraAnnual}
//               isMontreal={isMontreal} setIsMontreal={setIsMontreal}
//               municipalTax={municipalTax} setMunicipalTax={setMunicipalTax}
//               schoolTax={schoolTax} setSchoolTax={setSchoolTax}
//               insurance={insurance} setInsurance={setInsurance}
//               hydro={hydro} setHydro={setHydro}
//               maintenance={maintenance} setMaintenance={setMaintenance}
//               currency={currency}
//               simulation={simulation}
//            />
//       </div>

//       {/* 3. ZONE PRINCIPALE (Scrollable) */}
//       <div className="flex-1 overflow-y-auto bg-muted/10 p-4 lg:p-8">
//           <div className="max-w-[1600px] mx-auto space-y-8 pb-20">
              
//               {/* ETAT D'ERREUR (Reste ici pour gérer le layout global) */}
//               {!simulation.isCompliant && (
//                 <div className="rounded-xl border border-destructive bg-destructive/5 p-6 flex flex-col md:flex-row items-center gap-6 animate-in zoom-in-95 duration-300">
//                     <div className="p-4 bg-destructive/10 rounded-full"><Lock className="h-8 w-8 text-destructive" /></div>
//                     <div className="flex-1 text-center md:text-left">
//                         <h3 className="text-lg font-bold text-destructive">Financement Impossible</h3>
//                         <p className="text-sm text-muted-foreground mb-2">{simulation.complianceError}</p>
//                         <div className="inline-flex items-center gap-2 bg-background border px-3 py-1 rounded text-sm font-medium">
//                             Il manque <span className="text-destructive font-bold">{currency.format(simulation.shortfall || 0)}</span> d'apport
//                         </div>
//                     </div>
//                     <Button variant="destructive" onClick={() => setDownPayment(d => d + (simulation.shortfall || 0))}>
//                         Ajouter la différence
//                     </Button>
//                 </div>
//               )}

//               {/* 4. KPI CARDS (Effet Grayscale si erreur) */}
//               <div className={!simulation.isCompliant ? "opacity-40 pointer-events-none grayscale" : ""}>
//                  <SimulatorKPIs 
//                     totalMonthlyOutPocket={totalMonthlyOutPocket}
//                     paymentQurtuba={paymentQurtuba}
//                     qualifyingIncome={qualifyingIncome}
//                     statsWealth={statsWealth}
//                     wealthHorizon={wealthHorizon}
//                     setWealthHorizon={setWealthHorizon}
//                     interestSaved={simulation.interestSaved}
//                     timeSaved={simulation.timeSavedMonths}
//                     currency={currency}
//                     formatMonthsToYears={formatMonthsToYears}
//                  />
//               </div>

//               {/* 5. CHARTS & TABLES (Effet Grayscale si erreur) */}
//               <div className={!simulation.isCompliant ? "opacity-40 pointer-events-none" : ""}>
//                   <SimulatorCharts 
//                     chartView={chartView}
//                     setChartView={setChartView}
//                     chartData={chartData}
//                     enrichedSchedule={enrichedSchedule}
//                     simulation={simulation}
//                     price={price}
//                     monthlyCharges={monthlyCharges}
//                     isDark={isDark}
//                     currency={currency}
//                     onExport={handleExportCSV}
//                   />
//               </div>

//           </div>
//       </div>
//     </main>
//   );
// }
"use client";

import { useQurtuba } from "@/hooks/use-qurtuba";
import { SimulatorHeader } from "@/components/simulator/simulator-header";
import { SimulatorControls } from "@/components/simulator/simulator-controls";
import { SimulatorKPIs } from "@/components/simulator/simulator-kpis";
import { SimulatorCharts } from "@/components/simulator/simulator-charts";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function Home() {
  const {
    // Setters
    setPrice, setDownPayment, setDurationYears, setExtraMonthly, setExtraAnnual,
    setMunicipalTax, setSchoolTax, setInsurance, setHydro, setMaintenance, setChartView, setWealthHorizon,
    setAppreciation, // Important
    // Values
    price, downPayment, durationYears, extraMonthly, extraAnnual,
    municipalTax, schoolTax, insurance, hydro, maintenance, chartView, wealthHorizon,
    appreciation, // Important
    // Results
    simulation, totalMonthlyOutPocket, paymentQurtuba, qualifyingIncome,
    chartData, enrichedSchedule, statsWealth,
    welcomeTax, notaryFees, startupFees, totalCashRequired,
    isDark, currency, monthlyCharges
  } = useQurtuba();

  const formatMonthsToYears = (m: number) => {
      const y = Math.floor(m / 12);
      const remM = m % 12;
      return y === 0 ? `${remM} mois` : remM === 0 ? `${y} ans` : `${y} ans ${remM} mois`;
  }

  const handleExportCSV = () => {
    if (!enrichedSchedule.length) return;
    const headers = ["Mois,Loyer,Capital,Total,Solde,ValeurMaison,EquiteNette"];
    const rows = enrichedSchedule.map((r: any) => `${r.month},${r.rentPayment.toFixed(2)},${r.principalPayment.toFixed(2)},${r.totalPayment.toFixed(2)},${r.remainingBankBalance.toFixed(2)},${r.houseValue?.toFixed(2)},${r.netEquity?.toFixed(2)}`);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "qurtuba_plan_financier.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen w-full bg-background font-sans flex flex-col transition-colors duration-300">
      
      <SimulatorHeader 
          timeSavedMonths={simulation.timeSavedMonths}
          formatMonthsToYears={formatMonthsToYears}
      />

      {/* CONTROLS */}
      <div className="border-b border-border bg-background/95 backdrop-blur sticky top-16 z-40 shadow-sm max-h-[calc(100vh-4rem)] overflow-y-auto">
           <SimulatorControls 
              price={price} setPrice={setPrice}
              downPayment={downPayment} setDownPayment={setDownPayment}
              durationYears={durationYears} setDurationYears={setDurationYears}
              extraMonthly={extraMonthly} setExtraMonthly={setExtraMonthly}
              extraAnnual={extraAnnual} setExtraAnnual={setExtraAnnual}
              
              appreciation={appreciation} setAppreciation={setAppreciation} // <--- C'est ici que ça passait undefined avant
              
              municipalTax={municipalTax} setMunicipalTax={setMunicipalTax}
              schoolTax={schoolTax} setSchoolTax={setSchoolTax}
              insurance={insurance} setInsurance={setInsurance}
              hydro={hydro} setHydro={setHydro}
              maintenance={maintenance} setMaintenance={setMaintenance}
              currency={currency}
              simulation={simulation}
              welcomeTax={welcomeTax}
              notaryFees={notaryFees}
              startupFees={startupFees}
              totalCashRequired={totalCashRequired}
              // Suppression des props isMontreal inutiles
              isMontreal={false} setIsMontreal={() => {}}
           />
      </div>

      <div className="flex-1 overflow-y-auto bg-muted/10 p-4 lg:p-8">
          <div className="max-w-[1600px] mx-auto space-y-8 pb-20">
              
              {!simulation.isCompliant && (
                <div className="rounded-xl border border-destructive bg-destructive/5 p-6 flex flex-col md:flex-row items-center gap-6 animate-in zoom-in-95 duration-300">
                    <div className="p-4 bg-destructive/10 rounded-full"><Lock className="h-8 w-8 text-destructive" /></div>
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-lg font-bold text-destructive">Financement Impossible</h3>
                        <p className="text-sm text-muted-foreground mb-2">{simulation.complianceError}</p>
                        <div className="inline-flex items-center gap-2 bg-background border px-3 py-1 rounded text-sm font-medium">
                            Il manque <span className="text-destructive font-bold">{currency.format(simulation.shortfall || 0)}</span> d'apport
                        </div>
                    </div>
                    <Button variant="destructive" onClick={() => setDownPayment(d => d + (simulation.shortfall || 0))}>
                        Ajouter la différence
                    </Button>
                </div>
              )}

              <div className={!simulation.isCompliant ? "opacity-40 pointer-events-none grayscale" : ""}>
                 <SimulatorKPIs 
                    totalMonthlyOutPocket={totalMonthlyOutPocket}
                    paymentQurtuba={paymentQurtuba}
                    monthlyCharges={monthlyCharges}
                    qualifyingIncome={qualifyingIncome}
                    statsWealth={statsWealth}
                    wealthHorizon={wealthHorizon}
                    setWealthHorizon={setWealthHorizon}
                    totalRentPaid={simulation.totalInterestPaid}
                    interestSaved={simulation.interestSaved}
                    timeSaved={simulation.timeSavedMonths}
                    currency={currency}
                    formatMonthsToYears={formatMonthsToYears}
                 />
              </div>

              <div className={!simulation.isCompliant ? "opacity-40 pointer-events-none" : ""}>
                  <SimulatorCharts 
                    chartView={chartView}
                    setChartView={setChartView}
                    chartData={chartData}
                    enrichedSchedule={enrichedSchedule}
                    simulation={simulation}
                    price={price}
                    monthlyCharges={monthlyCharges}
                    isDark={isDark}
                    currency={currency}
                    onExport={handleExportCSV}
                  />
              </div>
          </div>
      </div>
    </main>
  );
}