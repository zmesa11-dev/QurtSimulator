// // // // // // // // // // // // "use client";

// // // // // // // // // // // // import { useState, useMemo } from "react";
// // // // // // // // // // // // import { QurtubaSimulator, SimulationResult } from "@/lib/qurtuba-logic";
// // // // // // // // // // // // import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// // // // // // // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // // // // // // import { Label } from "@/components/ui/label";
// // // // // // // // // // // // import { Slider } from "@/components/ui/slider";
// // // // // // // // // // // // import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
// // // // // // // // // // // // import { ModeToggle } from "@/components/mode-toggle";
// // // // // // // // // // // // import {
// // // // // // // // // // // //   Table,
// // // // // // // // // // // //   TableBody,
// // // // // // // // // // // //   TableCell,
// // // // // // // // // // // //   TableHead,
// // // // // // // // // // // //   TableHeader,
// // // // // // // // // // // //   TableRow,
// // // // // // // // // // // // } from "@/components/ui/table"
// // // // // // // // // // // // import { Badge } from "@/components/ui/badge"

// // // // // // // // // // // // export default function Home() {
// // // // // // // // // // // //   // --- ETAT ---
// // // // // // // // // // // //   const [price, setPrice] = useState(500000);
// // // // // // // // // // // //   const [downPayment, setDownPayment] = useState(100000);
// // // // // // // // // // // //   const [durationYears, setDurationYears] = useState(25);
// // // // // // // // // // // //   // NOUVEAU : Etats pour les options avancées
// // // // // // // // // // // //   const [extraMonthly, setExtraMonthly] = useState(0);
// // // // // // // // // // // //   const [extraAnnual, setExtraAnnual] = useState(0);
  
// // // // // // // // // // // //   const rate = 5.5; 

// // // // // // // // // // // //   // --- CALCUL ---
// // // // // // // // // // // //   const { simulation, welcomeTax } = useMemo(() => {
// // // // // // // // // // // //     const safeDownPayment = Math.min(downPayment, price);
// // // // // // // // // // // //     const sim = new QurtubaSimulator(
// // // // // // // // // // // //         price, 
// // // // // // // // // // // //         safeDownPayment, 
// // // // // // // // // // // //         rate, 
// // // // // // // // // // // //         durationYears,
// // // // // // // // // // // //         extraMonthly,
// // // // // // // // // // // //         extraAnnual
// // // // // // // // // // // //     );
// // // // // // // // // // // //     return {
// // // // // // // // // // // //         simulation: sim.generateSchedule(),
// // // // // // // // // // // //         welcomeTax: sim.calculateWelcomeTax()
// // // // // // // // // // // //     };
// // // // // // // // // // // //   }, [price, downPayment, durationYears, extraMonthly, extraAnnual]);

// // // // // // // // // // // //   const currency = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

// // // // // // // // // // // //   // Calcul du temps gagné
// // // // // // // // // // // //   const monthsSaved = (durationYears * 12) - simulation.actualDurationMonths;
// // // // // // // // // // // //   const yearsSaved = Math.floor(monthsSaved / 12);
// // // // // // // // // // // //   const monthsRemainingSaved = monthsSaved % 12;

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <main className="min-h-screen bg-background p-4 md:p-8 font-sans transition-colors duration-300">
// // // // // // // // // // // //       <div className="max-w-7xl mx-auto space-y-8">
        
// // // // // // // // // // // //         {/* HEADER */}
// // // // // // // // // // // //         <header className="flex justify-between items-center border-b border-border pb-6">
// // // // // // // // // // // //           <div>
// // // // // // // // // // // //             <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
// // // // // // // // // // // //               Simulateur Qurtuba <span className="text-primary">Pro</span>
// // // // // // // // // // // //             </h1>
// // // // // // // // // // // //             <p className="text-muted-foreground mt-1">Financement Musharakah & Accélérateur</p>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //           <ModeToggle />
// // // // // // // // // // // //         </header>

// // // // // // // // // // // //         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
// // // // // // // // // // // //           {/* --- GAUCHE : CONTRÔLES --- */}
// // // // // // // // // // // //           <div className="lg:col-span-4 sticky top-8 space-y-6">
            
// // // // // // // // // // // //             {/* 1. CONFIGURATION DE BASE */}
// // // // // // // // // // // //             <Card className="shadow-xl border-border bg-card/50 backdrop-blur-sm">
// // // // // // // // // // // //               <CardHeader>
// // // // // // // // // // // //                 <CardTitle>Paramètres du projet</CardTitle>
// // // // // // // // // // // //               </CardHeader>
// // // // // // // // // // // //               <CardContent className="space-y-6">
                
// // // // // // // // // // // //                 <div className="space-y-3">
// // // // // // // // // // // //                    <div className="flex justify-between items-baseline">
// // // // // // // // // // // //                       <Label htmlFor="price">Prix maison</Label>
// // // // // // // // // // // //                       <span className="text-lg font-bold text-primary">{currency.format(price)}</span>
// // // // // // // // // // // //                   </div>
// // // // // // // // // // // //                   <Slider id="price" min={100000} max={1500000} step={5000} value={[price]} onValueChange={(v) => setPrice(v[0])} />
// // // // // // // // // // // //                 </div>

// // // // // // // // // // // //                  <div className="space-y-3">
// // // // // // // // // // // //                    <div className="flex justify-between items-baseline">
// // // // // // // // // // // //                       <Label htmlFor="downPayment">Votre Apport</Label>
// // // // // // // // // // // //                       <span className="text-lg font-bold text-green-500">{currency.format(downPayment)}</span>
// // // // // // // // // // // //                   </div>
// // // // // // // // // // // //                    <Slider id="downPayment" min={0} max={price} step={1000} value={[downPayment]} onValueChange={(v) => setDownPayment(v[0])} />
// // // // // // // // // // // //                 </div>

// // // // // // // // // // // //                  <div className="space-y-3">
// // // // // // // // // // // //                    <div className="flex justify-between items-baseline">
// // // // // // // // // // // //                       <Label htmlFor="duration">Durée initiale</Label>
// // // // // // // // // // // //                       <span className="text-lg font-bold">{durationYears} ans</span>
// // // // // // // // // // // //                   </div>
// // // // // // // // // // // //                    <Slider id="duration" min={1} max={30} step={1} value={[durationYears]} onValueChange={(v) => setDurationYears(v[0])} />
// // // // // // // // // // // //                 </div>

// // // // // // // // // // // //               </CardContent>
// // // // // // // // // // // //             </Card>

// // // // // // // // // // // //             {/* 2. ACCÉLÉRATEUR (NOUVEAU) */}
// // // // // // // // // // // //             <Card className="shadow-xl border-primary/20 bg-primary/5 backdrop-blur-sm">
// // // // // // // // // // // //               <CardHeader>
// // // // // // // // // // // //                 <CardTitle className="text-primary flex items-center gap-2">
// // // // // // // // // // // //                     🚀 Accélérateur
// // // // // // // // // // // //                 </CardTitle>
// // // // // // // // // // // //                 <CardDescription>Simulez des paiements anticipés</CardDescription>
// // // // // // // // // // // //               </CardHeader>
// // // // // // // // // // // //               <CardContent className="space-y-6">
                
// // // // // // // // // // // //                 <div className="space-y-3">
// // // // // // // // // // // //                    <div className="flex justify-between items-baseline">
// // // // // // // // // // // //                       <Label>Ajout Mensuel</Label>
// // // // // // // // // // // //                       <span className="font-bold text-primary">+{currency.format(extraMonthly)}/mois</span>
// // // // // // // // // // // //                   </div>
// // // // // // // // // // // //                   <Slider min={0} max={2000} step={50} value={[extraMonthly]} onValueChange={(v) => setExtraMonthly(v[0])} />
// // // // // // // // // // // //                 </div>

// // // // // // // // // // // //                 <div className="space-y-3">
// // // // // // // // // // // //                    <div className="flex justify-between items-baseline">
// // // // // // // // // // // //                       <Label>Ajout Annuel (Lump Sum)</Label>
// // // // // // // // // // // //                       <span className="font-bold text-primary">+{currency.format(extraAnnual)}/an</span>
// // // // // // // // // // // //                   </div>
// // // // // // // // // // // //                   <Slider min={0} max={20000} step={500} value={[extraAnnual]} onValueChange={(v) => setExtraAnnual(v[0])} />
// // // // // // // // // // // //                   <p className="text-xs text-muted-foreground">Ex: Retour d&apos;impôt ou bonus annuel</p>
// // // // // // // // // // // //                 </div>

// // // // // // // // // // // //               </CardContent>
// // // // // // // // // // // //             </Card>

// // // // // // // // // // // //             {/* 3. INFO CASHFLOW (NOUVEAU) */}
// // // // // // // // // // // //             <Card className="shadow-md border-border bg-card/30">
// // // // // // // // // // // //                 <CardHeader className="pb-2"><CardTitle className="text-sm">Cash requis à l&apos;achat</CardTitle></CardHeader>
// // // // // // // // // // // //                 <CardContent className="space-y-2 text-sm">
// // // // // // // // // // // //                     <div className="flex justify-between">
// // // // // // // // // // // //                         <span className="text-muted-foreground">Mise de fonds</span>
// // // // // // // // // // // //                         <span>{currency.format(downPayment)}</span>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                     <div className="flex justify-between">
// // // // // // // // // // // //                         <span className="text-muted-foreground">Taxe Bienvenue (Est.)</span>
// // // // // // // // // // // //                         <span>{currency.format(welcomeTax)}</span>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                      <div className="flex justify-between pt-2 border-t border-border font-bold">
// // // // // // // // // // // //                         <span>Total Requis</span>
// // // // // // // // // // // //                         <span>{currency.format(downPayment + welcomeTax)}</span>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                 </CardContent>
// // // // // // // // // // // //             </Card>

// // // // // // // // // // // //           </div>

// // // // // // // // // // // //           {/* --- DROITE : RÉSULTATS --- */}
// // // // // // // // // // // //           <div className="lg:col-span-8 space-y-8">
            
// // // // // // // // // // // //             {/* KPI CARDS */}
// // // // // // // // // // // //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // // // // // // // // //                 <Card className="bg-primary/10 border-primary/20 shadow-[0_0_30px_-10px_hsl(var(--primary)/0.3)]">
// // // // // // // // // // // //                     <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-primary">Mensualité Totale</CardTitle></CardHeader>
// // // // // // // // // // // //                     <CardContent>
// // // // // // // // // // // //                         <div className="text-3xl font-bold text-primary">{currency.format(simulation.monthlyPaymentFixed + extraMonthly)}</div>
// // // // // // // // // // // //                         {extraMonthly > 0 && <Badge variant="secondary" className="mt-1 bg-primary/20 text-primary border-0">Dont {currency.format(extraMonthly)} extra</Badge>}
// // // // // // // // // // // //                     </CardContent>
// // // // // // // // // // // //                 </Card>
                
// // // // // // // // // // // //                  <Card className="bg-card/50 shadow-[0_0_30px_-10px_hsl(var(--foreground)/0.1)]">
// // // // // // // // // // // //                     <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Économies d&apos;intérêts</CardTitle></CardHeader>
// // // // // // // // // // // //                     <CardContent>
// // // // // // // // // // // //                         <div className={`text-2xl font-bold ${simulation.interestSaved > 0 ? 'text-green-500' : 'text-foreground'}`}>
// // // // // // // // // // // //                             {currency.format(simulation.interestSaved)}
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                         {simulation.interestSaved > 0 && <p className="text-xs text-green-500/80 mt-1">Argent sauvé grâce aux extras</p>}
// // // // // // // // // // // //                     </CardContent>
// // // // // // // // // // // //                 </Card>
                
