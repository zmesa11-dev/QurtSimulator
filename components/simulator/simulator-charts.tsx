"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, Line, ComposedChart } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from "lucide-react";
import { SimulationResult, ScheduleRow } from "@/lib/qurtuba-logic";

// --- TYPES LOCAUX ---
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

// NOUVEAU : Type unifié pour les lignes du tableau (Mensuel ou Annuel)
interface TableRowData {
  month: string | number; // Accepte "1" ou "Année 1"
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
    
  // --- CONFIGURATION VISUELLE ---
  const opacityStart = isDark ? 0.9 : 0.85;
  const opacityEnd = isDark ? 0.3 : 0.15;
  const gridOpacity = isDark ? 0.15 : 0.5;

  // --- STATE TABLEAU ---
  const [isYearlyView, setIsYearlyView] = useState(true);

  // --- CALCULS DONNÉES ---

  // 1. Agrégation pour le Tableau
  const tableData = useMemo<TableRowData[]>(() => {
      // Si vue mensuelle, on retourne le schedule tel quel
      if (!isYearlyView) return simulation.schedule;
      
      // Si vue annuelle, on agrège
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
                  month: `Année ${currentYear}`,
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
  }, [simulation.schedule, isYearlyView]);

  // 2. Données pour le Donut
  const pieData = useMemo(() => {
      const totalInterest = simulation.totalInterestPaid;
      const totalCharges = monthlyCharges * simulation.actualDurationMonths;
      const totalPrincipal = price;
      const grandTotal = totalPrincipal + totalInterest + totalCharges;

      return [
          { name: 'Capital (Maison)', value: totalPrincipal, color: '#3b82f6', percent: (totalPrincipal / grandTotal) * 100 },
          { name: 'Coût Financement', value: totalInterest, color: '#f97316', percent: (totalInterest / grandTotal) * 100 },
          { name: 'Charges & Taxes', value: totalCharges, color: '#64748b', percent: (totalCharges / grandTotal) * 100 }
      ];
  }, [simulation, price, monthlyCharges]);

  const grandTotalOut = useMemo(() => pieData.reduce((acc, curr) => acc + curr.value, 0), [pieData]);


