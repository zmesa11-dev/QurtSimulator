// // "use client";

// // import { useState, useMemo } from "react";
// // import { Card } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import { Button } from "@/components/ui/button";
// // import { Switch } from "@/components/ui/switch";
// // import { Label } from "@/components/ui/label";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, Line, ComposedChart } from 'recharts';
// // import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// // import { Download } from "lucide-react";
// // import { SimulationResult, ScheduleRow } from "@/lib/qurtuba-logic";

// // // --- TYPES LOCAUX ---
// // interface ChartDataPoint {
// //   month: number;
// //   balanceAccelerated: number;
// //   balanceStandard: number;
// //   interestPaid: number;
// //   principalPaid: number;
// // }

// // interface EnrichedScheduleRow extends ScheduleRow {
// //   houseValue: number;
// //   netEquity: number;
// // }

// // // NOUVEAU : Type unifié pour les lignes du tableau (Mensuel ou Annuel)
// // interface TableRowData {
// //   month: string | number; // Accepte "1" ou "Année 1"
// //   rentPayment: number;
// //   principalPayment: number;
// //   totalPayment: number;
// //   remainingBankBalance: number;
// //   isYearly?: boolean;
// // }

// // interface SimulatorChartsProps {
// //   chartView: 'evolution' | 'distribution' | 'networth';
// //   setChartView: (v: 'evolution' | 'distribution' | 'networth') => void;
// //   chartData: ChartDataPoint[];
// //   enrichedSchedule: EnrichedScheduleRow[];
// //   simulation: SimulationResult;
// //   price: number;
// //   monthlyCharges: number;
// //   isDark: boolean;
// //   currency: Intl.NumberFormat;
// //   onExport: () => void;
// // }

// // export function SimulatorCharts({ 
// //   chartView, setChartView, chartData, enrichedSchedule, simulation, price, monthlyCharges, isDark, currency, onExport 
// // }: SimulatorChartsProps) {
    
// //   // --- CONFIGURATION VISUELLE ---
// //   const opacityStart = isDark ? 0.9 : 0.85;
// //   const opacityEnd = isDark ? 0.3 : 0.15;
// //   const gridOpacity = isDark ? 0.15 : 0.5;

// //   // --- STATE TABLEAU ---
// //   const [isYearlyView, setIsYearlyView] = useState(true);

// //   // --- CALCULS DONNÉES ---

// //   // 1. Agrégation pour le Tableau
// //   const tableData = useMemo<TableRowData[]>(() => {
// //       // Si vue mensuelle, on retourne le schedule tel quel
// //       if (!isYearlyView) return simulation.schedule;
      
// //       // Si vue annuelle, on agrège
// //       const yearlyData: TableRowData[] = [];
// //       let currentYear = 0;
// //       let accRent = 0; let accPrincipal = 0; let accTotal = 0;

// //       simulation.schedule.forEach((row, index) => {
// //           accRent += row.rentPayment;
// //           accPrincipal += row.principalPayment;
// //           accTotal += row.totalPayment;
          
// //           if ((row.month % 12 === 0) || index === simulation.schedule.length - 1) {
// //               currentYear++;
// //               yearlyData.push({
// //                   month: `Année ${currentYear}`,
// //                   rentPayment: accRent,
// //                   principalPayment: accPrincipal,
// //                   totalPayment: accTotal,
// //                   remainingBankBalance: row.remainingBankBalance,
// //                   isYearly: true
// //               });
// //               accRent = 0; accPrincipal = 0; accTotal = 0;
// //           }
// //       });
// //       return yearlyData;
// //   }, [simulation.schedule, isYearlyView]);

// //   // 2. Données pour le Donut
// //   const pieData = useMemo(() => {
// //       const totalInterest = simulation.totalInterestPaid;
// //       const totalCharges = monthlyCharges * simulation.actualDurationMonths;
// //       const totalPrincipal = price;
// //       const grandTotal = totalPrincipal + totalInterest + totalCharges;

// //       return [
// //           { name: 'Capital (Maison)', value: totalPrincipal, color: '#3b82f6', percent: (totalPrincipal / grandTotal) * 100 },
// //           { name: 'Coût Financement', value: totalInterest, color: '#f97316', percent: (totalInterest / grandTotal) * 100 },
// //           { name: 'Charges & Taxes', value: totalCharges, color: '#64748b', percent: (totalCharges / grandTotal) * 100 }
// //       ];
// //   }, [simulation, price, monthlyCharges]);

// //   const grandTotalOut = useMemo(() => pieData.reduce((acc, curr) => acc + curr.value, 0), [pieData]);


// //   return (
// //     <Tabs defaultValue="chart" className="w-full">
         
// //          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
// //             <TabsList className="grid w-full md:w-auto grid-cols-2">
// //                 <TabsTrigger value="chart">Analyse Visuelle</TabsTrigger>
// //                 <TabsTrigger value="table">Tableau Détaillé</TabsTrigger>
// //             </TabsList>
            
// //             <div className="flex bg-card border p-1 rounded-lg shadow-sm">
// //                   <button onClick={() => setChartView('evolution')} className={`px-4 py-1.5 text-xs font-medium rounded transition-all ${chartView === 'evolution' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}>Dette</button>
// //                   <button onClick={() => setChartView('networth')} className={`px-4 py-1.5 text-xs font-medium rounded transition-all ${chartView === 'networth' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}>Patrimoine</button>
// //                   <button onClick={() => setChartView('distribution')} className={`px-4 py-1.5 text-xs font-medium rounded transition-all ${chartView === 'distribution' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}>Répartition</button>
// //             </div>
// //         </div>

