/** Shared finance math for the money calculators. */

/**
 * Monthly payment for a fully-amortizing fixed-rate loan.
 * @param principal loan amount
 * @param annualRatePct annual interest rate as a percentage (e.g. 6.5)
 * @param months total number of monthly payments
 */
export function monthlyPayment(
  principal: number,
  annualRatePct: number,
  months: number,
): number {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / months;
  const factor = Math.pow(1 + r, months);
  return (principal * r * factor) / (factor - 1);
}

export interface LoanResult {
  payment: number;
  totalPaid: number;
  totalInterest: number;
}

export function amortize(
  principal: number,
  annualRatePct: number,
  months: number,
): LoanResult {
  const payment = monthlyPayment(principal, annualRatePct, months);
  const totalPaid = payment * months;
  return {
    payment,
    totalPaid,
    totalInterest: Math.max(0, totalPaid - principal),
  };
}

export interface CompoundResult {
  futureValue: number;
  totalContributions: number;
  totalInterest: number;
}

/**
 * Future value with periodic compounding and optional recurring monthly
 * contributions (contributions added at the end of each month).
 */
export function compoundGrowth(
  principal: number,
  annualRatePct: number,
  years: number,
  compoundsPerYear: number,
  monthlyContribution = 0,
): CompoundResult {
  const r = annualRatePct / 100;
  const n = Math.max(1, compoundsPerYear);
  const t = years;

  // Lump sum grows by periodic compounding.
  const lump = principal * Math.pow(1 + r / n, n * t);

  // Contributions are monthly; grow each as a future-value annuity using the
  // effective monthly rate derived from the compounding frequency.
  const monthlyRate = Math.pow(1 + r / n, n / 12) - 1;
  const totalMonths = Math.round(t * 12);
  let contribFV = 0;
  if (monthlyContribution > 0) {
    contribFV =
      monthlyRate === 0
        ? monthlyContribution * totalMonths
        : monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
  }

  const futureValue = lump + contribFV;
  const totalContributions = principal + monthlyContribution * totalMonths;
  return {
    futureValue,
    totalContributions,
    totalInterest: Math.max(0, futureValue - totalContributions),
  };
}

/** Format a number as USD currency. */
export function money(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
