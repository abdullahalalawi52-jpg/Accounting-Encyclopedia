import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Calculator } from 'lucide-react';
import './Calculators.css';

function VATCalculator({ isEn }) {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState(15);
  const [type, setType] = useState('exclude'); // 'exclude' (add VAT) or 'include' (extract VAT)

  const numAmount = parseFloat(amount) || 0;
  
  let netAmount = 0;
  let vatAmount = 0;
  let grossAmount = 0;

  if (type === 'exclude') {
    netAmount = numAmount;
    vatAmount = netAmount * (rate / 100);
    grossAmount = netAmount + vatAmount;
  } else {
    grossAmount = numAmount;
    netAmount = grossAmount / (1 + rate / 100);
    vatAmount = grossAmount - netAmount;
  }

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
        <label>{isEn ? 'Amount' : 'المبلغ'}</label>
        <input 
          type="number" 
          className="calc-input" 
          value={amount} 
          onChange={e => setAmount(e.target.value)} 
          placeholder={isEn ? 'Enter amount...' : 'أدخل المبلغ...'} 
        />
      </div>
      
      <div className="calc-input-group">
        <label>{isEn ? 'Tax Rate (%)' : 'نسبة الضريبة (%)'}</label>
        <input type="number" className="calc-input" value={rate} onChange={e => setRate(e.target.value)} />
      </div>

      {numAmount > 0 && (
        <div className="calc-result">
          <h3>{isEn ? 'Calculated VAT' : 'الضريبة المستحقة'}</h3>
          <div className="amount">{vatAmount.toFixed(2)}</div>
          <div className="flex justify-between mt-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <span>{isEn ? `Net Amount: ${netAmount.toFixed(2)}` : `المبلغ الصافي: ${netAmount.toFixed(2)}`}</span>
            <span>{isEn ? `Gross Amount: ${grossAmount.toFixed(2)}` : `الإجمالي: ${grossAmount.toFixed(2)}`}</span>
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

  const numCost = parseFloat(cost) || 0;
  const numSalvage = parseFloat(salvage) || 0;
  const numLife = parseFloat(life) || 1;

  const annualDepreciation = (numCost - numSalvage) / numLife;

  return (
    <div className="calc-container animate-fade-in">
      <h2>{isEn ? 'Depreciation Calculator (Straight-Line)' : 'حاسبة الإهلاك (القسط الثابت)'}</h2>
      
      <div className="calc-input-group">
        <label>{isEn ? 'Asset Cost' : 'تكلفة الأصل'}</label>
        <input type="number" className="calc-input" value={cost} onChange={e => setCost(e.target.value)} />
      </div>
      
      <div className="calc-input-group">
        <label>{isEn ? 'Salvage Value' : 'قيمة الخردة (القيمة التخريدية)'}</label>
        <input type="number" className="calc-input" value={salvage} onChange={e => setSalvage(e.target.value)} />
      </div>

      <div className="calc-input-group">
        <label>{isEn ? 'Useful Life (Years)' : 'العمر الإنتاجي المقدر (بالسنوات)'}</label>
        <input type="number" className="calc-input" value={life} onChange={e => setLife(e.target.value)} />
      </div>

      {numCost > 0 && (
        <div className="calc-result">
          <h3>{isEn ? 'Annual Depreciation' : 'قسط الإهلاك السنوي'}</h3>
          <div className="amount">{annualDepreciation.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
}

function BreakEvenCalculator({ isEn }) {
  const [fixedCosts, setFixedCosts] = useState('');
  const [price, setPrice] = useState('');
  const [variableCost, setVariableCost] = useState('');

  const fCosts = parseFloat(fixedCosts) || 0;
  const p = parseFloat(price) || 0;
  const vCost = parseFloat(variableCost) || 0;

  const contributionMargin = p - vCost;
  const breakEvenUnits = contributionMargin > 0 ? (fCosts / contributionMargin) : 0;

  return (
    <div className="calc-container animate-fade-in">
      <h2>{isEn ? 'Break-Even Point Calculator' : 'حاسبة نقطة التعادل'}</h2>
      
      <div className="calc-input-group">
        <label>{isEn ? 'Total Fixed Costs' : 'التكاليف الثابتة الكلية'}</label>
        <input type="number" className="calc-input" value={fixedCosts} onChange={e => setFixedCosts(e.target.value)} />
      </div>
      
      <div className="calc-input-group">
        <label>{isEn ? 'Unit Selling Price' : 'سعر بيع الوحدة'}</label>
        <input type="number" className="calc-input" value={price} onChange={e => setPrice(e.target.value)} />
      </div>

      <div className="calc-input-group">
        <label>{isEn ? 'Unit Variable Cost' : 'التكلفة المتغيرة للوحدة'}</label>
        <input type="number" className="calc-input" value={variableCost} onChange={e => setVariableCost(e.target.value)} />
      </div>

      {fCosts > 0 && contributionMargin > 0 && (
        <div className="calc-result">
          <h3>{isEn ? 'Break-Even Point (Units)' : 'نقطة التعادل (بالوحدات)'}</h3>
          <div className="amount">{Math.ceil(breakEvenUnits)} {isEn ? 'Units' : 'وحدة'}</div>
          <div className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            {isEn ? `Contribution Margin per Unit: ${contributionMargin.toFixed(2)}` : `هامش المساهمة للوحدة: ${contributionMargin.toFixed(2)}`}
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

  const numSalary = parseFloat(salary) || 0;
  const numYears = parseFloat(years) || 0;

  let reward = 0;
  
  // Basic calculation: half month for first 5 years, full month for remaining
  let basicReward = 0;
  if (numYears <= 5) {
    basicReward = (numSalary / 2) * numYears;
  } else {
    basicReward = ((numSalary / 2) * 5) + (numSalary * (numYears - 5));
  }

  // Resignation logic (Saudi Labor Law example)
  if (resignationType === 'resignation') {
    if (numYears < 2) reward = 0;
    else if (numYears >= 2 && numYears < 5) reward = basicReward / 3;
    else if (numYears >= 5 && numYears < 10) reward = (basicReward * 2) / 3;
    else reward = basicReward;
  } else {
    reward = basicReward;
  }

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
        <label>{isEn ? 'Last Basic Salary (including fixed allowances)' : 'الراتب الأخير (شامل البدلات الثابتة)'}</label>
        <input type="number" className="calc-input" value={salary} onChange={e => setSalary(e.target.value)} />
      </div>
      
      <div className="calc-input-group">
        <label>{isEn ? 'Service Duration (Years)' : 'مدة الخدمة (بالسنوات)'}</label>
        <input type="number" step="0.1" className="calc-input" value={years} onChange={e => setYears(e.target.value)} />
      </div>

      {numSalary > 0 && numYears > 0 && (
        <div className="calc-result">
          <h3>{isEn ? 'Entitled Gratuity' : 'المكافأة المستحقة'}</h3>
          <div className="amount">{reward.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
}

function PresentValueCalculator({ isEn }) {
  const [futureValue, setFutureValue] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');

  const fv = parseFloat(futureValue) || 0;
  const r = (parseFloat(rate) || 0) / 100;
  const n = parseFloat(years) || 0;

  const pv = fv / Math.pow((1 + r), n);

  return (
    <div className="calc-container animate-fade-in">
      <h2>{isEn ? 'Present Value Calculator (PV)' : 'حاسبة القيمة الحالية (Present Value)'}</h2>
      
      <div className="calc-input-group">
        <label>{isEn ? 'Expected Future Value (FV)' : 'القيمة المستقبلية المتوقعة (FV)'}</label>
        <input type="number" className="calc-input" value={futureValue} onChange={e => setFutureValue(e.target.value)} />
      </div>
      
      <div className="calc-input-group">
        <label>{isEn ? 'Annual Discount / Interest Rate (%)' : 'معدل الخصم / الفائدة السنوي (%)'}</label>
        <input type="number" className="calc-input" value={rate} onChange={e => setRate(e.target.value)} />
      </div>

      <div className="calc-input-group">
        <label>{isEn ? 'Number of Years' : 'عدد السنوات'}</label>
        <input type="number" className="calc-input" value={years} onChange={e => setYears(e.target.value)} />
      </div>

      {fv > 0 && r > 0 && n > 0 && (
        <div className="calc-result">
          <h3>{isEn ? 'Present Value (PV)' : 'القيمة الحالية (PV)'}</h3>
          <div className="amount">{pv.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
}

function Calculators() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [activeTab, setActiveTab] = useState('vat');

  return (
    <div className="calculators-page animate-fade-in">
      <div className="container">
        <div className="text-center mb-10">
          <div className="inline-block p-4 rounded-full bg-gradient mb-4">
            <Calculator size={32} color="var(--primary-accent)" />
          </div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            {isEn ? 'Tools and Calculators' : 'الأدوات والحاسبات'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            {isEn ? 'Practical accounting tools to help you complete your calculations quickly and accurately.' : 'أدوات محاسبية عملية تساعدك في إنجاز حساباتك بسرعة ودقة.'}
          </p>
        </div>

        <div className="calc-tabs flex-wrap justify-center gap-2 mb-8">
          <button className={`calc-tab ${activeTab === 'vat' ? 'active' : ''}`} onClick={() => setActiveTab('vat')}>
            {isEn ? 'VAT Calculator' : 'ضريبة القيمة المضافة'}
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
          <button className={`calc-tab ${activeTab === 'pv' ? 'active' : ''}`} onClick={() => setActiveTab('pv')}>
            {isEn ? 'Present Value' : 'القيمة الحالية'}
          </button>
        </div>

        {activeTab === 'vat' && <VATCalculator isEn={isEn} />}
        {activeTab === 'depreciation' && <DepreciationCalculator isEn={isEn} />}
        {activeTab === 'breakeven' && <BreakEvenCalculator isEn={isEn} />}
        {activeTab === 'endofservice' && <EndOfServiceCalculator isEn={isEn} />}
        {activeTab === 'pv' && <PresentValueCalculator isEn={isEn} />}
      </div>
    </div>
  );
}

export default Calculators;