// //         <TabsContent value="chart" className="mt-0">
// //             <Card className="h-[500px] p-2 md:p-6 shadow-md border-border bg-card transition-colors duration-300 flex items-center justify-center">
// //                 <div className="w-full h-full">
// //                     {chartView === 'evolution' ? (
// //                         <ResponsiveContainer width="100%" height="100%">
// //                             <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
// //                                 <defs>
// //                                     <linearGradient id="colorRent" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f97316" stopOpacity={opacityStart}/><stop offset="95%" stopColor="#f97316" stopOpacity={opacityEnd}/></linearGradient>
// //                                     <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563eb" stopOpacity={opacityStart}/><stop offset="95%" stopColor="#2563eb" stopOpacity={opacityEnd}/></linearGradient>
// //                                 </defs>
// //                                 <CartesianGrid strokeDasharray="3 3" opacity={gridOpacity} vertical={false} stroke="currentColor" />
// //                                 <XAxis dataKey="month" stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} minTickGap={50} className="text-muted-foreground"/>
// //                                 <YAxis yAxisId="left" hide />
// //                                 <YAxis yAxisId="right" orientation="right" stroke="currentColor" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value) => `${(value/1000).toFixed(0)}k`} width={40} className="text-muted-foreground opacity-70"/>
// //                                 <Tooltip 
// //                                     contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
// //                                     itemStyle={{ paddingBottom: '2px' }}
// //                                     formatter={(value: number, name: string) => {
// //                                         if (name === 'balanceAccelerated') return [currency.format(value), 'Votre Solde'];
// //                                         if (name === 'balanceStandard') return [currency.format(value), 'Solde Standard'];
// //                                         if (name === 'principalPaid') return [currency.format(value), 'Capital (Bleu)'];
// //                                         if (name === 'interestPaid') return [currency.format(value), 'Frais/Loyer (Orange)'];
// //                                         return [currency.format(value), name];
// //                                     }}
// //                                 />
// //                                 <Legend verticalAlign="top" height={36} iconType="circle"/>
// //                                 <Area yAxisId="left" type="monotone" dataKey="interestPaid" name="Frais (Loyer)" stackId="1" stroke="#f97316" fill="url(#colorRent)" fillOpacity={1}/>
// //                                 <Area yAxisId="left" type="monotone" dataKey="principalPaid" name="Capital" stackId="1" stroke="#2563eb" fill="url(#colorPrincipal)" fillOpacity={1}/>
// //                                 <Line yAxisId="right" type="monotone" dataKey="balanceStandard" name="Trajectoire Standard" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth={2} strokeDasharray="5 5" dot={false} opacity={0.7}/>
// //                                 <Line yAxisId="right" type="monotone" dataKey="balanceAccelerated" name="Votre Scénario" stroke="currentColor" strokeWidth={3} dot={false} className="text-foreground"/>
// //                             </ComposedChart>
// //                         </ResponsiveContainer>
                    
// //                     ) : chartView === 'networth' ? (
// //                         <ResponsiveContainer width="100%" height="100%">
// //                             <ComposedChart data={enrichedSchedule} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
// //                                 <defs>
// //                                     <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={opacityStart}/><stop offset="95%" stopColor="#22c55e" stopOpacity={opacityEnd}/></linearGradient>
// //                                 </defs>
// //                                 <CartesianGrid strokeDasharray="3 3" opacity={gridOpacity} vertical={false} stroke="currentColor" />
// //                                 <XAxis dataKey="month" stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} minTickGap={50} className="text-muted-foreground"/>
// //                                 <YAxis stroke="currentColor" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value) => `${(value/1000).toFixed(0)}k`} width={40} className="text-muted-foreground opacity-70"/>
// //                                 <Tooltip formatter={(value: number) => currency.format(value)} contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
// //                                 <Legend verticalAlign="top" height={36} iconType="circle"/>
// //                                 <Area type="monotone" dataKey="houseValue" name="Valeur Maison" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorNet)" />
// //                                 <Line type="monotone" dataKey="netEquity" name="Équité Nette" stroke="#15803d" strokeWidth={3} dot={false} />
// //                                 <Line type="monotone" dataKey="remainingBankBalance" name="Dette Restante" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth={2} dot={false} opacity={0.5} />
// //                             </ComposedChart>
// //                         </ResponsiveContainer>

// //                     ) : (
// //                         <div className="flex flex-col md:flex-row items-center justify-center h-full w-full px-4 gap-8">
// //                             <div className="relative w-[320px] h-[320px] flex-shrink-0">
// //                                 <ResponsiveContainer width="100%" height="100%">
// //                                     <PieChart>
// //                                         <Pie 
// //                                             data={pieData} 
// //                                             dataKey="value" 
// //                                             cx="50%" 
// //                                             cy="50%" 
// //                                             innerRadius={90} 
// //                                             outerRadius={120} 
// //                                             paddingAngle={4}
// //                                             stroke="none"
// //                                             cornerRadius={6}
// //                                         >
// //                                             {pieData.map((entry, index) => (
// //                                                 <Cell key={`cell-${index}`} fill={entry.color} />
// //                                             ))}
// //                                         </Pie>
// //                                         <Tooltip 
// //                                             formatter={(value: number) => currency.format(value)} 
// //                                             contentStyle={{ 
// //                                                 backgroundColor: 'hsl(var(--card))', 
// //                                                 borderColor: 'hsl(var(--border))', 
// //                                                 borderRadius: '8px',
// //                                                 color: 'hsl(var(--foreground))'
// //                                             }} 
// //                                         />
// //                                     </PieChart>
// //                                 </ResponsiveContainer>
// //                                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
// //                                     <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Total Payé</span>
// //                                     <span className="text-xl font-bold text-foreground">{currency.format(grandTotalOut)}</span>
// //                                 </div>
// //                             </div>

