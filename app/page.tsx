// // "use client";

// // import { useState, useMemo } from "react";
// // import { QurtubaSimulator, SimulationResult } from "@/lib/qurtuba-logic";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Slider } from "@/components/ui/slider";
// // import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, Line, ComposedChart } from 'recharts';
// // import { ModeToggle } from "@/components/mode-toggle";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui/table"
// // import { Badge } from "@/components/ui/badge"
// // import { Button } from "@/components/ui/button"
// // import { Progress } from "@/components/ui/progress"
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // import { Lock, Download, Zap, Wallet, PieChart as PieIcon, TrendingUp, Home as HomeIcon, Hammer, PiggyBank, LineChart } from "lucide-react"

// // export default function Home() {
// //   const [price, setPrice] = useState(500000);
// //   const [downPayment, setDownPayment] = useState(60000);
// //   const [durationYears, setDurationYears] = useState(25);
// //   const [extraMonthly, setExtraMonthly] = useState(0);
// //   const [extraAnnual, setExtraAnnual] = useState(0);
  
// //   // CHARGES & PARAMÈTRES
// //   const [municipalTax, setMunicipalTax] = useState(3000);
// //   const [schoolTax, setSchoolTax] = useState(350);
// //   const [insurance, setInsurance] = useState(1200);
// //   const [hydro, setHydro] = useState(1800);
// //   const [maintenance, setMaintenance] = useState(2400); 
// //   const [appreciation, setAppreciation] = useState(3);
  
// //   const [chartView, setChartView] = useState<'evolution' | 'distribution' | 'networth'>('evolution');
// //   const rate = 5.5; 

// //   const { simulation, welcomeTax, notaryFees, startupFees } = useMemo(() => {
// //     const sim = new QurtubaSimulator(price, downPayment, rate, durationYears, extraMonthly, extraAnnual);
// //     return {
// //         simulation: sim.generateSchedule(),
// //         welcomeTax: sim.calculateWelcomeTax(),
// //         notaryFees: sim.calculateNotaryFees(),
// //         startupFees: sim.calculateStartupFees()
// //     };
// //   }, [price, downPayment, durationYears, extraMonthly, extraAnnual]);

// //   const enrichedSchedule = useMemo(() => {
// //       let currentHouseValue = price;
// //       const monthlyAppreciationRate = appreciation / 100 / 12;
// //       const result = [];

// //       // CORRECTIF : Utilisation d'une boucle for au lieu de map pour éviter l'erreur de réassignation
// //       for (const row of simulation.schedule) {
// //           currentHouseValue = currentHouseValue * (1 + monthlyAppreciationRate);
// //           result.push({
// //               ...row,
// //               houseValue: currentHouseValue,
// //               netEquity: currentHouseValue - row.remainingBankBalance
// //           });
// //       }
// //       return result;
// //   }, [simulation.schedule, price, appreciation]);

// //   const currency = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

// //   const totalCashRequired = downPayment + welcomeTax + notaryFees + startupFees;
// //   const monthlyCharges = (municipalTax + schoolTax + insurance + hydro + maintenance) / 12;
// //   const paymentQurtuba = simulation.monthlyPaymentFixed + extraMonthly;
// //   const totalMonthlyOutPocket = paymentQurtuba + monthlyCharges;

// //   // Calcul valeur finale projetée (5 ans)
// //   const getWealthAtYear = (year: number) => {
// //       if (!simulation.schedule || simulation.schedule.length === 0) return { value: 0, debt: 0, equity: 0 };
// //       const monthIndex = Math.min(year * 12, simulation.schedule.length) - 1;
// //       const row = monthIndex >= 0 ? simulation.schedule[monthIndex] : { remainingBankBalance: price - downPayment };
      
// //       const futureValue = price * Math.pow(1 + (appreciation/100), year);
// //       const debt = row.remainingBankBalance;
// //       return { value: futureValue, debt: debt, equity: futureValue - debt };
// //   };

// //   const stats5Years = getWealthAtYear(5);

// //   const totalChargesOverDuration = monthlyCharges * simulation.actualDurationMonths;
// //   const pieData = [
// //     { name: 'Capital (Votre part)', value: price, color: 'hsl(var(--primary))' },
// //     { name: 'Intérêts (Coût Banque)', value: simulation.totalInterestPaid, color: '#f97316' }, 
// //     { name: 'Charges & Entretien', value: totalChargesOverDuration, color: '#64748b' }, 
// //   ];

// //   const qurtubaThreshold = 60000;
// //   const progressValue = Math.min(100, (downPayment / qurtubaThreshold) * 100);

// //   const handleExportCSV = () => {
// //     if (!enrichedSchedule || enrichedSchedule.length === 0) return;
// //     const headers = ["Mois,Loyer,Capital,Paiement,Solde,ValeurMaison,EquiteNette"];
// //     const rows = enrichedSchedule.map(r => `${r.month},${r.rentPayment.toFixed(2)},${r.principalPayment.toFixed(2)},${r.totalPayment.toFixed(2)},${r.remainingBankBalance.toFixed(2)},${r.houseValue.toFixed(2)},${r.netEquity.toFixed(2)}`);
// //     const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
// //     const encodedUri = encodeURI(csvContent);
// //     const link = document.createElement("a");
// //     link.setAttribute("href", encodedUri);
// //     link.setAttribute("download", "simulation_qurtuba_complete.csv");
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //   };

// //   return (
// //     <main className="flex flex-col h-screen w-full bg-background font-sans overflow-hidden">
      
// //       {/* 1. HEADER (Fixe) */}
// //       <header className="h-14 shrink-0 border-b border-border bg-card/50 backdrop-blur-sm z-50 flex items-center justify-between px-6">
// //           <div className="flex items-center gap-3">
// //             <h1 className="text-lg font-bold tracking-tight text-foreground">
// //               Simulateur Qurtuba <span className="text-primary">V14</span>
// //             </h1>
// //             <Badge variant="secondary" className="text-[10px] font-normal hidden sm:inline-flex">Expert Layout</Badge>
// //           </div>
// //           <div className="flex items-center gap-3">
// //              {!simulation.isCompliant && <Badge variant="destructive" className="animate-pulse">Non Conforme</Badge>}
// //             <ModeToggle />
// //           </div>
// //       </header>

// //       {/* 2. CORPS DE L'APPLICATION (Split View) */}
// //       <div className="flex flex-1 overflow-hidden">
          
// //           <Tabs defaultValue="simulator" className="flex-1 flex flex-col overflow-hidden">
            
// //             {/* A. SIDEBAR GAUCHE (Inputs Fixes) */}
// //             <div className="flex h-full">
// //                 <aside className="w-[400px] shrink-0 border-r border-border bg-card/20 flex flex-col h-full overflow-y-auto custom-scrollbar">
                    
// //                     {/* Navigation Onglets Mobile/Desktop */}
// //                     <div className="p-4 pb-0">
// //                         <TabsList className="grid w-full grid-cols-2 mb-4">
// //                             <TabsTrigger value="simulator">Simulateur</TabsTrigger>
// //                             <TabsTrigger value="guide">Guide</TabsTrigger>
// //                         </TabsList>
// //                     </div>

// //                     <TabsContent value="simulator" className="mt-0 p-4 space-y-4 data-[state=inactive]:hidden">
// //                         {/* Carte 1: Financement */}
// //                         <Card className={`shadow-sm border-border ${!simulation.isCompliant ? "border-destructive/50 ring-1 ring-destructive/20" : ""}`}>
// //                             <CardHeader className="p-4 pb-2"><CardTitle className="text-sm font-semibold">1. Financement</CardTitle></CardHeader>
// //                             <CardContent className="p-4 space-y-4">
// //                                 <div className="space-y-1">
// //                                     <div className="flex justify-between"><Label className="text-xs">Prix maison</Label><span className="font-bold text-sm text-primary">{currency.format(price)}</span></div>
// //                                     <Slider min={100000} max={1500000} step={5000} value={[price]} onValueChange={(v) => setPrice(v[0])} />
// //                                 </div>
// //                                 <div className="space-y-1">
// //                                     <div className="flex justify-between">
// //                                         <Label className={`text-xs ${!simulation.isCompliant ? "text-destructive" : ""}`}>Apport</Label>
// //                                         <span className={`font-bold text-sm ${!simulation.isCompliant ? "text-destructive" : "text-green-500"}`}>{currency.format(downPayment)}</span>
// //                                     </div>
// //                                     <Slider min={0} max={price} step={1000} value={[downPayment]} onValueChange={(v) => setDownPayment(v[0])} />
                                    
// //                                     {/* Jauge intégrée discrète */}
// //                                     <div className="pt-2">
// //                                         <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
// //                                             <span>Priorité ({currency.format(qurtubaThreshold)})</span>
// //                                             <span className={progressValue >= 100 ? "text-green-600 font-bold" : ""}>{Math.round(progressValue)}%</span>
// //                                         </div>
// //                                         <Progress value={progressValue} className="h-1.5" />
// //                                         {!simulation.isCompliant && <div className="flex justify-end mt-1 text-destructive text-[10px] font-bold">Min requis: {currency.format(simulation.minDownPaymentRequired)}</div>}
// //                                     </div>
// //                                 </div>
// //                                 <div className="space-y-1">
// //                                     <div className="flex justify-between"><Label className="text-xs">Durée</Label><span className="font-bold text-sm">{durationYears} ans</span></div>
// //                                     <Slider min={1} max={30} step={1} value={[durationYears]} onValueChange={(v) => setDurationYears(v[0])} />
// //                                 </div>
// //                             </CardContent>
// //                         </Card>