// // // // // // // // // // // //                 <Card className="bg-card/50 border-destructive/20 shadow-[0_0_30px_-10px_hsl(var(--destructive)/0.3)]">
// // // // // // // // // // // //                     <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Durée Réelle</CardTitle></CardHeader>
// // // // // // // // // // // //                     <CardContent>
// // // // // // // // // // // //                         <div className="text-2xl font-bold flex items-baseline gap-2">
// // // // // // // // // // // //                             {Math.floor(simulation.actualDurationMonths / 12)} ans {simulation.actualDurationMonths % 12} mois
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                          {monthsSaved > 0 && (
// // // // // // // // // // // //                              <p className="text-xs text-primary font-bold mt-1">
// // // // // // // // // // // //                                  🚀 Gagné: {yearsSaved} ans {monthsRemainingSaved} mois
// // // // // // // // // // // //                              </p>
// // // // // // // // // // // //                          )}
// // // // // // // // // // // //                     </CardContent>
// // // // // // // // // // // //                 </Card>
// // // // // // // // // // // //             </div>

// // // // // // // // // // // //              {/* GRAPHIQUE */}
// // // // // // // // // // // //              <Card className="shadow-xl border-border p-1 bg-card/50 backdrop-blur-sm">
// // // // // // // // // // // //               <CardHeader>
// // // // // // // // // // // //                 <CardTitle>Projection du capital</CardTitle>
// // // // // // // // // // // //                 <p className="text-sm text-muted-foreground">
// // // // // // // // // // // //                   Voyez comment votre capital (bleu) grandit face au coût du loyer (orange).
// // // // // // // // // // // //                 </p>
// // // // // // // // // // // //               </CardHeader>
// // // // // // // // // // // //               <CardContent className="h-[350px] pl-0">
// // // // // // // // // // // //                 <ResponsiveContainer width="100%" height="100%">
// // // // // // // // // // // //                   <AreaChart data={simulation.schedule} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
// // // // // // // // // // // //                     <defs>
// // // // // // // // // // // //                       <linearGradient id="colorRent" x1="0" y1="0" x2="0" y2="1">
// // // // // // // // // // // //                         <stop offset="5%" stopColor="var(--destructive)" stopOpacity={0.8}/>
// // // // // // // // // // // //                         <stop offset="95%" stopColor="var(--destructive)" stopOpacity={0}/>
// // // // // // // // // // // //                       </linearGradient>
// // // // // // // // // // // //                       <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
// // // // // // // // // // // //                         <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
// // // // // // // // // // // //                         <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
// // // // // // // // // // // //                       </linearGradient>
// // // // // // // // // // // //                     </defs>
// // // // // // // // // // // //                     <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} stroke="var(--border)" />
// // // // // // // // // // // //                     <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} />
// // // // // // // // // // // //                     <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} />
// // // // // // // // // // // //                     <Tooltip 
// // // // // // // // // // // //                         formatter={(value: number) => currency.format(value)}
// // // // // // // // // // // //                         labelFormatter={(label) => `Mois ${label} (An ${Math.floor(label/12) + 1})`}
// // // // // // // // // // // //                         contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--foreground)' }}
// // // // // // // // // // // //                     />
// // // // // // // // // // // //                     <Legend verticalAlign="top" height={36}/>
// // // // // // // // // // // //                     <Area type="monotone" dataKey="rentPayment" name="Loyer Payé" stroke="var(--destructive)" fillOpacity={1} fill="url(#colorRent)" stackId="1" />
// // // // // // // // // // // //                     <Area type="monotone" dataKey="principalPayment" name="Capital Remboursé" stroke="var(--primary)" fillOpacity={1} fill="url(#colorPrincipal)" stackId="1" />
// // // // // // // // // // // //                   </AreaChart>
// // // // // // // // // // // //                 </ResponsiveContainer>
// // // // // // // // // // // //               </CardContent>
// // // // // // // // // // // //             </Card>

// // // // // // // // // // // //             {/* TABLEAU */}
// // // // // // // // // // // //             <Card className="shadow-lg border-border bg-card/50 backdrop-blur-sm">
// // // // // // // // // // // //                 <CardHeader><CardTitle>Tableau détaillé</CardTitle></CardHeader>
// // // // // // // // // // // //                 <CardContent className="p-0">
// // // // // // // // // // // //                     <div className="h-[400px] overflow-auto relative rounded-b-lg">
// // // // // // // // // // // //                         <Table>
// // // // // // // // // // // //                             <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
// // // // // // // // // // // //                                 <TableRow>
// // // // // // // // // // // //                                     <TableHead className="w-[80px]">Mois</TableHead>
// // // // // // // // // // // //                                     <TableHead>Loyer</TableHead>
// // // // // // // // // // // //                                     <TableHead>Capital</TableHead>
// // // // // // // // // // // //                                     <TableHead>Total</TableHead>
// // // // // // // // // // // //                                     <TableHead className="text-right">Solde Banque</TableHead>
// // // // // // // // // // // //                                 </TableRow>
// // // // // // // // // // // //                             </TableHeader>
// // // // // // // // // // // //                             <TableBody>
// // // // // // // // // // // //                                 {simulation.schedule.map((row) => (
// // // // // // // // // // // //                                     <TableRow key={row.month} className="hover:bg-muted/50 border-border">
// // // // // // // // // // // //                                         <TableCell className="font-medium text-muted-foreground">{row.month}</TableCell>
// // // // // // // // // // // //                                         <TableCell className="text-orange-500">{currency.format(row.rentPayment)}</TableCell>
// // // // // // // // // // // //                                         <TableCell className="text-primary font-bold">{currency.format(row.principalPayment)}</TableCell>
// // // // // // // // // // // //                                         <TableCell>{currency.format(row.totalPayment)}</TableCell>
// // // // // // // // // // // //                                         <TableCell className="text-right text-muted-foreground">{currency.format(row.remainingBankBalance)}</TableCell>
// // // // // // // // // // // //                                     </TableRow>
// // // // // // // // // // // //                                 ))}
// // // // // // // // // // // //                             </TableBody>
// // // // // // // // // // // //                         </Table>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                 </CardContent>
// // // // // // // // // // // //             </Card>

// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     </main>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }
// // // // // // // // // // // "use client";

// // // // // // // // // // // import { useState, useMemo } from "react";
// // // // // // // // // // // import { QurtubaSimulator, SimulationResult } from "@/lib/qurtuba-logic";
// // // // // // // // // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // // // // // import { Label } from "@/components/ui/label";
// // // // // // // // // // // import { Slider } from "@/components/ui/slider";
// // // // // // // // // // // import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
// // // // // // // // // // // import { ModeToggle } from "@/components/mode-toggle";
// // // // // // // // // // // import {
// // // // // // // // // // //   Table,
// // // // // // // // // // //   TableBody,
// // // // // // // // // // //   TableCell,
// // // // // // // // // // //   TableHead,
// // // // // // // // // // //   TableHeader,
// // // // // // // // // // //   TableRow,
// // // // // // // // // // // } from "@/components/ui/table"
// // // // // // // // // // // import { Badge } from "@/components/ui/badge"
// // // // // // // // // // // import { Separator } from "@/components/ui/separator"
// // // // // // // // // // // import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// // // // // // // // // // // import { AlertCircle } from "lucide-react"

// // // // // // // // // // // export default function Home() {
// // // // // // // // // // //   const [price, setPrice] = useState(500000);
// // // // // // // // // // //   const [downPayment, setDownPayment] = useState(100000);
// // // // // // // // // // //   const [durationYears, setDurationYears] = useState(25);
// // // // // // // // // // //   const [extraMonthly, setExtraMonthly] = useState(0);
// // // // // // // // // // //   const [extraAnnual, setExtraAnnual] = useState(0);
// // // // // // // // // // //   const [municipalTax, setMunicipalTax] = useState(3000);
// // // // // // // // // // //   const [schoolTax, setSchoolTax] = useState(350);
// // // // // // // // // // //   const [insurance, setInsurance] = useState(1200);
  
// // // // // // // // // // //   const rate = 5.5; 

// // // // // // // // // // //   const { simulation, welcomeTax, notaryFees, startupFees } = useMemo(() => {
// // // // // // // // // // //     // On passe le vrai downPayment même s'il est bas, pour que le validateur puisse le rejeter
// // // // // // // // // // //     const sim = new QurtubaSimulator(price, downPayment, rate, durationYears, extraMonthly, extraAnnual);
// // // // // // // // // // //     return {
// // // // // // // // // // //         simulation: sim.generateSchedule(),
// // // // // // // // // // //         welcomeTax: sim.calculateWelcomeTax(),
// // // // // // // // // // //         notaryFees: sim.calculateNotaryFees(),
// // // // // // // // // // //         startupFees: sim.calculateStartupFees()
// // // // // // // // // // //     };
// // // // // // // // // // //   }, [price, downPayment, durationYears, extraMonthly, extraAnnual]);

// // // // // // // // // // //   const currency = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

// // // // // // // // // // //   // Si la simulation n'est pas conforme, on bloque l'affichage des résultats
// // // // // // // // // // //   if (!simulation.isCompliant) {
// // // // // // // // // // //       // Calcul du cash requis théorique
// // // // // // // // // // //       const cashForNonCompliant = downPayment + welcomeTax + notaryFees + startupFees;
      
// // // // // // // // // // //       return (
// // // // // // // // // // //         <main className="min-h-screen bg-background p-4 md:p-8 font-sans">
// // // // // // // // // // //              <div className="max-w-7xl mx-auto space-y-8">
// // // // // // // // // // //                  <header className="flex justify-between items-center border-b border-border pb-6">
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                         <h1 className="text-3xl font-extrabold text-foreground">Simulateur Qurtuba <span className="text-primary">Ultimate</span></h1>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <ModeToggle />
// // // // // // // // // // //                  </header>

// // // // // // // // // // //                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
// // // // // // // // // // //                      <div className="lg:col-span-4 space-y-6">
// // // // // // // // // // //                          <Card className="shadow-xl border-destructive/50 bg-destructive/5">
// // // // // // // // // // //                              <CardHeader><CardTitle className="text-destructive">Règles non respectées</CardTitle></CardHeader>
// // // // // // // // // // //                              <CardContent className="space-y-4">
// // // // // // // // // // //                                 <div className="space-y-2">
// // // // // // // // // // //                                     <Label>Prix maison</Label>
// // // // // // // // // // //                                     <Slider min={100000} max={1500000} step={5000} value={[price]} onValueChange={(v) => setPrice(v[0])} />
// // // // // // // // // // //                                     <div className="text-right font-bold">{currency.format(price)}</div>
// // // // // // // // // // //                                 </div>
// // // // // // // // // // //                                 <div className="space-y-2">
// // // // // // // // // // //                                     <Label>Votre Apport</Label>
// // // // // // // // // // //                                     <Slider min={0} max={price} step={1000} value={[downPayment]} onValueChange={(v) => setDownPayment(v[0])} />
// // // // // // // // // // //                                     <div className="text-right font-bold text-destructive">{currency.format(downPayment)}</div>
// // // // // // // // // // //                                 </div>
// // // // // // // // // // //                              </CardContent>
// // // // // // // // // // //                          </Card>
// // // // // // // // // // //                      </div>
// // // // // // // // // // //                      <div className="lg:col-span-8">
// // // // // // // // // // //                          <Alert variant="destructive" className="border-destructive/50 bg-destructive/10 text-destructive dark:text-red-400">
// // // // // // // // // // //                             <AlertCircle className="h-4 w-4" />
// // // // // // // // // // //                             <AlertTitle>Financement Impossible</AlertTitle>
// // // // // // // // // // //                             <AlertDescription className="mt-2 text-lg font-medium">
// // // // // // // // // // //                                 {simulation.complianceError}
// // // // // // // // // // //                             </AlertDescription>
// // // // // // // // // // //                             <div className="mt-4 text-sm opacity-90">
// // // // // // // // // // //                                 Selon les règles Qurtuba : Le financement est plafonné à 400 000$ et l&apos;apport minimum est de 20%.
// // // // // // // // // // //                             </div>
// // // // // // // // // // //                         </Alert>
// // // // // // // // // // //                      </div>
// // // // // // // // // // //                  </div>
// // // // // // // // // // //              </div>
// // // // // // // // // // //         </main>
// // // // // // // // // // //       );
// // // // // // // // // // //   }

// // // // // // // // // // //   // --- RENDU NORMAL SI CONFORME ---
// // // // // // // // // // //   const monthsSaved = (durationYears * 12) - simulation.actualDurationMonths;
// // // // // // // // // // //   const totalCashRequired = downPayment + welcomeTax + notaryFees + startupFees;
// // // // // // // // // // //   const monthlyCharges = (municipalTax + schoolTax + insurance) / 12;
// // // // // // // // // // //   const totalMonthlyOutPocket = simulation.monthlyPaymentFixed + extraMonthly + monthlyCharges;

// // // // // // // // // // //   return (
// // // // // // // // // // //     <main className="min-h-screen bg-background p-4 md:p-8 font-sans transition-colors duration-300">
// // // // // // // // // // //       <div className="max-w-7xl mx-auto space-y-8">
        
// // // // // // // // // // //         {/* HEADER */}
// // // // // // // // // // //         <header className="flex justify-between items-center border-b border-border pb-6">
// // // // // // // // // // //           <div>
// // // // // // // // // // //             <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
// // // // // // // // // // //               Simulateur Qurtuba <span className="text-primary">Ultimate</span>
// // // // // // // // // // //             </h1>
// // // // // // // // // // //             <p className="text-muted-foreground mt-1">Conforme aux règles officielles 2024-2025</p>
// // // // // // // // // // //           </div>
// // // // // // // // // // //           <ModeToggle />
// // // // // // // // // // //         </header>

// // // // // // // // // // //         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
// // // // // // // // // // //           {/* --- GAUCHE --- */}
// // // // // // // // // // //           <div className="lg:col-span-4 sticky top-8 space-y-6">
            
// // // // // // // // // // //             <Card className="shadow-xl border-border bg-card/50 backdrop-blur-sm">
// // // // // // // // // // //               <CardHeader className="pb-4"><CardTitle>1. Financement</CardTitle></CardHeader>
// // // // // // // // // // //               <CardContent className="space-y-5">
// // // // // // // // // // //                 <div className="space-y-3">
// // // // // // // // // // //                    <div className="flex justify-between items-baseline">
// // // // // // // // // // //                       <Label>Prix maison</Label>
// // // // // // // // // // //                       <span className="font-bold text-primary">{currency.format(price)}</span>
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                   <Slider min={100000} max={1500000} step={5000} value={[price]} onValueChange={(v) => setPrice(v[0])} />
// // // // // // // // // // //                 </div>
// // // // // // // // // // //                  <div className="space-y-3">
// // // // // // // // // // //                    <div className="flex justify-between items-baseline">
// // // // // // // // // // //                       <Label>Votre Apport</Label>
// // // // // // // // // // //                       <span className="font-bold text-green-500">{currency.format(downPayment)}</span>
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                    <Slider min={0} max={price} step={1000} value={[downPayment]} onValueChange={(v) => setDownPayment(v[0])} />
// // // // // // // // // // //                    <div className="text-xs text-muted-foreground text-right">Min requis: {currency.format(simulation.minDownPaymentRequired)}</div>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //                  <div className="space-y-3">
// // // // // // // // // // //                    <div className="flex justify-between items-baseline">
// // // // // // // // // // //                       <Label>Durée</Label>
// // // // // // // // // // //                       <span className="font-bold">{durationYears} ans</span>
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                    <Slider min={1} max={30} step={1} value={[durationYears]} onValueChange={(v) => setDurationYears(v[0])} />
// // // // // // // // // // //                 </div>
// // // // // // // // // // //               </CardContent>
// // // // // // // // // // //             </Card>

// // // // // // // // // // //             <Card className="shadow-md border-border bg-card/30">
// // // // // // // // // // //               <CardHeader className="pb-4"><CardTitle className="text-base">2. Taxes & Assurances (Annuel)</CardTitle></CardHeader>
// // // // // // // // // // //               <CardContent className="space-y-4">
// // // // // // // // // // //                  <div className="grid grid-cols-2 gap-4">
// // // // // // // // // // //                     <div className="space-y-2"><Label className="text-xs text-muted-foreground">Taxe Municipale</Label><Input type="number" value={municipalTax} onChange={(e) => setMunicipalTax(Number(e.target.value))} className="h-8" /></div>
// // // // // // // // // // //                     <div className="space-y-2"><Label className="text-xs text-muted-foreground">Taxe Scolaire</Label><Input type="number" value={schoolTax} onChange={(e) => setSchoolTax(Number(e.target.value))} className="h-8" /></div>
// // // // // // // // // // //                  </div>
// // // // // // // // // // //                  <div className="space-y-2"><Label className="text-xs text-muted-foreground">Assurance Habitation</Label><Input type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} className="h-8" /></div>
// // // // // // // // // // //               </CardContent>
// // // // // // // // // // //             </Card>

// // // // // // // // // // //             <Card className="shadow-lg border-primary/20 bg-primary/5">
// // // // // // // // // // //               <CardHeader className="pb-4"><CardTitle className="text-primary text-base flex items-center gap-2">🚀 Accélérateur</CardTitle></CardHeader>
// // // // // // // // // // //               <CardContent className="space-y-4">
// // // // // // // // // // //                 <div className="space-y-2">
// // // // // // // // // // //                    <div className="flex justify-between text-sm"><Label>Extra Mensuel</Label><span className="font-bold text-primary">+{currency.format(extraMonthly)}</span></div>
// // // // // // // // // // //                    <Slider min={0} max={2000} step={50} value={[extraMonthly]} onValueChange={(v) => setExtraMonthly(v[0])} />
// // // // // // // // // // //                 </div>
// // // // // // // // // // //               </CardContent>
// // // // // // // // // // //             </Card>

// // // // // // // // // // //             <Card className="shadow-sm border-border bg-card/20">
// // // // // // // // // // //                 <CardHeader className="pb-2"><CardTitle className="text-sm">Cash Day 1 (Requis)</CardTitle></CardHeader>
// // // // // // // // // // //                 <CardContent className="space-y-1 text-sm">
// // // // // // // // // // //                     <div className="flex justify-between"><span className="text-muted-foreground">Mise de fonds</span><span>{currency.format(downPayment)}</span></div>
// // // // // // // // // // //                     <div className="flex justify-between"><span className="text-muted-foreground">Taxe Bienvenue</span><span>{currency.format(welcomeTax)}</span></div>
// // // // // // // // // // //                     <div className="flex justify-between"><span className="text-muted-foreground">Notaire + Ajust.</span><span>{currency.format(notaryFees)}</span></div>
// // // // // // // // // // //                     <div className="flex justify-between"><span className="text-muted-foreground">Insp. + Éval.</span><span>{currency.format(startupFees)}</span></div>
// // // // // // // // // // //                      <Separator className="my-2" />
// // // // // // // // // // //                      <div className="flex justify-between font-bold"><span>Total Requis</span><span className="text-primary">{currency.format(totalCashRequired)}</span></div>
// // // // // // // // // // //                 </CardContent>
// // // // // // // // // // //             </Card>
// // // // // // // // // // //           </div>

// // // // // // // // // // //           {/* --- DROITE --- */}
// // // // // // // // // // //           <div className="lg:col-span-8 space-y-6">
// // // // // // // // // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // // // // // // //                 <Card className="bg-card/50 shadow-sm">
// // // // // // // // // // //                     <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Paiement Qurtuba (Seul)</CardTitle></CardHeader>
// // // // // // // // // // //                     <CardContent>
// // // // // // // // // // //                         <div className="text-2xl font-bold text-foreground">{currency.format(simulation.monthlyPaymentFixed + extraMonthly)}</div>
// // // // // // // // // // //                         <p className="text-xs text-muted-foreground">Loyer + Capital</p>
// // // // // // // // // // //                     </CardContent>
// // // // // // // // // // //                 </Card>
// // // // // // // // // // //                  <Card className="bg-primary/10 border-primary/30 shadow-[0_0_30px_-10px_hsl(var(--primary)/0.3)]">
// // // // // // // // // // //                     <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-primary">Budget Mensuel TOTAL</CardTitle></CardHeader>
// // // // // // // // // // //                     <CardContent>
// // // // // // // // // // //                         <div className="text-3xl font-bold text-primary">{currency.format(totalMonthlyOutPocket)}</div>
// // // // // // // // // // //                         <div className="flex gap-2 mt-1">
// // // // // // // // // // //                             <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">Qurtuba: {currency.format(simulation.monthlyPaymentFixed + extraMonthly)}</Badge>
// // // // // // // // // // //                             <Badge variant="outline" className="text-[10px] border-orange-500/30 text-orange-600 dark:text-orange-400">Charges: {currency.format(monthlyCharges)}</Badge>
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                     </CardContent>
// // // // // // // // // // //                 </Card>
// // // // // // // // // // //             </div>

// // // // // // // // // // //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // // // // // // // //                  <Card className="bg-card/50 shadow-sm">
// // // // // // // // // // //                     <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Intérêts Payés</CardTitle></CardHeader>
// // // // // // // // // // //                     <CardContent><div className="text-xl font-bold text-orange-500">{currency.format(simulation.totalInterestPaid)}</div></CardContent>
// // // // // // // // // // //                 </Card>
// // // // // // // // // // //                  <Card className="bg-card/50 shadow-sm">
// // // // // // // // // // //                     <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Économies (Extras)</CardTitle></CardHeader>
// // // // // // // // // // //                     <CardContent><div className="text-xl font-bold text-green-500">{currency.format(simulation.interestSaved)}</div></CardContent>
// // // // // // // // // // //                 </Card>
// // // // // // // // // // //                 <Card className="bg-card/50 shadow-sm">
// // // // // // // // // // //                     <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Durée Réelle</CardTitle></CardHeader>
// // // // // // // // // // //                     <CardContent><div className="text-xl font-bold">{Math.floor(simulation.actualDurationMonths / 12)} ans {simulation.actualDurationMonths % 12} mois</div></CardContent>
// // // // // // // // // // //                 </Card>
// // // // // // // // // // //             </div>

// // // // // // // // // // //              <Card className="shadow-xl border-border p-1 bg-card/50 backdrop-blur-sm">
// // // // // // // // // // //               <CardHeader><CardTitle>Projection du capital</CardTitle></CardHeader>
// // // // // // // // // // //               <CardContent className="h-[350px] pl-0">
// // // // // // // // // // //                 <ResponsiveContainer width="100%" height="100%">
// // // // // // // // // // //                   <AreaChart data={simulation.schedule} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
// // // // // // // // // // //                     <defs>
// // // // // // // // // // //                       <linearGradient id="colorRent" x1="0" y1="0" x2="0" y2="1">
// // // // // // // // // // //                         <stop offset="5%" stopColor="var(--destructive)" stopOpacity={0.8}/>
// // // // // // // // // // //                         <stop offset="95%" stopColor="var(--destructive)" stopOpacity={0}/>
// // // // // // // // // // //                       </linearGradient>
// // // // // // // // // // //                       <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
// // // // // // // // // // //                         <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
// // // // // // // // // // //                         <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
// // // // // // // // // // //                       </linearGradient>
// // // // // // // // // // //                     </defs>
// // // // // // // // // // //                     <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} stroke="var(--border)" />
// // // // // // // // // // //                     <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} />
// // // // // // // // // // //                     <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} />
// // // // // // // // // // //                     <Tooltip formatter={(value: number) => currency.format(value)} labelFormatter={(label) => `Mois ${label}`} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }} />
// // // // // // // // // // //                     <Legend verticalAlign="top" height={36}/>
// // // // // // // // // // //                     <Area type="monotone" dataKey="rentPayment" name="Loyer Payé" stroke="var(--destructive)" fillOpacity={1} fill="url(#colorRent)" stackId="1" />
// // // // // // // // // // //                     <Area type="monotone" dataKey="principalPayment" name="Capital Remboursé" stroke="var(--primary)" fillOpacity={1} fill="url(#colorPrincipal)" stackId="1" />
// // // // // // // // // // //                   </AreaChart>
// // // // // // // // // // //                 </ResponsiveContainer>
// // // // // // // // // // //               </CardContent>
// // // // // // // // // // //             </Card>

// // // // // // // // // // //             <Card className="shadow-lg border-border bg-card/50 backdrop-blur-sm">
// // // // // // // // // // //                 <CardHeader><CardTitle>Tableau détaillé</CardTitle></CardHeader>
// // // // // // // // // // //                 <CardContent className="p-0">
// // // // // // // // // // //                     <div className="h-[400px] overflow-auto relative rounded-b-lg">
// // // // // // // // // // //                         <Table>
// // // // // // // // // // //                             <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
// // // // // // // // // // //                                 <TableRow>
// // // // // // // // // // //                                     <TableHead className="w-[80px]">Mois</TableHead>
// // // // // // // // // // //                                     <TableHead>Loyer</TableHead>
// // // // // // // // // // //                                     <TableHead>Capital</TableHead>
// // // // // // // // // // //                                     <TableHead>Total</TableHead>
// // // // // // // // // // //                                     <TableHead className="text-right">Solde Banque</TableHead>
// // // // // // // // // // //                                 </TableRow>
// // // // // // // // // // //                             </TableHeader>
// // // // // // // // // // //                             <TableBody>
// // // // // // // // // // //                                 {simulation.schedule.map((row) => (
// // // // // // // // // // //                                     <TableRow key={row.month} className="hover:bg-muted/50 border-border">
// // // // // // // // // // //                                         <TableCell className="font-medium text-muted-foreground">{row.month}</TableCell>
// // // // // // // // // // //                                         <TableCell className="text-orange-500">{currency.format(row.rentPayment)}</TableCell>
// // // // // // // // // // //                                         <TableCell className="text-primary font-bold">{currency.format(row.principalPayment)}</TableCell>
// // // // // // // // // // //                                         <TableCell>{currency.format(row.totalPayment)}</TableCell>
// // // // // // // // // // //                                         <TableCell className="text-right text-muted-foreground">{currency.format(row.remainingBankBalance)}</TableCell>
// // // // // // // // // // //                                     </TableRow>
// // // // // // // // // // //                                 ))}
// // // // // // // // // // //                             </TableBody>
// // // // // // // // // // //                         </Table>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                 </CardContent>
// // // // // // // // // // //             </Card>

// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </main>
// // // // // // // // // // //   );
// // // // // // // // // // // }
// // // // // // // // // // "use client";

// // // // // // // // // // import { useState, useMemo } from "react";
// // // // // // // // // // import { QurtubaSimulator, SimulationResult } from "@/lib/qurtuba-logic";
// // // // // // // // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // // // // import { Label } from "@/components/ui/label";
// // // // // // // // // // import { Slider } from "@/components/ui/slider";
// // // // // // // // // // import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
// // // // // // // // // // import { ModeToggle } from "@/components/mode-toggle";
// // // // // // // // // // import {
// // // // // // // // // //   Table,
// // // // // // // // // //   TableBody,
// // // // // // // // // //   TableCell,
// // // // // // // // // //   TableHead,
// // // // // // // // // //   TableHeader,
// // // // // // // // // //   TableRow,
// // // // // // // // // // } from "@/components/ui/table"
// // // // // // // // // // import { Badge } from "@/components/ui/badge"
// // // // // // // // // // import { Separator } from "@/components/ui/separator"
// // // // // // // // // // import { AlertCircle, Lock } from "lucide-react" // On utilise l'icône cadenas

// // // // // // // // // // export default function Home() {
// // // // // // // // // //   const [price, setPrice] = useState(500000);
// // // // // // // // // //   const [downPayment, setDownPayment] = useState(100000);
// // // // // // // // // //   const [durationYears, setDurationYears] = useState(25);
// // // // // // // // // //   const [extraMonthly, setExtraMonthly] = useState(0);
// // // // // // // // // //   const [extraAnnual, setExtraAnnual] = useState(0);
// // // // // // // // // //   const [municipalTax, setMunicipalTax] = useState(3000);
// // // // // // // // // //   const [schoolTax, setSchoolTax] = useState(350);
// // // // // // // // // //   const [insurance, setInsurance] = useState(1200);
  
// // // // // // // // // //   const rate = 5.5; 

// // // // // // // // // //   const { simulation, welcomeTax, notaryFees, startupFees } = useMemo(() => {
// // // // // // // // // //     const sim = new QurtubaSimulator(price, downPayment, rate, durationYears, extraMonthly, extraAnnual);
// // // // // // // // // //     return {
// // // // // // // // // //         simulation: sim.generateSchedule(),
// // // // // // // // // //         welcomeTax: sim.calculateWelcomeTax(),
// // // // // // // // // //         notaryFees: sim.calculateNotaryFees(),
// // // // // // // // // //         startupFees: sim.calculateStartupFees()
// // // // // // // // // //     };
// // // // // // // // // //   }, [price, downPayment, durationYears, extraMonthly, extraAnnual]);

// // // // // // // // // //   const currency = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

// // // // // // // // // //   const monthsSaved = (durationYears * 12) - simulation.actualDurationMonths;
// // // // // // // // // //   const totalCashRequired = downPayment + welcomeTax + notaryFees + startupFees;
// // // // // // // // // //   const monthlyCharges = (municipalTax + schoolTax + insurance) / 12;
// // // // // // // // // //   const totalMonthlyOutPocket = simulation.monthlyPaymentFixed + extraMonthly + monthlyCharges;

// // // // // // // // // //   return (
// // // // // // // // // //     <main className="min-h-screen bg-background p-4 md:p-8 font-sans transition-colors duration-300">
// // // // // // // // // //       <div className="max-w-7xl mx-auto space-y-8">
        
// // // // // // // // // //         {/* HEADER */}
// // // // // // // // // //         <header className="flex justify-between items-center border-b border-border pb-6">
// // // // // // // // // //           <div>
// // // // // // // // // //             <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
// // // // // // // // // //               Simulateur Qurtuba <span className="text-primary">Ultimate</span>
// // // // // // // // // //             </h1>
// // // // // // // // // //             <p className="text-muted-foreground mt-1">Conforme aux règles officielles 2024-2025</p>
// // // // // // // // // //           </div>
// // // // // // // // // //           <ModeToggle />
// // // // // // // // // //         </header>

// // // // // // // // // //         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
// // // // // // // // // //           {/* --- GAUCHE : CONTRÔLES (Toujours visibles & utilisables) --- */}
// // // // // // // // // //           <div className="lg:col-span-4 sticky top-8 space-y-6">
            
// // // // // // // // // //             <Card className={`shadow-xl border-border bg-card/50 backdrop-blur-sm transition-colors ${!simulation.isCompliant ? "border-destructive/50 ring-1 ring-destructive/20" : ""}`}>
// // // // // // // // // //               <CardHeader className="pb-4"><CardTitle>1. Financement</CardTitle></CardHeader>
// // // // // // // // // //               <CardContent className="space-y-5">
// // // // // // // // // //                 <div className="space-y-3">
// // // // // // // // // //                    <div className="flex justify-between items-baseline">
// // // // // // // // // //                       <Label>Prix maison</Label>
// // // // // // // // // //                       <span className="font-bold text-primary">{currency.format(price)}</span>
// // // // // // // // // //                   </div>
// // // // // // // // // //                   <Slider min={100000} max={1500000} step={5000} value={[price]} onValueChange={(v) => setPrice(v[0])} />
// // // // // // // // // //                 </div>
// // // // // // // // // //                  <div className="space-y-3">
// // // // // // // // // //                    <div className="flex justify-between items-baseline">
// // // // // // // // // //                       <Label className={!simulation.isCompliant ? "text-destructive" : ""}>Votre Apport</Label>
// // // // // // // // // //                       <span className={`font-bold ${!simulation.isCompliant ? "text-destructive" : "text-green-500"}`}>{currency.format(downPayment)}</span>
// // // // // // // // // //                   </div>
// // // // // // // // // //                    <Slider min={0} max={price} step={1000} value={[downPayment]} onValueChange={(v) => setDownPayment(v[0])} className={!simulation.isCompliant ? "opacity-100" : ""} />
                   
// // // // // // // // // //                    {/* Indicateur visuel du minimum requis */}
// // // // // // // // // //                    <div className="flex justify-between text-xs">
// // // // // // // // // //                       <span className="text-muted-foreground">Min requis: {currency.format(simulation.minDownPaymentRequired)}</span>
// // // // // // // // // //                       {!simulation.isCompliant && <span className="text-destructive font-bold">Insuffisant</span>}
// // // // // // // // // //                    </div>
// // // // // // // // // //                 </div>
// // // // // // // // // //                  <div className="space-y-3">
// // // // // // // // // //                    <div className="flex justify-between items-baseline">
// // // // // // // // // //                       <Label>Durée</Label>
// // // // // // // // // //                       <span className="font-bold">{durationYears} ans</span>
// // // // // // // // // //                   </div>
// // // // // // // // // //                    <Slider min={1} max={30} step={1} value={[durationYears]} onValueChange={(v) => setDurationYears(v[0])} />
// // // // // // // // // //                 </div>
// // // // // // // // // //               </CardContent>
// // // // // // // // // //             </Card>

// // // // // // // // // //             <Card className="shadow-md border-border bg-card/30">
// // // // // // // // // //               <CardHeader className="pb-4"><CardTitle className="text-base">2. Taxes & Assurances (Annuel)</CardTitle></CardHeader>
// // // // // // // // // //               <CardContent className="space-y-4">
// // // // // // // // // //                  <div className="grid grid-cols-2 gap-4">
// // // // // // // // // //                     <div className="space-y-2"><Label className="text-xs text-muted-foreground">Taxe Municipale</Label><Input type="number" value={municipalTax} onChange={(e) => setMunicipalTax(Number(e.target.value))} className="h-8" /></div>
// // // // // // // // // //                     <div className="space-y-2"><Label className="text-xs text-muted-foreground">Taxe Scolaire</Label><Input type="number" value={schoolTax} onChange={(e) => setSchoolTax(Number(e.target.value))} className="h-8" /></div>
// // // // // // // // // //                  </div>
// // // // // // // // // //                  <div className="space-y-2"><Label className="text-xs text-muted-foreground">Assurance Habitation</Label><Input type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} className="h-8" /></div>
// // // // // // // // // //               </CardContent>
// // // // // // // // // //             </Card>

// // // // // // // // // //             <Card className="shadow-lg border-primary/20 bg-primary/5">
// // // // // // // // // //               <CardHeader className="pb-4"><CardTitle className="text-primary text-base flex items-center gap-2">🚀 Accélérateur</CardTitle></CardHeader>
// // // // // // // // // //               <CardContent className="space-y-4">
// // // // // // // // // //                 <div className="space-y-2">
// // // // // // // // // //                    <div className="flex justify-between text-sm"><Label>Extra Mensuel</Label><span className="font-bold text-primary">+{currency.format(extraMonthly)}</span></div>
// // // // // // // // // //                    <Slider min={0} max={2000} step={50} value={[extraMonthly]} onValueChange={(v) => setExtraMonthly(v[0])} />
// // // // // // // // // //                 </div>
// // // // // // // // // //               </CardContent>
// // // // // // // // // //             </Card>

// // // // // // // // // //             <Card className="shadow-sm border-border bg-card/20">
// // // // // // // // // //                 <CardHeader className="pb-2"><CardTitle className="text-sm">Cash Day 1 (Requis)</CardTitle></CardHeader>
// // // // // // // // // //                 <CardContent className="space-y-1 text-sm">
// // // // // // // // // //                     <div className="flex justify-between"><span className="text-muted-foreground">Mise de fonds</span><span>{currency.format(downPayment)}</span></div>
// // // // // // // // // //                     <div className="flex justify-between"><span className="text-muted-foreground">Taxe Bienvenue</span><span>{currency.format(welcomeTax)}</span></div>
// // // // // // // // // //                     <div className="flex justify-between"><span className="text-muted-foreground">Notaire + Ajust.</span><span>{currency.format(notaryFees)}</span></div>
// // // // // // // // // //                     <div className="flex justify-between"><span className="text-muted-foreground">Insp. + Éval.</span><span>{currency.format(startupFees)}</span></div>
// // // // // // // // // //                      <Separator className="my-2" />
// // // // // // // // // //                      <div className="flex justify-between font-bold"><span>Total Requis</span><span className="text-primary">{currency.format(totalCashRequired)}</span></div>
// // // // // // // // // //                 </CardContent>
// // // // // // // // // //             </Card>
// // // // // // // // // //           </div>

// // // // // // // // // //           {/* --- DROITE : RÉSULTATS (AVEC OVERLAY SI ERREUR) --- */}
// // // // // // // // // //           <div className="lg:col-span-8 space-y-6 relative">
            
// // // // // // // // // //             {/* --- LE CALQUE D'ERREUR (S'affiche par dessus si non conforme) --- */}
// // // // // // // // // //             {!simulation.isCompliant && (
// // // // // // // // // //                 <div className="absolute inset-0 z-50 flex items-start justify-center pt-20 backdrop-blur-md bg-background/50 rounded-xl border border-destructive/20">
// // // // // // // // // //                     <div className="bg-card border border-destructive shadow-2xl p-8 rounded-xl max-w-md text-center space-y-4 animate-in fade-in zoom-in duration-300">
// // // // // // // // // //                         <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
// // // // // // // // // //                             <Lock className="h-6 w-6 text-destructive" />
// // // // // // // // // //                         </div>
// // // // // // // // // //                         <h3 className="text-xl font-bold text-destructive">Financement Impossible</h3>
// // // // // // // // // //                         <p className="text-muted-foreground">
// // // // // // // // // //                             {simulation.complianceError}
// // // // // // // // // //                         </p>
// // // // // // // // // //                         <div className="text-sm bg-muted p-3 rounded-md text-left space-y-2">
// // // // // // // // // //                             <div className="flex justify-between">
// // // // // // // // // //                                 <span>Financement Max Qurtuba:</span>
// // // // // // // // // //                                 <span className="font-bold">{currency.format(simulation.maxBankFinancing)}</span>
// // // // // // // // // //                             </div>
// // // // // // // // // //                             <div className="flex justify-between text-destructive font-bold">
// // // // // // // // // //                                 <span>Apport Minimum Requis:</span>
// // // // // // // // // //                                 <span>{currency.format(simulation.minDownPaymentRequired)}</span>
// // // // // // // // // //                             </div>
// // // // // // // // // //                         </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 </div>
// // // // // // // // // //             )}

// // // // // // // // // //             {/* --- CONTENU RÉSULTAT (Devient flou si erreur) --- */}
// // // // // // // // // //             <div className={`space-y-6 transition-all duration-500 ${!simulation.isCompliant ? "blur-md opacity-30 pointer-events-none grayscale" : ""}`}>
                
// // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // // // // // //                     <Card className="bg-card/50 shadow-sm">
// // // // // // // // // //                         <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Paiement Qurtuba (Seul)</CardTitle></CardHeader>
// // // // // // // // // //                         <CardContent>
// // // // // // // // // //                             <div className="text-2xl font-bold text-foreground">{currency.format(simulation.monthlyPaymentFixed + extraMonthly)}</div>
// // // // // // // // // //                             <p className="text-xs text-muted-foreground">Loyer + Capital</p>
// // // // // // // // // //                         </CardContent>
// // // // // // // // // //                     </Card>
// // // // // // // // // //                     <Card className="bg-primary/10 border-primary/30 shadow-[0_0_30px_-10px_hsl(var(--primary)/0.3)]">
// // // // // // // // // //                         <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-primary">Budget Mensuel TOTAL</CardTitle></CardHeader>
// // // // // // // // // //                         <CardContent>
// // // // // // // // // //                             <div className="text-3xl font-bold text-primary">{currency.format(totalMonthlyOutPocket)}</div>
// // // // // // // // // //                             <div className="flex gap-2 mt-1">
// // // // // // // // // //                                 <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">Qurtuba: {currency.format(simulation.monthlyPaymentFixed + extraMonthly)}</Badge>
// // // // // // // // // //                                 <Badge variant="outline" className="text-[10px] border-orange-500/30 text-orange-600 dark:text-orange-400">Charges: {currency.format(monthlyCharges)}</Badge>
// // // // // // // // // //                             </div>
// // // // // // // // // //                         </CardContent>
// // // // // // // // // //                     </Card>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // // // // // // //                     <Card className="bg-card/50 shadow-sm">
// // // // // // // // // //                         <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Intérêts Payés</CardTitle></CardHeader>
// // // // // // // // // //                         <CardContent><div className="text-xl font-bold text-orange-500">{currency.format(simulation.totalInterestPaid)}</div></CardContent>
// // // // // // // // // //                     </Card>
// // // // // // // // // //                     <Card className="bg-card/50 shadow-sm">
// // // // // // // // // //                         <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Économies (Extras)</CardTitle></CardHeader>
// // // // // // // // // //                         <CardContent><div className="text-xl font-bold text-green-500">{currency.format(simulation.interestSaved)}</div></CardContent>
// // // // // // // // // //                     </Card>
// // // // // // // // // //                     <Card className="bg-card/50 shadow-sm">
// // // // // // // // // //                         <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Durée Réelle</CardTitle></CardHeader>
// // // // // // // // // //                         <CardContent><div className="text-xl font-bold">{Math.floor(simulation.actualDurationMonths / 12)} ans {simulation.actualDurationMonths % 12} mois</div></CardContent>
// // // // // // // // // //                     </Card>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 <Card className="shadow-xl border-border p-1 bg-card/50 backdrop-blur-sm">
// // // // // // // // // //                 <CardHeader><CardTitle>Projection du capital</CardTitle></CardHeader>
// // // // // // // // // //                 <CardContent className="h-[350px] pl-0">
// // // // // // // // // //                     <ResponsiveContainer width="100%" height="100%">
// // // // // // // // // //                     <AreaChart data={simulation.schedule} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
// // // // // // // // // //                         <defs>
// // // // // // // // // //                         <linearGradient id="colorRent" x1="0" y1="0" x2="0" y2="1">
// // // // // // // // // //                             <stop offset="5%" stopColor="var(--destructive)" stopOpacity={0.8}/>
// // // // // // // // // //                             <stop offset="95%" stopColor="var(--destructive)" stopOpacity={0}/>
// // // // // // // // // //                         </linearGradient>
// // // // // // // // // //                         <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
// // // // // // // // // //                             <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
// // // // // // // // // //                             <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
// // // // // // // // // //                         </linearGradient>
// // // // // // // // // //                         </defs>
// // // // // // // // // //                         <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} stroke="var(--border)" />
// // // // // // // // // //                         <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} />
// // // // // // // // // //                         <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} />
// // // // // // // // // //                         <Tooltip formatter={(value: number) => currency.format(value)} labelFormatter={(label) => `Mois ${label}`} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }} />
// // // // // // // // // //                         <Legend verticalAlign="top" height={36}/>
// // // // // // // // // //                         <Area type="monotone" dataKey="rentPayment" name="Loyer Payé" stroke="var(--destructive)" fillOpacity={1} fill="url(#colorRent)" stackId="1" />
// // // // // // // // // //                         <Area type="monotone" dataKey="principalPayment" name="Capital Remboursé" stroke="var(--primary)" fillOpacity={1} fill="url(#colorPrincipal)" stackId="1" />
// // // // // // // // // //                     </AreaChart>
// // // // // // // // // //                     </ResponsiveContainer>
// // // // // // // // // //                 </CardContent>
// // // // // // // // // //                 </Card>

// // // // // // // // // //                 <Card className="shadow-lg border-border bg-card/50 backdrop-blur-sm">
// // // // // // // // // //                     <CardHeader><CardTitle>Tableau détaillé</CardTitle></CardHeader>
// // // // // // // // // //                     <CardContent className="p-0">
// // // // // // // // // //                         <div className="h-[400px] overflow-auto relative rounded-b-lg">
// // // // // // // // // //                             <Table>
// // // // // // // // // //                                 <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
// // // // // // // // // //                                     <TableRow>
// // // // // // // // // //                                         <TableHead className="w-[80px]">Mois</TableHead>
// // // // // // // // // //                                         <TableHead>Loyer</TableHead>
// // // // // // // // // //                                         <TableHead>Capital</TableHead>
// // // // // // // // // //                                         <TableHead>Total</TableHead>
// // // // // // // // // //                                         <TableHead className="text-right">Solde Banque</TableHead>
// // // // // // // // // //                                     </TableRow>
// // // // // // // // // //                                 </TableHeader>
// // // // // // // // // //                                 <TableBody>
// // // // // // // // // //                                     {simulation.schedule.map((row) => (
// // // // // // // // // //                                         <TableRow key={row.month} className="hover:bg-muted/50 border-border">
// // // // // // // // // //                                             <TableCell className="font-medium text-muted-foreground">{row.month}</TableCell>
// // // // // // // // // //                                             <TableCell className="text-orange-500">{currency.format(row.rentPayment)}</TableCell>
// // // // // // // // // //                                             <TableCell className="text-primary font-bold">{currency.format(row.principalPayment)}</TableCell>
// // // // // // // // // //                                             <TableCell>{currency.format(row.totalPayment)}</TableCell>
// // // // // // // // // //                                             <TableCell className="text-right text-muted-foreground">{currency.format(row.remainingBankBalance)}</TableCell>
// // // // // // // // // //                                         </TableRow>
// // // // // // // // // //                                     ))}
// // // // // // // // // //                                 </TableBody>
// // // // // // // // // //                             </Table>
// // // // // // // // // //                         </div>
// // // // // // // // // //                     </CardContent>
// // // // // // // // // //                 </Card>
// // // // // // // // // //             </div>

// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     </main>
// // // // // // // // // //   );
// // // // // // // // // // }


// // // // // // // // // // "use client";

// // // // // // // // // // import { useState, useMemo } from "react";
// // // // // // // // // // import { QurtubaSimulator, SimulationResult } from "@/lib/qurtuba-logic";
// // // // // // // // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // // // // import { Label } from "@/components/ui/label";
// // // // // // // // // // import { Slider } from "@/components/ui/slider";
// // // // // // // // // // import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
// // // // // // // // // // import { ModeToggle } from "@/components/mode-toggle";
// // // // // // // // // // import {
// // // // // // // // // //   Table,
// // // // // // // // // //   TableBody,
// // // // // // // // // //   TableCell,
// // // // // // // // // //   TableHead,
// // // // // // // // // //   TableHeader,
// // // // // // // // // //   TableRow,
// // // // // // // // // // } from "@/components/ui/table"
// // // // // // // // // // import { Badge } from "@/components/ui/badge"
// // // // // // // // // // import { Separator } from "@/components/ui/separator"
// // // // // // // // // // import { Button } from "@/components/ui/button" // NOUVEAU
// // // // // // // // // // import { Lock, Download } from "lucide-react" // NOUVEAU ICONE

// // // // // // // // // // export default function Home() {
// // // // // // // // // //   const [price, setPrice] = useState(500000);
// // // // // // // // // //   const [downPayment, setDownPayment] = useState(100000);
// // // // // // // // // //   const [durationYears, setDurationYears] = useState(25);
// // // // // // // // // //   const [extraMonthly, setExtraMonthly] = useState(0);
// // // // // // // // // //   const [extraAnnual, setExtraAnnual] = useState(0);
// // // // // // // // // //   const [municipalTax, setMunicipalTax] = useState(3000);
// // // // // // // // // //   const [schoolTax, setSchoolTax] = useState(350);
// // // // // // // // // //   const [insurance, setInsurance] = useState(1200);
  
// // // // // // // // // //   const rate = 5.5; 

// // // // // // // // // //   const { simulation, welcomeTax, notaryFees, startupFees } = useMemo(() => {
// // // // // // // // // //     const sim = new QurtubaSimulator(price, downPayment, rate, durationYears, extraMonthly, extraAnnual);
// // // // // // // // // //     return {
// // // // // // // // // //         simulation: sim.generateSchedule(),
// // // // // // // // // //         welcomeTax: sim.calculateWelcomeTax(),
// // // // // // // // // //         notaryFees: sim.calculateNotaryFees(),
// // // // // // // // // //         startupFees: sim.calculateStartupFees()
// // // // // // // // // //     };
// // // // // // // // // //   }, [price, downPayment, durationYears, extraMonthly, extraAnnual]);

// // // // // // // // // //   const currency = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

// // // // // // // // // //   const totalCashRequired = downPayment + welcomeTax + notaryFees + startupFees;
// // // // // // // // // //   const monthlyCharges = (municipalTax + schoolTax + insurance) / 12;
// // // // // // // // // //   const totalMonthlyOutPocket = simulation.monthlyPaymentFixed + extraMonthly + monthlyCharges;

// // // // // // // // // //   // FONCTION D'EXPORT CSV (NOUVEAU)
// // // // // // // // // //   const handleExportCSV = () => {
// // // // // // // // // //     if (!simulation.schedule || simulation.schedule.length === 0) return;

// // // // // // // // // //     // En-têtes du fichier CSV
// // // // // // // // // //     const headers = ["Mois,Loyer (Frais),Capital (Parts),Paiement Total,Solde Banque,Votre Capital"];
    
// // // // // // // // // //     // Lignes de données
// // // // // // // // // //     const rows = simulation.schedule.map(row => 
// // // // // // // // // //       `${row.month},${row.rentPayment.toFixed(2)},${row.principalPayment.toFixed(2)},${row.totalPayment.toFixed(2)},${row.remainingBankBalance.toFixed(2)},${row.memberEquity.toFixed(2)}`
// // // // // // // // // //     );

// // // // // // // // // //     // Assemblage
// // // // // // // // // //     const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    
// // // // // // // // // //     // Création du lien de téléchargement
// // // // // // // // // //     const encodedUri = encodeURI(csvContent);
// // // // // // // // // //     const link = document.createElement("a");
// // // // // // // // // //     link.setAttribute("href", encodedUri);
// // // // // // // // // //     link.setAttribute("download", "simulation_qurtuba.csv");
// // // // // // // // // //     document.body.appendChild(link);
// // // // // // // // // //     link.click();
// // // // // // // // // //     document.body.removeChild(link);
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <main className="min-h-screen bg-background p-4 md:p-8 font-sans transition-colors duration-300">
// // // // // // // // // //       <div className="max-w-7xl mx-auto space-y-8">
        
// // // // // // // // // //         {/* HEADER */}
// // // // // // // // // //         <header className="flex justify-between items-center border-b border-border pb-6">
// // // // // // // // // //           <div>
// // // // // // // // // //             <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
// // // // // // // // // //               Simulateur Qurtuba <span className="text-primary">Ultimate</span>
// // // // // // // // // //             </h1>
// // // // // // // // // //             <p className="text-muted-foreground mt-1">Conforme aux règles officielles 2024-2025</p>
// // // // // // // // // //           </div>
// // // // // // // // // //           <ModeToggle />
// // // // // // // // // //         </header>

// // // // // // // // // //         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
// // // // // // // // // //           {/* --- GAUCHE : CONTRÔLES --- */}
// // // // // // // // // //           <div className="lg:col-span-4 sticky top-8 space-y-6">
            
// // // // // // // // // //             <Card className={`shadow-xl border-border bg-card/50 backdrop-blur-sm transition-colors ${!simulation.isCompliant ? "border-destructive/50 ring-1 ring-destructive/20" : ""}`}>
// // // // // // // // // //               <CardHeader className="pb-4"><CardTitle>1. Financement</CardTitle></CardHeader>
// // // // // // // // // //               <CardContent className="space-y-5">
// // // // // // // // // //                 <div className="space-y-3">
// // // // // // // // // //                    <div className="flex justify-between items-baseline">
// // // // // // // // // //                       <Label>Prix maison</Label>
// // // // // // // // // //                       <span className="font-bold text-primary">{currency.format(price)}</span>
// // // // // // // // // //                   </div>
// // // // // // // // // //                   <Slider min={100000} max={1500000} step={5000} value={[price]} onValueChange={(v) => setPrice(v[0])} />
// // // // // // // // // //                 </div>
// // // // // // // // // //                  <div className="space-y-3">
// // // // // // // // // //                    <div className="flex justify-between items-baseline">
// // // // // // // // // //                       <Label className={!simulation.isCompliant ? "text-destructive" : ""}>Votre Apport</Label>
// // // // // // // // // //                       <span className={`font-bold ${!simulation.isCompliant ? "text-destructive" : "text-green-500"}`}>{currency.format(downPayment)}</span>
// // // // // // // // // //                   </div>
// // // // // // // // // //                    <Slider min={0} max={price} step={1000} value={[downPayment]} onValueChange={(v) => setDownPayment(v[0])} />
// // // // // // // // // //                    <div className="flex justify-between text-xs">
// // // // // // // // // //                       <span className="text-muted-foreground">Min requis: {currency.format(simulation.minDownPaymentRequired)}</span>
// // // // // // // // // //                       {!simulation.isCompliant && <span className="text-destructive font-bold">Insuffisant</span>}
// // // // // // // // // //                    </div>
// // // // // // // // // //                 </div>
// // // // // // // // // //                  <div className="space-y-3">
// // // // // // // // // //                    <div className="flex justify-between items-baseline">
// // // // // // // // // //                       <Label>Durée</Label>
// // // // // // // // // //                       <span className="font-bold">{durationYears} ans</span>
// // // // // // // // // //                   </div>
// // // // // // // // // //                    <Slider min={1} max={30} step={1} value={[durationYears]} onValueChange={(v) => setDurationYears(v[0])} />
// // // // // // // // // //                 </div>
// // // // // // // // // //               </CardContent>
// // // // // // // // // //             </Card>

// // // // // // // // // //             <Card className="shadow-md border-border bg-card/30">
// // // // // // // // // //               <CardHeader className="pb-4"><CardTitle className="text-base">2. Taxes & Assurances (Annuel)</CardTitle></CardHeader>
// // // // // // // // // //               <CardContent className="space-y-4">
// // // // // // // // // //                  <div className="grid grid-cols-2 gap-4">
// // // // // // // // // //                     <div className="space-y-2"><Label className="text-xs text-muted-foreground">Taxe Municipale</Label><Input type="number" value={municipalTax} onChange={(e) => setMunicipalTax(Number(e.target.value))} className="h-8" /></div>
// // // // // // // // // //                     <div className="space-y-2"><Label className="text-xs text-muted-foreground">Taxe Scolaire</Label><Input type="number" value={schoolTax} onChange={(e) => setSchoolTax(Number(e.target.value))} className="h-8" /></div>
// // // // // // // // // //                  </div>
// // // // // // // // // //                  <div className="space-y-2"><Label className="text-xs text-muted-foreground">Assurance Habitation</Label><Input type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} className="h-8" /></div>
// // // // // // // // // //               </CardContent>
// // // // // // // // // //             </Card>

// // // // // // // // // //             <Card className="shadow-lg border-primary/20 bg-primary/5">
// // // // // // // // // //               <CardHeader className="pb-4"><CardTitle className="text-primary text-base flex items-center gap-2">🚀 Accélérateur</CardTitle></CardHeader>
// // // // // // // // // //               <CardContent className="space-y-4">
// // // // // // // // // //                 <div className="space-y-2">
// // // // // // // // // //                    <div className="flex justify-between text-sm"><Label>Extra Mensuel</Label><span className="font-bold text-primary">+{currency.format(extraMonthly)}</span></div>
// // // // // // // // // //                    <Slider min={0} max={2000} step={50} value={[extraMonthly]} onValueChange={(v) => setExtraMonthly(v[0])} />
// // // // // // // // // //                 </div>
// // // // // // // // // //                 <div className="space-y-2">
// // // // // // // // // //                    <div className="flex justify-between text-sm"><Label>Extra Annuel</Label><span className="font-bold text-primary">+{currency.format(extraAnnual)}</span></div>
// // // // // // // // // //                    <Slider min={0} max={20000} step={500} value={[extraAnnual]} onValueChange={(v) => setExtraAnnual(v[0])} />
// // // // // // // // // //                 </div>
// // // // // // // // // //               </CardContent>
// // // // // // // // // //             </Card>

// // // // // // // // // //             <Card className="shadow-sm border-border bg-card/20">
// // // // // // // // // //                 <CardHeader className="pb-2"><CardTitle className="text-sm">Cash Day 1 (Requis)</CardTitle></CardHeader>
// // // // // // // // // //                 <CardContent className="space-y-1 text-sm">
// // // // // // // // // //                     <div className="flex justify-between"><span className="text-muted-foreground">Mise de fonds</span><span>{currency.format(downPayment)}</span></div>
// // // // // // // // // //                     <div className="flex justify-between"><span className="text-muted-foreground">Taxe Bienvenue</span><span>{currency.format(welcomeTax)}</span></div>
// // // // // // // // // //                     <div className="flex justify-between"><span className="text-muted-foreground">Notaire + Ajust.</span><span>{currency.format(notaryFees)}</span></div>
// // // // // // // // // //                     <div className="flex justify-between"><span className="text-muted-foreground">Insp. + Éval.</span><span>{currency.format(startupFees)}</span></div>
// // // // // // // // // //                      <Separator className="my-2" />
// // // // // // // // // //                      <div className="flex justify-between font-bold"><span>Total Requis</span><span className="text-primary">{currency.format(totalCashRequired)}</span></div>
// // // // // // // // // //                 </CardContent>
// // // // // // // // // //             </Card>
// // // // // // // // // //           </div>

// // // // // // // // // //           {/* --- DROITE : RÉSULTATS --- */}
// // // // // // // // // //           <div className="lg:col-span-8 space-y-6 relative">
            
// // // // // // // // // //             {/* OVERLAY D'ERREUR */}
// // // // // // // // // //             {!simulation.isCompliant && (
// // // // // // // // // //                 <div className="absolute inset-0 z-50 flex items-start justify-center pt-20 backdrop-blur-md bg-background/50 rounded-xl border border-destructive/20">
// // // // // // // // // //                     <div className="bg-card border border-destructive shadow-2xl p-8 rounded-xl max-w-md text-center space-y-4 animate-in fade-in zoom-in duration-300">
// // // // // // // // // //                         <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
// // // // // // // // // //                             <Lock className="h-6 w-6 text-destructive" />
// // // // // // // // // //                         </div>
// // // // // // // // // //                         <h3 className="text-xl font-bold text-destructive">Financement Impossible</h3>
// // // // // // // // // //                         <p className="text-muted-foreground">
// // // // // // // // // //                             {simulation.complianceError}
// // // // // // // // // //                         </p>
// // // // // // // // // //                         <div className="text-sm bg-muted p-3 rounded-md text-left space-y-2">
// // // // // // // // // //                             <div className="flex justify-between"><span>Financement Max Qurtuba:</span><span className="font-bold">{currency.format(simulation.maxBankFinancing)}</span></div>
// // // // // // // // // //                             <div className="flex justify-between text-destructive font-bold"><span>Apport Minimum Requis:</span><span>{currency.format(simulation.minDownPaymentRequired)}</span></div>
// // // // // // // // // //                         </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 </div>
// // // // // // // // // //             )}

// // // // // // // // // //             {/* CONTENU RÉSULTAT */}
// // // // // // // // // //             <div className={`space-y-6 transition-all duration-500 ${!simulation.isCompliant ? "blur-md opacity-30 pointer-events-none grayscale" : ""}`}>
                
// // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // // // // // //                     <Card className="bg-card/50 shadow-sm">
// // // // // // // // // //                         <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Paiement Qurtuba (Seul)</CardTitle></CardHeader>
// // // // // // // // // //                         <CardContent>
// // // // // // // // // //                             <div className="text-2xl font-bold text-foreground">{currency.format(simulation.monthlyPaymentFixed + extraMonthly)}</div>
// // // // // // // // // //                             <p className="text-xs text-muted-foreground">Loyer + Capital</p>
// // // // // // // // // //                         </CardContent>
// // // // // // // // // //                     </Card>
// // // // // // // // // //                     <Card className="bg-primary/10 border-primary/30 shadow-[0_0_30px_-10px_hsl(var(--primary)/0.3)]">
// // // // // // // // // //                         <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-primary">Budget Mensuel TOTAL</CardTitle></CardHeader>
// // // // // // // // // //                         <CardContent>
// // // // // // // // // //                             <div className="text-3xl font-bold text-primary">{currency.format(totalMonthlyOutPocket)}</div>
// // // // // // // // // //                             <div className="flex gap-2 mt-1">
// // // // // // // // // //                                 <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">Qurtuba: {currency.format(simulation.monthlyPaymentFixed + extraMonthly)}</Badge>
// // // // // // // // // //                                 <Badge variant="outline" className="text-[10px] border-orange-500/30 text-orange-600 dark:text-orange-400">Charges: {currency.format(monthlyCharges)}</Badge>
// // // // // // // // // //                             </div>
// // // // // // // // // //                         </CardContent>
// // // // // // // // // //                     </Card>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // // // // // // //                     <Card className="bg-card/50 shadow-sm"><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Intérêts Payés</CardTitle></CardHeader><CardContent><div className="text-xl font-bold text-orange-500">{currency.format(simulation.totalInterestPaid)}</div></CardContent></Card>
// // // // // // // // // //                     <Card className="bg-card/50 shadow-sm"><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Économies (Extras)</CardTitle></CardHeader><CardContent><div className="text-xl font-bold text-green-500">{currency.format(simulation.interestSaved)}</div></CardContent></Card>
// // // // // // // // // //                     <Card className="bg-card/50 shadow-sm"><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Durée Réelle</CardTitle></CardHeader><CardContent><div className="text-xl font-bold">{Math.floor(simulation.actualDurationMonths / 12)} ans {simulation.actualDurationMonths % 12} mois</div></CardContent></Card>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 <Card className="shadow-xl border-border p-1 bg-card/50 backdrop-blur-sm">
// // // // // // // // // //                     <CardHeader><CardTitle>Projection du capital</CardTitle></CardHeader>
// // // // // // // // // //                     <CardContent className="h-[350px] pl-0">
// // // // // // // // // //                         <ResponsiveContainer width="100%" height="100%">
// // // // // // // // // //                         <AreaChart data={simulation.schedule} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
// // // // // // // // // //                             <defs>
// // // // // // // // // //                             <linearGradient id="colorRent" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--destructive)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--destructive)" stopOpacity={0}/></linearGradient>
// // // // // // // // // //                             <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient>
// // // // // // // // // //                             </defs>
// // // // // // // // // //                             <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} stroke="var(--border)" />
// // // // // // // // // //                             <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} />
// // // // // // // // // //                             <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} />
// // // // // // // // // //                             <Tooltip formatter={(value: number) => currency.format(value)} labelFormatter={(label) => `Mois ${label}`} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }} />
// // // // // // // // // //                             <Legend verticalAlign="top" height={36}/>
// // // // // // // // // //                             <Area type="monotone" dataKey="rentPayment" name="Loyer Payé" stroke="var(--destructive)" fillOpacity={1} fill="url(#colorRent)" stackId="1" />
// // // // // // // // // //                             <Area type="monotone" dataKey="principalPayment" name="Capital Remboursé" stroke="var(--primary)" fillOpacity={1} fill="url(#colorPrincipal)" stackId="1" />
// // // // // // // // // //                         </AreaChart>
// // // // // // // // // //                         </ResponsiveContainer>
// // // // // // // // // //                     </CardContent>
// // // // // // // // // //                 </Card>

// // // // // // // // // //                 <Card className="shadow-lg border-border bg-card/50 backdrop-blur-sm">
// // // // // // // // // //                     <CardHeader className="flex flex-row items-center justify-between">
// // // // // // // // // //                         <CardTitle>Tableau détaillé</CardTitle>
// // // // // // // // // //                         {/* BOUTON D'EXPORT (NOUVEAU) */}
// // // // // // // // // //                         <Button variant="outline" size="sm" onClick={handleExportCSV} className="gap-2">
// // // // // // // // // //                             <Download className="h-4 w-4" />
// // // // // // // // // //                             Exporter CSV
// // // // // // // // // //                         </Button>
// // // // // // // // // //                     </CardHeader>
// // // // // // // // // //                     <CardContent className="p-0">
// // // // // // // // // //                         <div className="h-[400px] overflow-auto relative rounded-b-lg">
// // // // // // // // // //                             <Table>
// // // // // // // // // //                                 <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
// // // // // // // // // //                                     <TableRow>
// // // // // // // // // //                                         <TableHead className="w-[80px]">Mois</TableHead>
// // // // // // // // // //                                         <TableHead>Loyer</TableHead>
// // // // // // // // // //                                         <TableHead>Capital</TableHead>
// // // // // // // // // //                                         <TableHead>Total</TableHead>
// // // // // // // // // //                                         <TableHead className="text-right">Solde Banque</TableHead>
// // // // // // // // // //                                     </TableRow>
// // // // // // // // // //                                 </TableHeader>
// // // // // // // // // //                                 <TableBody>
// // // // // // // // // //                                     {simulation.schedule.map((row) => (
// // // // // // // // // //                                         <TableRow key={row.month} className="hover:bg-muted/50 border-border">
// // // // // // // // // //                                             <TableCell className="font-medium text-muted-foreground">{row.month}</TableCell>
// // // // // // // // // //                                             <TableCell className="text-orange-500">{currency.format(row.rentPayment)}</TableCell>
// // // // // // // // // //                                             <TableCell className="text-primary font-bold">{currency.format(row.principalPayment)}</TableCell>
// // // // // // // // // //                                             <TableCell>{currency.format(row.totalPayment)}</TableCell>
// // // // // // // // // //                                             <TableCell className="text-right text-muted-foreground">{currency.format(row.remainingBankBalance)}</TableCell>
// // // // // // // // // //                                         </TableRow>
// // // // // // // // // //                                     ))}
// // // // // // // // // //                                 </TableBody>
// // // // // // // // // //                             </Table>
// // // // // // // // // //                         </div>
// // // // // // // // // //                     </CardContent>
// // // // // // // // // //                 </Card>
// // // // // // // // // //             </div>
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>

// // // // // // // // // //         {/* PIED DE PAGE LÉGAL (NOUVEAU) */}
// // // // // // // // // //         <footer className="mt-12 py-6 border-t border-border text-center text-sm text-muted-foreground">
// // // // // // // // // //             <p className="max-w-2xl mx-auto">
// // // // // // // // // //                 <strong>Avertissement :</strong> Cet outil est une simulation financière indépendante et non-officielle fournie à titre indicatif. 
// // // // // // // // // //                 Les montants de la taxe de bienvenue, des frais de notaire et des paiements finaux peuvent varier. 
// // // // // // // // // //                 Veuillez contacter directement la coopérative Qurtuba pour une approbation officielle.
// // // // // // // // // //             </p>
// // // // // // // // // //             <p className="mt-2 text-xs opacity-50">Version 5.0 (Ultimate Edition) - {new Date().getFullYear()}</p>
// // // // // // // // // //         </footer>

// // // // // // // // // //       </div>
// // // // // // // // // //     </main>
// // // // // // // // // //   );
// // // // // // // // // // }

// // // // // // // // // "use client";

// // // // // // // // // import { useState, useMemo } from "react";
// // // // // // // // // import { QurtubaSimulator, SimulationResult } from "@/lib/qurtuba-logic";
// // // // // // // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // // // import { Label } from "@/components/ui/label";
// // // // // // // // // import { Slider } from "@/components/ui/slider";
// // // // // // // // // import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
// // // // // // // // // import { ModeToggle } from "@/components/mode-toggle";
// // // // // // // // // import {
// // // // // // // // //   Table,
// // // // // // // // //   TableBody,
// // // // // // // // //   TableCell,
// // // // // // // // //   TableHead,
// // // // // // // // //   TableHeader,
// // // // // // // // //   TableRow,
// // // // // // // // // } from "@/components/ui/table"
// // // // // // // // // import { Badge } from "@/components/ui/badge"
// // // // // // // // // import { Button } from "@/components/ui/button"
// // // // // // // // // import { Lock, Download, Info } from "lucide-react"

// // // // // // // // // export default function Home() {
// // // // // // // // //   const [price, setPrice] = useState(500000);
// // // // // // // // //   const [downPayment, setDownPayment] = useState(100000);
// // // // // // // // //   const [durationYears, setDurationYears] = useState(25);
// // // // // // // // //   const [extraMonthly, setExtraMonthly] = useState(0);
// // // // // // // // //   const [extraAnnual, setExtraAnnual] = useState(0);
// // // // // // // // //   const [municipalTax, setMunicipalTax] = useState(3000);
// // // // // // // // //   const [schoolTax, setSchoolTax] = useState(350);
// // // // // // // // //   const [insurance, setInsurance] = useState(1200);
  
// // // // // // // // //   const rate = 5.5; 

// // // // // // // // //   const { simulation, welcomeTax, notaryFees, startupFees } = useMemo(() => {
// // // // // // // // //     const sim = new QurtubaSimulator(price, downPayment, rate, durationYears, extraMonthly, extraAnnual);
// // // // // // // // //     return {
// // // // // // // // //         simulation: sim.generateSchedule(),
// // // // // // // // //         welcomeTax: sim.calculateWelcomeTax(),
// // // // // // // // //         notaryFees: sim.calculateNotaryFees(),
// // // // // // // // //         startupFees: sim.calculateStartupFees()
// // // // // // // // //     };
// // // // // // // // //   }, [price, downPayment, durationYears, extraMonthly, extraAnnual]);

// // // // // // // // //   const currency = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

// // // // // // // // //   const totalCashRequired = downPayment + welcomeTax + notaryFees + startupFees;
// // // // // // // // //   const monthlyCharges = (municipalTax + schoolTax + insurance) / 12;
// // // // // // // // //   const totalMonthlyOutPocket = simulation.monthlyPaymentFixed + extraMonthly + monthlyCharges;

// // // // // // // // //   const handleExportCSV = () => {
// // // // // // // // //     if (!simulation.schedule || simulation.schedule.length === 0) return;
// // // // // // // // //     const headers = ["Mois,Loyer (Frais),Capital (Parts),Paiement Total,Solde Banque,Votre Capital"];
// // // // // // // // //     const rows = simulation.schedule.map(row => 
// // // // // // // // //       `${row.month},${row.rentPayment.toFixed(2)},${row.principalPayment.toFixed(2)},${row.totalPayment.toFixed(2)},${row.remainingBankBalance.toFixed(2)},${row.memberEquity.toFixed(2)}`
// // // // // // // // //     );
// // // // // // // // //     const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
// // // // // // // // //     const encodedUri = encodeURI(csvContent);
// // // // // // // // //     const link = document.createElement("a");
// // // // // // // // //     link.setAttribute("href", encodedUri);
// // // // // // // // //     link.setAttribute("download", "simulation_qurtuba.csv");
// // // // // // // // //     document.body.appendChild(link);
// // // // // // // // //     link.click();
// // // // // // // // //     document.body.removeChild(link);
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     // FIX SCROLL: min-h-screen permet à la page de grandir (scroll naturel)
// // // // // // // // //     <main className="min-h-screen w-full bg-background font-sans flex flex-col items-center pb-12">
      
// // // // // // // // //       {/* HEADER CENTRÉ */}
// // // // // // // // //       <header className="w-full border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 flex justify-center h-16">
// // // // // // // // //           <div className="w-full max-w-[1400px] px-6 flex justify-between items-center">
// // // // // // // // //             <div className="flex items-center gap-4">
// // // // // // // // //                 <h1 className="text-xl font-bold tracking-tight text-foreground">
// // // // // // // // //                 Simulateur Qurtuba <span className="text-primary">Ultimate</span>
// // // // // // // // //                 </h1>
// // // // // // // // //                 <Badge variant="outline" className="text-xs font-normal text-muted-foreground hidden md:inline-flex">v8.1</Badge>
// // // // // // // // //             </div>
// // // // // // // // //             <div className="flex items-center gap-2">
// // // // // // // // //                 {!simulation.isCompliant && <Badge variant="destructive" className="animate-pulse">Non Conforme</Badge>}
// // // // // // // // //                 <ModeToggle />
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //       </header>

// // // // // // // // //       {/* CONTENU PRINCIPAL CENTRÉ */}
// // // // // // // // //       <div className="w-full max-w-[1400px] p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
// // // // // // // // //           {/* --- COLONNE GAUCHE (Contrôles) --- */}
// // // // // // // // //           <aside className="lg:col-span-4 space-y-6">
            
// // // // // // // // //             {/* 1. Financement */}
// // // // // // // // //             <Card className={`shadow-md border-border transition-all duration-300 ${!simulation.isCompliant ? "border-destructive/50 ring-1 ring-destructive/20" : ""}`}>
// // // // // // // // //               <CardHeader className="pb-3"><CardTitle className="text-base">1. Financement</CardTitle></CardHeader>
// // // // // // // // //               <CardContent className="space-y-5">
// // // // // // // // //                 <div className="space-y-3">
// // // // // // // // //                    <div className="flex justify-between items-baseline"><Label>Prix maison</Label><span className="font-bold text-lg text-primary">{currency.format(price)}</span></div>
// // // // // // // // //                    <Slider min={100000} max={1500000} step={5000} value={[price]} onValueChange={(v) => setPrice(v[0])} />
// // // // // // // // //                 </div>
// // // // // // // // //                  <div className="space-y-3">
// // // // // // // // //                    <div className="flex justify-between items-baseline">
// // // // // // // // //                       <Label className={!simulation.isCompliant ? "text-destructive" : ""}>Votre Apport</Label>
// // // // // // // // //                       <span className={`font-bold text-lg ${!simulation.isCompliant ? "text-destructive" : "text-green-500"}`}>{currency.format(downPayment)}</span>
// // // // // // // // //                   </div>
// // // // // // // // //                    <Slider min={0} max={price} step={1000} value={[downPayment]} onValueChange={(v) => setDownPayment(v[0])} />
// // // // // // // // //                    <div className="flex justify-between text-xs text-muted-foreground">
// // // // // // // // //                       <span>Min requis: {currency.format(simulation.minDownPaymentRequired)}</span>
// // // // // // // // //                       {!simulation.isCompliant && <span className="text-destructive font-bold flex items-center gap-1"><Lock className="h-3 w-3"/> Insuffisant</span>}
// // // // // // // // //                    </div>
// // // // // // // // //                 </div>
// // // // // // // // //                  <div className="space-y-3">
// // // // // // // // //                    <div className="flex justify-between items-baseline"><Label>Durée</Label><span className="font-bold text-lg">{durationYears} ans</span></div>
// // // // // // // // //                    <Slider min={1} max={30} step={1} value={[durationYears]} onValueChange={(v) => setDurationYears(v[0])} />
// // // // // // // // //                 </div>
// // // // // // // // //               </CardContent>
// // // // // // // // //             </Card>

// // // // // // // // //             {/* 2. Charges */}
// // // // // // // // //             <Card className="shadow-sm border-border">
// // // // // // // // //               <CardHeader className="pb-3"><CardTitle className="text-base">2. Charges (Annuel)</CardTitle></CardHeader>
// // // // // // // // //               <CardContent className="space-y-4">
// // // // // // // // //                  <div className="grid grid-cols-2 gap-4">
// // // // // // // // //                     <div className="space-y-2"><Label className="text-xs text-muted-foreground">Taxe Municipale</Label><Input type="number" value={municipalTax} onChange={(e) => setMunicipalTax(Number(e.target.value))} /></div>
// // // // // // // // //                     <div className="space-y-2"><Label className="text-xs text-muted-foreground">Taxe Scolaire</Label><Input type="number" value={schoolTax} onChange={(e) => setSchoolTax(Number(e.target.value))} /></div>
// // // // // // // // //                  </div>
// // // // // // // // //                  <div className="space-y-2"><Label className="text-xs text-muted-foreground">Assurance Habitation</Label><Input type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} /></div>
// // // // // // // // //               </CardContent>
// // // // // // // // //             </Card>

// // // // // // // // //             {/* 3. Accélérateur */}
// // // // // // // // //             <Card className="shadow-md border-primary/20 bg-primary/5">
// // // // // // // // //               <CardHeader className="pb-3"><CardTitle className="text-primary text-base flex items-center gap-2">🚀 Accélérateur</CardTitle></CardHeader>
// // // // // // // // //               <CardContent className="space-y-4">
// // // // // // // // //                 <div className="space-y-2">
// // // // // // // // //                    <div className="flex justify-between text-sm"><Label>Extra Mensuel</Label><span className="font-bold text-primary">+{currency.format(extraMonthly)}</span></div>
// // // // // // // // //                    <Slider min={0} max={2000} step={50} value={[extraMonthly]} onValueChange={(v) => setExtraMonthly(v[0])} />
// // // // // // // // //                 </div>
// // // // // // // // //                 <div className="space-y-2">
// // // // // // // // //                    <div className="flex justify-between text-sm"><Label>Extra Annuel</Label><span className="font-bold text-primary">+{currency.format(extraAnnual)}</span></div>
// // // // // // // // //                    <Slider min={0} max={20000} step={500} value={[extraAnnual]} onValueChange={(v) => setExtraAnnual(v[0])} />
// // // // // // // // //                 </div>
// // // // // // // // //               </CardContent>
// // // // // // // // //             </Card>

// // // // // // // // //             {/* 4. Cash Day 1 */}
// // // // // // // // //             <Card className="shadow-sm border-border bg-card/20">
// // // // // // // // //                 <CardHeader className="pb-2"><CardTitle className="text-sm">Cash Day 1 (Requis)</CardTitle></CardHeader>
// // // // // // // // //                 <CardContent className="space-y-2 text-sm">
// // // // // // // // //                     <div className="flex justify-between"><span className="text-muted-foreground">Mise de fonds</span><span>{currency.format(downPayment)}</span></div>
// // // // // // // // //                     <div className="flex justify-between"><span className="text-muted-foreground">Taxe Bienvenue</span><span>{currency.format(welcomeTax)}</span></div>
// // // // // // // // //                     <div className="flex justify-between"><span className="text-muted-foreground">Notaire + Ajust.</span><span>{currency.format(notaryFees)}</span></div>
// // // // // // // // //                     <div className="flex justify-between"><span className="text-muted-foreground">Insp. + Éval.</span><span>{currency.format(startupFees)}</span></div>
// // // // // // // // //                      <div className="flex justify-between font-bold border-t pt-2 mt-2 text-base"><span>TOTAL</span><span className="text-primary">{currency.format(totalCashRequired)}</span></div>
// // // // // // // // //                 </CardContent>
// // // // // // // // //             </Card>

// // // // // // // // //             {/* Disclaimer Mobile/Desktop */}
// // // // // // // // //             <div className="p-2 opacity-60 text-[10px] text-muted-foreground text-center lg:text-left">
// // // // // // // // //                 <p>Simulation indicative. Non contractuelle. Basée sur les règles Qurtuba 2024.</p>
// // // // // // // // //             </div>
// // // // // // // // //           </aside>

// // // // // // // // //           {/* --- COLONNE DROITE (Résultats) --- */}
// // // // // // // // //           <section className="lg:col-span-8 space-y-6 relative">
            
// // // // // // // // //              {/* OVERLAY D'ERREUR */}
// // // // // // // // //              {!simulation.isCompliant && (
// // // // // // // // //                 <div className="absolute inset-0 z-50 flex items-start justify-center pt-20 backdrop-blur-md bg-background/50 rounded-xl">
// // // // // // // // //                     <div className="bg-card border border-destructive shadow-2xl p-8 rounded-xl max-w-md text-center space-y-4">
// // // // // // // // //                         <Lock className="h-10 w-10 text-destructive mx-auto" />
// // // // // // // // //                         <h3 className="text-xl font-bold text-destructive">Financement Impossible</h3>
// // // // // // // // //                         <p className="text-muted-foreground">{simulation.complianceError}</p>
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>
// // // // // // // // //             )}

// // // // // // // // //             {/* CONTENU FLOU SI ERREUR */}
// // // // // // // // //             <div className={`space-y-6 transition-all duration-300 ${!simulation.isCompliant ? "opacity-20 blur-sm pointer-events-none" : ""}`}>
                
// // // // // // // // //                 {/* 1. KPIs */}
// // // // // // // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// // // // // // // // //                      <Card className="bg-primary/10 border-primary/30 shadow-md">
// // // // // // // // //                         <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-primary uppercase tracking-wider">Budget Mensuel</CardTitle></CardHeader>
// // // // // // // // //                         <CardContent className="p-4 pt-1">
// // // // // // // // //                             <div className="text-3xl font-bold text-primary">{currency.format(totalMonthlyOutPocket)}</div>
// // // // // // // // //                             <div className="text-[10px] opacity-70 mt-1 font-medium">Hypothèque + Charges</div>
// // // // // // // // //                         </CardContent>
// // // // // // // // //                     </Card>
// // // // // // // // //                     <Card className="shadow-sm">
// // // // // // // // //                         <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Intérêts Payés</CardTitle></CardHeader>
// // // // // // // // //                         <CardContent className="p-4 pt-1"><div className="text-2xl font-bold text-orange-500">{currency.format(simulation.totalInterestPaid)}</div></CardContent>
// // // // // // // // //                     </Card>
// // // // // // // // //                     <Card className="shadow-sm">
// // // // // // // // //                         <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Économies</CardTitle></CardHeader>
// // // // // // // // //                         <CardContent className="p-4 pt-1"><div className="text-2xl font-bold text-green-500">{currency.format(simulation.interestSaved)}</div></CardContent>
// // // // // // // // //                     </Card>
// // // // // // // // //                     <Card className="shadow-sm">
// // // // // // // // //                         <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Durée Réelle</CardTitle></CardHeader>
// // // // // // // // //                         <CardContent className="p-4 pt-1"><div className="text-2xl font-bold">{Math.floor(simulation.actualDurationMonths / 12)}a {simulation.actualDurationMonths % 12}m</div></CardContent>
// // // // // // // // //                     </Card>
// // // // // // // // //                 </div>

// // // // // // // // //                 {/* 2. GRAPHIQUE (CORRIGÉ : PLUS D'ESPACE) */}
// // // // // // // // //                 <Card className="shadow-lg border-border overflow-hidden">
// // // // // // // // //                     <CardHeader className="p-6 pb-2">
// // // // // // // // //                         <CardTitle>Projection du capital</CardTitle>
// // // // // // // // //                         <p className="text-sm text-muted-foreground">Voyez l&apos;évolution de votre capital vs les frais.</p>
// // // // // // // // //                     </CardHeader>
// // // // // // // // //                     {/* Padding ajusté pour que le graphique ne touche pas les bords */}
// // // // // // // // //                     <CardContent className="p-6 h-[400px]">
// // // // // // // // //                         <ResponsiveContainer width="100%" height="100%">
// // // // // // // // //                             <AreaChart data={simulation.schedule} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
// // // // // // // // //                                 <defs>
// // // // // // // // //                                 <linearGradient id="colorRent" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--destructive)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--destructive)" stopOpacity={0}/></linearGradient>
// // // // // // // // //                                 <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient>
// // // // // // // // //                                 </defs>
// // // // // // // // //                                 <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} stroke="var(--border)" />
// // // // // // // // //                                 <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} minTickGap={30} />
// // // // // // // // //                                 <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} width={40} />
// // // // // // // // //                                 <Tooltip formatter={(value: number) => currency.format(value)} labelFormatter={(label) => `Mois ${label}`} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '13px' }} />
// // // // // // // // //                                 <Legend verticalAlign="top" height={36} wrapperStyle={{top: -10}} />
// // // // // // // // //                                 <Area type="monotone" dataKey="rentPayment" name="Loyer" stroke="var(--destructive)" fillOpacity={1} fill="url(#colorRent)" stackId="1" />
// // // // // // // // //                                 <Area type="monotone" dataKey="principalPayment" name="Capital" stroke="var(--primary)" fillOpacity={1} fill="url(#colorPrincipal)" stackId="1" />
// // // // // // // // //                             </AreaChart>
// // // // // // // // //                         </ResponsiveContainer>
// // // // // // // // //                     </CardContent>
// // // // // // // // //                 </Card>

// // // // // // // // //                 {/* 3. TABLEAU */}
// // // // // // // // //                 <Card className="shadow-lg border-border overflow-hidden">
// // // // // // // // //                      <div className="flex items-center justify-between p-4 border-b bg-muted/20">
// // // // // // // // //                         <div className="flex items-center gap-2">
// // // // // // // // //                             <CardTitle className="text-base">Tableau détaillé</CardTitle>
// // // // // // // // //                             <Badge variant="outline" className="text-[10px] font-normal">{simulation.schedule.length} mois</Badge>
// // // // // // // // //                         </div>
// // // // // // // // //                         <Button variant="outline" size="sm" onClick={handleExportCSV} className="h-8 text-xs gap-2">
// // // // // // // // //                             <Download className="h-3.5 w-3.5" /> Exporter CSV
// // // // // // // // //                         </Button>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="max-h-[500px] overflow-auto">
// // // // // // // // //                         <Table>
// // // // // // // // //                             <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
// // // // // // // // //                                 <TableRow>
// // // // // // // // //                                     <TableHead className="w-[80px]">Mois</TableHead>
// // // // // // // // //                                     <TableHead>Loyer</TableHead>
// // // // // // // // //                                     <TableHead>Capital</TableHead>
// // // // // // // // //                                     <TableHead>Total</TableHead>
// // // // // // // // //                                     <TableHead className="text-right">Solde</TableHead>
// // // // // // // // //                                 </TableRow>
// // // // // // // // //                             </TableHeader>
// // // // // // // // //                             <TableBody>
// // // // // // // // //                                 {simulation.schedule.map((row) => (
// // // // // // // // //                                     <TableRow key={row.month} className="hover:bg-muted/50">
// // // // // // // // //                                         <TableCell className="font-medium text-muted-foreground">{row.month}</TableCell>
// // // // // // // // //                                         <TableCell className="text-orange-500">{currency.format(row.rentPayment)}</TableCell>
// // // // // // // // //                                         <TableCell className="text-primary font-medium">{currency.format(row.principalPayment)}</TableCell>
// // // // // // // // //                                         <TableCell>{currency.format(row.totalPayment)}</TableCell>
// // // // // // // // //                                         <TableCell className="text-right text-muted-foreground">{currency.format(row.remainingBankBalance)}</TableCell>
// // // // // // // // //                                     </TableRow>
// // // // // // // // //                                 ))}
// // // // // // // // //                             </TableBody>
// // // // // // // // //                         </Table>
// // // // // // // // //                     </div>
// // // // // // // // //                 </Card>
// // // // // // // // //              </div>
// // // // // // // // //           </section>
// // // // // // // // //       </div>
// // // // // // // // //     </main>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // "use client";

// // // // // // // // import { useState, useMemo } from "react";
// // // // // // // // import { QurtubaSimulator, SimulationResult } from "@/lib/qurtuba-logic";
// // // // // // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // // import { Label } from "@/components/ui/label";
// // // // // // // // import { Slider } from "@/components/ui/slider";
// // // // // // // // import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
// // // // // // // // import { ModeToggle } from "@/components/mode-toggle";
// // // // // // // // import {
// // // // // // // //   Table,
// // // // // // // //   TableBody,
// // // // // // // //   TableCell,
// // // // // // // //   TableHead,
// // // // // // // //   TableHeader,
// // // // // // // //   TableRow,
// // // // // // // // } from "@/components/ui/table"
// // // // // // // // import { Badge } from "@/components/ui/badge"
// // // // // // // // import { Button } from "@/components/ui/button"
// // // // // // // // import { Lock, Download, Info, Zap, Wallet } from "lucide-react"

// // // // // // // // export default function Home() {
// // // // // // // //   const [price, setPrice] = useState(500000);
// // // // // // // //   const [downPayment, setDownPayment] = useState(100000);
// // // // // // // //   const [durationYears, setDurationYears] = useState(25);
// // // // // // // //   const [extraMonthly, setExtraMonthly] = useState(0);
// // // // // // // //   const [extraAnnual, setExtraAnnual] = useState(0);
  
// // // // // // // //   // CHARGES ANNUELLES
// // // // // // // //   const [municipalTax, setMunicipalTax] = useState(3000);
// // // // // // // //   const [schoolTax, setSchoolTax] = useState(350);
// // // // // // // //   const [insurance, setInsurance] = useState(1200);
// // // // // // // //   const [hydro, setHydro] = useState(1800); // 150$/mois par défaut
  
// // // // // // // //   const rate = 5.5; 

// // // // // // // //   const { simulation, welcomeTax, notaryFees, startupFees } = useMemo(() => {
// // // // // // // //     const sim = new QurtubaSimulator(price, downPayment, rate, durationYears, extraMonthly, extraAnnual);
// // // // // // // //     return {
// // // // // // // //         simulation: sim.generateSchedule(),
// // // // // // // //         welcomeTax: sim.calculateWelcomeTax(),
// // // // // // // //         notaryFees: sim.calculateNotaryFees(),
// // // // // // // //         startupFees: sim.calculateStartupFees()
// // // // // // // //     };
// // // // // // // //   }, [price, downPayment, durationYears, extraMonthly, extraAnnual]);

// // // // // // // //   const currency = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

// // // // // // // //   const totalCashRequired = downPayment + welcomeTax + notaryFees + startupFees;
  
// // // // // // // //   // Calcul précis du budget
// // // // // // // //   const monthlyCharges = (municipalTax + schoolTax + insurance + hydro) / 12;
// // // // // // // //   const paymentQurtuba = simulation.monthlyPaymentFixed + extraMonthly;
// // // // // // // //   const totalMonthlyOutPocket = paymentQurtuba + monthlyCharges;

// // // // // // // //   const handleExportCSV = () => {
// // // // // // // //     if (!simulation.schedule || simulation.schedule.length === 0) return;
// // // // // // // //     const headers = ["Mois,Loyer (Frais),Capital (Parts),Paiement Total,Solde Banque,Votre Capital"];
// // // // // // // //     const rows = simulation.schedule.map(row => 
// // // // // // // //       `${row.month},${row.rentPayment.toFixed(2)},${row.principalPayment.toFixed(2)},${row.totalPayment.toFixed(2)},${row.remainingBankBalance.toFixed(2)},${row.memberEquity.toFixed(2)}`
// // // // // // // //     );
// // // // // // // //     const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
// // // // // // // //     const encodedUri = encodeURI(csvContent);
// // // // // // // //     const link = document.createElement("a");
// // // // // // // //     link.setAttribute("href", encodedUri);
// // // // // // // //     link.setAttribute("download", "simulation_qurtuba.csv");
// // // // // // // //     document.body.appendChild(link);
// // // // // // // //     link.click();
// // // // // // // //     document.body.removeChild(link);
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <main className="min-h-screen w-full bg-background font-sans flex flex-col items-center pb-12">
      
// // // // // // // //       {/* HEADER */}
// // // // // // // //       <header className="w-full border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 flex justify-center h-16">
// // // // // // // //           <div className="w-full max-w-[1400px] px-6 flex justify-between items-center">
// // // // // // // //             <div className="flex items-center gap-4">
// // // // // // // //                 <h1 className="text-xl font-bold tracking-tight text-foreground">
// // // // // // // //                 Simulateur Qurtuba <span className="text-primary">Ultimate</span>
// // // // // // // //                 </h1>
// // // // // // // //                 <Badge variant="outline" className="text-xs font-normal text-muted-foreground hidden md:inline-flex">v9.1</Badge>
// // // // // // // //             </div>
// // // // // // // //             <div className="flex items-center gap-2">
// // // // // // // //                 {!simulation.isCompliant && <Badge variant="destructive" className="animate-pulse">Non Conforme</Badge>}
// // // // // // // //                 <ModeToggle />
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //       </header>

// // // // // // // //       {/* CONTENU PRINCIPAL */}
// // // // // // // //       <div className="w-full max-w-[1400px] p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
// // // // // // // //           {/* --- COLONNE GAUCHE (Contrôles) --- */}
// // // // // // // //           <aside className="lg:col-span-4 space-y-6">
            
// // // // // // // //             {/* 1. Financement */}
// // // // // // // //             <Card className={`shadow-md border-border transition-all duration-300 ${!simulation.isCompliant ? "border-destructive/50 ring-1 ring-destructive/20" : ""}`}>
// // // // // // // //               <CardHeader className="pb-3"><CardTitle className="text-base">1. Financement</CardTitle></CardHeader>
// // // // // // // //               <CardContent className="space-y-5">
// // // // // // // //                 <div className="space-y-3">
// // // // // // // //                    <div className="flex justify-between items-baseline"><Label>Prix maison</Label><span className="font-bold text-lg text-primary">{currency.format(price)}</span></div>
// // // // // // // //                    <Slider min={100000} max={1500000} step={5000} value={[price]} onValueChange={(v) => setPrice(v[0])} />
// // // // // // // //                 </div>
// // // // // // // //                  <div className="space-y-3">
// // // // // // // //                    <div className="flex justify-between items-baseline">
// // // // // // // //                       <Label className={!simulation.isCompliant ? "text-destructive" : ""}>Votre Apport</Label>
// // // // // // // //                       <span className={`font-bold text-lg ${!simulation.isCompliant ? "text-destructive" : "text-green-500"}`}>{currency.format(downPayment)}</span>
// // // // // // // //                   </div>
// // // // // // // //                    <Slider min={0} max={price} step={1000} value={[downPayment]} onValueChange={(v) => setDownPayment(v[0])} />
// // // // // // // //                    <div className="flex justify-between text-xs text-muted-foreground">
// // // // // // // //                       <span>Min requis: {currency.format(simulation.minDownPaymentRequired)}</span>
// // // // // // // //                       {!simulation.isCompliant && <span className="text-destructive font-bold flex items-center gap-1"><Lock className="h-3 w-3"/> Insuffisant</span>}
// // // // // // // //                    </div>
// // // // // // // //                 </div>
// // // // // // // //                  <div className="space-y-3">
// // // // // // // //                    <div className="flex justify-between items-baseline"><Label>Durée</Label><span className="font-bold text-lg">{durationYears} ans</span></div>
// // // // // // // //                    <Slider min={1} max={30} step={1} value={[durationYears]} onValueChange={(v) => setDurationYears(v[0])} />
// // // // // // // //                 </div>
// // // // // // // //               </CardContent>
// // // // // // // //             </Card>

// // // // // // // //             {/* 2. Charges Complètes */}
// // // // // // // //             <Card className="shadow-sm border-border">
// // // // // // // //               <CardHeader className="pb-3"><CardTitle className="text-base">2. Charges Annuelles</CardTitle></CardHeader>
// // // // // // // //               <CardContent className="space-y-4">
// // // // // // // //                  <div className="grid grid-cols-2 gap-4">
// // // // // // // //                     <div className="space-y-2"><Label className="text-xs text-muted-foreground">Taxe Municipale</Label><Input type="number" value={municipalTax} onChange={(e) => setMunicipalTax(Number(e.target.value))} /></div>
// // // // // // // //                     <div className="space-y-2"><Label className="text-xs text-muted-foreground">Taxe Scolaire</Label><Input type="number" value={schoolTax} onChange={(e) => setSchoolTax(Number(e.target.value))} /></div>
// // // // // // // //                  </div>
// // // // // // // //                  <div className="grid grid-cols-2 gap-4">
// // // // // // // //                     <div className="space-y-2"><Label className="text-xs text-muted-foreground">Assurance</Label><Input type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} /></div>
// // // // // // // //                     {/* CHAMP HYDRO */}
// // // // // // // //                     <div className="space-y-2"><Label className="text-xs text-muted-foreground flex items-center gap-1"><Zap className="h-3 w-3 text-yellow-500"/> Hydro-Québec</Label><Input type="number" value={hydro} onChange={(e) => setHydro(Number(e.target.value))} /></div>
// // // // // // // //                  </div>
// // // // // // // //               </CardContent>
// // // // // // // //             </Card>

// // // // // // // //             {/* 3. Accélérateur */}
// // // // // // // //             <Card className="shadow-md border-primary/20 bg-primary/5">
// // // // // // // //               <CardHeader className="pb-3"><CardTitle className="text-primary text-base flex items-center gap-2">🚀 Accélérateur</CardTitle></CardHeader>
// // // // // // // //               <CardContent className="space-y-4">
// // // // // // // //                 <div className="space-y-2">
// // // // // // // //                    <div className="flex justify-between text-sm"><Label>Extra Mensuel</Label><span className="font-bold text-primary">+{currency.format(extraMonthly)}</span></div>
// // // // // // // //                    <Slider min={0} max={2000} step={50} value={[extraMonthly]} onValueChange={(v) => setExtraMonthly(v[0])} />
// // // // // // // //                 </div>
// // // // // // // //                 <div className="space-y-2">
// // // // // // // //                    <div className="flex justify-between text-sm"><Label>Extra Annuel</Label><span className="font-bold text-primary">+{currency.format(extraAnnual)}</span></div>
// // // // // // // //                    <Slider min={0} max={20000} step={500} value={[extraAnnual]} onValueChange={(v) => setExtraAnnual(v[0])} />
// // // // // // // //                 </div>
// // // // // // // //               </CardContent>
// // // // // // // //             </Card>

// // // // // // // //             {/* 4. Cash Day 1 */}
// // // // // // // //             <Card className="shadow-sm border-border bg-card/20">
// // // // // // // //                 <CardHeader className="pb-2"><CardTitle className="text-sm">Cash Day 1 (Requis)</CardTitle></CardHeader>
// // // // // // // //                 <CardContent className="space-y-2 text-sm">
// // // // // // // //                     <div className="flex justify-between"><span className="text-muted-foreground">Mise de fonds</span><span>{currency.format(downPayment)}</span></div>
// // // // // // // //                     <div className="flex justify-between"><span className="text-muted-foreground">Taxe Bienvenue</span><span>{currency.format(welcomeTax)}</span></div>
// // // // // // // //                     <div className="flex justify-between"><span className="text-muted-foreground">Notaire + Ajust.</span><span>{currency.format(notaryFees)}</span></div>
// // // // // // // //                     <div className="flex justify-between"><span className="text-muted-foreground">Insp. + Éval.</span><span>{currency.format(startupFees)}</span></div>
// // // // // // // //                      <div className="flex justify-between font-bold border-t pt-2 mt-2 text-base"><span>TOTAL</span><span className="text-primary">{currency.format(totalCashRequired)}</span></div>
// // // // // // // //                 </CardContent>
// // // // // // // //             </Card>
// // // // // // // //             {/* Carte 5: Revenu Requis (NOUVEAU) */}
// // // // // // // //                 <Card className="shadow-sm border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
// // // // // // // //                     <CardHeader className="p-4 pb-2"><CardTitle className="text-sm flex items-center gap-2 text-blue-700 dark:text-blue-400"><Wallet className="h-4 w-4"/> Revenu Requis (Est.)</CardTitle></CardHeader>
// // // // // // // //                     <CardContent className="p-4 space-y-2">
// // // // // // // //                         <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
// // // // // // // //                             {currency.format((totalMonthlyOutPocket * 12) / 0.32)}
// // // // // // // //                         </div>
// // // // // // // //                         <p className="text-[10px] text-muted-foreground leading-tight">
// // // // // // // //                             Basé sur un ratio d&apos;endettement (ABD) standard de 32% incluant les charges.
// // // // // // // //                         </p>
// // // // // // // //                     </CardContent>
// // // // // // // //                 </Card>

// // // // // // // //           </aside>

// // // // // // // //           {/* --- COLONNE DROITE (Résultats) --- */}
// // // // // // // //           <section className="lg:col-span-8 space-y-6 relative">
            
// // // // // // // //              {/* OVERLAY D'ERREUR */}
// // // // // // // //              {!simulation.isCompliant && (
// // // // // // // //                 <div className="absolute inset-0 z-50 flex items-start justify-center pt-20 backdrop-blur-md bg-background/50 rounded-xl">
// // // // // // // //                     <div className="bg-card border border-destructive shadow-2xl p-8 rounded-xl max-w-md text-center space-y-4">
// // // // // // // //                         <Lock className="h-10 w-10 text-destructive mx-auto" />
// // // // // // // //                         <h3 className="text-xl font-bold text-destructive">Financement Impossible</h3>
// // // // // // // //                         <p className="text-muted-foreground">{simulation.complianceError}</p>
// // // // // // // //                     </div>
// // // // // // // //                 </div>
// // // // // // // //             )}

// // // // // // // //             {/* CONTENU FLOU SI ERREUR */}
// // // // // // // //             <div className={`space-y-6 transition-all duration-300 ${!simulation.isCompliant ? "opacity-20 blur-sm pointer-events-none" : ""}`}>
                
// // // // // // // //                 {/* 1. KPIs AVEC DÉTAIL BUDGET */}
// // // // // // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// // // // // // // //                      <Card className="bg-primary/10 border-primary/30 shadow-md">
// // // // // // // //                         <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-primary uppercase tracking-wider">Budget Mensuel</CardTitle></CardHeader>
// // // // // // // //                         <CardContent className="p-4 pt-1">
// // // // // // // //                             <div className="text-3xl font-bold text-primary">{currency.format(totalMonthlyOutPocket)}</div>
                            
// // // // // // // //                             {/* DÉTAIL AJOUTÉ ICI */}
// // // // // // // //                             <div className="flex flex-wrap gap-2 mt-2">
// // // // // // // //                                 <Badge variant="outline" className="text-[10px] bg-background/50 border-primary/30 text-primary">
// // // // // // // //                                     Qurtuba: {currency.format(paymentQurtuba)}
// // // // // // // //                                 </Badge>
// // // // // // // //                                 <Badge variant="outline" className="text-[10px] bg-background/50 border-orange-500/30 text-orange-600 dark:text-orange-400">
// // // // // // // //                                     Charges: {currency.format(monthlyCharges)}
// // // // // // // //                                 </Badge>
// // // // // // // //                             </div>
// // // // // // // //                         </CardContent>
// // // // // // // //                     </Card>
// // // // // // // //                     <Card className="shadow-sm">
// // // // // // // //                         <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Intérêts Payés</CardTitle></CardHeader>
// // // // // // // //                         <CardContent className="p-4 pt-1"><div className="text-2xl font-bold text-orange-500">{currency.format(simulation.totalInterestPaid)}</div></CardContent>
// // // // // // // //                     </Card>
// // // // // // // //                     <Card className="shadow-sm">
// // // // // // // //                         <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Économies</CardTitle></CardHeader>
// // // // // // // //                         <CardContent className="p-4 pt-1"><div className="text-2xl font-bold text-green-500">{currency.format(simulation.interestSaved)}</div></CardContent>
// // // // // // // //                     </Card>
// // // // // // // //                     <Card className="shadow-sm">
// // // // // // // //                         <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Durée Réelle</CardTitle></CardHeader>
// // // // // // // //                         <CardContent className="p-4 pt-1"><div className="text-2xl font-bold">{Math.floor(simulation.actualDurationMonths / 12)}a {simulation.actualDurationMonths % 12}m</div></CardContent>
// // // // // // // //                     </Card>
// // // // // // // //                 </div>

// // // // // // // //                 {/* 2. GRAPHIQUE */}
// // // // // // // //                 <Card className="shadow-lg border-border overflow-hidden">
// // // // // // // //                     <CardHeader className="p-6 pb-2">
// // // // // // // //                         <CardTitle>Projection du capital</CardTitle>
// // // // // // // //                         <p className="text-sm text-muted-foreground">Voyez l&apos;évolution de votre capital vs les frais.</p>
// // // // // // // //                     </CardHeader>
// // // // // // // //                     <CardContent className="p-6 h-[400px]">
// // // // // // // //                         <ResponsiveContainer width="100%" height="100%">
// // // // // // // //                             <AreaChart data={simulation.schedule} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
// // // // // // // //                                 <defs>
// // // // // // // //                                 <linearGradient id="colorRent" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--destructive)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--destructive)" stopOpacity={0}/></linearGradient>
// // // // // // // //                                 <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient>
// // // // // // // //                                 </defs>
// // // // // // // //                                 <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} stroke="var(--border)" />
// // // // // // // //                                 <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} minTickGap={30} />
// // // // // // // //                                 <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} width={40} />
// // // // // // // //                                 <Tooltip formatter={(value: number) => currency.format(value)} labelFormatter={(label) => `Mois ${label}`} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '13px' }} />
// // // // // // // //                                 <Legend verticalAlign="top" height={36} wrapperStyle={{top: -10}} />
// // // // // // // //                                 <Area type="monotone" dataKey="rentPayment" name="Loyer" stroke="var(--destructive)" fillOpacity={1} fill="url(#colorRent)" stackId="1" />
// // // // // // // //                                 <Area type="monotone" dataKey="principalPayment" name="Capital" stroke="var(--primary)" fillOpacity={1} fill="url(#colorPrincipal)" stackId="1" />
// // // // // // // //                             </AreaChart>
// // // // // // // //                         </ResponsiveContainer>
// // // // // // // //                     </CardContent>
// // // // // // // //                 </Card>

// // // // // // // //                 {/* 3. TABLEAU */}
// // // // // // // //                 <Card className="shadow-lg border-border overflow-hidden">
// // // // // // // //                      <div className="flex items-center justify-between p-4 border-b bg-muted/20">
// // // // // // // //                         <div className="flex items-center gap-2">
// // // // // // // //                             <CardTitle className="text-base">Tableau détaillé</CardTitle>
// // // // // // // //                             <Badge variant="outline" className="text-[10px] font-normal">{simulation.schedule.length} mois</Badge>
// // // // // // // //                         </div>
// // // // // // // //                         <Button variant="outline" size="sm" onClick={handleExportCSV} className="h-8 text-xs gap-2">
// // // // // // // //                             <Download className="h-3.5 w-3.5" /> Exporter CSV
// // // // // // // //                         </Button>
// // // // // // // //                     </div>
// // // // // // // //                     <div className="max-h-[500px] overflow-auto">
// // // // // // // //                         <Table>
// // // // // // // //                             <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
// // // // // // // //                                 <TableRow>
// // // // // // // //                                     <TableHead className="w-[80px]">Mois</TableHead>
// // // // // // // //                                     <TableHead>Loyer</TableHead>
// // // // // // // //                                     <TableHead>Capital</TableHead>
// // // // // // // //                                     <TableHead>Total</TableHead>
// // // // // // // //                                     <TableHead className="text-right">Solde</TableHead>
// // // // // // // //                                 </TableRow>
// // // // // // // //                             </TableHeader>
// // // // // // // //                             <TableBody>
// // // // // // // //                                 {simulation.schedule.map((row) => (
// // // // // // // //                                     <TableRow key={row.month} className="hover:bg-muted/50">
// // // // // // // //                                         <TableCell className="font-medium text-muted-foreground">{row.month}</TableCell>
// // // // // // // //                                         <TableCell className="text-orange-500">{currency.format(row.rentPayment)}</TableCell>
// // // // // // // //                                         <TableCell className="text-primary font-medium">{currency.format(row.principalPayment)}</TableCell>
// // // // // // // //                                         <TableCell>{currency.format(row.totalPayment)}</TableCell>
// // // // // // // //                                         <TableCell className="text-right text-muted-foreground">{currency.format(row.remainingBankBalance)}</TableCell>
// // // // // // // //                                     </TableRow>
// // // // // // // //                                 ))}
// // // // // // // //                             </TableBody>
// // // // // // // //                         </Table>
// // // // // // // //                     </div>
// // // // // // // //                 </Card>
// // // // // // // //              </div>
// // // // // // // //           </section>
// // // // // // // //       </div>
// // // // // // // //     </main>
// // // // // // // //   );
// // // // // // // // }


// // // // // // // "use client";

// // // // // // // import { useState, useMemo } from "react";
// // // // // // // import { QurtubaSimulator, SimulationResult } from "@/lib/qurtuba-logic";
// // // // // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // import { Label } from "@/components/ui/label";
// // // // // // // import { Slider } from "@/components/ui/slider";
// // // // // // // import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
// // // // // // // import { ModeToggle } from "@/components/mode-toggle";
// // // // // // // import {
// // // // // // //   Table,
// // // // // // //   TableBody,
// // // // // // //   TableCell,
// // // // // // //   TableHead,
// // // // // // //   TableHeader,
// // // // // // //   TableRow,
// // // // // // // } from "@/components/ui/table"
// // // // // // // import { Badge } from "@/components/ui/badge"
// // // // // // // import { Button } from "@/components/ui/button"
// // // // // // // import { Lock, Download, Zap, Wallet, PieChart as PieIcon, TrendingUp } from "lucide-react"

// // // // // // // export default function Home() {
// // // // // // //   const [price, setPrice] = useState(500000);
// // // // // // //   const [downPayment, setDownPayment] = useState(100000);
// // // // // // //   const [durationYears, setDurationYears] = useState(25);
// // // // // // //   const [extraMonthly, setExtraMonthly] = useState(0);
// // // // // // //   const [extraAnnual, setExtraAnnual] = useState(0);
  
// // // // // // //   // CHARGES ANNUELLES
// // // // // // //   const [municipalTax, setMunicipalTax] = useState(3000);
// // // // // // //   const [schoolTax, setSchoolTax] = useState(350);
// // // // // // //   const [insurance, setInsurance] = useState(1200);
// // // // // // //   const [hydro, setHydro] = useState(1800);
  
// // // // // // //   // ETAT D'AFFICHAGE DU GRAPHIQUE
// // // // // // //   const [chartView, setChartView] = useState<'evolution' | 'distribution'>('evolution');
  
// // // // // // //   const rate = 5.5; 

// // // // // // //   const { simulation, welcomeTax, notaryFees, startupFees } = useMemo(() => {
// // // // // // //     const sim = new QurtubaSimulator(price, downPayment, rate, durationYears, extraMonthly, extraAnnual);
// // // // // // //     return {
// // // // // // //         simulation: sim.generateSchedule(),
// // // // // // //         welcomeTax: sim.calculateWelcomeTax(),
// // // // // // //         notaryFees: sim.calculateNotaryFees(),
// // // // // // //         startupFees: sim.calculateStartupFees()
// // // // // // //     };
// // // // // // //   }, [price, downPayment, durationYears, extraMonthly, extraAnnual]);

// // // // // // //   const currency = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

// // // // // // //   const totalCashRequired = downPayment + welcomeTax + notaryFees + startupFees;
// // // // // // //   const monthlyCharges = (municipalTax + schoolTax + insurance + hydro) / 12;
// // // // // // //   const paymentQurtuba = simulation.monthlyPaymentFixed + extraMonthly;
// // // // // // //   const totalMonthlyOutPocket = paymentQurtuba + monthlyCharges;

// // // // // // //   // DONNÉES POUR LE CAMEMBERT (Répartition totale sur la durée réelle)
// // // // // // //   const totalChargesOverDuration = monthlyCharges * simulation.actualDurationMonths;
// // // // // // //   const pieData = [
// // // // // // //     { name: 'Capital (Votre argent)', value: price, color: 'var(--primary)' },
// // // // // // //     { name: 'Intérêts (Coût Banque)', value: simulation.totalInterestPaid, color: '#f97316' }, // Orange
// // // // // // //     { name: 'Taxes & Charges (Coût Vie)', value: totalChargesOverDuration, color: '#64748b' }, // Slate
// // // // // // //   ];

// // // // // // //   const handleExportCSV = () => {
// // // // // // //     if (!simulation.schedule || simulation.schedule.length === 0) return;
// // // // // // //     const headers = ["Mois,Loyer (Frais),Capital (Parts),Paiement Total,Solde Banque,Votre Capital"];
// // // // // // //     const rows = simulation.schedule.map(row => 
// // // // // // //       `${row.month},${row.rentPayment.toFixed(2)},${row.principalPayment.toFixed(2)},${row.totalPayment.toFixed(2)},${row.remainingBankBalance.toFixed(2)},${row.memberEquity.toFixed(2)}`
// // // // // // //     );
// // // // // // //     const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
// // // // // // //     const encodedUri = encodeURI(csvContent);
// // // // // // //     const link = document.createElement("a");
// // // // // // //     link.setAttribute("href", encodedUri);
// // // // // // //     link.setAttribute("download", "simulation_qurtuba.csv");
// // // // // // //     document.body.appendChild(link);
// // // // // // //     link.click();
// // // // // // //     document.body.removeChild(link);
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <main className="min-h-screen w-full bg-background font-sans flex flex-col items-center pb-12">
      
// // // // // // //       {/* HEADER */}
// // // // // // //       <header className="w-full border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 flex justify-center h-16">
// // // // // // //           <div className="w-full max-w-[1400px] px-6 flex justify-between items-center">
// // // // // // //             <div className="flex items-center gap-4">
// // // // // // //                 <h1 className="text-xl font-bold tracking-tight text-foreground">
// // // // // // //                 Simulateur Qurtuba <span className="text-primary">Ultimate</span>
// // // // // // //                 </h1>
// // // // // // //                 <Badge variant="outline" className="text-xs font-normal text-muted-foreground hidden md:inline-flex">v10.0</Badge>
// // // // // // //             </div>
// // // // // // //             <div className="flex items-center gap-2">
// // // // // // //                 {!simulation.isCompliant && <Badge variant="destructive" className="animate-pulse">Non Conforme</Badge>}
// // // // // // //                 <ModeToggle />
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //       </header>

// // // // // // //       {/* CONTENU */}
// // // // // // //       <div className="w-full max-w-[1400px] p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
// // // // // // //           {/* --- GAUCHE --- */}
// // // // // // //           <aside className="lg:col-span-4 space-y-6">
// // // // // // //             <Card className={`shadow-md border-border transition-all duration-300 ${!simulation.isCompliant ? "border-destructive/50 ring-1 ring-destructive/20" : ""}`}>
// // // // // // //               <CardHeader className="pb-3"><CardTitle className="text-base">1. Financement</CardTitle></CardHeader>
// // // // // // //               <CardContent className="space-y-5">
// // // // // // //                 <div className="space-y-3">
// // // // // // //                    <div className="flex justify-between items-baseline"><Label>Prix maison</Label><span className="font-bold text-lg text-primary">{currency.format(price)}</span></div>
// // // // // // //                    <Slider min={100000} max={1500000} step={5000} value={[price]} onValueChange={(v) => setPrice(v[0])} />
// // // // // // //                 </div>
// // // // // // //                  <div className="space-y-3">
// // // // // // //                    <div className="flex justify-between items-baseline">
// // // // // // //                       <Label className={!simulation.isCompliant ? "text-destructive" : ""}>Votre Apport</Label>
// // // // // // //                       <span className={`font-bold text-lg ${!simulation.isCompliant ? "text-destructive" : "text-green-500"}`}>{currency.format(downPayment)}</span>
// // // // // // //                   </div>
// // // // // // //                    <Slider min={0} max={price} step={1000} value={[downPayment]} onValueChange={(v) => setDownPayment(v[0])} />
// // // // // // //                    <div className="flex justify-between text-xs text-muted-foreground">
// // // // // // //                       <span>Min requis: {currency.format(simulation.minDownPaymentRequired)}</span>
// // // // // // //                       {!simulation.isCompliant && <span className="text-destructive font-bold flex items-center gap-1"><Lock className="h-3 w-3"/> Insuffisant</span>}
// // // // // // //                    </div>
// // // // // // //                 </div>
// // // // // // //                  <div className="space-y-3">
// // // // // // //                    <div className="flex justify-between items-baseline"><Label>Durée</Label><span className="font-bold text-lg">{durationYears} ans</span></div>
// // // // // // //                    <Slider min={1} max={30} step={1} value={[durationYears]} onValueChange={(v) => setDurationYears(v[0])} />
// // // // // // //                 </div>
// // // // // // //               </CardContent>
// // // // // // //             </Card>

// // // // // // //             <Card className="shadow-sm border-border">
// // // // // // //               <CardHeader className="pb-3"><CardTitle className="text-base">2. Charges Annuelles</CardTitle></CardHeader>
// // // // // // //               <CardContent className="space-y-4">
// // // // // // //                  <div className="grid grid-cols-2 gap-4">
// // // // // // //                     <div className="space-y-2"><Label className="text-xs text-muted-foreground">Taxe Municipale</Label><Input type="number" value={municipalTax} onChange={(e) => setMunicipalTax(Number(e.target.value))} /></div>
// // // // // // //                     <div className="space-y-2"><Label className="text-xs text-muted-foreground">Taxe Scolaire</Label><Input type="number" value={schoolTax} onChange={(e) => setSchoolTax(Number(e.target.value))} /></div>
// // // // // // //                  </div>
// // // // // // //                  <div className="grid grid-cols-2 gap-4">
// // // // // // //                     <div className="space-y-2"><Label className="text-xs text-muted-foreground">Assurance</Label><Input type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} /></div>
// // // // // // //                     <div className="space-y-2"><Label className="text-xs text-muted-foreground flex items-center gap-1"><Zap className="h-3 w-3 text-yellow-500"/> Hydro-Québec</Label><Input type="number" value={hydro} onChange={(e) => setHydro(Number(e.target.value))} /></div>
// // // // // // //                  </div>
// // // // // // //               </CardContent>
// // // // // // //             </Card>

// // // // // // //             <Card className="shadow-md border-primary/20 bg-primary/5">
// // // // // // //               <CardHeader className="pb-3"><CardTitle className="text-primary text-base flex items-center gap-2">🚀 Accélérateur</CardTitle></CardHeader>
// // // // // // //               <CardContent className="space-y-4">
// // // // // // //                 <div className="space-y-2">
// // // // // // //                    <div className="flex justify-between text-sm"><Label>Extra Mensuel</Label><span className="font-bold text-primary">+{currency.format(extraMonthly)}</span></div>
// // // // // // //                    <Slider min={0} max={2000} step={50} value={[extraMonthly]} onValueChange={(v) => setExtraMonthly(v[0])} />
// // // // // // //                 </div>
// // // // // // //                 <div className="space-y-2">
// // // // // // //                    <div className="flex justify-between text-sm"><Label>Extra Annuel</Label><span className="font-bold text-primary">+{currency.format(extraAnnual)}</span></div>
// // // // // // //                    <Slider min={0} max={20000} step={500} value={[extraAnnual]} onValueChange={(v) => setExtraAnnual(v[0])} />
// // // // // // //                 </div>
// // // // // // //               </CardContent>
// // // // // // //             </Card>

// // // // // // //             <Card className="shadow-sm border-border bg-card/20">
// // // // // // //                 <CardHeader className="pb-2"><CardTitle className="text-sm">Cash Day 1 (Requis)</CardTitle></CardHeader>
// // // // // // //                 <CardContent className="space-y-2 text-sm">
// // // // // // //                     <div className="flex justify-between"><span className="text-muted-foreground">Mise de fonds</span><span>{currency.format(downPayment)}</span></div>
// // // // // // //                     <div className="flex justify-between"><span className="text-muted-foreground">Taxe Bienvenue</span><span>{currency.format(welcomeTax)}</span></div>
// // // // // // //                     <div className="flex justify-between"><span className="text-muted-foreground">Notaire + Ajust.</span><span>{currency.format(notaryFees)}</span></div>
// // // // // // //                     <div className="flex justify-between"><span className="text-muted-foreground">Insp. + Éval.</span><span>{currency.format(startupFees)}</span></div>
// // // // // // //                      <div className="flex justify-between font-bold border-t pt-2 mt-2 text-base"><span>TOTAL</span><span className="text-primary">{currency.format(totalCashRequired)}</span></div>
// // // // // // //                 </CardContent>
// // // // // // //             </Card>

// // // // // // //             <Card className="shadow-sm border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
// // // // // // //                 <CardHeader className="p-4 pb-2"><CardTitle className="text-sm flex items-center gap-2 text-blue-700 dark:text-blue-400"><Wallet className="h-4 w-4"/> Revenu Familial Requis</CardTitle></CardHeader>
// // // // // // //                 <CardContent className="p-4 pt-2">
// // // // // // //                     <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{currency.format((totalMonthlyOutPocket * 12) / 0.32)}</div>
// // // // // // //                     <p className="text-[10px] text-muted-foreground mt-1">Pour un ratio d&apos;endettement (ABD) de 32%.</p>
// // // // // // //                 </CardContent>
// // // // // // //             </Card>
// // // // // // //           </aside>

// // // // // // //           {/* --- DROITE --- */}
// // // // // // //           <section className="lg:col-span-8 space-y-6 relative">
            
// // // // // // //              {!simulation.isCompliant && (
// // // // // // //                 <div className="absolute inset-0 z-50 flex items-start justify-center pt-20 backdrop-blur-md bg-background/50 rounded-xl">
// // // // // // //                     <div className="bg-card border border-destructive shadow-2xl p-8 rounded-xl max-w-md text-center space-y-4">
// // // // // // //                         <Lock className="h-10 w-10 text-destructive mx-auto" />
// // // // // // //                         <h3 className="text-xl font-bold text-destructive">Financement Impossible</h3>
// // // // // // //                         <p className="text-muted-foreground">{simulation.complianceError}</p>
// // // // // // //                     </div>
// // // // // // //                 </div>
// // // // // // //             )}

// // // // // // //             <div className={`space-y-6 transition-all duration-300 ${!simulation.isCompliant ? "opacity-20 blur-sm pointer-events-none" : ""}`}>
                
// // // // // // //                 {/* KPIs */}
// // // // // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// // // // // // //                      <Card className="bg-primary/10 border-primary/30 shadow-md">
// // // // // // //                         <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-primary uppercase tracking-wider">Budget Mensuel</CardTitle></CardHeader>
// // // // // // //                         <CardContent className="p-4 pt-1">
// // // // // // //                             <div className="text-3xl font-bold text-primary">{currency.format(totalMonthlyOutPocket)}</div>
// // // // // // //                             <div className="flex flex-wrap gap-2 mt-2">
// // // // // // //                                 <Badge variant="outline" className="text-[10px] bg-background/50 border-primary/30 text-primary">Qurtuba: {currency.format(paymentQurtuba)}</Badge>
// // // // // // //                                 <Badge variant="outline" className="text-[10px] bg-background/50 border-orange-500/30 text-orange-600 dark:text-orange-400">Charges: {currency.format(monthlyCharges)}</Badge>
// // // // // // //                             </div>
// // // // // // //                         </CardContent>
// // // // // // //                     </Card>
// // // // // // //                     <Card className="shadow-sm">
// // // // // // //                         <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Intérêts Payés</CardTitle></CardHeader>
// // // // // // //                         <CardContent className="p-4 pt-1"><div className="text-2xl font-bold text-orange-500">{currency.format(simulation.totalInterestPaid)}</div></CardContent>
// // // // // // //                     </Card>
// // // // // // //                     <Card className="shadow-sm">
// // // // // // //                         <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Économies</CardTitle></CardHeader>
// // // // // // //                         <CardContent className="p-4 pt-1"><div className="text-2xl font-bold text-green-500">{currency.format(simulation.interestSaved)}</div></CardContent>
// // // // // // //                     </Card>
// // // // // // //                     <Card className="shadow-sm">
// // // // // // //                         <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Durée Réelle</CardTitle></CardHeader>
// // // // // // //                         <CardContent className="p-4 pt-1"><div className="text-2xl font-bold">{Math.floor(simulation.actualDurationMonths / 12)}a {simulation.actualDurationMonths % 12}m</div></CardContent>
// // // // // // //                     </Card>
// // // // // // //                 </div>

// // // // // // //                 {/* GRAPHIQUE INTELLIGENT (Avec Toggle) */}
// // // // // // //                 <Card className="shadow-lg border-border overflow-hidden">
// // // // // // //                     <CardHeader className="p-6 pb-2 flex flex-row items-center justify-between">
// // // // // // //                         <div>
// // // // // // //                             <CardTitle>Analyse Financière</CardTitle>
// // // // // // //                             <p className="text-sm text-muted-foreground">
// // // // // // //                                 {chartView === 'evolution' ? "Projection du capital et de la dette sur la durée." : "Répartition totale de vos dépenses sur le projet."}
// // // // // // //                             </p>
// // // // // // //                         </div>
// // // // // // //                         <div className="flex bg-muted p-1 rounded-lg">
// // // // // // //                             <button onClick={() => setChartView('evolution')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartView === 'evolution' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
// // // // // // //                                 <TrendingUp className="h-4 w-4 inline mr-1"/> Évolution
// // // // // // //                             </button>
// // // // // // //                             <button onClick={() => setChartView('distribution')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartView === 'distribution' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
// // // // // // //                                 <PieIcon className="h-4 w-4 inline mr-1"/> Répartition
// // // // // // //                             </button>
// // // // // // //                         </div>
// // // // // // //                     </CardHeader>
// // // // // // //                     <CardContent className="p-6 h-[400px]">
// // // // // // //                         <ResponsiveContainer width="100%" height="100%">
// // // // // // //                             {chartView === 'evolution' ? (
// // // // // // //                                 <AreaChart data={simulation.schedule} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
// // // // // // //                                     <defs>
// // // // // // //                                     <linearGradient id="colorRent" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--destructive)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--destructive)" stopOpacity={0}/></linearGradient>
// // // // // // //                                     <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient>
// // // // // // //                                     </defs>
// // // // // // //                                     <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} stroke="var(--border)" />
// // // // // // //                                     <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} minTickGap={30} />
// // // // // // //                                     <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} width={40} />
// // // // // // //                                     <Tooltip formatter={(value: number) => currency.format(value)} labelFormatter={(label) => `Mois ${label}`} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '13px' }} />
// // // // // // //                                     <Legend verticalAlign="top" height={36} wrapperStyle={{top: -10}} />
// // // // // // //                                     <Area type="monotone" dataKey="rentPayment" name="Loyer" stroke="var(--destructive)" fillOpacity={1} fill="url(#colorRent)" stackId="1" />
// // // // // // //                                     <Area type="monotone" dataKey="principalPayment" name="Capital" stroke="var(--primary)" fillOpacity={1} fill="url(#colorPrincipal)" stackId="1" />
// // // // // // //                                 </AreaChart>
// // // // // // //                             ) : (
// // // // // // //                                 <PieChart>
// // // // // // //                                     <Pie data={pieData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
// // // // // // //                                         {pieData.map((entry, index) => (
// // // // // // //                                             <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
// // // // // // //                                         ))}
// // // // // // //                                     </Pie>
// // // // // // //                                     <Tooltip formatter={(value: number) => currency.format(value)} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '13px' }} />
// // // // // // //                                     <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
// // // // // // //                                 </PieChart>
// // // // // // //                             )}
// // // // // // //                         </ResponsiveContainer>
// // // // // // //                     </CardContent>
// // // // // // //                 </Card>

// // // // // // //                 {/* TABLEAU */}
// // // // // // //                 <Card className="shadow-lg border-border overflow-hidden">
// // // // // // //                      <div className="flex items-center justify-between p-4 border-b bg-muted/20">
// // // // // // //                         <div className="flex items-center gap-2">
// // // // // // //                             <CardTitle className="text-base">Tableau détaillé</CardTitle>
// // // // // // //                             <Badge variant="outline" className="text-[10px] font-normal">{simulation.schedule.length} mois</Badge>
// // // // // // //                         </div>
// // // // // // //                         <Button variant="outline" size="sm" onClick={handleExportCSV} className="h-8 text-xs gap-2">
// // // // // // //                             <Download className="h-3.5 w-3.5" /> Exporter CSV
// // // // // // //                         </Button>
// // // // // // //                     </div>
// // // // // // //                     <div className="max-h-[500px] overflow-auto">
// // // // // // //                         <Table>
// // // // // // //                             <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
// // // // // // //                                 <TableRow>
// // // // // // //                                     <TableHead className="w-[80px]">Mois</TableHead>
// // // // // // //                                     <TableHead>Loyer</TableHead>
// // // // // // //                                     <TableHead>Capital</TableHead>
// // // // // // //                                     <TableHead>Total</TableHead>
// // // // // // //                                     <TableHead className="text-right">Solde</TableHead>
// // // // // // //                                 </TableRow>
// // // // // // //                             </TableHeader>
// // // // // // //                             <TableBody>
// // // // // // //                                 {simulation.schedule.map((row) => (
// // // // // // //                                     <TableRow key={row.month} className="hover:bg-muted/50">
// // // // // // //                                         <TableCell className="font-medium text-muted-foreground">{row.month}</TableCell>
// // // // // // //                                         <TableCell className="text-orange-500">{currency.format(row.rentPayment)}</TableCell>
// // // // // // //                                         <TableCell className="text-primary font-medium">{currency.format(row.principalPayment)}</TableCell>
// // // // // // //                                         <TableCell>{currency.format(row.totalPayment)}</TableCell>
// // // // // // //                                         <TableCell className="text-right text-muted-foreground">{currency.format(row.remainingBankBalance)}</TableCell>
// // // // // // //                                     </TableRow>
// // // // // // //                                 ))}
// // // // // // //                             </TableBody>
// // // // // // //                         </Table>
// // // // // // //                     </div>
// // // // // // //                 </Card>
// // // // // // //              </div>
// // // // // // //           </section>
// // // // // // //       </div>
// // // // // // //     </main>
// // // // // // //   );
// // // // // // // }

// // // // // // "use client";

// // // // // // import { useState, useMemo } from "react";
// // // // // // import { QurtubaSimulator, SimulationResult } from "@/lib/qurtuba-logic";
// // // // // // import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// // // // // // import { Input } from "@/components/ui/input";
// // // // // // import { Label } from "@/components/ui/label";
// // // // // // import { Slider } from "@/components/ui/slider";
// // // // // // import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
// // // // // // import { ModeToggle } from "@/components/mode-toggle";
// // // // // // import {
// // // // // //   Table,
// // // // // //   TableBody,
// // // // // //   TableCell,
// // // // // //   TableHead,
// // // // // //   TableHeader,
// // // // // //   TableRow,
// // // // // // } from "@/components/ui/table"
// // // // // // import { Badge } from "@/components/ui/badge"
// // // // // // import { Button } from "@/components/ui/button"
// // // // // // import { Progress } from "@/components/ui/progress"
// // // // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // // // // // import { Lock, Download, Zap, Wallet, PieChart as PieIcon, TrendingUp, Home as HomeIcon, Hammer, CheckCircle2 } from "lucide-react"

// // // // // // export default function Home() {
// // // // // //   const [price, setPrice] = useState(500000);
// // // // // //   const [downPayment, setDownPayment] = useState(60000); // Mis à 60k par défaut pour montrer l'objectif
// // // // // //   const [durationYears, setDurationYears] = useState(25);
// // // // // //   const [extraMonthly, setExtraMonthly] = useState(0);
// // // // // //   const [extraAnnual, setExtraAnnual] = useState(0);
  
// // // // // //   // CHARGES ANNUELLES
// // // // // //   const [municipalTax, setMunicipalTax] = useState(3000);
// // // // // //   const [schoolTax, setSchoolTax] = useState(350);
// // // // // //   const [insurance, setInsurance] = useState(1200);
// // // // // //   const [hydro, setHydro] = useState(1800);
// // // // // //   const [maintenance, setMaintenance] = useState(2400); // NOUVEAU: Entretien/Condo (200$/mois par défaut)
  
// // // // // //   const [chartView, setChartView] = useState<'evolution' | 'distribution'>('evolution');
// // // // // //   const rate = 5.5; 

// // // // // //   const { simulation, welcomeTax, notaryFees, startupFees } = useMemo(() => {
// // // // // //     const sim = new QurtubaSimulator(price, downPayment, rate, durationYears, extraMonthly, extraAnnual);
// // // // // //     return {
// // // // // //         simulation: sim.generateSchedule(),
// // // // // //         welcomeTax: sim.calculateWelcomeTax(),
// // // // // //         notaryFees: sim.calculateNotaryFees(),
// // // // // //         startupFees: sim.calculateStartupFees()
// // // // // //     };
// // // // // //   }, [price, downPayment, durationYears, extraMonthly, extraAnnual]);

// // // // // //   const currency = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

// // // // // //   const totalCashRequired = downPayment + welcomeTax + notaryFees + startupFees;
// // // // // //   const monthlyCharges = (municipalTax + schoolTax + insurance + hydro + maintenance) / 12;
// // // // // //   const paymentQurtuba = simulation.monthlyPaymentFixed + extraMonthly;
// // // // // //   const totalMonthlyOutPocket = paymentQurtuba + monthlyCharges;

// // // // // //   // DONNÉES CAMEMBERT
// // // // // //   const totalChargesOverDuration = monthlyCharges * simulation.actualDurationMonths;
// // // // // //   const pieData = [
// // // // // //     { name: 'Capital (Votre part)', value: price, color: 'hsl(var(--primary))' },
// // // // // //     { name: 'Intérêts (Coût Banque)', value: simulation.totalInterestPaid, color: '#f97316' }, 
// // // // // //     { name: 'Charges & Entretien', value: totalChargesOverDuration, color: '#64748b' }, 
// // // // // //   ];

// // // // // //   // LOGIQUE JAUGE QURTUBA
// // // // // //   const qurtubaThreshold = 60000;
// // // // // //   const progressValue = Math.min(100, (downPayment / qurtubaThreshold) * 100);

// // // // // //   const handleExportCSV = () => {
// // // // // //     if (!simulation.schedule || simulation.schedule.length === 0) return;
// // // // // //     const headers = ["Mois,Loyer,Capital,Paiement,Solde"];
// // // // // //     const rows = simulation.schedule.map(r => `${r.month},${r.rentPayment},${r.principalPayment},${r.totalPayment},${r.remainingBankBalance}`);
// // // // // //     const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
// // // // // //     const encodedUri = encodeURI(csvContent);
// // // // // //     const link = document.createElement("a");
// // // // // //     link.setAttribute("href", encodedUri);
// // // // // //     link.setAttribute("download", "simulation_qurtuba.csv");
// // // // // //     document.body.appendChild(link);
// // // // // //     link.click();
// // // // // //     document.body.removeChild(link);
// // // // // //   };

// // // // // //   return (
// // // // // //     <main className="min-h-screen w-full bg-background font-sans flex flex-col items-center pb-12">
      
// // // // // //       {/* HEADER */}
// // // // // //       <header className="w-full border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 flex justify-center h-16">
// // // // // //           <div className="w-full max-w-[1400px] px-6 flex justify-between items-center">
// // // // // //             <div className="flex items-center gap-4">
// // // // // //                 <h1 className="text-xl font-bold tracking-tight text-foreground">
// // // // // //                 Simulateur Qurtuba <span className="text-primary">Real Life</span>
// // // // // //                 </h1>
// // // // // //                 <Badge variant="outline" className="text-xs font-normal text-muted-foreground hidden md:inline-flex">v11.0</Badge>
// // // // // //             </div>
// // // // // //             <div className="flex items-center gap-2">
// // // // // //                 {!simulation.isCompliant && <Badge variant="destructive" className="animate-pulse">Non Conforme</Badge>}
// // // // // //                 <ModeToggle />
// // // // // //             </div>
// // // // // //           </div>
// // // // // //       </header>

// // // // // //       {/* CONTENU AVEC ONGLETS */}
// // // // // //       <div className="w-full max-w-[1400px] p-6">
        
// // // // // //         <Tabs defaultValue="simulator" className="w-full space-y-6">
// // // // // //             <div className="flex justify-center">
// // // // // //                 <TabsList className="grid w-full max-w-md grid-cols-2">
// // // // // //                     <TabsTrigger value="simulator">Simulateur Financier</TabsTrigger>
// // // // // //                     <TabsTrigger value="guide">Guide des Étapes</TabsTrigger>
// // // // // //                 </TabsList>
// // // // // //             </div>

// // // // // //             {/* ONGLET 1 : LE SIMULATEUR */}
// // // // // //             <TabsContent value="simulator" className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-0">
                
// // // // // //                 {/* --- GAUCHE --- */}
// // // // // //                 <aside className="lg:col-span-4 space-y-6">
// // // // // //                     <Card className={`shadow-md border-border transition-all duration-300 ${!simulation.isCompliant ? "border-destructive/50 ring-1 ring-destructive/20" : ""}`}>
// // // // // //                         <CardHeader className="pb-3"><CardTitle className="text-base">1. Financement</CardTitle></CardHeader>
// // // // // //                         <CardContent className="space-y-5">
// // // // // //                             <div className="space-y-3">
// // // // // //                                 <div className="flex justify-between items-baseline"><Label>Prix maison</Label><span className="font-bold text-lg text-primary">{currency.format(price)}</span></div>
// // // // // //                                 <Slider min={100000} max={1500000} step={5000} value={[price]} onValueChange={(v) => setPrice(v[0])} />
// // // // // //                             </div>
// // // // // //                             <div className="space-y-3">
// // // // // //                                 <div className="flex justify-between items-baseline">
// // // // // //                                     <Label className={!simulation.isCompliant ? "text-destructive" : ""}>Votre Apport (Parts)</Label>
// // // // // //                                     <span className={`font-bold text-lg ${!simulation.isCompliant ? "text-destructive" : "text-green-500"}`}>{currency.format(downPayment)}</span>
// // // // // //                                 </div>
// // // // // //                                 <Slider min={0} max={price} step={1000} value={[downPayment]} onValueChange={(v) => setDownPayment(v[0])} />
                                
// // // // // //                                 {/* JAUGE D'ELIGIBILITE QURTUBA */}
// // // // // //                                 <div className="pt-2 space-y-1">
// // // // // //                                     <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
// // // // // //                                         <span>Liste d&apos;attente ({currency.format(qurtubaThreshold)})</span>
// // // // // //                                         <span>{Math.round(progressValue)}%</span>
// // // // // //                                     </div>
// // // // // //                                     <Progress value={progressValue} className="h-2" color={progressValue >= 100 ? "bg-green-500" : "bg-primary"} />
// // // // // //                                     {progressValue < 100 ? (
// // // // // //                                         <p className="text-[10px] text-muted-foreground text-right">Il manque {currency.format(qurtubaThreshold - downPayment)} pour la priorité.</p>
// // // // // //                                     ) : (
// // // // // //                                         <p className="text-[10px] text-green-600 font-bold text-right">Éligible liste prioritaire !</p>
// // // // // //                                     )}
// // // // // //                                 </div>
// // // // // //                             </div>
// // // // // //                             <div className="space-y-3">
// // // // // //                                 <div className="flex justify-between items-baseline"><Label>Durée</Label><span className="font-bold text-lg">{durationYears} ans</span></div>
// // // // // //                                 <Slider min={1} max={30} step={1} value={[durationYears]} onValueChange={(v) => setDurationYears(v[0])} />
// // // // // //                             </div>
// // // // // //                         </CardContent>
// // // // // //                     </Card>

// // // // // //                     <Card className="shadow-sm border-border">
// // // // // //                         <CardHeader className="pb-3"><CardTitle className="text-base">2. Charges & Entretien</CardTitle></CardHeader>
// // // // // //                         <CardContent className="space-y-4">
// // // // // //                             <div className="grid grid-cols-2 gap-4">
// // // // // //                                 <div className="space-y-2"><Label className="text-xs text-muted-foreground">Municipale (An)</Label><Input type="number" value={municipalTax} onChange={(e) => setMunicipalTax(Number(e.target.value))} /></div>
// // // // // //                                 <div className="space-y-2"><Label className="text-xs text-muted-foreground">Scolaire (An)</Label><Input type="number" value={schoolTax} onChange={(e) => setSchoolTax(Number(e.target.value))} /></div>
// // // // // //                             </div>
// // // // // //                             <div className="grid grid-cols-2 gap-4">
// // // // // //                                 <div className="space-y-2"><Label className="text-xs text-muted-foreground">Assurance (An)</Label><Input type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} /></div>
// // // // // //                                 <div className="space-y-2"><Label className="text-xs text-muted-foreground flex items-center gap-1"><Zap className="h-3 w-3 text-yellow-500"/> Hydro (An)</Label><Input type="number" value={hydro} onChange={(e) => setHydro(Number(e.target.value))} /></div>
// // // // // //                             </div>
// // // // // //                             {/* NOUVEAU CHAMP ENTRETIEN */}
// // // // // //                             <div className="space-y-2 pt-2 border-t border-border">
// // // // // //                                 <Label className="text-xs text-muted-foreground flex items-center gap-1"><Hammer className="h-3 w-3"/> Frais Condo / Entretien (An)</Label>
// // // // // //                                 <Input type="number" value={maintenance} onChange={(e) => setMaintenance(Number(e.target.value))} />
// // // // // //                                 <p className="text-[10px] text-muted-foreground">Conseil : Prévoir 1% valeur maison/an ou frais de condo réels.</p>
// // // // // //                             </div>
// // // // // //                         </CardContent>
// // // // // //                     </Card>

// // // // // //                     <Card className="shadow-md border-primary/20 bg-primary/5">
// // // // // //                         <CardHeader className="pb-3"><CardTitle className="text-primary text-base flex items-center gap-2">🚀 Accélérateur</CardTitle></CardHeader>
// // // // // //                         <CardContent className="space-y-4">
// // // // // //                             <div className="space-y-2">
// // // // // //                                 <div className="flex justify-between text-sm"><Label>Extra Mensuel</Label><span className="font-bold text-primary">+{currency.format(extraMonthly)}</span></div>
// // // // // //                                 <Slider min={0} max={2000} step={50} value={[extraMonthly]} onValueChange={(v) => setExtraMonthly(v[0])} />
// // // // // //                             </div>
// // // // // //                             <div className="space-y-2">
// // // // // //                                 <div className="flex justify-between text-sm"><Label>Extra Annuel</Label><span className="font-bold text-primary">+{currency.format(extraAnnual)}</span></div>
// // // // // //                                 <Slider min={0} max={20000} step={500} value={[extraAnnual]} onValueChange={(v) => setExtraAnnual(v[0])} />
// // // // // //                             </div>
// // // // // //                         </CardContent>
// // // // // //                     </Card>

// // // // // //                     <Card className="shadow-sm border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
// // // // // //                         <CardHeader className="p-4 pb-2"><CardTitle className="text-sm flex items-center gap-2 text-blue-700 dark:text-blue-400"><Wallet className="h-4 w-4"/> Revenu Familial Requis</CardTitle></CardHeader>
// // // // // //                         <CardContent className="p-4 pt-2">
// // // // // //                             <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{currency.format((totalMonthlyOutPocket * 12) / 0.32)}</div>
// // // // // //                             <p className="text-[10px] text-muted-foreground mt-1">Pour respecter un ratio d&apos;endettement (ABD) de 32%.</p>
// // // // // //                         </CardContent>
// // // // // //                     </Card>
// // // // // //                 </aside>

// // // // // //                 {/* --- DROITE --- */}
// // // // // //                 <section className="lg:col-span-8 space-y-6 relative">
// // // // // //                     {!simulation.isCompliant && (
// // // // // //                         <div className="absolute inset-0 z-50 flex items-start justify-center pt-20 backdrop-blur-md bg-background/50 rounded-xl">
// // // // // //                             <div className="bg-card border border-destructive shadow-2xl p-8 rounded-xl max-w-md text-center space-y-4">
// // // // // //                                 <Lock className="h-10 w-10 text-destructive mx-auto" />
// // // // // //                                 <h3 className="text-xl font-bold text-destructive">Financement Impossible</h3>
// // // // // //                                 <p className="text-muted-foreground">{simulation.complianceError}</p>
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                     )}

