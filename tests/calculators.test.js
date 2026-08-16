import { describe, it, expect } from 'vitest';
import { 
  calculateVAT, 
  calculateStraightLineDepreciation, 
  calculateBreakEven, 
  calculateEndOfService, 
  calculatePresentValue,
  calculateNPV,
  calculateIRR,
  calculateLoanAmortization
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


