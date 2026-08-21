/**
 * Zakat & Statutory Tax Worker Agent
 * Single Responsibility: Accurate ZATCA Zakat base & VAT 15% computations.
 */

export function runZakatTaxWorker(query, isEn = false) {
  const q = query.toLowerCase();

  const isGregorian = q.includes('ميلادي') || q.includes('gregorian') || q.includes('365');
  const zakatRate = isGregorian ? 0.025775 : 0.025; // 2.5775% Gregorian vs 2.5% Hijri

  // Sample base formulation
  const sampleEquity = 1500000;
  const sampleProvisions = 200000;
  const sampleNetFixedAssets = 600000;
  const zakatBase = Math.max(0, (sampleEquity + sampleProvisions) - sampleNetFixedAssets);
  const zakatDue = zakatBase * zakatRate;

  return {
    agentId: 'zakat_tax_worker',
    authority: 'ZATCA (هيئة الزكاة والضريبة والجمارك)',
    calendarType: isGregorian ? 'Gregorian (سنة ميلادية)' : 'Hijri (سنة هجرية)',
    appliedRatePercentage: isGregorian ? '2.5775% (وفقاً لمعادلة 2.5% × 365 / 354)' : '2.50% (وفق الحول الهجري)',
    components: {
      sourcesOfFunds: sampleEquity + sampleProvisions,
      deductibleAssets: sampleNetFixedAssets,
      netZakatBase: zakatBase,
      zakatDueAmount: zakatDue,
    },
    vatStandardRate: '15%',
    statutoryRule: isEn 
      ? 'ZATCA Zakat Regulations for Commercial Companies: Zakat Base = (Equity + Long-term Financing + Provisions) - (Net Fixed Assets + Long-term Investments).'
      : 'اللائحة التنفيذية لجباية الزكاة للشركات التجارية: وعاء الزكاة = (حقوق الملكية + التمويل طويل الأجل + المخصصات) - (صافي الأصول الثابتة + الاستثمارات طويلة الأجل).',
  };
}