// //                             <div className="flex flex-col gap-3 w-full max-w-[300px]">
// //                                 {pieData.map((item, index) => (
// //                                     <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-border/50">
// //                                         <div className="flex items-center gap-3">
// //                                             <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></div>
// //                                             <div className="flex flex-col">
// //                                                 <span className="text-sm font-bold text-foreground">{item.name}</span>
// //                                                 <span className="text-[10px] text-muted-foreground font-medium">{item.percent.toFixed(1)}%</span>
// //                                             </div>
// //                                         </div>
// //                                         <span className="text-sm font-mono font-medium text-foreground ml-2">{currency.format(item.value)}</span>
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                         </div>
// //                     )}
// //                 </div>
// //             </Card>
// //         </TabsContent>

// //         <TabsContent value="table">
// //             <Card className="shadow-md border-border overflow-hidden">
// //                 <div className="flex items-center justify-between p-4 border-b bg-muted/30">
// //                     <div className="flex items-center gap-4">
// //                         <Badge variant="secondary">{isYearlyView ? `${tableData.length} années` : `${simulation.schedule.length} mois`}</Badge>
// //                         <div className="flex items-center space-x-2">
// //                             <Switch id="view-mode" checked={isYearlyView} onCheckedChange={setIsYearlyView} />
// //                             <Label htmlFor="view-mode" className="text-xs font-medium cursor-pointer">Vue Annuelle</Label>
// //                         </div>
// //                     </div>
// //                     <Button variant="outline" size="sm" onClick={onExport} className="gap-2 h-8 text-xs"><Download className="h-3.5 w-3.5" /> CSV</Button>
// //                 </div>
// //                 <div className="max-h-[500px] overflow-auto">
// //                     <Table>
// //                         <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
// //                             <TableRow>
// //                                 <TableHead className="w-[100px]">{isYearlyView ? "Année" : "Mois"}</TableHead>
// //                                 <TableHead className="text-orange-500">Frais (Loyer)</TableHead>
// //                                 <TableHead>Capital (Parts)</TableHead>
// //                                 <TableHead>Déboursé Total</TableHead>
// //                                 <TableHead className="text-right">Solde Restant</TableHead>
// //                             </TableRow>
// //                         </TableHeader>
// //                         <TableBody>
// //                             {/* CORRECTION ICI : Type explicite 'TableRowData' */}
// //                             {tableData.map((row: TableRowData, i: number) => (
// //                                 <TableRow key={i} className={`hover:bg-muted/50 ${row.isYearly ? "font-medium" : ""}`}>
// //                                     <TableCell className="font-mono text-xs text-muted-foreground">{row.month}</TableCell>
// //                                     <TableCell className="text-orange-500 font-bold">{currency.format(row.rentPayment)}</TableCell>
// //                                     <TableCell className="text-primary font-bold">{currency.format(row.principalPayment)}</TableCell>
// //                                     <TableCell className="font-mono">{currency.format(row.totalPayment)}</TableCell>
// //                                     <TableCell className="text-right font-mono text-muted-foreground">{currency.format(row.remainingBankBalance)}</TableCell>
// //                                 </TableRow>
// //                             ))}
// //                         </TableBody>
// //                     </Table>
// //                 </div>
// //             </Card>
// //         </TabsContent>
// //     </Tabs>
// //   );
// // }

// "use client";

// import { useState, useMemo } from "react";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, Line, ComposedChart } from 'recharts';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Download } from "lucide-react";
// import { SimulationResult, ScheduleRow } from "@/lib/qurtuba-logic";
// import { useLanguage } from "@/components/language-provider"; // IMPORT OBLIGATOIRE

// interface ChartDataPoint {
//   month: number;
//   balanceAccelerated: number;
//   balanceStandard: number;
//   interestPaid: number;
//   principalPaid: number;
// }
// interface EnrichedScheduleRow extends ScheduleRow {
//   houseValue: number;
//   netEquity: number;
// }
// interface TableRowData {
//   month: string | number;
//   rentPayment: number;
//   principalPayment: number;
//   totalPayment: number;
//   remainingBankBalance: number;
//   isYearly?: boolean;
// }

// interface SimulatorChartsProps {
//   chartView: 'evolution' | 'distribution' | 'networth';
//   setChartView: (v: 'evolution' | 'distribution' | 'networth') => void;
//   chartData: ChartDataPoint[];
//   enrichedSchedule: EnrichedScheduleRow[];
//   simulation: SimulationResult;
//   price: number;
//   monthlyCharges: number;
//   isDark: boolean;
//   currency: Intl.NumberFormat;
//   onExport: () => void;
// }

// export function SimulatorCharts({ 
//   chartView, setChartView, chartData, enrichedSchedule, simulation, price, monthlyCharges, isDark, currency, onExport 
// }: SimulatorChartsProps) {
    
//   // 1. RÉCUPÉRER LA LANGUE
//   const { t, lang } = useLanguage();

//   const opacityStart = isDark ? 0.9 : 0.85;
//   const opacityEnd = isDark ? 0.3 : 0.15;
//   const gridOpacity = isDark ? 0.15 : 0.5;

//   const [isYearlyView, setIsYearlyView] = useState(true);