// // // // // //                     <div className={`space-y-6 transition-all duration-300 ${!simulation.isCompliant ? "opacity-20 blur-sm pointer-events-none" : ""}`}>
                        
// // // // // //                         {/* KPIs */}
// // // // // //                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// // // // // //                             <Card className="bg-primary/10 border-primary/30 shadow-md">
// // // // // //                                 <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-primary uppercase tracking-wider">Budget Mensuel</CardTitle></CardHeader>
// // // // // //                                 <CardContent className="p-4 pt-1">
// // // // // //                                     <div className="text-3xl font-bold text-primary">{currency.format(totalMonthlyOutPocket)}</div>
// // // // // //                                     <div className="flex flex-wrap gap-2 mt-2">
// // // // // //                                         <Badge variant="outline" className="text-[10px] bg-background/50 border-primary/30 text-primary">Qurtuba: {currency.format(paymentQurtuba)}</Badge>
// // // // // //                                         <Badge variant="outline" className="text-[10px] bg-background/50 border-slate-500/30 text-slate-600">Charges: {currency.format(monthlyCharges)}</Badge>
// // // // // //                                     </div>
// // // // // //                                 </CardContent>
// // // // // //                             </Card>
// // // // // //                             <Card className="shadow-sm">
// // // // // //                                 <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Intérêts Payés</CardTitle></CardHeader>
// // // // // //                                 <CardContent className="p-4 pt-1"><div className="text-2xl font-bold text-orange-500">{currency.format(simulation.totalInterestPaid)}</div></CardContent>
// // // // // //                             </Card>
// // // // // //                             <Card className="shadow-sm">
// // // // // //                                 <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Économies</CardTitle></CardHeader>
// // // // // //                                 <CardContent className="p-4 pt-1"><div className="text-2xl font-bold text-green-500">{currency.format(simulation.interestSaved)}</div></CardContent>
// // // // // //                             </Card>
// // // // // //                             <Card className="shadow-sm">
// // // // // //                                 <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Durée Réelle</CardTitle></CardHeader>
// // // // // //                                 <CardContent className="p-4 pt-1"><div className="text-2xl font-bold">{Math.floor(simulation.actualDurationMonths / 12)}a {simulation.actualDurationMonths % 12}m</div></CardContent>
// // // // // //                             </Card>
// // // // // //                         </div>