// //                         {/* Carte 2: Charges */}
// //                         <Card className="shadow-sm border-border bg-card/40">
// //                             <CardHeader className="p-4 pb-2"><CardTitle className="text-sm font-semibold">2. Charges Annuelles</CardTitle></CardHeader>
// //                             <CardContent className="p-4 space-y-3">
// //                                 <div className="grid grid-cols-2 gap-3">
// //                                     <div className="space-y-1"><Label className="text-[10px] text-muted-foreground">Municipale</Label><Input type="number" suppressHydrationWarning value={municipalTax} onChange={(e) => setMunicipalTax(Number(e.target.value))} className="h-8 text-xs bg-background" /></div>
// //                                     <div className="space-y-1"><Label className="text-[10px] text-muted-foreground">Scolaire</Label><Input type="number" suppressHydrationWarning value={schoolTax} onChange={(e) => setSchoolTax(Number(e.target.value))} className="h-8 text-xs bg-background" /></div>
// //                                 </div>
// //                                 <div className="grid grid-cols-2 gap-3">
// //                                     <div className="space-y-1"><Label className="text-[10px] text-muted-foreground">Assurance</Label><Input type="number" suppressHydrationWarning value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} className="h-8 text-xs bg-background" /></div>
// //                                     <div className="space-y-1"><Label className="text-[10px] text-muted-foreground flex items-center gap-1"><Zap className="h-3 w-3 text-yellow-500"/> Hydro</Label><Input type="number" suppressHydrationWarning value={hydro} onChange={(e) => setHydro(Number(e.target.value))} className="h-8 text-xs bg-background" /></div>
// //                                 </div>
// //                                 <div className="space-y-1 pt-1 border-t border-border">
// //                                     <Label className="text-[10px] text-muted-foreground flex items-center gap-1"><Hammer className="h-3 w-3"/> Entretien / Condo</Label>
// //                                     <Input type="number" suppressHydrationWarning value={maintenance} onChange={(e) => setMaintenance(Number(e.target.value))} className="h-8 text-xs bg-background" />
// //                                 </div>
// //                             </CardContent>
// //                         </Card>

// //                         {/* Carte 3: Accélérateur */}
// //                         <Card className="shadow-sm border-primary/20 bg-primary/5">
// //                             <CardHeader className="p-4 pb-2"><CardTitle className="text-primary text-sm flex items-center gap-2">🚀 Accélérateur</CardTitle></CardHeader>
// //                             <CardContent className="p-4 space-y-3">
// //                                 <div className="space-y-1">
// //                                     <div className="flex justify-between text-xs"><Label>Extra Mensuel</Label><span className="font-bold text-primary">+{currency.format(extraMonthly)}</span></div>
// //                                     <Slider min={0} max={2000} step={50} value={[extraMonthly]} onValueChange={(v) => setExtraMonthly(v[0])} />
// //                                 </div>
// //                                 <div className="space-y-1">
// //                                     <div className="flex justify-between text-xs"><Label>Extra Annuel</Label><span className="font-bold text-primary">+{currency.format(extraAnnual)}</span></div>
// //                                     <Slider min={0} max={20000} step={500} value={[extraAnnual]} onValueChange={(v) => setExtraAnnual(v[0])} />
// //                                 </div>
// //                             </CardContent>
// //                         </Card>

// //                         {/* Carte 4: Cash Day 1 (Info seulement) */}
// //                         <Card className="shadow-sm border-border bg-card/20">
// //                             <CardHeader className="p-4 pb-2"><CardTitle className="text-sm">Cash Requis (J-1)</CardTitle></CardHeader>
// //                             <CardContent className="p-4 space-y-1 text-xs">
// //                                 <div className="flex justify-between"><span className="text-muted-foreground">Mise de fonds</span><span>{currency.format(downPayment)}</span></div>
// //                                 <div className="flex justify-between"><span className="text-muted-foreground">Bienvenue + Notaire</span><span>{currency.format(welcomeTax + notaryFees)}</span></div>
// //                                 <div className="flex justify-between font-bold border-t pt-2 mt-2"><span>TOTAL</span><span className="text-primary text-sm">{currency.format(totalCashRequired)}</span></div>
// //                             </CardContent>
// //                         </Card>
// //                     </TabsContent>

// //                     {/* Contenu de l'onglet GUIDE (Colonne gauche vide si Guide actif pour laisser la place) */}
// //                     <TabsContent value="guide" className="p-4">
// //                         <div className="p-4 bg-muted/30 rounded-lg border border-border text-sm text-muted-foreground">
// //                             <p>Utilisez l&apos;onglet <strong>Simulateur</strong> pour configurer votre projet.</p>
// //                             <p className="mt-2">Consultez la zone de droite pour les étapes détaillées.</p>
// //                         </div>
// //                     </TabsContent>

// //                 </aside>

// //                 {/* B. ZONE PRINCIPALE DROITE (Résultats & Guide) */}
// //                 <section className="flex-1 h-full overflow-y-auto bg-background p-6 custom-scrollbar relative">
                    
// //                     {!simulation.isCompliant && (
// //                         <div className="absolute inset-0 z-50 flex items-start justify-center pt-20 backdrop-blur-md bg-background/50 h-full w-full">
// //                             <div className="bg-card border border-destructive shadow-2xl p-6 rounded-xl max-w-sm text-center space-y-3">
// //                                 <Lock className="h-8 w-8 text-destructive mx-auto" />
// //                                 <h3 className="text-lg font-bold text-destructive">Financement Impossible</h3>
// //                                 <p className="text-sm text-muted-foreground">{simulation.complianceError}</p>
// //                             </div>
// //                         </div>
// //                     )}

// //                     <TabsContent value="simulator" className={`space-y-6 max-w-6xl mx-auto mt-0 h-full ${!simulation.isCompliant ? "opacity-20 blur-sm pointer-events-none" : ""}`}>
                        
// //                         {/* 1. KPIs (6 Cartes alignées - Tous les résultats importants sont ici) */}
// //                         <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
// //                             {/* A. BUDGET */}
// //                             <Card className="bg-primary/10 border-primary/30 shadow-sm col-span-2 sm:col-span-1 xl:col-span-1">
// //                                 <CardHeader className="p-3 pb-1"><CardTitle className="text-[10px] font-bold text-primary uppercase tracking-wider">Budget Mensuel</CardTitle></CardHeader>
// //                                 <CardContent className="p-3 pt-0">
// //                                     <div className="text-xl font-bold text-primary">{currency.format(totalMonthlyOutPocket)}</div>
// //                                     <p className="text-[10px] opacity-70">Tout inclus</p>
// //                                 </CardContent>
// //                             </Card>

// //                             {/* B. REVENU REQUIS (Déplacé ici) */}
// //                             <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200/50 shadow-sm">
// //                                 <CardHeader className="p-3 pb-1"><CardTitle className="text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">Revenu Requis</CardTitle></CardHeader>
// //                                 <CardContent className="p-3 pt-0">
// //                                     <div className="text-xl font-bold text-blue-900 dark:text-blue-100">{currency.format((totalMonthlyOutPocket * 12) / 0.32)}</div>
// //                                     <p className="text-[10px] opacity-70">Brut/An</p>
// //                                 </CardContent>
// //                             </Card>

// //                             {/* C. RICHESSE 5 ANS (Déplacé ici) */}
// //                             <Card className="bg-green-50/50 dark:bg-green-950/20 border-green-200/50 shadow-sm">
// //                                 <CardHeader className="p-3 pb-1"><CardTitle className="text-[10px] font-bold text-green-700 dark:text-green-400 uppercase tracking-wider">Net (5 ans)</CardTitle></CardHeader>
// //                                 <CardContent className="p-3 pt-0">
// //                                     <div className="text-xl font-bold text-green-700 dark:text-green-400">{currency.format(stats5Years.equity)}</div>
// //                                     <p className="text-[10px] opacity-70">Patrimoine</p>
// //                                 </CardContent>
// //                             </Card>

// //                             {/* D. INTÉRÊTS */}
// //                             <Card className="shadow-sm">
// //                                 <CardHeader className="p-3 pb-1"><CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Coût Intérêts</CardTitle></CardHeader>
// //                                 <CardContent className="p-3 pt-0"><div className="text-lg font-bold text-orange-500">{currency.format(simulation.totalInterestPaid)}</div></CardContent>
// //                             </Card>

// //                             {/* E. ÉCONOMIES */}
// //                             <Card className="shadow-sm">
// //                                 <CardHeader className="p-3 pb-1"><CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Économies</CardTitle></CardHeader>
// //                                 <CardContent className="p-3 pt-0"><div className="text-lg font-bold text-green-500">{currency.format(simulation.interestSaved)}</div></CardContent>
// //                             </Card>

// //                             {/* F. DURÉE */}
// //                             <Card className="shadow-sm">
// //                                 <CardHeader className="p-3 pb-1"><CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Durée Réelle</CardTitle></CardHeader>
// //                                 <CardContent className="p-3 pt-0"><div className="text-lg font-bold">{Math.floor(simulation.actualDurationMonths / 12)}a {simulation.actualDurationMonths % 12}m</div></CardContent>
// //                             </Card>
// //                         </div>

