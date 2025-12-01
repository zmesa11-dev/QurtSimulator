// // // // // export interface ScheduleRow {
// // // // //   month: number;
// // // // //   rentPayment: number;
// // // // //   principalPayment: number;
// // // // //   totalPayment: number;
// // // // //   remainingBankBalance: number;
// // // // //   memberEquity: number;
// // // // // }

// // // // // export interface SimulationResult {
// // // // //   monthlyPaymentFixed: number;
// // // // //   totalInterestPaid: number;
// // // // //   actualDurationMonths: number; // Nouvelle info : Durée réelle
// // // // //   interestSaved: number;        // Nouvelle info : Économies
// // // // //   schedule: ScheduleRow[];
// // // // // }

// // // // // export class QurtubaSimulator {
// // // // //   private price: number;
// // // // //   private downPayment: number;
// // // // //   private bankContribution: number;
// // // // //   private annualRate: number;
// // // // //   private durationMonths: number;
// // // // //   private fixedMonthlyPayment: number;
  
// // // // //   // Nouveaux paramètres optionnels
// // // // //   private extraMonthly: number;
// // // // //   private extraAnnual: number;

// // // // //   constructor(
// // // // //     price: number, 
// // // // //     downPayment: number, 
// // // // //     annualRatePercent: number = 5.5, 
// // // // //     durationYears: number = 25,
// // // // //     extraMonthly: number = 0,
// // // // //     extraAnnual: number = 0
// // // // //   ) {
// // // // //     this.price = price;
// // // // //     this.downPayment = downPayment;
// // // // //     this.bankContribution = price - downPayment;
// // // // //     this.annualRate = annualRatePercent / 100.0;
// // // // //     this.durationMonths = durationYears * 12;
// // // // //     this.extraMonthly = extraMonthly;
// // // // //     this.extraAnnual = extraAnnual;
// // // // //     this.fixedMonthlyPayment = this.calculateFixedMonthlyPayment();
// // // // //   }

// // // // //   private calculateFixedMonthlyPayment(): number {
// // // // //     const r = this.annualRate / 12;
// // // // //     const n = this.durationMonths;
// // // // //     if (r === 0) return this.bankContribution / n;
// // // // //     return this.bankContribution * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
// // // // //   }

// // // // //   public calculateWelcomeTax(): number {
// // // // //     // Barèmes approximatifs Québec/Montréal
// // // // //     let tax = 0;
// // // // //     const price = this.price;
    
// // // // //     if (price > 53200) {
// // // // //         tax += Math.min(price, 266200) * 0.005; // 0.5% sur la tranche
// // // // //         if (price > 266200) {
// // // // //             tax += (Math.min(price, 532300) - 266200) * 0.010; // 1.0%
// // // // //             if (price > 532300) {
// // // // //                  tax += (price - 532300) * 0.015; // 1.5% (Note: Montréal monte à 2-3% au dessus de 500k, on garde 1.5% conservateur standard)
// // // // //             }
// // // // //         }
// // // // //     } else {
// // // // //         tax += price * 0.005;
// // // // //     }
// // // // //     return tax;
// // // // //   }

// // // // //   public generateSchedule(): SimulationResult {
// // // // //     const schedule: ScheduleRow[] = [];
// // // // //     let bankBalance = this.bankContribution;
// // // // //     let memberEquity = this.downPayment;
// // // // //     const monthlyRate = this.annualRate / 12;
// // // // //     let totalInterestPaid = 0;

// // // // //     let month = 1;
// // // // //     // On calcule ce qu'aurait coûté le prêt sans extras pour trouver l'économie
// // // // //     // (Approximation simple : Différence d'intérêts totale)
    
// // // // //     // Boucle de simulation
// // // // //     while (bankBalance > 0.01 && month <= this.durationMonths * 1.5) { // Sécurité
// // // // //       const rent = bankBalance * monthlyRate;
      
// // // // //       // Paiement de base + Extra Mensuel
// // // // //       let currentTotalPayment = this.fixedMonthlyPayment + this.extraMonthly;

// // // // //       // Extra Annuel (tous les 12 mois)
// // // // //       if (month % 12 === 0) {
// // // // //           currentTotalPayment += this.extraAnnual;
// // // // //       }

// // // // //       // Calcul du capital remboursé
// // // // //       let principal = currentTotalPayment - rent;

// // // // //       // Si le paiement dépasse le solde restant (fin du prêt)
// // // // //       if (principal > bankBalance) {
// // // // //           principal = bankBalance;
// // // // //           currentTotalPayment = rent + principal;
// // // // //       }
      
// // // // //       bankBalance -= principal;
// // // // //       memberEquity += principal;
// // // // //       totalInterestPaid += rent;

