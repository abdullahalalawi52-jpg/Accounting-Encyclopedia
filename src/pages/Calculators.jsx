import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';
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
} from '../utils/accountingMath.js';
import './Calculators.css';

function VATCalculator({ isEn }) {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState(15);
  const [type, setType] = useState('exclude'); // 'exclude' (add VAT) or 'include' (extract VAT)

  const { baseAmount, vatAmount, totalAmount } = useMemo(() => {
    return calculateVAT(amount, rate, type === 'include');
  }, [amount, rate, type]);

  const numAmount = parseFloat(amount) || 0;

  return (
    <div className="calc-container animate-fade-in">
      <h2>{isEn ? 'VAT Calculator' : 'حاسبة ضريبة القيمة المضافة'}</h2>
      
      <div className="calc-input-group flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" checked={type === 'exclude'} onChange={() => setType('exclude')} />
          {isEn ? 'Amount excludes tax' : 'المبلغ غير شامل الضريبة'}
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" checked={type === 'include'} onChange={() => setType('include')} />
          {isEn ? 'Amount includes tax' : 'المبلغ شامل الضريبة'}
        </label>
      </div>

      <div className="calc-input-group">
        <label htmlFor="vat-amount">{isEn ? 'Amount' : 'المبلغ'}</label>
        <input 
          id="vat-amount"
          type="number" 
          className="calc-input" 
          value={amount} 
          onChange={e => setAmount(e.target.value)} 
          placeholder={isEn ? 'Enter amount...' : 'أدخل المبلغ...'} 
        />
      </div>
      
      <div className="calc-input-group">
        <label htmlFor="vat-rate">{isEn ? 'Tax Rate (%)' : 'نسبة الضريبة (%)'}</label>
        <input 
          id="vat-rate"
          type="number" 
          className="calc-input" 
          value={rate} 
          onChange={e => setRate(e.target.value)} 
        />
      </div>

      {numAmount > 0 && (
        <div className="calc-result">
          <h3>{isEn ? 'Calculated VAT' : 'الضريبة المستحقة'}</h3>
          <div className="amount">{vatAmount.toFixed(2)}</div>
          <div className="flex justify-between mt-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <span>{isEn ? `Net Amount: ${baseAmount.toFixed(2)}` : `المبلغ الصافي: ${baseAmount.toFixed(2)}`}</span>
            <span>{isEn ? `Gross Amount: ${totalAmount.toFixed(2)}` : `الإجمالي: ${totalAmount.toFixed(2)}`}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function ZakatCalculator({ isEn }) {
  const [mode, setMode] = useState('individual'); // 'individual' | 'corporate'
  const [calendar, setCalendar] = useState('hijri'); // 'hijri' (2.5%) | 'gregorian' (2.577%)

  // Individual states
  const [cash, setCash] = useState('');
  const [goldSilver, setGoldSilver] = useState('');
  const [stocks, setStocks] = useState('');
  const [inventory, setInventory] = useState('');
  const [goodDebts, setGoodDebts] = useState('');
  const [immediateDebts, setImmediateDebts] = useState('');
  const [goldPrice, setGoldPrice] = useState('320'); // SAR / 24k gram

  // Corporate states
  const [capital, setCapital] = useState('');
  const [retainedEarnings, setRetainedEarnings] = useState('');
  const [provisions, setProvisions] = useState('');
  const [longTermDebt, setLongTermDebt] = useState('');
  const [netFixedAssets, setNetFixedAssets] = useState('');
  const [investments, setInvestments] = useState('');
  const [otherDeductions, setOtherDeductions] = useState('');
  const [adjustedProfit, setAdjustedProfit] = useState('');

  const indResult = useMemo(() => {
    return calculateIndividualZakat({
      cash,
      goldSilver,
      stocks,
      inventory,
      goodDebts,
      immediateDebts,
      goldPricePerGram: goldPrice,
      calendar,
    });
  }, [cash, goldSilver, stocks, inventory, goodDebts, immediateDebts, goldPrice, calendar]);

  const corpResult = useMemo(() => {
    return calculateCorporateZakat({
      capital,
      retainedEarnings,
      provisions,
      longTermDebt,
      netFixedAssets,
      investments,
      otherDeductions,
      adjustedProfit,
      calendar,
    });
  }, [capital, retainedEarnings, provisions, longTermDebt, netFixedAssets, investments, otherDeductions, adjustedProfit, calendar]);

  return (
    <div className="calc-container calc-container-wide animate-fade-in">
      <h2>{isEn ? 'Islamic Zakat Calculator (Individuals & Companies)' : 'حاسبة الزكاة الشرعية (للأفراد والشركات)'}</h2>
      
      {/* Mode & Calendar Selection */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-2">
          <button 
            type="button" 
            className={`calc-toggle-btn ${mode === 'individual' ? 'active' : ''}`}
            onClick={() => setMode('individual')}
          >
            {isEn ? 'Individual Wealth & Assets' : 'زكاة الأفراد والأموال'}
          </button>
          <button 
            type="button" 
            className={`calc-toggle-btn ${mode === 'corporate' ? 'active' : ''}`}
            onClick={() => setMode('corporate')}
          >
            {isEn ? 'Corporate Zakat (ZATCA)' : 'زكاة الشركات (المصادر والحسميات)'}
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-[var(--text-secondary)] font-medium">{isEn ? 'Basis Year:' : 'سنة الحول:'}</span>
          <button
            type="button"
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
              calendar === 'hijri'
                ? 'bg-[var(--primary-accent)]/20 border-[var(--primary-accent)] text-[var(--primary-accent)] font-bold'
                : 'bg-[var(--bg-dark)] border-[var(--border-color)] text-[var(--text-secondary)]'
            }`}
            onClick={() => setCalendar('hijri')}
          >
            {isEn ? 'Hijri (2.5%)' : 'هجري (2.5%)'}
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
              calendar === 'gregorian'
                ? 'bg-[var(--primary-accent)]/20 border-[var(--primary-accent)] text-[var(--primary-accent)] font-bold'
                : 'bg-[var(--bg-dark)] border-[var(--border-color)] text-[var(--text-secondary)]'
            }`}
            onClick={() => setCalendar('gregorian')}
          >
            {isEn ? 'Gregorian (2.577%)' : 'ميلادي (2.577%)'}
          </button>
        </div>
      </div>

      {mode === 'individual' ? (
        <div>
          <p className="text-xs text-[var(--text-muted)] mb-4">
            {isEn 
              ? 'Calculate Zakat on cash, gold, stocks, trade inventory, minus short-term debts with gold Nisab check (85g 24k).' 
              : 'احسب زكاة السيولة، الذهب، الأسهم، عروض التجارة، مخصوماً منها الديون العاجلة مع التحقق التلقائي من النصاب (85 جرام ذهب عيار 24).'}
          </p>

          <div className="calc-grid-2">
            <div className="calc-input-group">
              <label htmlFor="ind-cash">{isEn ? 'Cash on Hand & Banks' : 'السيولة النقدية والودائع البنكية'}</label>
              <input 
                id="ind-cash"
                type="number" 
                className="calc-input" 
                value={cash} 
                onChange={e => setCash(e.target.value)} 
                placeholder="0"
              />
            </div>

            <div className="calc-input-group">
              <label htmlFor="ind-gold">{isEn ? 'Gold & Silver for Investment' : 'قيمة الذهب والفضة للادخار والاستثمار'}</label>
              <input 
                id="ind-gold"
                type="number" 
                className="calc-input" 
                value={goldSilver} 
                onChange={e => setGoldSilver(e.target.value)} 
                placeholder="0"
              />
            </div>

            <div className="calc-input-group">
              <label htmlFor="ind-stocks">{isEn ? 'Stocks & Investment Funds' : 'الأسهم والصناديق (للمضاربة/التجارة)'}</label>
              <input 
                id="ind-stocks"
                type="number" 
                className="calc-input" 
                value={stocks} 
                onChange={e => setStocks(e.target.value)} 
                placeholder="0"
              />
            </div>

            <div className="calc-input-group">
              <label htmlFor="ind-inventory">{isEn ? 'Business Inventory / Resale Goods' : 'قيمة عروض التجارة والبضائع المعدة للبيع'}</label>
              <input 
                id="ind-inventory"
                type="number" 
                className="calc-input" 
                value={inventory} 
                onChange={e => setInventory(e.target.value)} 
                placeholder="0"
              />
            </div>

            <div className="calc-input-group">
              <label htmlFor="ind-debts-rec">{isEn ? 'Collectible Debts (Good Receivables)' : 'الديون المرجوة التحصيل لدى الآخرين'}</label>
              <input 
                id="ind-debts-rec"
                type="number" 
                className="calc-input" 
                value={goodDebts} 
                onChange={e => setGoodDebts(e.target.value)} 
                placeholder="0"
              />
            </div>

            <div className="calc-input-group">
              <label htmlFor="ind-debts-due">{isEn ? 'Immediate Liabilities Due This Year (-)' : 'الديون والالتزامات العاجلة المستحقة عليك (-)'}</label>
              <input 
                id="ind-debts-due"
                type="number" 
                className="calc-input" 
                value={immediateDebts} 
                onChange={e => setImmediateDebts(e.target.value)} 
                placeholder="0"
              />
            </div>

            <div className="calc-input-group">
              <label htmlFor="ind-gold-price">{isEn ? '24k Gold Price / Gram (Nisab Basis)' : 'سعر جرام الذهب عيار 24 (لحساب النصاب)'}</label>
              <input 
                id="ind-gold-price"
                type="number" 
                className="calc-input" 
                value={goldPrice} 
                onChange={e => setGoldPrice(e.target.value)} 
                placeholder="320"
              />
            </div>
          </div>

          {/* Individual Result Card */}
          <div className="calc-result mt-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                indResult.isNisabReached 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}>
                {indResult.isNisabReached 
                  ? (isEn ? `✓ Reached Nisab (>= ${indResult.nisabThreshold.toLocaleString()})` : `✓ بلغ النصاب الشرعي (>= ${indResult.nisabThreshold.toLocaleString()} ريال)`)
                  : (isEn ? `✕ Below Nisab (< ${indResult.nisabThreshold.toLocaleString()})` : `✕ لم يبلغ النصاب الشرعي (< ${indResult.nisabThreshold.toLocaleString()} ريال)`)}
              </span>
            </div>

            <h3>{isEn ? 'Zakat Due' : 'مقدار الزكاة الشرعية الواجبة'}</h3>
            <div className="amount text-emerald-400">
              {indResult.zakatDue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-emerald-500/20 text-xs text-[var(--text-secondary)]">
              <div>
                <span className="block opacity-75">{isEn ? 'Total Assets' : 'إجمالي الأصول'}</span>
                <span className="font-bold text-[var(--text-primary)] text-sm">{indResult.totalAssets.toLocaleString()}</span>
              </div>
              <div>
                <span className="block opacity-75">{isEn ? 'Deducted Debts' : 'الديون المخصومة'}</span>
                <span className="font-bold text-rose-400 text-sm">-{indResult.totalDeductions.toLocaleString()}</span>
              </div>
              <div>
                <span className="block opacity-75">{isEn ? 'Net Zakat Base' : 'صافي الوعاء الزكوي'}</span>
                <span className="font-bold text-emerald-400 text-sm">{indResult.netZakatBase.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-xs text-[var(--text-muted)] mb-4">
            {isEn 
              ? 'Corporate Zakat calculation based on ZATCA Sources of Funds Method: (Capital + Reserves + Provisions + Long-term Debt) - (Fixed Assets + Investments) + Adjusted Net Profit.' 
              : 'طريقة مصادر الأموال المعتمدة لدى هيئة الزكاة والضريبة والجمارك (ZATCA): (رأس المال + الاحتياطيات + المخصصات + القروض طويلة الأجل) - (الأصول الثابتة + الاستثمارات) + صافي الربح المعدل.'}
          </p>

          <div className="calc-grid-2">
            <div className="calc-input-group">
              <label htmlFor="corp-capital">{isEn ? 'Paid-up Capital (+)' : 'رأس المال المدفوع (+)'}</label>
              <input 
                id="corp-capital"
                type="number" 
                className="calc-input" 
                value={capital} 
                onChange={e => setCapital(e.target.value)} 
                placeholder="0"
              />
            </div>

            <div className="calc-input-group">
              <label htmlFor="corp-retained">{isEn ? 'Retained Earnings & Reserves (+)' : 'الأرباح المدورة والاحتياطيات (+)'}</label>
              <input 
                id="corp-retained"
                type="number" 
                className="calc-input" 
                value={retainedEarnings} 
                onChange={e => setRetainedEarnings(e.target.value)} 
                placeholder="0"
              />
            </div>

            <div className="calc-input-group">
              <label htmlFor="corp-provisions">{isEn ? 'End-of-Service & Long Provisions (+)' : 'مخصصات نهاية الخدمة والمخصصات طويلة الأجل (+)'}</label>
              <input 
                id="corp-provisions"
                type="number" 
                className="calc-input" 
                value={provisions} 
                onChange={e => setProvisions(e.target.value)} 
                placeholder="0"
              />
            </div>

            <div className="calc-input-group">
              <label htmlFor="corp-debt">{isEn ? 'Long-term Debt & Financing (+)' : 'الديون والقروض التمويلية طويلة الأجل (+)'}</label>
              <input 
                id="corp-debt"
                type="number" 
                className="calc-input" 
                value={longTermDebt} 
                onChange={e => setLongTermDebt(e.target.value)} 
                placeholder="0"
              />
            </div>

            <div className="calc-input-group">
              <label htmlFor="corp-assets">{isEn ? 'Net Fixed Assets (PPE) (-)' : 'صافي الأصول الثابتة (بعد مجمع الإهلاك) (-)'}</label>
              <input 
                id="corp-assets"
                type="number" 
                className="calc-input" 
                value={netFixedAssets} 
                onChange={e => setNetFixedAssets(e.target.value)} 
                placeholder="0"
              />
            </div>

            <div className="calc-input-group">
              <label htmlFor="corp-investments">{isEn ? 'Long-term Investments (-)' : 'استثمارات طويلة الأجل في شركات تابعة (-)'}</label>
              <input 
                id="corp-investments"
                type="number" 
                className="calc-input" 
                value={investments} 
                onChange={e => setInvestments(e.target.value)} 
                placeholder="0"
              />
            </div>

            <div className="calc-input-group">
              <label htmlFor="corp-other-ded">{isEn ? 'Other Deductions / Intangibles (-)' : 'حسميات نظامية أخرى / أصول غير ملموسة (-)'}</label>
              <input 
                id="corp-other-ded"
                type="number" 
                className="calc-input" 
                value={otherDeductions} 
                onChange={e => setOtherDeductions(e.target.value)} 
                placeholder="0"
              />
            </div>

            <div className="calc-input-group">
              <label htmlFor="corp-profit">{isEn ? 'Adjusted Net Profit for the Year (+)' : 'صافي الربح المعدل للعام (+)'}</label>
              <input 
                id="corp-profit"
                type="number" 
                className="calc-input" 
                value={adjustedProfit} 
                onChange={e => setAdjustedProfit(e.target.value)} 
                placeholder="0"
              />
            </div>
          </div>

          {/* Corporate Result Card */}
          <div className="calc-result mt-6">
            <h3>{isEn ? 'Corporate Zakat Due' : 'الزكاة المستحقة على الشركة'}</h3>
            <div className="amount text-emerald-400">
              {corpResult.zakatDue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-emerald-500/20 text-xs text-[var(--text-secondary)]">
              <div>
                <span className="block opacity-75">{isEn ? 'Total Sources' : 'إجمالي المصادر'}</span>
                <span className="font-bold text-[var(--text-primary)] text-sm">{corpResult.totalSources.toLocaleString()}</span>
              </div>
              <div>
                <span className="block opacity-75">{isEn ? 'Total Deductions' : 'إجمالي الحسميات'}</span>
                <span className="font-bold text-rose-400 text-sm">-{corpResult.totalDeductions.toLocaleString()}</span>
              </div>
              <div>
                <span className="block opacity-75">{isEn ? 'Adjusted Profit' : 'الربح المعدل'}</span>
                <span className="font-bold text-[var(--text-primary)] text-sm">+{corpResult.adjustedProfit.toLocaleString()}</span>
              </div>
              <div>
                <span className="block opacity-75">{isEn ? 'Zakat Base' : 'وعاء الزكاة'}</span>
                <span className="font-bold text-emerald-400 text-sm">{corpResult.zakatBase.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function DepreciationCalculator({ isEn }) {
  const [cost, setCost] = useState('');
  const [salvage, setSalvage] = useState('');
  const [life, setLife] = useState('');

  const { depreciableBase, annualDepreciation, monthlyDepreciation } = useMemo(() => {
    return calculateStraightLineDepreciation(cost, salvage, life);
  }, [cost, salvage, life]);

  const numCost = parseFloat(cost) || 0;

  return (
    <div className="calc-container animate-fade-in">
      <h2>{isEn ? 'Depreciation Calculator (Straight-Line)' : 'حاسبة الإهلاك (القسط الثابت)'}</h2>
      
      <div className="calc-input-group">
        <label htmlFor="dep-cost">{isEn ? 'Asset Cost' : 'تكلفة الأصل'}</label>
        <input 
          id="dep-cost"
          type="number" 
          className="calc-input" 
          value={cost} 
          onChange={e => setCost(e.target.value)} 
          placeholder={isEn ? 'Asset cost...' : 'تكلفة الأصل...'}
        />
      </div>
      
      <div className="calc-input-group">
        <label htmlFor="dep-salvage">{isEn ? 'Salvage Value' : 'قيمة الخردة (القيمة التخريدية)'}</label>
        <input 
          id="dep-salvage"
          type="number" 
          className="calc-input" 
          value={salvage} 
          onChange={e => setSalvage(e.target.value)} 
          placeholder={isEn ? 'Salvage value...' : 'قيمة الخردة...'}
        />
      </div>

      <div className="calc-input-group">
        <label htmlFor="dep-life">{isEn ? 'Useful Life (Years)' : 'العمر الإنتاجي المقدر (بالسنوات)'}</label>
        <input 
          id="dep-life"
          type="number" 
          className="calc-input" 
          value={life} 
          onChange={e => setLife(e.target.value)} 
          placeholder={isEn ? 'Useful life in years...' : 'السنوات...'}
        />
      </div>

      {numCost > 0 && (
        <div className="calc-result">
          <h3>{isEn ? 'Annual Depreciation' : 'قسط الإهلاك السنوي'}</h3>
          <div className="amount">{annualDepreciation.toFixed(2)}</div>
          <div className="flex justify-between mt-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <span>{isEn ? `Depreciable Base: ${depreciableBase.toFixed(2)}` : `القيمة القابلة للإهلاك: ${depreciableBase.toFixed(2)}`}</span>
            <span>{isEn ? `Monthly: ${monthlyDepreciation.toFixed(2)}` : `الشهري: ${monthlyDepreciation.toFixed(2)}`}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function BreakEvenCalculator({ isEn }) {
  const [fixedCosts, setFixedCosts] = useState('');
  const [price, setPrice] = useState('');
  const [variableCost, setVariableCost] = useState('');

  const { contributionMargin, breakEvenUnits, breakEvenRevenue, isValid } = useMemo(() => {
    return calculateBreakEven(fixedCosts, price, variableCost);
  }, [fixedCosts, price, variableCost]);

  return (
    <div className="calc-container animate-fade-in">
      <h2>{isEn ? 'Break-Even Point Calculator' : 'حاسبة نقطة التعادل'}</h2>
      
      <div className="calc-input-group">
        <label htmlFor="be-fixed">{isEn ? 'Total Fixed Costs' : 'التكاليف الثابتة الكلية'}</label>
        <input 
          id="be-fixed"
          type="number" 
          className="calc-input" 
          value={fixedCosts} 
          onChange={e => setFixedCosts(e.target.value)} 
          placeholder={isEn ? 'Total fixed costs...' : 'إجمالي التكاليف الثابتة...'}
        />
      </div>
      
      <div className="calc-input-group">
        <label htmlFor="be-price">{isEn ? 'Unit Selling Price' : 'سعر بيع الوحدة'}</label>
        <input 
          id="be-price"
          type="number" 
          className="calc-input" 
          value={price} 
          onChange={e => setPrice(e.target.value)} 
          placeholder={isEn ? 'Unit selling price...' : 'سعر البيع...'}
        />
      </div>

      <div className="calc-input-group">
        <label htmlFor="be-var">{isEn ? 'Unit Variable Cost' : 'التكلفة المتغيرة للوحدة'}</label>
        <input 
          id="be-var"
          type="number" 
          className="calc-input" 
          value={variableCost} 
          onChange={e => setVariableCost(e.target.value)} 
          placeholder={isEn ? 'Variable cost per unit...' : 'التكلفة المتغيرة...'}
        />
      </div>

      {isValid && (
        <div className="calc-result">
          <h3>{isEn ? 'Break-Even Point (Units)' : 'نقطة التعادل (بالوحدات)'}</h3>
          <div className="amount">{breakEvenUnits} {isEn ? 'Units' : 'وحدة'}</div>
          <div className="flex justify-between mt-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <span>{isEn ? `Margin/Unit: ${contributionMargin.toFixed(2)}` : `هامش المساهمة: ${contributionMargin.toFixed(2)}`}</span>
            <span>{isEn ? `Required Revenue: ${breakEvenRevenue.toFixed(2)}` : `إيراد التعادل: ${breakEvenRevenue.toFixed(2)}`}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function EndOfServiceCalculator({ isEn }) {
  const [salary, setSalary] = useState('');
  const [years, setYears] = useState('');
  const [resignationType, setResignationType] = useState('termination'); // termination or resignation

  const { basicReward, totalReward } = useMemo(() => {
    return calculateEndOfService(salary, years, resignationType);
  }, [salary, years, resignationType]);

  const numSalary = parseFloat(salary) || 0;
  const numYears = parseFloat(years) || 0;

  return (
    <div className="calc-container animate-fade-in">
      <h2>{isEn ? 'End of Service Gratuity Calculator' : 'حاسبة مكافأة نهاية الخدمة (السعودية - تقريبي)'}</h2>
      
      <div className="calc-input-group flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" checked={resignationType === 'termination'} onChange={() => setResignationType('termination')} />
          {isEn ? 'Contract End / Termination' : 'نهاية عقد / فصل'}
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" checked={resignationType === 'resignation'} onChange={() => setResignationType('resignation')} />
          {isEn ? 'Resignation' : 'استقالة'}
        </label>
      </div>

      <div className="calc-input-group">
        <label htmlFor="eos-salary">{isEn ? 'Last Basic Salary (including fixed allowances)' : 'الراتب الأخير (شامل البدلات الثابتة)'}</label>
        <input 
          id="eos-salary"
          type="number" 
          className="calc-input" 
          value={salary} 
          onChange={e => setSalary(e.target.value)} 
          placeholder={isEn ? 'Last salary...' : 'الراتب الأخير...'}
        />
      </div>
      
      <div className="calc-input-group">
        <label htmlFor="eos-years">{isEn ? 'Service Duration (Years)' : 'مدة الخدمة (بالسنوات)'}</label>
        <input 
          id="eos-years"
          type="number" 
          step="0.1" 
          className="calc-input" 
          value={years} 
          onChange={e => setYears(e.target.value)} 
          placeholder={isEn ? 'Years of service...' : 'سنوات الخدمة...'}
        />
      </div>

      {numSalary > 0 && numYears > 0 && (
        <div className="calc-result">
          <h3>{isEn ? 'Entitled Gratuity' : 'المكافأة المستحقة'}</h3>
          <div className="amount">{totalReward.toFixed(2)}</div>
          {resignationType === 'resignation' && (
            <div className="mt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
              {isEn ? `Basic calculated reward: ${basicReward.toFixed(2)}` : `المكافأة الأساسية قبل استحقاق الاستقالة: ${basicReward.toFixed(2)}`}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PresentValueCalculator({ isEn }) {
  const [futureValue, setFutureValue] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');

  const { presentValue } = useMemo(() => {
    return calculatePresentValue(futureValue, rate, years);
  }, [futureValue, rate, years]);

  const fv = parseFloat(futureValue) || 0;
  const r = parseFloat(rate) || 0;
  const n = parseFloat(years) || 0;

  return (
    <div className="calc-container animate-fade-in">
      <h2>{isEn ? 'Present Value Calculator (PV)' : 'حاسبة القيمة الحالية (Present Value)'}</h2>
      
      <div className="calc-input-group">
        <label htmlFor="pv-fv">{isEn ? 'Expected Future Value (FV)' : 'القيمة المستقبلية المتوقعة (FV)'}</label>
        <input 
          id="pv-fv"
          type="number" 
          className="calc-input" 
          value={futureValue} 
          onChange={e => setFutureValue(e.target.value)} 
          placeholder={isEn ? 'Future cash amount...' : 'المبلغ المستقبلي...'}
        />
      </div>
      
      <div className="calc-input-group">
        <label htmlFor="pv-rate">{isEn ? 'Annual Discount / Interest Rate (%)' : 'معدل الخصم / الفائدة السنوي (%)'}</label>
        <input 
          id="pv-rate"
          type="number" 
          className="calc-input" 
          value={rate} 
          onChange={e => setRate(e.target.value)} 
          placeholder={isEn ? 'Discount rate %...' : 'معدل الخصم...'}
        />
      </div>

      <div className="calc-input-group">
        <label htmlFor="pv-years">{isEn ? 'Number of Years' : 'عدد السنوات'}</label>
        <input 
          id="pv-years"
          type="number" 
          className="calc-input" 
          value={years} 
          onChange={e => setYears(e.target.value)} 
          placeholder={isEn ? 'Number of periods...' : 'السنوات...'}
        />
      </div>

      {fv > 0 && r > 0 && n > 0 && (
        <div className="calc-result">
          <h3>{isEn ? 'Present Value (PV)' : 'القيمة الحالية (PV)'}</h3>
          <div className="amount">{presentValue.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
}

function NPVCalculator({ isEn }) {
  const [discountRate, setDiscountRate] = useState('10');
  const [initialInvestment, setInitialInvestment] = useState('100000');
  const [cashFlows, setCashFlows] = useState(['40000', '50000', '60000']);

  const parsedFlows = useMemo(() => cashFlows.map(f => parseFloat(f) || 0), [cashFlows]);

  const npvResult = useMemo(() => {
    return calculateNPV(discountRate, initialInvestment, parsedFlows);
  }, [discountRate, initialInvestment, parsedFlows]);

  const irrResult = useMemo(() => {
    return calculateIRR(initialInvestment, parsedFlows);
  }, [initialInvestment, parsedFlows]);

  const addPeriod = () => {
    setCashFlows(prev => [...prev, '30000']);
  };

  const removePeriod = (index) => {
    if (cashFlows.length <= 1) return;
    setCashFlows(prev => prev.filter((_, i) => i !== index));
  };

  const updateCashFlow = (index, val) => {
    setCashFlows(prev => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  return (
    <div className="calc-container animate-fade-in">
      <h2>{isEn ? 'Net Present Value (NPV) & IRR Calculator' : 'حاسبة صافي القيمة الحالية (NPV) ومعدل العائد الداخلي (IRR)'}</h2>
      
      <div className="calc-input-group">
        <label htmlFor="npv-rate">{isEn ? 'Required Discount Rate / Cost of Capital (%)' : 'معدل الخصم / تكلفة رأس المال (%)'}</label>
        <input
          id="npv-rate"
          type="number"
          className="calc-input"
          value={discountRate}
          onChange={e => setDiscountRate(e.target.value)}
        />
      </div>

      <div className="calc-input-group">
        <label htmlFor="npv-inv">{isEn ? 'Initial Investment / Outlay (Period 0)' : 'الاستثمار المبدئي الأولي (الفترة 0)'}</label>
        <input
          id="npv-inv"
          type="number"
          className="calc-input"
          value={initialInvestment}
          onChange={e => setInitialInvestment(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="font-bold text-sm text-[var(--text-primary)]">
            {isEn ? 'Expected Periodic Cash Inflows:' : 'التدفقات النقدية الداخلة المتوقعة للسنوات:'}
          </label>
          <button
            type="button"
            onClick={addPeriod}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 px-3 py-1 bg-emerald-500/10 rounded-lg border border-emerald-500/20"
          >
            {isEn ? '+ Add Year / Period' : '+ إضافة سنة جديدة'}
          </button>
        </div>

        <div className="space-y-2">
          {cashFlows.map((cf, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-xs text-[var(--text-muted)] font-mono w-16 shrink-0">
                {isEn ? `Year ${idx + 1}:` : `السنة ${idx + 1}:`}
              </span>
              <input
                type="number"
                value={cf}
                onChange={e => updateCashFlow(idx, e.target.value)}
                className="calc-input py-2 text-sm flex-1"
                placeholder="0.00"
              />
              {cashFlows.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePeriod(idx)}
                  className="text-rose-400 hover:text-rose-300 p-2 text-xs"
                  title="حذف السنة"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {npvResult.initialInvestment > 0 && (
        <div className="calc-result">
          <h3>{isEn ? 'Net Present Value (NPV)' : 'صافي القيمة الحالية (NPV)'}</h3>
          <div className={`amount ${npvResult.isProfitable ? 'text-emerald-400' : 'text-rose-400'}`}>
            {npvResult.npv.toFixed(2)}
          </div>
          <div className="flex flex-wrap justify-between gap-2 mt-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <span>
              {isEn ? `Discounted Inflows: ${npvResult.totalDiscountedInflows.toFixed(2)}` : `القيمة المخصومة للتدفقات: ${npvResult.totalDiscountedInflows.toFixed(2)}`}
            </span>
            <span>
              {isEn ? 'Internal Rate of Return (IRR):' : 'معدل العائد الداخلي (IRR):'}{' '}
              <strong className="text-[var(--primary-accent)]">
                {irrResult.isValid ? `${irrResult.irrPercentage}%` : 'N/A'}
              </strong>
            </span>
          </div>

          <div className="mt-3 p-3 rounded-xl bg-[var(--bg-main)]/60 text-xs font-semibold">
            {npvResult.isProfitable ? (
              <span className="text-emerald-400">
                {isEn ? '✅ Feasible Project: NPV is positive, investment adds shareholder value.' : '✅ المشروع مجدٍ مالياً: صافي القيمة الحالية موجب ويفوق تكلفة رأس المال.'}
              </span>
            ) : (
              <span className="text-rose-400">
                {isEn ? '❌ Unfeasible Project: NPV is negative, expected returns do not cover cost of capital.' : '❌ المشروع غير مجدٍ: صافي القيمة الحالية سالب ولا يغطي تكلفة الفرصة البديلة.'}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function LoanCalculator({ isEn }) {
  const [principal, setPrincipal] = useState('120000');
  const [annualRate, setAnnualRate] = useState('6');
  const [termMonths, setTermMonths] = useState('12');

  const { monthlyPayment, totalPayment, totalInterest, schedule } = useMemo(() => {
    return calculateLoanAmortization(principal, annualRate, termMonths);
  }, [principal, annualRate, termMonths]);

  const p = parseFloat(principal) || 0;

  return (
    <div className="calc-container animate-fade-in">
      <h2>{isEn ? 'Loan Amortization Schedule Calculator' : 'حاسبة أقساط القروض وجدول الإطفاء التفصيلي'}</h2>
      
      <div className="calc-input-group">
        <label htmlFor="loan-p">{isEn ? 'Loan Principal Amount' : 'مبلغ القرض (أصل التمويل)'}</label>
        <input
          id="loan-p"
          type="number"
          className="calc-input"
          value={principal}
          onChange={e => setPrincipal(e.target.value)}
          placeholder={isEn ? 'e.g. 100,000' : 'مثال: 100,000'}
        />
      </div>

      <div className="calc-input-group">
        <label htmlFor="loan-r">{isEn ? 'Annual Interest / Profit Rate (%)' : 'معدل الفائدة / الربح السنوي (%)'}</label>
        <input
          id="loan-r"
          type="number"
          step="0.1"
          className="calc-input"
          value={annualRate}
          onChange={e => setAnnualRate(e.target.value)}
          placeholder="6.0"
        />
      </div>

      <div className="calc-input-group">
        <label htmlFor="loan-n">{isEn ? 'Loan Duration (Months)' : 'مدة التمويل (بالأشهر)'}</label>
        <input
          id="loan-n"
          type="number"
          className="calc-input"
          value={termMonths}
          onChange={e => setTermMonths(e.target.value)}
          placeholder="12"
        />
      </div>

      {p > 0 && (
        <>
          <div className="calc-result mb-6">
            <h3>{isEn ? 'Monthly Installment' : 'القسط الشهري المستحق'}</h3>
            <div className="amount text-emerald-400">{monthlyPayment.toFixed(2)}</div>
            <div className="flex flex-wrap justify-between gap-4 mt-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <span>{isEn ? `Total Loan Repayment: ${totalPayment.toFixed(2)}` : `إجمالي السداد: ${totalPayment.toFixed(2)}`}</span>
              <span>{isEn ? `Total Interest / Margin: ${totalInterest.toFixed(2)}` : `إجمالي الفوائد / الأرباح: ${totalInterest.toFixed(2)}`}</span>
            </div>
          </div>

          {/* Schedule Table */}
          {schedule.length > 0 && (
            <div className="mt-6">
              <h4 className="font-bold text-sm text-[var(--text-primary)] mb-3">
                {isEn ? 'Monthly Amortization Schedule:' : 'جدول إطفاء وسداد الأقساط شهرياً:'}
              </h4>
              <div className="overflow-x-auto max-h-72 overflow-y-auto rounded-xl border border-[var(--border-color)]">
                <table className="w-full text-xs text-start font-mono">
                  <thead className="bg-[var(--bg-main)] text-[var(--text-muted)] sticky top-0 border-b border-[var(--border-color)]">
                    <tr>
                      <th className="p-2.5 text-start">{isEn ? 'Month' : 'الشهر'}</th>
                      <th className="p-2.5 text-start">{isEn ? 'Payment' : 'القسط'}</th>
                      <th className="p-2.5 text-start">{isEn ? 'Principal' : 'الأصل'}</th>
                      <th className="p-2.5 text-start">{isEn ? 'Interest' : 'الفائدة'}</th>
                      <th className="p-2.5 text-start">{isEn ? 'Remaining' : 'المتبقي'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)]/40 text-[var(--text-secondary)]">
                    {schedule.map(row => (
                      <tr key={row.month} className="hover:bg-[var(--bg-main)]/40 transition-colors">
                        <td className="p-2.5 font-bold text-[var(--text-primary)]">#{row.month}</td>
                        <td className="p-2.5 text-emerald-400 font-bold">{row.payment.toFixed(2)}</td>
                        <td className="p-2.5">{row.principal.toFixed(2)}</td>
                        <td className="p-2.5 text-amber-400">{row.interest.toFixed(2)}</td>
                        <td className="p-2.5 font-bold">{row.balance.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Calculators() {
  const { i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');
  const [activeTab, setActiveTab] = useState('vat');

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="calculators-page animate-fade-in">
      <div className="container">
        <div className="text-center mb-10">
          <div className="inline-block p-4 rounded-full bg-gradient mb-4">
            <Calculator size={32} color="var(--primary-accent)" />
          </div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            {isEn ? 'Tools and Financial Calculators' : 'الأدوات والحاسبات المالية الذكية'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            {isEn 
              ? 'Comprehensive accounting and financial valuation tools to complete calculations accurately.' 
              : 'حاسبات محاسبية ومالية شاملة تساعدك في إنجاز التقييمات والحسابات بسرعة ودقة.'}
          </p>

          <div className="mt-4 print:hidden">
            <button
              type="button"
              onClick={handlePrintReport}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-emerald-500 text-[var(--text-primary)] shadow-sm hover:shadow-md transition-all"
            >
              <span>🖨️</span>
              <span>{isEn ? 'Print / Export Formal Report (PDF)' : 'طباعة / تصدير تقرير محاسبي رسمي (PDF)'}</span>
            </button>
          </div>
        </div>

        <div className="calc-tabs flex-wrap justify-center gap-2 mb-8 print:hidden">
          <button className={`calc-tab ${activeTab === 'vat' ? 'active' : ''}`} onClick={() => setActiveTab('vat')}>
            {isEn ? 'VAT Calculator' : 'ضريبة القيمة المضافة'}
          </button>
          <button className={`calc-tab ${activeTab === 'zakat' ? 'active' : ''}`} onClick={() => setActiveTab('zakat')}>
            {isEn ? 'Zakat Calculator' : 'الزكاة الشرعية'}
          </button>
          <button className={`calc-tab ${activeTab === 'depreciation' ? 'active' : ''}`} onClick={() => setActiveTab('depreciation')}>
            {isEn ? 'Asset Depreciation' : 'إهلاك الأصول'}
          </button>
          <button className={`calc-tab ${activeTab === 'breakeven' ? 'active' : ''}`} onClick={() => setActiveTab('breakeven')}>
            {isEn ? 'Break-even Point' : 'نقطة التعادل'}
          </button>
          <button className={`calc-tab ${activeTab === 'endofservice' ? 'active' : ''}`} onClick={() => setActiveTab('endofservice')}>
            {isEn ? 'End of Service' : 'نهاية الخدمة'}
          </button>
          <button className={`calc-tab ${activeTab === 'npv' ? 'active' : ''}`} onClick={() => setActiveTab('npv')}>
            {isEn ? 'NPV & IRR' : 'صافي القيمة الحالية والعائد'}
          </button>
          <button className={`calc-tab ${activeTab === 'loan' ? 'active' : ''}`} onClick={() => setActiveTab('loan')}>
            {isEn ? 'Loan Amortization' : 'جدول إطفاء القروض'}
          </button>
          <button className={`calc-tab ${activeTab === 'pv' ? 'active' : ''}`} onClick={() => setActiveTab('pv')}>
            {isEn ? 'Present Value' : 'القيمة الحالية'}
          </button>
        </div>

        {activeTab === 'vat' && <VATCalculator isEn={isEn} />}
        {activeTab === 'zakat' && <ZakatCalculator isEn={isEn} />}
        {activeTab === 'depreciation' && <DepreciationCalculator isEn={isEn} />}
        {activeTab === 'breakeven' && <BreakEvenCalculator isEn={isEn} />}
        {activeTab === 'endofservice' && <EndOfServiceCalculator isEn={isEn} />}
        {activeTab === 'npv' && <NPVCalculator isEn={isEn} />}
        {activeTab === 'loan' && <LoanCalculator isEn={isEn} />}
        {activeTab === 'pv' && <PresentValueCalculator isEn={isEn} />}
      </div>
    </div>
  );
}

export default Calculators;
