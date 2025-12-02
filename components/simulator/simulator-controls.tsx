"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Settings2, Zap, TrendingUp, MapPin, Wallet, AlertTriangle } from "lucide-react";
// 1. IMPORT DU TYPE
import { SimulationResult } from "@/lib/qurtuba-logic";

interface SimulatorControlsProps {
  price: number; setPrice: (v: number) => void;
  downPayment: number; setDownPayment: (v: number) => void;
  durationYears: number; setDurationYears: (v: number) => void;
  extraMonthly: number; setExtraMonthly: (v: number) => void;
  extraAnnual: number; setExtraAnnual: (v: number) => void;
  appreciation: number; setAppreciation: (v: number) => void;
  isMontreal: boolean; setIsMontreal: (v: boolean) => void;
  municipalTax: number; setMunicipalTax: (v: number) => void;
  schoolTax: number; setSchoolTax: (v: number) => void;
  insurance: number; setInsurance: (v: number) => void;
  hydro: number; setHydro: (v: number) => void;
  maintenance: number; setMaintenance: (v: number) => void;
  currency: Intl.NumberFormat;
  
  // 2. CORRECTION DU TYPE ICI
  simulation: SimulationResult;
  
  welcomeTax: number;
  notaryFees: number;
  startupFees: number;
  totalCashRequired: number;
}