// //                         {/* 2. GRAPHIQUE */}
// //                         <Card className="shadow-lg border-border overflow-hidden">
// //                             <CardHeader className="p-4 pb-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b bg-card/30">
// //                                 <div>
// //                                     <CardTitle className="text-base">Analyse Financière</CardTitle>
// //                                     <div className="flex items-center gap-4 mt-1 h-6">
// //                                         <p className="text-xs text-muted-foreground">
// //                                             {chartView === 'evolution' && "Amortissement de la dette"}
// //                                             {chartView === 'distribution' && "Répartition des coûts"}
// //                                             {chartView === 'networth' && "Projection Patrimoine"}
// //                                         </p>
                                        
// //                                         {/* SLIDER CONTEXTUEL DANS LE HEADER */}
// //                                         {chartView === 'networth' && (
// //                                             <div className="flex items-center gap-2 bg-background px-2 py-0.5 rounded-full border shadow-sm animate-in fade-in slide-in-from-left-4">
// //                                                 <span className="text-[10px] font-semibold text-muted-foreground">Appréciation:</span>
// //                                                 <span className="text-xs font-bold text-green-600">+{appreciation}%</span>
// //                                                 <Slider className="w-20" min={0} max={8} step={0.5} value={[appreciation]} onValueChange={(v) => setAppreciation(v[0])} />
// //                                             </div>
// //                                         )}
// //                                     </div>
// //                                 </div>
// //                                 <div className="flex bg-muted p-1 rounded-lg shrink-0">
// //                                     <button onClick={() => setChartView('evolution')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartView === 'evolution' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}><TrendingUp className="h-3 w-3 inline mr-1"/> Dette</button>
// //                                     <button onClick={() => setChartView('networth')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartView === 'networth' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}><LineChart className="h-3 w-3 inline mr-1"/> Patrimoine</button>
// //                                     <button onClick={() => setChartView('distribution')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartView === 'distribution' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}><PieIcon className="h-3 w-3 inline mr-1"/> Global</button>
// //                                 </div>
// //                             </CardHeader>
// //                             <CardContent className="p-4 h-[350px]">
// //                                 <ResponsiveContainer width="100%" height="100%">
// //                                     {chartView === 'evolution' ? (
// //                                         <ComposedChart data={simulation.schedule} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
// //                                             <defs>
// //                                             <linearGradient id="colorRent" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--destructive)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--destructive)" stopOpacity={0}/></linearGradient>
// //                                             <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient>
// //                                             </defs>
// //                                             <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} stroke="var(--border)" />
// //                                             <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} minTickGap={30} />
// //                                             <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} width={40} />
// //                                             <Tooltip formatter={(value: number) => currency.format(value)} labelFormatter={(label) => `Mois ${label}`} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '13px' }} />
// //                                             <Legend verticalAlign="top" height={36} wrapperStyle={{top: -10}} />
// //                                             <Area type="monotone" dataKey="rentPayment" name="Intérêts" stroke="var(--destructive)" fillOpacity={1} fill="url(#colorRent)" stackId="1" />
// //                                             <Area type="monotone" dataKey="principalPayment" name="Capital Remboursé" stroke="var(--primary)" fillOpacity={1} fill="url(#colorPrincipal)" stackId="1" />
// //                                         </ComposedChart>
// //                                     ) : chartView === 'networth' ? (
// //                                         <ComposedChart data={enrichedSchedule} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
// //                                             <defs>
// //                                                 <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient>
// //                                                 <linearGradient id="colorDebt" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#64748b" stopOpacity={0.8}/><stop offset="95%" stopColor="#64748b" stopOpacity={0}/></linearGradient>
// //                                             </defs>
// //                                             <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} stroke="var(--border)" />
// //                                             <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} minTickGap={30} />
// //                                             <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} width={40} />
// //                                             <Tooltip formatter={(value: number) => currency.format(value)} labelFormatter={(label) => `Mois ${label}`} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '13px' }} />
// //                                             <Legend verticalAlign="top" height={36} wrapperStyle={{top: -10}} />
// //                                             <Area type="monotone" dataKey="houseValue" name="Valeur Maison" stroke="#22c55e" fillOpacity={0.1} fill="url(#colorNet)" stackId="2" />
// //                                             <Area type="monotone" dataKey="remainingBankBalance" name="Dette Restante" stroke="#64748b" fillOpacity={0.3} fill="url(#colorDebt)" stackId="3" />
// //                                             <Line type="monotone" dataKey="netEquity" name="Équité Nette" stroke="#16a34a" strokeWidth={3} dot={false} />
// //                                         </ComposedChart>
// //                                     ) : (
// //                                         <PieChart>
// //                                             <Pie data={pieData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
// //                                                 {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />))}
// //                                             </Pie>
// //                                             <Tooltip formatter={(value: number) => currency.format(value)} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '13px' }} />
// //                                             <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
// //                                         </PieChart>
// //                                     )}
// //                                 </ResponsiveContainer>
// //                             </CardContent>
// //                         </Card>

// //                         {/* 3. TABLEAU */}
// //                         <Card className="shadow-lg border-border overflow-hidden">
// //                             <div className="flex items-center justify-between p-4 border-b bg-muted/20">
// //                                 <div className="flex items-center gap-2"><CardTitle className="text-base">Tableau détaillé</CardTitle><Badge variant="outline" className="text-[10px] font-normal">{simulation.schedule.length} mois</Badge></div>
// //                                 <Button variant="outline" size="sm" onClick={handleExportCSV} className="h-8 text-xs gap-2"><Download className="h-3.5 w-3.5" /> Exporter CSV</Button>
// //                             </div>
// //                             <div className="max-h-[500px] overflow-auto">
// //                                 <Table>
// //                                     <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
// //                                         <TableRow>
// //                                             <TableHead className="w-[80px]">Mois</TableHead>
// //                                             <TableHead>Loyer</TableHead>
// //                                             <TableHead>Capital</TableHead>
// //                                             <TableHead>Total</TableHead>
// //                                             <TableHead className="text-right">Solde</TableHead>
// //                                         </TableRow>
// //                                     </TableHeader>
// //                                     <TableBody>
// //                                         {simulation.schedule.map((row) => (
// //                                             <TableRow key={row.month} className="hover:bg-muted/50">
// //                                                 <TableCell className="font-medium text-muted-foreground">{row.month}</TableCell>
// //                                                 <TableCell className="text-orange-500">{currency.format(row.rentPayment)}</TableCell>
// //                                                 <TableCell className="text-primary font-medium">{currency.format(row.principalPayment)}</TableCell>
// //                                                 <TableCell>{currency.format(row.totalPayment)}</TableCell>
// //                                                 <TableCell className="text-right text-muted-foreground">{currency.format(row.remainingBankBalance)}</TableCell>
// //                                             </TableRow>
// //                                         ))}
// //                                     </TableBody>
// //                                 </Table>
// //                             </div>
// //                         </Card>
// //                     </TabsContent>

// //                     <TabsContent value="guide" className="max-w-4xl mx-auto mt-0 p-4">
// //                         <Card className="shadow-lg border-border">
// //                             <CardHeader>
// //                                 <CardTitle className="text-2xl">Parcours d&apos;acquisition Qurtuba</CardTitle>
// //                                 <p className="text-muted-foreground">Les 5 étapes clés pour devenir propriétaire, expliquées simplement.</p>
// //                             </CardHeader>
// //                             <CardContent className="space-y-8 p-8">
// //                                 <div className="flex gap-4">
// //                                     <div className="flex flex-col items-center">
// //                                         <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
// //                                         <div className="w-0.5 h-full bg-border mt-2"></div>
// //                                     </div>
// //                                     <div className="pb-8">
// //                                         <h3 className="text-lg font-bold">Devenir Membre</h3>
// //                                         <p className="text-muted-foreground mt-1">Remplir le formulaire, payer les frais d&apos;adhésion (75$) et acheter vos premières parts sociales (min. 2000$).</p>
// //                                     </div>
// //                                 </div>
// //                                 <div className="flex gap-4">
// //                                     <div className="flex flex-col items-center">
// //                                         <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${downPayment >= qurtubaThreshold ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}`}>2</div>
// //                                         <div className="w-0.5 h-full bg-border mt-2"></div>
// //                                     </div>
// //                                     <div className="pb-8">
// //                                         <h3 className="text-lg font-bold">L&apos;Objectif 60 000 $</h3>
// //                                         <p className="text-muted-foreground mt-1">Vous devez accumuler 60 000 $ de parts pour être inscrit sur la <strong>liste d&apos;attente prioritaire</strong>. C&apos;est votre apport initial.</p>
// //                                     </div>
// //                                 </div>
// //                                 {/* ... Autres étapes du guide identiques à la V13 ... */}
// //                                 <div className="flex gap-4">
// //                                     <div className="flex flex-col items-center">
// //                                         <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">3</div>
// //                                         <div className="w-0.5 h-full bg-border mt-2"></div>
// //                                     </div>
// //                                     <div className="pb-8">
// //                                         <h3 className="text-lg font-bold">Lettre d&apos;autorisation</h3>
// //                                         <p className="text-muted-foreground mt-1">Quand c&apos;est votre tour, Qurtuba vous envoie une lettre officielle. Vous avez alors <strong>3 mois</strong> pour trouver une maison.</p>
// //                                     </div>
// //                                 </div>
// //                                 <div className="flex gap-4">
// //                                     <div className="flex flex-col items-center">
// //                                         <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">4</div>
// //                                         <div className="w-0.5 h-full bg-border mt-2"></div>
// //                                     </div>
// //                                     <div className="pb-8">
// //                                         <h3 className="text-lg font-bold">Offre d&apos;achat & Inspection</h3>
// //                                         <p className="text-muted-foreground mt-1">Vous faites une offre au nom de &quot;Coopérative Qurtuba&quot;. Une fois acceptée, l&apos;inspection est <strong>obligatoire</strong>.</p>
// //                                     </div>
// //                                 </div>
// //                                 <div className="flex gap-4">
// //                                     <div className="flex flex-col items-center">
// //                                         <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold"><HomeIcon className="h-5 w-5"/></div>
// //                                     </div>
// //                                     <div>
// //                                         <h3 className="text-lg font-bold">Notaire & Emménagement</h3>
// //                                         <p className="text-muted-foreground mt-1">Qurtuba désigne le notaire. Vous apportez le reste de votre mise de fonds (si &gt; 60k) et payez les frais de démarrage (Taxe bienvenue, etc.).</p>
// //                                     </div>
// //                                 </div>
// //                             </CardContent>
// //                         </Card>
// //                     </TabsContent>

