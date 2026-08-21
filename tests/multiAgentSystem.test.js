import { describe, it, expect } from 'vitest';
import { processQueryWithMAS } from '../src/services/agents/supervisorOrchestrator.js';
import { runJournalWorker } from '../src/services/agents/journalWorker.js';
import { runZakatTaxWorker } from '../src/services/agents/zakatWorker.js';
import { runAccountingAuditor } from '../src/services/agents/auditorAgent.js';
import { createInitialState } from '../src/services/agents/agentState.js';

describe('Accounting Multi-Agent System (MAS)', () => {
  it('Supervisor Orchestrator correctly routes and audits an asset purchase query', async () => {
    const state = await processQueryWithMAS('كيف أسجل قيد شراء أصل بدفعة وقرض؟', 'ar');
    
    expect(state.routingPlan).toContain('journal_math_worker');
    expect(state.auditVerdict.status).toBe('APPROVED');
    expect(state.auditVerdict.mathBalanced).toBe(true);
    expect(state.finalResponse).toContain('الآلات والمعدات');
  });

  it('Journal Math Worker generates strictly balanced double-entry (Debit == Credit)', () => {
    const result = runJournalWorker('شراء بضاعة ومبيعات', false);
    
    expect(result.isBalanced).toBe(true);
    expect(result.totalDebit).toBe(result.totalCredit);
    expect(result.entries.length).toBeGreaterThanOrEqual(2);
  });

  it('Zakat Worker computes proper statutory rate for Hijri vs Gregorian', () => {
    const hijriResult = runZakatTaxWorker('حساب زكاة سنوية هجرية', false);
    const gregorianResult = runZakatTaxWorker('حساب زكاة سنوية ميلادي 365 يوم', false);

    expect(hijriResult.appliedRatePercentage).toContain('2.50%');
    expect(gregorianResult.appliedRatePercentage).toContain('2.5775%');
    expect(hijriResult.components.netZakatBase).toBeGreaterThan(0);
  });

  it('Auditor Agent REJECTS unbalanced journal transactions', () => {
    const state = createInitialState('test query', 'ar');
    state.workerOutputs.journal = {
      entries: [
        { account_ar: 'المدين', debit: 1000, credit: 0 },
        { account_ar: 'الدائن', debit: 0, credit: 800 } // Unbalanced!
      ]
    };

    const verdict = runAccountingAuditor(state);
    expect(verdict.status).toBe('REJECTED');
    expect(verdict.mathBalanced).toBe(false);
    expect(verdict.discrepancies.length).toBeGreaterThan(0);
  });

  it('Auditor Agent APPROVES perfectly balanced journal transactions', () => {
    const state = createInitialState('test query', 'ar');
    state.workerOutputs.journal = {
      entries: [
        { account_ar: 'البنك', debit: 5000, credit: 0 },
        { account_ar: 'المبيعات', debit: 0, credit: 5000 }
      ]
    };

    const verdict = runAccountingAuditor(state);
    expect(verdict.status).toBe('APPROVED');
    expect(verdict.mathBalanced).toBe(true);
    expect(verdict.score).toBe(100);
  });
});
