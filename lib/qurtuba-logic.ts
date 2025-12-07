export interface ScheduleRow {
  month: number;
  rentPayment: number;
  principalPayment: number;
  totalPayment: number;
  remainingBankBalance: number;
  memberEquity: number;
  houseValue?: number; // Pour les calculs de richesse
  netEquity?: number;
}

export interface SimulationResult {
  monthlyPaymentFixed: number;
  totalInterestPaid: number;
  actualDurationMonths: number;
  standardDurationMonths: number; // Durée sans accélération
  interestSaved: number;
  timeSavedMonths: number; // Temps gagné
  schedule: ScheduleRow[];
  standardSchedule: ScheduleRow[]; // Le scénario "fantôme" pour comparer
  isCompliant: boolean;
  minDownPaymentRequired: number;
  maxBankFinancing: number;
  complianceError?: string;
  shortfall?: number; // Combien il manque
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
    extraAnnual: number = 0,
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

  // Paliers approximatifs 2024/2025
  public calculateWelcomeTax(): number {
    const p = this.price;
    let tax = 0;

    // Palier 1 : 0.5% sur les premiers 53 200 $
    if (p > 0) tax += Math.min(p, 53200) * 0.005;

    // Palier 2 : 1.0% de 53 200 $ à 266 200 $
    if (p > 53200) tax += (Math.min(p, 266200) - 53200) * 0.010;

    // Palier 3 : 1.5% sur tout ce qui dépasse 266 200 $
    if (p > 266200) tax += (p - 266200) * 0.015;

    return Math.max(0, tax);
  }

  public calculateNotaryFees(): number {
    return 1400 + (this.price * 0.0015); // Légère augmentation réaliste
  }

  public calculateStartupFees(): number {
      return 1300;
  }

public checkCompliance() {
      const maxBankByRatio = this.price * 0.80;
      const maxBankCap = 400000;
      
      const effectiveMaxBank = Math.min(maxBankByRatio, maxBankCap);
      const minDownPayment = this.price - effectiveMaxBank;

      if (this.downPayment < (minDownPayment - 1)) {
          return {
              isCompliant: false,
              minDownPayment: minDownPayment,
              maxBank: effectiveMaxBank,
              shortfall: minDownPayment - this.downPayment,
              // MODIFICATION ICI : On renvoie un CODE au lieu du texte
              error: "MAX_LIMIT" 
          };
      }

      return { isCompliant: true, minDownPayment: minDownPayment, maxBank: effectiveMaxBank, shortfall: 0 };
  }

  private runSimulationLoop(useExtras: boolean): { totalInterest: number, duration: number, schedule: ScheduleRow[] } {
      const schedule: ScheduleRow[] = [];
      let bankBalance = this.bankContribution;
      let memberEquity = this.downPayment;
      const monthlyRate = this.annualRate / 12;
      let totalInterest = 0;
      let month = 1;
      // Sécurité max loop
      const maxMonths = this.durationMonths + 120; 

      while (bankBalance > 0.1 && month <= maxMonths) { 
          const rent = bankBalance * monthlyRate;
          let currentTotalPayment = this.fixedMonthlyPayment;
          
          if (useExtras) {
              currentTotalPayment += this.extraMonthly;
              if (month % 12 === 0) currentTotalPayment += this.extraAnnual;
          }

          // Ajustement dernier paiement
          let principal = currentTotalPayment - rent;
          if (principal > bankBalance) {
              principal = bankBalance;
              currentTotalPayment = rent + principal;
          }
          
          bankBalance -= principal;
          memberEquity += principal;
          totalInterest += rent;

          schedule.push({
              month: month,
              rentPayment: Number(rent.toFixed(2)),
              principalPayment: Number(principal.toFixed(2)),
              totalPayment: Number(currentTotalPayment.toFixed(2)),
              remainingBankBalance: Number(Math.max(0, bankBalance).toFixed(2)),
              memberEquity: Number(memberEquity.toFixed(2)),
          });

          if (bankBalance <= 0.01) break;
          month++;
      }

      return { totalInterest, duration: schedule.length, schedule };
  }

  public generateSchedule(): SimulationResult {
    const compliance = this.checkCompliance();

    if (!compliance.isCompliant) {
        // Retour vide sécurisé
        return {
            monthlyPaymentFixed: 0,
            totalInterestPaid: 0,
            actualDurationMonths: 0,
            standardDurationMonths: 0,
            interestSaved: 0,
            timeSavedMonths: 0,
            schedule: [],
            standardSchedule: [],
            isCompliant: false,
            minDownPaymentRequired: compliance.minDownPayment,
            maxBankFinancing: compliance.maxBank,
            complianceError: compliance.error,
            shortfall: compliance.shortfall
        };
    }

    // 1. Simulation Standard (SANS extras)
    const baselineSim = this.runSimulationLoop(false);

    // 2. Simulation Optimisée (AVEC extras)
    // Si pas d'extras, c'est identique à baseline
    const hasExtras = this.extraMonthly > 0 || this.extraAnnual > 0;
    const actualSim = hasExtras ? this.runSimulationLoop(true) : baselineSim;

    const savings = Math.max(0, baselineSim.totalInterest - actualSim.totalInterest);
    const timeSaved = Math.max(0, baselineSim.duration - actualSim.duration);

    return {
      monthlyPaymentFixed: Number(this.fixedMonthlyPayment.toFixed(2)),
      totalInterestPaid: Number(actualSim.totalInterest.toFixed(2)),
      actualDurationMonths: actualSim.duration,
      standardDurationMonths: baselineSim.duration,
      interestSaved: Number(savings.toFixed(2)),
      timeSavedMonths: timeSaved,
      schedule: actualSim.schedule,
      standardSchedule: baselineSim.schedule, // On garde le "Standard" pour le graphique
      isCompliant: true,
      minDownPaymentRequired: compliance.minDownPayment,
      maxBankFinancing: compliance.maxBank
    };
  }
}