// // // // //       schedule.push({
// // // // //         month: month,
// // // // //         rentPayment: Number(rent.toFixed(2)),
// // // // //         principalPayment: Number(principal.toFixed(2)),
// // // // //         totalPayment: Number(currentTotalPayment.toFixed(2)),
// // // // //         remainingBankBalance: Number(bankBalance.toFixed(2)),
// // // // //         memberEquity: Number(memberEquity.toFixed(2)),
// // // // //       });

// // // // //       if (bankBalance <= 0.01) break;
// // // // //       month++;
// // // // //     }

// // // // //     // Calcul théorique des intérêts sans remboursement anticipé (pour comparaison)
// // // // //     // Formule simple : (Mensualité * Mois prévus) - Capital Initial
// // // // //     const totalCostWithoutExtra = (this.fixedMonthlyPayment * this.durationMonths) - this.bankContribution;
// // // // //     const savings = Math.max(0, totalCostWithoutExtra - totalInterestPaid);

// // // // //     return {
// // // // //       monthlyPaymentFixed: Number(this.fixedMonthlyPayment.toFixed(2)),
// // // // //       totalInterestPaid: Number(totalInterestPaid.toFixed(2)),
// // // // //       actualDurationMonths: month - 1,
// // // // //       interestSaved: Number(savings.toFixed(2)),
// // // // //       schedule: schedule,
// // // // //     };
// // // // //   }
// // // // // }

// // // // // Copiez tout ce contenu dans lib/qurtuba-logic.ts

// // // // export interface ScheduleRow {
// // // //   month: number;
// // // //   rentPayment: number;
// // // //   principalPayment: number;
// // // //   totalPayment: number;
// // // //   remainingBankBalance: number;
// // // //   memberEquity: number;
// // // // }

// // // // export interface SimulationResult {
// // // //   monthlyPaymentFixed: number;
// // // //   totalInterestPaid: number;
// // // //   actualDurationMonths: number;
// // // //   interestSaved: number;
// // // //   schedule: ScheduleRow[];
// // // // }

// // // // export class QurtubaSimulator {
// // // //   private price: number;
// // // //   private downPayment: number;
// // // //   private bankContribution: number;
// // // //   private annualRate: number;
// // // //   private durationMonths: number;
// // // //   private fixedMonthlyPayment: number;
// // // //   private extraMonthly: number;
// // // //   private extraAnnual: number;

// // // //   constructor(
// // // //     price: number, 
// // // //     downPayment: number, 
// // // //     annualRatePercent: number = 5.5, 
// // // //     durationYears: number = 25,
// // // //     extraMonthly: number = 0,
// // // //     extraAnnual: number = 0
// // // //   ) {
// // // //     this.price = price;
// // // //     this.downPayment = downPayment;
// // // //     this.bankContribution = price - downPayment;
// // // //     this.annualRate = annualRatePercent / 100.0;
// // // //     this.durationMonths = durationYears * 12;
// // // //     this.extraMonthly = extraMonthly;
// // // //     this.extraAnnual = extraAnnual;
// // // //     this.fixedMonthlyPayment = this.calculateFixedMonthlyPayment();
// // // //   }

// // // //   private calculateFixedMonthlyPayment(): number {
// // // //     const r = this.annualRate / 12;
// // // //     const n = this.durationMonths;
// // // //     if (r === 0) return this.bankContribution / n;
// // // //     return this.bankContribution * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
// // // //   }

// // // //   public calculateWelcomeTax(): number {
// // // //     // Barèmes Québec 2024/2025 (Approximation)
// // // //     let tax = 0;
// // // //     const price = this.price;
    
// // // //     // Tranches standards (peuvent varier selon municipalité ex: Montréal est plus cher)
// // // //     if (price > 53200) {
// // // //         tax += Math.min(price, 266200) * 0.005; 
// // // //         if (price > 266200) {
// // // //             tax += (Math.min(price, 532300) - 266200) * 0.010; 
// // // //             if (price > 532300) {
// // // //                  // Au dessus de 532k, on met 1.5% (Montréal monte à 2% ou 3%, on garde une moyenne)
// // // //                  tax += (price - 532300) * 0.015; 
// // // //             }
// // // //         }
// // // //     } else {
// // // //         tax += price * 0.005;
// // // //     }
// // // //     return tax;
// // // //   }

// // // //   public calculateNotaryFees(): number {
// // // //     // Base 1300 + frais variables. Moyenne réaliste ~1600-2200 total incluant taxes
// // // //     return 1300 + (this.price * 0.001); 
// // // //   }

// // // //   // NOUVEAU : Estimation des frais de démarrage divers (Inspection, Évaluation Qurtuba)
// // // //   public calculateStartupFees(): number {
// // // //       // Inspection (~800$) + Frais dossier Qurtuba/Eval (~500$)
// // // //       return 1300; 
// // // //   }