export function SimulatorControls({
  price, setPrice, downPayment, setDownPayment, durationYears, setDurationYears,
  extraMonthly, setExtraMonthly, extraAnnual, setExtraAnnual, 
  appreciation, setAppreciation,
  isMontreal, setIsMontreal,
  municipalTax, setMunicipalTax, schoolTax, setSchoolTax, insurance, setInsurance,
  hydro, setHydro, maintenance, setMaintenance, currency, simulation,
  welcomeTax, notaryFees, startupFees, totalCashRequired
}: SimulatorControlsProps) {
  
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  return (
    <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-4">
      {/* SECTION DU HAUT (Sliders principaux) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-4 space-y-3">
              <div className="flex justify-between items-center">
                  <Label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1">Prix Propriété</Label>
                  <div className="bg-primary/10 text-primary px-2 py-0.5 rounded text-sm font-bold font-mono">{currency.format(price)}</div>
              </div>
              <Slider min={100000} max={1500000} step={5000} value={[price]} onValueChange={(v) => setPrice(v[0])} className="py-2" />
          </div>

          <div className="md:col-span-4 space-y-3">
              <div className="flex justify-between items-center">
                  <Label className={`text-xs font-bold uppercase flex items-center gap-1 ${!simulation.isCompliant ? "text-destructive" : "text-muted-foreground"}`}>
                      {simulation.isCompliant ? "Apport Initial" : <><AlertTriangle className="h-3 w-3"/> Apport Insuffisant</>}
                  </Label>
                  <div className={`px-2 py-0.5 rounded text-sm font-bold font-mono ${!simulation.isCompliant ? "bg-destructive/10 text-destructive" : "bg-green-500/10 text-green-600"}`}>
                      {currency.format(downPayment)}
                  </div>
              </div>
              <Slider min={0} max={price} step={1000} value={[downPayment]} onValueChange={(v) => setDownPayment(v[0])} className="py-2" />
          </div>

          <div className="md:col-span-2 space-y-3">
              <div className="flex justify-between items-center"><Label className="text-xs font-bold uppercase text-muted-foreground">Durée</Label><span className="font-bold text-sm">{durationYears} ans</span></div>
              <Slider min={5} max={30} step={1} value={[durationYears]} onValueChange={(v) => setDurationYears(v[0])} className="py-2" />
          </div>

          <div className="md:col-span-2 flex justify-end">
              <Button variant={showAdvanced ? "secondary" : "outline"} onClick={() => setShowAdvanced(!showAdvanced)} className="w-full md:w-auto h-10 gap-2 text-xs font-bold shadow-sm">
                  <Settings2 className="h-4 w-4" />
                  {showAdvanced ? "Fermer" : "Configurer"}
              </Button>
          </div>
      </div>

      {/* PANNEAU AVANCÉ (OPTIONS) */}
      {showAdvanced && (
          <div className="mt-6 pt-6 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-8 animate-in slide-in-from-top-2 fade-in duration-300">
              
              {/* COLONNE 1 : CHARGES */}
              <Card className="border-0 shadow-none bg-transparent space-y-4">
                  <h3 className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2"><Zap className="h-3 w-3"/> Charges Mensuelles</h3>
                  
                  <div className="p-3 bg-muted/30 rounded-lg border grid grid-cols-2 gap-3">
                      <div className="space-y-1"><Label className="text-[10px] text-muted-foreground">Municipale (An)</Label><Input type="number" value={municipalTax} onChange={(e) => setMunicipalTax(Number(e.target.value))} className="h-7 text-xs bg-background"/></div>
                      <div className="space-y-1"><Label className="text-[10px] text-muted-foreground">Scolaire (An)</Label><Input type="number" value={schoolTax} onChange={(e) => setSchoolTax(Number(e.target.value))} className="h-7 text-xs bg-background"/></div>
                      <div className="space-y-1"><Label className="text-[10px] text-muted-foreground">Assurance (An)</Label><Input type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} className="h-7 text-xs bg-background"/></div>
                      <div className="space-y-1"><Label className="text-[10px] text-muted-foreground">Hydro (An)</Label><Input type="number" value={hydro} onChange={(e) => setHydro(Number(e.target.value))} className="h-7 text-xs bg-background"/></div>
                      <div className="col-span-2 space-y-1"><Label className="text-[10px] text-muted-foreground">Maintenance / Condo (An)</Label><Input type="number" value={maintenance} onChange={(e) => setMaintenance(Number(e.target.value))} className="h-7 text-xs bg-background"/></div>
                  </div>
              </Card>

              {/* COLONNE 2 : STRATÉGIE */}
              <Card className="border-0 shadow-none bg-transparent space-y-4">
                  <h3 className="text-xs font-bold uppercase text-primary flex items-center gap-2"><TrendingUp className="h-3 w-3"/> Stratégie Accélérée</h3>
                  <div className="space-y-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
                      <div className="space-y-2">
                          <div className="flex justify-between text-xs"><Label>Extra Mensuel</Label><span className="font-bold text-primary">+{currency.format(extraMonthly)}</span></div>
                          <Slider min={0} max={2000} step={50} value={[extraMonthly]} onValueChange={(v) => setExtraMonthly(v[0])} className="cursor-pointer"/>
                      </div>
                      
                      <Separator className="bg-primary/10"/>
                      
                      <div className="space-y-2">
                          <div className="flex justify-between text-xs"><Label>Extra Annuel (Lump sum)</Label><span className="font-bold text-primary">+{currency.format(extraAnnual)}</span></div>
                          <Slider min={0} max={20000} step={500} value={[extraAnnual]} onValueChange={(v) => setExtraAnnual(v[0])} className="cursor-pointer"/>
                      </div>

                      <Separator className="bg-primary/10"/>

                      {/* Slider Appréciation */}
                      <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                              <Label className="flex items-center gap-1">Appréciation Maison (An)</Label>
                              <span className="font-bold text-green-600">+{appreciation}%</span>
                          </div>
                          <Slider 
                              min={0} max={8} step={0.5} 
                              value={[appreciation]} 
                              onValueChange={(v) => setAppreciation(v[0])} 
                              className="cursor-pointer"
                          />
                      </div>
                  </div>
              </Card>

              {/* COLONNE 3 : COÛTS */}
              <Card className="border-0 shadow-none bg-transparent space-y-4">
                  <h3 className="text-xs font-bold uppercase text-green-600 flex items-center gap-2"><Wallet className="h-3 w-3"/> Coûts de Démarrage</h3>
                  
                  <div className="space-y-2 text-xs p-3 bg-background border rounded-lg shadow-sm">
                      <div className="flex justify-between py-1 border-b border-dashed">
                          <span className="text-muted-foreground">Mise de fonds</span>
                          <span className="font-medium">{currency.format(downPayment)}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-dashed">
                          <span className="text-muted-foreground">Taxe Bienvenue</span>
                          <span>{currency.format(welcomeTax)}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-dashed">
                          <span className="text-muted-foreground">Notaire & Frais</span>
                          <span>{currency.format(notaryFees + startupFees)}</span>
                      </div>
                      
                      <div className="flex justify-between pt-2 mt-1">
                          <span className="font-bold text-muted-foreground">CASH REQUIS</span>
                          <span className="font-bold text-green-600 text-sm">{currency.format(totalCashRequired)}</span>
                      </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground px-1">
                    *Estimation incluant la mise de fonds et les frais de clôture approximatifs.
                  </p>
              </Card>
          </div>
      )}
    </div>
  );
}