/**
 * Pure Accounting & Financial Mathematical Calculations Domain Module
 */

/**
 * Calculate VAT (Value Added Tax)
 * @param {number|string} amount 
 * @param {number|string} rate - Percentage rate (default: 15)
 * @param {boolean} isInclusive - Whether amount includes tax
 */
export function calculateVAT(amount, rate = 15, isInclusive = false) {
  const parsedAmount = parseFloat(amount) || 0;
  const parsedRate = parseFloat(rate) || 0;

  if (parsedAmount <= 0) {
    return { baseAmount: 0, vatAmount: 0, totalAmount: 0 };
  }

  if (isInclusive) {
    // Amount includes VAT: Base = Amount / (1 + Rate/100)
    const baseAmount = parsedAmount / (1 + parsedRate / 100);
    const vatAmount = parsedAmount - baseAmount;
    return {
      baseAmount: parseFloat(baseAmount.toFixed(2)),
      vatAmount: parseFloat(vatAmount.toFixed(2)),
      totalAmount: parseFloat(parsedAmount.toFixed(2)),
    };
  } else {
    // Amount excludes VAT: VAT = Amount * (Rate/100)
    const vatAmount = parsedAmount * (parsedRate / 100);
    const totalAmount = parsedAmount + vatAmount;
    return {
      baseAmount: parseFloat(parsedAmount.toFixed(2)),
      vatAmount: parseFloat(vatAmount.toFixed(2)),
      totalAmount: parseFloat(totalAmount.toFixed(2)),
    };
  }
}

/**
 * Calculate Straight-Line Asset Depreciation
 * @param {number|string} cost - Original asset cost
 * @param {number|string} salvage - Residual / Salvage value
 * @param {number|string} usefulLifeYears - Number of expected operating years
 */
export function calculateStraightLineDepreciation(cost, salvage = 0, usefulLifeYears = 1) {
  const parsedCost = parseFloat(cost) || 0;
  const parsedSalvage = parseFloat(salvage) || 0;
  const parsedYears = Math.max(0.01, parseFloat(usefulLifeYears) || 1);

  if (parsedCost <= 0) {
    return {
      depreciableBase: 0,
      annualDepreciation: 0,
      monthlyDepreciation: 0,
      ratePercentage: 0,
    };
  }

  const depreciableBase = Math.max(0, parsedCost - parsedSalvage);
  const annualDepreciation = depreciableBase / parsedYears;
  const ratePercentage = (annualDepreciation / parsedCost) * 100;

  return {
    depreciableBase: parseFloat(depreciableBase.toFixed(2)),
    annualDepreciation: parseFloat(annualDepreciation.toFixed(2)),
    monthlyDepreciation: parseFloat((annualDepreciation / 12).toFixed(2)),
    ratePercentage: parseFloat(ratePercentage.toFixed(2)),
  };
}

/**
 * Calculate Break-Even Point (BEP)
 * @param {number|string} fixedCosts - Total fixed costs
 * @param {number|string} unitPrice - Selling price per unit
 * @param {number|string} variableCostPerUnit - Variable cost per unit
 */
export function calculateBreakEven(fixedCosts, unitPrice, variableCostPerUnit) {
  const fCosts = parseFloat(fixedCosts) || 0;
  const price = parseFloat(unitPrice) || 0;
  const vCost = parseFloat(variableCostPerUnit) || 0;

  const contributionMargin = price - vCost;
  const breakEvenUnits = contributionMargin > 0 ? fCosts / contributionMargin : 0;
  const breakEvenRevenue = breakEvenUnits * price;

  return {
    contributionMargin: parseFloat(contributionMargin.toFixed(2)),
    breakEvenUnits: Math.ceil(breakEvenUnits),
    breakEvenRevenue: parseFloat(breakEvenRevenue.toFixed(2)),
    isValid: contributionMargin > 0 && fCosts > 0,
  };
}

/**
 * Calculate End of Service Gratuity (Saudi Labor Law Standard)
 * @param {number|string} lastSalary - Final basic salary with fixed allowances
 * @param {number|string} years - Total service years
 * @param {'termination'|'resignation'} reason - Separation reason
 */
export function calculateEndOfService(lastSalary, years, reason = 'termination') {
  const numSalary = parseFloat(lastSalary) || 0;
  const numYears = Math.max(0, parseFloat(years) || 0);

  if (numSalary <= 0 || numYears <= 0) {
    return { basicReward: 0, totalReward: 0 };
  }

  // Basic reward: half month for first 5 years, 1 full month per year after 5
  let basicReward = 0;
  if (numYears <= 5) {
    basicReward = (numSalary / 2) * numYears;
  } else {
    basicReward = (numSalary / 2) * 5 + numSalary * (numYears - 5);
  }

  let finalReward = basicReward;

  // If resignation: scale based on service tenure
  if (reason === 'resignation') {
    if (numYears < 2) {
      finalReward = 0;
    } else if (numYears < 5) {
      finalReward = basicReward / 3;
    } else if (numYears < 10) {
      finalReward = (basicReward * 2) / 3;
    } else {
      finalReward = basicReward;
    }
  }

  return {
    basicReward: parseFloat(basicReward.toFixed(2)),
    totalReward: parseFloat(finalReward.toFixed(2)),
  };
}

/**
 * Calculate Present Value (PV)
 * @param {number|string} futureValue - Expected future cash flow (FV)
 * @param {number|string} annualRatePercent - Discount or interest rate %
 * @param {number|string} years - Number of periods/years
 */
