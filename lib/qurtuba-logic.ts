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