  return (
    <Tabs defaultValue="chart" className="w-full">
         
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <TabsList className="grid w-full md:w-auto grid-cols-2">
                <TabsTrigger value="chart">Analyse Visuelle</TabsTrigger>
                <TabsTrigger value="table">Tableau Détaillé</TabsTrigger>
            </TabsList>
            
            <div className="flex bg-card border p-1 rounded-lg shadow-sm">
                  <button onClick={() => setChartView('evolution')} className={`px-4 py-1.5 text-xs font-medium rounded transition-all ${chartView === 'evolution' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}>Dette</button>
                  <button onClick={() => setChartView('networth')} className={`px-4 py-1.5 text-xs font-medium rounded transition-all ${chartView === 'networth' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}>Patrimoine</button>
                  <button onClick={() => setChartView('distribution')} className={`px-4 py-1.5 text-xs font-medium rounded transition-all ${chartView === 'distribution' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}>Répartition</button>
            </div>
        </div>

        <TabsContent value="chart" className="mt-0">
            <Card className="h-[500px] p-2 md:p-6 shadow-md border-border bg-card transition-colors duration-300 flex items-center justify-center">
                <div className="w-full h-full">
                    {chartView === 'evolution' ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRent" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f97316" stopOpacity={opacityStart}/><stop offset="95%" stopColor="#f97316" stopOpacity={opacityEnd}/></linearGradient>
                                    <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563eb" stopOpacity={opacityStart}/><stop offset="95%" stopColor="#2563eb" stopOpacity={opacityEnd}/></linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" opacity={gridOpacity} vertical={false} stroke="currentColor" />
                                <XAxis dataKey="month" stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} minTickGap={50} className="text-muted-foreground"/>
                                <YAxis yAxisId="left" hide />
                                <YAxis yAxisId="right" orientation="right" stroke="currentColor" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value) => `${(value/1000).toFixed(0)}k`} width={40} className="text-muted-foreground opacity-70"/>
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                    itemStyle={{ paddingBottom: '2px' }}
                                    formatter={(value: number, name: string) => {
                                        if (name === 'balanceAccelerated') return [currency.format(value), 'Votre Solde'];
                                        if (name === 'balanceStandard') return [currency.format(value), 'Solde Standard'];
                                        if (name === 'principalPaid') return [currency.format(value), 'Capital (Bleu)'];
                                        if (name === 'interestPaid') return [currency.format(value), 'Frais/Loyer (Orange)'];
                                        return [currency.format(value), name];
                                    }}
                                />
                                <Legend verticalAlign="top" height={36} iconType="circle"/>
                                <Area yAxisId="left" type="monotone" dataKey="interestPaid" name="Frais (Loyer)" stackId="1" stroke="#f97316" fill="url(#colorRent)" fillOpacity={1}/>
                                <Area yAxisId="left" type="monotone" dataKey="principalPaid" name="Capital" stackId="1" stroke="#2563eb" fill="url(#colorPrincipal)" fillOpacity={1}/>
                                <Line yAxisId="right" type="monotone" dataKey="balanceStandard" name="Trajectoire Standard" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth={2} strokeDasharray="5 5" dot={false} opacity={0.7}/>
                                <Line yAxisId="right" type="monotone" dataKey="balanceAccelerated" name="Votre Scénario" stroke="currentColor" strokeWidth={3} dot={false} className="text-foreground"/>
                            </ComposedChart>
                        </ResponsiveContainer>
                    
                    ) : chartView === 'networth' ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={enrichedSchedule} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={opacityStart}/><stop offset="95%" stopColor="#22c55e" stopOpacity={opacityEnd}/></linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" opacity={gridOpacity} vertical={false} stroke="currentColor" />
                                <XAxis dataKey="month" stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} minTickGap={50} className="text-muted-foreground"/>
                                <YAxis stroke="currentColor" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value) => `${(value/1000).toFixed(0)}k`} width={40} className="text-muted-foreground opacity-70"/>
                                <Tooltip formatter={(value: number) => currency.format(value)} contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
                                <Legend verticalAlign="top" height={36} iconType="circle"/>
                                <Area type="monotone" dataKey="houseValue" name="Valeur Maison" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorNet)" />
                                <Line type="monotone" dataKey="netEquity" name="Équité Nette" stroke="#15803d" strokeWidth={3} dot={false} />
                                <Line type="monotone" dataKey="remainingBankBalance" name="Dette Restante" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth={2} dot={false} opacity={0.5} />
                            </ComposedChart>
                        </ResponsiveContainer>

                    ) : (
                        <div className="flex flex-col md:flex-row items-center justify-center h-full w-full px-4 gap-8">
                            <div className="relative w-[320px] h-[320px] flex-shrink-0">
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
                                        <Tooltip 
                                            formatter={(value: number) => currency.format(value)} 
                                            contentStyle={{ 
                                                backgroundColor: 'hsl(var(--card))', 
                                                borderColor: 'hsl(var(--border))', 
                                                borderRadius: '8px',
                                                color: 'hsl(var(--foreground))'
                                            }} 
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Total Payé</span>
                                    <span className="text-xl font-bold text-foreground">{currency.format(grandTotalOut)}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 w-full max-w-[300px]">
                                {pieData.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-border/50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-foreground">{item.name}</span>
                                                <span className="text-[10px] text-muted-foreground font-medium">{item.percent.toFixed(1)}%</span>
                                            </div>
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

        <TabsContent value="table">
            <Card className="shadow-md border-border overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b bg-muted/30">
                    <div className="flex items-center gap-4">
                        <Badge variant="secondary">{isYearlyView ? `${tableData.length} années` : `${simulation.schedule.length} mois`}</Badge>
                        <div className="flex items-center space-x-2">
                            <Switch id="view-mode" checked={isYearlyView} onCheckedChange={setIsYearlyView} />
                            <Label htmlFor="view-mode" className="text-xs font-medium cursor-pointer">Vue Annuelle</Label>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={onExport} className="gap-2 h-8 text-xs"><Download className="h-3.5 w-3.5" /> CSV</Button>
                </div>
                <div className="max-h-[500px] overflow-auto">
                    <Table>
                        <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
                            <TableRow>
                                <TableHead className="w-[100px]">{isYearlyView ? "Année" : "Mois"}</TableHead>
                                <TableHead className="text-orange-500">Frais (Loyer)</TableHead>
                                <TableHead>Capital (Parts)</TableHead>
                                <TableHead>Déboursé Total</TableHead>
                                <TableHead className="text-right">Solde Restant</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* CORRECTION ICI : Type explicite 'TableRowData' */}
                            {tableData.map((row: TableRowData, i: number) => (
                                <TableRow key={i} className={`hover:bg-muted/50 ${row.isYearly ? "font-medium" : ""}`}>
                                    <TableCell className="font-mono text-xs text-muted-foreground">{row.month}</TableCell>
                                    <TableCell className="text-orange-500 font-bold">{currency.format(row.rentPayment)}</TableCell>
                                    <TableCell className="text-primary font-bold">{currency.format(row.principalPayment)}</TableCell>
                                    <TableCell className="font-mono">{currency.format(row.totalPayment)}</TableCell>
                                    <TableCell className="text-right font-mono text-muted-foreground">{currency.format(row.remainingBankBalance)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </TabsContent>
    </Tabs>
  );
}