// // // //   public generateSchedule(): SimulationResult {
// // // //     const schedule: ScheduleRow[] = [];
// // // //     let bankBalance = this.bankContribution;
// // // //     let memberEquity = this.downPayment;
// // // //     const monthlyRate = this.annualRate / 12;
// // // //     let totalInterestPaid = 0;

// // // //     let month = 1;
    
// // // //     while (bankBalance > 0.01 && month <= this.durationMonths * 1.5) { 
// // // //       const rent = bankBalance * monthlyRate;
// // // //       let currentTotalPayment = this.fixedMonthlyPayment + this.extraMonthly;

// // // //       if (month % 12 === 0) {
// // // //           currentTotalPayment += this.extraAnnual;
// // // //       }

// // // //       let principal = currentTotalPayment - rent;

// // // //       if (principal > bankBalance) {
// // // //           principal = bankBalance;
// // // //           currentTotalPayment = rent + principal;
// // // //       }
      
// // // //       bankBalance -= principal;
// // // //       memberEquity += principal;
// // // //       totalInterestPaid += rent;

// // // //       schedule.push({
// // // //         month: month,
// // // //         rentPayment: Number(rent.toFixed(2)),
// // // //         principalPayment: Number(principal.toFixed(2)),
// // // //         totalPayment: Number(currentTotalPayment.toFixed(2)),
// // // //         remainingBankBalance: Number(bankBalance.toFixed(2)),
// // // //         memberEquity: Number(memberEquity.toFixed(2)),
// // // //       });

// // // //       if (bankBalance <= 0.01) break;
// // // //       month++;
// // // //     }

// // // //     const totalCostWithoutExtra = (this.fixedMonthlyPayment * this.durationMonths) - this.bankContribution;
// // // //     const savings = Math.max(0, totalCostWithoutExtra - totalInterestPaid);

// // // //     return {
// // // //       monthlyPaymentFixed: Number(this.fixedMonthlyPayment.toFixed(2)),
// // // //       totalInterestPaid: Number(totalInterestPaid.toFixed(2)),
// // // //       actualDurationMonths: month - 1,
// // // //       interestSaved: Number(savings.toFixed(2)),
// // // //       schedule: schedule,
// // // //     };
// // // //   }
// // // // }

// // // // Copiez tout ce contenu dans lib/qurtuba-logic.ts

// // // export interface ScheduleRow {
// // //   month: number;
// // //   rentPayment: number;
// // //   principalPayment: number;
// // //   totalPayment: number;
// // //   remainingBankBalance: number;
// // //   memberEquity: number;
// // // }

// // // export interface SimulationResult {
// // //   monthlyPaymentFixed: number;
// // //   totalInterestPaid: number;
// // //   actualDurationMonths: number;
// // //   interestSaved: number;
// // //   schedule: ScheduleRow[];
// // //   // NOUVEAU : Infos de conformité
// // //   isCompliant: boolean;
// // //   minDownPaymentRequired: number;
// // //   maxBankFinancing: number;
// // //   complianceError?: string;
// // // }

// // // export class QurtubaSimulator {
// // //   private price: number;
// // //   private downPayment: number;
// // //   private bankContribution: number;
// // //   private annualRate: number;
// // //   private durationMonths: number;
// // //   private fixedMonthlyPayment: number;
// // //   private extraMonthly: number;
// // //   private extraAnnual: number;

// // //   constructor(
// // //     price: number, 
// // //     downPayment: number, 
// // //     annualRatePercent: number = 5.5, 
// // //     durationYears: number = 25,
// // //     extraMonthly: number = 0,
// // //     extraAnnual: number = 0
// // //   ) {
// // //     this.price = price;
// // //     this.downPayment = downPayment;
// // //     this.bankContribution = price - downPayment;
// // //     this.annualRate = annualRatePercent / 100.0;
// // //     this.durationMonths = durationYears * 12;
// // //     this.extraMonthly = extraMonthly;
// // //     this.extraAnnual = extraAnnual;
// // //     this.fixedMonthlyPayment = this.calculateFixedMonthlyPayment();
// // //   }

// // //   private calculateFixedMonthlyPayment(): number {
// // //     const r = this.annualRate / 12;
// // //     const n = this.durationMonths;
// // //     if (r === 0) return this.bankContribution / n;
// // //     return this.bankContribution * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
// // //   }

// // //   public calculateWelcomeTax(): number {
// // //     let tax = 0;
// // //     const price = this.price;
// // //     if (price > 53200) {
// // //         tax += Math.min(price, 266200) * 0.005; 
// // //         if (price > 266200) {
// // //             tax += (Math.min(price, 532300) - 266200) * 0.010; 
// // //             if (price > 532300) {
// // //                  tax += (price - 532300) * 0.015; 
// // //             }
// // //         }
// // //     } else {
// // //         tax += price * 0.005;
// // //     }
// // //     return tax;
// // //   }

// // //   public calculateNotaryFees(): number {
// // //     return 1300 + (this.price * 0.001); 
// // //   }

