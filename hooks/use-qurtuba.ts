// "use client";

// import { useState, useMemo, useEffect } from "react";
// import { QurtubaSimulator } from "@/lib/qurtuba-logic";
// import { useTheme } from "next-themes";

// export function useQurtuba() {
//   // --- ÉTATS ---
//   const [price, setPrice] = useState(500000);
//   const [downPayment, setDownPayment] = useState(60000);
//   const [durationYears, setDurationYears] = useState(25);
  
//   // Options avancées
//   const [extraMonthly, setExtraMonthly] = useState(0);
//   const [extraAnnual, setExtraAnnual] = useState(0);
  
//   // Charges
//   const [municipalTax, setMunicipalTax] = useState(3000);
//   const [schoolTax, setSchoolTax] = useState(350);
//   const [insurance, setInsurance] = useState(1200);
//   const [hydro, setHydro] = useState(1800);
//   const [maintenance, setMaintenance] = useState(2400); 
//   const [appreciation, setAppreciation] = useState(3); // Il est bien déclaré ici
  
//   // UI States
//   const [chartView, setChartView] = useState<'evolution' | 'distribution' | 'networth'>('evolution');
//   const [wealthHorizon, setWealthHorizon] = useState<number | 'end'>(5);

//   const rate = 5.5; 

//   // --- THEME & HYDRATION FIX ---
//   const { theme } = useTheme();
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsMounted(true), 0);
//     return () => clearTimeout(timer);
//   }, []);

//   const isDark = isMounted && (theme === 'dark');

//   // --- MOTEUR DE CALCUL ---
//   const { simulation, welcomeTax, notaryFees, startupFees } = useMemo(() => {
//     const sim = new QurtubaSimulator(price, downPayment, rate, durationYears, extraMonthly, extraAnnual);
//     return {
//         simulation: sim.generateSchedule(),
//         welcomeTax: sim.calculateWelcomeTax(),
//         notaryFees: sim.calculateNotaryFees(),
//         startupFees: sim.calculateStartupFees()
//     };
//   }, [price, downPayment, durationYears, extraMonthly, extraAnnual]);

//   // --- DONNÉES CHART ---
//   const chartData = useMemo(() => {
//       if (!simulation.schedule) return [];
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

//   // --- DONNÉES PATRIMOINE ---
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

//   // KPI calculations
//   const totalCashRequired = downPayment + welcomeTax + notaryFees + startupFees;
//   const monthlyCharges = (municipalTax + schoolTax + insurance + hydro + maintenance) / 12;
//   const paymentQurtuba = simulation.monthlyPaymentFixed + extraMonthly;
//   const totalMonthlyOutPocket = paymentQurtuba + monthlyCharges;
//   const qualifyingIncome = (totalMonthlyOutPocket * 12) / 0.32;

//   // Calcul Richesse
//   const statsWealth = (() => {
//       let targetMonth;
//       if (wealthHorizon === 'end') {
//           targetMonth = simulation.actualDurationMonths;
//       } else {
//           targetMonth = wealthHorizon * 12;
//       }
//       const monthlyAppreciationRate = appreciation / 100 / 12;
//       const futureHouseValue = price * Math.pow(1 + monthlyAppreciationRate, targetMonth);
      
//       let remainingDebt = 0;
//       if (targetMonth <= simulation.schedule.length && targetMonth > 0) {
//            const row = simulation.schedule[targetMonth - 1];
//            remainingDebt = row ? row.remainingBankBalance : 0;
//       }
//       return { value: futureHouseValue, equity: futureHouseValue - remainingDebt };
//   })();

//   const currency = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

//   return {
//     // Setters
//     setPrice, setDownPayment, setDurationYears, setExtraMonthly, setExtraAnnual,
//     setMunicipalTax, setSchoolTax, setInsurance, setHydro, setMaintenance, setChartView, setWealthHorizon,
//     setAppreciation, // <--- AJOUTÉ ICI (C'était l'erreur !)

//     // Values
//     price, downPayment, durationYears, extraMonthly, extraAnnual,
//     municipalTax, schoolTax, insurance, hydro, maintenance, chartView, wealthHorizon,
//     appreciation, // <--- AJOUTÉ ICI (C'était l'erreur !)

//     // Results
//     simulation, welcomeTax, notaryFees, startupFees, totalCashRequired,
//     monthlyCharges, paymentQurtuba, totalMonthlyOutPocket, qualifyingIncome,
//     chartData, enrichedSchedule, statsWealth,
//     isDark, currency
//   };
// }

"use client";

import { useState, useMemo, useEffect } from "react";
import { QurtubaSimulator } from "@/lib/qurtuba-logic";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/language-provider"; // <--- IMPORT