// // // // // //                         {/* GRAPHIQUE */}
// // // // // //                         <Card className="shadow-lg border-border overflow-hidden">
// // // // // //                             <CardHeader className="p-6 pb-2 flex flex-row items-center justify-between">
// // // // // //                                 <div>
// // // // // //                                     <CardTitle>Analyse Financière</CardTitle>
// // // // // //                                     <p className="text-sm text-muted-foreground">{chartView === 'evolution' ? "Évolution Capital vs Dette" : "Répartition Totale des Coûts (25 ans)"}</p>
// // // // // //                                 </div>
// // // // // //                                 <div className="flex bg-muted p-1 rounded-lg">
// // // // // //                                     <button onClick={() => setChartView('evolution')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartView === 'evolution' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}><TrendingUp className="h-4 w-4 inline mr-1"/> Évolution</button>
// // // // // //                                     <button onClick={() => setChartView('distribution')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartView === 'distribution' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}><PieIcon className="h-4 w-4 inline mr-1"/> Répartition</button>
// // // // // //                                 </div>
// // // // // //                             </CardHeader>
// // // // // //                             <CardContent className="p-6 h-[400px]">
// // // // // //                                 <ResponsiveContainer width="100%" height="100%">
// // // // // //                                     {chartView === 'evolution' ? (
// // // // // //                                         <AreaChart data={simulation.schedule} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
// // // // // //                                             <defs>
// // // // // //                                             <linearGradient id="colorRent" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--destructive)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--destructive)" stopOpacity={0}/></linearGradient>
// // // // // //                                             <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient>
// // // // // //                                             </defs>
// // // // // //                                             <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} stroke="var(--border)" />
// // // // // //                                             <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} minTickGap={30} />
// // // // // //                                             <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} width={40} />
// // // // // //                                             <Tooltip formatter={(value: number) => currency.format(value)} labelFormatter={(label) => `Mois ${label}`} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '13px' }} />
// // // // // //                                             <Legend verticalAlign="top" height={36} wrapperStyle={{top: -10}} />
// // // // // //                                             <Area type="monotone" dataKey="rentPayment" name="Loyer" stroke="var(--destructive)" fillOpacity={1} fill="url(#colorRent)" stackId="1" />
// // // // // //                                             <Area type="monotone" dataKey="principalPayment" name="Capital" stroke="var(--primary)" fillOpacity={1} fill="url(#colorPrincipal)" stackId="1" />
// // // // // //                                         </AreaChart>
// // // // // //                                     ) : (
// // // // // //                                         <PieChart>
// // // // // //                                             <Pie data={pieData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
// // // // // //                                                 {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />))}
// // // // // //                                             </Pie>
// // // // // //                                             <Tooltip formatter={(value: number) => currency.format(value)} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '13px' }} />
// // // // // //                                             <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
// // // // // //                                         </PieChart>
// // // // // //                                     )}
// // // // // //                                 </ResponsiveContainer>
// // // // // //                             </CardContent>
// // // // // //                         </Card>