// // //   public calculateStartupFees(): number {
// // //       // Inspection obligatoire selon le document + Frais dossier
// // //       return 1300; 
// // //   }

// // //   // NOUVEAU : Vérification des règles strictes du document PDF
// // //   public checkCompliance(): { isCompliant: boolean; minDownPayment: number; maxBank: number; error?: string } {
// // //       const maxBankByRatio = this.price * 0.80;
// // //       const maxBankCap = 400000;
      
// // //       const effectiveMaxBank = Math.min(maxBankByRatio, maxBankCap);
// // //       const minDownPayment = this.price - effectiveMaxBank;

// // //       // CORRECTION ICI : On ajoute une tolérance de 1$ pour éviter les bugs d'arrondi
// // //       // Si l'utilisateur met 100 000$ et qu'il faut 100 000$, ça passera.
// // //       if (this.downPayment < (minDownPayment - 1)) {
// // //           return {
// // //               isCompliant: false,
// // //               minDownPayment: minDownPayment,
// // //               maxBank: effectiveMaxBank,
// // //               error: `Apport insuffisant. Pour une maison de ${this.price}$, Qurtuba finance max ${effectiveMaxBank}$. Vous devez mettre au moins ${minDownPayment}$.`
// // //           };
// // //       }

// // //       return { isCompliant: true, minDownPayment: minDownPayment, maxBank: effectiveMaxBank };
// // //   }

// // //   public generateSchedule(): SimulationResult {
// // //     const compliance = this.checkCompliance();

// // //     // Si non conforme, on renvoie des résultats vides ou d'erreur
// // //     if (!compliance.isCompliant) {
// // //         return {
// // //             monthlyPaymentFixed: 0,
// // //             totalInterestPaid: 0,
// // //             actualDurationMonths: 0,
// // //             interestSaved: 0,
// // //             schedule: [],
// // //             isCompliant: false,
// // //             minDownPaymentRequired: compliance.minDownPayment,
// // //             maxBankFinancing: compliance.maxBank,
// // //             complianceError: compliance.error
// // //         };
// // //     }

// // //     const schedule: ScheduleRow[] = [];
// // //     let bankBalance = this.bankContribution;
// // //     let memberEquity = this.downPayment;
// // //     const monthlyRate = this.annualRate / 12;
// // //     let totalInterestPaid = 0;
// // //     let month = 1;
    
// // //     while (bankBalance > 0.01 && month <= this.durationMonths * 1.5) { 
// // //       const rent = bankBalance * monthlyRate;
// // //       let currentTotalPayment = this.fixedMonthlyPayment + this.extraMonthly;
// // //       if (month % 12 === 0) currentTotalPayment += this.extraAnnual;
// // //       let principal = currentTotalPayment - rent;
// // //       if (principal > bankBalance) {
// // //           principal = bankBalance;
// // //           currentTotalPayment = rent + principal;
// // //       }
// // //       bankBalance -= principal;
// // //       memberEquity += principal;
// // //       totalInterestPaid += rent;

// // //       schedule.push({
// // //         month: month,
// // //         rentPayment: Number(rent.toFixed(2)),
// // //         principalPayment: Number(principal.toFixed(2)),
// // //         totalPayment: Number(currentTotalPayment.toFixed(2)),
// // //         remainingBankBalance: Number(bankBalance.toFixed(2)),
// // //         memberEquity: Number(memberEquity.toFixed(2)),
// // //       });
// // //       if (bankBalance <= 0.01) break;
// // //       month++;
// // //     }

// // //     const totalCostWithoutExtra = (this.fixedMonthlyPayment * this.durationMonths) - this.bankContribution;
// // //     const savings = Math.max(0, totalCostWithoutExtra - totalInterestPaid);

// // //     return {
// // //       monthlyPaymentFixed: Number(this.fixedMonthlyPayment.toFixed(2)),
// // //       totalInterestPaid: Number(totalInterestPaid.toFixed(2)),
// // //       actualDurationMonths: month - 1,
// // //       interestSaved: Number(savings.toFixed(2)),
// // //       schedule: schedule,
// // //       isCompliant: true,
// // //       minDownPaymentRequired: compliance.minDownPayment,
// // //       maxBankFinancing: compliance.maxBank
// // //     };
// // //   }
// // // }

// // export interface ScheduleRow {
// //   month: number;
// //   rentPayment: number;
// //   principalPayment: number;
// //   totalPayment: number;
// //   remainingBankBalance: number;
// //   memberEquity: number;
// // }

// // export interface SimulationResult {
// //   monthlyPaymentFixed: number;
// //   totalInterestPaid: number;
// //   actualDurationMonths: number;
// //   interestSaved: number;
// //   schedule: ScheduleRow[];
// //   isCompliant: boolean;
// //   minDownPaymentRequired: number;
// //   maxBankFinancing: number;
// //   complianceError?: string;
// // }