//   // 2. DATA TABLEAU (Dépend de [t] pour traduire "Année")
//   const tableData = useMemo<TableRowData[]>(() => {
//       if (!isYearlyView) return simulation.schedule;
//       const yearlyData: TableRowData[] = [];
//       let currentYear = 0;
//       let accRent = 0; let accPrincipal = 0; let accTotal = 0;

//       simulation.schedule.forEach((row, index) => {
//           accRent += row.rentPayment;
//           accPrincipal += row.principalPayment;
//           accTotal += row.totalPayment;
//           if ((row.month % 12 === 0) || index === simulation.schedule.length - 1) {
//               currentYear++;
//               yearlyData.push({
//                   // ICI : Traduction dynamique de "Année"
//                   month: `${t('col_year')} ${currentYear}`, 
//                   rentPayment: accRent,
//                   principalPayment: accPrincipal,
//                   totalPayment: accTotal,
//                   remainingBankBalance: row.remainingBankBalance,
//                   isYearly: true
//               });
//               accRent = 0; accPrincipal = 0; accTotal = 0;
//           }
//       });
//       return yearlyData;
//   }, [simulation.schedule, isYearlyView, t]); // Ajout de 't' dans les dépendances

//   // 3. DATA DONUT (Dépend de [t] pour traduire les légendes)
//   const pieData = useMemo(() => {
//       const totalInterest = simulation.totalInterestPaid;
//       const totalCharges = monthlyCharges * simulation.actualDurationMonths;
//       const totalPrincipal = price;
//       const grandTotal = totalPrincipal + totalInterest + totalCharges;

//       return [
//           { name: t('pie_capital'), value: totalPrincipal, color: '#3b82f6', percent: (totalPrincipal / grandTotal) * 100 },
//           { name: t('pie_interest'), value: totalInterest, color: '#f97316', percent: (totalInterest / grandTotal) * 100 },
//           { name: t('pie_charges'), value: totalCharges, color: '#64748b', percent: (totalCharges / grandTotal) * 100 }
//       ];
//   }, [simulation, price, monthlyCharges, t]); // Ajout de 't' dans les dépendances

//   const grandTotalOut = useMemo(() => pieData.reduce((acc, curr) => acc + curr.value, 0), [pieData]);

//   return (
//     <Tabs defaultValue="chart" className="w-full">
         
//          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
//             <TabsList className="grid w-full md:w-auto grid-cols-2">
//                 <TabsTrigger value="chart">{t('visual_analysis')}</TabsTrigger>
//                 <TabsTrigger value="table">{t('detailed_table')}</TabsTrigger>
//             </TabsList>
            
//             <div className="flex bg-card border p-1 rounded-lg shadow-sm">
//                   <button onClick={() => setChartView('evolution')} className={`px-4 py-1.5 text-xs font-medium rounded transition-all ${chartView === 'evolution' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}>{t('tab_debt')}</button>
//                   <button onClick={() => setChartView('networth')} className={`px-4 py-1.5 text-xs font-medium rounded transition-all ${chartView === 'networth' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}>{t('tab_networth')}</button>
//                   <button onClick={() => setChartView('distribution')} className={`px-4 py-1.5 text-xs font-medium rounded transition-all ${chartView === 'distribution' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}>{t('tab_repartition')}</button>
//             </div>
//         </div>

//         <TabsContent value="chart" className="mt-0">
//             <Card className="h-[500px] p-2 md:p-6 shadow-md border-border bg-card transition-colors duration-300 flex items-center justify-center">
//                 <div className="w-full h-full">
// {/* VUE 1 : DETTE (EVOLUTION) - STYLE "GHOST vs HERO" */}
//                     {chartView === 'evolution' ? (
//                         <ResponsiveContainer width="100%" height="100%">
//                             <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
//                                 <defs>
//                                     {/* Dégradé pour la zone "Votre Scénario" */}
//                                     <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
//                                         <stop offset="5%" stopColor="#3b82f6" stopOpacity={isDark ? 0.3 : 0.2}/>
//                                         <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
//                                     </linearGradient>
//                                 </defs>
                                
//                                 <CartesianGrid strokeDasharray="3 3" opacity={gridOpacity} vertical={false} stroke="currentColor" />
                                
//                                 <XAxis 
//                                     dataKey="month" 
//                                     stroke="currentColor" 
//                                     fontSize={12} 
//                                     tickLine={false} 
//                                     axisLine={false} 
//                                     tickFormatter={(val) => `${lang === 'fr' ? 'An' : 'Yr'} ${Math.floor(val/12)}`} 
//                                     minTickGap={50} 
//                                     className="text-muted-foreground"
//                                 />
                                
//                                 {/* On garde seulement l'axe de droite pour la dette */}
//                                 <YAxis 
//                                     orientation="right" 
//                                     stroke="currentColor" 
//                                     fontSize={11} 
//                                     tickLine={false} 
//                                     axisLine={false} 
//                                     tickFormatter={(value) => `${(value/1000).toFixed(0)}k`} 
//                                     width={40} 
//                                     className="text-muted-foreground opacity-70"
//                                 />
                                
//                                 <Tooltip 
//                                     contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
//                                     itemStyle={{ paddingBottom: '2px' }}
//                                     formatter={(value: number, name: string) => {
//                                         if (name === 'balanceAccelerated') return [currency.format(value), t('chart_balance_yours')];
//                                         if (name === 'balanceStandard') return [currency.format(value), t('chart_balance_std')];
//                                         return [currency.format(value), name];
//                                     }}
//                                     labelFormatter={(label) => `${t('col_month')} ${label}`}
//                                 />
                                
//                                 <Legend verticalAlign="top" height={36} iconType="circle"/>
                                
