"use client";

import { useQurtuba } from "@/hooks/use-qurtuba";
import { SimulatorHeader } from "@/components/simulator/simulator-header";
import { SimulatorControls } from "@/components/simulator/simulator-controls";
import { SimulatorKPIs } from "@/components/simulator/simulator-kpis";
import { SimulatorCharts } from "@/components/simulator/simulator-charts";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { ScheduleRow } from "@/lib/qurtuba-logic";

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
    // CORRECTION ICI : On type proprement 'r'
    const rows = enrichedSchedule.map((r: ScheduleRow & { houseValue: number; netEquity: number }) =>
      `${r.month},${r.rentPayment.toFixed(2)},${r.principalPayment.toFixed(2)},${r.totalPayment.toFixed(2)},${r.remainingBankBalance.toFixed(2)},${r.houseValue.toFixed(2)},${r.netEquity.toFixed(2)}`
    );

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
                            {/* On remplace d'apport par d&apos;apport */}
                            Il manque <span className="text-destructive font-bold">{currency.format(simulation.shortfall || 0)}</span> d&apos;apport
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