// // export class QurtubaSimulator {
// //   private price: number;
// //   private downPayment: number;
// //   private bankContribution: number;
// //   private annualRate: number;
// //   private durationMonths: number;
// //   private fixedMonthlyPayment: number;
// //   private extraMonthly: number;
// //   private extraAnnual: number;

// //   constructor(
// //     price: number, 
// //     downPayment: number, 
// //     annualRatePercent: number = 5.5, 
// //     durationYears: number = 25,
// //     extraMonthly: number = 0,
// //     extraAnnual: number = 0
// //   ) {
// //     this.price = Number(price);
// //     this.downPayment = Number(downPayment);
// //     this.bankContribution = this.price - this.downPayment;
// //     this.annualRate = Number(annualRatePercent) / 100.0;
// //     this.durationMonths = Number(durationYears) * 12;
// //     this.extraMonthly = Number(extraMonthly);
// //     this.extraAnnual = Number(extraAnnual);
// //     this.fixedMonthlyPayment = this.calculateFixedMonthlyPayment();
// //   }

// //   private calculateFixedMonthlyPayment(): number {
// //     const r = this.annualRate / 12;
// //     const n = this.durationMonths;
// //     if (r === 0) return this.bankContribution / n;
// //     return this.bankContribution * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
// //   }

// //   public calculateWelcomeTax(): number {
// //     let tax = 0;
// //     const price = this.price;
// //     if (price > 53200) {
// //         tax += Math.min(price, 266200) * 0.005; 
// //         if (price > 266200) {
// //             tax += (Math.min(price, 532300) - 266200) * 0.010; 
// //             if (price > 532300) {
// //                  tax += (price - 532300) * 0.015; 
// //             }
// //         }
// //     } else {
// //         tax += price * 0.005;
// //     }
// //     return tax;
// //   }

// //   public calculateNotaryFees(): number {
// //     return 1300 + (this.price * 0.001); 
// //   }

// //   public calculateStartupFees(): number {
// //       return 1300; 
// //   }

// //   public checkCompliance(): { isCompliant: boolean; minDownPayment: number; maxBank: number; error?: string } {
// //       const maxBankByRatio = this.price * 0.80;
// //       const maxBankCap = 400000;
      
// //       const effectiveMaxBank = Math.min(maxBankByRatio, maxBankCap);
// //       const minDownPayment = this.price - effectiveMaxBank;

// //       // Tolérance de 1$ pour éviter les bugs d'arrondi
// //       if (this.downPayment < (minDownPayment - 1)) {
// //           return {
// //               isCompliant: false,
// //               minDownPayment: minDownPayment,
// //               maxBank: effectiveMaxBank,
// //               error: `Apport insuffisant. Pour une maison de ${this.price}$, Qurtuba finance max ${effectiveMaxBank}$. Vous devez mettre au moins ${minDownPayment}$.`
// //           };
// //       }

// //       return { isCompliant: true, minDownPayment: minDownPayment, maxBank: effectiveMaxBank };
// //   }

// //   // Méthode interne pour faire tourner une simulation
// //   private runSimulationLoop(useExtras: boolean): { totalInterest: number, duration: number, schedule: ScheduleRow[] } {
// //       const schedule: ScheduleRow[] = [];
// //       let bankBalance = this.bankContribution;
// //       let memberEquity = this.downPayment;
// //       const monthlyRate = this.annualRate / 12;
// //       let totalInterest = 0;
// //       let month = 1;

// //       // On simule jusqu'à ce que ce soit payé
// //       while (bankBalance > 0.05 && month <= this.durationMonths * 2) { 
// //           const rent = bankBalance * monthlyRate;
          
// //           let currentTotalPayment = this.fixedMonthlyPayment;
          
// //           // On ajoute les extras seulement si demandé
// //           if (useExtras) {
// //               currentTotalPayment += this.extraMonthly;
// //               if (month % 12 === 0) currentTotalPayment += this.extraAnnual;
// //           }

// //           let principal = currentTotalPayment - rent;

// //           // Cap : on ne paie pas plus que ce qu'il reste
// //           if (principal > bankBalance) {
// //               principal = bankBalance;
// //               currentTotalPayment = rent + principal;
// //           }
          
// //           bankBalance -= principal;
// //           memberEquity += principal;
// //           totalInterest += rent;

// //           if (useExtras) { // On garde le schedule seulement pour la vraie simulation
// //             schedule.push({
// //                 month: month,
// //                 rentPayment: Number(rent.toFixed(2)),
// //                 principalPayment: Number(principal.toFixed(2)),
// //                 totalPayment: Number(currentTotalPayment.toFixed(2)),
// //                 remainingBankBalance: Number(bankBalance.toFixed(2)),
// //                 memberEquity: Number(memberEquity.toFixed(2)),
// //             });
// //           }