// // // // // //                         {/* TABLEAU */}
// // // // // //                         <Card className="shadow-lg border-border overflow-hidden">
// // // // // //                             <div className="flex items-center justify-between p-4 border-b bg-muted/20">
// // // // // //                                 <div className="flex items-center gap-2"><CardTitle className="text-base">Tableau détaillé</CardTitle><Badge variant="outline" className="text-[10px] font-normal">{simulation.schedule.length} mois</Badge></div>
// // // // // //                                 <Button variant="outline" size="sm" onClick={handleExportCSV} className="h-8 text-xs gap-2"><Download className="h-3.5 w-3.5" /> Exporter CSV</Button>
// // // // // //                             </div>
// // // // // //                             <div className="max-h-[500px] overflow-auto">
// // // // // //                                 <Table>
// // // // // //                                     <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
// // // // // //                                         <TableRow>
// // // // // //                                             <TableHead className="w-[80px]">Mois</TableHead>
// // // // // //                                             <TableHead>Loyer</TableHead>
// // // // // //                                             <TableHead>Capital</TableHead>
// // // // // //                                             <TableHead>Total</TableHead>
// // // // // //                                             <TableHead className="text-right">Solde</TableHead>
// // // // // //                                         </TableRow>
// // // // // //                                     </TableHeader>
// // // // // //                                     <TableBody>
// // // // // //                                         {simulation.schedule.map((row) => (
// // // // // //                                             <TableRow key={row.month} className="hover:bg-muted/50">
// // // // // //                                                 <TableCell className="font-medium text-muted-foreground">{row.month}</TableCell>
// // // // // //                                                 <TableCell className="text-orange-500">{currency.format(row.rentPayment)}</TableCell>
// // // // // //                                                 <TableCell className="text-primary font-medium">{currency.format(row.principalPayment)}</TableCell>
// // // // // //                                                 <TableCell>{currency.format(row.totalPayment)}</TableCell>
// // // // // //                                                 <TableCell className="text-right text-muted-foreground">{currency.format(row.remainingBankBalance)}</TableCell>
// // // // // //                                             </TableRow>
// // // // // //                                         ))}
// // // // // //                                     </TableBody>
// // // // // //                                 </Table>
// // // // // //                             </div>
// // // // // //                         </Card>
// // // // // //                     </div>
// // // // // //                 </section>
// // // // // //             </TabsContent>

// // // // // //             {/* ONGLET 2 : LE GUIDE (ROADMAP) */}
// // // // // //             <TabsContent value="guide" className="max-w-4xl mx-auto mt-8">
// // // // // //                 <Card className="shadow-lg border-border">
// // // // // //                     <CardHeader>
// // // // // //                         <CardTitle className="text-2xl">Parcours d&apos;acquisition Qurtuba</CardTitle>
// // // // // //                         <CardDescription>Les 5 étapes clés pour devenir propriétaire, expliquées simplement.</CardDescription>
// // // // // //                     </CardHeader>
// // // // // //                     <CardContent className="space-y-8 p-8">
                        
// // // // // //                         <div className="flex gap-4">
// // // // // //                             <div className="flex flex-col items-center">
// // // // // //                                 <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
// // // // // //                                 <div className="w-0.5 h-full bg-border mt-2"></div>
// // // // // //                             </div>
// // // // // //                             <div className="pb-8">
// // // // // //                                 <h3 className="text-lg font-bold">Devenir Membre</h3>
// // // // // //                                 <p className="text-muted-foreground mt-1">Remplir le formulaire, payer les frais d&apos;adhésion (75$) et acheter vos premières parts sociales (min. 2000$).</p>
// // // // // //                             </div>
// // // // // //                         </div>

// // // // // //                         <div className="flex gap-4">
// // // // // //                             <div className="flex flex-col items-center">
// // // // // //                                 <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${downPayment >= qurtubaThreshold ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}`}>2</div>
// // // // // //                                 <div className="w-0.5 h-full bg-border mt-2"></div>
// // // // // //                             </div>
// // // // // //                             <div className="pb-8">
// // // // // //                                 <h3 className="text-lg font-bold">L&apos;Objectif 60 000 $</h3>
// // // // // //                                 <p className="text-muted-foreground mt-1">Vous devez accumuler 60 000 $ de parts pour être inscrit sur la <strong>liste d&apos;attente prioritaire</strong>. C&apos;est votre apport initial.</p>
// // // // // //                                 <div className="mt-2 p-3 bg-muted rounded-md text-sm">
// // // // // //                                     <span className="font-semibold">Statut actuel : </span>
// // // // // //                                     {downPayment >= qurtubaThreshold ? 
// // // // // //                                         <span className="text-green-600 font-bold">Objectif atteint ! Vous êtes éligible.</span> : 
// // // // // //                                         <span>Il vous manque {currency.format(qurtubaThreshold - downPayment)}.</span>
// // // // // //                                     }
// // // // // //                                 </div>
// // // // // //                             </div>
// // // // // //                         </div>

// // // // // //                         <div className="flex gap-4">
// // // // // //                             <div className="flex flex-col items-center">
// // // // // //                                 <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">3</div>
// // // // // //                                 <div className="w-0.5 h-full bg-border mt-2"></div>
// // // // // //                             </div>
// // // // // //                             <div className="pb-8">
// // // // // //                                 <h3 className="text-lg font-bold">Lettre d&apos;autorisation</h3>
// // // // // //                                 <p className="text-muted-foreground mt-1">Quand c&apos;est votre tour, Qurtuba vous envoie une lettre officielle. Vous avez alors <strong>3 mois</strong> pour trouver une maison.</p>
// // // // // //                             </div>
// // // // // //                         </div>

// // // // // //                         <div className="flex gap-4">
// // // // // //                             <div className="flex flex-col items-center">
// // // // // //                                 <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">4</div>
// // // // // //                                 <div className="w-0.5 h-full bg-border mt-2"></div>
// // // // // //                             </div>
// // // // // //                             <div className="pb-8">
// // // // // //                                 <h3 className="text-lg font-bold">Offre d&apos;achat & Inspection</h3>
// // // // // //                                 <p className="text-muted-foreground mt-1">Vous faites une offre au nom de &quot;Coopérative Qurtuba&quot;. Une fois acceptée, l&apos;inspection est <strong>obligatoire</strong>.</p>
// // // // // //                             </div>
// // // // // //                         </div>

// // // // // //                         <div className="flex gap-4">
// // // // // //                             <div className="flex flex-col items-center">
// // // // // //                                 <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold"><HomeIcon className="h-5 w-5"/></div>
// // // // // //                             </div>
// // // // // //                             <div>
// // // // // //                                 <h3 className="text-lg font-bold">Notaire & Emménagement</h3>
// // // // // //                                 <p className="text-muted-foreground mt-1">Qurtuba désigne le notaire. Vous apportez le reste de votre mise de fonds (si &gt; 60k) et payez les frais de démarrage (Taxe bienvenue, etc.).</p>                            </div>
// // // // // //                         </div>

// // // // // //                     </CardContent>
// // // // // //                 </Card>
// // // // // //             </TabsContent>
// // // // // //         </Tabs>

// // // // // //       </div>
// // // // // //     </main>
// // // // // //   );
// // // // // // }

// // // // // "use client";

// // // // // import { useState, useMemo } from "react";
// // // // // import { QurtubaSimulator, SimulationResult } from "@/lib/qurtuba-logic";
// // // // // import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// // // // // import { Input } from "@/components/ui/input";
// // // // // import { Label } from "@/components/ui/label";
// // // // // import { Slider } from "@/components/ui/slider";
// // // // // import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, Line } from 'recharts';
// // // // // import { ModeToggle } from "@/components/mode-toggle";
// // // // // import {
// // // // //   Table,
// // // // //   TableBody,
// // // // //   TableCell,
// // // // //   TableHead,
// // // // //   TableHeader,
// // // // //   TableRow,
// // // // // } from "@/components/ui/table"
// // // // // import { Badge } from "@/components/ui/badge"
// // // // // import { Button } from "@/components/ui/button"
// // // // // import { Progress } from "@/components/ui/progress"
// // // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // // // // import { Lock, Download, Zap, Wallet, PieChart as PieIcon, TrendingUp, Home as HomeIcon, Hammer, LineChart } from "lucide-react"

// // // // // export default function Home() {
// // // // //   const [price, setPrice] = useState(500000);
// // // // //   const [downPayment, setDownPayment] = useState(60000);
// // // // //   const [durationYears, setDurationYears] = useState(25);
// // // // //   const [extraMonthly, setExtraMonthly] = useState(0);
// // // // //   const [extraAnnual, setExtraAnnual] = useState(0);
  
// // // // //   // CHARGES & PARAMÈTRES
// // // // //   const [municipalTax, setMunicipalTax] = useState(3000);
// // // // //   const [schoolTax, setSchoolTax] = useState(350);
// // // // //   const [insurance, setInsurance] = useState(1200);
// // // // //   const [hydro, setHydro] = useState(1800);
// // // // //   const [maintenance, setMaintenance] = useState(2400); 
// // // // //   const [appreciation, setAppreciation] = useState(3); // NOUVEAU: 3% par défaut
  
// // // // //   const [chartView, setChartView] = useState<'evolution' | 'distribution' | 'networth'>('evolution');
// // // // //   const rate = 5.5; 

// // // // //   const { simulation, welcomeTax, notaryFees, startupFees } = useMemo(() => {
// // // // //     const sim = new QurtubaSimulator(price, downPayment, rate, durationYears, extraMonthly, extraAnnual);
// // // // //     return {
// // // // //         simulation: sim.generateSchedule(),
// // // // //         welcomeTax: sim.calculateWelcomeTax(),
// // // // //         notaryFees: sim.calculateNotaryFees(),
// // // // //         startupFees: sim.calculateStartupFees()
// // // // //     };
// // // // //   }, [price, downPayment, durationYears, extraMonthly, extraAnnual]);

// // // // //   // ENRICHIR LES DONNÉES AVEC LA PLUS-VALUE
// // // // //   const enrichedSchedule = useMemo(() => {
// // // // //       let currentHouseValue = price;
// // // // //       const monthlyAppreciationRate = appreciation / 100 / 12;

// // // // //       return simulation.schedule.map(row => {
// // // // //           // Augmenter la valeur de la maison chaque mois
// // // // //           currentHouseValue = currentHouseValue * (1 + monthlyAppreciationRate);
// // // // //           return {
// // // // //               ...row,
// // // // //               houseValue: currentHouseValue,
// // // // //               netEquity: currentHouseValue - row.remainingBankBalance // La vraie richesse (Valeur - Dette)
// // // // //           };
// // // // //       });
// // // // //   }, [simulation.schedule, price, appreciation]);

// // // // //   const currency = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

// // // // //   const totalCashRequired = downPayment + welcomeTax + notaryFees + startupFees;
// // // // //   const monthlyCharges = (municipalTax + schoolTax + insurance + hydro + maintenance) / 12;
// // // // //   const paymentQurtuba = simulation.monthlyPaymentFixed + extraMonthly;
// // // // //   const totalMonthlyOutPocket = paymentQurtuba + monthlyCharges;

// // // // //   // Calcul valeur finale projetée
// // // // //   const finalHouseValue = enrichedSchedule.length > 0 ? enrichedSchedule[enrichedSchedule.length - 1].houseValue : price;
// // // // //   const totalProfit = finalHouseValue - (price + simulation.totalInterestPaid); // Calcul grossier du profit

// // // // //   const totalChargesOverDuration = monthlyCharges * simulation.actualDurationMonths;
// // // // //   const pieData = [
// // // // //     { name: 'Capital Initial', value: downPayment, color: 'hsl(var(--primary))' },
// // // // //     { name: 'Capital Remboursé', value: price - downPayment, color: '#3b82f6' },
// // // // //     { name: 'Intérêts Payés', value: simulation.totalInterestPaid, color: '#f97316' }, 
// // // // //     { name: 'Charges Totales', value: totalChargesOverDuration, color: '#64748b' }, 
// // // // //   ];

// // // // //   const qurtubaThreshold = 60000;
// // // // //   const progressValue = Math.min(100, (downPayment / qurtubaThreshold) * 100);

// // // // //   const handleExportCSV = () => {
// // // // //     if (!enrichedSchedule || enrichedSchedule.length === 0) return;
// // // // //     const headers = ["Mois,Loyer,Capital,Paiement,Solde,ValeurMaison,EquiteNette"];
// // // // //     const rows = enrichedSchedule.map(r => `${r.month},${r.rentPayment.toFixed(2)},${r.principalPayment.toFixed(2)},${r.totalPayment.toFixed(2)},${r.remainingBankBalance.toFixed(2)},${r.houseValue.toFixed(2)},${r.netEquity.toFixed(2)}`);
// // // // //     const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
// // // // //     const encodedUri = encodeURI(csvContent);
// // // // //     const link = document.createElement("a");
// // // // //     link.setAttribute("href", encodedUri);
// // // // //     link.setAttribute("download", "simulation_qurtuba_complete.csv");
// // // // //     document.body.appendChild(link);
// // // // //     link.click();
// // // // //     document.body.removeChild(link);
// // // // //   };

// // // // //   return (
// // // // //     <main className="min-h-screen w-full bg-background font-sans flex flex-col items-center pb-12">
      
// // // // //       <header className="w-full border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 flex justify-center h-16">
// // // // //           <div className="w-full max-w-[1400px] px-6 flex justify-between items-center">
// // // // //             <div className="flex items-center gap-4">
// // // // //                 <h1 className="text-xl font-bold tracking-tight text-foreground">
// // // // //                 Simulateur Qurtuba <span className="text-primary">Investor</span>
// // // // //                 </h1>
// // // // //                 <Badge variant="outline" className="text-xs font-normal text-muted-foreground hidden md:inline-flex">v12.0</Badge>
// // // // //             </div>
// // // // //             <div className="flex items-center gap-2">
// // // // //                 {!simulation.isCompliant && <Badge variant="destructive" className="animate-pulse">Non Conforme</Badge>}
// // // // //                 <ModeToggle />
// // // // //             </div>
// // // // //           </div>
// // // // //       </header>

// // // // //       <div className="w-full max-w-[1400px] p-6">
        
// // // // //         <Tabs defaultValue="simulator" className="w-full space-y-6">
// // // // //             <div className="flex justify-center">
// // // // //                 <TabsList className="grid w-full max-w-md grid-cols-2">
// // // // //                     <TabsTrigger value="simulator">Simulateur Financier</TabsTrigger>
// // // // //                     <TabsTrigger value="guide">Guide des Étapes</TabsTrigger>
// // // // //                 </TabsList>
// // // // //             </div>

// // // // //             {/* ONGLET 1 : LE SIMULATEUR */}
// // // // //             <TabsContent value="simulator" className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-0">
                
// // // // //                 {/* --- GAUCHE --- */}
// // // // //                 <aside className="lg:col-span-4 space-y-6">
// // // // //                     <Card className={`shadow-md border-border transition-all duration-300 ${!simulation.isCompliant ? "border-destructive/50 ring-1 ring-destructive/20" : ""}`}>
// // // // //                         <CardHeader className="pb-3"><CardTitle className="text-base">1. Financement</CardTitle></CardHeader>
// // // // //                         <CardContent className="space-y-5">
// // // // //                             <div className="space-y-3">
// // // // //                                 <div className="flex justify-between items-baseline"><Label>Prix maison</Label><span className="font-bold text-lg text-primary">{currency.format(price)}</span></div>
// // // // //                                 <Slider min={100000} max={1500000} step={5000} value={[price]} onValueChange={(v) => setPrice(v[0])} />
// // // // //                             </div>
// // // // //                             <div className="space-y-3">
// // // // //                                 <div className="flex justify-between items-baseline">
// // // // //                                     <Label className={!simulation.isCompliant ? "text-destructive" : ""}>Votre Apport (Parts)</Label>
// // // // //                                     <span className={`font-bold text-lg ${!simulation.isCompliant ? "text-destructive" : "text-green-500"}`}>{currency.format(downPayment)}</span>
// // // // //                                 </div>
// // // // //                                 <Slider min={0} max={price} step={1000} value={[downPayment]} onValueChange={(v) => setDownPayment(v[0])} />
                                
// // // // //                                 <div className="pt-2 space-y-1">
// // // // //                                     <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
// // // // //                                         <span>Liste d&apos;attente ({currency.format(qurtubaThreshold)})</span>
// // // // //                                         <span>{Math.round(progressValue)}%</span>
// // // // //                                     </div>
// // // // //                                     <Progress value={progressValue} className="h-2" />
// // // // //                                     {progressValue < 100 ? (
// // // // //                                         <p className="text-[10px] text-muted-foreground text-right">Il manque {currency.format(qurtubaThreshold - downPayment)} pour la priorité.</p>
// // // // //                                     ) : (
// // // // //                                         <p className="text-[10px] text-green-600 font-bold text-right">Éligible liste prioritaire !</p>
// // // // //                                     )}
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                             <div className="space-y-3">
// // // // //                                 <div className="flex justify-between items-baseline"><Label>Durée</Label><span className="font-bold text-lg">{durationYears} ans</span></div>
// // // // //                                 <Slider min={1} max={30} step={1} value={[durationYears]} onValueChange={(v) => setDurationYears(v[0])} />
// // // // //                             </div>
// // // // //                         </CardContent>
// // // // //                     </Card>

// // // // //                     <Card className="shadow-sm border-border">
// // // // //                         <CardHeader className="pb-3"><CardTitle className="text-base">2. Charges & Entretien</CardTitle></CardHeader>
// // // // //                         <CardContent className="space-y-4">
// // // // //                             <div className="grid grid-cols-2 gap-4">
// // // // //                                 <div className="space-y-2"><Label className="text-xs text-muted-foreground">Municipale (An)</Label><Input type="number" value={municipalTax} onChange={(e) => setMunicipalTax(Number(e.target.value))} /></div>
// // // // //                                 <div className="space-y-2"><Label className="text-xs text-muted-foreground">Scolaire (An)</Label><Input type="number" value={schoolTax} onChange={(e) => setSchoolTax(Number(e.target.value))} /></div>
// // // // //                             </div>
// // // // //                             <div className="grid grid-cols-2 gap-4">
// // // // //                                 <div className="space-y-2"><Label className="text-xs text-muted-foreground">Assurance (An)</Label><Input type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} /></div>
// // // // //                                 <div className="space-y-2"><Label className="text-xs text-muted-foreground flex items-center gap-1"><Zap className="h-3 w-3 text-yellow-500"/> Hydro (An)</Label><Input type="number" value={hydro} onChange={(e) => setHydro(Number(e.target.value))} /></div>
// // // // //                             </div>
// // // // //                             <div className="space-y-2 pt-2 border-t border-border">
// // // // //                                 <Label className="text-xs text-muted-foreground flex items-center gap-1"><Hammer className="h-3 w-3"/> Frais Condo / Entretien (An)</Label>
// // // // //                                 <Input type="number" value={maintenance} onChange={(e) => setMaintenance(Number(e.target.value))} />
// // // // //                             </div>
// // // // //                         </CardContent>
// // // // //                     </Card>

// // // // //                     <Card className="shadow-md border-primary/20 bg-primary/5">
// // // // //                         <CardHeader className="pb-3"><CardTitle className="text-primary text-base flex items-center gap-2">🚀 Accélérateur & Valeur</CardTitle></CardHeader>
// // // // //                         <CardContent className="space-y-4">
// // // // //                             <div className="space-y-2">
// // // // //                                 <div className="flex justify-between text-sm"><Label>Appréciation Maison (An)</Label><span className="font-bold text-green-600">+{appreciation}%</span></div>
// // // // //                                 <Slider min={0} max={10} step={0.5} value={[appreciation]} onValueChange={(v) => setAppreciation(v[0])} />
// // // // //                                 <p className="text-[10px] text-muted-foreground">Moyenne historique: 3% à 5% par an.</p>
// // // // //                             </div>
// // // // //                             <div className="space-y-2 pt-2 border-t border-primary/10">
// // // // //                                 <div className="flex justify-between text-sm"><Label>Extra Mensuel</Label><span className="font-bold text-primary">+{currency.format(extraMonthly)}</span></div>
// // // // //                                 <Slider min={0} max={2000} step={50} value={[extraMonthly]} onValueChange={(v) => setExtraMonthly(v[0])} />
// // // // //                             </div>
// // // // //                         </CardContent>
// // // // //                     </Card>

// // // // //                     <Card className="shadow-sm border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
// // // // //                         <CardHeader className="p-4 pb-2"><CardTitle className="text-sm flex items-center gap-2 text-blue-700 dark:text-blue-400"><Wallet className="h-4 w-4"/> Revenu Familial Requis</CardTitle></CardHeader>
// // // // //                         <CardContent className="p-4 pt-2">
// // // // //                             <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{currency.format((totalMonthlyOutPocket * 12) / 0.32)}</div>
// // // // //                             <p className="text-[10px] text-muted-foreground mt-1">Pour un ratio d&apos;endettement (ABD) de 32%.</p>
// // // // //                         </CardContent>
// // // // //                     </Card>
// // // // //                 </aside>

// // // // //                 {/* --- DROITE --- */}
// // // // //                 <section className="lg:col-span-8 space-y-6 relative">
// // // // //                     {!simulation.isCompliant && (
// // // // //                         <div className="absolute inset-0 z-50 flex items-start justify-center pt-20 backdrop-blur-md bg-background/50 rounded-xl">
// // // // //                             <div className="bg-card border border-destructive shadow-2xl p-8 rounded-xl max-w-md text-center space-y-4">
// // // // //                                 <Lock className="h-10 w-10 text-destructive mx-auto" />
// // // // //                                 <h3 className="text-xl font-bold text-destructive">Financement Impossible</h3>
// // // // //                                 <p className="text-muted-foreground">{simulation.complianceError}</p>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     )}

// // // // //                     <div className={`space-y-6 transition-all duration-300 ${!simulation.isCompliant ? "opacity-20 blur-sm pointer-events-none" : ""}`}>
                        
// // // // //                         {/* KPIs */}
// // // // //                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// // // // //                             <Card className="bg-primary/10 border-primary/30 shadow-md">
// // // // //                                 <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-primary uppercase tracking-wider">Budget Mensuel</CardTitle></CardHeader>
// // // // //                                 <CardContent className="p-4 pt-1">
// // // // //                                     <div className="text-3xl font-bold text-primary">{currency.format(totalMonthlyOutPocket)}</div>
// // // // //                                     <div className="flex flex-wrap gap-2 mt-2">
// // // // //                                         <Badge variant="outline" className="text-[10px] bg-background/50 border-primary/30 text-primary">Qurtuba: {currency.format(paymentQurtuba)}</Badge>
// // // // //                                         <Badge variant="outline" className="text-[10px] bg-background/50 border-slate-500/30 text-slate-600">Charges: {currency.format(monthlyCharges)}</Badge>
// // // // //                                     </div>
// // // // //                                 </CardContent>
// // // // //                             </Card>
// // // // //                             <Card className="shadow-sm">
// // // // //                                 <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Intérêts Payés</CardTitle></CardHeader>
// // // // //                                 <CardContent className="p-4 pt-1"><div className="text-2xl font-bold text-orange-500">{currency.format(simulation.totalInterestPaid)}</div></CardContent>
// // // // //                             </Card>
// // // // //                             <Card className="shadow-sm bg-green-50/50 dark:bg-green-950/20 border-green-200/50">
// // // // //                                 <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wider">Valeur Finale</CardTitle></CardHeader>
// // // // //                                 <CardContent className="p-4 pt-1">
// // // // //                                     <div className="text-2xl font-bold text-green-700 dark:text-green-400">{currency.format(finalHouseValue)}</div>
// // // // //                                     <p className="text-[10px] text-green-600/70">Dans {Math.floor(simulation.actualDurationMonths / 12)} ans (@{appreciation}%)</p>
// // // // //                                 </CardContent>
// // // // //                             </Card>
// // // // //                             <Card className="shadow-sm">
// // // // //                                 <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Durée Réelle</CardTitle></CardHeader>
// // // // //                                 <CardContent className="p-4 pt-1"><div className="text-2xl font-bold">{Math.floor(simulation.actualDurationMonths / 12)}a {simulation.actualDurationMonths % 12}m</div></CardContent>
// // // // //                             </Card>
// // // // //                         </div>

