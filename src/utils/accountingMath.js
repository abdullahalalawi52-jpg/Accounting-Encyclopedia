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

/**
 * Calculate Individual Islamic Zakat (زكاة المال والأصول للأفراد)
 * @param {Object} params
 * @param {number|string} params.cash - Cash in hand and bank
 * @param {number|string} params.goldSilver - Value of gold/silver investments
 * @param {number|string} params.stocks - Tradeable stocks and funds
 * @param {number|string} params.inventory - Business merchandise/goods for resale
 * @param {number|string} params.goodDebts - Debts receivable expected to be recovered
 * @param {number|string} params.immediateDebts - Immediate liabilities due this year
 * @param {number|string} params.goldPricePerGram - 24k gold price per gram (Nisab = 85g)
 * @param {'hijri'|'gregorian'} params.calendar - Calendar year basis
 */
export function calculateIndividualZakat({
  cash = 0,
  goldSilver = 0,
  stocks = 0,
  inventory = 0,
  goodDebts = 0,
  immediateDebts = 0,
  goldPricePerGram = 300,
  calendar = 'hijri',
} = {}) {
  const numCash = Math.max(0, parseFloat(cash) || 0);
  const numGoldSilver = Math.max(0, parseFloat(goldSilver) || 0);
  const numStocks = Math.max(0, parseFloat(stocks) || 0);
  const numInventory = Math.max(0, parseFloat(inventory) || 0);
  const numGoodDebts = Math.max(0, parseFloat(goodDebts) || 0);
  const numImmediateDebts = Math.max(0, parseFloat(immediateDebts) || 0);
  const numGoldPrice = Math.max(1, parseFloat(goldPricePerGram) || 300);

  const totalAssets = numCash + numGoldSilver + numStocks + numInventory + numGoodDebts;
  const netZakatBase = Math.max(0, totalAssets - numImmediateDebts);
  
  // Nisab based on 85g of pure 24k gold
  const nisabThreshold = parseFloat((85 * numGoldPrice).toFixed(2));
  const isNisabReached = netZakatBase >= nisabThreshold;
  
  // Hijri: 2.5%, Gregorian (Solar 365.25 days): 2.577%
  const ratePercentage = calendar === 'gregorian' ? 2.577 : 2.5;
  const zakatDue = isNisabReached ? parseFloat(((netZakatBase * ratePercentage) / 100).toFixed(2)) : 0;

  return {
    totalAssets: parseFloat(totalAssets.toFixed(2)),
    totalDeductions: parseFloat(numImmediateDebts.toFixed(2)),
    netZakatBase: parseFloat(netZakatBase.toFixed(2)),
    nisabThreshold,
    isNisabReached,
    ratePercentage,
    calendar,
    zakatDue,
    breakdown: {
      cash: numCash,
      goldSilver: numGoldSilver,
      stocks: numStocks,
      inventory: numInventory,
      goodDebts: numGoodDebts,
      immediateDebts: numImmediateDebts,
    },
  };
}

/**
 * Calculate Corporate Zakat (وعاء زكاة الشركات وفق طريقة مصادر الأموال المعتمدة - ZATCA Standard)
 * @param {Object} params
 * @param {number|string} params.capital - Paid-up capital (رأس المال المدفوع)
 * @param {number|string} params.retainedEarnings - Retained earnings & reserves (الأرباح المدورة والاحتياطيات)
 * @param {number|string} params.provisions - Long-term provisions (المخصصات طويلة الأجل)
 * @param {number|string} params.longTermDebt - Long-term debt & loans (الديون والتمويلات طويلة الأجل)
 * @param {number|string} params.netFixedAssets - Net fixed assets / PPE (صافي الأصول الثابتة)
 * @param {number|string} params.investments - Long-term non-trading investments (استثمارات طويلة الأجل)
 * @param {number|string} params.otherDeductions - Other statutory deductions / Intangibles (خصومات نظامية أخرى)
 * @param {number|string} params.adjustedProfit - Adjusted net profit for the year (صافي الربح المعدل للعام)
 * @param {'hijri'|'gregorian'} params.calendar - Calendar year basis
 */
export function calculateCorporateZakat({
  capital = 0,
  retainedEarnings = 0,
  provisions = 0,
  longTermDebt = 0,
  netFixedAssets = 0,
  investments = 0,
  otherDeductions = 0,
  adjustedProfit = 0,
  calendar = 'hijri',
} = {}) {
  const numCapital = Math.max(0, parseFloat(capital) || 0);
  const numRetained = Math.max(0, parseFloat(retainedEarnings) || 0);
  const numProvisions = Math.max(0, parseFloat(provisions) || 0);
  const numLongTermDebt = Math.max(0, parseFloat(longTermDebt) || 0);

  const numFixedAssets = Math.max(0, parseFloat(netFixedAssets) || 0);
  const numInvestments = Math.max(0, parseFloat(investments) || 0);
  const numOtherDeductions = Math.max(0, parseFloat(otherDeductions) || 0);
  const numAdjustedProfit = Math.max(0, parseFloat(adjustedProfit) || 0);

  const totalSources = numCapital + numRetained + numProvisions + numLongTermDebt;
  const totalDeductions = numFixedAssets + numInvestments + numOtherDeductions;
  
  // Zakat Base = (Total Sources - Total Deductions) + Adjusted Net Profit
  const baseBeforeProfit = Math.max(0, totalSources - totalDeductions);
  const zakatBase = baseBeforeProfit + numAdjustedProfit;

  // Rate: 2.5% for Hijri year, 2.577% for Gregorian fiscal year
  const ratePercentage = calendar === 'gregorian' ? 2.577 : 2.5;
  const zakatDue = parseFloat(((zakatBase * ratePercentage) / 100).toFixed(2));

  return {
    totalSources: parseFloat(totalSources.toFixed(2)),
    totalDeductions: parseFloat(totalDeductions.toFixed(2)),
    baseBeforeProfit: parseFloat(baseBeforeProfit.toFixed(2)),
    adjustedProfit: parseFloat(numAdjustedProfit.toFixed(2)),
    zakatBase: parseFloat(zakatBase.toFixed(2)),
    ratePercentage,
    calendar,
    zakatDue,
    breakdown: {
      capital: numCapital,
      retainedEarnings: numRetained,
      provisions: numProvisions,
      longTermDebt: numLongTermDebt,
      netFixedAssets: numFixedAssets,
      investments: numInvestments,
      otherDeductions: numOtherDeductions,
      adjustedProfit: numAdjustedProfit,
    },
  };
}

