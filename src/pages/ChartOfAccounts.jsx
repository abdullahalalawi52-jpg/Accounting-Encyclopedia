import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, FileText, Folder, FolderOpen, Search, Copy, LayoutGrid, Network } from 'lucide-react';
import { useToast } from '../context/ToastContext.jsx';

const RAW_ACCOUNTS_DATA = [
    {
      id: 1,
      name: 'الأصول',
      name_en: 'Assets',
      type: 'مدين',
      description: 'الموارد التي تمتلكها الشركة ولها قيمة اقتصادية مستقبلية.',
      description_en: 'Resources owned by the company with future economic value.',
      subAccounts: [
        {
          name: 'الأصول المتداولة',
          name_en: 'Current Assets',
          items: [
            { 
              name: 'النقدية بالصندوق', 
              name_en: 'Cash on Hand', 
              code: '1101', 
              example: '10,000 من حـ/ النقدية بالصندوق\n  10,000 إلى حـ/ رأس المال\n(إيداع رأس المال)',
              example_en: 'Dr. Cash on Hand 10,000\n  Cr. Owner Capital 10,000\n(Capital Contribution)'
            },
            { 
              name: 'البنك', 
              name_en: 'Bank Account', 
              code: '1102', 
              example: '5,000 من حـ/ البنك\n  5,000 إلى حـ/ الصندوق\n(إيداع نقدي في البنك)',
              example_en: 'Dr. Bank Account 5,000\n  Cr. Cash on Hand 5,000\n(Cash deposit into bank)'
            },
            { 
              name: 'العملاء (المدينون)', 
              name_en: 'Accounts Receivable (Customers)', 
              code: '1103', 
              example: '2,000 من حـ/ العملاء\n  2,000 إلى حـ/ المبيعات\n(بيع بضاعة بالأجل)',
              example_en: 'Dr. Accounts Receivable 2,000\n  Cr. Sales Revenue 2,000\n(Credit sale of goods)'
            }
          ]
        },
        {
          name: 'الأصول غير المتداولة (الثابتة)',
          name_en: 'Non-Current Assets (Fixed)',
          items: [
            { 
              name: 'الآلات والمعدات', 
              name_en: 'Plant & Machinery', 
              code: '1201', 
              example: '50,000 من حـ/ الآلات\n  50,000 إلى حـ/ البنك\n(شراء آلة بشيك)',
              example_en: 'Dr. Machinery & Equipment 50,000\n  Cr. Bank Account 50,000\n(Purchase of machinery via check)'
            },
            { 
              name: 'مجمع الإهلاك - الآلات', 
              name_en: 'Accumulated Depreciation - Machinery', 
              code: '1202', 
              example: '5,000 من حـ/ مصروف الإهلاك\n  5,000 إلى حـ/ مجمع الإهلاك\n(إثبات إهلاك السنة)',
              example_en: 'Dr. Depreciation Expense 5,000\n  Cr. Accumulated Depreciation 5,000\n(Annual depreciation record)'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'الخصوم / الالتزامات',
      name_en: 'Liabilities',
      type: 'دائن',
      description: 'الديون والالتزامات المستحقة على الشركة للغير.',
      description_en: 'Debts and obligations owed by the company to third parties.',
      subAccounts: [
        {
          name: 'الخصوم المتداولة',
          name_en: 'Current Liabilities',
          items: [
            { 
              name: 'الموردون (الدائنون)', 
              name_en: 'Accounts Payable (Vendors)', 
              code: '2101', 
              example: '3,000 من حـ/ المشتريات\n  3,000 إلى حـ/ الموردين\n(شراء بضاعة بالأجل)',
              example_en: 'Dr. Purchases (Inventory) 3,000\n  Cr. Accounts Payable 3,000\n(Credit purchase of goods)'
            },
            { 
              name: 'أوراق الدفع', 
              name_en: 'Notes Payable', 
              code: '2102', 
              example: '1,000 من حـ/ الموردين\n  1,000 إلى حـ/ أوراق الدفع\n(تحرير كمبيالة للمورد)',
              example_en: 'Dr. Accounts Payable 1,000\n  Cr. Notes Payable 1,000\n(Promissory note issued to vendor)'
            }
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'حقوق الملكية',
      name_en: 'Equity',
      type: 'دائن',
      description: 'حصة الملاك في أصول الشركة بعد خصم الالتزامات.',
      description_en: 'Residual interest of the owners in company assets after deducting liabilities.',
      subAccounts: [
        {
          name: 'رأس المال والأرباح',
          name_en: 'Capital & Retained Earnings',
          items: [
            { 
              name: 'رأس المال', 
              name_en: 'Paid-in Capital', 
              code: '3101', 
              example: '100,000 من حـ/ البنك\n  100,000 إلى حـ/ رأس المال\n(بدء النشاط)',
              example_en: 'Dr. Bank Account 100,000\n  Cr. Capital 100,000\n(Initial capital deposit)'
            },
            { 
              name: 'المسحوبات الشخصية', 
              name_en: 'Owner Drawings', 
              code: '3102', 
              example: '2,000 من حـ/ المسحوبات الشخصية\n  2,000 إلى حـ/ الصندوق\n(سحب نقدي للمالك)',
              example_en: 'Dr. Owner Drawings 2,000\n  Cr. Cash on Hand 2,000\n(Owner cash withdrawal)'
            }
          ]
        }
      ]
    },
    {
      id: 4,
      name: 'الإيرادات',
      name_en: 'Revenues',
      type: 'دائن',
      description: 'الدخل الناتج عن النشاط الرئيسي للشركة.',
      description_en: 'Inflow of economic benefits resulting from ordinary business activities.',
      subAccounts: [
        {
          name: 'إيرادات النشاط',
          name_en: 'Operating Revenues',
          items: [
            { 
              name: 'المبيعات', 
              name_en: 'Sales Revenues', 
              code: '4101', 
              example: '15,000 من حـ/ البنك\n  15,000 إلى حـ/ المبيعات\n(بيع بضاعة نقداً)',
              example_en: 'Dr. Bank Account 15,000\n  Cr. Sales Revenues 15,000\n(Cash sale of goods)'
            },
            { 
              name: 'إيرادات خدمات', 
              name_en: 'Service Revenues', 
              code: '4102', 
              example: '8,000 من حـ/ العملاء\n  8,000 إلى حـ/ إيرادات الخدمات\n(تقديم خدمة بالأجل)',
              example_en: 'Dr. Accounts Receivable 8,000\n  Cr. Service Revenues 8,000\n(Service rendered on credit)'
            }
          ]
        }
      ]
    },
    {
      id: 5,
      name: 'المصروفات',
      name_en: 'Expenses',
      type: 'مدين',
      description: 'التكاليف التي تتحملها الشركة لتحقيق الإيرادات.',
      description_en: 'Outflows of resources incurred in the process of generating revenues.',
      subAccounts: [
        {
          name: 'مصروفات التشغيل',
          name_en: 'Operating Expenses',
          items: [
            { 
              name: 'مصروف الرواتب', 
              name_en: 'Salaries & Wages Expense', 
              code: '5101', 
              example: '6,000 من حـ/ الرواتب\n  6,000 إلى حـ/ البنك\n(سداد رواتب الموظفين)',
              example_en: 'Dr. Salaries Expense 6,000\n  Cr. Bank Account 6,000\n(Payment of employee payroll)'
            },
            { 
              name: 'مصروف الإيجار', 
              name_en: 'Rent Expense', 
              code: '5102', 
              example: '2,000 من حـ/ الإيجار\n  2,000 إلى حـ/ الصندوق\n(سداد إيجار المعرض)',
              example_en: 'Dr. Rent Expense 2,000\n  Cr. Cash on Hand 2,000\n(Payment of office/showroom rent)'
            }
          ]
        }
      ]
    }
  ];

function TreeItem({ item, isEn, onCopy }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[var(--border-color)]/60 rounded-xl bg-[var(--bg-main)]/50 p-3 transition-all hover:border-[var(--primary-accent)]/50">
      <div className="flex items-center justify-between gap-3 cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-2 min-w-0">
          <FileText size={15} className="text-[var(--primary-accent)] shrink-0" />
          <span className="font-bold text-sm text-[var(--text-primary)] truncate">{item.displayName}</span>
          <span className="font-mono text-xs px-2 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-muted)] shrink-0">
            {item.code}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCopy(item.displayExample);
            }}
            className="p-1.5 text-slate-400 hover:text-[var(--primary-accent)] hover:bg-[var(--primary-accent)]/10 rounded-lg transition-colors"
            title={isEn ? 'Copy entry example' : 'نسخ القيد المحاسبي'}
          >
            <Copy size={13} />
          </button>
          <span className="text-xs text-[var(--text-muted)]">
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </span>
        </div>
      </div>

      {open && (
        <div className="mt-3 pt-3 border-t border-[var(--border-color)]/60 animate-fade-in">
          <div className="bg-[#0A1128] border border-blue-500/20 rounded-xl p-3 shadow-inner" dir={isEn ? 'ltr' : 'rtl'}>
            <pre className="text-sky-400 font-mono text-xs font-semibold whitespace-pre-wrap m-0 leading-relaxed" dir={isEn ? 'ltr' : 'rtl'}>
              {item.displayExample}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

function TreeNode({ node, isEn, onCopy }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="ms-3 sm:ms-6 ps-3 border-s-2 border-[var(--border-color)]/60 my-2">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 py-1.5 cursor-pointer text-sm font-bold text-[var(--primary-accent)] hover:text-sky-300 transition-colors"
      >
        {isOpen ? <FolderOpen size={16} /> : <Folder size={16} />}
        <span>{node.displayName}</span>
        <span className="text-xs text-[var(--text-muted)] font-normal">({node.items.length})</span>
      </div>

      {isOpen && (
        <div className="space-y-2 mt-2 ms-2 sm:ms-4 animate-fade-in">
          {node.items.map((item, idx) => (
            <TreeItem key={idx} item={item} isEn={isEn} onCopy={onCopy} />
          ))}
        </div>
      )}
    </div>
  );
}

function ChartOfAccounts() {
  const { i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');
  const { addToast } = useToast();

  const [viewMode, setViewMode] = useState('tree'); // 'tree' or 'cards'
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSection, setExpandedSection] = useState(1);

  const accountsData = useMemo(() => {
    return RAW_ACCOUNTS_DATA.map(acc => ({
      ...acc,
      displayName: isEn && acc.name_en ? acc.name_en : acc.name,
      displayType: isEn ? (acc.type === 'مدين' ? 'Debit (Dr.)' : 'Credit (Cr.)') : acc.type,
      displayDesc: isEn && acc.description_en ? acc.description_en : acc.description,
      subAccounts: acc.subAccounts.map(sub => ({
        ...sub,
        displayName: isEn && sub.name_en ? sub.name_en : sub.name,
        items: sub.items.map(item => ({
          ...item,
          displayName: isEn && item.name_en ? item.name_en : item.name,
          displayExample: isEn && item.example_en ? item.example_en : item.example,
        })),
      })),
    }));
  }, [isEn]);

  const filteredAccounts = useMemo(() => {
    if (!searchTerm.trim()) return accountsData;
    const lower = searchTerm.toLowerCase();

    return accountsData.map(acc => {
      const matchAcc = acc.displayName.toLowerCase().includes(lower);
      const filteredSubs = acc.subAccounts.map(sub => {
        const matchSub = sub.displayName.toLowerCase().includes(lower);
        const filteredItems = sub.items.filter(item => 
          item.displayName.toLowerCase().includes(lower) || item.code.includes(lower)
        );
        if (matchSub || filteredItems.length > 0) {
          return { ...sub, items: matchSub ? sub.items : filteredItems };
        }
        return null;
      }).filter(Boolean);

      if (matchAcc || filteredSubs.length > 0) {
        return { ...acc, subAccounts: matchAcc ? acc.subAccounts : filteredSubs };
      }
      return null;
    }).filter(Boolean);
  }, [accountsData, searchTerm]);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    addToast(isEn ? 'Example copied to clipboard!' : 'تم نسخ القيد المحاسبي!');
  };

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="container py-12 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-gradient">
          {isEn ? 'Interactive Chart of Accounts' : 'دليل وشجرة الحسابات التفاعلية'}
        </h1>
        <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          {isEn 
            ? 'Interactive accounting chart of accounts with hierarchical tree view, codes, and double-entry examples.' 
            : 'دليل الحسابات الشامل مع شجرة هرمية تفاعلية، أكواد الحسابات، وأمثلة عملية للقيود اليومية.'}
        </p>
      </div>

      {/* Control Bar: Search & View Mode Switcher */}
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full sm:w-80">
          <Search size={18} className="absolute top-1/2 inset-inline-start-3.5 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isEn ? 'Search account or code (e.g. 1101)...' : 'ابحث عن حساب أو كود (مثال: 1101)...'}
            className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl py-2.5 ps-10 pe-4 text-sm focus:outline-none focus:border-[var(--primary-accent)] text-[var(--text-primary)]"
          />
        </div>

        <div className="inline-flex p-1 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] self-stretch sm:self-auto justify-center">
          <button
            onClick={() => setViewMode('tree')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'tree' ? 'bg-[var(--primary-accent)] text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Network size={15} />
            <span>{isEn ? 'Tree View' : 'الشجرة الهرمية'}</span>
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'cards' ? 'bg-[var(--primary-accent)] text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <LayoutGrid size={15} />
            <span>{isEn ? 'Cards View' : 'عرض البطاقات'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Render */}
      <div className="max-w-4xl mx-auto space-y-4">
        {filteredAccounts.length === 0 ? (
          <div className="text-center p-12 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)]">
            <p className="text-lg text-[var(--text-muted)] m-0">
              {isEn ? 'No accounts matched your search keyword.' : 'لم يتم العثور على حسابات تطابق كلمة البحث.'}
            </p>
          </div>
        ) : viewMode === 'tree' ? (
          /* Tree View */
          <div className="space-y-4">
            {filteredAccounts.map(account => (
              <div key={account.id} className="glass-panel border border-[var(--border-color)] rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between gap-3 border-b border-[var(--border-color)]/60 pb-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="w-3 h-3 rounded-full bg-[var(--primary-accent)] shadow-sm"></span>
                    <h2 className="text-xl sm:text-2xl font-black m-0 text-[var(--text-primary)]">{account.displayName}</h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      account.type === 'مدين' 
                        ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30' 
                        : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                    }`}>
                      {account.displayType}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  {account.subAccounts.map((sub, idx) => (
                    <TreeNode key={idx} node={sub} isEn={isEn} onCopy={copyText} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Cards View */
          filteredAccounts.map((account) => (
            <div key={account.id} className="glass-panel border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-sm">
              <button 
                onClick={() => toggleSection(account.id)}
                className="w-full flex items-center justify-between p-6 bg-[var(--bg-card)] hover:bg-[var(--bg-tertiary)]/50 transition-colors text-start"
                aria-expanded={expandedSection === account.id}
              >
                <div className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-xl sm:text-2xl font-bold m-0 text-[var(--text-primary)]">{account.displayName}</h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      account.type === 'مدين' 
                        ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30' 
                        : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                    }`}>
                      {isEn ? `Nature: ${account.displayType}` : `طبيعة الحساب: ${account.type}`}
                    </span>
                  </div>
                  <p className="text-[var(--text-secondary)] text-xs sm:text-sm m-0 leading-relaxed">{account.displayDesc}</p>
                </div>
                <div className="p-1 rounded-lg bg-[var(--bg-main)] text-[var(--text-muted)] shrink-0 ms-3">
                  {expandedSection === account.id ? <ChevronUp size={20} className="text-[var(--primary-accent)]" /> : <ChevronDown size={20} />}
                </div>
              </button>

              {expandedSection === account.id && (
                <div className="p-5 sm:p-7 bg-[var(--bg-card)] border-t border-[var(--border-color)]">
                  {account.subAccounts.map((sub, idx) => (
                    <div key={idx} className="mb-7 last:mb-0">
                      <h3 className="text-base sm:text-lg font-bold mb-4 text-[var(--primary-accent)] border-b border-[var(--border-color)] pb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--primary-accent)]"></span>
                        <span>{sub.displayName}</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sub.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="bg-[var(--bg-dark)] p-4 sm:p-5 rounded-2xl border border-[var(--border-color)] flex flex-col justify-between">
                            <div className="flex justify-between items-center mb-3 gap-2">
                              <h4 className="font-bold text-sm sm:text-base m-0 flex items-center gap-2 text-[var(--text-primary)]">
                                <FileText size={16} className="text-[var(--primary-accent)] shrink-0"/> 
                                <span>{item.displayName}</span>
                              </h4>
                              <div className="flex items-center gap-2">
                                <span className="bg-[var(--bg-card)] px-2.5 py-1 rounded-lg text-xs text-[var(--text-muted)] font-mono border border-[var(--border-color)] shrink-0">
                                  {isEn ? `Code: ${item.code}` : `رقم: ${item.code}`}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => copyText(item.displayExample)}
                                  className="p-1.5 text-slate-400 hover:text-emerald-400 rounded-lg hover:bg-white/10"
                                  title={isEn ? 'Copy' : 'نسخ'}
                                >
                                  <Copy size={14} />
                                </button>
                              </div>
                            </div>
                            <div className="bg-[#090D16] border border-white/10 rounded-xl p-3.5 shadow-inner" dir={isEn ? "ltr" : "rtl"}>
                              <pre className="text-emerald-400 font-mono text-xs md:text-sm whitespace-pre-wrap font-semibold m-0 leading-relaxed" dir={isEn ? "ltr" : "rtl"}>
                                {item.displayExample}
                              </pre>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ChartOfAccounts;