// // // // //                         {/* GRAPHIQUE */}
// // // // //                         <Card className="shadow-lg border-border overflow-hidden">
// // // // //                             <CardHeader className="p-6 pb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
// // // // //                                 <div>
// // // // //                                     <CardTitle>Analyse Financière & Patrimoine</CardTitle>
// // // // //                                     <p className="text-sm text-muted-foreground">
// // // // //                                         {chartView === 'evolution' && "Remboursement de la dette au fil du temps."}
// // // // //                                         {chartView === 'distribution' && "Où va chaque dollar dépensé."}
// // // // //                                         {chartView === 'networth' && "La richesse que vous accumulez (Valeur maison - Dette)."}
// // // // //                                     </p>
// // // // //                                 </div>
// // // // //                                 <div className="flex bg-muted p-1 rounded-lg">
// // // // //                                     <button onClick={() => setChartView('evolution')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartView === 'evolution' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}><TrendingUp className="h-4 w-4 inline mr-1"/> Dette</button>
// // // // //                                     <button onClick={() => setChartView('networth')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartView === 'networth' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}><LineChart className="h-4 w-4 inline mr-1"/> Patrimoine</button>
// // // // //                                     <button onClick={() => setChartView('distribution')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartView === 'distribution' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}><PieIcon className="h-4 w-4 inline mr-1"/> Global</button>
// // // // //                                 </div>
// // // // //                             </CardHeader>
// // // // //                             <CardContent className="p-6 h-[400px]">
// // // // //                                 <ResponsiveContainer width="100%" height="100%">
// // // // //                                     {chartView === 'evolution' ? (
// // // // //                                         <AreaChart data={simulation.schedule} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
// // // // //                                             <defs>
// // // // //                                             <linearGradient id="colorRent" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--destructive)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--destructive)" stopOpacity={0}/></linearGradient>
// // // // //                                             <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient>
// // // // //                                             </defs>
// // // // //                                             <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} stroke="var(--border)" />
// // // // //                                             <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} minTickGap={30} />
// // // // //                                             <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} width={40} />
// // // // //                                             <Tooltip formatter={(value: number) => currency.format(value)} labelFormatter={(label) => `Mois ${label}`} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '13px' }} />
// // // // //                                             <Legend verticalAlign="top" height={36} wrapperStyle={{top: -10}} />
// // // // //                                             <Area type="monotone" dataKey="rentPayment" name="Intérêts" stroke="var(--destructive)" fillOpacity={1} fill="url(#colorRent)" stackId="1" />
// // // // //                                             <Area type="monotone" dataKey="principalPayment" name="Capital Remboursé" stroke="var(--primary)" fillOpacity={1} fill="url(#colorPrincipal)" stackId="1" />
// // // // //                                         </AreaChart>
// // // // //                                     ) : chartView === 'networth' ? (
// // // // //                                         <AreaChart data={enrichedSchedule} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
// // // // //                                             <defs>
// // // // //                                                 <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient>
// // // // //                                                 <linearGradient id="colorDebt" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#64748b" stopOpacity={0.8}/><stop offset="95%" stopColor="#64748b" stopOpacity={0}/></linearGradient>
// // // // //                                             </defs>
// // // // //                                             <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} stroke="var(--border)" />
// // // // //                                             <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} minTickGap={30} />
// // // // //                                             <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} width={40} />
// // // // //                                             <Tooltip formatter={(value: number) => currency.format(value)} labelFormatter={(label) => `Mois ${label}`} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '13px' }} />
// // // // //                                             <Legend verticalAlign="top" height={36} wrapperStyle={{top: -10}} />
// // // // //                                             <Area type="monotone" dataKey="houseValue" name="Valeur Maison" stroke="#22c55e" fillOpacity={0.1} fill="url(#colorNet)" stackId="2" />
// // // // //                                             <Area type="monotone" dataKey="remainingBankBalance" name="Dette Restante" stroke="#64748b" fillOpacity={0.3} fill="url(#colorDebt)" stackId="3" />
// // // // //                                             <Line type="monotone" dataKey="netEquity" name="Équité Nette (Votre Richesse)" stroke="#16a34a" strokeWidth={3} dot={false} />
// // // // //                                         </AreaChart>
// // // // //                                     ) : (
// // // // //                                         <PieChart>
// // // // //                                             <Pie data={pieData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
// // // // //                                                 {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />))}
// // // // //                                             </Pie>
// // // // //                                             <Tooltip formatter={(value: number) => currency.format(value)} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '13px' }} />
// // // // //                                             <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
// // // // //                                         </PieChart>
// // // // //                                     )}
// // // // //                                 </ResponsiveContainer>
// // // // //                             </CardContent>
// // // // //                         </Card>

// // // // //                         {/* TABLEAU */}
// // // // //                         <Card className="shadow-lg border-border overflow-hidden">
// // // // //                             <div className="flex items-center justify-between p-4 border-b bg-muted/20">
// // // // //                                 <div className="flex items-center gap-2"><CardTitle className="text-base">Tableau détaillé</CardTitle><Badge variant="outline" className="text-[10px] font-normal">{simulation.schedule.length} mois</Badge></div>
// // // // //                                 <Button variant="outline" size="sm" onClick={handleExportCSV} className="h-8 text-xs gap-2"><Download className="h-3.5 w-3.5" /> Exporter CSV</Button>
// // // // //                             </div>
// // // // //                             <div className="max-h-[500px] overflow-auto">
// // // // //                                 <Table>
// // // // //                                     <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
// // // // //                                         <TableRow>
// // // // //                                             <TableHead className="w-[80px]">Mois</TableHead>
// // // // //                                             <TableHead>Loyer</TableHead>
// // // // //                                             <TableHead>Capital</TableHead>
// // // // //                                             <TableHead>Total</TableHead>
// // // // //                                             <TableHead className="text-right">Solde</TableHead>
// // // // //                                             <TableHead className="text-right text-green-600">Équité</TableHead>
// // // // //                                         </TableRow>
// // // // //                                     </TableHeader>
// // // // //                                     <TableBody>
// // // // //                                         {enrichedSchedule.map((row) => (
// // // // //                                             <TableRow key={row.month} className="hover:bg-muted/50">
// // // // //                                                 <TableCell className="font-medium text-muted-foreground">{row.month}</TableCell>
// // // // //                                                 <TableCell className="text-orange-500">{currency.format(row.rentPayment)}</TableCell>
// // // // //                                                 <TableCell className="text-primary font-medium">{currency.format(row.principalPayment)}</TableCell>
// // // // //                                                 <TableCell>{currency.format(row.totalPayment)}</TableCell>
// // // // //                                                 <TableCell className="text-right text-muted-foreground">{currency.format(row.remainingBankBalance)}</TableCell>
// // // // //                                                 <TableCell className="text-right font-bold text-green-600">{currency.format(row.netEquity)}</TableCell>
// // // // //                                             </TableRow>
// // // // //                                         ))}
// // // // //                                     </TableBody>
// // // // //                                 </Table>
// // // // //                             </div>
// // // // //                         </Card>
// // // // //                     </div>
// // // // //                 </section>
// // // // //             </TabsContent>

// // // // //             {/* ONGLET 2 : LE GUIDE */}
// // // // //             <TabsContent value="guide" className="max-w-4xl mx-auto mt-8">
// // // // //                 <Card className="shadow-lg border-border">
// // // // //                     <CardHeader>
// // // // //                         <CardTitle className="text-2xl">Parcours d&apos;acquisition Qurtuba</CardTitle>
// // // // //                         <CardDescription>Les 5 étapes clés pour devenir propriétaire, expliquées simplement.</CardDescription>
// // // // //                     </CardHeader>
// // // // //                     <CardContent className="space-y-8 p-8">
                        
// // // // //                         <div className="flex gap-4">
// // // // //                             <div className="flex flex-col items-center">
// // // // //                                 <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
// // // // //                                 <div className="w-0.5 h-full bg-border mt-2"></div>
// // // // //                             </div>
// // // // //                             <div className="pb-8">
// // // // //                                 <h3 className="text-lg font-bold">Devenir Membre</h3>
// // // // //                                 <p className="text-muted-foreground mt-1">Remplir le formulaire, payer les frais d&apos;adhésion (75$) et acheter vos premières parts sociales (min. 2000$).</p>
// // // // //                             </div>
// // // // //                         </div>

// // // // //                         <div className="flex gap-4">
// // // // //                             <div className="flex flex-col items-center">
// // // // //                                 <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${downPayment >= qurtubaThreshold ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}`}>2</div>
// // // // //                                 <div className="w-0.5 h-full bg-border mt-2"></div>
// // // // //                             </div>
// // // // //                             <div className="pb-8">
// // // // //                                 <h3 className="text-lg font-bold">L&apos;Objectif 60 000 $</h3>
// // // // //                                 <p className="text-muted-foreground mt-1">Vous devez accumuler 60 000 $ de parts pour être inscrit sur la <strong>liste d&apos;attente prioritaire</strong>. C&apos;est votre apport initial.</p>
// // // // //                                 <div className="mt-2 p-3 bg-muted rounded-md text-sm">
// // // // //                                     <span className="font-semibold">Statut actuel : </span>
// // // // //                                     {downPayment >= qurtubaThreshold ? 
// // // // //                                         <span className="text-green-600 font-bold">Objectif atteint ! Vous êtes éligible.</span> : 
// // // // //                                         <span>Il vous manque {currency.format(qurtubaThreshold - downPayment)}.</span>
// // // // //                                     }
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                         </div>

// // // // //                         <div className="flex gap-4">
// // // // //                             <div className="flex flex-col items-center">
// // // // //                                 <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">3</div>
// // // // //                                 <div className="w-0.5 h-full bg-border mt-2"></div>
// // // // //                             </div>
// // // // //                             <div className="pb-8">
// // // // //                                 <h3 className="text-lg font-bold">Lettre d&apos;autorisation</h3>
// // // // //                                 <p className="text-muted-foreground mt-1">Quand c&apos;est votre tour, Qurtuba vous envoie une lettre officielle. Vous avez alors <strong>3 mois</strong> pour trouver une maison.</p>
// // // // //                             </div>
// // // // //                         </div>

// // // // //                         <div className="flex gap-4">
// // // // //                             <div className="flex flex-col items-center">
// // // // //                                 <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">4</div>
// // // // //                                 <div className="w-0.5 h-full bg-border mt-2"></div>
// // // // //                             </div>
// // // // //                             <div className="pb-8">
// // // // //                                 <h3 className="text-lg font-bold">Offre d&apos;achat & Inspection</h3>
// // // // //                                 <p className="text-muted-foreground mt-1">Vous faites une offre au nom de &quot;Coopérative Qurtuba&quot;. Une fois acceptée, l&apos;inspection est <strong>obligatoire</strong>.</p>
// // // // //                             </div>
// // // // //                         </div>

// // // // //                         <div className="flex gap-4">
// // // // //                             <div className="flex flex-col items-center">
// // // // //                                 <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold"><HomeIcon className="h-5 w-5"/></div>
// // // // //                             </div>
// // // // //                             <div>
// // // // //                                 <h3 className="text-lg font-bold">Notaire & Emménagement</h3>
// // // // //                                 <p className="text-muted-foreground mt-1">Qurtuba désigne le notaire. Vous apportez le reste de votre mise de fonds (si &gt; 60k) et payez les frais de démarrage (Taxe bienvenue, etc.).</p>
// // // // //                             </div>
// // // // //                         </div>

// // // // //                     </CardContent>
// // // // //                 </Card>
// // // // //             </TabsContent>
// // // // //         </Tabs>

// // // // //       </div>
// // // // //     </main>
// // // // //   );
// // // // // }



// // // // "use client";

// // // // import { useState, useMemo } from "react";
// // // // import { QurtubaSimulator, SimulationResult } from "@/lib/qurtuba-logic";
// // // // // CORRECTION ICI : Ajout de CardDescription
// // // // import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Label } from "@/components/ui/label";
// // // // import { Slider } from "@/components/ui/slider";
// // // // import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, Line, LineChart } from 'recharts';
// // // // import { ModeToggle } from "@/components/mode-toggle";
// // // // import {
// // // //   Table,
// // // //   TableBody,
// // // //   TableCell,
// // // //   TableHead,
// // // //   TableHeader,
// // // //   TableRow,
// // // // } from "@/components/ui/table"
// // // // import { Badge } from "@/components/ui/badge"
// // // // import { Button } from "@/components/ui/button"
// // // // import { Progress } from "@/components/ui/progress"
// // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // // // import { Lock, Download, Zap, Wallet, PieChart as PieIcon, TrendingUp, Home as HomeIcon, Hammer, PiggyBank } from "lucide-react"

// // // // export default function Home() {
// // // //   const [price, setPrice] = useState(500000);
// // // //   const [downPayment, setDownPayment] = useState(60000);
// // // //   const [durationYears, setDurationYears] = useState(25);
// // // //   const [extraMonthly, setExtraMonthly] = useState(0);
// // // //   const [extraAnnual, setExtraAnnual] = useState(0);
  
// // // //   // CHARGES & PARAMÈTRES
// // // //   const [municipalTax, setMunicipalTax] = useState(3000);
// // // //   const [schoolTax, setSchoolTax] = useState(350);
// // // //   const [insurance, setInsurance] = useState(1200);
// // // //   const [hydro, setHydro] = useState(1800);
// // // //   const [maintenance, setMaintenance] = useState(2400); 
// // // //   const [appreciation, setAppreciation] = useState(3);
  
// // // //   const [chartView, setChartView] = useState<'evolution' | 'distribution' | 'networth'>('evolution');
// // // //   const rate = 5.5; 

// // // //   const { simulation, welcomeTax, notaryFees, startupFees } = useMemo(() => {
// // // //     const sim = new QurtubaSimulator(price, downPayment, rate, durationYears, extraMonthly, extraAnnual);
// // // //     return {
// // // //         simulation: sim.generateSchedule(),
// // // //         welcomeTax: sim.calculateWelcomeTax(),
// // // //         notaryFees: sim.calculateNotaryFees(),
// // // //         startupFees: sim.calculateStartupFees()
// // // //     };
// // // //   }, [price, downPayment, durationYears, extraMonthly, extraAnnual]);

// // // //   const enrichedSchedule = useMemo(() => {
// // // //       let currentHouseValue = price;
// // // //       const monthlyAppreciationRate = appreciation / 100 / 12;

// // // //       return simulation.schedule.map(row => {
// // // //           currentHouseValue = currentHouseValue * (1 + monthlyAppreciationRate);
// // // //           return {
// // // //               ...row,
// // // //               houseValue: currentHouseValue,
// // // //               netEquity: currentHouseValue - row.remainingBankBalance
// // // //           };
// // // //       });
// // // //   }, [simulation.schedule, price, appreciation]);

// // // //   const currency = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

// // // //   const totalCashRequired = downPayment + welcomeTax + notaryFees + startupFees;
// // // //   const monthlyCharges = (municipalTax + schoolTax + insurance + hydro + maintenance) / 12;
// // // //   const paymentQurtuba = simulation.monthlyPaymentFixed + extraMonthly;
// // // //   const totalMonthlyOutPocket = paymentQurtuba + monthlyCharges;

// // // //   // Calcul valeur finale projetée (5 ans)
// // // //   const getWealthAtYear = (year: number) => {
// // // //       if (!simulation.schedule || simulation.schedule.length === 0) return { value: 0, debt: 0, equity: 0 };
// // // //       const monthIndex = Math.min(year * 12, simulation.schedule.length) - 1;
// // // //       const row = monthIndex >= 0 ? simulation.schedule[monthIndex] : { remainingBankBalance: price - downPayment };
      
// // // //       const futureValue = price * Math.pow(1 + (appreciation/100), year);
// // // //       const debt = row.remainingBankBalance;
// // // //       return { value: futureValue, debt: debt, equity: futureValue - debt };
// // // //   };

// // // //   const stats5Years = getWealthAtYear(5);

// // // //   const totalChargesOverDuration = monthlyCharges * simulation.actualDurationMonths;
// // // //   const pieData = [
// // // //     { name: 'Capital (Votre part)', value: price, color: 'hsl(var(--primary))' },
// // // //     { name: 'Intérêts (Coût Banque)', value: simulation.totalInterestPaid, color: '#f97316' }, 
// // // //     { name: 'Charges & Entretien', value: totalChargesOverDuration, color: '#64748b' }, 
// // // //   ];

// // // //   const qurtubaThreshold = 60000;
// // // //   const progressValue = Math.min(100, (downPayment / qurtubaThreshold) * 100);

// // // //   const handleExportCSV = () => {
// // // //     if (!enrichedSchedule || enrichedSchedule.length === 0) return;
// // // //     const headers = ["Mois,Loyer,Capital,Paiement,Solde,ValeurMaison,EquiteNette"];
// // // //     const rows = enrichedSchedule.map(r => `${r.month},${r.rentPayment.toFixed(2)},${r.principalPayment.toFixed(2)},${r.totalPayment.toFixed(2)},${r.remainingBankBalance.toFixed(2)},${r.houseValue.toFixed(2)},${r.netEquity.toFixed(2)}`);
// // // //     const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
// // // //     const encodedUri = encodeURI(csvContent);
// // // //     const link = document.createElement("a");
// // // //     link.setAttribute("href", encodedUri);
// // // //     link.setAttribute("download", "simulation_qurtuba_complete.csv");
// // // //     document.body.appendChild(link);
// // // //     link.click();
// // // //     document.body.removeChild(link);
// // // //   };

// // // //   return (
// // // //     <main className="min-h-screen w-full bg-background font-sans flex flex-col items-center pb-12">
      
// // // //       <header className="w-full border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 flex justify-center h-16">
// // // //           <div className="w-full max-w-[1400px] px-6 flex justify-between items-center">
// // // //             <div className="flex items-center gap-4">
// // // //                 <h1 className="text-xl font-bold tracking-tight text-foreground">
// // // //                 Simulateur Qurtuba <span className="text-primary">Real Life</span>
// // // //                 </h1>
// // // //                 <Badge variant="outline" className="text-xs font-normal text-muted-foreground hidden md:inline-flex">v13.1</Badge>
// // // //             </div>
// // // //             <div className="flex items-center gap-2">
// // // //                 {!simulation.isCompliant && <Badge variant="destructive" className="animate-pulse">Non Conforme</Badge>}
// // // //                 <ModeToggle />
// // // //             </div>
// // // //           </div>
// // // //       </header>

// // // //       <div className="w-full max-w-[1400px] p-6">
        
// // // //         <Tabs defaultValue="simulator" className="w-full space-y-6">
// // // //             <div className="flex justify-center">
// // // //                 <TabsList className="grid w-full max-w-md grid-cols-2">
// // // //                     <TabsTrigger value="simulator">Simulateur Financier</TabsTrigger>
// // // //                     <TabsTrigger value="guide">Guide des Étapes</TabsTrigger>
// // // //                 </TabsList>
// // // //             </div>

// // // //             {/* ONGLET 1 : LE SIMULATEUR */}
// // // //             <TabsContent value="simulator" className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-0">
                
// // // //                 {/* --- GAUCHE --- */}
// // // //                 <aside className="lg:col-span-4 space-y-6">
// // // //                     <Card className={`shadow-md border-border transition-all duration-300 ${!simulation.isCompliant ? "border-destructive/50 ring-1 ring-destructive/20" : ""}`}>
// // // //                         <CardHeader className="pb-3"><CardTitle className="text-base">1. Financement</CardTitle></CardHeader>
// // // //                         <CardContent className="space-y-5">
// // // //                             <div className="space-y-3">
// // // //                                 <div className="flex justify-between items-baseline"><Label>Prix maison</Label><span className="font-bold text-lg text-primary">{currency.format(price)}</span></div>
// // // //                                 <Slider min={100000} max={1500000} step={5000} value={[price]} onValueChange={(v) => setPrice(v[0])} />
// // // //                             </div>
// // // //                             <div className="space-y-3">
// // // //                                 <div className="flex justify-between items-baseline">
// // // //                                     <Label className={!simulation.isCompliant ? "text-destructive" : ""}>Votre Apport (Parts)</Label>
// // // //                                     <span className={`font-bold text-lg ${!simulation.isCompliant ? "text-destructive" : "text-green-500"}`}>{currency.format(downPayment)}</span>
// // // //                                 </div>
// // // //                                 <Slider min={0} max={price} step={1000} value={[downPayment]} onValueChange={(v) => setDownPayment(v[0])} />
                                
// // // //                                 <div className="pt-2 space-y-1">
// // // //                                     <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
// // // //                                         <span>Liste d&apos;attente ({currency.format(qurtubaThreshold)})</span>
// // // //                                         <span>{Math.round(progressValue)}%</span>
// // // //                                     </div>
// // // //                                     <Progress value={progressValue} className="h-2" />
// // // //                                     {progressValue < 100 ? (
// // // //                                         <p className="text-[10px] text-muted-foreground text-right">Il manque {currency.format(qurtubaThreshold - downPayment)} pour la priorité.</p>
// // // //                                     ) : (
// // // //                                         <p className="text-[10px] text-green-600 font-bold text-right">Éligible liste prioritaire !</p>
// // // //                                     )}
// // // //                                 </div>
// // // //                             </div>
// // // //                             <div className="space-y-3">
// // // //                                 <div className="flex justify-between items-baseline"><Label>Durée</Label><span className="font-bold text-lg">{durationYears} ans</span></div>
// // // //                                 <Slider min={1} max={30} step={1} value={[durationYears]} onValueChange={(v) => setDurationYears(v[0])} />
// // // //                             </div>
// // // //                         </CardContent>
// // // //                     </Card>

// // // //                     <Card className="shadow-sm border-border">
// // // //                         <CardHeader className="pb-3"><CardTitle className="text-base">2. Charges & Entretien</CardTitle></CardHeader>
// // // //                         <CardContent className="space-y-4">
// // // //                             <div className="grid grid-cols-2 gap-4">
// // // //                                 <div className="space-y-2"><Label className="text-xs text-muted-foreground">Municipale (An)</Label><Input type="number" value={municipalTax} onChange={(e) => setMunicipalTax(Number(e.target.value))} /></div>
// // // //                                 <div className="space-y-2"><Label className="text-xs text-muted-foreground">Scolaire (An)</Label><Input type="number" value={schoolTax} onChange={(e) => setSchoolTax(Number(e.target.value))} /></div>
// // // //                             </div>
// // // //                             <div className="grid grid-cols-2 gap-4">
// // // //                                 <div className="space-y-2"><Label className="text-xs text-muted-foreground">Assurance (An)</Label><Input type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} /></div>
// // // //                                 <div className="space-y-2"><Label className="text-xs text-muted-foreground flex items-center gap-1"><Zap className="h-3 w-3 text-yellow-500"/> Hydro (An)</Label><Input type="number" value={hydro} onChange={(e) => setHydro(Number(e.target.value))} /></div>
// // // //                             </div>
// // // //                             <div className="space-y-2 pt-2 border-t border-border">
// // // //                                 <Label className="text-xs text-muted-foreground flex items-center gap-1"><Hammer className="h-3 w-3"/> Frais Condo / Entretien (An)</Label>
// // // //                                 <Input type="number" value={maintenance} onChange={(e) => setMaintenance(Number(e.target.value))} />
// // // //                             </div>
// // // //                         </CardContent>
// // // //                     </Card>

// // // //                     <Card className="shadow-md border-primary/20 bg-primary/5">
// // // //                         <CardHeader className="pb-3"><CardTitle className="text-primary text-base flex items-center gap-2">🚀 Accélérateur</CardTitle></CardHeader>
// // // //                         <CardContent className="space-y-4">
// // // //                             <div className="space-y-2">
// // // //                                 <div className="flex justify-between text-sm"><Label>Extra Mensuel</Label><span className="font-bold text-primary">+{currency.format(extraMonthly)}</span></div>
// // // //                                 <Slider min={0} max={2000} step={50} value={[extraMonthly]} onValueChange={(v) => setExtraMonthly(v[0])} />
// // // //                             </div>
// // // //                             <div className="space-y-2">
// // // //                                 <div className="flex justify-between text-sm"><Label>Extra Annuel</Label><span className="font-bold text-primary">+{currency.format(extraAnnual)}</span></div>
// // // //                                 <Slider min={0} max={20000} step={500} value={[extraAnnual]} onValueChange={(v) => setExtraAnnual(v[0])} />
// // // //                             </div>
// // // //                         </CardContent>
// // // //                     </Card>

// // // //                     <Card className="shadow-md border-green-200 bg-green-50/50 dark:bg-green-950/20">
// // // //                         <CardHeader className="p-4 pb-2"><CardTitle className="text-sm flex items-center gap-2 text-green-700 dark:text-green-400"><PiggyBank className="h-4 w-4"/> Votre Richesse (5 ans)</CardTitle></CardHeader>
// // // //                         <CardContent className="p-4 space-y-4">
// // // //                             <div className="space-y-2">
// // // //                                 <div className="flex justify-between items-baseline">
// // // //                                     <Label className="text-xs">Appréciation Maison</Label>
// // // //                                     <span className="font-bold text-green-600">+{appreciation}% /an</span>
// // // //                                 </div>
// // // //                                 <Slider min={0} max={8} step={0.5} value={[appreciation]} onValueChange={(v) => setAppreciation(v[0])} />
// // // //                             </div>
// // // //                             <div className="pt-2 border-t border-green-200/50 space-y-1">
// // // //                                 <div className="flex justify-between text-xs text-muted-foreground"><span>Valeur Maison (5 ans)</span><span>{currency.format(stats5Years.value)}</span></div>
// // // //                                 <div className="flex justify-between text-xs text-muted-foreground"><span>Dette Restante</span><span>-{currency.format(stats5Years.debt)}</span></div>
// // // //                                 <div className="flex justify-between text-base font-bold text-green-700 dark:text-green-400 pt-1"><span>Net dans vos poches</span><span>{currency.format(stats5Years.equity)}</span></div>
// // // //                             </div>
// // // //                         </CardContent>
// // // //                     </Card>

// // // //                     <Card className="shadow-sm border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
// // // //                         <CardHeader className="p-4 pb-2"><CardTitle className="text-sm flex items-center gap-2 text-blue-700 dark:text-blue-400"><Wallet className="h-4 w-4"/> Revenu Familial Requis</CardTitle></CardHeader>
// // // //                         <CardContent className="p-4 pt-2">
// // // //                             <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{currency.format((totalMonthlyOutPocket * 12) / 0.32)}</div>
// // // //                             <p className="text-[10px] text-muted-foreground mt-1">Pour un ratio d&apos;endettement (ABD) de 32%.</p>
// // // //                         </CardContent>
// // // //                     </Card>
// // // //                 </aside>

// // // //                 {/* --- DROITE --- */}
// // // //                 <section className="lg:col-span-8 space-y-6 relative">
// // // //                     {!simulation.isCompliant && (
// // // //                         <div className="absolute inset-0 z-50 flex items-start justify-center pt-20 backdrop-blur-md bg-background/50 rounded-xl">
// // // //                             <div className="bg-card border border-destructive shadow-2xl p-8 rounded-xl max-w-md text-center space-y-4">
// // // //                                 <Lock className="h-10 w-10 text-destructive mx-auto" />
// // // //                                 <h3 className="text-xl font-bold text-destructive">Financement Impossible</h3>
// // // //                                 <p className="text-muted-foreground">{simulation.complianceError}</p>
// // // //                             </div>
// // // //                         </div>
// // // //                     )}

// // // //                     <div className={`space-y-6 transition-all duration-300 ${!simulation.isCompliant ? "opacity-20 blur-sm pointer-events-none" : ""}`}>
                        
// // // //                         {/* KPIs */}
// // // //                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// // // //                             <Card className="bg-primary/10 border-primary/30 shadow-md">
// // // //                                 <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-primary uppercase tracking-wider">Budget Mensuel</CardTitle></CardHeader>
// // // //                                 <CardContent className="p-4 pt-1">
// // // //                                     <div className="text-3xl font-bold text-primary">{currency.format(totalMonthlyOutPocket)}</div>
// // // //                                     <div className="flex flex-wrap gap-2 mt-2">
// // // //                                         <Badge variant="outline" className="text-[10px] bg-background/50 border-primary/30 text-primary">Qurtuba: {currency.format(paymentQurtuba)}</Badge>
// // // //                                         <Badge variant="outline" className="text-[10px] bg-background/50 border-slate-500/30 text-slate-600">Charges: {currency.format(monthlyCharges)}</Badge>
// // // //                                     </div>
// // // //                                 </CardContent>
// // // //                             </Card>
// // // //                             <Card className="shadow-sm">
// // // //                                 <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Intérêts Payés</CardTitle></CardHeader>
// // // //                                 <CardContent className="p-4 pt-1"><div className="text-2xl font-bold text-orange-500">{currency.format(simulation.totalInterestPaid)}</div></CardContent>
// // // //                             </Card>
// // // //                             <Card className="shadow-sm">
// // // //                                 <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Économies</CardTitle></CardHeader>
// // // //                                 <CardContent className="p-4 pt-1"><div className="text-2xl font-bold text-green-500">{currency.format(simulation.interestSaved)}</div></CardContent>
// // // //                             </Card>
// // // //                             <Card className="shadow-sm">
// // // //                                 <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Durée Réelle</CardTitle></CardHeader>
// // // //                                 <CardContent className="p-4 pt-1"><div className="text-2xl font-bold">{Math.floor(simulation.actualDurationMonths / 12)}a {simulation.actualDurationMonths % 12}m</div></CardContent>
// // // //                             </Card>
// // // //                         </div>

// // // //                         {/* GRAPHIQUE */}
// // // //                         <Card className="shadow-lg border-border overflow-hidden">
// // // //                             <CardHeader className="p-6 pb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
// // // //                                 <div>
// // // //                                     <CardTitle>Analyse Financière</CardTitle>
// // // //                                     <p className="text-sm text-muted-foreground">
// // // //                                         {chartView === 'evolution' && "Remboursement de la dette au fil du temps."}
// // // //                                         {chartView === 'distribution' && "Où va chaque dollar dépensé."}
// // // //                                         {chartView === 'networth' && "La richesse que vous accumulez (Valeur maison - Dette)."}
// // // //                                     </p>
// // // //                                 </div>
// // // //                                 <div className="flex bg-muted p-1 rounded-lg">
// // // //                                     <button onClick={() => setChartView('evolution')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartView === 'evolution' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}><TrendingUp className="h-4 w-4 inline mr-1"/> Dette</button>
// // // //                                     <button onClick={() => setChartView('networth')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartView === 'networth' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}><LineChart className="h-4 w-4 inline mr-1"/> Patrimoine</button>
// // // //                                     <button onClick={() => setChartView('distribution')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartView === 'distribution' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}><PieIcon className="h-4 w-4 inline mr-1"/> Global</button>
// // // //                                 </div>
// // // //                             </CardHeader>
// // // //                             <CardContent className="p-6 h-[400px]">
// // // //                                 <ResponsiveContainer width="100%" height="100%">
// // // //                                     {chartView === 'evolution' ? (
// // // //                                         <AreaChart data={simulation.schedule} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
// // // //                                             <defs>
// // // //                                             <linearGradient id="colorRent" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--destructive)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--destructive)" stopOpacity={0}/></linearGradient>
// // // //                                             <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient>
// // // //                                             </defs>
// // // //                                             <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} stroke="var(--border)" />
// // // //                                             <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} minTickGap={30} />
// // // //                                             <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} width={40} />
// // // //                                             <Tooltip formatter={(value: number) => currency.format(value)} labelFormatter={(label) => `Mois ${label}`} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '13px' }} />
// // // //                                             <Legend verticalAlign="top" height={36} wrapperStyle={{top: -10}} />
// // // //                                             <Area type="monotone" dataKey="rentPayment" name="Intérêts" stroke="var(--destructive)" fillOpacity={1} fill="url(#colorRent)" stackId="1" />
// // // //                                             <Area type="monotone" dataKey="principalPayment" name="Capital Remboursé" stroke="var(--primary)" fillOpacity={1} fill="url(#colorPrincipal)" stackId="1" />
// // // //                                         </AreaChart>
// // // //                                     ) : chartView === 'networth' ? (
// // // //                                         <AreaChart data={enrichedSchedule} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
// // // //                                             <defs>
// // // //                                                 <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient>
// // // //                                                 <linearGradient id="colorDebt" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#64748b" stopOpacity={0.8}/><stop offset="95%" stopColor="#64748b" stopOpacity={0}/></linearGradient>
// // // //                                             </defs>
// // // //                                             <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} stroke="var(--border)" />
// // // //                                             <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} minTickGap={30} />
// // // //                                             <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} width={40} />
// // // //                                             <Tooltip formatter={(value: number) => currency.format(value)} labelFormatter={(label) => `Mois ${label}`} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '13px' }} />
// // // //                                             <Legend verticalAlign="top" height={36} wrapperStyle={{top: -10}} />
// // // //                                             <Area type="monotone" dataKey="houseValue" name="Valeur Maison" stroke="#22c55e" fillOpacity={0.1} fill="url(#colorNet)" stackId="2" />
// // // //                                             <Area type="monotone" dataKey="remainingBankBalance" name="Dette Restante" stroke="#64748b" fillOpacity={0.3} fill="url(#colorDebt)" stackId="3" />
// // // //                                             <Line type="monotone" dataKey="netEquity" name="Équité Nette" stroke="#16a34a" strokeWidth={3} dot={false} />
// // // //                                         </AreaChart>
// // // //                                     ) : (
// // // //                                         <PieChart>
// // // //                                             <Pie data={pieData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
// // // //                                                 {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />))}
// // // //                                             </Pie>
// // // //                                             <Tooltip formatter={(value: number) => currency.format(value)} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '13px' }} />
// // // //                                             <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
// // // //                                         </PieChart>
// // // //                                     )}
// // // //                                 </ResponsiveContainer>
// // // //                             </CardContent>
// // // //                         </Card>

// // // //                         {/* TABLEAU */}
// // // //                         <Card className="shadow-lg border-border overflow-hidden">
// // // //                             <div className="flex items-center justify-between p-4 border-b bg-muted/20">
// // // //                                 <div className="flex items-center gap-2"><CardTitle className="text-base">Tableau détaillé</CardTitle><Badge variant="outline" className="text-[10px] font-normal">{simulation.schedule.length} mois</Badge></div>
// // // //                                 <Button variant="outline" size="sm" onClick={handleExportCSV} className="h-8 text-xs gap-2"><Download className="h-3.5 w-3.5" /> Exporter CSV</Button>
// // // //                             </div>
// // // //                             <div className="max-h-[500px] overflow-auto">
// // // //                                 <Table>
// // // //                                     <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
// // // //                                         <TableRow>
// // // //                                             <TableHead className="w-[80px]">Mois</TableHead>
// // // //                                             <TableHead>Loyer</TableHead>
// // // //                                             <TableHead>Capital</TableHead>
// // // //                                             <TableHead>Total</TableHead>
// // // //                                             <TableHead className="text-right">Solde</TableHead>
// // // //                                         </TableRow>
// // // //                                     </TableHeader>
// // // //                                     <TableBody>
// // // //                                         {simulation.schedule.map((row) => (
// // // //                                             <TableRow key={row.month} className="hover:bg-muted/50">
// // // //                                                 <TableCell className="font-medium text-muted-foreground">{row.month}</TableCell>
// // // //                                                 <TableCell className="text-orange-500">{currency.format(row.rentPayment)}</TableCell>
// // // //                                                 <TableCell className="text-primary font-medium">{currency.format(row.principalPayment)}</TableCell>
// // // //                                                 <TableCell>{currency.format(row.totalPayment)}</TableCell>
// // // //                                                 <TableCell className="text-right text-muted-foreground">{currency.format(row.remainingBankBalance)}</TableCell>
// // // //                                             </TableRow>
// // // //                                         ))}
// // // //                                     </TableBody>
// // // //                                 </Table>
// // // //                             </div>
// // // //                         </Card>
// // // //                     </div>
// // // //                 </section>
// // // //             </TabsContent>

// // // //             {/* ONGLET 2 : LE GUIDE */}
// // // //             <TabsContent value="guide" className="max-w-4xl mx-auto mt-8">
// // // //                 <Card className="shadow-lg border-border">
// // // //                     <CardHeader>
// // // //                         <CardTitle className="text-2xl">Parcours d&apos;acquisition Qurtuba</CardTitle>
// // // //                         <CardDescription>Les 5 étapes clés pour devenir propriétaire, expliquées simplement.</CardDescription>
// // // //                     </CardHeader>
// // // //                     <CardContent className="space-y-8 p-8">
                        
// // // //                         <div className="flex gap-4">
// // // //                             <div className="flex flex-col items-center">
// // // //                                 <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
// // // //                                 <div className="w-0.5 h-full bg-border mt-2"></div>
// // // //                             </div>
// // // //                             <div className="pb-8">
// // // //                                 <h3 className="text-lg font-bold">Devenir Membre</h3>
// // // //                                 <p className="text-muted-foreground mt-1">Remplir le formulaire, payer les frais d&apos;adhésion (75$) et acheter vos premières parts sociales (min. 2000$).</p>
// // // //                             </div>
// // // //                         </div>

// // // //                         <div className="flex gap-4">
// // // //                             <div className="flex flex-col items-center">
// // // //                                 <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${downPayment >= qurtubaThreshold ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}`}>2</div>
// // // //                                 <div className="w-0.5 h-full bg-border mt-2"></div>
// // // //                             </div>
// // // //                             <div className="pb-8">
// // // //                                 <h3 className="text-lg font-bold">L&apos;Objectif 60 000 $</h3>
// // // //                                 <p className="text-muted-foreground mt-1">Vous devez accumuler 60 000 $ de parts pour être inscrit sur la <strong>liste d&apos;attente prioritaire</strong>. C&apos;est votre apport initial.</p>
// // // //                                 <div className="mt-2 p-3 bg-muted rounded-md text-sm">
// // // //                                     <span className="font-semibold">Statut actuel : </span>
// // // //                                     {downPayment >= qurtubaThreshold ? 
// // // //                                         <span className="text-green-600 font-bold">Objectif atteint ! Vous êtes éligible.</span> : 
// // // //                                         <span>Il vous manque {currency.format(qurtubaThreshold - downPayment)}.</span>
// // // //                                     }
// // // //                                 </div>
// // // //                             </div>
// // // //                         </div>

