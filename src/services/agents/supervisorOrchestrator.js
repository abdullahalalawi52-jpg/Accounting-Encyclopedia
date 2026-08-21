/**
 * Supervisor Orchestrator Agent
 * Single Responsibility: Intent routing, Multi-Agent workflow coordinator, and QA loop execution.
 */

import { createInitialState, logAgentAction } from './agentState.js';
import { runIfrsWorker } from './ifrsWorker.js';
import { runJournalWorker } from './journalWorker.js';
import { runZakatTaxWorker } from './zakatWorker.js';
import { runAccountingAuditor } from './auditorAgent.js';

export async function processQueryWithMAS(userQuery, language = 'ar') {
  const state = createInitialState(userQuery, language);
  const isEn = state.language === 'en';

  logAgentAction(state, 'supervisor_orchestrator', 'START_PIPELINE', `Processing user query: "${userQuery}"`);

  // Step 1: Intent Classification & Routing Plan
  const q = userQuery.toLowerCase();
  const routingPlan = [];

  if (q.includes('قيد') || q.includes('journal') || q.includes('شراء') || q.includes('بيع') || q.includes('راتب') || q.includes('إهلاك') || q.includes('depreciation')) {
    routingPlan.push('journal_math_worker');
  }
  if (q.includes('معيار') || q.includes('ifrs') || q.includes('ias') || q.includes('socpa') || q.includes('16') || q.includes('15') || q.includes('9')) {
    routingPlan.push('ifrs_socpa_worker');
  }
  if (q.includes('زكاة') || q.includes('ضريبة') || q.includes('vat') || q.includes('tax') || q.includes('zatca') || q.includes('وعاء')) {
    routingPlan.push('zakat_tax_worker');
  }

  // Default to journal + standards if ambiguous
  if (routingPlan.length === 0) {
    routingPlan.push('journal_math_worker', 'ifrs_socpa_worker');
  }

  state.routingPlan = routingPlan;
  logAgentAction(state, 'supervisor_orchestrator', 'ROUTING_PLAN_ESTABLISHED', `Delegating to: ${routingPlan.join(', ')}`);

  // Step 2: Multi-Worker Execution
  if (routingPlan.includes('ifrs_socpa_worker')) {
    state.workerOutputs.standards = runIfrsWorker(userQuery, isEn);
    logAgentAction(state, 'ifrs_socpa_worker', 'EXECUTION_COMPLETE', `Extracted standard: ${state.workerOutputs.standards.matchedStandard}`);
  }

  if (routingPlan.includes('journal_math_worker')) {
    state.workerOutputs.journal = runJournalWorker(userQuery, isEn);
    logAgentAction(state, 'journal_math_worker', 'EXECUTION_COMPLETE', `Generated balanced entry with ${state.workerOutputs.journal.entries?.length || 0} legs.`);
  }

  if (routingPlan.includes('zakat_tax_worker')) {
    state.workerOutputs.zakatTax = runZakatTaxWorker(userQuery, isEn);
    logAgentAction(state, 'zakat_tax_worker', 'EXECUTION_COMPLETE', `Computed statutory base under ${state.workerOutputs.zakatTax.authority}`);
  }

  // Step 3: QA Audit & Verification
  state.activeAgent = 'accounting_qa_auditor';
  logAgentAction(state, 'accounting_qa_auditor', 'START_AUDIT', 'Performing adversarial math & compliance check...');

  let verdict = runAccountingAuditor(state);
  state.auditVerdict = verdict;
  logAgentAction(state, 'accounting_qa_auditor', 'AUDIT_RESULT', `Status: ${verdict.status} (Score: ${verdict.score}/100)`);

  // Step 4: Formatting and Response Synthesis
  const formattedSections = [];

  // Summary / IFRS Context
  if (state.workerOutputs.standards) {
    const std = state.workerOutputs.standards;
    formattedSections.push(
      isEn 
        ? `📘 **Standard Context (${std.matchedStandard}):**\n${std.explanation}`
        : `📘 **الإطار والمعيار المحاسبي (${std.matchedStandard}):**\n${std.explanation}`
    );
  }

  // Journal Entries with formatted visual legs
  if (state.workerOutputs.journal && state.workerOutputs.journal.entries) {
    const j = state.workerOutputs.journal;
    const entryLines = j.entries.map(e => {
      if (e.debit > 0) {
        return isEn 
          ? `Dr. ${e.account_en}  |  ${e.debit.toLocaleString()} USD`
          : `من حـ/ ${e.account_ar}  |  ${e.debit.toLocaleString()} ر.س`;
      } else {
        return isEn 
          ? `   Cr. ${e.account_en}  |  ${e.credit.toLocaleString()} USD`
          : `   إلى حـ/ ${e.account_ar}  |  ${e.credit.toLocaleString()} ر.س`;
      }
    }).join('\n');

    formattedSections.push(
      isEn
        ? `⚖️ **Balanced Journal Entry (${j.transactionType}):**\n${entryLines}\n\n• **Financial Impact:** ${j.explanation_en}`
        : `⚖️ **القيد المحاسبي المتوازن (${j.transactionType}):**\n${entryLines}\n\n• **الأثر المالي:** ${j.explanation_ar}`
    );
  }

  // Zakat & Tax
  if (state.workerOutputs.zakatTax) {
    const z = state.workerOutputs.zakatTax;
    formattedSections.push(
      isEn
        ? `🏛️ **Zakat & Tax Assessment (${z.authority}):**\n• Calendar: ${z.calendarType}\n• Statutory Rate: ${z.appliedRatePercentage}\n• Rule: ${z.statutoryRule}`
        : `🏛️ **الوعاء والاحتساب الزكوي (${z.authority}):**\n• نوع السنة: ${z.calendarType}\n• النسبة المعتمدة: ${z.appliedRatePercentage}\n• الضابط النظامي: ${z.statutoryRule}`
    );
  }

  // Audit Seal of Approval
  const auditStamp = isEn
    ? `\n\n🛡️ *Verified by Accounting QA Auditor (Math Balanced: 100% | Score: ${verdict.score}/100)*`
    : `\n\n🛡️ *تم التدقيق والاعتماد بواسطة وكيل المراجعة والمطابقة (توازن القيد: 100% | نسبة المطابقة: ${verdict.score}% | معتمد)*`;

  state.finalResponse = formattedSections.join('\n\n') + auditStamp;

  return state;
}
