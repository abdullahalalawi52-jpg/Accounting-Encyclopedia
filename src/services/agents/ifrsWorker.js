/**
 * IFRS & SOCPA Standards Worker Agent
 * Single Responsibility: Explain standard principles, criteria, and disclosures.
 */

export const IFRS_KNOWLEDGE_BASE = {
  'ifrs16': {
    code: 'IFRS 16',
    title_ar: 'عقود الإيجار (Leases)',
    title_en: 'Leases',
    summary_ar: 'يلغي التصنيف بين الإيجار التشغيلي والتمويلي للمستأجر، ويفرض إثبات حق استخدام الأصل (Right-of-Use Asset) مقابل التزام عقد الإيجار (Lease Liability).',
    summary_en: 'Eliminates operating vs finance lease classification for lessees, requiring recognition of a Right-of-Use (ROU) Asset and a Lease Liability.',
    journalHint_ar: 'من حـ/ أصول حق الاستخدام (ROU Asset) | إلى حـ/ التزامات عقود الإيجار',
    journalHint_en: 'Dr. Right-of-Use Asset | Cr. Lease Liability',
  },
  'ifrs15': {
    code: 'IFRS 15',
    title_ar: 'الإيراد من العقود مع العملاء (Revenue from Contracts)',
    title_en: 'Revenue from Contracts with Customers',
    summary_ar: 'يعتمد نموذج الخطوات الخمس للاعتراف بالإيراد: تحديد العقد، التزامات الأداء، سعر المعاملة، تخصيص السعر، والاعتراف عند الوفاء بالالتزام.',
    summary_en: 'Establishes the 5-step revenue model: Identify contract, identify performance obligations, determine transaction price, allocate price, and recognize revenue when obligation is satisfied.',
    journalHint_ar: 'من حـ/ المدينون أو النقدية | إلى حـ/ إيرادات العقود',
    journalHint_en: 'Dr. Accounts Receivable / Cash | Cr. Contract Revenue',
  },
  'ifrs9': {
    code: 'IFRS 9',
    title_ar: 'الأدوات المالية ومخصص الخسائر الائتمانية المتوقعة (ECL)',
    title_en: 'Financial Instruments (ECL Model)',
    summary_ar: 'يحدد تصنيف وقياس الأصول والالتزامات المالية، ونموذج الخسائر الائتمانية المتوقعة الاستباقي (Expected Credit Loss Model).',
    summary_en: 'Defines classification, measurement, and the proactive Expected Credit Loss (ECL) impairment model.',
    journalHint_ar: 'من حـ/ مخصص خسائر ائتمانية متوقعة (أرباح وخسائر) | إلى حـ/ مخصص الديون المشكوك فيها',
    journalHint_en: 'Dr. Impairment Loss (P&L) | Cr. Allowance for Expected Credit Losses',
  },
  'ias16': {
    code: 'IAS 16',
    title_ar: 'العقارات والآلات والمعدات (Property, Plant and Equipment)',
    title_en: 'Property, Plant and Equipment',
    summary_ar: 'يحكم رسملة الأصول الثابتة ونماذج التكلفة مقابل إعادة التقييم وطرق الإهلاك المنتظم.',
    summary_en: 'Governs capitalization of fixed assets, cost vs revaluation model, and systematic depreciation.',
    journalHint_ar: 'من حـ/ مصروف الإهلاك | إلى حـ/ مجمع إهلاك الأصول',
    journalHint_en: 'Dr. Depreciation Expense | Cr. Accumulated Depreciation',
  },
  'ias2': {
    code: 'IAS 2',
    title_ar: 'المخزون والتقييم بالتكلفة أو صافي القيمة القابلة للتحقق',
    title_en: 'Inventories (Cost vs NRV)',
    summary_ar: 'يفرض تقييم المخزون بالتكلفة أو صافي القيمة القابلة للتحقق (NRV) أيهما أقل، ويحظر استخدام طريقة LIFO.',
    summary_en: 'Requires measuring inventory at lower of cost and Net Realizable Value (NRV). Prohibits LIFO.',
    journalHint_ar: 'من حـ/ خسائر هبوط المخزون | إلى حـ/ مخصص هبوط أسعار المخزون',
    journalHint_en: 'Dr. Inventory Write-down Loss | Cr. Provision for Inventory Decline',
  }
};

export function runIfrsWorker(query, isEn = false) {
  const q = query.toLowerCase();

  let matchedKey = null;
  if (q.includes('16') || q.includes('إيجار') || q.includes('lease')) matchedKey = 'ifrs16';
  else if (q.includes('15') || q.includes('إيراد') || q.includes('عقد') || q.includes('revenue')) matchedKey = 'ifrs15';
  else if (q.includes('9') || q.includes('ائتمان') || q.includes('ecl') || q.includes('instruments')) matchedKey = 'ifrs9';
  else if (q.includes('16') || q.includes('أصل ثابت') || q.includes('إهلاك') || q.includes('depreciation') || q.includes('ppe')) matchedKey = 'ias16';
  else if (q.includes('مخزون') || q.includes('inventory') || q.includes('nrv')) matchedKey = 'ias2';

  const data = matchedKey ? IFRS_KNOWLEDGE_BASE[matchedKey] : null;

  return {
    agentId: 'ifrs_socpa_worker',
    matchedStandard: data ? data.code : 'General Accounting Standard',
    title: data ? (isEn ? data.title_en : data.title_ar) : (isEn ? 'General IFRS Principle' : 'المبادئ المحاسبية العامة'),
    explanation: data ? (isEn ? data.summary_en : data.summary_ar) : (isEn ? 'Standard financial reporting principles according to IFRS/SOCPA framework.' : 'وفق المعايير الدولية لإعداد التقارير المالية والأنظمة المعتمدة في المملكة.'),
    journalHint: data ? (isEn ? data.journalHint_en : data.journalHint_ar) : null,
    confidence: data ? 0.98 : 0.75,
  };
}
