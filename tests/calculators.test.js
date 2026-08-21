import { describe, it, expect } from 'vitest';
import { 
  calculateVAT, 
  calculateStraightLineDepreciation, 
  calculateBreakEven, 
  calculateEndOfService, 
  calculatePresentValue,
  calculateNPV,
  calculateIRR,
  calculateLoanAmortization,
  calculateIndividualZakat,
  calculateCorporateZakat
} from '../src/utils/accountingMath.js';

describe('Accounting Calculators - VAT (ضريبة القيمة المضافة)', () => {
  it('should correctly calculate VAT when amount is exclusive of VAT (15% standard Saudi/Gulf rate)', () => {
    const result = calculateVAT(1000, 15, false);
    expect(result.baseAmount).toBe(1000);
    expect(result.vatAmount).toBe(150);
    expect(result.totalAmount).toBe(1150);
  });

  it('should correctly calculate VAT when amount is inclusive of VAT (15%)', () => {
    const result = calculateVAT(1150, 15, true);
    expect(result.baseAmount).toBe(1000);
    expect(result.vatAmount).toBe(150);
    expect(result.totalAmount).toBe(1150);
  });

  it('should handle custom VAT rates (e.g. 5% UAE/Oman)', () => {
    const result = calculateVAT(2000, 5, false);
    expect(result.baseAmount).toBe(2000);
    expect(result.vatAmount).toBe(100);
    expect(result.totalAmount).toBe(2100);
  });

  it('should handle 0 amount gracefully without throwing errors', () => {
    const result = calculateVAT(0, 15, false);
    expect(result.baseAmount).toBe(0);
    expect(result.vatAmount).toBe(0);
    expect(result.totalAmount).toBe(0);
  });
});

describe('Accounting Calculators - Straight Line Depreciation (إهلاك القسط الثابت)', () => {
  it('should calculate annual and monthly straight-line depreciation correctly', () => {
    // Asset cost: 100,000 SAR, Salvage value: 10,000 SAR, Useful life: 5 years
    const result = calculateStraightLineDepreciation(100000, 10000, 5);
    expect(result.depreciableBase).toBe(90000);
    expect(result.annualDepreciation).toBe(18000);
    expect(result.monthlyDepreciation).toBe(1500);
    expect(result.ratePercentage).toBe(18);
  });

  it('should handle asset with zero salvage value', () => {
    const result = calculateStraightLineDepreciation(50000, 0, 10);
    expect(result.depreciableBase).toBe(50000);
    expect(result.annualDepreciation).toBe(5000);
    expect(result.monthlyDepreciation).toBe(416.67);
  });
});

describe('Accounting Calculators - Break-Even Point (نقطة التعادل)', () => {
  it('should calculate break-even units and revenue correctly', () => {
    // Fixed Costs: 50,000 SAR, Unit Price: 100 SAR, Variable Cost: 60 SAR -> Margin: 40 SAR
    const result = calculateBreakEven(50000, 100, 60);
    expect(result.contributionMargin).toBe(40);
    expect(result.breakEvenUnits).toBe(1250);
    expect(result.breakEvenRevenue).toBe(125000);
    expect(result.isValid).toBe(true);
  });
});

describe('Accounting Calculators - End of Service Gratuity (مكافأة نهاية الخدمة)', () => {
  it('should calculate termination gratuity for 6 years of service', () => {
    // Salary: 10,000 SAR, 6 years. First 5 years = (10k/2)*5 = 25k, Year 6 = 10k -> Total = 35k
    const result = calculateEndOfService(10000, 6, 'termination');
    expect(result.basicReward).toBe(35000);
    expect(result.totalReward).toBe(35000);
  });

  it('should scale resignation gratuity based on labor law brackets', () => {
    // Resignation at 3 years: 1/3 of basic reward ((10k/2)*3 = 15k -> 15k/3 = 5k)
    const result = calculateEndOfService(10000, 3, 'resignation');
    expect(result.totalReward).toBe(5000);
  });
});

describe('Accounting Calculators - Present Value (القيمة الحالية)', () => {
  it('should calculate present value of future cash flow correctly', () => {
    // Future Value: 10,000 SAR, Rate: 5%, Years: 2 -> PV = 10,000 / (1.05)^2 = 9070.29
    const result = calculatePresentValue(10000, 5, 2);
    expect(result.presentValue).toBe(9070.29);
  });
});