// // // //                         <div className="flex gap-4">
// // // //                             <div className="flex flex-col items-center">
// // // //                                 <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">3</div>
// // // //                                 <div className="w-0.5 h-full bg-border mt-2"></div>
// // // //                             </div>
// // // //                             <div className="pb-8">
// // // //                                 <h3 className="text-lg font-bold">Lettre d&apos;autorisation</h3>
// // // //                                 <p className="text-muted-foreground mt-1">Quand c&apos;est votre tour, Qurtuba vous envoie une lettre officielle. Vous avez alors <strong>3 mois</strong> pour trouver une maison.</p>
// // // //                             </div>
// // // //                         </div>

// // // //                         <div className="flex gap-4">
// // // //                             <div className="flex flex-col items-center">
// // // //                                 <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">4</div>
// // // //                                 <div className="w-0.5 h-full bg-border mt-2"></div>
// // // //                             </div>
// // // //                             <div className="pb-8">
// // // //                                 <h3 className="text-lg font-bold">Offre d&apos;achat & Inspection</h3>
// // // //                                 <p className="text-muted-foreground mt-1">Vous faites une offre au nom de &quot;Coopérative Qurtuba&quot;. Une fois acceptée, l&apos;inspection est <strong>obligatoire</strong>.</p>
// // // //                             </div>
// // // //                         </div>

// // // //                         <div className="flex gap-4">
// // // //                             <div className="flex flex-col items-center">
// // // //                                 <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold"><HomeIcon className="h-5 w-5"/></div>
// // // //                             </div>
// // // //                             <div>
// // // //                                 <h3 className="text-lg font-bold">Notaire & Emménagement</h3>
// // // //                                 {/* CORRECTION JSX: > devient &gt; */}
// // // //                                 <p className="text-muted-foreground mt-1">Qurtuba désigne le notaire. Vous apportez le reste de votre mise de fonds (si &gt; 60k) et payez les frais de démarrage (Taxe bienvenue, etc.).</p>
// // // //                             </div>
// // // //                         </div>

// // // //                     </CardContent>
// // // //                 </Card>
// // // //             </TabsContent>
// // // //         </Tabs>

// // // //       </div>
// // // //     </main>
// // // //   );
// // // // }


// // // "use client";

// // // import { useState, useMemo } from "react";
// // // import { QurtubaSimulator, SimulationResult } from "@/lib/qurtuba-logic";
// // // import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// // // import { Input } from "@/components/ui/input";
// // // import { Label } from "@/components/ui/label";
// // // import { Slider } from "@/components/ui/slider";
// // // // CORRECTION : Importation de ComposedChart pour supporter le mélange Aire/Ligne
// // // import { ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, Line, LineChart as RechartsLineChart } from 'recharts';
// // // import { ModeToggle } from "@/components/mode-toggle";
// // // import {
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableHead,
// // //   TableHeader,
// // //   TableRow,
// // // } from "@/components/ui/table"
// // // import { Badge } from "@/components/ui/badge"
// // // import { Button } from "@/components/ui/button"
// // // import { Progress } from "@/components/ui/progress"
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // // import { Lock, Download, Zap, Wallet, PieChart as PieIcon, TrendingUp, Home as HomeIcon, Hammer, PiggyBank, LineChart } from "lucide-react"

// // // export default function Home() {
// // //   const [price, setPrice] = useState(500000);
// // //   const [downPayment, setDownPayment] = useState(60000);
// // //   const [durationYears, setDurationYears] = useState(25);
// // //   const [extraMonthly, setExtraMonthly] = useState(0);
// // //   const [extraAnnual, setExtraAnnual] = useState(0);
  
// // //   // CHARGES & PARAMÈTRES
// // //   const [municipalTax, setMunicipalTax] = useState(3000);
// // //   const [schoolTax, setSchoolTax] = useState(350);
// // //   const [insurance, setInsurance] = useState(1200);
// // //   const [hydro, setHydro] = useState(1800);
// // //   const [maintenance, setMaintenance] = useState(2400); 
// // //   const [appreciation, setAppreciation] = useState(3);
  
// // //   const [chartView, setChartView] = useState<'evolution' | 'distribution' | 'networth'>('evolution');
// // //   const rate = 5.5; 

// // //   const { simulation, welcomeTax, notaryFees, startupFees } = useMemo(() => {
// // //     const sim = new QurtubaSimulator(price, downPayment, rate, durationYears, extraMonthly, extraAnnual);
// // //     return {
// // //         simulation: sim.generateSchedule(),
// // //         welcomeTax: sim.calculateWelcomeTax(),
// // //         notaryFees: sim.calculateNotaryFees(),
// // //         startupFees: sim.calculateStartupFees()
// // //     };
// // //   }, [price, downPayment, durationYears, extraMonthly, extraAnnual]);

// // //   const enrichedSchedule = useMemo(() => {
// // //       let currentHouseValue = price;
// // //       const monthlyAppreciationRate = appreciation / 100 / 12;

// // //       return simulation.schedule.map(row => {
// // //           currentHouseValue = currentHouseValue * (1 + monthlyAppreciationRate);
// // //           return {
// // //               ...row,
// // //               houseValue: currentHouseValue,
// // //               netEquity: currentHouseValue - row.remainingBankBalance
// // //           };
// // //       });
// // //   }, [simulation.schedule, price, appreciation]);

// // //   const currency = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

// // //   const totalCashRequired = downPayment + welcomeTax + notaryFees + startupFees;
// // //   const monthlyCharges = (municipalTax + schoolTax + insurance + hydro + maintenance) / 12;
// // //   const paymentQurtuba = simulation.monthlyPaymentFixed + extraMonthly;
// // //   const totalMonthlyOutPocket = paymentQurtuba + monthlyCharges;

// // //   // Calcul valeur finale projetée (5 ans)
// // //   const getWealthAtYear = (year: number) => {
// // //       if (!simulation.schedule || simulation.schedule.length === 0) return { value: 0, debt: 0, equity: 0 };
// // //       const monthIndex = Math.min(year * 12, simulation.schedule.length) - 1;
// // //       const row = monthIndex >= 0 ? simulation.schedule[monthIndex] : { remainingBankBalance: price - downPayment };
      
// // //       const futureValue = price * Math.pow(1 + (appreciation/100), year);
// // //       const debt = row.remainingBankBalance;
// // //       return { value: futureValue, debt: debt, equity: futureValue - debt };
// // //   };

// // //   const stats5Years = getWealthAtYear(5);

// // //   const totalChargesOverDuration = monthlyCharges * simulation.actualDurationMonths;
// // //   const pieData = [
// // //     { name: 'Capital (Votre part)', value: price, color: 'hsl(var(--primary))' },
// // //     { name: 'Intérêts (Coût Banque)', value: simulation.totalInterestPaid, color: '#f97316' }, 
// // //     { name: 'Charges & Entretien', value: totalChargesOverDuration, color: '#64748b' }, 
// // //   ];

// // //   const qurtubaThreshold = 60000;
// // //   const progressValue = Math.min(100, (downPayment / qurtubaThreshold) * 100);

// // //   const handleExportCSV = () => {
// // //     if (!enrichedSchedule || enrichedSchedule.length === 0) return;
// // //     const headers = ["Mois,Loyer,Capital,Paiement,Solde,ValeurMaison,EquiteNette"];
// // //     const rows = enrichedSchedule.map(r => `${r.month},${r.rentPayment.toFixed(2)},${r.principalPayment.toFixed(2)},${r.totalPayment.toFixed(2)},${r.remainingBankBalance.toFixed(2)},${r.houseValue.toFixed(2)},${r.netEquity.toFixed(2)}`);
// // //     const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
// // //     const encodedUri = encodeURI(csvContent);
// // //     const link = document.createElement("a");
// // //     link.setAttribute("href", encodedUri);
// // //     link.setAttribute("download", "simulation_qurtuba_complete.csv");
// // //     document.body.appendChild(link);
// // //     link.click();
// // //     document.body.removeChild(link);
// // //   };

// // //   return (
// // //     <main className="min-h-screen w-full bg-background font-sans flex flex-col items-center pb-12">
      
// // //       <header className="w-full border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 flex justify-center h-16">
// // //           <div className="w-full max-w-[1400px] px-6 flex justify-between items-center">
// // //             <div className="flex items-center gap-4">
// // //                 <h1 className="text-xl font-bold tracking-tight text-foreground">
// // //                 Simulateur Qurtuba <span className="text-primary">Real Life</span>
// // //                 </h1>
// // //                 <Badge variant="outline" className="text-xs font-normal text-muted-foreground hidden md:inline-flex">v13.2</Badge>
// // //             </div>
// // //             <div className="flex items-center gap-2">
// // //                 {!simulation.isCompliant && <Badge variant="destructive" className="animate-pulse">Non Conforme</Badge>}
// // //                 <ModeToggle />
// // //             </div>
// // //           </div>
// // //       </header>

// // //       <div className="w-full max-w-[1400px] p-6">
        
// // //         <Tabs defaultValue="simulator" className="w-full space-y-6">
// // //             <div className="flex justify-center">
// // //                 <TabsList className="grid w-full max-w-md grid-cols-2">
// // //                     <TabsTrigger value="simulator">Simulateur Financier</TabsTrigger>
// // //                     <TabsTrigger value="guide">Guide des Étapes</TabsTrigger>
// // //                 </TabsList>
// // //             </div>

// // //             {/* ONGLET 1 : LE SIMULATEUR */}
// // //             <TabsContent value="simulator" className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-0">
                
// // //                 {/* --- GAUCHE --- */}
// // //                 <aside className="lg:col-span-4 space-y-6">
// // //                     <Card className={`shadow-md border-border transition-all duration-300 ${!simulation.isCompliant ? "border-destructive/50 ring-1 ring-destructive/20" : ""}`}>
// // //                         <CardHeader className="pb-3"><CardTitle className="text-base">1. Financement</CardTitle></CardHeader>
// // //                         <CardContent className="space-y-5">
// // //                             <div className="space-y-3">
// // //                                 <div className="flex justify-between items-baseline"><Label>Prix maison</Label><span className="font-bold text-lg text-primary">{currency.format(price)}</span></div>
// // //                                 <Slider min={100000} max={1500000} step={5000} value={[price]} onValueChange={(v) => setPrice(v[0])} />
// // //                             </div>
// // //                             <div className="space-y-3">
// // //                                 <div className="flex justify-between items-baseline">
// // //                                     <Label className={!simulation.isCompliant ? "text-destructive" : ""}>Votre Apport (Parts)</Label>
// // //                                     <span className={`font-bold text-lg ${!simulation.isCompliant ? "text-destructive" : "text-green-500"}`}>{currency.format(downPayment)}</span>
// // //                                 </div>
// // //                                 <Slider min={0} max={price} step={1000} value={[downPayment]} onValueChange={(v) => setDownPayment(v[0])} />
                                
// // //                                 <div className="pt-2 space-y-1">
// // //                                     <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
// // //                                         <span>Liste d&apos;attente ({currency.format(qurtubaThreshold)})</span>
// // //                                         <span>{Math.round(progressValue)}%</span>
// // //                                     </div>
// // //                                     <Progress value={progressValue} className="h-2" />
// // //                                     {progressValue < 100 ? (
// // //                                         <p className="text-[10px] text-muted-foreground text-right">Il manque {currency.format(qurtubaThreshold - downPayment)} pour la priorité.</p>
// // //                                     ) : (
// // //                                         <p className="text-[10px] text-green-600 font-bold text-right">Éligible liste prioritaire !</p>
// // //                                     )}
// // //                                 </div>
// // //                             </div>
// // //                             <div className="space-y-3">
// // //                                 <div className="flex justify-between items-baseline"><Label>Durée</Label><span className="font-bold text-lg">{durationYears} ans</span></div>
// // //                                 <Slider min={1} max={30} step={1} value={[durationYears]} onValueChange={(v) => setDurationYears(v[0])} />
// // //                             </div>
// // //                         </CardContent>
// // //                     </Card>

// // //                     <Card className="shadow-sm border-border">
// // //                         <CardHeader className="pb-3"><CardTitle className="text-base">2. Charges & Entretien</CardTitle></CardHeader>
// // //                         <CardContent className="space-y-4">
// // //                             <div className="grid grid-cols-2 gap-4">
// // //                                 <div className="space-y-2"><Label className="text-xs text-muted-foreground">Municipale (An)</Label><Input type="number" value={municipalTax} onChange={(e) => setMunicipalTax(Number(e.target.value))} /></div>
// // //                                 <div className="space-y-2"><Label className="text-xs text-muted-foreground">Scolaire (An)</Label><Input type="number" value={schoolTax} onChange={(e) => setSchoolTax(Number(e.target.value))} /></div>
// // //                             </div>
// // //                             <div className="grid grid-cols-2 gap-4">
// // //                                 <div className="space-y-2"><Label className="text-xs text-muted-foreground">Assurance (An)</Label><Input type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} /></div>
// // //                                 <div className="space-y-2"><Label className="text-xs text-muted-foreground flex items-center gap-1"><Zap className="h-3 w-3 text-yellow-500"/> Hydro (An)</Label><Input type="number" value={hydro} onChange={(e) => setHydro(Number(e.target.value))} /></div>
// // //                             </div>
// // //                             <div className="space-y-2 pt-2 border-t border-border">
// // //                                 <Label className="text-xs text-muted-foreground flex items-center gap-1"><Hammer className="h-3 w-3"/> Frais Condo / Entretien (An)</Label>
// // //                                 <Input type="number" value={maintenance} onChange={(e) => setMaintenance(Number(e.target.value))} />
// // //                                 <p className="text-[10px] text-muted-foreground">Conseil : Prévoir 1% valeur maison/an ou frais de condo réels.</p>
// // //                             </div>
// // //                         </CardContent>
// // //                     </Card>

// // //                     <Card className="shadow-md border-primary/20 bg-primary/5">
// // //                         <CardHeader className="pb-3"><CardTitle className="text-primary text-base flex items-center gap-2">🚀 Accélérateur</CardTitle></CardHeader>
// // //                         <CardContent className="space-y-4">
// // //                             <div className="space-y-2">
// // //                                 <div className="flex justify-between text-sm"><Label>Extra Mensuel</Label><span className="font-bold text-primary">+{currency.format(extraMonthly)}</span></div>
// // //                                 <Slider min={0} max={2000} step={50} value={[extraMonthly]} onValueChange={(v) => setExtraMonthly(v[0])} />
// // //                             </div>
// // //                             <div className="space-y-2">
// // //                                 <div className="flex justify-between text-sm"><Label>Extra Annuel</Label><span className="font-bold text-primary">+{currency.format(extraAnnual)}</span></div>
// // //                                 <Slider min={0} max={20000} step={500} value={[extraAnnual]} onValueChange={(v) => setExtraAnnual(v[0])} />
// // //                             </div>
// // //                         </CardContent>
// // //                     </Card>

// // //                     <Card className="shadow-md border-green-200 bg-green-50/50 dark:bg-green-950/20">
// // //                         <CardHeader className="p-4 pb-2"><CardTitle className="text-sm flex items-center gap-2 text-green-700 dark:text-green-400"><PiggyBank className="h-4 w-4"/> Votre Richesse (5 ans)</CardTitle></CardHeader>
// // //                         <CardContent className="p-4 space-y-4">
// // //                             <div className="space-y-2">
// // //                                 <div className="flex justify-between items-baseline">
// // //                                     <Label className="text-xs">Appréciation Maison</Label>
// // //                                     <span className="font-bold text-green-600">+{appreciation}% /an</span>
// // //                                 </div>
// // //                                 <Slider min={0} max={8} step={0.5} value={[appreciation]} onValueChange={(v) => setAppreciation(v[0])} />
// // //                             </div>
// // //                             <div className="pt-2 border-t border-green-200/50 space-y-1">
// // //                                 <div className="flex justify-between text-xs text-muted-foreground"><span>Valeur Maison (5 ans)</span><span>{currency.format(stats5Years.value)}</span></div>
// // //                                 <div className="flex justify-between text-xs text-muted-foreground"><span>Dette Restante</span><span>-{currency.format(stats5Years.debt)}</span></div>
// // //                                 <div className="flex justify-between text-base font-bold text-green-700 dark:text-green-400 pt-1"><span>Net dans vos poches</span><span>{currency.format(stats5Years.equity)}</span></div>
// // //                             </div>
// // //                         </CardContent>
// // //                     </Card>

// // //                     <Card className="shadow-sm border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
// // //                         <CardHeader className="p-4 pb-2"><CardTitle className="text-sm flex items-center gap-2 text-blue-700 dark:text-blue-400"><Wallet className="h-4 w-4"/> Revenu Familial Requis</CardTitle></CardHeader>
// // //                         <CardContent className="p-4 pt-2">
// // //                             <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{currency.format((totalMonthlyOutPocket * 12) / 0.32)}</div>
// // //                             <p className="text-[10px] text-muted-foreground mt-1">Pour un ratio d&apos;endettement (ABD) de 32%.</p>
// // //                         </CardContent>
// // //                     </Card>
// // //                 </aside>

// // //                 {/* --- DROITE --- */}
// // //                 <section className="lg:col-span-8 space-y-6 relative">
// // //                     {!simulation.isCompliant && (
// // //                         <div className="absolute inset-0 z-50 flex items-start justify-center pt-20 backdrop-blur-md bg-background/50 rounded-xl">
// // //                             <div className="bg-card border border-destructive shadow-2xl p-8 rounded-xl max-w-md text-center space-y-4">
// // //                                 <Lock className="h-10 w-10 text-destructive mx-auto" />
// // //                                 <h3 className="text-xl font-bold text-destructive">Financement Impossible</h3>
// // //                                 <p className="text-muted-foreground">{simulation.complianceError}</p>
// // //                             </div>
// // //                         </div>
// // //                     )}

// // //                     <div className={`space-y-6 transition-all duration-300 ${!simulation.isCompliant ? "opacity-20 blur-sm pointer-events-none" : ""}`}>
                        
// // //                         {/* KPIs */}
// // //                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// // //                             <Card className="bg-primary/10 border-primary/30 shadow-md">
// // //                                 <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-primary uppercase tracking-wider">Budget Mensuel</CardTitle></CardHeader>
// // //                                 <CardContent className="p-4 pt-1">
// // //                                     <div className="text-3xl font-bold text-primary">{currency.format(totalMonthlyOutPocket)}</div>
// // //                                     <div className="flex flex-wrap gap-2 mt-2">
// // //                                         <Badge variant="outline" className="text-[10px] bg-background/50 border-primary/30 text-primary">Qurtuba: {currency.format(paymentQurtuba)}</Badge>
// // //                                         <Badge variant="outline" className="text-[10px] bg-background/50 border-slate-500/30 text-slate-600">Charges: {currency.format(monthlyCharges)}</Badge>
// // //                                     </div>
// // //                                 </CardContent>
// // //                             </Card>
// // //                             <Card className="shadow-sm">
// // //                                 <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Intérêts Payés</CardTitle></CardHeader>
// // //                                 <CardContent className="p-4 pt-1"><div className="text-2xl font-bold text-orange-500">{currency.format(simulation.totalInterestPaid)}</div></CardContent>
// // //                             </Card>
// // //                             <Card className="shadow-sm">
// // //                                 <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Économies</CardTitle></CardHeader>
// // //                                 <CardContent className="p-4 pt-1"><div className="text-2xl font-bold text-green-500">{currency.format(simulation.interestSaved)}</div></CardContent>
// // //                             </Card>
// // //                             <Card className="shadow-sm">
// // //                                 <CardHeader className="p-4 pb-1"><CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Durée Réelle</CardTitle></CardHeader>
// // //                                 <CardContent className="p-4 pt-1"><div className="text-2xl font-bold">{Math.floor(simulation.actualDurationMonths / 12)}a {simulation.actualDurationMonths % 12}m</div></CardContent>
// // //                             </Card>
// // //                         </div>

// // //                         {/* GRAPHIQUE */}
// // //                         <Card className="shadow-lg border-border overflow-hidden">
// // //                             <CardHeader className="p-6 pb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
// // //                                 <div>
// // //                                     <CardTitle>Analyse Financière</CardTitle>
// // //                                     <p className="text-sm text-muted-foreground">
// // //                                         {chartView === 'evolution' && "Remboursement de la dette au fil du temps."}
// // //                                         {chartView === 'distribution' && "Où va chaque dollar dépensé."}
// // //                                         {chartView === 'networth' && "La richesse que vous accumulez (Valeur maison - Dette)."}
// // //                                     </p>
// // //                                 </div>
// // //                                 <div className="flex bg-muted p-1 rounded-lg">
// // //                                     <button onClick={() => setChartView('evolution')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartView === 'evolution' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}><TrendingUp className="h-4 w-4 inline mr-1"/> Dette</button>
// // //                                     <button onClick={() => setChartView('networth')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartView === 'networth' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}><LineChart className="h-4 w-4 inline mr-1"/> Patrimoine</button>
// // //                                     <button onClick={() => setChartView('distribution')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartView === 'distribution' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}><PieIcon className="h-4 w-4 inline mr-1"/> Global</button>
// // //                                 </div>
// // //                             </CardHeader>
// // //                             <CardContent className="p-6 h-[400px]">
// // //                                 <ResponsiveContainer width="100%" height="100%">
// // //                                     {chartView === 'evolution' ? (
// // //                                         <ComposedChart data={simulation.schedule} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
// // //                                             <defs>
// // //                                             <linearGradient id="colorRent" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--destructive)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--destructive)" stopOpacity={0}/></linearGradient>
// // //                                             <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient>
// // //                                             </defs>
// // //                                             <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} stroke="var(--border)" />
// // //                                             <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} minTickGap={30} />
// // //                                             <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} width={40} />
// // //                                             <Tooltip formatter={(value: number) => currency.format(value)} labelFormatter={(label) => `Mois ${label}`} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '13px' }} />
// // //                                             <Legend verticalAlign="top" height={36} wrapperStyle={{top: -10}} />
// // //                                             <Area type="monotone" dataKey="rentPayment" name="Intérêts" stroke="var(--destructive)" fillOpacity={1} fill="url(#colorRent)" stackId="1" />
// // //                                             <Area type="monotone" dataKey="principalPayment" name="Capital Remboursé" stroke="var(--primary)" fillOpacity={1} fill="url(#colorPrincipal)" stackId="1" />
// // //                                         </ComposedChart>
// // //                                     ) : chartView === 'networth' ? (
// // //                                         <ComposedChart data={enrichedSchedule} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
// // //                                             <defs>
// // //                                                 <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient>
// // //                                                 <linearGradient id="colorDebt" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#64748b" stopOpacity={0.8}/><stop offset="95%" stopColor="#64748b" stopOpacity={0}/></linearGradient>
// // //                                             </defs>
// // //                                             <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} stroke="var(--border)" />
// // //                                             <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} minTickGap={30} />
// // //                                             <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} width={40} />
// // //                                             <Tooltip formatter={(value: number) => currency.format(value)} labelFormatter={(label) => `Mois ${label}`} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '13px' }} />
// // //                                             <Legend verticalAlign="top" height={36} wrapperStyle={{top: -10}} />
// // //                                             <Area type="monotone" dataKey="houseValue" name="Valeur Maison" stroke="#22c55e" fillOpacity={0.1} fill="url(#colorNet)" stackId="2" />
// // //                                             <Area type="monotone" dataKey="remainingBankBalance" name="Dette Restante" stroke="#64748b" fillOpacity={0.3} fill="url(#colorDebt)" stackId="3" />
// // //                                             <Line type="monotone" dataKey="netEquity" name="Équité Nette" stroke="#16a34a" strokeWidth={3} dot={false} />
// // //                                         </ComposedChart>
// // //                                     ) : (
// // //                                         <PieChart>
// // //                                             <Pie data={pieData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
// // //                                                 {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />))}
// // //                                             </Pie>
// // //                                             <Tooltip formatter={(value: number) => currency.format(value)} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '13px' }} />
// // //                                             <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
// // //                                         </PieChart>
// // //                                     )}
// // //                                 </ResponsiveContainer>
// // //                             </CardContent>
// // //                         </Card>

// // //                         {/* TABLEAU */}
// // //                         <Card className="shadow-lg border-border overflow-hidden">
// // //                             <div className="flex items-center justify-between p-4 border-b bg-muted/20">
// // //                                 <div className="flex items-center gap-2"><CardTitle className="text-base">Tableau détaillé</CardTitle><Badge variant="outline" className="text-[10px] font-normal">{simulation.schedule.length} mois</Badge></div>
// // //                                 <Button variant="outline" size="sm" onClick={handleExportCSV} className="h-8 text-xs gap-2"><Download className="h-3.5 w-3.5" /> Exporter CSV</Button>
// // //                             </div>
// // //                             <div className="max-h-[500px] overflow-auto">
// // //                                 <Table>
// // //                                     <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
// // //                                         <TableRow>
// // //                                             <TableHead className="w-[80px]">Mois</TableHead>
// // //                                             <TableHead>Loyer</TableHead>
// // //                                             <TableHead>Capital</TableHead>
// // //                                             <TableHead>Total</TableHead>
// // //                                             <TableHead className="text-right">Solde</TableHead>
// // //                                         </TableRow>
// // //                                     </TableHeader>
// // //                                     <TableBody>
// // //                                         {simulation.schedule.map((row) => (
// // //                                             <TableRow key={row.month} className="hover:bg-muted/50">
// // //                                                 <TableCell className="font-medium text-muted-foreground">{row.month}</TableCell>
// // //                                                 <TableCell className="text-orange-500">{currency.format(row.rentPayment)}</TableCell>
// // //                                                 <TableCell className="text-primary font-medium">{currency.format(row.principalPayment)}</TableCell>
// // //                                                 <TableCell>{currency.format(row.totalPayment)}</TableCell>
// // //                                                 <TableCell className="text-right text-muted-foreground">{currency.format(row.remainingBankBalance)}</TableCell>
// // //                                             </TableRow>
// // //                                         ))}
// // //                                     </TableBody>
// // //                                 </Table>
// // //                             </div>
// // //                         </Card>
// // //                     </div>
// // //                 </section>
// // //             </TabsContent>

// // //             {/* ONGLET 2 : LE GUIDE */}
// // //             <TabsContent value="guide" className="max-w-4xl mx-auto mt-8">
// // //                 <Card className="shadow-lg border-border">
// // //                     <CardHeader>
// // //                         <CardTitle className="text-2xl">Parcours d&apos;acquisition Qurtuba</CardTitle>
// // //                         <CardDescription>Les 5 étapes clés pour devenir propriétaire, expliquées simplement.</CardDescription>
// // //                     </CardHeader>
// // //                     <CardContent className="space-y-8 p-8">
                        
// // //                         <div className="flex gap-4">
// // //                             <div className="flex flex-col items-center">
// // //                                 <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
// // //                                 <div className="w-0.5 h-full bg-border mt-2"></div>
// // //                             </div>
// // //                             <div className="pb-8">
// // //                                 <h3 className="text-lg font-bold">Devenir Membre</h3>
// // //                                 <p className="text-muted-foreground mt-1">Remplir le formulaire, payer les frais d&apos;adhésion (75$) et acheter vos premières parts sociales (min. 2000$).</p>
// // //                             </div>
// // //                         </div>

// // //                         <div className="flex gap-4">
// // //                             <div className="flex flex-col items-center">
// // //                                 <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${downPayment >= qurtubaThreshold ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}`}>2</div>
// // //                                 <div className="w-0.5 h-full bg-border mt-2"></div>
// // //                             </div>
// // //                             <div className="pb-8">
// // //                                 <h3 className="text-lg font-bold">L&apos;Objectif 60 000 $</h3>
// // //                                 <p className="text-muted-foreground mt-1">Vous devez accumuler 60 000 $ de parts pour être inscrit sur la <strong>liste d&apos;attente prioritaire</strong>. C&apos;est votre apport initial.</p>
// // //                                 <div className="mt-2 p-3 bg-muted rounded-md text-sm">
// // //                                     <span className="font-semibold">Statut actuel : </span>
// // //                                     {downPayment >= qurtubaThreshold ? 
// // //                                         <span className="text-green-600 font-bold">Objectif atteint ! Vous êtes éligible.</span> : 
// // //                                         <span>Il vous manque {currency.format(qurtubaThreshold - downPayment)}.</span>
// // //                                     }
// // //                                 </div>
// // //                             </div>
// // //                         </div>

// // //                         <div className="flex gap-4">
// // //                             <div className="flex flex-col items-center">
// // //                                 <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">3</div>
// // //                                 <div className="w-0.5 h-full bg-border mt-2"></div>
// // //                             </div>
// // //                             <div className="pb-8">
// // //                                 <h3 className="text-lg font-bold">Lettre d&apos;autorisation</h3>
// // //                                 <p className="text-muted-foreground mt-1">Quand c&apos;est votre tour, Qurtuba vous envoie une lettre officielle. Vous avez alors <strong>3 mois</strong> pour trouver une maison.</p>
// // //                             </div>
// // //                         </div>

// // //                         <div className="flex gap-4">
// // //                             <div className="flex flex-col items-center">
// // //                                 <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">4</div>
// // //                                 <div className="w-0.5 h-full bg-border mt-2"></div>
// // //                             </div>
// // //                             <div className="pb-8">
// // //                                 <h3 className="text-lg font-bold">Offre d&apos;achat & Inspection</h3>
// // //                                 <p className="text-muted-foreground mt-1">Vous faites une offre au nom de &quot;Coopérative Qurtuba&quot;. Une fois acceptée, l&apos;inspection est <strong>obligatoire</strong>.</p>
// // //                             </div>
// // //                         </div>

// // //                         <div className="flex gap-4">
// // //                             <div className="flex flex-col items-center">
// // //                                 <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold"><HomeIcon className="h-5 w-5"/></div>
// // //                             </div>
// // //                             <div>
// // //                                 <h3 className="text-lg font-bold">Notaire & Emménagement</h3>
// // //                                 <p className="text-muted-foreground mt-1">Qurtuba désigne le notaire. Vous apportez le reste de votre mise de fonds (si &gt; 60k) et payez les frais de démarrage (Taxe bienvenue, etc.).</p>
// // //                             </div>
// // //                         </div>

// // //                     </CardContent>
// // //                 </Card>
// // //             </TabsContent>
// // //         </Tabs>

// // //       </div>
// // //     </main>
// // //   );
// // // }

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

// //       return simulation.schedule.map(row => {
// //           currentHouseValue = currentHouseValue * (1 + monthlyAppreciationRate);
// //           return {
// //               ...row,
// //               houseValue: currentHouseValue,
// //               netEquity: currentHouseValue - row.remainingBankBalance
// //           };
// //       });
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

// import { useState, useMemo } from "react";
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
// import { Lock, Download, Zap, Wallet, PieChart as PieIcon, TrendingUp, Home as HomeIcon, Hammer, PiggyBank, LineChart } from "lucide-react"

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
  
//   const [chartView, setChartView] = useState<'evolution' | 'distribution' | 'networth'>('evolution');
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

//   // Calcul valeur finale projetée (5 ans)
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
//     { name: 'Capital (Votre part)', value: price, color: 'hsl(var(--primary))' },
//     { name: 'Intérêts (Coût Banque)', value: simulation.totalInterestPaid, color: '#f97316' }, 
//     { name: 'Charges & Entretien', value: totalChargesOverDuration, color: '#64748b' }, 
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
//       <header className="h-14 shrink-0 border-b border-border bg-card/50 backdrop-blur-sm z-50 flex items-center justify-between px-6">
//           <div className="flex items-center gap-3">
//             <h1 className="text-lg font-bold tracking-tight text-foreground">
//               Simulateur Qurtuba <span className="text-primary">V14</span>
//             </h1>
//             <Badge variant="secondary" className="text-[10px] font-normal hidden sm:inline-flex">Expert Layout</Badge>
//           </div>
//           <div className="flex items-center gap-3">
//              {!simulation.isCompliant && <Badge variant="destructive" className="animate-pulse">Non Conforme</Badge>}
//             <ModeToggle />
//           </div>
//       </header>

//       {/* 2. CORPS DE L'APPLICATION (Split View) */}
//       <div className="flex flex-1 overflow-hidden">
          
//           <Tabs defaultValue="simulator" className="flex-1 flex flex-col overflow-hidden">
            
//             {/* A. SIDEBAR GAUCHE (Inputs Fixes) */}
//             <div className="flex h-full">
//                 <aside className="w-[400px] shrink-0 border-r border-border bg-card/20 flex flex-col h-full overflow-y-auto custom-scrollbar">
                    
//                     {/* Navigation Onglets Mobile/Desktop */}
//                     <div className="p-4 pb-0">
//                         <TabsList className="grid w-full grid-cols-2 mb-4">
//                             <TabsTrigger value="simulator">Simulateur</TabsTrigger>
//                             <TabsTrigger value="guide">Guide</TabsTrigger>
//                         </TabsList>
//                     </div>

//                     <TabsContent value="simulator" className="mt-0 p-4 space-y-4 data-[state=inactive]:hidden">
//                         {/* Carte 1: Financement */}
//                         <Card className={`shadow-sm border-border ${!simulation.isCompliant ? "border-destructive/50 ring-1 ring-destructive/20" : ""}`}>
//                             <CardHeader className="p-4 pb-2"><CardTitle className="text-sm font-semibold">1. Financement</CardTitle></CardHeader>
//                             <CardContent className="p-4 space-y-4">
//                                 <div className="space-y-1">
//                                     <div className="flex justify-between"><Label className="text-xs">Prix maison</Label><span className="font-bold text-sm text-primary">{currency.format(price)}</span></div>
//                                     <Slider min={100000} max={1500000} step={5000} value={[price]} onValueChange={(v) => setPrice(v[0])} />
//                                 </div>
//                                 <div className="space-y-1">
//                                     <div className="flex justify-between">
//                                         <Label className={`text-xs ${!simulation.isCompliant ? "text-destructive" : ""}`}>Apport</Label>
//                                         <span className={`font-bold text-sm ${!simulation.isCompliant ? "text-destructive" : "text-green-500"}`}>{currency.format(downPayment)}</span>
//                                     </div>
//                                     <Slider min={0} max={price} step={1000} value={[downPayment]} onValueChange={(v) => setDownPayment(v[0])} />
                                    
//                                     {/* Jauge intégrée discrète */}
//                                     <div className="pt-2">
//                                         <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
//                                             <span>Priorité ({currency.format(qurtubaThreshold)})</span>
//                                             <span className={progressValue >= 100 ? "text-green-600 font-bold" : ""}>{Math.round(progressValue)}%</span>
//                                         </div>
//                                         <Progress value={progressValue} className="h-1.5" />
//                                         {!simulation.isCompliant && <div className="flex justify-end mt-1 text-destructive text-[10px] font-bold">Min requis: {currency.format(simulation.minDownPaymentRequired)}</div>}
//                                     </div>
//                                 </div>
//                                 <div className="space-y-1">
//                                     <div className="flex justify-between"><Label className="text-xs">Durée</Label><span className="font-bold text-sm">{durationYears} ans</span></div>
//                                     <Slider min={1} max={30} step={1} value={[durationYears]} onValueChange={(v) => setDurationYears(v[0])} />
//                                 </div>
//                             </CardContent>
//                         </Card>

//                         {/* Carte 2: Charges */}
//                         <Card className="shadow-sm border-border bg-card/40">
//                             <CardHeader className="p-4 pb-2"><CardTitle className="text-sm font-semibold">2. Charges Annuelles</CardTitle></CardHeader>
//                             <CardContent className="p-4 space-y-3">
//                                 <div className="grid grid-cols-2 gap-3">
//                                     <div className="space-y-1"><Label className="text-[10px] text-muted-foreground">Municipale</Label><Input type="number" suppressHydrationWarning value={municipalTax} onChange={(e) => setMunicipalTax(Number(e.target.value))} className="h-8 text-xs bg-background" /></div>
//                                     <div className="space-y-1"><Label className="text-[10px] text-muted-foreground">Scolaire</Label><Input type="number" suppressHydrationWarning value={schoolTax} onChange={(e) => setSchoolTax(Number(e.target.value))} className="h-8 text-xs bg-background" /></div>
//                                 </div>
//                                 <div className="grid grid-cols-2 gap-3">
//                                     <div className="space-y-1"><Label className="text-[10px] text-muted-foreground">Assurance</Label><Input type="number" suppressHydrationWarning value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} className="h-8 text-xs bg-background" /></div>
//                                     <div className="space-y-1"><Label className="text-[10px] text-muted-foreground flex items-center gap-1"><Zap className="h-3 w-3 text-yellow-500"/> Hydro</Label><Input type="number" suppressHydrationWarning value={hydro} onChange={(e) => setHydro(Number(e.target.value))} className="h-8 text-xs bg-background" /></div>
//                                 </div>
//                                 <div className="space-y-1 pt-1 border-t border-border">
//                                     <Label className="text-[10px] text-muted-foreground flex items-center gap-1"><Hammer className="h-3 w-3"/> Entretien / Condo</Label>
//                                     <Input type="number" suppressHydrationWarning value={maintenance} onChange={(e) => setMaintenance(Number(e.target.value))} className="h-8 text-xs bg-background" />
//                                 </div>
//                             </CardContent>
//                         </Card>