// //                 </section>
// //             </div>
// //           </Tabs>
// //       </div>
// //     </main>
// //   );
// // }

// "use client";

// import { useState, useMemo, useEffect } from "react";
// import { QurtubaSimulator, SimulationResult } from "@/lib/qurtuba-logic";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Slider } from "@/components/ui/slider";
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, Line, ComposedChart } from 'recharts';
// import { ModeToggle } from "@/components/mode-toggle";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Lock, Download, Zap, Wallet, PieChart as PieIcon, TrendingUp, Home as HomeIcon, Hammer, PiggyBank, LineChart, Settings2, X } from "lucide-react"

// export default function Home() {
//   const [price, setPrice] = useState(500000);
//   const [downPayment, setDownPayment] = useState(60000);
//   const [durationYears, setDurationYears] = useState(25);
//   const [extraMonthly, setExtraMonthly] = useState(0);
//   const [extraAnnual, setExtraAnnual] = useState(0);
  
//   // CHARGES & PARAMÈTRES
//   const [municipalTax, setMunicipalTax] = useState(3000);
//   const [schoolTax, setSchoolTax] = useState(350);
//   const [insurance, setInsurance] = useState(1200);
//   const [hydro, setHydro] = useState(1800);
//   const [maintenance, setMaintenance] = useState(2400); 
//   const [appreciation, setAppreciation] = useState(3);
  
//   // UI STATES
//   const [chartView, setChartView] = useState<'evolution' | 'distribution' | 'networth'>('evolution');
//   const [showMobileConfig, setShowMobileConfig] = useState(false); // NOUVEAU: Pour gérer le menu mobile
  
//   const rate = 5.5; 

//   const { simulation, welcomeTax, notaryFees, startupFees } = useMemo(() => {
//     const sim = new QurtubaSimulator(price, downPayment, rate, durationYears, extraMonthly, extraAnnual);
//     return {
//         simulation: sim.generateSchedule(),
//         welcomeTax: sim.calculateWelcomeTax(),
//         notaryFees: sim.calculateNotaryFees(),
//         startupFees: sim.calculateStartupFees()
//     };
//   }, [price, downPayment, durationYears, extraMonthly, extraAnnual]);

//   const enrichedSchedule = useMemo(() => {
//       let currentHouseValue = price;
//       const monthlyAppreciationRate = appreciation / 100 / 12;
//       const result = [];
//       for (const row of simulation.schedule) {
//           currentHouseValue = currentHouseValue * (1 + monthlyAppreciationRate);
//           result.push({
//               ...row,
//               houseValue: currentHouseValue,
//               netEquity: currentHouseValue - row.remainingBankBalance
//           });
//       }
//       return result;
//   }, [simulation.schedule, price, appreciation]);

//   const currency = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

//   const totalCashRequired = downPayment + welcomeTax + notaryFees + startupFees;
//   const monthlyCharges = (municipalTax + schoolTax + insurance + hydro + maintenance) / 12;
//   const paymentQurtuba = simulation.monthlyPaymentFixed + extraMonthly;
//   const totalMonthlyOutPocket = paymentQurtuba + monthlyCharges;

//   const getWealthAtYear = (year: number) => {
//       if (!simulation.schedule || simulation.schedule.length === 0) return { value: 0, debt: 0, equity: 0 };
//       const monthIndex = Math.min(year * 12, simulation.schedule.length) - 1;
//       const row = monthIndex >= 0 ? simulation.schedule[monthIndex] : { remainingBankBalance: price - downPayment };
//       const futureValue = price * Math.pow(1 + (appreciation/100), year);
//       const debt = row.remainingBankBalance;
//       return { value: futureValue, debt: debt, equity: futureValue - debt };
//   };

//   const stats5Years = getWealthAtYear(5);

//   const totalChargesOverDuration = monthlyCharges * simulation.actualDurationMonths;
//   const pieData = [
//     { name: 'Capital', value: price, color: 'hsl(var(--primary))' },
//     { name: 'Intérêts', value: simulation.totalInterestPaid, color: '#f97316' }, 
//     { name: 'Charges', value: totalChargesOverDuration, color: '#64748b' }, 
//   ];

//   const qurtubaThreshold = 60000;
//   const progressValue = Math.min(100, (downPayment / qurtubaThreshold) * 100);

//   const handleExportCSV = () => {
//     if (!enrichedSchedule || enrichedSchedule.length === 0) return;
//     const headers = ["Mois,Loyer,Capital,Paiement,Solde,ValeurMaison,EquiteNette"];
//     const rows = enrichedSchedule.map(r => `${r.month},${r.rentPayment.toFixed(2)},${r.principalPayment.toFixed(2)},${r.totalPayment.toFixed(2)},${r.remainingBankBalance.toFixed(2)},${r.houseValue.toFixed(2)},${r.netEquity.toFixed(2)}`);
//     const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "simulation_qurtuba_complete.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <main className="flex flex-col h-screen w-full bg-background font-sans overflow-hidden">
      
//       {/* 1. HEADER (Fixe) */}
//       <header className="h-14 shrink-0 border-b border-border bg-card/50 backdrop-blur-sm z-50 flex items-center justify-between px-4 lg:px-6">
//           <div className="flex items-center gap-2 lg:gap-3">
//             <h1 className="text-lg font-bold tracking-tight text-foreground truncate">
//               Simulateur <span className="text-primary">Qurtuba</span>
//             </h1>
//             <Badge variant="secondary" className="text-[10px] font-normal hidden sm:inline-flex">Mobile Ready</Badge>
//           </div>
//           <div className="flex items-center gap-2">
//              {!simulation.isCompliant && <Badge variant="destructive" className="animate-pulse text-[10px]">Erreur</Badge>}
//             <ModeToggle />
//           </div>
//       </header>

//       {/* 2. CORPS DE L'APPLICATION */}
//       <div className="flex flex-1 overflow-hidden relative">
          
//           {/* A. SIDEBAR (RESPONSIVE : Cachée sur mobile, visible sur Desktop) */}
//           {/* Sur mobile, devient un Overlay plein écran si showMobileConfig est true */}
//           <aside className={`
//             flex-col bg-card/20 overflow-y-auto custom-scrollbar transition-all duration-300
//             lg:w-[400px] lg:border-r lg:border-border lg:static lg:flex
//             ${showMobileConfig ? 'fixed inset-0 z-[100] w-full bg-background p-0 flex' : 'hidden'}
//           `}>
            
//             {/* Header Mobile du menu Config */}
//             <div className="lg:hidden flex justify-between items-center p-4 border-b bg-background sticky top-0 z-10">
//                 <h2 className="text-lg font-bold">Configuration</h2>
//                 <Button variant="ghost" size="icon" onClick={() => setShowMobileConfig(false)}>
//                     <X className="h-6 w-6" />
//                 </Button>
//             </div>

//             {/* Contenu scrollable du menu config */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-4 lg:p-4">
//                 {/* Carte 1: Financement */}
//                 <Card className={`shadow-sm border-border ${!simulation.isCompliant ? "border-destructive/50 ring-1 ring-destructive/20" : ""}`}>
//                     <CardHeader className="p-4 pb-2"><CardTitle className="text-sm font-semibold">1. Financement</CardTitle></CardHeader>
//                     <CardContent className="p-4 space-y-6">
//                         <div className="space-y-2">
//                             <div className="flex justify-between"><Label className="text-xs">Prix maison</Label><span className="font-bold text-sm text-primary">{currency.format(price)}</span></div>
//                             <Slider min={100000} max={1500000} step={5000} value={[price]} onValueChange={(v) => setPrice(v[0])} />
//                         </div>
//                         <div className="space-y-2">
//                             <div className="flex justify-between">
//                                 <Label className={`text-xs ${!simulation.isCompliant ? "text-destructive" : ""}`}>Apport</Label>
//                                 <span className={`font-bold text-sm ${!simulation.isCompliant ? "text-destructive" : "text-green-500"}`}>{currency.format(downPayment)}</span>
//                             </div>
//                             <Slider min={0} max={price} step={1000} value={[downPayment]} onValueChange={(v) => setDownPayment(v[0])} />
                            
