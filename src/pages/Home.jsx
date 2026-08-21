import { useState, useMemo } from 'react';
import { 
  Book, 
  Calculator, 
  TrendingUp, 
  FileText, 
  ArrowLeft, 
  ArrowRight, 
  Star, 
  FileDown, 
  ExternalLink, 
  BookOpen, 
  Award, 
  Sparkles, 
  Search,
  Layers,
  FolderTree,
  Coins,
  FileSpreadsheet
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../hooks/useData.js';
import { useNewsAPI } from '../hooks/useNewsAPI.js';
import { latestTemplates } from '../data/templates.js';
import { useTranslation } from 'react-i18next';

import ArticleCard from '../components/cards/ArticleCard.jsx';
import CategoryCard from '../components/cards/CategoryCard.jsx';
import PageHero from '../components/ui/PageHero.jsx';

const ICONS = {
  'financial': Book,
  'cost': TrendingUp,
  'audit': FileText,
  'tax': Calculator
};

function Home() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const navigate = useNavigate();
  const [heroSearch, setHeroSearch] = useState('');

  const { data: categoriesData } = useData('/data/categories.json');
  const { data: articlesData } = useNewsAPI();
  
  const categoriesList = categoriesData?.list || [];
  const featuredArticles = articlesData ? articlesData.filter(a => a.isFeatured).slice(0, 4) : [];
  
  const displayCategories = categoriesList.filter(c => ICONS[c.id]).slice(0, 4);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/search?q=${encodeURIComponent(heroSearch.trim())}`);
    }
  };

  const stats = useMemo(() => [
    {
      icon: BookOpen,
      count: '21+',
      label: isEn ? 'Comprehensive Articles' : 'مقال محاسبي متخصص',
    },
    {
      icon: FileDown,
      count: '12+',
      label: isEn ? 'Practical Templates' : 'نماذج مالية جاهزة',
    },
    {
      icon: Award,
      count: 'IFRS & SOCPA',
      label: isEn ? 'Standards & Guides' : 'المعايير الدولية والمحلية',
    },
    {
      icon: Sparkles,
      count: '100%',
      label: isEn ? 'Free Access' : 'محتوى مجاني بالكامل',
    },
  ], [isEn]);

  const topicPills = useMemo(() => [
    { label: isEn ? 'IFRS Standards' : 'معايير IFRS', path: '/standards' },
    { label: isEn ? 'Journal Entries' : 'قيود اليومية', path: '/journal-entries' },
    { label: isEn ? 'Chart of Accounts' : 'دليل الحسابات', path: '/chart-of-accounts' },
    { label: isEn ? 'Zakat & Taxes' : 'الزكاة والضريبة', path: '/calculators' },
    { label: isEn ? 'Excel Templates' : 'نماذج إكسل', path: '/templates' },
  ], [isEn]);

  const quickTools = useMemo(() => [
    {
      title_ar: 'حاسبة الزكاة والضريبة',
      title_en: 'Zakat & VAT Hub',
      desc_ar: 'حساب وعاء زكاة الشركات والأفراد وضريبة 15% بدقة.',
      desc_en: 'Compute corporate & individual zakat base and VAT.',
      icon: Coins,
      path: '/calculators',
      color: 'from-blue-600/20 via-blue-900/10 to-transparent text-blue-400 border-blue-500/30'
    },
    {
      title_ar: 'محاكي القيود التفاعلي',
      title_en: 'Journal Simulator',
      desc_ar: 'تركيب القيود المركبة وتأكيد توازن القيد مع وضع التحديات.',
      desc_en: 'Build multi-leg entries with instant balance check.',
      icon: Layers,
      path: '/journal-entries',
      color: 'from-sky-500/20 via-sky-900/10 to-transparent text-sky-400 border-sky-500/30'
    },
    {
      title_ar: 'دليل الحسابات الشجري',
      title_en: 'Chart of Accounts',
      desc_ar: 'شجرة حسابات قياسية متكاملة قابلة للبحث والتصفح.',
      desc_en: 'Hierarchical standard financial chart of accounts.',
      icon: FolderTree,
      path: '/chart-of-accounts',
      color: 'from-indigo-600/20 via-indigo-900/10 to-transparent text-indigo-400 border-indigo-500/30'
    },
    {
      title_ar: 'مكتبة النماذج وإكسل',
      title_en: 'Templates & Models',
      desc_ar: '12 نموذج مالي جاهز للتنزيل الفوري (Excel/Word/PDF).',
      desc_en: '12+ downloadable Excel, Word, and PDF models.',
      icon: FileSpreadsheet,
      path: '/templates',
      color: 'from-cyan-500/20 via-blue-950/20 to-transparent text-cyan-400 border-cyan-500/30'
    },
  ], []);

  return (
    <div className="home-page animate-fade-in pb-20">
      {/* 1. Hero Section */}
      <PageHero 
        title={t('home.hero_title')}
        description={t('home.hero_desc')}
        padding="pt-10 pb-12 sm:pt-14 sm:pb-16 md:pt-16 md:pb-20"
      >
        <div className="w-full flex flex-col items-center">
          {/* Search Box (Max 500px) */}
          <div className="w-full max-w-[500px] mx-auto">
            <form 
              onSubmit={handleHeroSearch} 
              className="relative flex items-center shadow-xl rounded-full bg-[var(--bg-card)] border-2 border-[var(--border-color)] focus-within:border-[var(--primary-accent)] focus-within:ring-4 focus-within:ring-[var(--primary-accent)]/20 transition-all p-1.5 ps-5 pe-2 gap-3 w-full"
            >
              <Search size={22} className="text-[var(--primary-accent)] shrink-0 pointer-events-none" />
              <input 
                type="text" 
                value={heroSearch} 
                onChange={(e) => setHeroSearch(e.target.value)} 
                placeholder={isEn ? "Search topics, standards, models, or terms..." : "ابحث عن موضوع، معيار IFRS، نموذج، مصطلح..."}
                className="flex-1 min-w-0 py-2.5 px-2 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm md:text-base outline-none font-medium border-0 focus:ring-0 truncate"
              />
              <button 
                type="submit" 
                className="px-5 sm:px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white shadow-md transition-all active:scale-95 shrink-0 flex items-center gap-2"
              >
                <span>{isEn ? "Search" : "بحث"}</span>
                {isEn ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
              </button>
            </form>
          </div>

          {/* Quick Topic Pills */}
          <div className="w-full max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-7" role="navigation" aria-label={isEn ? "Popular Topics" : "المواضيع الشائعة"}>
            <span className="text-xs sm:text-sm font-bold text-[var(--text-secondary)] me-1">{isEn ? 'Quick topics:' : 'مواضيع شائعة:'}</span>
            {topicPills.map((item, idx) => (
              <Link 
                key={idx} 
                to={item.path} 
                aria-label={item.label} 
                className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-[var(--bg-card)] hover:bg-[var(--primary-accent)] hover:text-white text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--primary-accent)] transition-all shadow-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </PageHero>

      {/* 2. Stats Highlight Strip */}
      <section className="container relative z-20 mt-8 sm:mt-10 mb-10 sm:mb-14" aria-label={isEn ? "Platform Statistics" : "إحصائيات المنصة"}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 p-5 md:p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xl">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5 p-2 rounded-xl transition-all hover:bg-[var(--bg-main)]">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] flex items-center justify-center border border-[var(--primary-accent)]/20 shadow-sm">
                  <Icon size={22} />
                </div>
                <div>
                  <div className="font-black text-base md:text-xl text-[var(--text-primary)] leading-tight">{stat.count}</div>
                  <div className="text-xs text-[var(--text-muted)] font-medium leading-snug">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Interactive Smart Hub Grid */}
      <section className="home-section container" aria-label={isEn ? "Interactive Tools" : "الأدوات التفاعلية"}>
        <div className="flex items-center gap-2.5 mb-8 pb-3 border-b border-[var(--border-color)]">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary-accent)] shadow-sm shadow-[var(--primary-accent)]/50"></div>
          <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">
            {isEn ? 'Interactive Financial Tools & Simulators' : 'الأدوات والمحاكيات المالية التفاعلية'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {quickTools.map((tool, idx) => {
            const ToolIcon = tool.icon;
            return (
              <Link
                key={idx}
                to={tool.path}
                className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--primary-accent)] hover:-translate-y-1.5 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between group min-h-[220px]"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[var(--primary-accent)] flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-all">
                    <ToolIcon size={22} />
                  </div>
                  <h3 className="font-bold text-base md:text-lg text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary-accent)] transition-colors">
                    {isEn ? tool.title_en : tool.title_ar}
                  </h3>
                  <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed m-0">
                    {isEn ? tool.desc_en : tool.desc_ar}
                  </p>
                </div>
                <div className="pt-3 border-t border-[var(--border-color)]/60 flex items-center justify-between text-xs font-bold text-[var(--primary-accent)] mt-auto">
                  <span>{isEn ? 'Launch Tool' : 'فتح الأداة وتجربتها'}</span>
                  {isEn ? <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /> : <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Core Categories Section */}
      <section className="home-section container" aria-label={isEn ? "Core Categories" : "الأقسام الرئيسية"}>
        <div className="flex justify-between items-center mb-8 pb-3 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary-accent)] shadow-sm shadow-[var(--primary-accent)]/50"></div>
            <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">{t('home.browse_categories')}</h2>
          </div>
          <Link to="/categories" className="text-[var(--text-secondary)] hover:text-[var(--primary-accent)] flex items-center gap-1.5 text-sm font-semibold transition-colors group">
            <span>{t('home.view_all')}</span>
            {isEn ? <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /> : <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />}
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {displayCategories.map((cat, index) => {
            const IconComponent = ICONS[cat.id] || BookOpen;
            return (
              <CategoryCard key={index} category={{...cat, desc: categoriesData?.info?.[cat.id]?.desc, desc_en: categoriesData?.info?.[cat.id]?.desc_en}} IconComponent={IconComponent} />
            );
          })}
        </div>
      </section>

      {/* 5. Featured Articles Section */}
      <section className="home-section container" aria-label={isEn ? "Featured Articles" : "مقالات مختارة"}>
        <div className="flex justify-between items-center mb-8 pb-3 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2.5">
            <Star className="text-amber-400 fill-amber-400" size={20} />
            <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">{t('home.featured_articles')}</h2>
          </div>
          <Link to="/categories" className="text-[var(--text-secondary)] hover:text-[var(--primary-accent)] flex items-center gap-1.5 text-sm font-semibold transition-colors group">
            <span>{t('home.view_all')}</span>
            {isEn ? <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /> : <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />}
          </Link>
        </div>
        
        {articlesData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredArticles.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <span className="text-[var(--text-secondary)]">{t('categories.loading')}</span>
          </div>
        )}
      </section>

      {/* 6. Special Dual Showcase: Templates & Standards */}
      <section className="home-section container" aria-label={isEn ? "Templates and Standards Showcase" : "نماذج ومعايير مختارة"}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {/* Latest Downloadable Templates */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl shadow-xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-color)]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-2xl text-blue-500 border border-blue-500/20 flex items-center justify-center">
                    <FileDown size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--text-primary)] text-lg leading-tight">{t('home.latest_templates')}</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1 mb-0">{isEn ? '12+ models ready for Excel, Word & PDF' : '12+ نموذج جاهز للتحميل والتعديل المباشر'}</p>
                  </div>
                </div>
                <Link to="/templates" className="text-xs font-bold text-[var(--primary-accent)] hover:underline">
                  {isEn ? 'All Templates' : 'كافة النماذج'}
                </Link>
              </div>
              
              <div className="space-y-3">
                {latestTemplates.slice(0, 4).map(template => (
                  <Link key={template.id} to={`/templates/${template.id}`} className="group flex items-center justify-between p-3.5 rounded-2xl border border-[var(--border-color)]/60 hover:border-[var(--primary-accent)] hover:bg-[var(--bg-main)] transition-all gap-3 bg-[var(--bg-dark)]/40">
                    <span className="text-[var(--text-primary)] text-sm font-semibold group-hover:text-[var(--primary-accent)] transition-colors flex-1 truncate">
                      {isEn && template.title_en ? template.title_en : template.title}
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-xl font-bold shrink-0 shadow-sm ${
                      template.type === 'Excel' ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30' :
                      template.type === 'Word' ? 'bg-blue-500/15 text-blue-500 border border-blue-500/30' :
                      'bg-red-500/15 text-red-500 border border-red-500/30'
                    }`}>
                      {template.type}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="mt-8 pt-4 border-t border-[var(--border-color)]">
              <Link to="/templates" className="text-[var(--text-secondary)] hover:text-[var(--primary-accent)] flex items-center gap-2 text-sm justify-center font-bold transition-colors group py-1">
                <span>{t('home.browse_full_library')}</span>
                {isEn ? <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /> : <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />}
              </Link>
            </div>
          </div>

          {/* IFRS Standards Masterclass Showcase */}
          <div 
            className="rounded-3xl p-6 sm:p-8 text-start relative overflow-hidden shadow-2xl border border-blue-500/30 flex flex-col justify-between"
            style={{ 
              background: 'linear-gradient(135deg, #0B1536 0%, #112356 50%, #0A1128 100%)',
              color: '#ffffff'
            }}
          >
            <div className="absolute -top-12 -right-12 w-56 h-56 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-sky-500/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-sky-300 text-xs font-bold mb-6 backdrop-blur-md">
                <Sparkles size={14} className="text-sky-300 animate-pulse" />
                <span className="text-sky-300 font-bold">{isEn ? 'International & SOCPA Standards' : 'دليل المعايير الدولية والأنظمة السعودية'}</span>
              </div>

              <h3 className="font-black text-2xl md:text-3xl mb-3 leading-snug" style={{ color: '#ffffff' }}>
                {t('home.ifrs_standards')}
              </h3>
              <p className="text-sm md:text-base mb-8 leading-relaxed font-normal" style={{ color: '#cbd5e1' }}>
                {t('home.ifrs_desc')}
              </p>
            </div>

            <Link 
              to="/standards" 
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-2xl font-bold text-sm md:text-base transition-all hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] active:scale-95 w-full flex items-center justify-center gap-2.5 relative z-10 shadow-lg"
              style={{ color: '#ffffff' }}
            >
              <span className="text-white font-bold">{t('home.discover_standards')}</span>
              <ExternalLink size={18} className="text-white" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

