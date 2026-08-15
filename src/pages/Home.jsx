import { useState } from 'react';
import { Book, Calculator, TrendingUp, FileText, ArrowLeft, ArrowRight, Star, FileDown, ExternalLink, BookOpen, Layers, Award, Sparkles, CheckCircle2, Search } from 'lucide-react';
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
  const featuredArticles = articlesData ? articlesData.filter(a => a.isFeatured) : [];
  
  const displayCategories = categoriesList.filter(c => ICONS[c.id]).slice(0, 4);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/search?q=${encodeURIComponent(heroSearch.trim())}`);
    }
  };

  const stats = [
    {
      icon: BookOpen,
      count: '21+',
      label: isEn ? 'Comprehensive Articles' : 'مقال محاسبي متخصص',
    },
    {
      icon: FileDown,
      count: '8+',
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
  ];

  return (
    <div className="home-page animate-fade-in pb-20">
      <PageHero 
        title={t('home.hero_title')}
        description={t('home.hero_desc')}
        badge={isEn ? 'Accounting Knowledge Hub' : 'الموسوعة المحاسبية الشاملة'}
        padding="pt-16 pb-20 md:pt-20 md:pb-24"
      >
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleHeroSearch} className="relative flex items-center shadow-2xl rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-color)] focus-within:border-[var(--primary-accent)] focus-within:ring-4 focus-within:ring-[var(--primary-accent)]/15 transition-all">
            <div className="px-3.5 text-[var(--text-muted)]">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              value={heroSearch} 
              onChange={(e) => setHeroSearch(e.target.value)}
              placeholder={isEn ? "Search accounting topics, IFRS standards, templates, or terms..." : "ابحث عن أي موضوع محاسبي، معيار IFRS، نموذج، أو مصطلح..."}
              className="w-full py-3.5 px-2 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm md:text-base outline-none font-medium"
            />
            <button 
              type="submit" 
              className="m-1.5 px-5 py-2.5 rounded-xl font-bold text-sm bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white shadow-md transition-all active:scale-95 shrink-0 flex items-center gap-1.5"
            >
              <span>{isEn ? "Search" : "بحث"}</span>
              {isEn ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            </button>
          </form>

          {/* Quick Topic Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="text-xs text-[var(--text-muted)] font-semibold">{isEn ? 'Quick topics:' : 'مواضيع شائعة:'}</span>
            {[
              { label: isEn ? 'IFRS Standards' : 'معايير IFRS', path: '/standards' },
              { label: isEn ? 'Journal Entries' : 'قيود اليومية', path: '/journal-entries' },
              { label: isEn ? 'Chart of Accounts' : 'دليل الحسابات', path: '/chart-of-accounts' },
              { label: isEn ? 'Calculators' : 'حاسبات مالية', path: '/calculators' },
              { label: isEn ? 'Excel Templates' : 'نماذج إكسل', path: '/templates' },
            ].map((item, idx) => (
              <Link 
                key={idx}
                to={item.path}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-[var(--bg-card)]/80 hover:bg-[var(--primary-accent)]/10 text-[var(--text-secondary)] hover:text-[var(--primary-accent)] border border-[var(--border-color)] hover:border-[var(--primary-accent)]/30 transition-all backdrop-blur-md"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </PageHero>

      {/* Stats Highlight Strip */}
      <div className="container -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-6 rounded-2xl bg-[var(--bg-card)]/90 backdrop-blur-xl border border-[var(--border-color)] shadow-xl">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5 p-2.5 rounded-xl transition-all hover:bg-[var(--bg-main)]">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] flex items-center justify-center border border-[var(--primary-accent)]/20 shadow-sm">
                  <Icon size={20} />
                </div>
                <div>
                  <div className="font-black text-base md:text-lg text-[var(--text-primary)] leading-tight">{stat.count}</div>
                  <div className="text-xs text-[var(--text-muted)] font-medium leading-snug">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mt-14 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Main Feed (Right Side in RTL) */}
        <div className="w-full lg:w-2/3 flex flex-col gap-12">
          
          {/* Categories */}
          <div>
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary-accent)] shadow-sm shadow-[var(--primary-accent)]/50"></div>
                <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">{t('home.browse_categories')}</h2>
              </div>
              <Link to="/categories" className="text-[var(--text-secondary)] hover:text-[var(--primary-accent)] flex items-center gap-1.5 text-sm font-semibold transition-colors group">
                <span>{t('home.view_all')}</span>
                {isEn ? <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /> : <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />}
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {displayCategories.map((cat, index) => {
                const IconComponent = ICONS[cat.id] || BookOpen;
                return (
                  <CategoryCard key={index} category={{...cat, desc: categoriesData?.info?.[cat.id]?.desc, desc_en: categoriesData?.info?.[cat.id]?.desc_en}} IconComponent={IconComponent} />
                );
              })}
            </div>
          </div>

          {/* Featured Articles */}
          <div>
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-[var(--border-color)]">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredArticles.map((article, index) => (
                  <ArticleCard key={index} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <span className="text-[var(--text-secondary)]">{t('categories.loading')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar (Left Side in RTL) */}
        <aside className="w-full lg:w-1/3 flex flex-col gap-6 sticky top-24">
          {/* Latest Templates */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-sm relative overflow-hidden" style={{ padding: '24px' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -z-10"></div>
            
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border-color)]">
              <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-500 border border-blue-500/20">
                <FileDown size={20} />
              </div>
              <div>
                <h3 className="font-bold text-[var(--text-primary)] text-lg leading-tight">{t('home.latest_templates')}</h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5 mb-0">{isEn ? 'Excel & Word downloads' : 'جاهزة للتحميل والتعديل'}</p>
              </div>
            </div>
            
            <div className="space-y-2.5">
              {latestTemplates.map(template => (
                <Link key={template.id} to={`/templates/${template.id}`} className="group flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-[var(--border-color)] hover:bg-[var(--bg-main)] transition-all gap-3">
                  <span className="text-[var(--text-secondary)] text-sm font-medium group-hover:text-[var(--text-primary)] transition-colors flex-1 truncate">
                    {isEn && template.title_en ? template.title_en : template.title}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-lg font-bold shrink-0 shadow-sm ${
                    template.type === 'Excel' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' :
                    template.type === 'Word' ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20' :
                    'bg-red-500/10 text-red-600 border border-red-500/20'
                  }`}>
                    {template.type}
                  </span>
                </Link>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-[var(--border-color)]">
              <Link to="/templates" className="text-[var(--text-secondary)] hover:text-[var(--primary-accent)] flex items-center gap-2 text-sm justify-center font-bold transition-colors group py-1">
                <span>{t('home.browse_full_library')}</span>
                {isEn ? <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /> : <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />}
              </Link>
            </div>
          </div>

          {/* Promo Box */}
          <div className="bg-gradient-to-br from-[#0B172A] via-[#115E59] to-[#047857] rounded-2xl p-7 text-start relative overflow-hidden shadow-xl border border-emerald-500/30 text-white">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/30 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-emerald-200 text-xs font-bold mb-4 backdrop-blur-md">
              <Sparkles size={13} />
              <span>{isEn ? 'Accounting Standards' : 'دليل المعايير المحاسبية'}</span>
            </div>

            <h3 className="font-extrabold text-2xl mb-2 text-white leading-snug">{t('home.ifrs_standards')}</h3>
            <p className="text-sm mb-6 leading-relaxed text-slate-200 font-normal">
              {t('home.ifrs_desc')}
            </p>
            <Link 
              to="/standards" 
              className="bg-white text-emerald-900 hover:bg-emerald-50 px-5 py-3 rounded-xl font-bold text-sm transition-all hover:shadow-lg active:scale-95 w-full flex items-center justify-center gap-2 relative z-10"
            >
              <span>{t('home.discover_standards')}</span>
              <ExternalLink size={16} />
            </Link>
          </div>
        </aside>

      </div>
    </div>
  );
}

export default Home;