//                             {/* Jauge intégrée */}
//                             <div className="pt-1">
//                                 <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
//                                     <span>Priorité ({currency.format(qurtubaThreshold)})</span>
//                                     <span className={progressValue >= 100 ? "text-green-600 font-bold" : ""}>{Math.round(progressValue)}%</span>
//                                 </div>
//                                 <Progress value={progressValue} className="h-1.5" />
//                                 {!simulation.isCompliant && <div className="flex justify-end mt-1 text-destructive text-[10px] font-bold">Min requis: {currency.format(simulation.minDownPaymentRequired)}</div>}
//                             </div>
//                         </div>
//                         <div className="space-y-2">
//                             <div className="flex justify-between"><Label className="text-xs">Durée</Label><span className="font-bold text-sm">{durationYears} ans</span></div>
//                             <Slider min={1} max={30} step={1} value={[durationYears]} onValueChange={(v) => setDurationYears(v[0])} />
//                         </div>
//                     </CardContent>
//                 </Card>

//                 {/* Carte 2: Charges */}
//                 <Card className="shadow-sm border-border bg-card/40">
//                     <CardHeader className="p-4 pb-2"><CardTitle className="text-sm font-semibold">2. Charges Annuelles</CardTitle></CardHeader>
//                     <CardContent className="p-4 space-y-4">
//                         <div className="grid grid-cols-2 gap-3">
//                             <div className="space-y-1"><Label className="text-[10px] text-muted-foreground">Municipale</Label><Input type="number" suppressHydrationWarning value={municipalTax} onChange={(e) => setMunicipalTax(Number(e.target.value))} className="h-8 text-xs bg-background" /></div>
//                             <div className="space-y-1"><Label className="text-[10px] text-muted-foreground">Scolaire</Label><Input type="number" suppressHydrationWarning value={schoolTax} onChange={(e) => setSchoolTax(Number(e.target.value))} className="h-8 text-xs bg-background" /></div>
//                         </div>
//                         <div className="grid grid-cols-2 gap-3">
//                             <div className="space-y-1"><Label className="text-[10px] text-muted-foreground">Assurance</Label><Input type="number" suppressHydrationWarning value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} className="h-8 text-xs bg-background" /></div>
//                             <div className="space-y-1"><Label className="text-[10px] text-muted-foreground flex items-center gap-1"><Zap className="h-3 w-3 text-yellow-500"/> Hydro</Label><Input type="number" suppressHydrationWarning value={hydro} onChange={(e) => setHydro(Number(e.target.value))} className="h-8 text-xs bg-background" /></div>
//                         </div>
//                         <div className="space-y-1 pt-1 border-t border-border">
//                             <Label className="text-[10px] text-muted-foreground flex items-center gap-1"><Hammer className="h-3 w-3"/> Entretien / Condo</Label>
//                             <Input type="number" suppressHydrationWarning value={maintenance} onChange={(e) => setMaintenance(Number(e.target.value))} className="h-8 text-xs bg-background" />
//                         </div>
//                     </CardContent>
//                 </Card>

//                 {/* Carte 3: Accélérateur */}
//                 <Card className="shadow-sm border-primary/20 bg-primary/5">
//                     <CardHeader className="p-4 pb-2"><CardTitle className="text-primary text-sm flex items-center gap-2">🚀 Accélérateur</CardTitle></CardHeader>
//                     <CardContent className="p-4 space-y-4">
//                         <div className="space-y-1">
//                             <div className="flex justify-between text-xs"><Label>Extra Mensuel</Label><span className="font-bold text-primary">+{currency.format(extraMonthly)}</span></div>
//                             <Slider min={0} max={2000} step={50} value={[extraMonthly]} onValueChange={(v) => setExtraMonthly(v[0])} />
//                         </div>
//                         <div className="space-y-1">
//                             <div className="flex justify-between text-xs"><Label>Extra Annuel</Label><span className="font-bold text-primary">+{currency.format(extraAnnual)}</span></div>
//                             <Slider min={0} max={20000} step={500} value={[extraAnnual]} onValueChange={(v) => setExtraAnnual(v[0])} />
//                         </div>
//                     </CardContent>
//                 </Card>

//                 <div className="h-20 lg:hidden"></div> {/* Spacer pour le scroll mobile */}
//             </div>

//             {/* BOUTON FERMER SUR MOBILE (Bas de page fixe dans le menu) */}
//             <div className="lg:hidden absolute bottom-0 left-0 w-full p-4 border-t bg-background z-20">
//                 <Button className="w-full" size="lg" onClick={() => setShowMobileConfig(false)}>
//                     Voir les résultats ({currency.format(totalMonthlyOutPocket)}/mois)
//                 </Button>
//             </div>
//           </aside>

//           {/* B. ZONE PRINCIPALE (Résultats) */}
//           <section className="flex-1 h-full overflow-y-auto bg-background p-4 lg:p-6 custom-scrollbar relative">
            
//             {/* BOUTON FLOTTANT "CONFIGURER" (MOBILE SEULEMENT) */}
//             <div className="fixed bottom-6 right-6 lg:hidden z-40">
//                 <Button onClick={() => setShowMobileConfig(true)} size="lg" className="rounded-full shadow-xl px-6 h-14 font-bold animate-in fade-in zoom-in">
//                     <Settings2 className="mr-2 h-5 w-5" /> Configurer
//                 </Button>
//             </div>

//             <Tabs defaultValue="simulator" className="space-y-6 max-w-6xl mx-auto mt-0 h-full">
                
//                 {/* Navigation Onglets */}
//                 <div className="flex justify-center">
//                     <TabsList className="grid w-full max-w-md grid-cols-2">
//                         <TabsTrigger value="simulator">Résultats</TabsTrigger>
//                         <TabsTrigger value="guide">Guide</TabsTrigger>
//                     </TabsList>
//                 </div>

//                 <TabsContent value="simulator" className="space-y-6 mt-4 pb-20 lg:pb-0">
                    
//                     {/* OVERLAY ERREUR */}
//                     {!simulation.isCompliant && (
//                         <div className="rounded-xl border border-destructive bg-destructive/10 p-4 text-center">
//                             <h3 className="font-bold text-destructive flex items-center justify-center gap-2"><Lock className="h-4 w-4"/> Financement Impossible</h3>
//                             <p className="text-xs text-muted-foreground mt-1">{simulation.complianceError}</p>
//                         </div>
//                     )}

//                     <div className={`space-y-6 transition-all duration-300 ${!simulation.isCompliant ? "opacity-50 grayscale" : ""}`}>
                        
//                         {/* 1. KPIs */}
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                             {/* A. BUDGET */}
//                             <Card className="bg-primary/10 border-primary/30 shadow-md">
//                                 <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-primary uppercase tracking-wider">Budget Mensuel</CardTitle></CardHeader>
//                                 <CardContent className="p-4 pt-1">
//                                     <div className="text-3xl font-bold text-primary">{currency.format(totalMonthlyOutPocket)}</div>
//                                     <div className="flex flex-wrap gap-2 mt-2">
//                                         <Badge variant="outline" className="text-[10px] bg-background/50 border-primary/30 text-primary">Qurtuba: {currency.format(paymentQurtuba)}</Badge>
//                                         <Badge variant="outline" className="text-[10px] bg-background/50 border-slate-500/30 text-slate-600">Charges: {currency.format(monthlyCharges)}</Badge>
//                                     </div>
//                                 </CardContent>
//                             </Card>

//                             {/* B. REVENU */}
//                             <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200/50 shadow-sm">
//                                 <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">Revenu Requis</CardTitle></CardHeader>
//                                 <CardContent className="p-4 pt-1">
//                                     <div className="text-xl font-bold text-blue-900 dark:text-blue-100">{currency.format((totalMonthlyOutPocket * 12) / 0.32)}</div>
//                                     <p className="text-[10px] opacity-70">Brut/An (Ratio 32%)</p>
//                                 </CardContent>
//                             </Card>

//                             {/* C. RICHESSE */}
//                             <Card className="bg-green-50/50 dark:bg-green-950/20 border-green-200/50 shadow-sm">
//                                 <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wider">Net (5 ans)</CardTitle></CardHeader>
//                                 <CardContent className="p-4 pt-1">
//                                     <div className="text-xl font-bold text-green-700 dark:text-green-400">{currency.format(stats5Years.equity)}</div>
//                                     <p className="text-[10px] opacity-70">Patrimoine accumulé</p>
//                                 </CardContent>
//                             </Card>

//                             {/* D. CASH DAY 1 */}
//                             <Card className="shadow-sm border-border bg-card/50">
//                                 <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Cash Requis (J-1)</CardTitle></CardHeader>
//                                 <CardContent className="p-4 pt-1">
//                                     <div className="text-xl font-bold">{currency.format(totalCashRequired)}</div>
//                                     <p className="text-[10px] text-muted-foreground">Apport + Frais</p>
//                                 </CardContent>
//                             </Card>
//                         </div>

