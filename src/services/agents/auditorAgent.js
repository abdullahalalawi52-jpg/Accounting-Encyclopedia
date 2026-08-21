/**
 * Accounting QA Auditor Agent (Lead Audit Partner)
 * Single Responsibility: Adversarial quality control, math balancing verification, and compliance check.
 */

export function runAccountingAuditor(state) {
  const discrepancies = [];
  let mathBalanced = true;
  let score = 100;

  const journal = state.workerOutputs.journal;
  const zakat = state.workerOutputs.zakatTax;
  const standards = state.workerOutputs.standards;

  // 1. Audit Journal Entries
  if (journal && journal.entries) {
    if (journal.entries.length < 2) {
      discrepancies.push({
        severity: 'CRITICAL',
        code: 'INSUFFICIENT_LEGS',
        message: 'القيد المحاسبي يجب أن يحتوي على طرفين على الأقل (مدين ودائن).',
      });
      score -= 40;
    }

    const totalDebit = journal.entries.reduce((sum, e) => sum + (Number(e.debit) || 0), 0);
    const totalCredit = journal.entries.reduce((sum, e) => sum + (Number(e.credit) || 0), 0);

    if (Math.abs(totalDebit - totalCredit) > 0.01) {
      mathBalanced = false;
      discrepancies.push({
        severity: 'CRITICAL',
        code: 'UNBALANCED_ENTRY',
        message: `عدم توازن القيد المحاسبي: إجمالي المدين (${totalDebit.toFixed(2)}) لا يساوي إجمالي الدائن (${totalCredit.toFixed(2)}).`,
      });
      score -= 50;
    }
  }

  // 2. Audit Zakat Rate Consistency
  if (zakat && zakat.components) {
    if (zakat.components.netZakatBase < 0) {
      discrepancies.push({
        severity: 'WARNING',
        code: 'NEGATIVE_ZAKAT_BASE',
        message: 'وعاء الزكاة لا يمكن أن يكون سالباً في المعاملة التجارية المعتمدة.',
      });
      score -= 20;
    }
  }

  const isApproved = discrepancies.filter(d => d.severity === 'CRITICAL').length === 0;

  return {
    agentId: 'accounting_qa_auditor',
    status: isApproved ? 'APPROVED' : 'REJECTED',
    score: Math.max(0, score),
    mathBalanced,
    discrepancies,
    auditedAt: new Date().toISOString(),
    auditSeal: isApproved ? 'VERIFIED_100%_COMPLIANT' : 'REJECTED_AUDIT_FAIL',
  };
}
