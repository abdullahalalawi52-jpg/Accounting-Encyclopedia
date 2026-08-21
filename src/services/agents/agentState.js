/**
 * Accounting Multi-Agent System (MAS) - Shared State Model
 * Implements strict type schemas and consensus logs for Supervisor/Worker/Auditor.
 */

export function createInitialState(userQuery, language = 'ar') {
  return {
    sessionId: crypto.randomUUID ? crypto.randomUUID() : `session_${Date.now()}`,
    userQuery: userQuery.trim(),
    language: language.startsWith('en') ? 'en' : 'ar',
    intent: 'general', // 'standards' | 'journal' | 'zakat_tax' | 'templates' | 'hybrid'
    activeAgent: 'supervisor_orchestrator',
    iterationCount: 0,
    maxIterations: 3,
    agentLogs: [],
    workerOutputs: {
      standards: null,
      journal: null,
      zakatTax: null,
      templates: null,
    },
    auditVerdict: {
      status: 'PENDING', // 'APPROVED' | 'REJECTED'
      score: 100,
      discrepancies: [],
      mathBalanced: true,
      auditedAt: null,
    },
    finalResponse: null,
  };
}

export function logAgentAction(state, agentId, action, details) {
  state.agentLogs.push({
    timestamp: new Date().toISOString(),
    agentId,
    action,
    details,
  });
}
