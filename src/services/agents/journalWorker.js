/**
 * Journal Entry & Financial Math Worker Agent
 * Single Responsibility: Generate perfectly balanced double-entry accounting transactions.
 */

export function runJournalWorker(query, isEn = false) {
  const q = query.toLowerCase();

  // Pattern 1: Asset Purchase with Bank / Loan
  if (q.includes('شراء أصل') || q.includes('asset purchase') || (q.includes('أصل') && q.includes('شراء'))) {
    return {
      agentId: 'journal_math_worker',
      transactionType: 'Fixed Asset Acquisition',
      entries: [
        {
          code: '12010',
          account_ar: 'الآلات والمعدات (أصول غير متداولة)',
          account_en: 'Plant, Machinery & Equipment',
          debit: 100000.00,
          credit: 0.00,
          type: 'DEBIT',
        },
        {
          code: '10101',
          account_ar: 'النقدية وما في حكمها - البنك (دفعة أولى)',
          account_en: 'Bank Account (Down Payment)',
          debit: 0.00,
          credit: 20000.00,
          type: 'CREDIT',
        },
        {
          code: '21010',
          account_ar: 'قروض وتسهيلات بنكية طويلة الأجل',
          account_en: 'Long-term Bank Loan Payable',
          debit: 0.00,
          credit: 80000.00,
          type: 'CREDIT',
        }
      ],
      totalDebit: 100000.00,
      totalCredit: 100000.00,
      isBalanced: true,
      explanation_ar: 'إثبات امتلاك أصل رأسمالي مع سداد جزء نقدي وتمويل المتبقي بقرض طويل الأجل.',
      explanation_en: 'Recognition of PPE asset acquisition with partial cash down payment and long-term financing.',
    };
  }

  // Pattern 2: Sales with VAT
  if (q.includes('مبيعات') || q.includes('sales') || q.includes('بيع')) {
    return {
      agentId: 'journal_math_worker',
      transactionType: 'Revenue Recognition with VAT',
      entries: [
        {
          code: '10101',
          account_ar: 'النقدية بالبنك أو المدينون',
          account_en: 'Bank Account / Accounts Receivable',
          debit: 115000.00,
          credit: 0.00,
          type: 'DEBIT',
        },
        {
          code: '40101',
          account_ar: 'إيراد المبيعات',
          account_en: 'Sales Revenue',
          debit: 0.00,
          credit: 100000.00,
          type: 'CREDIT',
        },
        {
          code: '20301',
          account_ar: 'ضريبة القيمة المضافة المستحقة (مخرجات 15%)',
          account_en: 'VAT Output Tax Payable (15%)',
          debit: 0.00,
          credit: 15000.00,
          type: 'CREDIT',
        }
      ],
      totalDebit: 115000.00,
      totalCredit: 115000.00,
      isBalanced: true,
      explanation_ar: 'إثبات الإيراد الصافي وفق المعيار IFRS 15 مع إثبات التزام ضريبة القيمة المضافة لهيئة الزكاة.',
      explanation_en: 'Revenue recognition net of 15% VAT output payable according to IFRS 15 and ZATCA statutory rules.',
    };
  }

  // Pattern 3: Payroll / Salaries
  if (q.includes('رواتب') || q.includes('راتب') || q.includes('payroll') || q.includes('salary')) {
    return {
      agentId: 'journal_math_worker',
      transactionType: 'Payroll & Social Security',
      entries: [
        {
          code: '50101',
          account_ar: 'مصروف الرواتب والأجور (إجمالي الاستحقاق)',
          account_en: 'Salaries & Wages Expense (Gross)',
          debit: 50000.00,
          credit: 0.00,
          type: 'DEBIT',
        },
        {
          code: '20205',
          account_ar: 'مصلحة التأمينات الاجتماعية (استقطاعات نظامية)',
          account_en: 'Social Insurance Liability (GOSI Payable)',
          debit: 0.00,
          credit: 5000.00,
          type: 'CREDIT',
        },
        {
          code: '10101',
          account_ar: 'البنك - حساب حماية الأجور (صافي الصرف)',
          account_en: 'Bank Account - WPS Net Transferred',
          debit: 0.00,
          credit: 45000.00,
          type: 'CREDIT',
        }
      ],
      totalDebit: 50000.00,
      totalCredit: 50000.00,
      isBalanced: true,
      explanation_ar: 'إثبات استحقاق وصرف مسير الرواتب الشهري مع خصم حصة التأمينات وتحويل الصافي عبر نظام حماية الأجور.',
      explanation_en: 'Recognition and transfer of monthly payroll with statutory deductions and net bank transfer.',
    };
  }

  // Pattern 4: Depreciation
  if (q.includes('إهلاك') || q.includes('depreciation') || q.includes('اهلاك')) {
    return {
      agentId: 'journal_math_worker',
      transactionType: 'Depreciation Expense',
      entries: [
        {
          code: '50201',
          account_ar: 'مصروف إهلاك الأصول الثابتة',
          account_en: 'Depreciation Expense',
          debit: 12000.00,
          credit: 0.00,
          type: 'DEBIT',
        },
        {
          code: '12099',
          account_ar: 'مجمع إهلاك الأصول الثابتة (أصل مقابل)',
          account_en: 'Accumulated Depreciation (Contra-Asset)',
          debit: 0.00,
          credit: 12000.00,
          type: 'CREDIT',
        }
      ],
      totalDebit: 12000.00,
      totalCredit: 12000.00,
      isBalanced: true,
      explanation_ar: 'قيد تسوية إهلاك الفترة وفق المعيار المحاسبي الدولي IAS 16 لتحميل الفترة بنصيبها من تكلفة الأصل.',
      explanation_en: 'Standard adjusting entry for periodic depreciation according to IAS 16 matching principles.',
    };
  }

  // Fallback Balanced Entry
  return {
    agentId: 'journal_math_worker',
    transactionType: 'General Balanced Transaction',
    entries: [
      {
        code: '1XXXX',
        account_ar: 'حساب المدين (زيادة أصل أو مصروف)',
        account_en: 'Debit Account (Asset/Expense Increase)',
        debit: 1000.00,
        credit: 0.00,
        type: 'DEBIT',
      },
      {
        code: '2XXXX',
        account_ar: 'حساب الدائن (زيادة التزام أو إيراد)',
        account_en: 'Credit Account (Liability/Revenue Increase)',
        debit: 0.00,
        credit: 1000.00,
        type: 'CREDIT',
      }
    ],
    totalDebit: 1000.00,
    totalCredit: 1000.00,
    isBalanced: true,
    explanation_ar: 'قيد مزدوج متوازن يحقق قاعدة القيد المزدوج المحاسبية الصارمة (المدين = الدائن).',
    explanation_en: 'Double-entry bookkeeping transaction strictly adhering to Debit = Credit balance.',
  };
}