describe('Accounting Calculators - Net Present Value & IRR (صافي القيمة الحالية ومعدل العائد الداخلي)', () => {
  it('should calculate positive NPV for profitable project cash flows', () => {
    // Initial: 100,000 SAR, Rate: 10%, Cash flows: [40000, 50000, 60000]
    // Inflows PV: 36363.64 + 41322.31 + 45078.89 = 122764.84 -> NPV = +22764.84
    const result = calculateNPV(10, 100000, [40000, 50000, 60000]);
    expect(result.npv).toBe(22764.84);
    expect(result.isProfitable).toBe(true);
    expect(result.discountedCashFlows.length).toBe(3);
  });

  it('should calculate IRR accurately for given project stream', () => {
    // Initial: 10,000 SAR, Inflows: [4000, 5000, 6000] -> Exact IRR = 21.65%
    const result = calculateIRR(10000, [4000, 5000, 6000]);
    expect(result.isValid).toBe(true);
    expect(result.irrPercentage).toBeCloseTo(21.65, 1);
  });
});

describe('Accounting Calculators - Loan Amortization (جدول إطفاء القروض)', () => {
  it('should calculate monthly installment, total payment, and schedule breakdown', () => {
    // Loan: 120,000 SAR, 6% annual rate, 12 months
    const result = calculateLoanAmortization(120000, 6, 12);
    expect(result.monthlyPayment).toBe(10327.97);
    expect(result.schedule.length).toBe(12);
    expect(result.schedule[11].balance).toBe(0);
    expect(result.totalInterest).toBeCloseTo(3935.66, 0);
  });
});

describe('Accounting Calculators - Islamic Zakat (حاسبة الزكاة الشرعية للأفراد والشركات)', () => {
  it('should correctly calculate individual zakat above Nisab on Hijri year (2.5%)', () => {
    // Cash: 50,000, Stocks: 30,000, Immediate debts: 10,000 -> Net Base = 70,000 SAR
    // Nisab: 85g * 300 = 25,500 SAR. (70,000 >= 25,500) -> Zakat Due = 70,000 * 2.5% = 1,750 SAR
    const result = calculateIndividualZakat({
      cash: 50000,
      stocks: 30000,
      immediateDebts: 10000,
      goldPricePerGram: 300,
      calendar: 'hijri',
    });

    expect(result.totalAssets).toBe(80000);
    expect(result.netZakatBase).toBe(70000);
    expect(result.nisabThreshold).toBe(25500);
    expect(result.isNisabReached).toBe(true);
    expect(result.ratePercentage).toBe(2.5);
    expect(result.zakatDue).toBe(1750);
  });

  it('should calculate individual zakat on Gregorian year basis (2.577%)', () => {
    const result = calculateIndividualZakat({
      cash: 100000,
      calendar: 'gregorian',
    });

    expect(result.netZakatBase).toBe(100000);
    expect(result.ratePercentage).toBe(2.577);
    expect(result.zakatDue).toBe(2577);
  });

  it('should return zero zakat due when assets are below Nisab threshold', () => {
    const result = calculateIndividualZakat({
      cash: 10000,
      goldPricePerGram: 300, // Nisab = 25,500
    });

    expect(result.isNisabReached).toBe(false);
    expect(result.zakatDue).toBe(0);
  });

  it('should calculate corporate zakat using ZATCA sources of funds method accurately', () => {
    // Capital: 1,000,000, Retained: 200,000, Provisions: 50,000, Long Debt: 150,000 -> Sources: 1,400,000
    // Fixed Assets: 400,000, Investments: 100,000 -> Deductions: 500,000
    // Base before profit: 1,400,000 - 500,000 = 900,000
    // Adjusted Profit: 100,000 -> Total Zakat Base = 1,000,000 SAR
    // Zakat Due (Hijri 2.5%) = 25,000 SAR
    const result = calculateCorporateZakat({
      capital: 1000000,
      retainedEarnings: 200000,
      provisions: 50000,
      longTermDebt: 150000,
      netFixedAssets: 400000,
      investments: 100000,
      adjustedProfit: 100000,
      calendar: 'hijri',
    });

    expect(result.totalSources).toBe(1400000);
    expect(result.totalDeductions).toBe(500000);
    expect(result.baseBeforeProfit).toBe(900000);
    expect(result.adjustedProfit).toBe(100000);
    expect(result.zakatBase).toBe(1000000);
    expect(result.zakatDue).toBe(25000);
  });
});