//                         {/* 2. GRAPHIQUE */}
//                         <Card className="shadow-lg border-border overflow-hidden">
//                             <CardHeader className="p-4 pb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b bg-card/30">
//                                 <div>
//                                     <CardTitle className="text-base">Analyse Financière</CardTitle>
//                                 </div>
//                                 <div className="flex bg-muted p-1 rounded-lg w-full sm:w-auto overflow-x-auto">
//                                     <button onClick={() => setChartView('evolution')} className={`flex-1 sm:flex-none px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-all ${chartView === 'evolution' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}>Dette</button>
//                                     <button onClick={() => setChartView('networth')} className={`flex-1 sm:flex-none px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-all ${chartView === 'networth' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}>Patrimoine</button>
//                                     <button onClick={() => setChartView('distribution')} className={`flex-1 sm:flex-none px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-all ${chartView === 'distribution' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}>Global</button>
//                                 </div>
//                             </CardHeader>
//                             <CardContent className="p-2 sm:p-4 h-[300px] sm:h-[400px]">
//                                 <ResponsiveContainer width="100%" height="100%">
//                                     {chartView === 'evolution' ? (
//                                         <ComposedChart data={simulation.schedule} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
//                                             <defs>
//                                             <linearGradient id="colorRent" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--destructive)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--destructive)" stopOpacity={0}/></linearGradient>
//                                             <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient>
//                                             </defs>
//                                             <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} stroke="var(--border)" />
//                                             <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} minTickGap={30} />
//                                             <YAxis stroke="var(--muted-foreground)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} width={35} />
//                                             <Tooltip formatter={(value: number) => currency.format(value)} labelFormatter={(label) => `Mois ${label}`} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '12px' }} />
//                                             <Legend verticalAlign="top" height={36} wrapperStyle={{top: -10}} iconSize={10} fontSize={12} />
//                                             <Area type="monotone" dataKey="rentPayment" name="Intérêts" stroke="var(--destructive)" fillOpacity={1} fill="url(#colorRent)" stackId="1" />
//                                             <Area type="monotone" dataKey="principalPayment" name="Capital" stroke="var(--primary)" fillOpacity={1} fill="url(#colorPrincipal)" stackId="1" />
//                                         </ComposedChart>
//                                     ) : chartView === 'networth' ? (
//                                         <ComposedChart data={enrichedSchedule} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
//                                             <defs>
//                                                 <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient>
//                                                 <linearGradient id="colorDebt" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#64748b" stopOpacity={0.8}/><stop offset="95%" stopColor="#64748b" stopOpacity={0}/></linearGradient>
//                                             </defs>
//                                             <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} stroke="var(--border)" />
//                                             <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} minTickGap={30} />
//                                             <YAxis stroke="var(--muted-foreground)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} width={35} />
//                                             <Tooltip formatter={(value: number) => currency.format(value)} labelFormatter={(label) => `Mois ${label}`} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '12px' }} />
//                                             <Legend verticalAlign="top" height={36} wrapperStyle={{top: -10}} iconSize={10} />
//                                             <Area type="monotone" dataKey="houseValue" name="Valeur Maison" stroke="#22c55e" fillOpacity={0.1} fill="url(#colorNet)" stackId="2" />
//                                             <Area type="monotone" dataKey="remainingBankBalance" name="Dette" stroke="#64748b" fillOpacity={0.3} fill="url(#colorDebt)" stackId="3" />
//                                             <Line type="monotone" dataKey="netEquity" name="Équité Nette" stroke="#16a34a" strokeWidth={3} dot={false} />
//                                         </ComposedChart>
//                                     ) : (
//                                         <PieChart>
//                                             <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
//                                                 {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />))}
//                                             </Pie>
//                                             <Tooltip formatter={(value: number) => currency.format(value)} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '12px' }} />
//                                             <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
//                                         </PieChart>
//                                     )}
//                                 </ResponsiveContainer>
//                             </CardContent>
//                         </Card>

//                         {/* 3. TABLEAU */}
//                         <Card className="shadow-lg border-border overflow-hidden">
//                             <div className="flex items-center justify-between p-4 border-b bg-muted/20">
//                                 <div className="flex items-center gap-2"><CardTitle className="text-sm">Tableau détaillé</CardTitle><Badge variant="outline" className="text-[10px] font-normal">{simulation.schedule.length} mois</Badge></div>
//                                 <Button variant="outline" size="sm" onClick={handleExportCSV} className="h-8 text-xs gap-2"><Download className="h-3.5 w-3.5" /> CSV</Button>
//                             </div>
//                             <div className="max-h-[400px] overflow-auto">
//                                 <Table>
//                                     <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
//                                         <TableRow>
//                                             <TableHead className="w-[60px] text-xs">Mois</TableHead>
//                                             <TableHead className="text-xs">Loyer</TableHead>
//                                             <TableHead className="text-xs">Capital</TableHead>
//                                             <TableHead className="text-xs">Total</TableHead>
//                                             <TableHead className="text-xs text-right">Solde</TableHead>
//                                         </TableRow>
//                                     </TableHeader>
//                                     <TableBody>
//                                         {simulation.schedule.map((row) => (
//                                             <TableRow key={row.month} className="hover:bg-muted/50">
//                                                 <TableCell className="text-xs font-medium text-muted-foreground">{row.month}</TableCell>
//                                                 <TableCell className="text-xs text-orange-500">{currency.format(row.rentPayment)}</TableCell>
//                                                 <TableCell className="text-xs text-primary font-medium">{currency.format(row.principalPayment)}</TableCell>
//                                                 <TableCell className="text-xs">{currency.format(row.totalPayment)}</TableCell>
//                                                 <TableCell className="text-xs text-right text-muted-foreground">{currency.format(row.remainingBankBalance)}</TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </div>
//                         </Card>
//                     </div>
//                 </TabsContent>

//                 <TabsContent value="guide" className="max-w-4xl mx-auto mt-0 pb-20">
//                     <Card className="shadow-lg border-border">
//                         <CardHeader>
//                             <CardTitle className="text-xl lg:text-2xl">Guide Qurtuba</CardTitle>
//                             <p className="text-sm text-muted-foreground">Les 5 étapes clés pour devenir propriétaire.</p>
//                         </CardHeader>
//                         <CardContent className="space-y-8 p-6 lg:p-8">
//                             <div className="flex gap-4">
//                                 <div className="flex flex-col items-center"><div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm lg:text-base">1</div><div className="w-0.5 h-full bg-border mt-2"></div></div>
//                                 <div className="pb-6"><h3 className="text-base lg:text-lg font-bold">Devenir Membre</h3><p className="text-sm text-muted-foreground mt-1">Remplir le formulaire, payer 75$ et acheter min. 2000$ de parts.</p></div>
//                             </div>
//                             <div className="flex gap-4">
//                                 <div className="flex flex-col items-center"><div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-bold text-sm lg:text-base ${downPayment >= qurtubaThreshold ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}`}>2</div><div className="w-0.5 h-full bg-border mt-2"></div></div>
//                                 <div className="pb-6"><h3 className="text-base lg:text-lg font-bold">Objectif 60 000 $</h3><p className="text-sm text-muted-foreground mt-1">Accumuler 60k$ de parts pour la liste prioritaire.</p></div>
//                             </div>
//                             <div className="flex gap-4">
//                                 <div className="flex flex-col items-center"><div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold text-sm lg:text-base">3</div><div className="w-0.5 h-full bg-border mt-2"></div></div>
//                                 <div className="pb-6"><h3 className="text-base lg:text-lg font-bold">Autorisation</h3><p className="text-sm text-muted-foreground mt-1">Qurtuba vous autorise à chercher (validité 3 mois).</p></div>
//                             </div>
//                             <div className="flex gap-4">
//                                 <div className="flex flex-col items-center"><div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold text-sm lg:text-base">4</div><div className="w-0.5 h-full bg-border mt-2"></div></div>
//                                 <div className="pb-6"><h3 className="text-base lg:text-lg font-bold">Offre & Inspection</h3><p className="text-sm text-muted-foreground mt-1">Inspection obligatoire.</p></div>
//                             </div>
//                             <div className="flex gap-4">
//                                 <div className="flex flex-col items-center"><div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold text-sm lg:text-base"><HomeIcon className="h-4 w-4"/></div></div>
//                                 <div><h3 className="text-base lg:text-lg font-bold">Notaire</h3><p className="text-sm text-muted-foreground mt-1">Signature et emménagement.</p></div>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </TabsContent>

//             </Tabs>
//           </section>
//       </div>
//     </main>
//   );
// }

"use client";

import { useState, useMemo } from "react";
import { QurtubaSimulator } from "@/lib/qurtuba-logic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, Line, ComposedChart } from 'recharts';
import { ModeToggle } from "@/components/mode-toggle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lock, Download, Zap, Wallet, PieChart as PieIcon, TrendingUp, Home as HomeIcon, Hammer, PiggyBank, LineChart, Settings2, ChevronDown, ChevronUp } from "lucide-react"