//                                 {/* 1. LIGNE STANDARD (GHOST) : Grise, Pointillée, Discrète */}
//                                 <Line 
//                                     type="monotone" 
//                                     dataKey="balanceStandard" 
//                                     name={t('chart_standard')} 
//                                     stroke={isDark ? "#94a3b8" : "#64748b"} 
//                                     strokeWidth={2} 
//                                     strokeDasharray="5 5" // Effet pointillé
//                                     dot={false} 
//                                     opacity={0.6}
//                                 />
                                
//                                 {/* 2. VOTRE LIGNE (HERO) : Bleue, Solide, avec Remplissage */}
//                                 <Area 
//                                     type="monotone" 
//                                     dataKey="balanceAccelerated" 
//                                     name={t('chart_yours')} 
//                                     stroke="#3b82f6" 
//                                     strokeWidth={3} 
//                                     fill="url(#colorBalance)" 
//                                     fillOpacity={1}
//                                 />
//                             </ComposedChart>
//                         </ResponsiveContainer>
                    
//                     ) : chartView === 'networth' ? (
//                         <ResponsiveContainer width="100%" height="100%">
//                             <ComposedChart data={enrichedSchedule} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
//                                 <defs>
//                                     <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={opacityStart}/><stop offset="95%" stopColor="#22c55e" stopOpacity={opacityEnd}/></linearGradient>
//                                 </defs>
//                                 <CartesianGrid strokeDasharray="3 3" opacity={gridOpacity} vertical={false} stroke="currentColor" />
                                
//                                 <XAxis 
//                                     dataKey="month" 
//                                     stroke="currentColor" 
//                                     fontSize={12} 
//                                     tickLine={false} 
//                                     axisLine={false} 
//                                     tickFormatter={(val) => `${lang === 'fr' ? 'An' : 'Yr'} ${Math.floor(val/12)}`} 
//                                     minTickGap={50} 
//                                     className="text-muted-foreground"
//                                 />
                                
//                                 <YAxis stroke="currentColor" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value) => `${(value/1000).toFixed(0)}k`} width={40} className="text-muted-foreground opacity-70"/>
//                                 <Tooltip formatter={(value: number) => currency.format(value)} contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
//                                 <Legend verticalAlign="top" height={36} iconType="circle"/>
                                
//                                 <Area type="monotone" dataKey="houseValue" name={t('chart_house')} stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorNet)" />
//                                 <Line type="monotone" dataKey="netEquity" name={t('chart_equity')} stroke="#15803d" strokeWidth={3} dot={false} />
//                                 <Line type="monotone" dataKey="remainingBankBalance" name={t('chart_debt')} stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth={2} dot={false} opacity={0.5} />
//                             </ComposedChart>
//                         </ResponsiveContainer>

//                     ) : (
//                         // --- VUE RÉPARTITION : DESIGN "FINTECH" ---
//                         <div className="flex flex-col lg:flex-row items-center justify-center h-full w-full px-2 gap-8 py-4">
                            
//                             {/* 1. LE GRAPHIQUE (Cercle) */}
//                             {/* On fixe une taille max pour qu'il ne devienne pas géant, mais on le laisse flexible */}
//                             <div className="relative w-[260px] h-[260px] flex-shrink-0">
//                                 <ResponsiveContainer width="100%" height="100%">
//                                     <PieChart>
//                                         <Pie 
//                                             data={pieData} 
//                                             dataKey="value" 
//                                             cx="50%" 
//                                             cy="50%" 
//                                             innerRadius={85} // Anneau fin et élégant
//                                             outerRadius={120} 
//                                             paddingAngle={3} // Espace entre les segments
//                                             cornerRadius={5} // Bords arrondis
//                                             stroke="none"
//                                         >
//                                             {pieData.map((entry, index) => (
//                                                 <Cell key={`cell-${index}`} fill={entry.color} />
//                                             ))}
//                                         </Pie>
//                                         <Tooltip 
//                                             formatter={(value: number) => currency.format(value)} 
//                                             contentStyle={{ 
//                                                 backgroundColor: 'hsl(var(--card))', 
//                                                 borderColor: 'hsl(var(--border))', 
//                                                 borderRadius: '8px',
//                                                 boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
//                                             }} 
//                                             itemStyle={{ color: 'hsl(var(--foreground))' }}
//                                         />
//                                     </PieChart>
//                                 </ResponsiveContainer>
                                
//                                 {/* TEXTE CENTRAL (Absolu) */}
//                                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
//                                     <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1 opacity-70">
//                                         Total Sortie
//                                     </span>
//                                     <span className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
//                                         {currency.format(grandTotalOut)}
//                                     </span>
//                                 </div>
//                             </div>

//                             {/* 2. LA LÉGENDE (Liste détaillée à droite) */}
//                             <div className="flex flex-col justify-center gap-3 w-full max-w-[350px]">
//                                 {pieData.map((item, index) => (
//                                     <div key={index} className="group flex items-center justify-between p-3 rounded-xl border border-border/40 bg-card/50 hover:bg-muted/50 hover:border-border transition-all duration-200">
                                        
//                                         {/* Partie Gauche : Couleur + Nom + % */}
//                                         <div className="flex items-center gap-3">
//                                             <div className="w-1.5 h-8 rounded-full" style={{ backgroundColor: item.color }}></div>
//                                             <div className="flex flex-col">
//                                                 <span className="text-xs font-bold text-foreground">{item.name}</span>
//                                                 <span className="text-[10px] font-medium text-muted-foreground">
//                                                     {item.percent.toFixed(1)}% du total
//                                                 </span>
//                                             </div>
//                                         </div>