//                         {/* Carte 3: Accélérateur */}
//                         <Card className="shadow-sm border-primary/20 bg-primary/5">
//                             <CardHeader className="p-4 pb-2"><CardTitle className="text-primary text-sm flex items-center gap-2">🚀 Accélérateur</CardTitle></CardHeader>
//                             <CardContent className="p-4 space-y-3">
//                                 <div className="space-y-1">
//                                     <div className="flex justify-between text-xs"><Label>Extra Mensuel</Label><span className="font-bold text-primary">+{currency.format(extraMonthly)}</span></div>
//                                     <Slider min={0} max={2000} step={50} value={[extraMonthly]} onValueChange={(v) => setExtraMonthly(v[0])} />
//                                 </div>
//                                 <div className="space-y-1">
//                                     <div className="flex justify-between text-xs"><Label>Extra Annuel</Label><span className="font-bold text-primary">+{currency.format(extraAnnual)}</span></div>
//                                     <Slider min={0} max={20000} step={500} value={[extraAnnual]} onValueChange={(v) => setExtraAnnual(v[0])} />
//                                 </div>
//                             </CardContent>
//                         </Card>

//                         {/* Carte 4: Cash Day 1 (Info seulement) */}
//                         <Card className="shadow-sm border-border bg-card/20">
//                             <CardHeader className="p-4 pb-2"><CardTitle className="text-sm">Cash Requis (J-1)</CardTitle></CardHeader>
//                             <CardContent className="p-4 space-y-1 text-xs">
//                                 <div className="flex justify-between"><span className="text-muted-foreground">Mise de fonds</span><span>{currency.format(downPayment)}</span></div>
//                                 <div className="flex justify-between"><span className="text-muted-foreground">Bienvenue + Notaire</span><span>{currency.format(welcomeTax + notaryFees)}</span></div>
//                                 <div className="flex justify-between font-bold border-t pt-2 mt-2"><span>TOTAL</span><span className="text-primary text-sm">{currency.format(totalCashRequired)}</span></div>
//                             </CardContent>
//                         </Card>
//                     </TabsContent>

//                     {/* Contenu de l'onglet GUIDE (Colonne gauche vide si Guide actif pour laisser la place) */}
//                     <TabsContent value="guide" className="p-4">
//                         <div className="p-4 bg-muted/30 rounded-lg border border-border text-sm text-muted-foreground">
//                             <p>Utilisez l&apos;onglet <strong>Simulateur</strong> pour configurer votre projet.</p>
//                             <p className="mt-2">Consultez la zone de droite pour les étapes détaillées.</p>
//                         </div>
//                     </TabsContent>

//                 </aside>

//                 {/* B. ZONE PRINCIPALE DROITE (Résultats & Guide) */}
//                 <section className="flex-1 h-full overflow-y-auto bg-background p-6 custom-scrollbar relative">
                    
//                     {!simulation.isCompliant && (
//                         <div className="absolute inset-0 z-50 flex items-start justify-center pt-20 backdrop-blur-md bg-background/50 h-full w-full">
//                             <div className="bg-card border border-destructive shadow-2xl p-6 rounded-xl max-w-sm text-center space-y-3">
//                                 <Lock className="h-8 w-8 text-destructive mx-auto" />
//                                 <h3 className="text-lg font-bold text-destructive">Financement Impossible</h3>
//                                 <p className="text-sm text-muted-foreground">{simulation.complianceError}</p>
//                             </div>
//                         </div>
//                     )}

//                     <TabsContent value="simulator" className={`space-y-6 max-w-6xl mx-auto mt-0 h-full ${!simulation.isCompliant ? "opacity-20 blur-sm pointer-events-none" : ""}`}>
                        
//                         {/* 1. KPIs (6 Cartes alignées - Tous les résultats importants sont ici) */}
//                         <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
//                             {/* A. BUDGET */}
//                             <Card className="bg-primary/10 border-primary/30 shadow-sm col-span-2 sm:col-span-1 xl:col-span-1">
//                                 <CardHeader className="p-3 pb-1"><CardTitle className="text-[10px] font-bold text-primary uppercase tracking-wider">Budget Mensuel</CardTitle></CardHeader>
//                                 <CardContent className="p-3 pt-0">
//                                     <div className="text-xl font-bold text-primary">{currency.format(totalMonthlyOutPocket)}</div>
//                                     <p className="text-[10px] opacity-70">Tout inclus</p>
//                                 </CardContent>
//                             </Card>

//                             {/* B. REVENU REQUIS (Déplacé ici) */}
//                             <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200/50 shadow-sm">
//                                 <CardHeader className="p-3 pb-1"><CardTitle className="text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">Revenu Requis</CardTitle></CardHeader>
//                                 <CardContent className="p-3 pt-0">
//                                     <div className="text-xl font-bold text-blue-900 dark:text-blue-100">{currency.format((totalMonthlyOutPocket * 12) / 0.32)}</div>
//                                     <p className="text-[10px] opacity-70">Brut/An</p>
//                                 </CardContent>
//                             </Card>

//                             {/* C. RICHESSE 5 ANS (Déplacé ici) */}
//                             <Card className="bg-green-50/50 dark:bg-green-950/20 border-green-200/50 shadow-sm">
//                                 <CardHeader className="p-3 pb-1"><CardTitle className="text-[10px] font-bold text-green-700 dark:text-green-400 uppercase tracking-wider">Net (5 ans)</CardTitle></CardHeader>
//                                 <CardContent className="p-3 pt-0">
//                                     <div className="text-xl font-bold text-green-700 dark:text-green-400">{currency.format(stats5Years.equity)}</div>
//                                     <p className="text-[10px] opacity-70">Patrimoine</p>
//                                 </CardContent>
//                             </Card>

//                             {/* D. INTÉRÊTS */}
//                             <Card className="shadow-sm">
//                                 <CardHeader className="p-3 pb-1"><CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Coût Intérêts</CardTitle></CardHeader>
//                                 <CardContent className="p-3 pt-0"><div className="text-lg font-bold text-orange-500">{currency.format(simulation.totalInterestPaid)}</div></CardContent>
//                             </Card>

//                             {/* E. ÉCONOMIES */}
//                             <Card className="shadow-sm">
//                                 <CardHeader className="p-3 pb-1"><CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Économies</CardTitle></CardHeader>
//                                 <CardContent className="p-3 pt-0"><div className="text-lg font-bold text-green-500">{currency.format(simulation.interestSaved)}</div></CardContent>
//                             </Card>

//                             {/* F. DURÉE */}
//                             <Card className="shadow-sm">
//                                 <CardHeader className="p-3 pb-1"><CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Durée Réelle</CardTitle></CardHeader>
//                                 <CardContent className="p-3 pt-0"><div className="text-lg font-bold">{Math.floor(simulation.actualDurationMonths / 12)}a {simulation.actualDurationMonths % 12}m</div></CardContent>
//                             </Card>
//                         </div>

//                         {/* 2. GRAPHIQUE */}
//                         <Card className="shadow-lg border-border overflow-hidden">
//                             <CardHeader className="p-4 pb-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b bg-card/30">
//                                 <div>
//                                     <CardTitle className="text-base">Analyse Financière</CardTitle>
//                                     <div className="flex items-center gap-4 mt-1 h-6">
//                                         <p className="text-xs text-muted-foreground">
//                                             {chartView === 'evolution' && "Amortissement de la dette"}
//                                             {chartView === 'distribution' && "Répartition des coûts"}
//                                             {chartView === 'networth' && "Projection Patrimoine"}
//                                         </p>
                                        
//                                         {/* SLIDER CONTEXTUEL DANS LE HEADER */}
//                                         {chartView === 'networth' && (
//                                             <div className="flex items-center gap-2 bg-background px-2 py-0.5 rounded-full border shadow-sm animate-in fade-in slide-in-from-left-4">
//                                                 <span className="text-[10px] font-semibold text-muted-foreground">Appréciation:</span>
//                                                 <span className="text-xs font-bold text-green-600">+{appreciation}%</span>
//                                                 <Slider className="w-20" min={0} max={8} step={0.5} value={[appreciation]} onValueChange={(v) => setAppreciation(v[0])} />
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <div className="flex bg-muted p-1 rounded-lg shrink-0">
//                                     <button onClick={() => setChartView('evolution')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartView === 'evolution' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}><TrendingUp className="h-3 w-3 inline mr-1"/> Dette</button>
//                                     <button onClick={() => setChartView('networth')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartView === 'networth' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}><LineChart className="h-3 w-3 inline mr-1"/> Patrimoine</button>
//                                     <button onClick={() => setChartView('distribution')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartView === 'distribution' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}><PieIcon className="h-3 w-3 inline mr-1"/> Global</button>
//                                 </div>
//                             </CardHeader>
//                             <CardContent className="p-4 h-[350px]">
//                                 <ResponsiveContainer width="100%" height="100%">
//                                     {chartView === 'evolution' ? (
//                                         <ComposedChart data={simulation.schedule} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
//                                             <defs>
//                                             <linearGradient id="colorRent" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--destructive)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--destructive)" stopOpacity={0}/></linearGradient>
//                                             <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient>
//                                             </defs>
//                                             <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} stroke="var(--border)" />
//                                             <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} minTickGap={30} />
//                                             <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} width={40} />
//                                             <Tooltip formatter={(value: number) => currency.format(value)} labelFormatter={(label) => `Mois ${label}`} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '13px' }} />
//                                             <Legend verticalAlign="top" height={36} wrapperStyle={{top: -10}} />
//                                             <Area type="monotone" dataKey="rentPayment" name="Intérêts" stroke="var(--destructive)" fillOpacity={1} fill="url(#colorRent)" stackId="1" />
//                                             <Area type="monotone" dataKey="principalPayment" name="Capital Remboursé" stroke="var(--primary)" fillOpacity={1} fill="url(#colorPrincipal)" stackId="1" />
//                                         </ComposedChart>
//                                     ) : chartView === 'networth' ? (
//                                         <ComposedChart data={enrichedSchedule} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
//                                             <defs>
//                                                 <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient>
//                                                 <linearGradient id="colorDebt" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#64748b" stopOpacity={0.8}/><stop offset="95%" stopColor="#64748b" stopOpacity={0}/></linearGradient>
//                                             </defs>
//                                             <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} stroke="var(--border)" />
//                                             <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} minTickGap={30} />
//                                             <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} width={40} />
//                                             <Tooltip formatter={(value: number) => currency.format(value)} labelFormatter={(label) => `Mois ${label}`} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '13px' }} />
//                                             <Legend verticalAlign="top" height={36} wrapperStyle={{top: -10}} />
//                                             <Area type="monotone" dataKey="houseValue" name="Valeur Maison" stroke="#22c55e" fillOpacity={0.1} fill="url(#colorNet)" stackId="2" />
//                                             <Area type="monotone" dataKey="remainingBankBalance" name="Dette Restante" stroke="#64748b" fillOpacity={0.3} fill="url(#colorDebt)" stackId="3" />
//                                             <Line type="monotone" dataKey="netEquity" name="Équité Nette" stroke="#16a34a" strokeWidth={3} dot={false} />
//                                         </ComposedChart>
//                                     ) : (
//                                         <PieChart>
//                                             <Pie data={pieData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
//                                                 {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />))}
//                                             </Pie>
//                                             <Tooltip formatter={(value: number) => currency.format(value)} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '13px' }} />
//                                             <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
//                                         </PieChart>
//                                     )}
//                                 </ResponsiveContainer>
//                             </CardContent>
//                         </Card>

//                         {/* 3. TABLEAU */}
//                         <Card className="shadow-lg border-border overflow-hidden">
//                             <div className="flex items-center justify-between p-4 border-b bg-muted/20">
//                                 <div className="flex items-center gap-2"><CardTitle className="text-base">Tableau détaillé</CardTitle><Badge variant="outline" className="text-[10px] font-normal">{simulation.schedule.length} mois</Badge></div>
//                                 <Button variant="outline" size="sm" onClick={handleExportCSV} className="h-8 text-xs gap-2"><Download className="h-3.5 w-3.5" /> Exporter CSV</Button>
//                             </div>
//                             <div className="max-h-[500px] overflow-auto">
//                                 <Table>
//                                     <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
//                                         <TableRow>
//                                             <TableHead className="w-[80px]">Mois</TableHead>
//                                             <TableHead>Loyer</TableHead>
//                                             <TableHead>Capital</TableHead>
//                                             <TableHead>Total</TableHead>
//                                             <TableHead className="text-right">Solde</TableHead>
//                                         </TableRow>
//                                     </TableHeader>
//                                     <TableBody>
//                                         {simulation.schedule.map((row) => (
//                                             <TableRow key={row.month} className="hover:bg-muted/50">
//                                                 <TableCell className="font-medium text-muted-foreground">{row.month}</TableCell>
//                                                 <TableCell className="text-orange-500">{currency.format(row.rentPayment)}</TableCell>
//                                                 <TableCell className="text-primary font-medium">{currency.format(row.principalPayment)}</TableCell>
//                                                 <TableCell>{currency.format(row.totalPayment)}</TableCell>
//                                                 <TableCell className="text-right text-muted-foreground">{currency.format(row.remainingBankBalance)}</TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </div>
//                         </Card>
//                     </TabsContent>

//                     <TabsContent value="guide" className="max-w-4xl mx-auto mt-0 p-4">
//                         <Card className="shadow-lg border-border">
//                             <CardHeader>
//                                 <CardTitle className="text-2xl">Parcours d&apos;acquisition Qurtuba</CardTitle>
//                                 <p className="text-muted-foreground">Les 5 étapes clés pour devenir propriétaire, expliquées simplement.</p>
//                             </CardHeader>
//                             <CardContent className="space-y-8 p-8">
//                                 <div className="flex gap-4">
//                                     <div className="flex flex-col items-center">
//                                         <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
//                                         <div className="w-0.5 h-full bg-border mt-2"></div>
//                                     </div>
//                                     <div className="pb-8">
//                                         <h3 className="text-lg font-bold">Devenir Membre</h3>
//                                         <p className="text-muted-foreground mt-1">Remplir le formulaire, payer les frais d&apos;adhésion (75$) et acheter vos premières parts sociales (min. 2000$).</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex gap-4">
//                                     <div className="flex flex-col items-center">
//                                         <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${downPayment >= qurtubaThreshold ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}`}>2</div>
//                                         <div className="w-0.5 h-full bg-border mt-2"></div>
//                                     </div>
//                                     <div className="pb-8">
//                                         <h3 className="text-lg font-bold">L&apos;Objectif 60 000 $</h3>
//                                         <p className="text-muted-foreground mt-1">Vous devez accumuler 60 000 $ de parts pour être inscrit sur la <strong>liste d&apos;attente prioritaire</strong>. C&apos;est votre apport initial.</p>
//                                     </div>
//                                 </div>
//                                 {/* ... Autres étapes du guide identiques à la V13 ... */}
//                                 <div className="flex gap-4">
//                                     <div className="flex flex-col items-center">
//                                         <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">3</div>
//                                         <div className="w-0.5 h-full bg-border mt-2"></div>
//                                     </div>
//                                     <div className="pb-8">
//                                         <h3 className="text-lg font-bold">Lettre d&apos;autorisation</h3>
//                                         <p className="text-muted-foreground mt-1">Quand c&apos;est votre tour, Qurtuba vous envoie une lettre officielle. Vous avez alors <strong>3 mois</strong> pour trouver une maison.</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex gap-4">
//                                     <div className="flex flex-col items-center">
//                                         <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">4</div>
//                                         <div className="w-0.5 h-full bg-border mt-2"></div>
//                                     </div>
//                                     <div className="pb-8">
//                                         <h3 className="text-lg font-bold">Offre d&apos;achat & Inspection</h3>
//                                         <p className="text-muted-foreground mt-1">Vous faites une offre au nom de &quot;Coopérative Qurtuba&quot;. Une fois acceptée, l&apos;inspection est <strong>obligatoire</strong>.</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex gap-4">
//                                     <div className="flex flex-col items-center">
//                                         <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold"><HomeIcon className="h-5 w-5"/></div>
//                                     </div>
//                                     <div>
//                                         <h3 className="text-lg font-bold">Notaire & Emménagement</h3>
//                                         <p className="text-muted-foreground mt-1">Qurtuba désigne le notaire. Vous apportez le reste de votre mise de fonds (si &gt; 60k) et payez les frais de démarrage (Taxe bienvenue, etc.).</p>
//                                     </div>
//                                 </div>
//                             </CardContent>
//                         </Card>
//                     </TabsContent>

//                 </section>
//             </div>
//           </Tabs>
//       </div>
//     </main>
//   );
// }



"use client";

import { useState, useMemo } from "react";
import { QurtubaSimulator, SimulationResult } from "@/lib/qurtuba-logic";
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
import { Lock, Download, Zap, Wallet, PieChart as PieIcon, TrendingUp, Home as HomeIcon, Hammer, PiggyBank, LineChart } from "lucide-react"

export default function Home() {
  const [price, setPrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(60000);
  const [durationYears, setDurationYears] = useState(25);
  const [extraMonthly, setExtraMonthly] = useState(0);
  const [extraAnnual, setExtraAnnual] = useState(0);
  
  // CHARGES & PARAMÈTRES
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

      // CORRECTIF : Utilisation d'une boucle for au lieu de map pour éviter l'erreur de réassignation
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

  // Calcul valeur finale projetée (5 ans)
  const getWealthAtYear = (year: number) => {
      if (!simulation.schedule || simulation.schedule.length === 0) return { value: 0, debt: 0, equity: 0 };
      const monthIndex = Math.min(year * 12, simulation.schedule.length) - 1;
      const row = monthIndex >= 0 ? simulation.schedule[monthIndex] : { remainingBankBalance: price - downPayment };
      
      const futureValue = price * Math.pow(1 + (appreciation/100), year);
      const debt = row.remainingBankBalance;
      return { value: futureValue, debt: debt, equity: futureValue - debt };
  };

  const stats5Years = getWealthAtYear(5);

  const totalChargesOverDuration = monthlyCharges * simulation.actualDurationMonths;
  const pieData = [
    { name: 'Capital (Votre part)', value: price, color: 'hsl(var(--primary))' },
    { name: 'Intérêts (Coût Banque)', value: simulation.totalInterestPaid, color: '#f97316' }, 
    { name: 'Charges & Entretien', value: totalChargesOverDuration, color: '#64748b' }, 
  ];

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
    <main className="flex flex-col h-screen w-full bg-background font-sans overflow-hidden">
      
      {/* 1. HEADER (Fixe) */}
      <header className="h-14 shrink-0 border-b border-border bg-card/50 backdrop-blur-sm z-50 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              Simulateur Qurtuba <span className="text-primary">V14</span>
            </h1>
            <Badge variant="secondary" className="text-[10px] font-normal hidden sm:inline-flex">Expert Layout</Badge>
          </div>
          <div className="flex items-center gap-3">
             {!simulation.isCompliant && <Badge variant="destructive" className="animate-pulse">Non Conforme</Badge>}
            <ModeToggle />
          </div>
      </header>

      {/* 2. CORPS DE L'APPLICATION (Split View) */}
      <div className="flex flex-1 overflow-hidden">
          
          <Tabs defaultValue="simulator" className="flex-1 flex flex-col overflow-hidden">
            
            {/* A. SIDEBAR GAUCHE (Inputs Fixes) */}
            <div className="flex h-full">
                <aside className="w-[400px] shrink-0 border-r border-border bg-card/20 flex flex-col h-full overflow-y-auto custom-scrollbar">
                    
                    {/* Navigation Onglets Mobile/Desktop */}
                    <div className="p-4 pb-0">
                        <TabsList className="grid w-full grid-cols-2 mb-4">
                            <TabsTrigger value="simulator">Simulateur</TabsTrigger>
                            <TabsTrigger value="guide">Guide</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="simulator" className="mt-0 p-4 space-y-4 data-[state=inactive]:hidden">
                        {/* Carte 1: Financement */}
                        <Card className={`shadow-sm border-border ${!simulation.isCompliant ? "border-destructive/50 ring-1 ring-destructive/20" : ""}`}>
                            <CardHeader className="p-4 pb-2"><CardTitle className="text-sm font-semibold">1. Financement</CardTitle></CardHeader>
                            <CardContent className="p-4 space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between"><Label className="text-xs">Prix maison</Label><span className="font-bold text-sm text-primary">{currency.format(price)}</span></div>
                                    <Slider min={100000} max={1500000} step={5000} value={[price]} onValueChange={(v) => setPrice(v[0])} />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between">
                                        <Label className={`text-xs ${!simulation.isCompliant ? "text-destructive" : ""}`}>Apport</Label>
                                        <span className={`font-bold text-sm ${!simulation.isCompliant ? "text-destructive" : "text-green-500"}`}>{currency.format(downPayment)}</span>
                                    </div>
                                    <Slider min={0} max={price} step={1000} value={[downPayment]} onValueChange={(v) => setDownPayment(v[0])} />
                                    
                                    {/* Jauge intégrée discrète */}
                                    <div className="pt-2">
                                        <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                                            <span>Priorité ({currency.format(qurtubaThreshold)})</span>
                                            <span className={progressValue >= 100 ? "text-green-600 font-bold" : ""}>{Math.round(progressValue)}%</span>
                                        </div>
                                        <Progress value={progressValue} className="h-1.5" />
                                        {!simulation.isCompliant && <div className="flex justify-end mt-1 text-destructive text-[10px] font-bold">Min requis: {currency.format(simulation.minDownPaymentRequired)}</div>}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between"><Label className="text-xs">Durée</Label><span className="font-bold text-sm">{durationYears} ans</span></div>
                                    <Slider min={1} max={30} step={1} value={[durationYears]} onValueChange={(v) => setDurationYears(v[0])} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Carte 2: Charges */}
                        <Card className="shadow-sm border-border bg-card/40">
                            <CardHeader className="p-4 pb-2"><CardTitle className="text-sm font-semibold">2. Charges Annuelles</CardTitle></CardHeader>
                            <CardContent className="p-4 space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1"><Label className="text-[10px] text-muted-foreground">Municipale</Label><Input type="number" suppressHydrationWarning value={municipalTax} onChange={(e) => setMunicipalTax(Number(e.target.value))} className="h-8 text-xs bg-background" /></div>
                                    <div className="space-y-1"><Label className="text-[10px] text-muted-foreground">Scolaire</Label><Input type="number" suppressHydrationWarning value={schoolTax} onChange={(e) => setSchoolTax(Number(e.target.value))} className="h-8 text-xs bg-background" /></div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1"><Label className="text-[10px] text-muted-foreground">Assurance</Label><Input type="number" suppressHydrationWarning value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} className="h-8 text-xs bg-background" /></div>
                                    <div className="space-y-1"><Label className="text-[10px] text-muted-foreground flex items-center gap-1"><Zap className="h-3 w-3 text-yellow-500"/> Hydro</Label><Input type="number" suppressHydrationWarning value={hydro} onChange={(e) => setHydro(Number(e.target.value))} className="h-8 text-xs bg-background" /></div>
                                </div>
                                <div className="space-y-1 pt-1 border-t border-border">
                                    <Label className="text-[10px] text-muted-foreground flex items-center gap-1"><Hammer className="h-3 w-3"/> Entretien / Condo</Label>
                                    <Input type="number" suppressHydrationWarning value={maintenance} onChange={(e) => setMaintenance(Number(e.target.value))} className="h-8 text-xs bg-background" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Carte 3: Accélérateur */}
                        <Card className="shadow-sm border-primary/20 bg-primary/5">
                            <CardHeader className="p-4 pb-2"><CardTitle className="text-primary text-sm flex items-center gap-2">🚀 Accélérateur</CardTitle></CardHeader>
                            <CardContent className="p-4 space-y-3">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs"><Label>Extra Mensuel</Label><span className="font-bold text-primary">+{currency.format(extraMonthly)}</span></div>
                                    <Slider min={0} max={2000} step={50} value={[extraMonthly]} onValueChange={(v) => setExtraMonthly(v[0])} />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs"><Label>Extra Annuel</Label><span className="font-bold text-primary">+{currency.format(extraAnnual)}</span></div>
                                    <Slider min={0} max={20000} step={500} value={[extraAnnual]} onValueChange={(v) => setExtraAnnual(v[0])} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Carte 4: Cash Day 1 (Info seulement) */}
                        <Card className="shadow-sm border-border bg-card/20">
                            <CardHeader className="p-4 pb-2"><CardTitle className="text-sm">Cash Requis (J-1)</CardTitle></CardHeader>
                            <CardContent className="p-4 space-y-1 text-xs">
                                <div className="flex justify-between"><span className="text-muted-foreground">Mise de fonds</span><span>{currency.format(downPayment)}</span></div>
                                <div className="flex justify-between"><span className="text-muted-foreground">Bienvenue + Notaire</span><span>{currency.format(welcomeTax + notaryFees)}</span></div>
                                <div className="flex justify-between font-bold border-t pt-2 mt-2"><span>TOTAL</span><span className="text-primary text-sm">{currency.format(totalCashRequired)}</span></div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Contenu de l'onglet GUIDE (Colonne gauche vide si Guide actif pour laisser la place) */}
                    <TabsContent value="guide" className="p-4">
                        <div className="p-4 bg-muted/30 rounded-lg border border-border text-sm text-muted-foreground">
                            <p>Utilisez l&apos;onglet <strong>Simulateur</strong> pour configurer votre projet.</p>
                            <p className="mt-2">Consultez la zone de droite pour les étapes détaillées.</p>
                        </div>
                    </TabsContent>

                </aside>

                {/* B. ZONE PRINCIPALE DROITE (Résultats & Guide) */}
                <section className="flex-1 h-full overflow-y-auto bg-background p-6 custom-scrollbar relative">
                    
                    {!simulation.isCompliant && (
                        <div className="absolute inset-0 z-50 flex items-start justify-center pt-20 backdrop-blur-md bg-background/50 h-full w-full">
                            <div className="bg-card border border-destructive shadow-2xl p-6 rounded-xl max-w-sm text-center space-y-3">
                                <Lock className="h-8 w-8 text-destructive mx-auto" />
                                <h3 className="text-lg font-bold text-destructive">Financement Impossible</h3>
                                <p className="text-sm text-muted-foreground">{simulation.complianceError}</p>
                            </div>
                        </div>
                    )}

                    <TabsContent value="simulator" className={`space-y-6 max-w-6xl mx-auto mt-0 h-full ${!simulation.isCompliant ? "opacity-20 blur-sm pointer-events-none" : ""}`}>
                        
                        {/* 1. KPIs (6 Cartes alignées - Tous les résultats importants sont ici) */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
                            {/* A. BUDGET */}
                            <Card className="bg-primary/10 border-primary/30 shadow-sm col-span-2 sm:col-span-1 xl:col-span-1">
                                <CardHeader className="p-3 pb-1"><CardTitle className="text-[10px] font-bold text-primary uppercase tracking-wider">Budget Mensuel</CardTitle></CardHeader>
                                <CardContent className="p-3 pt-0">
                                    <div className="text-xl font-bold text-primary">{currency.format(totalMonthlyOutPocket)}</div>
                                    <p className="text-[10px] opacity-70">Tout inclus</p>
                                </CardContent>
                            </Card>

                            {/* B. REVENU REQUIS (Déplacé ici) */}
                            <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200/50 shadow-sm">
                                <CardHeader className="p-3 pb-1"><CardTitle className="text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">Revenu Requis</CardTitle></CardHeader>
                                <CardContent className="p-3 pt-0">
                                    <div className="text-xl font-bold text-blue-900 dark:text-blue-100">{currency.format((totalMonthlyOutPocket * 12) / 0.32)}</div>
                                    <p className="text-[10px] opacity-70">Brut/An</p>
                                </CardContent>
                            </Card>

                            {/* C. RICHESSE 5 ANS (Déplacé ici) */}
                            <Card className="bg-green-50/50 dark:bg-green-950/20 border-green-200/50 shadow-sm">
                                <CardHeader className="p-3 pb-1"><CardTitle className="text-[10px] font-bold text-green-700 dark:text-green-400 uppercase tracking-wider">Net (5 ans)</CardTitle></CardHeader>
                                <CardContent className="p-3 pt-0">
                                    <div className="text-xl font-bold text-green-700 dark:text-green-400">{currency.format(stats5Years.equity)}</div>
                                    <p className="text-[10px] opacity-70">Patrimoine</p>
                                </CardContent>
                            </Card>

                            {/* D. INTÉRÊTS */}
                            <Card className="shadow-sm">
                                <CardHeader className="p-3 pb-1"><CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Coût Intérêts</CardTitle></CardHeader>
                                <CardContent className="p-3 pt-0"><div className="text-lg font-bold text-orange-500">{currency.format(simulation.totalInterestPaid)}</div></CardContent>
                            </Card>

                            {/* E. ÉCONOMIES */}
                            <Card className="shadow-sm">
                                <CardHeader className="p-3 pb-1"><CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Économies</CardTitle></CardHeader>
                                <CardContent className="p-3 pt-0"><div className="text-lg font-bold text-green-500">{currency.format(simulation.interestSaved)}</div></CardContent>
                            </Card>

                            {/* F. DURÉE */}
                            <Card className="shadow-sm">
                                <CardHeader className="p-3 pb-1"><CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Durée Réelle</CardTitle></CardHeader>
                                <CardContent className="p-3 pt-0"><div className="text-lg font-bold">{Math.floor(simulation.actualDurationMonths / 12)}a {simulation.actualDurationMonths % 12}m</div></CardContent>
                            </Card>
                        </div>

                        {/* 2. GRAPHIQUE */}
                        <Card className="shadow-lg border-border overflow-hidden">
                            <CardHeader className="p-4 pb-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b bg-card/30">
                                <div>
                                    <CardTitle className="text-base">Analyse Financière</CardTitle>
                                    <div className="flex items-center gap-4 mt-1 h-6">
                                        <p className="text-xs text-muted-foreground">
                                            {chartView === 'evolution' && "Amortissement de la dette"}
                                            {chartView === 'distribution' && "Répartition des coûts"}
                                            {chartView === 'networth' && "Projection Patrimoine"}
                                        </p>
                                        
                                        {/* SLIDER CONTEXTUEL DANS LE HEADER */}
                                        {chartView === 'networth' && (
                                            <div className="flex items-center gap-2 bg-background px-2 py-0.5 rounded-full border shadow-sm animate-in fade-in slide-in-from-left-4">
                                                <span className="text-[10px] font-semibold text-muted-foreground">Appréciation:</span>
                                                <span className="text-xs font-bold text-green-600">+{appreciation}%</span>
                                                <Slider className="w-20" min={0} max={8} step={0.5} value={[appreciation]} onValueChange={(v) => setAppreciation(v[0])} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex bg-muted p-1 rounded-lg shrink-0">
                                    <button onClick={() => setChartView('evolution')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartView === 'evolution' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}><TrendingUp className="h-3 w-3 inline mr-1"/> Dette</button>
                                    <button onClick={() => setChartView('networth')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartView === 'networth' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}><LineChart className="h-3 w-3 inline mr-1"/> Patrimoine</button>
                                    <button onClick={() => setChartView('distribution')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartView === 'distribution' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}><PieIcon className="h-3 w-3 inline mr-1"/> Global</button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    {chartView === 'evolution' ? (
                                        <ComposedChart data={simulation.schedule} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                            <defs>
                                            <linearGradient id="colorRent" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--destructive)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--destructive)" stopOpacity={0}/></linearGradient>
                                            <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} stroke="var(--border)" />
                                            <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} minTickGap={30} />
                                            <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} width={40} />
                                            <Tooltip formatter={(value: number) => currency.format(value)} labelFormatter={(label) => `Mois ${label}`} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '13px' }} />
                                            <Legend verticalAlign="top" height={36} wrapperStyle={{top: -10}} />
                                            <Area type="monotone" dataKey="rentPayment" name="Intérêts" stroke="var(--destructive)" fillOpacity={1} fill="url(#colorRent)" stackId="1" />
                                            <Area type="monotone" dataKey="principalPayment" name="Capital Remboursé" stroke="var(--primary)" fillOpacity={1} fill="url(#colorPrincipal)" stackId="1" />
                                        </ComposedChart>
                                    ) : chartView === 'networth' ? (
                                        <ComposedChart data={enrichedSchedule} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient>
                                                <linearGradient id="colorDebt" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#64748b" stopOpacity={0.8}/><stop offset="95%" stopColor="#64748b" stopOpacity={0}/></linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} stroke="var(--border)" />
                                            <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `An ${Math.floor(val/12)}`} minTickGap={30} />
                                            <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} width={40} />
                                            <Tooltip formatter={(value: number) => currency.format(value)} labelFormatter={(label) => `Mois ${label}`} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '13px' }} />
                                            <Legend verticalAlign="top" height={36} wrapperStyle={{top: -10}} />
                                            <Area type="monotone" dataKey="houseValue" name="Valeur Maison" stroke="#22c55e" fillOpacity={0.1} fill="url(#colorNet)" stackId="2" />
                                            <Area type="monotone" dataKey="remainingBankBalance" name="Dette Restante" stroke="#64748b" fillOpacity={0.3} fill="url(#colorDebt)" stackId="3" />
                                            <Line type="monotone" dataKey="netEquity" name="Équité Nette" stroke="#16a34a" strokeWidth={3} dot={false} />
                                        </ComposedChart>
                                    ) : (
                                        <PieChart>
                                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
                                                {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />))}
                                            </Pie>
                                            <Tooltip formatter={(value: number) => currency.format(value)} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', fontSize: '13px' }} />
                                            <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
                                        </PieChart>
                                    )}
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* 3. TABLEAU */}
                        <Card className="shadow-lg border-border overflow-hidden">
                            <div className="flex items-center justify-between p-4 border-b bg-muted/20">
                                <div className="flex items-center gap-2"><CardTitle className="text-base">Tableau détaillé</CardTitle><Badge variant="outline" className="text-[10px] font-normal">{simulation.schedule.length} mois</Badge></div>
                                <Button variant="outline" size="sm" onClick={handleExportCSV} className="h-8 text-xs gap-2"><Download className="h-3.5 w-3.5" /> Exporter CSV</Button>
                            </div>
                            <div className="max-h-[500px] overflow-auto">
                                <Table>
                                    <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
                                        <TableRow>
                                            <TableHead className="w-[80px]">Mois</TableHead>
                                            <TableHead>Loyer</TableHead>
                                            <TableHead>Capital</TableHead>
                                            <TableHead>Total</TableHead>
                                            <TableHead className="text-right">Solde</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {simulation.schedule.map((row) => (
                                            <TableRow key={row.month} className="hover:bg-muted/50">
                                                <TableCell className="font-medium text-muted-foreground">{row.month}</TableCell>
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

                    <TabsContent value="guide" className="max-w-4xl mx-auto mt-0 p-4">
                        <Card className="shadow-lg border-border">
                            <CardHeader>
                                <CardTitle className="text-2xl">Parcours d&apos;acquisition Qurtuba</CardTitle>
                                <p className="text-muted-foreground">Les 5 étapes clés pour devenir propriétaire, expliquées simplement.</p>
                            </CardHeader>
                            <CardContent className="space-y-8 p-8">
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                                        <div className="w-0.5 h-full bg-border mt-2"></div>
                                    </div>
                                    <div className="pb-8">
                                        <h3 className="text-lg font-bold">Devenir Membre</h3>
                                        <p className="text-muted-foreground mt-1">Remplir le formulaire, payer les frais d&apos;adhésion (75$) et acheter vos premières parts sociales (min. 2000$).</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${downPayment >= qurtubaThreshold ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}`}>2</div>
                                        <div className="w-0.5 h-full bg-border mt-2"></div>
                                    </div>
                                    <div className="pb-8">
                                        <h3 className="text-lg font-bold">L&apos;Objectif 60 000 $</h3>
                                        <p className="text-muted-foreground mt-1">Vous devez accumuler 60 000 $ de parts pour être inscrit sur la <strong>liste d&apos;attente prioritaire</strong>. C&apos;est votre apport initial.</p>
                                    </div>
                                </div>
                                {/* ... Autres étapes du guide identiques à la V13 ... */}
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">3</div>
                                        <div className="w-0.5 h-full bg-border mt-2"></div>
                                    </div>
                                    <div className="pb-8">
                                        <h3 className="text-lg font-bold">Lettre d&apos;autorisation</h3>
                                        <p className="text-muted-foreground mt-1">Quand c&apos;est votre tour, Qurtuba vous envoie une lettre officielle. Vous avez alors <strong>3 mois</strong> pour trouver une maison.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">4</div>
                                        <div className="w-0.5 h-full bg-border mt-2"></div>
                                    </div>
                                    <div className="pb-8">
                                        <h3 className="text-lg font-bold">Offre d&apos;achat & Inspection</h3>
                                        <p className="text-muted-foreground mt-1">Vous faites une offre au nom de &quot;Coopérative Qurtuba&quot;. Une fois acceptée, l&apos;inspection est <strong>obligatoire</strong>.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold"><HomeIcon className="h-5 w-5"/></div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">Notaire & Emménagement</h3>
                                        <p className="text-muted-foreground mt-1">Qurtuba désigne le notaire. Vous apportez le reste de votre mise de fonds (si &gt; 60k) et payez les frais de démarrage (Taxe bienvenue, etc.).</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                </section>
            </div>
          </Tabs>
      </div>
    </main>
  );
}