export default function Home() {
  // --- ETATS ---
  const [price, setPrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(60000);
  const [durationYears, setDurationYears] = useState(25);
  
  // Paramètres Avancés (Cachés par défaut)
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [extraMonthly, setExtraMonthly] = useState(0);
  const [extraAnnual, setExtraAnnual] = useState(0);
  const [municipalTax, setMunicipalTax] = useState(3000);
  const [schoolTax, setSchoolTax] = useState(350);
  const [insurance, setInsurance] = useState(1200);
  const [hydro, setHydro] = useState(1800);
  const [maintenance, setMaintenance] = useState(2400); 
  const [appreciation, setAppreciation] = useState(3);
  
  const [chartView, setChartView] = useState<'evolution' | 'distribution' | 'networth'>('evolution');
  const rate = 5.5; 

  const { simulation, welcomeTax, notaryFees, startupFees } = useMemo(() => {
    const sim = new QurtubaSimulator(price, downPayment, rate, durationYears, extraMonthly, extraAnnual);
    return {
        simulation: sim.generateSchedule(),
        welcomeTax: sim.calculateWelcomeTax(),
        notaryFees: sim.calculateNotaryFees(),
        startupFees: sim.calculateStartupFees()
    };
  }, [price, downPayment, durationYears, extraMonthly, extraAnnual]);

  const enrichedSchedule = useMemo(() => {
      let currentHouseValue = price;
      const monthlyAppreciationRate = appreciation / 100 / 12;
      const result = [];
      for (const row of simulation.schedule) {
          currentHouseValue = currentHouseValue * (1 + monthlyAppreciationRate);
          result.push({
              ...row,
              houseValue: currentHouseValue,
              netEquity: currentHouseValue - row.remainingBankBalance
          });
      }
      return result;
  }, [simulation.schedule, price, appreciation]);

  const currency = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

  const totalCashRequired = downPayment + welcomeTax + notaryFees + startupFees;
  const monthlyCharges = (municipalTax + schoolTax + insurance + hydro + maintenance) / 12;
  const paymentQurtuba = simulation.monthlyPaymentFixed + extraMonthly;
  const totalMonthlyOutPocket = paymentQurtuba + monthlyCharges;

  // Calcul richesse 5 ans (mémoïsé pour éviter les recalculs inutiles)
  const stats5Years = useMemo(() => {
      if (!simulation.schedule || simulation.schedule.length === 0) return { value: 0, debt: 0, equity: 0 };
      const monthIndex = Math.min(5 * 12, simulation.schedule.length) - 1;
      const row = monthIndex >= 0 ? simulation.schedule[monthIndex] : { remainingBankBalance: price - downPayment };
      const futureValue = price * Math.pow(1 + (appreciation/100), 5);
      const debt = row.remainingBankBalance;
      return { value: futureValue, debt: debt, equity: futureValue - debt };
  }, [simulation.schedule, price, downPayment, appreciation]);

  const totalChargesOverDuration = monthlyCharges * simulation.actualDurationMonths;
  const pieData = useMemo(() => [
    { name: 'Capital', value: price, color: 'hsl(var(--primary))' },
    { name: 'Intérêts', value: simulation.totalInterestPaid, color: '#f97316' }, 
    { name: 'Charges', value: totalChargesOverDuration, color: '#64748b' }, 
  ], [price, simulation.totalInterestPaid, totalChargesOverDuration]);

  const qurtubaThreshold = 60000;
  const progressValue = Math.min(100, (downPayment / qurtubaThreshold) * 100);

  const handleExportCSV = () => {
    if (!enrichedSchedule || enrichedSchedule.length === 0) return;
    const headers = ["Mois,Loyer,Capital,Paiement,Solde,ValeurMaison,EquiteNette"];
    const rows = enrichedSchedule.map(r => `${r.month},${r.rentPayment.toFixed(2)},${r.principalPayment.toFixed(2)},${r.totalPayment.toFixed(2)},${r.remainingBankBalance.toFixed(2)},${r.houseValue.toFixed(2)},${r.netEquity.toFixed(2)}`);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "simulation_qurtuba_complete.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen w-full bg-background font-sans flex flex-col">
      
      {/* 1. TOP BAR (Navigation) */}
      <header className="h-16 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-6 lg:px-12">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg"><HomeIcon className="h-5 w-5 text-primary"/></div>
            <div>
                <h1 className="text-lg font-bold tracking-tight text-foreground leading-none">Simulateur Qurtuba</h1>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Ultimate Edition</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             {!simulation.isCompliant && <div className="hidden md:flex items-center gap-2 text-destructive text-xs font-bold bg-destructive/10 px-3 py-1 rounded-full"><Lock className="h-3 w-3"/> Non Conforme</div>}
             <ModeToggle />
          </div>
      </header>

      {/* 2. CONTROL BAR (Sticky juste sous le header) */}
      <div className="border-b border-border bg-background/95 backdrop-blur sticky top-16 z-40 shadow-sm">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-4">
              
              {/* Ligne Principale (Toujours visible) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                  
                  {/* Slider Prix */}
                  <div className="md:col-span-4 space-y-2">
                      <div className="flex justify-between"><Label className="text-xs font-semibold uppercase text-muted-foreground">Prix Propriété</Label><span className="font-bold text-primary">{currency.format(price)}</span></div>
                      <Slider min={100000} max={1500000} step={5000} value={[price]} onValueChange={(v) => setPrice(v[0])} className="py-2" />
                  </div>

                  {/* Slider Apport */}
                  <div className="md:col-span-4 space-y-2">
                      <div className="flex justify-between">
                          <Label className={`text-xs font-semibold uppercase ${!simulation.isCompliant ? "text-destructive" : "text-muted-foreground"}`}>Apport Initial</Label>
                          <span className={`font-bold ${!simulation.isCompliant ? "text-destructive" : "text-green-600"}`}>{currency.format(downPayment)}</span>
                      </div>
                      <Slider min={0} max={price} step={1000} value={[downPayment]} onValueChange={(v) => setDownPayment(v[0])} className="py-2" />
                      {/* Mini Jauge sous le slider */}
                      <div className="h-1 w-full bg-muted rounded-full overflow-hidden mt-1">
                          <div className={`h-full transition-all ${progressValue >= 100 ? "bg-green-500" : "bg-primary"}`} style={{width: `${progressValue}%`}}></div>
                      </div>
                  </div>

                  {/* Slider Durée */}
                  <div className="md:col-span-2 space-y-2">
                      <div className="flex justify-between"><Label className="text-xs font-semibold uppercase text-muted-foreground">Durée</Label><span className="font-bold">{durationYears} ans</span></div>
                      <Slider min={1} max={30} step={1} value={[durationYears]} onValueChange={(v) => setDurationYears(v[0])} className="py-2" />
                  </div>

                  {/* Bouton Toggle Avancé */}
                  <div className="md:col-span-2 flex justify-end">
                      <Button variant={showAdvanced ? "secondary" : "outline"} onClick={() => setShowAdvanced(!showAdvanced)} className="w-full md:w-auto gap-2 text-xs font-semibold">
                          <Settings2 className="h-4 w-4" />
                          {showAdvanced ? "Masquer Options" : "Options Avancées"}
                          {showAdvanced ? <ChevronUp className="h-3 w-3"/> : <ChevronDown className="h-3 w-3"/>}
                      </Button>
                  </div>
              </div>

              {/* Zone Avancée (Dépliable) */}
              {showAdvanced && (
                  <div className="mt-6 pt-6 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-8 animate-in slide-in-from-top-2 fade-in duration-200">
                      
                      {/* Bloc Charges */}
                      <div className="space-y-4">
                          <h3 className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2"><Zap className="h-3 w-3"/> Charges Annuelles</h3>
                          <div className="grid grid-cols-2 gap-3">
                              <div><Label className="text-[10px]">Municipale</Label><Input type="number" suppressHydrationWarning value={municipalTax} onChange={(e) => setMunicipalTax(Number(e.target.value))} className="h-8 text-xs"/></div>
                              <div><Label className="text-[10px]">Scolaire</Label><Input type="number" suppressHydrationWarning value={schoolTax} onChange={(e) => setSchoolTax(Number(e.target.value))} className="h-8 text-xs"/></div>
                              <div><Label className="text-[10px]">Assurance</Label><Input type="number" suppressHydrationWarning value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} className="h-8 text-xs"/></div>
                              <div><Label className="text-[10px]">Hydro</Label><Input type="number" suppressHydrationWarning value={hydro} onChange={(e) => setHydro(Number(e.target.value))} className="h-8 text-xs"/></div>
                              <div className="col-span-2"><Label className="text-[10px]">Entretien / Condo</Label><Input type="number" suppressHydrationWarning value={maintenance} onChange={(e) => setMaintenance(Number(e.target.value))} className="h-8 text-xs"/></div>
                          </div>
                      </div>

                      {/* Bloc Accélérateur */}
                      <div className="space-y-4">
                          <h3 className="text-xs font-bold uppercase text-primary flex items-center gap-2"><TrendingUp className="h-3 w-3"/> Accélérateur</h3>
                          <div className="space-y-3">
                              <div className="space-y-1"><div className="flex justify-between text-xs"><Label>Extra Mensuel</Label><span className="font-bold text-primary">+{currency.format(extraMonthly)}</span></div><Slider min={0} max={2000} step={50} value={[extraMonthly]} onValueChange={(v) => setExtraMonthly(v[0])} /></div>
                              <div className="space-y-1"><div className="flex justify-between text-xs"><Label>Extra Annuel</Label><span className="font-bold text-primary">+{currency.format(extraAnnual)}</span></div><Slider min={0} max={20000} step={500} value={[extraAnnual]} onValueChange={(v) => setExtraAnnual(v[0])} /></div>
                          </div>
                      </div>

                      {/* Bloc Cash & Appréciation */}
                      <div className="space-y-4">
                          <h3 className="text-xs font-bold uppercase text-green-600 flex items-center gap-2"><PiggyBank className="h-3 w-3"/> Investissement</h3>
                          <div className="p-3 bg-muted/30 rounded-lg text-xs space-y-2 border">
                              <div className="flex justify-between"><span>Mise de fonds</span><span>{currency.format(downPayment)}</span></div>
                              <div className="flex justify-between text-muted-foreground"><span>Frais démarrage</span><span>{currency.format(welcomeTax + notaryFees)}</span></div>
                              <div className="border-t pt-1 flex justify-between font-bold"><span>CASH REQUIS</span><span>{currency.format(totalCashRequired)}</span></div>
                          </div>
                          <div className="space-y-1">
                              <div className="flex justify-between text-xs"><Label>Appréciation Maison</Label><span className="font-bold text-green-600">+{appreciation}%</span></div>
                              <Slider min={0} max={8} step={0.5} value={[appreciation]} onValueChange={(v) => setAppreciation(v[0])} />
                          </div>
                      </div>
                  </div>
              )}
          </div>
      </div>

      {/* 3. ZONE PRINCIPALE (Scrollable) */}
      <div className="flex-1 overflow-y-auto bg-background/50 p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto space-y-8 pb-20">
              
              {/* MESSAGE ERREUR OVERLAY */}
              {!simulation.isCompliant && (
                <div className="rounded-xl border border-destructive bg-destructive/10 p-6 flex flex-col items-center justify-center text-center animate-pulse">
                    <Lock className="h-8 w-8 text-destructive mb-2" />
                    <h3 className="text-lg font-bold text-destructive">Financement Impossible</h3>
                    <p className="text-sm text-destructive/80">{simulation.complianceError}</p>
                </div>
              )}

              {/* GRILLE KPIS (4 Grandes Cartes) */}
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${!simulation.isCompliant ? "opacity-30 pointer-events-none" : ""}`}>
                  
                  {/* Carte Budget */}
                  <Card className="border-l-4 border-l-primary shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                              <div>
                                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Budget Mensuel</p>
                                  <h2 className="text-3xl font-bold text-primary mt-1">{currency.format(totalMonthlyOutPocket)}</h2>
                              </div>
                              <div className="bg-primary/10 p-2 rounded-full"><Wallet className="h-5 w-5 text-primary"/></div>
                          </div>
                          <div className="mt-4 flex gap-2">
                              <Badge variant="secondary" className="text-[10px]">Qurtuba: {currency.format(paymentQurtuba)}</Badge>
                              <Badge variant="outline" className="text-[10px] border-slate-400 text-slate-500">Charges: {currency.format(monthlyCharges)}</Badge>
                          </div>
                      </CardContent>
                  </Card>

                  {/* Carte Revenu Requis */}
                  <Card className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                              <div>
                                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Revenu Requis</p>
                                  <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">{currency.format((totalMonthlyOutPocket * 12) / 0.32)}</h2>
                              </div>
                              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full"><TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400"/></div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-4">Revenu brut familial (Ratio 32%)</p>
                      </CardContent>
                  </Card>

                  {/* Carte Richesse */}
                  <Card className="border-l-4 border-l-green-500 shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                              <div>
                                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Net dans 5 ans</p>
                                  <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">{currency.format(stats5Years.equity)}</h2>
                              </div>
                              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full"><PiggyBank className="h-5 w-5 text-green-600 dark:text-green-400"/></div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-4">Si revente (Capital + Plus-value)</p>
                      </CardContent>
                  </Card>

                  {/* Carte Durée */}
                  <Card className="border-l-4 border-l-orange-500 shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                              <div>
                                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Durée Réelle</p>
                                  <h2 className="text-3xl font-bold text-foreground mt-1">{Math.floor(simulation.actualDurationMonths / 12)}a {simulation.actualDurationMonths % 12}m</h2>
                              </div>
                              <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full"><Zap className="h-5 w-5 text-orange-500"/></div>
                          </div>
                          <p className="text-xs text-green-600 font-bold mt-4">
                              {simulation.interestSaved > 0 ? `-${currency.format(simulation.interestSaved)} d'intérêts sauvés !` : "Aucune économie active"}
                          </p>
                      </CardContent>
                  </Card>
              </div>

              {/* GRAPHIQUE & TABLEAU (Tabs) */}
              <div className={`grid grid-cols-1 gap-8 ${!simulation.isCompliant ? "opacity-30 pointer-events-none" : ""}`}>
                  <Tabs defaultValue="chart" className="w-full">
                      <div className="flex items-center justify-between mb-4">
                          <TabsList>
                              <TabsTrigger value="chart">Analyse Visuelle</TabsTrigger>
                              <TabsTrigger value="table">Tableau Détaillé</TabsTrigger>
                          </TabsList>
                          {/* Toggle Graphique Interne */}
                          <div className="flex bg-muted p-1 rounded-md hidden md:flex">
                                <button onClick={() => setChartView('evolution')} className={`px-3 py-1 text-xs font-medium rounded-sm transition-all ${chartView === 'evolution' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>Dette</button>
                                <button onClick={() => setChartView('networth')} className={`px-3 py-1 text-xs font-medium rounded-sm transition-all ${chartView === 'networth' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>Patrimoine</button>
                                <button onClick={() => setChartView('distribution')} className={`px-3 py-1 text-xs font-medium rounded-sm transition-all ${chartView === 'distribution' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>Global</button>
                          </div>
                      </div>

                      <TabsContent value="chart">
                          <Card className="h-[450px] p-4 shadow-lg border-border">
                              <ResponsiveContainer width="100%" height="100%">
                                  {chartView === 'evolution' ? (
                                      <ComposedChart data={simulation.schedule} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                                          <defs>
                                          <linearGradient id="colorRent" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--destructive)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--destructive)" stopOpacity={0}/></linearGradient>
                                          <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient>
                                          </defs>
                                          <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                                          <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} minTickGap={40} />
                                          <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} width={40} />
                                          <Tooltip formatter={(value: number) => currency.format(value)} labelFormatter={(label) => `Mois ${label}`} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }} />
                                          <Legend verticalAlign="top" height={36}/>
                                          <Area type="monotone" dataKey="rentPayment" name="Intérêts" stroke="var(--destructive)" fillOpacity={1} fill="url(#colorRent)" stackId="1" />
                                          <Area type="monotone" dataKey="principalPayment" name="Capital" stroke="var(--primary)" fillOpacity={1} fill="url(#colorPrincipal)" stackId="1" />
                                      </ComposedChart>
                                  ) : chartView === 'networth' ? (
                                      <ComposedChart data={enrichedSchedule} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                                          <defs>
                                              <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient>
                                          </defs>
                                          <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                                          <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} minTickGap={40} />
                                          <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} width={40} />
                                          <Tooltip formatter={(value: number) => currency.format(value)} labelFormatter={(label) => `Mois ${label}`} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }} />
                                          <Legend verticalAlign="top" height={36}/>
                                          <Area type="monotone" dataKey="houseValue" name="Valeur Maison" stroke="#22c55e" fillOpacity={0.1} fill="url(#colorNet)" />
                                          <Area type="monotone" dataKey="remainingBankBalance" name="Dette Restante" stroke="#64748b" fillOpacity={0.3} />
                                          <Line type="monotone" dataKey="netEquity" name="Équité Nette" stroke="#16a34a" strokeWidth={3} dot={false} />
                                      </ComposedChart>
                                  ) : (
                                      <PieChart>
                                          <Pie data={pieData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
                                              {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />))}
                                          </Pie>
                                          <Tooltip formatter={(value: number) => currency.format(value)} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }} />
                                          <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
                                      </PieChart>
                                  )}
                              </ResponsiveContainer>
                          </Card>
                      </TabsContent>

                      <TabsContent value="table">
                          <Card className="shadow-lg border-border overflow-hidden">
                              <div className="flex items-center justify-between p-4 border-b bg-muted/20">
                                  <div className="flex items-center gap-2"><CardTitle className="text-base">Tableau détaillé</CardTitle><Badge variant="outline">{simulation.schedule.length} mois</Badge></div>
                                  <Button variant="outline" size="sm" onClick={handleExportCSV} className="gap-2"><Download className="h-4 w-4" /> CSV</Button>
                              </div>
                              <div className="max-h-[600px] overflow-auto">
                                  <Table>
                                      <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
                                          <TableRow>
                                              <TableHead>Mois</TableHead>
                                              <TableHead>Loyer</TableHead>
                                              <TableHead>Capital</TableHead>
                                              <TableHead>Total</TableHead>
                                              <TableHead className="text-right">Solde</TableHead>
                                          </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                          {simulation.schedule.map((row) => (
                                              <TableRow key={row.month} className="hover:bg-muted/50">
                                                  <TableCell className="font-medium">{row.month}</TableCell>
                                                  <TableCell className="text-orange-500">{currency.format(row.rentPayment)}</TableCell>
                                                  <TableCell className="text-primary font-medium">{currency.format(row.principalPayment)}</TableCell>
                                                  <TableCell>{currency.format(row.totalPayment)}</TableCell>
                                                  <TableCell className="text-right text-muted-foreground">{currency.format(row.remainingBankBalance)}</TableCell>
                                              </TableRow>
                                          ))}
                                      </TableBody>
                                  </Table>
                              </div>
                          </Card>
                      </TabsContent>
                  </Tabs>
              </div>
          </div>
      </div>
    </main>
  );
}