//                                         {/* Partie Droite : Montant */}
//                                         <span className="text-sm font-mono font-bold text-foreground">
//                                             {currency.format(item.value)}
//                                         </span>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </Card>
//         </TabsContent>
        
//         <TabsContent value="table">
//             <Card className="shadow-md border-border overflow-hidden">
//                 <div className="flex items-center justify-between p-4 border-b bg-muted/30">
//                     <div className="flex items-center gap-4">
//                         <Badge variant="secondary">{isYearlyView ? `${tableData.length} ${t('years')}` : `${simulation.schedule.length} ${t('col_month')}`}</Badge>
//                         <div className="flex items-center space-x-2">
//                             <Switch id="view-mode" checked={isYearlyView} onCheckedChange={setIsYearlyView} />
//                             <Label htmlFor="view-mode" className="text-xs font-medium cursor-pointer">{t('view_yearly')}</Label>
//                         </div>
//                     </div>
//                     <Button variant="outline" size="sm" onClick={onExport} className="gap-2 h-8 text-xs"><Download className="h-3.5 w-3.5" /> CSV</Button>
//                 </div>
//                 <div className="max-h-[500px] overflow-auto">
//                     <Table>
//                         <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
//                             <TableRow>
//                                 <TableHead className="w-[100px]">{isYearlyView ? t('col_year') : t('col_month')}</TableHead>
//                                 <TableHead className="text-orange-500">{t('col_rent')}</TableHead>
//                                 <TableHead>{t('col_capital')}</TableHead>
//                                 <TableHead>{t('col_total')}</TableHead>
//                                 <TableHead className="text-right">{t('col_balance')}</TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             {tableData.map((row: TableRowData, i: number) => (
//                                 <TableRow key={i} className={`hover:bg-muted/50 ${row.isYearly ? "font-medium" : ""}`}>
//                                     <TableCell className="font-mono text-xs text-muted-foreground">{row.month}</TableCell>
//                                     <TableCell className="text-orange-500 font-bold">{currency.format(row.rentPayment)}</TableCell>
//                                     <TableCell className="text-primary font-bold">{currency.format(row.principalPayment)}</TableCell>
//                                     <TableCell className="font-mono">{currency.format(row.totalPayment)}</TableCell>
//                                     <TableCell className="text-right font-mono text-muted-foreground">{currency.format(row.remainingBankBalance)}</TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </div>
//             </Card>
//         </TabsContent>
//     </Tabs>
//   );
// }

"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, Line, ComposedChart, ReferenceLine } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from "lucide-react";
import { SimulationResult, ScheduleRow } from "@/lib/qurtuba-logic";
import { useLanguage } from "@/components/language-provider";

interface ChartDataPoint {
  month: number;
  balanceAccelerated: number;
  balanceStandard: number;
  interestPaid: number;
  principalPaid: number;
}
interface EnrichedScheduleRow extends ScheduleRow {
  houseValue: number;
  netEquity: number;
}
interface TableRowData {
  month: string | number;
  rentPayment: number;
  principalPayment: number;
  totalPayment: number;
  remainingBankBalance: number;
  isYearly?: boolean;
}

interface SimulatorChartsProps {
  chartView: 'evolution' | 'distribution' | 'networth';
  setChartView: (v: 'evolution' | 'distribution' | 'networth') => void;
  chartData: ChartDataPoint[];
  enrichedSchedule: EnrichedScheduleRow[];
  simulation: SimulationResult;
  price: number;
  monthlyCharges: number;
  isDark: boolean;
  currency: Intl.NumberFormat;
  onExport: () => void;
}