export function useQurtuba() {
  const { lang } = useLanguage(); // <--- RÉCUPÉRER LA LANGUE
  
  // ... (Garder tous les useState inchangés) ...
  const [price, setPrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(60000);
  const [durationYears, setDurationYears] = useState(25);
  const [extraMonthly, setExtraMonthly] = useState(0);
  const [extraAnnual, setExtraAnnual] = useState(0);
  const [municipalTax, setMunicipalTax] = useState(3000);
  const [schoolTax, setSchoolTax] = useState(350);
  const [insurance, setInsurance] = useState(1200);
  const [hydro, setHydro] = useState(1800);
  const [maintenance, setMaintenance] = useState(2400); 
  const [appreciation, setAppreciation] = useState(3);
  const [chartView, setChartView] = useState<'evolution' | 'distribution' | 'networth'>('evolution');
  const [wealthHorizon, setWealthHorizon] = useState<number | 'end'>(5);
  const rate = 5.5; 

  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);
  const isDark = isMounted && (theme === 'dark');

  const { simulation, welcomeTax, notaryFees, startupFees } = useMemo(() => {
    const sim = new QurtubaSimulator(price, downPayment, rate, durationYears, extraMonthly, extraAnnual);
    return {
        simulation: sim.generateSchedule(),
        welcomeTax: sim.calculateWelcomeTax(),
        notaryFees: sim.calculateNotaryFees(),
        startupFees: sim.calculateStartupFees()
    };
  }, [price, downPayment, durationYears, extraMonthly, extraAnnual]);

  const chartData = useMemo(() => {
      if (!simulation.schedule) return [];
      const maxLength = Math.max(simulation.schedule.length, simulation.standardSchedule?.length || 0);
      const data = [];
      for (let i = 0; i < maxLength; i++) {
          const rowAcc = simulation.schedule[i] || { remainingBankBalance: 0 };
          const rowStd = simulation.standardSchedule ? (simulation.standardSchedule[i] || { remainingBankBalance: 0 }) : rowAcc;
          data.push({
              month: i + 1,
              balanceAccelerated: rowAcc.remainingBankBalance,
              balanceStandard: rowStd.remainingBankBalance,
              interestPaid: rowAcc.rentPayment || 0,
              principalPaid: rowAcc.principalPayment || 0
          });
      }
      return data;
  }, [simulation]);

  const enrichedSchedule = useMemo(() => {
      if (!simulation.schedule) return [];
      let currentHouseValue = price;
      const monthlyAppreciationRate = appreciation / 100 / 12;
      return simulation.schedule.map(row => {
          currentHouseValue = currentHouseValue * (1 + monthlyAppreciationRate);
          return {
              ...row,
              houseValue: currentHouseValue,
              netEquity: currentHouseValue - row.remainingBankBalance
          };
      });
  }, [simulation.schedule, price, appreciation]);

  const totalCashRequired = downPayment + welcomeTax + notaryFees + startupFees;
  const monthlyCharges = (municipalTax + schoolTax + insurance + hydro + maintenance) / 12;
  const paymentQurtuba = simulation.monthlyPaymentFixed + extraMonthly;
  const totalMonthlyOutPocket = paymentQurtuba + monthlyCharges;
  const qualifyingIncome = (totalMonthlyOutPocket * 12) / 0.32;

  const statsWealth = (() => {
      let targetMonth;
      if (wealthHorizon === 'end') {
          targetMonth = simulation.actualDurationMonths;
      } else {
          targetMonth = wealthHorizon * 12;
      }
      const monthlyAppreciationRate = appreciation / 100 / 12;
      const futureHouseValue = price * Math.pow(1 + monthlyAppreciationRate, targetMonth);
      
      let remainingDebt = 0;
      if (targetMonth <= simulation.schedule.length && targetMonth > 0) {
           const row = simulation.schedule[targetMonth - 1];
           remainingDebt = row ? row.remainingBankBalance : 0;
      }
      return { value: futureHouseValue, equity: futureHouseValue - remainingDebt };
  })();

  // MODIFICATION ICI : Monnaie dynamique selon la langue
  const currency = new Intl.NumberFormat(lang === 'fr' ? 'fr-CA' : 'en-CA', { 
      style: 'currency', 
      currency: 'CAD', 
      maximumFractionDigits: 0 
  });

  return {
    setPrice, setDownPayment, setDurationYears, setExtraMonthly, setExtraAnnual,
    setMunicipalTax, setSchoolTax, setInsurance, setHydro, setMaintenance, setChartView, setWealthHorizon,
    setAppreciation,
    price, downPayment, durationYears, extraMonthly, extraAnnual,
    municipalTax, schoolTax, insurance, hydro, maintenance, chartView, wealthHorizon,
    appreciation,
    simulation, welcomeTax, notaryFees, startupFees, totalCashRequired,
    monthlyCharges, paymentQurtuba, totalMonthlyOutPocket, qualifyingIncome,
    chartData, enrichedSchedule, statsWealth,
    isDark, currency
  };
}