// //           if (bankBalance <= 0.05) break;
// //           month++;
// //       }

// //       return { totalInterest, duration: month - 1, schedule };
// //   }

// //   public generateSchedule(): SimulationResult {
// //     const compliance = this.checkCompliance();

// //     if (!compliance.isCompliant) {
// //         return {
// //             monthlyPaymentFixed: 0,
// //             totalInterestPaid: 0,
// //             actualDurationMonths: 0,
// //             interestSaved: 0,
// //             schedule: [],
// //             isCompliant: false,
// //             minDownPaymentRequired: compliance.minDownPayment,
// //             maxBankFinancing: compliance.maxBank,
// //             complianceError: compliance.error
// //         };
// //     }

// //     // 1. Simulation de BASE (Sans aucun extra) pour savoir combien ça coûterait normalement
// //     const baselineSim = this.runSimulationLoop(false);

// //     // 2. Simulation RÉELLE (Avec vos extras)
// //     const actualSim = this.runSimulationLoop(true);

// //     // 3. La différence exacte est l'économie
// //     const savings = Math.max(0, baselineSim.totalInterest - actualSim.totalInterest);

// //     return {
// //       monthlyPaymentFixed: Number(this.fixedMonthlyPayment.toFixed(2)),
// //       totalInterestPaid: Number(actualSim.totalInterest.toFixed(2)),
// //       actualDurationMonths: actualSim.duration,
// //       interestSaved: Number(savings.toFixed(2)),
// //       schedule: actualSim.schedule,
// //       isCompliant: true,
// //       minDownPaymentRequired: compliance.minDownPayment,
// //       maxBankFinancing: compliance.maxBank
// //     };
// //   }
// // }

// export interface ScheduleRow {
//   month: number;
//   rentPayment: number;
//   principalPayment: number;
//   totalPayment: number;
//   remainingBankBalance: number;
//   memberEquity: number;
// }

// export interface SimulationResult {
//   monthlyPaymentFixed: number;
//   totalInterestPaid: number;
//   actualDurationMonths: number;
//   interestSaved: number;
//   schedule: ScheduleRow[];
//   isCompliant: boolean;
//   minDownPaymentRequired: number;
//   maxBankFinancing: number;
//   complianceError?: string;
// }

// export class QurtubaSimulator {
//   private price: number;
//   private downPayment: number;
//   private bankContribution: number;
//   private annualRate: number;
//   private durationMonths: number;
//   private fixedMonthlyPayment: number;
//   private extraMonthly: number;
//   private extraAnnual: number;

//   constructor(
//     price: number, 
//     downPayment: number, 
//     annualRatePercent: number = 5.5, 
//     durationYears: number = 25,
//     extraMonthly: number = 0,
//     extraAnnual: number = 0
//   ) {
//     this.price = Number(price);
//     this.downPayment = Number(downPayment);
//     this.bankContribution = this.price - this.downPayment;
//     this.annualRate = Number(annualRatePercent) / 100.0;
//     this.durationMonths = Number(durationYears) * 12;
//     this.extraMonthly = Number(extraMonthly);
//     this.extraAnnual = Number(extraAnnual);
//     this.fixedMonthlyPayment = this.calculateFixedMonthlyPayment();
//   }

//   private calculateFixedMonthlyPayment(): number {
//     const r = this.annualRate / 12;
//     const n = this.durationMonths;
//     if (r === 0) return this.bankContribution / n;
//     return this.bankContribution * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
//   }

//   public calculateWelcomeTax(): number {
//     let tax = 0;
//     const price = this.price;
//     if (price > 53200) {
//         tax += Math.min(price, 266200) * 0.005; 
//         if (price > 266200) {
//             tax += (Math.min(price, 532300) - 266200) * 0.010; 
//             if (price > 532300) {
//                  tax += (price - 532300) * 0.015; 
//             }
//         }
//     } else {
//         tax += price * 0.005;
//     }
//     return tax;
//   }

//   public calculateNotaryFees(): number {
//     return 1300 + (this.price * 0.001); 
//   }

//   public calculateStartupFees(): number {
//       return 1300; 
//   }

//   // Check de conformité avec tolérance de 1$
//   public checkCompliance(): { isCompliant: boolean; minDownPayment: number; maxBank: number; error?: string } {
//       const maxBankByRatio = this.price * 0.80;
//       const maxBankCap = 400000;

//       const effectiveMaxBank = Math.min(maxBankByRatio, maxBankCap);
//       const minDownPayment = this.price - effectiveMaxBank;

//       // CORRECTION : Tolérance de 1$ pour éviter le bug "100 000 < 100 000"
//       if (this.downPayment < (minDownPayment - 1)) {
//           return {
//               isCompliant: false,
//               minDownPayment: minDownPayment,
//               maxBank: effectiveMaxBank,
//               error: `Apport insuffisant. Pour une maison de ${this.price}$, Qurtuba finance max ${effectiveMaxBank}$. Vous devez mettre au moins ${minDownPayment}$.`
//           };
//       }