export function SimulatorCharts({ 
  chartView, setChartView, chartData, enrichedSchedule, simulation, price, monthlyCharges, isDark, currency, onExport 
}: SimulatorChartsProps) {
    
  const { t, lang } = useLanguage();

  // --- CORRECTION COULEURS ---
  // On définit explicitement les couleurs ici pour être sûr qu'elles matchent
  // Si ton thème dark est vraiment noir, mets #000000, sinon le bleu nuit standard est #020817
  const maskColor = isDark ? "#020817" : "#ffffff"; 
  const gridColor = isDark ? "#1e293b" : "#e2e8f0"; // slate-800 en dark, slate-200 en light
  
  const [isYearlyView, setIsYearlyView] = useState(true);

  // DATA TABLEAU (inchangé)
  const tableData = useMemo<TableRowData[]>(() => {
      if (!isYearlyView) return simulation.schedule;
      const yearlyData: TableRowData[] = [];
      let currentYear = 0;
      let accRent = 0; let accPrincipal = 0; let accTotal = 0;

      simulation.schedule.forEach((row, index) => {
          accRent += row.rentPayment;
          accPrincipal += row.principalPayment;
          accTotal += row.totalPayment;
          if ((row.month % 12 === 0) || index === simulation.schedule.length - 1) {
              currentYear++;
              yearlyData.push({
                  month: `${t('year_row')} ${currentYear}`,
                  rentPayment: accRent,
                  principalPayment: accPrincipal,
                  totalPayment: accTotal,
                  remainingBankBalance: row.remainingBankBalance,
                  isYearly: true
              });
              accRent = 0; accPrincipal = 0; accTotal = 0;
          }
      });
      return yearlyData;
  }, [simulation.schedule, isYearlyView, t]);

  // DATA DONUT (inchangé)
  const pieData = useMemo(() => {
      const totalInterest = simulation.totalInterestPaid;
      const totalCharges = monthlyCharges * simulation.actualDurationMonths;
      const totalPrincipal = price;
      const grandTotal = totalPrincipal + totalInterest + totalCharges;

      return [
          { name: t('pie_capital'), value: totalPrincipal, color: '#3b82f6', percent: (totalPrincipal / grandTotal) * 100 },
          { name: t('pie_interest'), value: totalInterest, color: '#f97316', percent: (totalInterest / grandTotal) * 100 },
          { name: t('pie_charges'), value: totalCharges, color: '#64748b', percent: (totalCharges / grandTotal) * 100 }
      ];
  }, [simulation, price, monthlyCharges, t]);

  const grandTotalOut = useMemo(() => pieData.reduce((acc, curr) => acc + curr.value, 0), [pieData]);

  const endOptimizedIndex = simulation.actualDurationMonths;
  const savingsLabel = simulation.interestSaved > 0 
    ? `${t('economy')} : ${currency.format(simulation.interestSaved)}` 
    : "";

  return (
    <Tabs defaultValue="chart" className="w-full">
         
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <TabsList className="grid w-full md:w-auto grid-cols-2">
                <TabsTrigger value="chart">{t('visual_analysis')}</TabsTrigger>
                <TabsTrigger value="table">{t('detailed_table')}</TabsTrigger>
            </TabsList>
            
            <div className="flex bg-card border p-1 rounded-lg shadow-sm">
                  <button onClick={() => setChartView('evolution')} className={`px-4 py-1.5 text-xs font-medium rounded transition-all ${chartView === 'evolution' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:bg-muted'}`}>{t('tab_debt')}</button>
                  <button onClick={() => setChartView('networth')} className={`px-4 py-1.5 text-xs font-medium rounded transition-all ${chartView === 'networth' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:bg-muted'}`}>{t('tab_networth')}</button>
                  <button onClick={() => setChartView('distribution')} className={`px-4 py-1.5 text-xs font-medium rounded transition-all ${chartView === 'distribution' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:bg-muted'}`}>{t('tab_repartition')}</button>
            </div>
        </div>

        <TabsContent value="chart" className="mt-0">
            <Card className="h-[600px] p-4 md:p-6 shadow-md border-border bg-card transition-colors duration-300 flex items-center justify-center">
                <div className="w-full h-full flex flex-col gap-6">
                    
                    <svg style={{ height: 0 }}>
                        <defs>
                            {/* Dégradé Vert pour Standard */}
                            <linearGradient id="gradStandard" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.05}/>
                            </linearGradient>
                            {/* Dégradé Bleu/Noir pour le scénario accéléré */}
                            <linearGradient id="gradAccelerated" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={isDark ? "#3b82f6" : "#0f172a"} stopOpacity={0.5}/>
                                <stop offset="95%" stopColor={isDark ? "#3b82f6" : "#0f172a"} stopOpacity={0.1}/>
                            </linearGradient>
                            {/* Dégradés Flux inchangés */}
                            <linearGradient id="colorRent" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/><stop offset="95%" stopColor="#f97316" stopOpacity={0.2}/></linearGradient>
                            <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/></linearGradient>
                        </defs>
                    </svg>

                    {chartView === 'evolution' ? (
                        <>
                            {/* GRAPHIQUE PRINCIPAL */}
                            <div className="flex-1 min-h-0 relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" opacity={isDark ? 0.1 : 0.4} vertical={false} stroke="currentColor" />
                                        
                                        <XAxis dataKey="month" hide />
                                        <YAxis orientation="right" stroke="currentColor" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value) => `${(value/1000).toFixed(0)}k`} width={40} className="text-muted-foreground opacity-70"/>
                                        
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                            formatter={(value: number, name: string) => {
                                                // Correction des noms dans le tooltip
                                                if (name === 'balanceAccelerated' || name === t('chart_yours')) return [currency.format(value), t('chart_yours')];
                                                if (name === 'balanceStandard' || name === t('chart_standard')) return [currency.format(value), t('chart_standard')];
                                                return [currency.format(value), name];
                                            }}
                                            labelFormatter={(label) => `${t('col_month')} ${label}`}
                                        />
                                        <Legend verticalAlign="top" height={36} iconType="circle"/>
                                        
                                        {/* 1. STANDARD (Derrière, en vert clair translucide) */}
                                        <Area 
                                            type="monotone" 
                                            dataKey="balanceStandard" 
                                            name={t('chart_standard')} 
                                            stroke="#22c55e" 
                                            strokeWidth={2}
                                            strokeDasharray="5 5" 
                                            fill="url(#gradStandard)" 
                                        />
                                        
                                        {/* 2. TON SCÉNARIO (Devant, plus foncé et solide) */}
                                        <Area 
                                            type="monotone" 
                                            dataKey="balanceAccelerated" 
                                            name={t('chart_yours')} // <-- Le name est ici pour la légende
                                            stroke={isDark ? "#60a5fa" : "#0f172a"} // Bleu clair en dark, Noir/Bleu nuit en light
                                            strokeWidth={3}
                                            fill="url(#gradAccelerated)"
                                        />

                                        {/* Ligne d'économie */}
                                        {simulation.interestSaved > 0 && (
                                            <ReferenceLine 
                                                x={simulation.actualDurationMonths} 
                                                stroke="#22c55e" 
                                                strokeDasharray="3 3"
                                                label={{ 
                                                    value: savingsLabel, 
                                                    position: 'insideTopRight', 
                                                    fill: '#22c55e',
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                }} 
                                            />
                                        )}
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>

                            {/* GRAPHIQUE FLUX (Bas) */}
                            <div className="h-[200px] flex-shrink-0 relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" opacity={isDark ? 0.1 : 0.4} vertical={false} stroke="currentColor" />
                                        <XAxis 
                                            dataKey="month" 
                                            stroke="currentColor" 
                                            fontSize={12} 
                                            tickLine={false} 
                                            axisLine={false} 
                                            tickFormatter={(val) => `${lang === 'fr' ? 'An' : 'Yr'} ${Math.floor(val/12)}`} 
                                            minTickGap={50} 
                                            className="text-muted-foreground"
                                        />
                                        <YAxis orientation="right" stroke="currentColor" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value) => `${(value/1000).toFixed(0)}k`} width={40} className="text-muted-foreground opacity-70"/>
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                            formatter={(value: number, name: string) => {
                                                if (name === 'principalPaid') return [currency.format(value), t('chart_capital')];
                                                if (name === 'interestPaid') return [currency.format(value), t('chart_rent')];
                                                return [currency.format(value), name];
                                            }}
                                        />
                                        
                                        <Area dataKey="interestPaid" name={t('chart_rent')} stackId="1" stroke="#f97316" fill="url(#colorRent)" fillOpacity={1} />
                                        <Area dataKey="principalPaid" name={t('chart_capital')} stackId="1" stroke="#3b82f6" fill="url(#colorPrincipal)" fillOpacity={1} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </>
                    ) : chartView === 'networth' ? (
                        // ... Code Networth existant
                        <ResponsiveContainer width="100%" height="100%">
                           <ComposedChart data={enrichedSchedule} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" opacity={isDark ? 0.1 : 0.4} vertical={false} stroke="currentColor" />
                                <XAxis dataKey="month" stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${lang === 'fr' ? 'An' : 'Yr'} ${Math.floor(val/12)}`} minTickGap={50} className="text-muted-foreground"/>
                                <YAxis stroke="currentColor" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value) => `${(value/1000).toFixed(0)}k`} width={40} className="text-muted-foreground opacity-70"/>
                                <Tooltip formatter={(value: number) => currency.format(value)} contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
                                <Legend verticalAlign="top" height={36} iconType="circle"/>
                                <Area type="monotone" dataKey="houseValue" name={t('chart_house')} stroke="#22c55e" strokeWidth={2} fill="url(#colorNet)" />
                                <Line type="monotone" dataKey="netEquity" name={t('chart_equity')} stroke="#15803d" strokeWidth={3} dot={false} />
                                <Line type="monotone" dataKey="remainingBankBalance" name={t('chart_debt')} stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth={2} dot={false} opacity={0.5} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    ) : (
                         // ... Code Pie Chart existant
                         <div className="flex flex-col md:flex-row items-center justify-center h-full w-full px-4 gap-8">
                            <div className="relative w-[300px] h-[300px] flex-shrink-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie 
                                            data={pieData} 
                                            dataKey="value" 
                                            cx="50%" 
                                            cy="50%" 
                                            innerRadius={90} 
                                            outerRadius={120} 
                                            paddingAngle={4}
                                            stroke="none"
                                            cornerRadius={6}
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: number) => currency.format(value)} contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">{t('pie_total')}</span>
                                    <span className="text-xl font-bold text-foreground">{currency.format(grandTotalOut)}</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 w-full max-w-[300px]">
                                {pieData.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-border/50 hover:bg-muted/40 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></div>
                                            <div className="flex flex-col"><span className="text-sm font-bold text-foreground">{item.name}</span><span className="text-[10px] text-muted-foreground font-medium">{item.percent.toFixed(1)}%</span></div>
                                        </div>
                                        <span className="text-sm font-mono font-medium text-foreground ml-2">{currency.format(item.value)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </TabsContent>

        {/* ... Tab content Table ... */}
        <TabsContent value="table">
            <Card className="shadow-md border-border overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b bg-muted/30">
                    <div className="flex items-center gap-4">
                        <Badge variant="secondary">{isYearlyView ? `${tableData.length} ${t('years')}` : `${simulation.schedule.length} ${t('col_month')}`}</Badge>
                        <div className="flex items-center space-x-2"><Switch id="view-mode" checked={isYearlyView} onCheckedChange={setIsYearlyView} /><Label htmlFor="view-mode" className="text-xs font-medium cursor-pointer">{t('view_yearly')}</Label></div>
                    </div>
                    <Button variant="outline" size="sm" onClick={onExport} className="gap-2 h-8 text-xs"><Download className="h-3.5 w-3.5" /> CSV</Button>
                </div>
                <div className="max-h-[500px] overflow-auto">
                    <Table>
                        <TableHeader className="sticky top-0 bg-card z-10 shadow-sm"><TableRow><TableHead className="w-[100px]">{isYearlyView ? t('col_year') : t('col_month')}</TableHead><TableHead className="text-orange-500">{t('col_rent')}</TableHead><TableHead>{t('col_capital')}</TableHead><TableHead>{t('col_total')}</TableHead><TableHead className="text-right">{t('col_balance')}</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {tableData.map((row: TableRowData, i: number) => (<TableRow key={i} className={`hover:bg-muted/50 ${row.isYearly ? "font-medium" : ""}`}><TableCell className="font-mono text-xs text-muted-foreground">{row.month}</TableCell><TableCell className="text-orange-500 font-bold">{currency.format(row.rentPayment)}</TableCell><TableCell className="text-primary font-bold">{currency.format(row.principalPayment)}</TableCell><TableCell className="font-mono">{currency.format(row.totalPayment)}</TableCell><TableCell className="text-right font-mono text-muted-foreground">{currency.format(row.remainingBankBalance)}</TableCell></TableRow>))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </TabsContent>
    </Tabs>
  );
}