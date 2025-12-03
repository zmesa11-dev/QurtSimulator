"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Settings2, Zap, TrendingUp, Wallet, AlertTriangle, ChevronDown, ChevronUp, Edit3 } from "lucide-react";
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
  
  // NOUVEAU STATE : Pour gérer l'ouverture des contrôles sur mobile
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  
  return (
    <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-4 md:py-6">
      
      {/* --- MOBILE SUMMARY BAR (VISIBLE SEULEMENT SUR MOBILE) --- */}
      {/* Cette barre remplace les gros sliders quand on est sur petit écran */}
      <div className="md:hidden flex items-center justify-between bg-muted/40 p-3 rounded-lg border border-border/60 mb-2">
          <div className="flex flex-col">
              <span className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Configuration</span>
              <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-bold text-primary text-sm">{currency.format(price)}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs font-medium">{durationYears} ans</span>
              </div>
          </div>
          <Button 
            size="sm" 
            variant={isMobileExpanded ? "secondary" : "outline"} 
            className="h-8 text-xs gap-2"
            onClick={() => setIsMobileExpanded(!isMobileExpanded)}
          >
              <Edit3 className="h-3 w-3" />
              {isMobileExpanded ? "Fermer" : "Modifier"}
          </Button>
      </div>

      {/* --- SLIDERS PRINCIPAUX --- */}
      {/* On ajoute la classe 'hidden md:grid' pour cacher sur mobile SAUF si isMobileExpanded est true */}
      <div className={`${!isMobileExpanded ? 'hidden' : 'grid'} md:grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-end mb-2 animate-in slide-in-from-top-2`}>
          
          {/* PRIX */}
          <div className="md:col-span-4 space-y-4">
              <div className="flex justify-between items-center">
                  <Label className="text-xs font-bold uppercase text-muted-foreground tracking-wide">Prix Propriété</Label>
                  <span className="text-lg font-bold text-primary font-mono">{currency.format(price)}</span>
              </div>
              <Slider min={100000} max={1500000} step={5000} value={[price]} onValueChange={(v) => setPrice(v[0])} className="py-2" />
          </div>

          {/* APPORT */}
          <div className="md:col-span-4 space-y-4">
              <div className="flex justify-between items-center">
                  <Label className={`text-xs font-bold uppercase tracking-wide flex items-center gap-1 ${!simulation.isCompliant ? "text-destructive" : "text-muted-foreground"}`}>
                      {simulation.isCompliant ? "Apport Initial" : <><AlertTriangle className="h-3 w-3"/> Apport Insuffisant</>}
                  </Label>
                  <span className={`text-lg font-bold font-mono ${!simulation.isCompliant ? "text-destructive" : "text-green-600"}`}>
                      {currency.format(downPayment)}
                  </span>
              </div>
              <Slider min={0} max={price} step={1000} value={[downPayment]} onValueChange={(v) => setDownPayment(v[0])} className="py-2" />
          </div>

          {/* DUREE */}
          <div className="md:col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                  <Label className="text-xs font-bold uppercase text-muted-foreground tracking-wide">Durée</Label>
                  <span className="font-bold text-sm">{durationYears} ans</span>
              </div>
              <Slider min={5} max={30} step={1} value={[durationYears]} onValueChange={(v) => setDurationYears(v[0])} className="py-2" />
          </div>

          {/* TOGGLE ADVANCED */}
          <div className="md:col-span-2 flex justify-end pb-1">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowAdvanced(!showAdvanced)} 
                className="gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground w-full md:w-auto"
              >
                  <Settings2 className="h-4 w-4" />
                  {showAdvanced ? "Masquer options" : "Plus d'options"}
                  {showAdvanced ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </Button>
          </div>
      </div>

      {/* --- OPTIONS AVANCÉES --- */}
      {showAdvanced && (isMobileExpanded || window.innerWidth >= 768) && (
          <div className="mt-6 md:mt-8 pt-6 border-t border-border/40 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 animate-in slide-in-from-top-2 fade-in duration-200">
              
              {/* 1. CHARGES */}
              <div className="space-y-4">
                  <h3 className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-2">
                      <Zap className="h-3 w-3"/> Charges Annuelles
                  </h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                      <div className="space-y-1"><Label className="text-[10px] text-muted-foreground">Municipale</Label><Input type="number" value={municipalTax} onChange={(e) => setMunicipalTax(Number(e.target.value))} className="h-7 text-xs bg-transparent border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"/></div>
                      <div className="space-y-1"><Label className="text-[10px] text-muted-foreground">Scolaire</Label><Input type="number" value={schoolTax} onChange={(e) => setSchoolTax(Number(e.target.value))} className="h-7 text-xs bg-transparent border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"/></div>
                      <div className="space-y-1"><Label className="text-[10px] text-muted-foreground">Assurance</Label><Input type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} className="h-7 text-xs bg-transparent border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"/></div>
                      <div className="space-y-1"><Label className="text-[10px] text-muted-foreground">Hydro</Label><Input type="number" value={hydro} onChange={(e) => setHydro(Number(e.target.value))} className="h-7 text-xs bg-transparent border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"/></div>
                      <div className="col-span-2 space-y-1"><Label className="text-[10px] text-muted-foreground">Maintenance</Label><Input type="number" value={maintenance} onChange={(e) => setMaintenance(Number(e.target.value))} className="h-7 text-xs bg-transparent border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"/></div>
                  </div>
              </div>

              {/* 2. STRATÉGIE */}
              <div className="space-y-5">
                  <h3 className="text-[10px] font-bold uppercase text-primary tracking-wider flex items-center gap-2">
                      <TrendingUp className="h-3 w-3"/> Accélérateur
                  </h3>
                  
                  <div className="space-y-4">
                      <div className="space-y-2">
                          <div className="flex justify-between text-xs"><Label>Extra Mensuel</Label><span className="font-bold text-primary">+{currency.format(extraMonthly)}</span></div>
                          <Slider min={0} max={2000} step={50} value={[extraMonthly]} onValueChange={(v) => setExtraMonthly(v[0])} />
                      </div>
                      
                      <div className="space-y-2">
                          <div className="flex justify-between text-xs"><Label>Extra Annuel</Label><span className="font-bold text-primary">+{currency.format(extraAnnual)}</span></div>
                          <Slider min={0} max={20000} step={500} value={[extraAnnual]} onValueChange={(v) => setExtraAnnual(v[0])} />
                      </div>

                      <div className="space-y-2 pt-2">
                          <div className="flex justify-between text-xs"><Label>Appréciation (An)</Label><span className="font-bold text-green-600">+{appreciation}%</span></div>
                          <Slider min={0} max={8} step={0.5} value={[appreciation]} onValueChange={(v) => setAppreciation(v[0])} />
                      </div>
                  </div>
              </div>

              {/* 3. COÛTS */}
              <div className="space-y-4">
                  <h3 className="text-[10px] font-bold uppercase text-green-600 tracking-wider flex items-center gap-2">
                      <Wallet className="h-3 w-3"/> Coûts initiaux
                  </h3>
                  
                  <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-border/30">
                          <span className="text-muted-foreground">Mise de fonds</span>
                          <span className="font-medium">{currency.format(downPayment)}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-border/30">
                          <span className="text-muted-foreground">Taxe Bienvenue</span>
                          <span>{currency.format(welcomeTax)}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-border/30">
                          <span className="text-muted-foreground">Notaire & Frais</span>
                          <span>{currency.format(notaryFees + startupFees)}</span>
                      </div>
                      
                      <div className="flex justify-between pt-3">
                          <span className="font-bold uppercase text-[10px] tracking-wider text-muted-foreground">Total Requis</span>
                          <span className="font-bold text-base text-foreground">{currency.format(totalCashRequired)}</span>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}