//       return { isCompliant: true, minDownPayment: minDownPayment, maxBank: effectiveMaxBank };
//   }

//   // Moteur de simulation interne
//   private runSimulationLoop(useExtras: boolean): { totalInterest: number, duration: number, schedule: ScheduleRow[] } {
//       const schedule: ScheduleRow[] = [];
//       let bankBalance = this.bankContribution;
//       let memberEquity = this.downPayment;
//       const monthlyRate = this.annualRate / 12;
//       let totalInterest = 0;
//       let month = 1;

//       while (bankBalance > 0.05 && month <= this.durationMonths * 2) { 
//           const rent = bankBalance * monthlyRate;

//           let currentTotalPayment = this.fixedMonthlyPayment;

//           if (useExtras) {
//               currentTotalPayment += this.extraMonthly;
//               if (month % 12 === 0) currentTotalPayment += this.extraAnnual;
//           }

//           let principal = currentTotalPayment - rent;

//           if (principal > bankBalance) {
//               principal = bankBalance;
//               currentTotalPayment = rent + principal;
//           }

//           bankBalance -= principal;
//           memberEquity += principal;
//           totalInterest += rent;

//           if (useExtras) { // On ne garde le tableau que pour la vraie simulation
//             schedule.push({
//                 month: month,
//                 rentPayment: Number(rent.toFixed(2)),
//                 principalPayment: Number(principal.toFixed(2)),
//                 totalPayment: Number(currentTotalPayment.toFixed(2)),
//                 remainingBankBalance: Number(bankBalance.toFixed(2)),
//                 memberEquity: Number(memberEquity.toFixed(2)),
//             });
//           }

//           if (bankBalance <= 0.05) break;
//           month++;
//       }

//       return { totalInterest, duration: month - 1, schedule };
//   }

//   public generateSchedule(): SimulationResult {
//     const compliance = this.checkCompliance();

//     if (!compliance.isCompliant) {
//         return {
//             monthlyPaymentFixed: 0,
//             totalInterestPaid: 0,
//             actualDurationMonths: 0,
//             interestSaved: 0,
//             schedule: [],
//             isCompliant: false,
//             minDownPaymentRequired: compliance.minDownPayment,
//             maxBankFinancing: compliance.maxBank,
//             complianceError: compliance.error
//         };
//     }

//     // 1. Simulation de BASE (Ce qui se passe sans extra)
//     const baselineSim = this.runSimulationLoop(false);

//     // 2. Simulation RÉELLE (Ce qui se passe avec vos extras)
//     const actualSim = this.runSimulationLoop(true);

//     // 3. La différence exacte est l'économie réelle
//     const savings = Math.max(0, baselineSim.totalInterest - actualSim.totalInterest);

//     return {
//       monthlyPaymentFixed: Number(this.fixedMonthlyPayment.toFixed(2)),
//       totalInterestPaid: Number(actualSim.totalInterest.toFixed(2)),
//       actualDurationMonths: actualSim.duration,
//       interestSaved: Number(savings.toFixed(2)),
//       schedule: actualSim.schedule,
//       isCompliant: true,
//       minDownPaymentRequired: compliance.minDownPayment,
//       maxBankFinancing: compliance.maxBank
//     };
//   }
// }


export interface ScheduleRow {
  month: number;
  rentPayment: number;
  principalPayment: number;
  totalPayment: number;
  remainingBankBalance: number;
  memberEquity: number;
}

export interface SimulationResult {
  monthlyPaymentFixed: number;
  totalInterestPaid: number;
  actualDurationMonths: number;
  interestSaved: number;
  schedule: ScheduleRow[];
  isCompliant: boolean;
  minDownPaymentRequired: number;
  maxBankFinancing: number;
  complianceError?: string;
}

export class QurtubaSimulator {
  private price: number;
  private downPayment: number;
  private bankContribution: number;
  private annualRate: number;
  private durationMonths: number;
  private fixedMonthlyPayment: number;
  private extraMonthly: number;
  private extraAnnual: number;

  constructor(
    price: number, 
    downPayment: number, 
    annualRatePercent: number = 5.5, 
    durationYears: number = 25,
    extraMonthly: number = 0,
    extraAnnual: number = 0
  ) {
    this.price = Number(price);
    this.downPayment = Number(downPayment);
    this.bankContribution = this.price - this.downPayment;
    this.annualRate = Number(annualRatePercent) / 100.0;
    this.durationMonths = Number(durationYears) * 12;
    this.extraMonthly = Number(extraMonthly);
    this.extraAnnual = Number(extraAnnual);
    this.fixedMonthlyPayment = this.calculateFixedMonthlyPayment();
  }

