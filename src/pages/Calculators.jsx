import { useState } from 'react';
import { Calculator } from 'lucide-react';
import './Calculators.css';

function VATCalculator() {
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
      <h2>حاسبة ضريبة القيمة المضافة</h2>
      
      <div className="calc-input-group flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" checked={type === 'exclude'} onChange={() => setType('exclude')} />
          المبلغ غير شامل الضريبة
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" checked={type === 'include'} onChange={() => setType('include')} />
          المبلغ شامل الضريبة
        </label>
      </div>

      <div className="calc-input-group">
        <label>المبلغ</label>
        <input type="number" className="calc-input" value={amount} onChange={e => setAmount(e.target.value)} placeholder="أدخل المبلغ..." />
      </div>
      
      <div className="calc-input-group">
        <label>نسبة الضريبة (%)</label>
        <input type="number" className="calc-input" value={rate} onChange={e => setRate(e.target.value)} />
      </div>

      {numAmount > 0 && (
        <div className="calc-result">
          <h3>الضريبة المستحقة</h3>
          <div className="amount">{vatAmount.toFixed(2)}</div>
          <div className="flex justify-between mt-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <span>المبلغ الصافي: {netAmount.toFixed(2)}</span>
            <span>الإجمالي: {grossAmount.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function DepreciationCalculator() {
  const [cost, setCost] = useState('');
  const [salvage, setSalvage] = useState('');
  const [life, setLife] = useState('');

  const numCost = parseFloat(cost) || 0;
  const numSalvage = parseFloat(salvage) || 0;
  const numLife = parseFloat(life) || 1;

  const annualDepreciation = (numCost - numSalvage) / numLife;

  return (
    <div className="calc-container animate-fade-in">
      <h2>حاسبة الإهلاك (القسط الثابت)</h2>
      
      <div className="calc-input-group">
        <label>تكلفة الأصل</label>
        <input type="number" className="calc-input" value={cost} onChange={e => setCost(e.target.value)} />
      </div>
      
      <div className="calc-input-group">
        <label>قيمة الخردة (القيمة التخريدية)</label>
        <input type="number" className="calc-input" value={salvage} onChange={e => setSalvage(e.target.value)} />
      </div>

      <div className="calc-input-group">
        <label>العمر الإنتاجي المقدر (بالسنوات)</label>
        <input type="number" className="calc-input" value={life} onChange={e => setLife(e.target.value)} />
      </div>

      {numCost > 0 && (
        <div className="calc-result">
          <h3>قسط الإهلاك السنوي</h3>
          <div className="amount">{annualDepreciation.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
}

function BreakEvenCalculator() {
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
      <h2>حاسبة نقطة التعادل</h2>
      
      <div className="calc-input-group">
        <label>التكاليف الثابتة الكلية</label>
        <input type="number" className="calc-input" value={fixedCosts} onChange={e => setFixedCosts(e.target.value)} />
      </div>
      
      <div className="calc-input-group">
        <label>سعر بيع الوحدة</label>
        <input type="number" className="calc-input" value={price} onChange={e => setPrice(e.target.value)} />
      </div>

      <div className="calc-input-group">
        <label>التكلفة المتغيرة للوحدة</label>
        <input type="number" className="calc-input" value={variableCost} onChange={e => setVariableCost(e.target.value)} />
      </div>

      {fCosts > 0 && contributionMargin > 0 && (
        <div className="calc-result">
          <h3>نقطة التعادل (بالوحدات)</h3>
          <div className="amount">{Math.ceil(breakEvenUnits)} وحدة</div>
          <div className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            هامش المساهمة للوحدة: {contributionMargin.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}

function EndOfServiceCalculator() {
  const [salary, setSalary] = useState('');
  const [years, setYears] = useState('');
  const [resignationType, setResignationType] = useState('termination'); // termination (فصل/نهاية عقد) or resignation (استقالة)

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
      <h2>حاسبة مكافأة نهاية الخدمة (السعودية - تقريبي)</h2>
      
      <div className="calc-input-group flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" checked={resignationType === 'termination'} onChange={() => setResignationType('termination')} />
          نهاية عقد / فصل
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" checked={resignationType === 'resignation'} onChange={() => setResignationType('resignation')} />
          استقالة
        </label>
      </div>

      <div className="calc-input-group">
        <label>الراتب الأخير (شامل البدلات الثابتة)</label>
        <input type="number" className="calc-input" value={salary} onChange={e => setSalary(e.target.value)} />
      </div>
      
      <div className="calc-input-group">
        <label>مدة الخدمة (بالسنوات)</label>
        <input type="number" step="0.1" className="calc-input" value={years} onChange={e => setYears(e.target.value)} />
      </div>

      {numSalary > 0 && numYears > 0 && (
        <div className="calc-result">
          <h3>المكافأة المستحقة</h3>
          <div className="amount">{reward.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
}

function PresentValueCalculator() {
  const [futureValue, setFutureValue] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');

  const fv = parseFloat(futureValue) || 0;
  const r = (parseFloat(rate) || 0) / 100;
  const n = parseFloat(years) || 0;

  const pv = fv / Math.pow((1 + r), n);

  return (
    <div className="calc-container animate-fade-in">
      <h2>حاسبة القيمة الحالية (Present Value)</h2>
      
      <div className="calc-input-group">
        <label>القيمة المستقبلية المتوقعة (FV)</label>
        <input type="number" className="calc-input" value={futureValue} onChange={e => setFutureValue(e.target.value)} />
      </div>
      
      <div className="calc-input-group">
        <label>معدل الخصم / الفائدة السنوي (%)</label>
        <input type="number" className="calc-input" value={rate} onChange={e => setRate(e.target.value)} />
      </div>

      <div className="calc-input-group">
        <label>عدد السنوات</label>
        <input type="number" className="calc-input" value={years} onChange={e => setYears(e.target.value)} />
      </div>

      {fv > 0 && r > 0 && n > 0 && (
        <div className="calc-result">
          <h3>القيمة الحالية (PV)</h3>
          <div className="amount">{pv.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
}

function Calculators() {
  const [activeTab, setActiveTab] = useState('vat');

  return (
    <div className="calculators-page animate-fade-in">
      <div className="container">
        <div className="text-center mb-10">
          <div className="inline-block p-4 rounded-full bg-gradient mb-4">
            <Calculator size={32} color="var(--primary-accent)" />
          </div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>الأدوات والحاسبات</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            أدوات محاسبية عملية تساعدك في إنجاز حساباتك بسرعة ودقة.
          </p>
        </div>

        <div className="calc-tabs flex-wrap justify-center gap-2 mb-8">
          <button className={`calc-tab ${activeTab === 'vat' ? 'active' : ''}`} onClick={() => setActiveTab('vat')}>ضريبة القيمة المضافة</button>
          <button className={`calc-tab ${activeTab === 'depreciation' ? 'active' : ''}`} onClick={() => setActiveTab('depreciation')}>إهلاك الأصول</button>
          <button className={`calc-tab ${activeTab === 'breakeven' ? 'active' : ''}`} onClick={() => setActiveTab('breakeven')}>نقطة التعادل</button>
          <button className={`calc-tab ${activeTab === 'endofservice' ? 'active' : ''}`} onClick={() => setActiveTab('endofservice')}>نهاية الخدمة</button>
          <button className={`calc-tab ${activeTab === 'pv' ? 'active' : ''}`} onClick={() => setActiveTab('pv')}>القيمة الحالية</button>
        </div>

        {activeTab === 'vat' && <VATCalculator />}
        {activeTab === 'depreciation' && <DepreciationCalculator />}
        {activeTab === 'breakeven' && <BreakEvenCalculator />}
        {activeTab === 'endofservice' && <EndOfServiceCalculator />}
        {activeTab === 'pv' && <PresentValueCalculator />}
      </div>
    </div>
  );
}

export default Calculators;