export function calculatePresentValue(futureValue, annualRatePercent, years) {
  const fv = parseFloat(futureValue) || 0;
  const r = (parseFloat(annualRatePercent) || 0) / 100;
  const n = parseFloat(years) || 0;

  if (fv <= 0 || r <= 0 || n <= 0) {
    return { presentValue: 0 };
  }

  const pv = fv / Math.pow(1 + r, n);
  return {
    presentValue: parseFloat(pv.toFixed(2)),
  };
}

/**
 * Calculate Net Present Value (NPV)
 * @param {number|string} discountRatePercent - Discount rate as percentage (e.g. 10)
 * @param {number|string} initialInvestment - Initial cash outflow (Period 0)
 * @param {Array<number|string>} cashFlows - Array of periodic future cash inflows
 */
export function calculateNPV(discountRatePercent, initialInvestment, cashFlows = []) {
  const r = (parseFloat(discountRatePercent) || 0) / 100;
  const i0 = parseFloat(initialInvestment) || 0;

  if (r <= -1) {
    return { npv: 0, discountedCashFlows: [], isProfitable: false };
  }

  let totalDiscountedInflows = 0;
  const discountedCashFlows = cashFlows.map((cf, index) => {
    const period = index + 1;
    const amount = parseFloat(cf) || 0;
    const discounted = amount / Math.pow(1 + r, period);
    totalDiscountedInflows += discounted;
    return {
      period,
      amount,
      discountedAmount: parseFloat(discounted.toFixed(2)),
    };
  });

  const npv = -i0 + totalDiscountedInflows;

  return {
    initialInvestment: parseFloat(i0.toFixed(2)),
    totalDiscountedInflows: parseFloat(totalDiscountedInflows.toFixed(2)),
    npv: parseFloat(npv.toFixed(2)),
    isProfitable: npv > 0,
    discountedCashFlows,
  };
}

/**
 * Calculate Internal Rate of Return (IRR) using Newton-Raphson approximation
 * @param {number|string} initialInvestment - Initial outlay
 * @param {Array<number|string>} cashFlows - Future positive cash inflows
 */
export function calculateIRR(initialInvestment, cashFlows = []) {
  const i0 = parseFloat(initialInvestment) || 0;
  const cfs = cashFlows.map(cf => parseFloat(cf) || 0);

  if (i0 <= 0 || cfs.length === 0 || cfs.every(cf => cf <= 0)) {
    return { irrPercentage: null, isValid: false };
  }

  const allFlows = [-i0, ...cfs];
  let guess = 0.1; // 10% initial guess
  const maxIterations = 100;
  const tolerance = 1e-6;

  for (let iter = 0; iter < maxIterations; iter++) {
    let npv = 0;
    let dNpv = 0;

    for (let t = 0; t < allFlows.length; t++) {
      const flow = allFlows[t];
      const factor = Math.pow(1 + guess, t);
      npv += flow / factor;
      if (t > 0) {
        dNpv -= (t * flow) / (factor * (1 + guess));
      }
    }

    if (Math.abs(dNpv) < tolerance) break;
    const nextGuess = guess - npv / dNpv;

    if (Math.abs(nextGuess - guess) < tolerance) {
      guess = nextGuess;
      break;
    }
    guess = nextGuess;
  }

  if (isNaN(guess) || !isFinite(guess) || guess <= -1) {
    return { irrPercentage: null, isValid: false };
  }

  return {
    irrPercentage: parseFloat((guess * 100).toFixed(2)),
    isValid: true,
  };
}

/**
 * Calculate Loan Amortization Schedule
 * @param {number|string} principal - Total loan amount
 * @param {number|string} annualRatePercent - Annual interest rate %
 * @param {number|string} termMonths - Loan duration in months
 */
export function calculateLoanAmortization(principal, annualRatePercent, termMonths) {
  const p = parseFloat(principal) || 0;
  const annualRate = parseFloat(annualRatePercent) || 0;
  const n = parseInt(termMonths, 10) || 1;

  if (p <= 0 || n <= 0) {
    return {
      monthlyPayment: 0,
      totalPayment: 0,
      totalInterest: 0,
      schedule: [],
    };
  }

  const monthlyRate = (annualRate / 100) / 12;
  let monthlyPayment = 0;

  if (monthlyRate === 0) {
    monthlyPayment = p / n;
  } else {
    monthlyPayment = (p * (monthlyRate * Math.pow(1 + monthlyRate, n))) / (Math.pow(1 + monthlyRate, n) - 1);
  }

  let balance = p;
  let totalInterest = 0;
  const schedule = [];

  for (let month = 1; month <= n; month++) {
    const interest = balance * monthlyRate;
    const principalPaid = monthlyPayment - interest;
    balance = Math.max(0, balance - principalPaid);
    totalInterest += interest;

    schedule.push({
      month,
      payment: parseFloat(monthlyPayment.toFixed(2)),
      principal: parseFloat(principalPaid.toFixed(2)),
      interest: parseFloat(interest.toFixed(2)),
      balance: parseFloat(balance.toFixed(2)),
    });
  }

  const totalPayment = p + totalInterest;

  return {
    monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
    totalPayment: parseFloat(totalPayment.toFixed(2)),
    totalInterest: parseFloat(totalInterest.toFixed(2)),
    schedule,
  };
}