  private calculateFixedMonthlyPayment(): number {
    const r = this.annualRate / 12;
    const n = this.durationMonths;
    if (r === 0) return this.bankContribution / n;
    return this.bankContribution * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  public calculateWelcomeTax(): number {
    let tax = 0;
    const price = this.price;
    if (price > 53200) {
        tax += Math.min(price, 266200) * 0.005; 
        if (price > 266200) {
            tax += (Math.min(price, 532300) - 266200) * 0.010; 
            if (price > 532300) {
                 tax += (price - 532300) * 0.015; 
            }
        }
    } else {
        tax += price * 0.005;
    }
    return tax;
  }

  public calculateNotaryFees(): number {
    return 1300 + (this.price * 0.001); 
  }

  public calculateStartupFees(): number {
      return 1300; 
  }

  public checkCompliance(): { isCompliant: boolean; minDownPayment: number; maxBank: number; error?: string } {
      const maxBankByRatio = this.price * 0.80;
      const maxBankCap = 400000;
      
      const effectiveMaxBank = Math.min(maxBankByRatio, maxBankCap);
      const minDownPayment = this.price - effectiveMaxBank;

      if (this.downPayment < (minDownPayment - 1)) {
          return {
              isCompliant: false,
              minDownPayment: minDownPayment,
              maxBank: effectiveMaxBank,
              error: `Apport insuffisant. Pour une maison de ${this.price}$, Qurtuba finance max ${effectiveMaxBank}$. Vous devez mettre au moins ${minDownPayment}$.`
          };
      }

      return { isCompliant: true, minDownPayment: minDownPayment, maxBank: effectiveMaxBank };
  }

  private runSimulationLoop(useExtras: boolean): { totalInterest: number, duration: number, schedule: ScheduleRow[] } {
      const schedule: ScheduleRow[] = [];
      let bankBalance = this.bankContribution;
      let memberEquity = this.downPayment;
      const monthlyRate = this.annualRate / 12;
      let totalInterest = 0;
      let month = 1;

      while (bankBalance > 0.05 && month <= this.durationMonths * 2) { 
          const rent = bankBalance * monthlyRate;
          
          let currentTotalPayment = this.fixedMonthlyPayment;
          
          if (useExtras) {
              currentTotalPayment += this.extraMonthly;
              if (month % 12 === 0) currentTotalPayment += this.extraAnnual;
          }

          let principal = currentTotalPayment - rent;

          if (principal > bankBalance) {
              principal = bankBalance;
              currentTotalPayment = rent + principal;
          }
          
          bankBalance -= principal;
          memberEquity += principal;
          totalInterest += rent;

          // On enregistre la ligne
          if (useExtras) {
            schedule.push({
                month: month,
                rentPayment: Number(rent.toFixed(2)),
                principalPayment: Number(principal.toFixed(2)),
                totalPayment: Number(currentTotalPayment.toFixed(2)),
                remainingBankBalance: Number(bankBalance.toFixed(2)),
                memberEquity: Number(memberEquity.toFixed(2)),
            });
          }

          if (bankBalance <= 0.05) break;
          month++;
      }

      // CORRECTION DU BUG "0 ans 10 mois"
      // La durée réelle est simplement le nombre de lignes dans le tableau (si useExtras=true)
      // Ou le compteur 'month' ajusté si on est en simulation 'false'
      let finalDuration = useExtras ? schedule.length : (month - 1);
      
      // Sécurité : si on a payé dès le premier mois (month=1 et break), finalDuration doit être 1
      if (useExtras && schedule.length === 0 && this.bankContribution <= 0.05) finalDuration = 0;

      return { totalInterest, duration: finalDuration, schedule };
  }

  public generateSchedule(): SimulationResult {
    const compliance = this.checkCompliance();

    if (!compliance.isCompliant) {
        return {
            monthlyPaymentFixed: 0,
            totalInterestPaid: 0,
            actualDurationMonths: 0,
            interestSaved: 0,
            schedule: [],
            isCompliant: false,
            minDownPaymentRequired: compliance.minDownPayment,
            maxBankFinancing: compliance.maxBank,
            complianceError: compliance.error
        };
    }

    // 1. Simulation Standard
    const baselineSim = this.runSimulationLoop(false);

    // 2. Simulation Réelle (Accélérée)
    const actualSim = this.runSimulationLoop(true);

    // 3. Calcul de l'économie
    const savings = Math.max(0, baselineSim.totalInterest - actualSim.totalInterest);

    return {
      monthlyPaymentFixed: Number(this.fixedMonthlyPayment.toFixed(2)),
      totalInterestPaid: Number(actualSim.totalInterest.toFixed(2)),
      actualDurationMonths: actualSim.duration,
      interestSaved: Number(savings.toFixed(2)),
      schedule: actualSim.schedule,
      isCompliant: true,
      minDownPaymentRequired: compliance.minDownPayment,
      maxBankFinancing: compliance.maxBank
    };
  }
}